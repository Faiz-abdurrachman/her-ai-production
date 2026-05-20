/* ==========================================================================
   HerAI Meeting Room - WebRTC client with Gorilla WebSocket signaling
   ========================================================================== */

window.initMeetingRoom = function() {
    const DEFAULT_SIGNAL_URL = 'wss://herai-signaling.onrender.com/ws';

    const joinPanel = document.getElementById('meetingJoinPanel');
    const meetingPage = document.getElementById('meetingPage');
    const roomPanel = document.getElementById('meetingRoomPanel');
    const nameInput = document.getElementById('meetingDisplayName');
    const roomInput = document.getElementById('meetingRoomCode');
    const previewPanel = document.getElementById('meetingPreviewPanel');
    const previewVideo = document.getElementById('meetingPreviewVideo');
    const previewName = document.getElementById('meetingPreviewName');
    const statusText = document.getElementById('meetingStatusText');
    const roomTitle = document.getElementById('meetingRoomTitle');
    const localVideo = document.getElementById('meetingLocalVideo');
    const remoteGrid = document.getElementById('meetingRemoteGrid');
    const localLabel = document.getElementById('meetingLocalLabel');
    const roomCodeBadge = document.getElementById('meetingRoomCodeBadge');
    const roomClock = document.getElementById('meetingRoomClock');
    const participantCount = document.getElementById('meetingParticipantCount');
    const navContainer = document.getElementById('navbar-container');
    const footerContainer = document.getElementById('footer-container');
    const chatPanel = document.getElementById('meetingChatPanel');
    const chatMessages = document.getElementById('meetingChatMessages');
    const chatInput = document.getElementById('meetingChatInput');
    const peoplePanel = document.getElementById('meetingPeoplePanel');
    const peopleList = document.getElementById('meetingPeopleList');
    const peopleSummary = document.getElementById('meetingPeopleSummary');
    const emojiFloat = document.getElementById('meetingEmojiFloat');
    const pageControls = document.getElementById('meetingPageControls');
    const pageInfo = document.getElementById('meetingPageInfo');
    const tileViewSelect = document.getElementById('meetingTileView');
    const shareButton = document.getElementById('btnShareMeetingScreen');
    const exitConfirm = document.getElementById('meetingExitConfirm');
    const exitTitle = document.getElementById('meetingExitTitle');
    const exitMessage = document.getElementById('meetingExitMessage');

    let localStream = null;
    let cameraStream = null;
    let screenStream = null;
    let screenTrack = null;
    let socket = null;
    let currentPage = 1;
    let pendingExitAction = null;
    let activeScreenOwner = null;
    let clockTimer = null;
    const peers = new Map();
    const remoteScreenShares = new Map();
    const peerNames = new Map();
    const peerPresence = new Map();
    const pendingJoinAnnouncements = new Set();
    const clientId = getMeetingClientId();
    const localPresence = {
        id: clientId,
        name: '',
        mic: true,
        camera: true,
        hand: false,
        screen: false
    };

    const params = new URLSearchParams((location.hash.split('?')[1] || ''));
    const roomFromLink = params.get('room');
    const titleFromLink = params.get('title') || '';
    const signalFromLink = params.get('signal') || localStorage.getItem('herai_meeting_signal_url') || DEFAULT_SIGNAL_URL;
    if (params.get('signal')) localStorage.setItem('herai_meeting_signal_url', signalFromLink);
    if (roomFromLink && roomInput) roomInput.value = sanitizeMeetingRoom(roomFromLink);
    if (nameInput && !nameInput.value) nameInput.value = localStorage.getItem('herai_meeting_name') || '';
    roomInput?.addEventListener('input', () => {
        roomInput.value = formatMeetingRoomCode(roomInput.value);
    });

    const setStatus = (value) => {
        if (statusText) statusText.textContent = value;
    };
    const peerDisplayName = (peerId) => peerPresence.get(peerId)?.name || peerNames.get(peerId) || 'Peserta';
    const announcePeerJoined = (peerId, fallbackName = '') => {
        const name = fallbackName || peerDisplayName(peerId);
        setStatus(`${name} telah bergabung`);
        pendingJoinAnnouncements.delete(peerId);
    };
    const roomId = () => sanitizeMeetingRoom(roomInput?.value || '');
    const displayName = () => String(nameInput?.value || 'Peserta HerAI').trim() || 'Peserta HerAI';
    const signalUrl = () => {
        const url = new URL(signalFromLink);
        url.searchParams.set('room', roomId());
        url.searchParams.set('clientId', clientId);
        return url.toString();
    };
    const sendSignal = (type, to, payload) => {
        if (!socket || socket.readyState !== WebSocket.OPEN) return;
        socket.send(JSON.stringify({ type, room: roomId(), to, payload }));
    };
    const buildLocalPresence = () => {
        localPresence.name = displayName();
        localPresence.mic = localStream?.getAudioTracks()[0]?.enabled !== false;
        localPresence.camera = localStream?.getVideoTracks()[0]?.enabled !== false;
        localPresence.screen = Boolean(screenStream);
        return { ...localPresence };
    };
    const publishPresence = (to = '') => {
        const presence = buildLocalPresence();
        updateMeetingTilePresence(clientId, presence);
        renderPeopleList();
        sendSignal('presence', to, presence);
    };
    const ensureMedia = async () => {
        if (localStream) return localStream;
        assertMediaSupport();
        try {
            localStream = await navigator.mediaDevices.getUserMedia({
                video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' },
                audio: { echoCancellation: true, noiseSuppression: true }
            });
        } catch (error) {
            if (error?.name === 'OverconstrainedError' || error?.name === 'ConstraintNotSatisfiedError') {
                localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            } else {
                throw error;
            }
        }
        cameraStream = localStream;
        if (localVideo) localVideo.srcObject = localStream;
        if (previewVideo) previewVideo.srcObject = localStream;
        return localStream;
    };
    const closePeer = (peerId) => {
        const pc = peers.get(peerId);
        if (pc) pc.close();
        peers.delete(peerId);
        remoteScreenShares.delete(peerId);
        peerPresence.delete(peerId);
        if (activeScreenOwner === peerId) activeScreenOwner = null;
        removeMeetingRemote(peerId);
        removeMeetingRemote(`${peerId}-screen`);
        renderPeopleList();
        renderEmptyRemoteIfNeeded();
    };
    const createPeer = (peerId) => {
        if (peers.has(peerId)) return peers.get(peerId);
        const pc = new RTCPeerConnection({
            iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
        });
        if (localStream) localStream.getTracks().forEach(track => pc.addTrack(track, localStream));
        if (screenStream) screenStream.getTracks().forEach(track => pc.addTrack(track, screenStream));
        pc.ontrack = event => {
            const stream = event.streams[0];
            const shareMeta = remoteScreenShares.get(peerId);
            const isScreen = shareMeta?.streamId && shareMeta.streamId === stream?.id;
            renderMeetingRemote(peerId, stream, isScreen ? 'screen' : 'camera', shareMeta?.name);
        };
        pc.onicecandidate = event => {
            if (event.candidate) sendSignal('ice', peerId, event.candidate);
        };
        pc.onconnectionstatechange = () => {
            const name = peerDisplayName(peerId);
            const stateLabels = {
                connected: 'terhubung',
                connecting: 'sedang menghubungkan',
                disconnected: 'koneksi terputus',
                failed: 'gagal terhubung',
                closed: 'keluar dari room'
            };
            setStatus(`${name} ${stateLabels[pc.connectionState] || pc.connectionState}`);
            if (['failed', 'closed'].includes(pc.connectionState)) closePeer(peerId);
        };
        peers.set(peerId, pc);
        updateTileLayout();
        return pc;
    };
    const createOffer = async (peerId) => {
        const pc = createPeer(peerId);
        const offer = await pc.createOffer({ offerToReceiveAudio: true, offerToReceiveVideo: true });
        await pc.setLocalDescription(offer);
        sendSignal('offer', peerId, pc.localDescription);
    };
    const handleSignal = async (message) => {
        const { type, from, payload } = message;
        if (!from || from === clientId) return;
        if (type === 'peer-joined') {
            pendingJoinAnnouncements.add(from);
            setStatus('Peserta baru sedang bergabung...');
            createPeer(from);
            sendSignal('peer-info', from, { name: displayName() });
            publishPresence(from);
            return;
        }
        if (type === 'peer-left') {
            setStatus(`${peerDisplayName(from)} telah keluar`);
            closePeer(from);
            return;
        }
        if (type === 'screen-start') {
            activeScreenOwner = from;
            remoteScreenShares.set(from, {
                name: payload?.name || from.slice(0, 8),
                streamId: payload?.streamId || ''
            });
            renderMeetingRemoteShareLabel(from, payload?.name);
            return;
        }
        if (type === 'screen-stop') {
            remoteScreenShares.delete(from);
            if (activeScreenOwner === from) activeScreenOwner = null;
            removeMeetingRemote(`${from}-screen`);
            return;
        }
        if (type === 'peer-info') {
            const name = payload?.name || peerNames.get(from) || 'Peserta';
            peerNames.set(from, name);
            updateMeetingRemoteLabel(from);
            if (!peerPresence.has(from)) {
                peerPresence.set(from, {
                    id: from,
                    name,
                    mic: true,
                    camera: true,
                    hand: false,
                    screen: false
                });
            }
            if (pendingJoinAnnouncements.has(from)) announcePeerJoined(from, name);
            renderPeopleList();
            return;
        }
        if (type === 'presence') {
            const nextPresence = {
                id: from,
                name: payload?.name || peerNames.get(from) || from.slice(0, 8),
                mic: payload?.mic !== false,
                camera: payload?.camera !== false,
                hand: payload?.hand === true,
                screen: payload?.screen === true
            };
            peerNames.set(from, nextPresence.name);
            peerPresence.set(from, nextPresence);
            if (pendingJoinAnnouncements.has(from)) announcePeerJoined(from, nextPresence.name);
            updateMeetingRemoteLabel(from);
            updateMeetingTilePresence(from, nextPresence);
            renderPeopleList();
            return;
        }
        if (type === 'offer') {
            const pc = createPeer(from);
            await pc.setRemoteDescription(new RTCSessionDescription(payload));
            const answer = await pc.createAnswer();
            await pc.setLocalDescription(answer);
            sendSignal('answer', from, pc.localDescription);
            return;
        }
        if (type === 'answer') {
            const pc = createPeer(from);
            await pc.setRemoteDescription(new RTCSessionDescription(payload));
            return;
        }
        if (type === 'ice') {
            const pc = createPeer(from);
            await pc.addIceCandidate(new RTCIceCandidate(payload));
            return;
        }
        if (type === 'chat') {
            appendChatMessage(payload?.name || from.slice(0, 8), payload?.text || '', payload?.at, false);
            return;
        }
        if (type === 'emoji') {
            showFloatingEmoji(payload?.emoji || '👍');
        }
    };

    document.getElementById('btnJoinMeetingRoom')?.addEventListener('click', async () => {
        if (!roomId()) {
            alert('Masukkan kode room terlebih dahulu.');
            return;
        }
        try {
            localStorage.setItem('herai_meeting_name', displayName());
            await ensureMedia();
            if (previewName) previewName.textContent = displayName();
            previewPanel?.classList.remove('hidden');
            document.getElementById('btnJoinMeetingRoom')?.classList.add('hidden');
        } catch (error) {
            console.error(error);
            showMediaHelp(error);
        }
    });

    document.getElementById('btnEnterMeetingRoom')?.addEventListener('click', async () => {
        if (!roomId()) {
            alert('Masukkan kode room terlebih dahulu.');
            return;
        }
        try {
            localStorage.setItem('herai_meeting_name', displayName());
            await ensureMedia();
            if (localLabel) localLabel.textContent = displayName();
            if (roomTitle) roomTitle.textContent = titleFromLink || `Room ${roomId()}`;
            if (roomCodeBadge) roomCodeBadge.textContent = roomId();
            if (navContainer) navContainer.style.display = 'none';
            if (footerContainer) footerContainer.style.display = 'none';
            joinPanel?.classList.add('hidden');
            roomPanel?.classList.remove('hidden');
            meetingPage?.classList.add('in-call');
            startMeetingClock();
            syncRoomDeviceButtons();
            publishPresence();
            socket = new WebSocket(signalUrl());
            setStatus('Menghubungkan ke room...');
            socket.onopen = () => setStatus('Terhubung ke signaling server');
            socket.onmessage = async event => {
                const message = JSON.parse(event.data);
                if (message.type === 'joined') {
                    const existingPeers = message.payload?.peers || [];
                    for (const peerId of existingPeers) await createOffer(peerId);
                    sendSignal('peer-info', '', { name: displayName() });
                    publishPresence('');
                    setStatus('Berhasil masuk room');
                    return;
                }
                await handleSignal(message);
            };
            socket.onclose = () => setStatus('Signaling server offline atau koneksi room terputus');
            socket.onerror = () => setStatus('Signaling server belum aktif atau tidak bisa dijangkau');
        } catch (error) {
            console.error(error);
            showMediaHelp(error);
        }
    });

    document.getElementById('btnCancelMeetingPreview')?.addEventListener('click', () => {
        openExitConfirm('Batalkan preview?', 'Kamera dan mikrofon preview akan dimatikan.', resetPreview);
    });

    document.getElementById('btnCancelExitMeeting')?.addEventListener('click', closeExitConfirm);
    exitConfirm?.addEventListener('click', event => {
        if (event.target === exitConfirm) closeExitConfirm();
    });
    document.getElementById('btnConfirmExitMeeting')?.addEventListener('click', () => {
        const action = pendingExitAction;
        closeExitConfirm();
        if (typeof action === 'function') action();
    });

    document.getElementById('btnPreviewMic')?.addEventListener('click', event => {
        const enabled = toggleTrack('audio');
        setDeviceButtonState(event.currentTarget, enabled, 'microphone');
    });

    document.getElementById('btnPreviewCamera')?.addEventListener('click', event => {
        const enabled = toggleTrack('video');
        setDeviceButtonState(event.currentTarget, enabled, 'video');
    });

    document.getElementById('btnToggleMeetingMic')?.addEventListener('click', event => {
        const enabled = toggleTrack('audio');
        setDeviceButtonState(event.currentTarget, enabled, 'microphone');
        publishPresence();
    });

    document.getElementById('btnToggleMeetingCamera')?.addEventListener('click', event => {
        const enabled = toggleTrack('video');
        setDeviceButtonState(event.currentTarget, enabled, 'video');
        publishPresence();
    });

    document.getElementById('btnRaiseMeetingHand')?.addEventListener('click', event => {
        localPresence.hand = !localPresence.hand;
        event.currentTarget?.classList.toggle('is-raised', localPresence.hand);
        event.currentTarget.title = localPresence.hand ? 'Lower Hand' : 'Raise Hand';
        publishPresence();
    });

    shareButton?.addEventListener('click', async () => {
        try {
            if (screenStream) {
                await stopScreenShare();
                return;
            }
            if (activeScreenOwner && activeScreenOwner !== clientId) {
                alert('Masih ada peserta lain yang sedang share screen. Tunggu sampai share screen dimatikan terlebih dahulu.');
                return;
            }
            screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: false });
            screenTrack = screenStream.getVideoTracks()[0];
            activeScreenOwner = clientId;
            localPresence.screen = true;
            sendSignal('screen-start', '', { name: displayName(), streamId: screenStream.id });
            publishPresence();
            renderLocalScreenTile(screenStream);
            peers.forEach(pc => pc.addTrack(screenTrack, screenStream));
            await renegotiateAllPeers();
            screenTrack.onended = async () => {
                await stopScreenShare();
            };
            setShareButtonState(true);
        } catch (error) {
            console.warn('Screen share cancelled', error);
        }
    });

    document.getElementById('btnToggleMeetingChat')?.addEventListener('click', () => {
        chatPanel?.classList.toggle('open');
        syncSidePanels();
    });
    document.getElementById('btnCloseMeetingChat')?.addEventListener('click', () => {
        chatPanel?.classList.remove('open');
        syncSidePanels();
    });
    document.getElementById('btnToggleMeetingPeople')?.addEventListener('click', () => {
        peoplePanel?.classList.toggle('open');
        syncSidePanels();
        renderPeopleList();
    });
    document.getElementById('btnCloseMeetingPeople')?.addEventListener('click', () => {
        peoplePanel?.classList.remove('open');
        syncSidePanels();
    });
    document.getElementById('btnSendMeetingChat')?.addEventListener('click', sendChatMessage);
    chatInput?.addEventListener('keydown', event => {
        if (event.key === 'Enter') sendChatMessage();
    });
    document.querySelectorAll('.meeting-emoji').forEach(button => {
        button.addEventListener('click', () => {
            const emoji = button.dataset.emoji || '👍';
            sendSignal('emoji', '', { emoji, name: displayName() });
            showFloatingEmoji(emoji);
        });
    });
    document.getElementById('btnMeetingPrevPage')?.addEventListener('click', () => {
        currentPage = Math.max(1, currentPage - 1);
        updateTileLayout();
    });
    document.getElementById('btnMeetingNextPage')?.addEventListener('click', () => {
        currentPage += 1;
        updateTileLayout();
    });
    tileViewSelect?.addEventListener('change', () => {
        currentPage = 1;
        updateTileLayout();
    });

    document.getElementById('btnLeaveMeetingRoom')?.addEventListener('click', () => {
        openExitConfirm('Keluar dari meeting?', 'Kamera, mikrofon, dan koneksi room akan dimatikan.', leaveMeeting);
    });

    function leaveMeeting() {
        if (socket) socket.close();
        stopMeetingClock();
        socket = null;
        peers.forEach(pc => pc.close());
        peers.clear();
        peerNames.clear();
        peerPresence.clear();
        remoteScreenShares.clear();
        localPresence.hand = false;
        localPresence.screen = false;
        document.getElementById('btnRaiseMeetingHand')?.classList.remove('is-raised');
        activeScreenOwner = null;
        document.querySelectorAll('.meeting-remote-tile').forEach(tile => tile.remove());
        document.getElementById('meeting-local-screen')?.remove();
        renderEmptyRemoteIfNeeded();
        if (screenStream) screenStream.getTracks().forEach(track => track.stop());
        screenStream = null;
        screenTrack = null;
        activeScreenOwner = null;
        setShareButtonState(false);
        if (localStream) localStream.getTracks().forEach(track => track.stop());
        localStream = null;
        cameraStream = null;
        if (localVideo) localVideo.srcObject = null;
        if (previewVideo) previewVideo.srcObject = null;
        roomPanel?.classList.add('hidden');
        joinPanel?.classList.remove('hidden');
        previewPanel?.classList.add('hidden');
        chatPanel?.classList.remove('open');
        peoplePanel?.classList.remove('open');
        document.getElementById('btnJoinMeetingRoom')?.classList.remove('hidden');
        meetingPage?.classList.remove('in-call', 'chat-open', 'people-open');
        syncSidePanels();
        if (navContainer) navContainer.style.display = 'block';
        if (footerContainer) footerContainer.style.display = 'block';
        setStatus('Menunggu koneksi...');
        renderPeopleList();
    }

    function toggleTrack(kind) {
        const track = localStream?.getTracks().find(item => item.kind === kind);
        if (!track) return false;
        track.enabled = !track.enabled;
        return track.enabled;
    }

    function assertMediaSupport() {
        if (!window.isSecureContext) {
            throw new Error('INSECURE_CONTEXT');
        }
        if (!navigator.mediaDevices?.getUserMedia) {
            throw new Error('MEDIA_DEVICES_UNSUPPORTED');
        }
    }

    function showMediaHelp(error) {
        const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        const reason = error?.name || error?.message || 'UNKNOWN';
        let message = 'Tidak bisa membuka kamera/mikrofon. Pastikan permission browser diizinkan.';
        if (reason === 'INSECURE_CONTEXT') {
            message = 'Safari hanya menampilkan izin kamera/mikrofon di HTTPS. Gunakan link ngrok HTTPS, bukan http atau file lokal.';
        } else if (reason === 'MEDIA_DEVICES_UNSUPPORTED') {
            message = 'Browser ini belum mendukung akses kamera/mikrofon untuk halaman meeting.';
        } else if (['NotAllowedError', 'PermissionDeniedError'].includes(reason)) {
            message = isSafari
                ? 'Safari memblokir kamera/mikrofon. Buka Safari Settings > Websites > Camera dan Microphone, lalu izinkan untuk domain meeting ini.'
                : 'Kamera/mikrofon diblokir. Klik ikon permission di address bar lalu pilih Allow.';
        } else if (['NotFoundError', 'DevicesNotFoundError'].includes(reason)) {
            message = 'Kamera atau mikrofon tidak ditemukan. Pastikan perangkat tersambung dan tidak sedang dipakai aplikasi lain.';
        }
        alert(message);
    }

    function setDeviceButtonState(button, enabled, kind) {
        const icon = button?.querySelector('i');
        if (icon) {
            icon.className = enabled
                ? `fas fa-${kind}`
                : `fas fa-${kind}-slash`;
        }
        button?.classList.toggle('is-off', !enabled);
    }

    function resetPreview() {
        if (localStream) localStream.getTracks().forEach(track => track.stop());
        localStream = null;
        cameraStream = null;
        if (previewVideo) previewVideo.srcObject = null;
        if (localVideo) localVideo.srcObject = null;
        previewPanel?.classList.add('hidden');
        document.getElementById('btnJoinMeetingRoom')?.classList.remove('hidden');
        resetDeviceButtons();
    }

    function resetDeviceButtons() {
        [
            [document.getElementById('btnPreviewMic'), 'microphone'],
            [document.getElementById('btnPreviewCamera'), 'video'],
            [document.getElementById('btnToggleMeetingMic'), 'microphone'],
            [document.getElementById('btnToggleMeetingCamera'), 'video']
        ].forEach(([button, kind]) => setDeviceButtonState(button, true, kind));
    }

    function syncRoomDeviceButtons() {
        const audioEnabled = localStream?.getAudioTracks()[0]?.enabled !== false;
        const videoEnabled = localStream?.getVideoTracks()[0]?.enabled !== false;
        setDeviceButtonState(document.getElementById('btnToggleMeetingMic'), audioEnabled, 'microphone');
        setDeviceButtonState(document.getElementById('btnToggleMeetingCamera'), videoEnabled, 'video');
        updateMeetingTilePresence(clientId, buildLocalPresence());
        renderPeopleList();
    }

    function startMeetingClock() {
        stopMeetingClock();
        const tick = () => {
            if (roomClock) roomClock.textContent = formatMeetingTime(new Date().toISOString());
        };
        tick();
        clockTimer = setInterval(tick, 1000);
    }

    function stopMeetingClock() {
        if (clockTimer) clearInterval(clockTimer);
        clockTimer = null;
    }

    function syncSidePanels() {
        const chatOpen = chatPanel?.classList.contains('open') === true;
        const peopleOpen = peoplePanel?.classList.contains('open') === true;
        meetingPage?.classList.toggle('chat-open', chatOpen);
        meetingPage?.classList.toggle('people-open', peopleOpen);
        meetingPage?.classList.toggle('side-panels-open', chatOpen || peopleOpen);
        meetingPage?.classList.toggle('side-panels-split', chatOpen && peopleOpen);
    }

    function renderPeopleList() {
        if (!peopleList || !peopleSummary) return;
        const participants = [
            { ...buildLocalPresence(), local: true },
            ...[...peerPresence.values()].map(item => ({ ...item, local: false }))
        ].sort((a, b) => {
            if (a.local) return -1;
            if (b.local) return 1;
            if (a.hand !== b.hand) return a.hand ? -1 : 1;
            return String(a.name || '').localeCompare(String(b.name || ''));
        });

        peopleSummary.textContent = `${participants.length} participant${participants.length === 1 ? '' : 's'}`;
        if (participantCount) participantCount.innerHTML = `<i class="fas fa-users"></i> ${participants.length}`;
        peopleList.innerHTML = participants.map(person => {
            const name = person.local ? `${person.name || 'Kamu'} (You)` : person.name || 'Peserta';
            const initials = getMeetingInitials(person.name || 'P');
            const detail = person.hand ? 'Raise hand' : 'In meeting';
            return `
                <div class="meeting-person-row">
                    <div class="meeting-person-avatar">${escapeMeetingHtml(initials)}</div>
                    <div class="meeting-person-main">
                        <strong>${escapeMeetingHtml(name)}</strong>
                        <span>${escapeMeetingHtml(detail)}</span>
                    </div>
                    <div class="meeting-person-state">
                        ${person.hand ? '<i class="fas fa-hand-paper is-hand" title="Raise hand"></i>' : ''}
                        <i class="fas ${person.camera ? 'fa-video' : 'fa-video-slash is-off'}" title="${person.camera ? 'Camera on' : 'Camera off'}"></i>
                        <i class="fas ${person.mic ? 'fa-microphone' : 'fa-microphone-slash is-off'}" title="${person.mic ? 'Mic on' : 'Mic off'}"></i>
                    </div>
                </div>
            `;
        }).join('');
    }

    function openExitConfirm(title, message, action) {
        pendingExitAction = action;
        if (exitTitle) exitTitle.textContent = title;
        if (exitMessage) exitMessage.textContent = message;
        exitConfirm?.classList.remove('hidden');
    }

    function closeExitConfirm() {
        pendingExitAction = null;
        exitConfirm?.classList.add('hidden');
    }

    async function stopScreenShare() {
        if (!screenStream && !screenTrack) return;
        if (screenTrack) {
            peers.forEach(pc => {
                const sender = pc.getSenders().find(item => item.track === screenTrack);
                if (sender) pc.removeTrack(sender);
            });
        }
        if (screenStream) screenStream.getTracks().forEach(track => track.stop());
        screenStream = null;
        screenTrack = null;
        document.getElementById('meeting-local-screen')?.remove();
        sendSignal('screen-stop', '', { name: displayName() });
        activeScreenOwner = null;
        localPresence.screen = false;
        setShareButtonState(false);
        publishPresence();
        await renegotiateAllPeers();
        updateTileLayout();
    }

    function sendChatMessage() {
        const text = chatInput?.value.trim();
        if (!text) return;
        const payload = { name: displayName(), text, at: new Date().toISOString() };
        appendChatMessage(payload.name, payload.text, payload.at, true);
        sendSignal('chat', '', payload);
        chatInput.value = '';
    }

    function appendChatMessage(name, text, at, isOwn = false) {
        if (!chatMessages) return;
        const item = document.createElement('div');
        item.className = `meeting-chat-message${isOwn ? ' is-own' : ''}`;
        item.innerHTML = `
            <div class="meeting-chat-bubble">
                <strong>${escapeMeetingHtml(isOwn ? 'Kamu' : name)}</strong>
                <span>${escapeMeetingHtml(text)}</span>
            </div>
            <span class="meeting-chat-meta">${formatMeetingTime(at)}</span>
        `;
        chatMessages.appendChild(item);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function showFloatingEmoji(emoji) {
        if (!emojiFloat) return;
        const item = document.createElement('span');
        item.className = 'meeting-floating-emoji';
        item.textContent = emoji;
        item.style.left = `${20 + Math.random() * 60}%`;
        emojiFloat.appendChild(item);
        setTimeout(() => item.remove(), 1900);
    }

    function renderLocalScreenTile(stream) {
        if (!remoteGrid) return;
        remoteGrid.querySelector('.meeting-empty-remote')?.remove();
        let tile = document.getElementById('meeting-local-screen');
        if (!tile) {
            tile = document.createElement('div');
            tile.id = 'meeting-local-screen';
            tile.className = 'meeting-video-tile is-screen is-pinned';
            tile.innerHTML = `
                <video autoplay muted playsinline></video>
                <span>${escapeMeetingHtml(displayName())} sedang share screen</span>
                <button class="meeting-pin-btn is-active" data-pin-tile="meeting-local-screen" title="Pin"><i class="fas fa-thumbtack"></i></button>
            `;
            remoteGrid.appendChild(tile);
        }
        const video = tile.querySelector('video');
        if (video) video.srcObject = stream;
        bindPinButtons();
        updateTileLayout();
    }

    async function renegotiateAllPeers() {
        for (const peerId of peers.keys()) {
            await createOffer(peerId);
        }
    }

    function setShareButtonState(isSharing) {
        if (!shareButton) return;
        const icon = shareButton.querySelector('i');
        shareButton.classList.toggle('is-sharing', isSharing);
        if (icon) icon.className = isSharing ? 'fas fa-stop-circle' : 'fas fa-display';
        shareButton.title = isSharing ? 'Matikan Share Screen' : 'Share Screen';
    }

    function bindPinButtons() {
        document.querySelectorAll('.meeting-pin-btn').forEach(button => {
            if (button.dataset.bound === 'true') return;
            button.dataset.bound = 'true';
            button.addEventListener('click', event => {
                event.stopPropagation();
                togglePinnedTile(button.dataset.pinTile);
            });
        });
    }

    function togglePinnedTile(tileId) {
        const tile = document.getElementById(tileId);
        if (!tile) return;
        const willPin = !tile.classList.contains('is-pinned');
        document.querySelectorAll('#meetingRemoteGrid .is-pinned').forEach(item => item.classList.remove('is-pinned'));
        document.querySelectorAll('.meeting-pin-btn.is-active').forEach(item => item.classList.remove('is-active'));
        if (willPin) {
            tile.classList.add('is-pinned');
            tile.querySelector('.meeting-pin-btn')?.classList.add('is-active');
        }
        updateTileLayout();
    }

    function updateTileLayout() {
        const tiles = [...document.querySelectorAll('#meetingRemoteGrid .meeting-video-tile, #meetingRemoteGrid .meeting-remote-tile')];
        const requested = tileViewSelect?.value || 'auto';
        const pageSize = requested === 'auto' ? 50 : Number(requested) || 50;
        const totalPages = Math.max(1, Math.ceil(tiles.length / pageSize));
        if (currentPage > totalPages) currentPage = totalPages;
        const start = (currentPage - 1) * pageSize;
        const end = start + pageSize;
        tiles.forEach((tile, index) => {
            tile.style.display = index >= start && index < end ? '' : 'none';
        });
        const visibleCount = Math.min(pageSize, Math.max(1, tiles.length - start));
        if (remoteGrid) {
            const hasScreenShare = Boolean(remoteGrid.querySelector('.is-screen'));
            remoteGrid.classList.toggle('has-screen-share', hasScreenShare);
            remoteGrid.classList.toggle('has-pinned-tile', Boolean(remoteGrid.querySelector('.is-pinned')));
            remoteGrid.dataset.count = String(Math.min(visibleCount, 16));
            const cols = getMeetingColumnCount(visibleCount);
            remoteGrid.style.setProperty('--meeting-cols', String(cols));
        }
        if (pageControls) pageControls.classList.toggle('active', totalPages > 1);
        if (pageInfo) pageInfo.textContent = `${currentPage} / ${totalPages}`;
    }

    window.__HERAI_MEETING_UPDATE_LAYOUT__ = updateTileLayout;
    window.__HERAI_BIND_MEETING_PINS__ = bindPinButtons;
    window.__HERAI_MEETING_PEER_NAMES__ = peerNames;
    window.__HERAI_MEETING_PEER_PRESENCE__ = peerPresence;
    window.__HERAI_MEETING_LOCAL_PRESENCE__ = localPresence;
    bindPinButtons();
    renderPeopleList();
    syncSidePanels();

    function getMeetingColumnCount(count) {
        if (count <= 1) return 1;
        if (count <= 4) return 2;
        if (count <= 9) return 3;
        if (count <= 12) return 4;
        if (count <= 15) return 5;
        return 6;
    }
};

function getMeetingClientId() {
    return crypto.randomUUID ? crypto.randomUUID() : `guest-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function sanitizeMeetingRoom(value) {
    return formatMeetingRoomCode(value);
}

function formatMeetingRoomCode(value) {
    const compact = String(value || '')
        .trim()
        .replace(/[^a-zA-Z0-9_-]/g, '')
        .replace(/-/g, '')
        .toUpperCase()
        .slice(0, 12);
    return compact.match(/.{1,4}/g)?.join('-') || '';
}

function renderMeetingRemote(peerId, stream, type = 'camera', displayName = '') {
    const remoteGrid = document.getElementById('meetingRemoteGrid');
    if (!remoteGrid) return;
    remoteGrid.querySelector('.meeting-empty-remote')?.remove();
    const safeId = peerId.replace(/[^a-zA-Z0-9_-]/g, '');
    const tileId = type === 'screen' ? `meeting-remote-${safeId}-screen` : `meeting-remote-${safeId}`;
    let tile = document.getElementById(tileId);
    if (!tile) {
        tile = document.createElement('div');
        tile.id = tileId;
        tile.className = `meeting-remote-tile${type === 'screen' ? ' is-screen is-pinned' : ''}`;
        const label = type === 'screen'
            ? `${displayName || peerId.slice(0, 8)} sedang share screen`
            : getMeetingPeerName(peerId);
        tile.innerHTML = `
            <video autoplay playsinline></video>
            <div class="meeting-video-initial">${escapeMeetingHtml(getMeetingInitials(label).slice(0, 1))}</div>
            <span>${escapeMeetingHtml(label)}</span>
            <button class="meeting-pin-btn${type === 'screen' ? ' is-active' : ''}" data-pin-tile="${tileId}" title="Pin"><i class="fas fa-thumbtack"></i></button>
        `;
        remoteGrid.appendChild(tile);
    }
    if (type !== 'screen') {
        const label = tile.querySelector('span');
        const name = getMeetingPeerName(peerId);
        if (label) label.textContent = name;
        const initial = tile.querySelector('.meeting-video-initial');
        if (initial) initial.textContent = getMeetingInitials(name).slice(0, 1);
    }
    if (type === 'screen') {
        tile.classList.add('is-screen', 'is-pinned');
        const label = tile.querySelector('span');
        if (label) label.textContent = `${displayName || peerId.slice(0, 8)} sedang share screen`;
    }
    const video = tile.querySelector('video');
    if (video) video.srcObject = stream;
    const presence = window.__HERAI_MEETING_PEER_PRESENCE__?.get(peerId);
    if (presence) updateMeetingTilePresence(peerId, presence);
    bindMeetingPinButtons();
    updateMeetingTiles();
}

function updateMeetingRemoteLabel(peerId) {
    const safeId = peerId.replace(/[^a-zA-Z0-9_-]/g, '');
    const tile = document.getElementById(`meeting-remote-${safeId}`);
    const label = tile?.querySelector('span');
    if (label) label.textContent = getMeetingPeerName(peerId);
}

function getMeetingPeerName(peerId) {
    const names = window.__HERAI_MEETING_PEER_NAMES__;
    return names?.get(peerId) || peerId.slice(0, 8);
}

function updateMeetingTilePresence(peerId, presence = {}) {
    const localPresence = window.__HERAI_MEETING_LOCAL_PRESENCE__;
    const safeId = String(peerId || '').replace(/[^a-zA-Z0-9_-]/g, '');
    const tile = peerId === localPresence?.id
        ? document.getElementById('meetingLocalTile')
        : document.getElementById(`meeting-remote-${safeId}`);
    if (!tile) return;

    tile.classList.toggle('is-hand-raised', presence.hand === true);
    tile.classList.toggle('is-camera-off', presence.camera === false);

    const name = presence.name || getMeetingPeerName(peerId);
    let initial = tile.querySelector('.meeting-video-initial');
    if (!initial) {
        initial = document.createElement('div');
        initial.className = 'meeting-video-initial';
        tile.appendChild(initial);
    }
    initial.textContent = getMeetingInitials(name).slice(0, 1);

    let hand = tile.querySelector('.meeting-hand-badge');
    if (!hand) {
        hand = document.createElement('div');
        hand.className = 'meeting-hand-badge';
        tile.appendChild(hand);
    }
    hand.innerHTML = '<i class="fas fa-hand-paper"></i> Raise hand';
    hand.style.display = presence.hand ? 'inline-flex' : 'none';

    let mic = tile.querySelector('.meeting-mic-badge');
    if (!mic) {
        mic = document.createElement('div');
        mic.className = 'meeting-mic-badge';
        tile.appendChild(mic);
    }
    mic.innerHTML = '<i class="fas fa-microphone-slash"></i>';
    mic.style.display = presence.mic === false ? 'inline-flex' : 'none';
}

function renderMeetingRemoteShareLabel(peerId, displayName = '') {
    const safeId = peerId.replace(/[^a-zA-Z0-9_-]/g, '');
    const tile = document.getElementById(`meeting-remote-${safeId}-screen`);
    const label = tile?.querySelector('span');
    if (label) label.textContent = `${displayName || peerId.slice(0, 8)} sedang share screen`;
}

function removeMeetingRemote(peerId) {
    const safeId = peerId.replace(/[^a-zA-Z0-9_-]/g, '');
    document.getElementById(`meeting-remote-${safeId}`)?.remove();
    updateMeetingTiles();
}

function renderEmptyRemoteIfNeeded() {
    const remoteGrid = document.getElementById('meetingRemoteGrid');
    remoteGrid?.querySelector('.meeting-empty-remote')?.remove();
    updateMeetingTiles();
}

function updateMeetingTiles() {
    if (typeof window.__HERAI_MEETING_UPDATE_LAYOUT__ === 'function') {
        window.__HERAI_MEETING_UPDATE_LAYOUT__();
        return;
    }
    const remoteGrid = document.getElementById('meetingRemoteGrid');
    if (!remoteGrid) return;
    const tiles = remoteGrid.querySelectorAll('.meeting-video-tile, .meeting-remote-tile');
    remoteGrid.dataset.count = String(Math.max(1, Math.min(tiles.length, 16)));
}

function bindMeetingPinButtons() {
    if (typeof window.__HERAI_BIND_MEETING_PINS__ === 'function') {
        window.__HERAI_BIND_MEETING_PINS__();
    }
}

function formatMeetingTime(value) {
    const date = value ? new Date(value) : new Date();
    if (Number.isNaN(date.getTime())) return '';
    return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false });
}

function getMeetingInitials(value) {
    const words = String(value || 'P').trim().split(/\s+/).filter(Boolean);
    return words.slice(0, 2).map(word => word[0]).join('').toUpperCase() || 'P';
}

function escapeMeetingHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, char => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
    }[char]));
}
