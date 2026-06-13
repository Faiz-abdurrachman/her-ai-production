(function() {
    const DEFAULT_RENDER_MESSAGING_URL = 'https://herai-messaging.onrender.com';
    const LOCAL_MESSAGING_URL = 'http://127.0.0.1:8091';
    const API = resolveMessagingApiBase();
    const WS = `${API.replace(/^http/, 'ws')}/ws`;
    const state = {
        token: '',
        me: null,
        users: [],
        friends: [],
        rooms: [],
        roomKeys: new Map(),
        currentRoom: null,
        ws: null,
        keyPair: null,
        online: new Set(),
        messages: new Map(),
        pendingFile: null,
        pendingCall: null,
        config: {
            maxAttachmentBytes: 8 * 1024 * 1024,
            attachmentKinds: ['text', 'image', 'video', 'document']
        },
        call: {
            pc: null,
            localStream: null,
            remoteStream: null,
            roomId: '',
            kind: 'audio',
            active: false
        }
    };

    const EMOJIS = ['😀','😁','😂','🥹','😊','😍','😘','😎','🤝','👏','🙌','🙏','💪','🔥','✨','🎉','❤️','💜','💚','👍','✅','📌','📎','🚀'];

    window.initMessagingPage = async function() {
        bindMessagingEvents();
        await loadMessagingConfig();
        restoreMessagingSession();
    };

    function bindMessagingEvents() {
        document.getElementById('messagingLoginForm')?.addEventListener('submit', handleLogin);
        document.getElementById('messagingRegisterForm')?.addEventListener('submit', handleRegister);
        document.querySelectorAll('[data-auth-tab]')?.forEach(button => {
            button.addEventListener('click', () => switchAuthPanel(button.dataset.authTab));
        });
        document.querySelectorAll('input[name="messagingRegisterRole"]')?.forEach(input => {
            input.addEventListener('change', syncRolePicker);
        });
        document.querySelectorAll('[data-oauth-provider]')?.forEach(button => {
            button.addEventListener('click', () => showAuthMessage(`Login dengan ${button.dataset.oauthProvider} belum dikonfigurasi di backend chat.`, false));
        });
        document.getElementById('messagingLogoutBtn')?.addEventListener('click', logoutMessaging);
        document.getElementById('messagingOpenFriendModalBtn')?.addEventListener('click', () => openMessagingModal('messagingFriendModal', 'messagingFriendId'));
        document.getElementById('messagingOpenRoomModalBtn')?.addEventListener('click', () => openMessagingModal('messagingRoomModal', 'messagingRoomTitleInput'));
        document.getElementById('messagingForgotPasswordBtn')?.addEventListener('click', () => openMessagingModal('messagingForgotPasswordModal', 'messagingForgotPasswordId'));
        document.getElementById('messagingForgotPasswordForm')?.addEventListener('submit', handleForgotPassword);
        document.querySelectorAll('[data-close-modal]')?.forEach(button => {
            button.addEventListener('click', () => closeMessagingModal(button.dataset.closeModal));
        });
        document.querySelectorAll('.messaging-modal')?.forEach(modal => {
            modal.addEventListener('click', event => {
                if (event.target === modal) closeMessagingModal(modal.id);
            });
        });
        document.getElementById('messagingFriendForm')?.addEventListener('submit', addFriend);
        document.getElementById('messagingRoomForm')?.addEventListener('submit', createGroupRoom);
        document.getElementById('messagingSendForm')?.addEventListener('submit', sendMessage);
        document.getElementById('messagingTextInput')?.addEventListener('input', emitTyping);
        document.getElementById('messagingEmojiBtn')?.addEventListener('click', toggleEmojiPanel);
        document.getElementById('messagingAttachBtn')?.addEventListener('click', () => document.getElementById('messagingFileInput')?.click());
        document.getElementById('messagingFileInput')?.addEventListener('change', previewAttachment);
        document.getElementById('messagingCancelFileBtn')?.addEventListener('click', clearAttachmentPreview);
        document.getElementById('messagingCancelFileFooterBtn')?.addEventListener('click', clearAttachmentPreview);
        document.getElementById('messagingConfirmFileBtn')?.addEventListener('click', sendPendingAttachment);
        document.getElementById('messagingVoiceCallBtn')?.addEventListener('click', () => startCall('audio'));
        document.getElementById('messagingVideoCallBtn')?.addEventListener('click', () => startCall('video'));
        document.getElementById('messagingEndCallBtn')?.addEventListener('click', () => endCall(true));
        document.getElementById('messagingAcceptCallBtn')?.addEventListener('click', acceptIncomingCall);
        document.getElementById('messagingRejectCallBtn')?.addEventListener('click', rejectIncomingCall);
        renderEmojiPanel();
        syncRolePicker();
    }

    function switchAuthPanel(target) {
        document.querySelectorAll('[data-auth-tab]').forEach(button => {
            button.classList.toggle('active', button.dataset.authTab === target);
        });
        document.querySelectorAll('[data-auth-panel]').forEach(panel => {
            panel.classList.toggle('active', panel.dataset.authPanel === target);
        });
        if (target !== 'register') resetRegisterStep();
    }

    function openMessagingModal(id, focusId = '') {
        const modal = document.getElementById(id);
        if (!modal) return;
        modal.hidden = false;
        if (focusId) setTimeout(() => document.getElementById(focusId)?.focus(), 80);
    }

    function closeMessagingModal(id) {
        const modal = document.getElementById(id);
        if (modal) modal.hidden = true;
    }

    function handleForgotPassword(event) {
        event.preventDefault();
        const id = cleanId(document.getElementById('messagingForgotPasswordId')?.value);
        const text = id
            ? `Permintaan reset untuk ${id} belum otomatis. Hubungi admin/panitia dan sebutkan ID ini untuk verifikasi.`
            : 'Masukkan ID pengguna terlebih dahulu, lalu hubungi admin/panitia untuk reset password.';
        showAuthMessage(text, false);
        closeMessagingModal('messagingForgotPasswordModal');
    }

    async function loadMessagingConfig() {
        const result = await api('/api/config', null, 'GET').catch(() => null);
        if (!result?.ok) return;
        state.config.maxAttachmentBytes = Number(result.max_attachment_bytes) || state.config.maxAttachmentBytes;
        state.config.attachmentKinds = Array.isArray(result.attachment_kinds) ? result.attachment_kinds : state.config.attachmentKinds;
    }

    async function restoreMessagingSession() {
        const saved = readJson('heraiChatSession', null);
        if (!saved?.token || !saved?.user) {
            showMessagingAuth();
            return;
        }
        state.token = saved.token;
        state.me = saved.user;
        state.keyPair = await ensureKeyPair(state.me.id);
        enterMessagingApp();
        const refreshed = await refreshMessagingData();
        if (!refreshed) return;
        connectWebSocket();
    }

    async function handleLogin(event) {
        event.preventDefault();
        const id = cleanId(document.getElementById('messagingLoginId').value);
        const password = document.getElementById('messagingLoginPassword').value;
        const keyPair = await ensureKeyPair(id);
        const publicKey = await exportPublicKey(keyPair.publicKey);
        const result = await api('/api/login', { id, password, public_key: JSON.stringify(publicKey) });
        if (!result.ok) return showAuthMessage(result.message || 'Login gagal.', true);
        state.token = result.token;
        state.me = result.user;
        state.keyPair = keyPair;
        sessionStorage.setItem('heraiChatSession', JSON.stringify({ token: state.token, user: state.me }));
        enterMessagingApp();
        await refreshMessagingData();
        connectWebSocket();
    }

    async function handleRegister(event) {
        event.preventDefault();
        const form = document.getElementById('messagingRegisterForm');
        const id = cleanId(document.getElementById('messagingRegisterId').value);
        const displayName = document.getElementById('messagingRegisterName').value.trim();
        const password = document.getElementById('messagingRegisterPassword').value;
        if (!form?.classList.contains('role-step')) {
            const validation = await api('/api/register/validate', { id, display_name: displayName, password });
            if (!validation.ok) {
                showAuthMessage(validation.message || 'Data daftar belum valid.', true);
                return;
            }
            if (validation.normalized_id) document.getElementById('messagingRegisterId').value = validation.normalized_id;
            form.classList.add('role-step');
            document.getElementById('messagingRegisterSubmitBtn').innerHTML = '<i class="fas fa-arrow-right"></i> Lanjutkan';
            showAuthMessage('Pilih peran kamu untuk menyelesaikan pendaftaran.', false);
            return;
        }
        const role = document.querySelector('input[name="messagingRegisterRole"]:checked')?.value || 'fellow';
        const keyPair = await ensureKeyPair(id);
        const publicKey = await exportPublicKey(keyPair.publicKey);
        const result = await api('/api/register', {
            id,
            display_name: displayName,
            password,
            role,
            public_key: JSON.stringify(publicKey)
        });
        if (!result.ok) return showAuthMessage(result.message || 'Register gagal.', true);
        state.token = result.token;
        state.me = result.user;
        state.keyPair = keyPair;
        sessionStorage.setItem('heraiChatSession', JSON.stringify({ token: state.token, user: state.me }));
        enterMessagingApp();
        await refreshMessagingData();
        connectWebSocket();
    }

    function resetRegisterStep() {
        const form = document.getElementById('messagingRegisterForm');
        form?.classList.remove('role-step');
        const button = document.getElementById('messagingRegisterSubmitBtn');
        if (button) button.innerHTML = '<i class="fas fa-user-plus"></i> Daftar Sekarang';
    }

    function enterMessagingApp() {
        document.getElementById('messagingAuthPanel').setAttribute('hidden', '');
        document.getElementById('messagingApp').removeAttribute('hidden');
        document.getElementById('messagingCurrentName').textContent = state.me.display_name;
        document.getElementById('messagingCurrentId').textContent = state.me.id;
        document.getElementById('messagingCurrentAvatar').textContent = getInitials(state.me.display_name);
    }

    function showMessagingAuth(message = '') {
        state.ws?.close();
        state.token = '';
        state.me = null;
        state.users = [];
        state.friends = [];
        state.rooms = [];
        state.currentRoom = null;
        sessionStorage.removeItem('heraiChatSession');
        localStorage.removeItem('heraiChatSession');
        document.getElementById('messagingAuthPanel')?.removeAttribute('hidden');
        document.getElementById('messagingApp')?.setAttribute('hidden', '');
        if (message) showAuthMessage(message, true);
    }

    function logoutMessaging() {
        state.ws?.close();
        sessionStorage.removeItem('heraiChatSession');
        localStorage.removeItem('heraiChatSession');
        location.hash = '#/messaging';
        location.reload();
    }

    async function refreshMessagingData() {
        const [usersResult, friendsResult, roomsResult] = await Promise.all([
            api('/api/users'),
            api('/api/friends', null, 'GET'),
            api('/api/rooms', null, 'GET')
        ]);
        if (isInvalidSession(usersResult) || isInvalidSession(friendsResult) || isInvalidSession(roomsResult)) {
            showMessagingAuth('Sesi chat sudah berakhir. Silakan login ulang.');
            return false;
        }
        state.users = usersResult.users || [];
        state.friends = friendsResult.friends || [];
        state.rooms = roomsResult.rooms || [];
        await Promise.all(state.rooms.map(ensureRoomKey));
        renderFriends();
        renderRooms();
        return true;
    }

    function connectWebSocket() {
        if (state.ws) state.ws.close();
        state.ws = new WebSocket(`${WS}?token=${encodeURIComponent(state.token)}`);
        state.ws.addEventListener('open', () => {
            setConnection('online');
            if (state.me?.id) state.online.add(state.me.id);
            renderFriends();
        });
        state.ws.addEventListener('close', () => {
            setConnection('offline');
            setTimeout(() => state.token && connectWebSocket(), 1800);
        });
        state.ws.addEventListener('message', async event => {
            const message = JSON.parse(event.data);
            if (message.type === 'presence.snapshot') {
                const payload = parsePayload(message.payload);
                state.online = new Set(payload.users || []);
                if (state.me?.id) state.online.add(state.me.id);
                renderFriends();
                return;
            }
            if (message.type === 'presence.update') {
                const payload = parsePayload(message.payload);
                if (payload.status === 'online') state.online.add(payload.user_id);
                else state.online.delete(payload.user_id);
                renderFriends();
                return;
            }
            if (message.type === 'message.new') {
                const payload = parsePayload(message.payload);
                if (!state.rooms.some(room => room.id === payload.room_id)) {
                    await refreshMessagingData();
                }
                await appendMessage(payload);
                if (state.currentRoom?.id === payload.room_id) markRead(payload);
                return;
            }
            if (message.type === 'receipt.read') {
                renderReadReceipt(parsePayload(message.payload));
                return;
            }
            if (message.type === 'typing') {
                const user = getKnownUser(message.user_id);
                const target = document.getElementById('messagingTyping');
                if (target && user && state.currentRoom?.id === message.room_id) {
                    target.textContent = `${user.display_name} sedang mengetik...`;
                    clearTimeout(target._timer);
                    target._timer = setTimeout(() => target.textContent = '', 1200);
                }
                return;
            }
            if (message.type === 'call.invite') {
                handleIncomingCall(message);
                return;
            }
            if (message.type === 'call.accept') {
                handleCallAccepted(message);
                return;
            }
            if (message.type === 'call.signal') {
                handleCallSignal(message);
                return;
            }
            if (message.type === 'call.end') {
                if (message.user_id !== state.me?.id) endCall(false);
            }
        });
    }

    function renderFriends() {
        const list = document.getElementById('messagingFriendsList');
        if (!list) return;
        list.innerHTML = state.friends.map(user => `
            <button type="button" data-start-direct="${escapeHtml(user.id)}">
                <span class="messaging-chat-avatar">${escapeHtml(getInitials(user.display_name))}<i class="presence-dot ${state.online.has(user.id) ? 'online' : ''}"></i></span>
                <span class="messaging-chat-copy">
                    <strong>${escapeHtml(user.display_name)}</strong>
                    <small>${escapeHtml(user.id)}</small>
                </span>
            </button>
        `).join('') || '<p class="messaging-muted">Belum ada teman. Klik icon tambah teman di kanan atas.</p>';
        list.querySelectorAll('[data-start-direct]').forEach(button => {
            button.addEventListener('click', () => startDirectRoom(button.dataset.startDirect).catch(error => {
                setFriendMessage(error.message || 'Gagal membuka chat.', true);
            }));
        });
    }

    function renderRooms() {
        const list = document.getElementById('messagingRoomsList');
        const section = document.getElementById('messagingGroupSection');
        if (!list) return;
        const groupRooms = state.rooms.filter(room => room.type === 'group');
        if (section) section.hidden = groupRooms.length === 0;
        list.innerHTML = groupRooms.map(room => `
            <button type="button" data-open-room="${escapeHtml(room.id)}" class="${state.currentRoom?.id === room.id ? 'active' : ''}">
                <span class="messaging-chat-avatar group"><i class="fas fa-users"></i></span>
                <span class="messaging-chat-copy">
                    <strong>${escapeHtml(getRoomDisplayTitle(room))}</strong>
                    <small>${escapeHtml(room.type)} • ${room.members.length} member</small>
                </span>
            </button>
        `).join('');
        list.querySelectorAll('[data-open-room]').forEach(button => {
            button.addEventListener('click', () => openRoom(button.dataset.openRoom));
        });
    }

    async function startDirectRoom(peerId) {
        const existing = state.rooms.find(room => room.type === 'direct' && room.members.includes(peerId) && room.members.includes(state.me.id));
        if (existing) return openRoom(existing.id);
        const peer = getKnownUser(peerId);
        if (!peer?.public_key) throw new Error('User ini perlu login sekali agar public key E2EE tersedia.');
        const roomKey = await crypto.subtle.generateKey({ name: 'AES-GCM', length: 256 }, true, ['encrypt', 'decrypt']);
        const keyPacket = await buildKeyPackets(roomKey, [state.me, peer]);
        const result = await api('/api/rooms', {
            title: peer.display_name,
            type: 'direct',
            members: [peerId],
            key_packet: keyPacket
        });
        if (!result.ok) throw new Error(result.message || 'Gagal membuat room.');
        state.rooms.unshift(result.room);
        state.roomKeys.set(result.room.id, roomKey);
        renderRooms();
        openRoom(result.room.id);
    }

    async function createGroupRoom(event) {
        event.preventDefault();
        const title = document.getElementById('messagingRoomTitleInput').value.trim() || 'Group Chat';
        const members = document.getElementById('messagingRoomMembers').value.split(',').map(cleanId).filter(Boolean);
        if (!members.length) return alert('Masukkan minimal satu ID member.');
        const memberUsers = [state.me, ...members.map(id => getKnownUser(id)).filter(Boolean)];
        if (memberUsers.length !== members.length + 1) return alert('Ada member yang tidak ditemukan.');
        if (memberUsers.some(user => !user.public_key && user.id !== state.me.id)) return alert('Semua member harus login sekali agar public key E2EE tersedia.');
        const roomKey = await crypto.subtle.generateKey({ name: 'AES-GCM', length: 256 }, true, ['encrypt', 'decrypt']);
        const keyPacket = await buildKeyPackets(roomKey, memberUsers);
        const result = await api('/api/rooms', { title, type: 'group', members, key_packet: keyPacket });
        if (!result.ok) return alert(result.message || 'Gagal membuat group.');
        state.rooms.unshift(result.room);
        state.roomKeys.set(result.room.id, roomKey);
        renderRooms();
        openRoom(result.room.id);
        event.target.reset();
        closeMessagingModal('messagingRoomModal');
    }

    async function openRoom(roomId) {
        const room = state.rooms.find(item => item.id === roomId);
        if (!room) return;
        state.currentRoom = room;
        await ensureRoomKey(room);
        document.getElementById('messagingRoomTitle').textContent = getRoomDisplayTitle(room);
        document.getElementById('messagingRoomMeta').textContent = `${room.members.length} member • encrypted room key`;
        document.getElementById('messagingRoomAvatar').textContent = getInitials(getRoomDisplayTitle(room));
        document.getElementById('messagingTextInput').disabled = false;
        document.getElementById('messagingSendBtn').disabled = false;
        document.getElementById('messagingAttachBtn').disabled = false;
        document.getElementById('messagingVoiceCallBtn').disabled = false;
        document.getElementById('messagingVideoCallBtn').disabled = false;
        renderRooms();
        const result = await api(`/api/rooms/${roomId}/messages`, null, 'GET');
        state.messages.set(roomId, []);
        document.getElementById('messagingMessages').innerHTML = '';
        for (const item of result.messages || []) await appendMessage(item, false);
        scrollMessages();
    }

    async function sendMessage(event) {
        event.preventDefault();
        const input = document.getElementById('messagingTextInput');
        const text = input.value.trim();
        if (!text || !state.currentRoom) return;
        try {
            await sendEncryptedPayload({ kind: 'text', text });
            input.value = '';
        } catch (error) {
            setFriendMessage(error.message || 'Pesan gagal dikirim.', true);
        }
    }

    async function previewAttachment(event) {
        const file = event.target.files?.[0];
        event.target.value = '';
        if (!file) return;
        if (!state.currentRoom) {
            setFriendMessage('Pilih chat atau group dulu sebelum mengirim lampiran.', true);
            return;
        }
        if (file.size > state.config.maxAttachmentBytes) {
            setFriendMessage(`Ukuran file maksimal ${formatBytes(state.config.maxAttachmentBytes)}.`, true);
            return;
        }
        const dataUrl = await fileToDataUrl(file);
        const kind = file.type.startsWith('image/') ? 'image' : file.type.startsWith('video/') ? 'video' : 'document';
        state.pendingFile = {
            kind,
            file: {
                name: file.name,
                type: file.type || 'application/octet-stream',
                size: file.size,
                dataUrl
            }
        };
        showAttachmentPreview();
    }

    function showAttachmentPreview() {
        const modal = document.getElementById('messagingFilePreviewModal');
        const body = document.getElementById('messagingFilePreviewBody');
        if (!modal || !body || !state.pendingFile) return;
        body.innerHTML = renderFilePreview(state.pendingFile);
        modal.hidden = false;
    }

    function clearAttachmentPreview() {
        state.pendingFile = null;
        const modal = document.getElementById('messagingFilePreviewModal');
        const body = document.getElementById('messagingFilePreviewBody');
        if (modal) modal.hidden = true;
        if (body) body.innerHTML = '';
    }

    async function sendPendingAttachment() {
        if (!state.pendingFile) return;
        const button = document.getElementById('messagingConfirmFileBtn');
        const originalText = button?.innerHTML;
        const payload = state.pendingFile;
        try {
            if (button) {
                button.disabled = true;
                button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
            }
            await sendEncryptedPayload(payload, {
                kind: payload.kind,
                file_name: payload.file.name,
                mime_type: payload.file.type,
                file_size: payload.file.size
            });
            clearAttachmentPreview();
        } catch (error) {
            setFriendMessage(error.message || 'Lampiran gagal dikirim.', true);
        } finally {
            if (button) {
                button.disabled = false;
                button.innerHTML = originalText || '<i class="fas fa-paper-plane"></i> Kirim';
            }
        }
    }

    async function sendEncryptedPayload(payload, meta = {}) {
        if (!state.currentRoom) throw new Error('Pilih chat atau group dulu.');
        const roomKey = state.roomKeys.get(state.currentRoom.id);
        if (!roomKey) throw new Error('Room key belum siap. Coba buka ulang chat ini.');
        const encrypted = await encryptText(roomKey, JSON.stringify(payload));
        const result = await api(`/api/rooms/${state.currentRoom.id}/messages`, {
            kind: meta.kind || payload.kind || 'text',
            file_name: meta.file_name || '',
            mime_type: meta.mime_type || '',
            file_size: meta.file_size || 0,
            ciphertext: encrypted.ciphertext,
            nonce: encrypted.nonce,
            alg: 'AES-GCM-256'
        });
        if (!result.ok) throw new Error(result.message || 'Pesan gagal dikirim.');
        if (result.message) await appendMessage(result.message);
    }

    async function appendMessage(message, autoScroll = true) {
        if (!state.roomKeys.has(message.room_id)) {
            const room = state.rooms.find(item => item.id === message.room_id);
            if (room) await ensureRoomKey(room);
        }
        const key = state.roomKeys.get(message.room_id);
        const decrypted = key ? await decryptText(key, message).catch(() => '[Pesan tidak bisa didekripsi di device ini]') : '[Room key belum tersedia]';
        const payload = normalizeMessagePayload(decrypted, message);
        if (!state.messages.has(message.room_id)) state.messages.set(message.room_id, []);
        if (state.messages.get(message.room_id).some(item => item.id === message.id)) return;
        state.messages.get(message.room_id).push({ ...message, payload });
        if (state.currentRoom?.id !== message.room_id) return;
        const wrap = document.getElementById('messagingMessages');
        const mine = message.sender_id === state.me.id;
        const sender = getKnownUser(message.sender_id) || { display_name: message.sender_id };
        wrap.insertAdjacentHTML('beforeend', `
            <div class="messaging-bubble ${mine ? 'mine' : ''}" data-message-id="${escapeHtml(message.id)}">
                <small>${escapeHtml(sender.display_name)} • ${formatTime(message.created_at)}</small>
                ${renderMessagePayload(payload)}
                <em>${mine ? 'sent' : ''}</em>
            </div>
        `);
        if (autoScroll) scrollMessages();
    }

    function markRead(message) {
        if (message.sender_id === state.me.id || state.ws?.readyState !== WebSocket.OPEN) return;
        state.ws.send(JSON.stringify({
            type: 'receipt.read',
            room_id: message.room_id,
            payload: { room_id: message.room_id, message_id: message.id }
        }));
    }

    function renderReadReceipt(receipt) {
        const bubble = document.querySelector(`[data-message-id="${CSS.escape(receipt.message_id)}"] em`);
        const user = getKnownUser(receipt.user_id);
        if (bubble && user && receipt.user_id !== state.me.id) bubble.textContent = `read by ${user.display_name}`;
    }

    function emitTyping() {
        if (!state.currentRoom || state.ws?.readyState !== WebSocket.OPEN) return;
        state.ws.send(JSON.stringify({ type: 'typing', room_id: state.currentRoom.id, payload: { at: Date.now() } }));
    }

    async function addFriend(event) {
        event.preventDefault();
        const friendId = cleanId(document.getElementById('messagingFriendId').value);
        setFriendMessage('');
        if (!friendId) return setFriendMessage('Masukkan ID pengguna dulu.', true);
        if (friendId === state.me.id) return setFriendMessage('ID itu adalah akun kamu sendiri.', true);
        const result = await api('/api/friends', { friend_id: friendId });
        if (isInvalidSession(result)) {
            showMessagingAuth('Sesi chat sudah berakhir. Silakan login ulang.');
            return;
        }
        if (!result.ok) return setFriendMessage(result.message || 'Gagal menambah teman.', true);
        document.getElementById('messagingFriendForm').reset();
        await refreshMessagingData();
        const friend = state.friends.find(user => user.id === friendId) || result.friend;
        setFriendMessage(`${friend?.display_name || friendId} ditambahkan. Membuka chat...`, false, true);
        closeMessagingModal('messagingFriendModal');
        try {
            await startDirectRoom(friendId);
        } catch (error) {
            setFriendMessage(`${friend?.display_name || friendId} sudah masuk daftar teman. ${error.message || 'Chat belum bisa dibuka.'}`, true);
        }
    }

    function setFriendMessage(text, error = false, success = false) {
        const message = document.getElementById('messagingFriendMessage');
        if (!message) return;
        message.textContent = text;
        message.classList.toggle('error', error);
        message.classList.toggle('success', success);
    }

    function syncRolePicker() {
        document.querySelectorAll('.messaging-role-picker label').forEach(label => {
            label.classList.toggle('active', !!label.querySelector('input')?.checked);
        });
    }

    function isInvalidSession(result) {
        return result?.status === 401 || result?.message === 'Sesi chat tidak valid.';
    }

    function renderEmojiPanel() {
        const panel = document.getElementById('messagingEmojiPanel');
        if (!panel) return;
        panel.innerHTML = EMOJIS.map(emoji => `<button type="button" data-emoji="${emoji}">${emoji}</button>`).join('');
        panel.querySelectorAll('[data-emoji]').forEach(button => {
            button.addEventListener('click', () => {
                const input = document.getElementById('messagingTextInput');
                input.value += button.dataset.emoji;
                input.focus();
            });
        });
    }

    function toggleEmojiPanel() {
        const panel = document.getElementById('messagingEmojiPanel');
        if (!panel) return;
        panel.hidden = !panel.hidden;
    }

    function normalizeMessagePayload(decrypted, message) {
        try {
            const parsed = JSON.parse(decrypted);
            if (parsed && typeof parsed === 'object' && parsed.kind) return parsed;
        } catch {}
        return { kind: message.kind || 'text', text: decrypted };
    }

    function renderMessagePayload(payload) {
        if (payload.kind === 'image' && payload.file?.dataUrl) {
            return `
                <div class="messaging-attachment">
                    <img src="${escapeHtml(payload.file.dataUrl)}" alt="${escapeHtml(payload.file.name || 'image')}">
                    <a href="${escapeHtml(payload.file.dataUrl)}" download="${escapeHtml(payload.file.name || 'image')}">${escapeHtml(payload.file.name || 'Download image')}</a>
                </div>
            `;
        }
        if (payload.kind === 'video' && payload.file?.dataUrl) {
            return `
                <div class="messaging-attachment">
                    <video src="${escapeHtml(payload.file.dataUrl)}" controls></video>
                    <a href="${escapeHtml(payload.file.dataUrl)}" download="${escapeHtml(payload.file.name || 'video')}">${escapeHtml(payload.file.name || 'Download video')}</a>
                </div>
            `;
        }
        if (payload.kind === 'document' && payload.file?.dataUrl) {
            return `
                <div class="messaging-attachment">
                    <a href="${escapeHtml(payload.file.dataUrl)}" download="${escapeHtml(payload.file.name || 'document')}">
                        <i class="fas fa-file-lines"></i> ${escapeHtml(payload.file.name || 'Download dokumen')}
                    </a>
                    <small>${formatBytes(payload.file.size || 0)}</small>
                </div>
            `;
        }
        return `<p>${escapeHtml(payload.text || '')}</p>`;
    }

    function renderFilePreview(payload) {
        const file = payload.file || {};
        const name = escapeHtml(file.name || 'Lampiran');
        const size = formatBytes(file.size || 0);
        if (payload.kind === 'image') {
            return `<img src="${escapeHtml(file.dataUrl)}" alt="${name}"><strong>${name}</strong><span>${size}</span>`;
        }
        if (payload.kind === 'video') {
            return `<video src="${escapeHtml(file.dataUrl)}" controls></video><strong>${name}</strong><span>${size}</span>`;
        }
        return `<div class="messaging-file-icon"><i class="fas fa-file-lines"></i></div><strong>${name}</strong><span>${size}</span>`;
    }

    function fileToDataUrl(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    function getKnownUser(userId) {
        if (!userId) return null;
        if (state.me?.id === userId) return state.me;
        return state.friends.find(user => user.id === userId) || state.users.find(user => user.id === userId) || null;
    }

    async function startCall(kind = 'audio') {
        if (!state.currentRoom || state.ws?.readyState !== WebSocket.OPEN) return;
        await setupPeerConnection(kind);
        showCallPanel(kind, `Memanggil ${getRoomDisplayTitle(state.currentRoom)}...`);
        const offer = await state.call.pc.createOffer();
        await state.call.pc.setLocalDescription(offer);
        sendCallEvent('call.invite', { kind, description: offer });
    }

    async function setupPeerConnection(kind) {
        if (state.call.pc) endCall(false);
        state.call.kind = kind;
        state.call.roomId = state.currentRoom.id;
        state.call.active = true;
        state.call.pc = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] });
        state.call.remoteStream = new MediaStream();
        const constraints = { audio: true, video: kind === 'video' };
        state.call.localStream = await navigator.mediaDevices.getUserMedia(constraints);
        state.call.localStream.getTracks().forEach(track => state.call.pc.addTrack(track, state.call.localStream));
        state.call.pc.ontrack = event => {
            event.streams[0].getTracks().forEach(track => state.call.remoteStream.addTrack(track));
            document.getElementById('messagingRemoteVideo').srcObject = state.call.remoteStream;
            document.getElementById('messagingCallStatus').textContent = 'Terhubung';
        };
        state.call.pc.onicecandidate = event => {
            if (event.candidate) sendCallEvent('call.signal', { candidate: event.candidate });
        };
        document.getElementById('messagingLocalVideo').srcObject = state.call.localStream;
    }

    async function handleIncomingCall(event) {
        if (event.user_id === state.me?.id) return;
        const payload = parsePayload(event.payload);
        if (!state.rooms.some(room => room.id === event.room_id)) {
            await refreshMessagingData();
        }
        const caller = getKnownUser(event.user_id)?.display_name || event.user_id;
        state.pendingCall = { event, payload, caller };
        document.getElementById('messagingIncomingTitle').textContent = payload.kind === 'video' ? 'Video Call Masuk' : 'Voice Call Masuk';
        document.getElementById('messagingIncomingMeta').textContent = `${caller} sedang memanggil kamu.`;
        document.getElementById('messagingIncomingCallModal').hidden = false;
    }

    async function acceptIncomingCall() {
        if (!state.pendingCall) return;
        const { event, payload, caller } = state.pendingCall;
        document.getElementById('messagingIncomingCallModal').hidden = true;
        if (state.currentRoom?.id !== event.room_id) await openRoom(event.room_id);
        await setupPeerConnection(payload.kind || 'audio');
        showCallPanel(payload.kind || 'audio', `Terhubung dengan ${caller}`);
        await state.call.pc.setRemoteDescription(payload.description);
        const answer = await state.call.pc.createAnswer();
        await state.call.pc.setLocalDescription(answer);
        sendCallEvent('call.accept', { kind: payload.kind || 'audio', description: answer }, event.room_id);
        state.pendingCall = null;
    }

    function rejectIncomingCall() {
        if (state.pendingCall) {
            sendCallEvent('call.end', { reason: 'declined' }, state.pendingCall.event.room_id);
        }
        state.pendingCall = null;
        document.getElementById('messagingIncomingCallModal').hidden = true;
    }

    async function handleCallAccepted(event) {
        if (event.user_id === state.me?.id || !state.call.pc) return;
        const payload = parsePayload(event.payload);
        await state.call.pc.setRemoteDescription(payload.description);
        document.getElementById('messagingCallStatus').textContent = 'Terhubung';
    }

    async function handleCallSignal(event) {
        if (event.user_id === state.me?.id || !state.call.pc) return;
        const payload = parsePayload(event.payload);
        if (payload.candidate) await state.call.pc.addIceCandidate(payload.candidate).catch(() => {});
    }

    function sendCallEvent(type, payload, roomId = state.currentRoom?.id || state.call.roomId) {
        if (!roomId || state.ws?.readyState !== WebSocket.OPEN) return;
        state.ws.send(JSON.stringify({ type, room_id: roomId, payload }));
    }

    function showCallPanel(kind, status) {
        document.getElementById('messagingCallPanel').hidden = false;
        document.getElementById('messagingCallTitle').textContent = kind === 'video' ? 'Video Call' : 'Voice Call';
        document.getElementById('messagingCallStatus').textContent = status;
    }

    function endCall(notify = true) {
        if (notify && state.call.roomId) sendCallEvent('call.end', { reason: 'ended' }, state.call.roomId);
        state.call.pc?.close();
        state.call.localStream?.getTracks().forEach(track => track.stop());
        state.call.remoteStream?.getTracks().forEach(track => track.stop());
        state.call = { pc: null, localStream: null, remoteStream: null, roomId: '', kind: 'audio', active: false };
        const panel = document.getElementById('messagingCallPanel');
        if (panel) panel.hidden = true;
        const local = document.getElementById('messagingLocalVideo');
        const remote = document.getElementById('messagingRemoteVideo');
        if (local) local.srcObject = null;
        if (remote) remote.srcObject = null;
    }

    async function ensureKeyPair(userId) {
        const keyName = `heraiChatKey:${userId}`;
        const saved = readJson(keyName, null);
        if (saved?.privateKey && saved?.publicKey) {
            return {
                privateKey: await crypto.subtle.importKey('jwk', saved.privateKey, { name: 'ECDH', namedCurve: 'P-256' }, true, ['deriveKey']),
                publicKey: await crypto.subtle.importKey('jwk', saved.publicKey, { name: 'ECDH', namedCurve: 'P-256' }, true, [])
            };
        }
        const pair = await crypto.subtle.generateKey({ name: 'ECDH', namedCurve: 'P-256' }, true, ['deriveKey']);
        localStorage.setItem(keyName, JSON.stringify({
            privateKey: await crypto.subtle.exportKey('jwk', pair.privateKey),
            publicKey: await crypto.subtle.exportKey('jwk', pair.publicKey)
        }));
        return pair;
    }

    async function buildKeyPackets(roomKey, users) {
        const packets = {};
        for (const user of users) {
            const publicJwk = user.id === state.me.id ? await exportPublicKey(state.keyPair.publicKey) : JSON.parse(user.public_key);
            const peerPublic = await crypto.subtle.importKey('jwk', publicJwk, { name: 'ECDH', namedCurve: 'P-256' }, true, []);
            const wrappingKey = await crypto.subtle.deriveKey({ name: 'ECDH', public: peerPublic }, state.keyPair.privateKey, { name: 'AES-GCM', length: 256 }, false, ['wrapKey', 'unwrapKey']);
            const iv = crypto.getRandomValues(new Uint8Array(12));
            const wrapped = await crypto.subtle.wrapKey('raw', roomKey, wrappingKey, { name: 'AES-GCM', iv });
            packets[user.id] = {
                sender_id: state.me.id,
                sender_public_key: await exportPublicKey(state.keyPair.publicKey),
                nonce: toBase64(iv),
                ciphertext: toBase64(new Uint8Array(wrapped))
            };
        }
        return packets;
    }

    async function ensureRoomKey(room) {
        if (state.roomKeys.has(room.id)) return state.roomKeys.get(room.id);
        const packet = room.key_packet?.[state.me.id];
        if (!packet) return null;
        const senderPublic = await crypto.subtle.importKey('jwk', packet.sender_public_key, { name: 'ECDH', namedCurve: 'P-256' }, true, []);
        const wrappingKey = await crypto.subtle.deriveKey({ name: 'ECDH', public: senderPublic }, state.keyPair.privateKey, { name: 'AES-GCM', length: 256 }, false, ['unwrapKey']);
        const roomKey = await crypto.subtle.unwrapKey(
            'raw',
            fromBase64(packet.ciphertext),
            wrappingKey,
            { name: 'AES-GCM', iv: fromBase64(packet.nonce) },
            { name: 'AES-GCM', length: 256 },
            true,
            ['encrypt', 'decrypt']
        );
        state.roomKeys.set(room.id, roomKey);
        return roomKey;
    }

    async function encryptText(key, text) {
        const iv = crypto.getRandomValues(new Uint8Array(12));
        const encoded = new TextEncoder().encode(text);
        const cipher = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, encoded);
        return { nonce: toBase64(iv), ciphertext: toBase64(new Uint8Array(cipher)) };
    }

    async function decryptText(key, message) {
        const plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: fromBase64(message.nonce) }, key, fromBase64(message.ciphertext));
        return new TextDecoder().decode(plain);
    }

    async function exportPublicKey(key) {
        return crypto.subtle.exportKey('jwk', key);
    }

    async function api(path, body = null, method = body ? 'POST' : 'GET') {
        const options = { method, headers: { 'Content-Type': 'application/json' } };
        if (state.token) options.headers.Authorization = `Bearer ${state.token}`;
        if (body) options.body = JSON.stringify(body);
        const response = await fetch(`${API}${path}`, options);
        const data = await response.json().catch(() => ({ ok: false, message: 'Respons server tidak valid.' }));
        data.status = response.status;
        return data;
    }

    function setConnection(status) {
        const badge = document.getElementById('messagingConnectionBadge');
        if (!badge) return;
        badge.textContent = status;
        badge.classList.toggle('online', status === 'online');
    }

    function showAuthMessage(message, error = false) {
        const target = document.getElementById('messagingAuthMessage');
        if (!target) return;
        target.textContent = message;
        target.classList.toggle('error', error);
    }

    function scrollMessages() {
        const box = document.getElementById('messagingMessages');
        if (box) box.scrollTop = box.scrollHeight;
    }

    function cleanId(value) {
        return String(value || '').toLowerCase().trim().replace(/\s+/g, '-');
    }

    function getRoomDisplayTitle(room) {
        if (room.type !== 'direct') return room.title;
        const peerId = room.members.find(id => id !== state.me?.id);
        const peer = getKnownUser(peerId);
        return peer?.display_name || room.title || peerId || 'Direct Chat';
    }

    function readJson(key, fallback) {
        try { return JSON.parse(sessionStorage.getItem(key) || localStorage.getItem(key) || ''); } catch { return fallback; }
    }

    function parsePayload(payload) {
        if (!payload) return {};
        if (typeof payload === 'string') {
            try { return JSON.parse(payload); } catch { return {}; }
        }
        return payload;
    }

    function toBase64(bytes) {
        return btoa(String.fromCharCode(...bytes));
    }

    function fromBase64(value) {
        return Uint8Array.from(atob(value), char => char.charCodeAt(0));
    }

    function formatTime(value) {
        return value ? new Date(value).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : '';
    }

    function formatBytes(bytes) {
        if (!bytes) return '0 B';
        const units = ['B', 'KB', 'MB', 'GB'];
        const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
        return `${(bytes / Math.pow(1024, index)).toFixed(index ? 1 : 0)} ${units[index]}`;
    }

    function getInitials(value) {
        return String(value || '?')
            .trim()
            .split(/\s+/)
            .slice(0, 2)
            .map(part => part[0]?.toUpperCase() || '')
            .join('') || '?';
    }

    function resolveMessagingApiBase() {
        const explicit = String(window.HERAI_MESSAGING_URL || localStorage.getItem('herai_messaging_api_url') || '').trim();
        if (explicit) return explicit.replace(/\/$/, '');
        if (['localhost', '127.0.0.1', '::1'].includes(location.hostname)) return LOCAL_MESSAGING_URL;
        return DEFAULT_RENDER_MESSAGING_URL;
    }

    function escapeHtml(value) {
        return String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char]));
    }
})();
