/* ==========================================================================
   js/admin-modules.js
   Logic UI terpusat untuk Modul Tambahan Data Sorcerers Panel
   + SISTEM MATA-MATA (LOG AKTIVITAS) FULL TRACKING & SIDEBAR GLOBAL
   ========================================================================== */

   (function() {

   const API_URL = '/__gas';

   function getAdminToken() {
       try {
           var p = JSON.parse(localStorage.getItem('heraiAdminProfile') || '{}');
           if (p.expires_at && new Date(p.expires_at).getTime() < Date.now()) {
               localStorage.removeItem('adminId');
               localStorage.removeItem('heraiAdminProfile');
               sessionStorage.clear();
               window.location.hash = '#/dashboard';
               setTimeout(function() { window.location.reload(true); }, 50);
               return '';
           }
           return p.token || '';
       } catch (_) { return ''; }
   }

   function withAdminToken(obj) {
       return Object.assign({}, obj, { adminToken: getAdminToken() });
   }

   function escapeHtml(value) {
       return String(value ?? '')
           .replace(/&/g, '&amp;')
           .replace(/</g, '&lt;')
           .replace(/>/g, '&gt;')
           .replace(/"/g, '&quot;')
           .replace(/'/g, '&#039;');
   }

   function escapeAttr(value) {
       return escapeHtml(value);
   }

   // ==========================================
   // 0. GLOBAL HELPERS: DEVICE, LOCATION & LOGGING
   // ==========================================
   
   window.getAdminSystemContext = async function() {
       if (window.__HERAI_ADMIN_CONTEXT__) return window.__HERAI_ADMIN_CONTEXT__;
       const ua = navigator.userAgent;
       let os = "Unknown OS";
       if (/windows/i.test(ua)) os = "Windows";
       else if (/mac/i.test(ua)) os = "Mac OS";
       else if (/android/i.test(ua)) os = "Android";
       else if (/iphone|ipad/i.test(ua)) os = "iOS";
   
       let browser = "Unknown Browser";
       if (/chrome|crios/i.test(ua)) browser = "Chrome";
       else if (/firefox|fxios/i.test(ua)) browser = "Firefox";
       else if (/safari/i.test(ua)) browser = "Safari";
       else if (/edge/i.test(ua)) browser = "Edge";
   
       let loc = "Unknown Location";
       let gps = "";
       try {
           const controller = new AbortController();
           const timeoutId = setTimeout(() => controller.abort(), 3000);
           const res = await fetch('https://ipapi.co/json/', { signal: controller.signal });
           clearTimeout(timeoutId);
           if (res.ok) {
               const data = await res.json();
               loc = `IP ${data.ip || 'Unknown'} (${data.city || 'Unknown City'}, ${data.country_code || 'ID'})`;
           }
       } catch (e) {
           console.warn("Tracker lokasi timeout atau diblokir oleh browser.");
       }

       if (navigator.geolocation) {
           try {
               const position = await Promise.race([
                   new Promise((resolve, reject) => {
                       navigator.geolocation.getCurrentPosition(resolve, reject, {
                           enableHighAccuracy: true,
                           timeout: 3000,
                           maximumAge: 10 * 60 * 1000
                       });
                   }),
                   new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 3000))
               ]);
               const { latitude, longitude, accuracy } = position.coords;
               gps = `GPS ${latitude.toFixed(5)}, ${longitude.toFixed(5)} ±${Math.round(accuracy || 0)}m`;
           } catch (error) {
               gps = "GPS permission not granted or timeout";
           }
       }
   
       window.__HERAI_ADMIN_CONTEXT__ = { device: `${os} • ${browser}`, lokasi: gps ? `${loc} • ${gps}` : loc };
       return window.__HERAI_ADMIN_CONTEXT__;
   };
   
   window.logAdminActivity = async function(tindakan) {
       const adminId = localStorage.getItem('adminId');
       if (!adminId) return; 
   
       const sys = await window.getAdminSystemContext();
   
        try {
            await fetch(API_URL, {
                method: 'POST',
                body: JSON.stringify(withAdminToken({
                    action: 'logActivity', 
                    adminId: adminId,
                    tindakan: tindakan,
                    perangkat: sys.device,
                    lokasi: sys.lokasi
                }))
            });
           console.log(`[Audit Logged] ${tindakan}`);
       } catch (e) {
           console.error("Gagal mencatat log aktivitas:", e);
       }
   };
   
   window.checkAdminAccess = function() {
       if (!localStorage.getItem('adminId') && !sessionStorage.getItem('isAdminLoggedIn')) {
           alert("Sesi Admin belum aktif atau terputus.");
           window.location.hash = "#/dashboard"; 
           return false;
       }
       return true;
   };

   const ADMIN_ROUTE_ACCESS = {
       superadmin: ['*'],
       reviewer: ['/dashboard', '/dashboard/seleksi', '/skoring', '/ai-prescreening', '/competency-monitor', '/retest-monitor', '/data-visualization', '/learning-content'],
       kurator: ['/dashboard', '/dashboard/seleksi', '/anti-fraud', '/comm-engine', '/assets', '/learning-content']
   };

   function getStoredAdminProfile() {
       try {
           return JSON.parse(localStorage.getItem('heraiAdminProfile') || '{}');
       } catch (error) {
           return {};
       }
   }

   function normalizeAdminRole(profile) {
       const raw = String(profile.role || profile.peran_admin || 'reviewer').toLowerCase().replace(/[\s_-]+/g, '');
       if (raw.includes('super')) return 'superadmin';
       if (raw.includes('kurator') || raw === 'admin') return 'kurator';
       return 'reviewer';
   }

   function parseAdminPermissions(value) {
       if (Array.isArray(value)) return value.map(item => String(item).trim()).filter(Boolean);
       return String(value || '').split(',').map(item => item.trim()).filter(Boolean);
   }

   window.getCurrentAdminAccess = function() {
       const profile = getStoredAdminProfile();
       const role = normalizeAdminRole(profile);
       
       if (role === 'superadmin') {
           return { profile, role, routes: ['*'] };
       }
       
       const explicit = parseAdminPermissions(profile.permissions);
       const routes = explicit.length && !explicit.includes('all')
           ? explicit.map(item => item.startsWith('/') ? item : `/${item}`)
           : (explicit.includes('all') ? ['*'] : (ADMIN_ROUTE_ACCESS[role] || ADMIN_ROUTE_ACCESS.reviewer));
       return { profile, role, routes };
   };

   window.canAdminAccessPath = function(path) {
       if (path === '/dashboard') return true;
       if (!localStorage.getItem('adminId') || !sessionStorage.getItem('isAdminLoggedIn')) return false;
       if (path === '/learning-content') return true;
       const access = window.getCurrentAdminAccess();
       return access.routes.includes('*') || access.routes.includes(path);
   };

   window.applyAdminSidebarAccess = function(container = document.getElementById('sidebar-container')) {
       if (!container) return;
       container.querySelectorAll('.nav-menu .nav-item').forEach(item => {
           const link = item.querySelector('a[href^="#/"]');
           if (!link) return;
           const path = link.getAttribute('href').slice(1);
           item.style.display = window.canAdminAccessPath(path) ? '' : 'none';
       });
       container.querySelectorAll('.nav-label').forEach(label => {
           let next = label.nextElementSibling;
           let hasVisibleItem = false;
           while (next && !next.classList.contains('nav-label')) {
               if (next.classList.contains('nav-item') && next.style.display !== 'none') hasVisibleItem = true;
               next = next.nextElementSibling;
           }
           label.style.display = hasVisibleItem ? '' : 'none';
       });
   };

   window.applyAdminDashboardAccess = function() {
       document.querySelectorAll('.feature-card').forEach(card => {
           const link = card.querySelector('a[href^="#/"]');
           if (!link) return;
           card.style.display = window.canAdminAccessPath(link.getAttribute('href').slice(1)) ? '' : 'none';
       });
   };

   const LEARNING_STORAGE_KEY = 'herai_learning_content';

   function defaultLearningContent() {
       return [
           {
               id: 'ai-fundamental-01-intro-materi',
               course: 'AI Fundamentals & Advanced',
               module: 'Pengantar AI',
               lesson: 'Apa itu Artificial Intelligence?',
               type: 'materi',
               duration: '45 menit',
               tag: 'Dasar',
               description: 'Memahami dasar-dasar Artificial Intelligence dan bagaimana AI bekerja dalam kehidupan sehari-hari.',
               body: '<h2>Pengantar AI</h2><p>Kecerdasan Buatan adalah cabang ilmu komputer yang berfokus pada sistem yang mampu melakukan tugas yang biasanya memerlukan kecerdasan manusia.</p>',
               heroImage: '/assets/messaging/herai-chat-persona.png',
               assetLink: '/Users/marchelandrianshevchenko/Downloads/2024-wttc-introduction-to-ai.pdf',
               references: 'World Travel & Tourism Council. Introduction to Artificial Intelligence (AI) Technology, January 2024.',
               published: true,
               updatedAt: new Date().toISOString()
           }
       ];
   }

   function loadLearningContentLocal() {
       try {
           const saved = JSON.parse(localStorage.getItem(LEARNING_STORAGE_KEY) || '[]');
           return saved.length ? saved : defaultLearningContent();
       } catch {
           return defaultLearningContent();
       }
   }

   function saveLearningContentLocal(items) {
       localStorage.setItem(LEARNING_STORAGE_KEY, JSON.stringify(items));
   }

   const EXERCISE_MODULE_LABELS = {
       'ai-fundamentals': 'Pengantar AI',
       'python-untuk-ai': 'Python untuk AI',
       'reasoning': 'Reasoning',
       'konsep-ai-modern': 'Konsep AI Modern',
       'evaluation': 'Evaluation',
       'evolution': 'Evolution'
   };

   async function postExerciseReviewAction(action, extra) {
       const profile = getStoredAdminProfile();
       if (!profile.token) throw new Error('Token admin belum tersedia. Logout lalu login ulang setelah backend terbaru dideploy.');
       const response = await fetch(API_URL, {
           method: 'POST',
           headers: { 'Content-Type': 'text/plain;charset=utf-8' },
           body: JSON.stringify(Object.assign({
               action,
               adminToken: profile.token,
               adminId: profile.id_admin || profile.adminId || localStorage.getItem('adminId') || ''
           }, extra || {}))
       });
       const result = await response.json().catch(() => ({}));
       if (!response.ok || !result || result.status !== 'success') {
           throw new Error(result?.message || 'Server review latihan belum dapat diakses.');
       }
       return result;
   }

   function initExerciseReviewManager() {
       const panel = document.getElementById('exerciseReviewPanel');
       const list = document.getElementById('exerciseReviewList');
       const form = document.getElementById('exerciseReviewForm');
       if (!panel || !list || !form || panel.dataset.ready === 'true') return;
       panel.dataset.ready = 'true';

       const statusNode = document.getElementById('exerciseReviewStatus');
       const content = document.getElementById('exerciseReviewContent');
       const empty = document.getElementById('exerciseReviewEmpty');
       const moduleFilter = document.getElementById('exerciseReviewModule');
       const statusFilter = document.getElementById('exerciseReviewStatusFilter');
       const search = document.getElementById('exerciseReviewSearch');
       const scoreInput = document.getElementById('exerciseReviewScore');
       const feedbackInput = document.getElementById('exerciseReviewFeedback');
       const submitButton = document.getElementById('btnExerciseReviewSubmit');
       let submissions = [];
       let activeId = '';

       const setStatus = (message, isError) => {
           statusNode.textContent = message;
           statusNode.style.color = isError ? 'var(--danger)' : 'var(--text-muted)';
       };
       const activeSubmission = () => submissions.find(item => item.submission_id === activeId) || null;
       const statusLabel = value => ({ draft: 'Draft', submitted: 'Menunggu review', reviewed: 'Sudah direview' }[value] || value || '-');

       const renderDetail = () => {
           const item = activeSubmission();
           empty.hidden = Boolean(item);
           content.hidden = !item;
           if (!item) return;
           document.getElementById('exerciseReviewParticipant').textContent = `${item.nama_lengkap || 'Peserta'} · ${item.nik || '-'}`;
           document.getElementById('exerciseReviewModuleLabel').textContent = EXERCISE_MODULE_LABELS[item.module_id] || item.module_id || '-';
           document.getElementById('exerciseReviewSubmissionStatus').textContent = statusLabel(item.status);
           const answers = item.answers && typeof item.answers === 'object' ? item.answers : {};
           document.getElementById('exerciseReviewAnswers').innerHTML = Object.keys(answers).map((key, index) => `
               <article class="exercise-review-answer">
                   <strong>${index + 1}. ${escapeHtml(key)}</strong>
                   <p>${escapeHtml(answers[key] || '(kosong)')}</p>
               </article>
           `).join('') || '<p>Jawaban tidak tersedia.</p>';
           scoreInput.value = item.score == null ? '' : item.score;
           feedbackInput.value = item.feedback || '';
           const isDraft = item.status === 'draft';
           scoreInput.disabled = isDraft;
           feedbackInput.disabled = isDraft;
           submitButton.disabled = isDraft;
           submitButton.title = isDraft ? 'Peserta belum mengirim draft ini.' : '';
       };

       const renderList = () => {
           list.innerHTML = submissions.map(item => `
               <button type="button" class="${item.submission_id === activeId ? 'active' : ''}" data-exercise-submission="${escapeAttr(item.submission_id)}">
                   <strong>${escapeHtml(item.nama_lengkap || 'Peserta')}</strong>
                   <small>${escapeHtml(EXERCISE_MODULE_LABELS[item.module_id] || item.module_id || '-')} · ${escapeHtml(statusLabel(item.status))}</small>
                   <small>${escapeHtml(item.nik || '-')} · ${escapeHtml(item.submitted_at || item.updated_at || '-')}</small>
               </button>
           `).join('') || '<div class="exercise-review-empty">Tidak ada submission sesuai filter.</div>';
           list.querySelectorAll('[data-exercise-submission]').forEach(button => {
               button.addEventListener('click', () => {
                   activeId = button.dataset.exerciseSubmission;
                   renderList();
                   renderDetail();
               });
           });
       };

       const loadSubmissions = async () => {
           setStatus('Memuat submission latihan...', false);
           try {
               const result = await postExerciseReviewAction('getExerciseSubmissions', {
                   module_id: moduleFilter.value,
                   submission_status: statusFilter.value,
                   query: search.value.trim()
               });
               submissions = Array.isArray(result.data) ? result.data : [];
               if (!submissions.some(item => item.submission_id === activeId)) activeId = submissions[0]?.submission_id || '';
               renderList();
               renderDetail();
               setStatus(`${submissions.length} submission ditemukan.`, false);
           } catch (error) {
               submissions = [];
               activeId = '';
               renderList();
               renderDetail();
               setStatus(error.message, true);
           }
       };

       document.getElementById('btnExerciseReviewRefresh')?.addEventListener('click', loadSubmissions);
       moduleFilter.addEventListener('change', loadSubmissions);
       statusFilter.addEventListener('change', loadSubmissions);
       search.addEventListener('keydown', event => {
           if (event.key === 'Enter') { event.preventDefault(); loadSubmissions(); }
       });
       form.addEventListener('submit', async event => {
           event.preventDefault();
           const item = activeSubmission();
           if (!item || item.status === 'draft') return;
           submitButton.disabled = true;
           setStatus('Menyimpan review mentor...', false);
           try {
               const context = typeof window.getAdminSystemContext === 'function'
                   ? await window.getAdminSystemContext()
                   : { device: navigator.userAgent, lokasi: 'Learning Content' };
               const result = await postExerciseReviewAction('reviewExerciseSubmission', {
                   submission_id: item.submission_id,
                   score: scoreInput.value,
                   feedback: feedbackInput.value.trim(),
                   perangkat: context.device,
                   lokasi: context.lokasi
               });
               Object.assign(item, result.submission || {});
               renderList();
               renderDetail();
               setStatus('Review tersimpan dan dapat dibaca peserta.', false);
           } catch (error) {
               setStatus(error.message, true);
           } finally {
               submitButton.disabled = activeSubmission()?.status === 'draft';
           }
       });

       loadSubmissions();
   }

   window.initLearningContentManager = async function() {
       if (!window.checkAdminAccess()) return;
       await window.loadSidebar?.();
       window.setActiveSidebar?.();
       initExerciseReviewManager();

       const list = document.getElementById('learningModuleList');
       const form = document.getElementById('learningContentForm');
       if (!list || !form || form.dataset.ready) return;
       form.dataset.ready = 'true';

       const status = document.getElementById('learningStatus');
       const fields = {
           course: document.getElementById('learningCourse'),
           module: document.getElementById('learningModule'),
           lesson: document.getElementById('learningLesson'),
           type: document.getElementById('learningType'),
           duration: document.getElementById('learningDuration'),
           tag: document.getElementById('learningTag'),
           description: document.getElementById('learningDescription'),
           body: document.getElementById('learningBody'),
           heroImage: document.getElementById('learningHeroImage'),
           assetLink: document.getElementById('learningAssetLink'),
           references: document.getElementById('learningReferences'),
           published: document.getElementById('learningPublished')
       };
       let items = loadLearningContentLocal();
       let activeId = items[0]?.id || null;

       const setStatus = (message) => {
           if (status) status.textContent = message;
       };
       const activeItem = () => items.find(item => item.id === activeId);
       const fillForm = (item) => {
           if (!item) return;
           Object.keys(fields).forEach((key) => {
               if (key === 'published') fields[key].checked = !!item[key];
               else fields[key].value = item[key] || '';
           });
           document.getElementById('learningEditorTitle').textContent = `${item.module || 'Modul'} - ${item.type || 'materi'}`;
           document.getElementById('learningEditorMode').textContent = item.published ? 'Published Content' : 'Draft Editor';
       };
       const render = () => {
           list.innerHTML = items.map(item => `
               <button type="button" class="${item.id === activeId ? 'active' : ''}" data-learning-id="${escapeAttr(item.id)}">
                   <strong>${escapeHtml(item.module || 'Untitled Module')} / ${escapeHtml(item.lesson || 'Untitled Lesson')}</strong>
                   <small>${escapeHtml(item.course || '-')} • ${escapeHtml(item.type || 'materi')} • ${item.published ? 'Published' : 'Draft'}</small>
               </button>
           `).join('');
           list.querySelectorAll('[data-learning-id]').forEach(button => {
               button.addEventListener('click', () => {
                   activeId = button.dataset.learningId;
                   render();
                   fillForm(activeItem());
               });
           });
       };
       const collect = () => {
           const current = activeItem() || {};
           const now = new Date().toISOString();
           const idBase = `${fields.course.value}-${fields.module.value}-${fields.lesson.value}-${fields.type.value}`
               .toLowerCase()
               .replace(/[^a-z0-9]+/g, '-')
               .replace(/^-|-$/g, '');
           return {
               ...current,
               id: current.id || idBase || `learning-${Date.now()}`,
               course: fields.course.value.trim(),
               module: fields.module.value.trim(),
               lesson: fields.lesson.value.trim(),
               type: fields.type.value,
               duration: fields.duration.value.trim(),
               tag: fields.tag.value.trim(),
               description: fields.description.value.trim(),
               body: fields.body.value,
               heroImage: fields.heroImage.value.trim(),
               assetLink: fields.assetLink.value.trim(),
               references: fields.references.value.trim(),
               published: fields.published.checked,
               updatedAt: now
           };
       };
       const persist = (message) => {
           saveLearningContentLocal(items);
           render();
           fillForm(activeItem());
           setStatus(message);
       };

       document.getElementById('btnAddLearningModule')?.addEventListener('click', () => {
           const item = {
               id: `learning-${Date.now()}`,
               course: 'AI Fundamentals & Advanced',
               module: 'Pengantar AI',
               lesson: 'Materi Baru',
               type: 'materi',
               duration: '30 menit',
               tag: 'Draft',
               description: '',
               body: '',
               heroImage: '/assets/messaging/herai-chat-persona.png',
               assetLink: '',
               references: '',
               published: false,
               updatedAt: new Date().toISOString()
           };
           items.unshift(item);
           activeId = item.id;
           persist('Draft baru dibuat.');
       });

       form.addEventListener('submit', (event) => {
           event.preventDefault();
           const payload = collect();
           const idx = items.findIndex(item => item.id === activeId);
           if (idx >= 0) items[idx] = payload;
           else items.unshift(payload);
           activeId = payload.id;
           persist('Draft tersimpan lokal.');
           window.logAdminActivity?.(`Menyimpan learning content ${payload.module} / ${payload.lesson}`).catch(() => {});
       });

       document.getElementById('btnLearningPublish')?.addEventListener('click', () => {
           const payload = collect();
           payload.published = !payload.published;
           const idx = items.findIndex(item => item.id === activeId);
           if (idx >= 0) items[idx] = payload;
           activeId = payload.id;
           persist(payload.published ? 'Materi dipublish.' : 'Materi dinonaktifkan.');
       });

       document.getElementById('btnLearningDelete')?.addEventListener('click', () => {
           if (!activeId || !confirm('Hapus konten pembelajaran ini?')) return;
           items = items.filter(item => item.id !== activeId);
           if (!items.length) items = defaultLearningContent();
           activeId = items[0].id;
           persist('Konten dihapus.');
       });

       document.getElementById('btnLearningSync')?.addEventListener('click', async () => {
           setStatus('Menyinkronkan ke GAS...');
           try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    body: JSON.stringify(withAdminToken({
                        action: 'saveLearningContent',
                        adminId: localStorage.getItem('adminId') || 'unknown-admin',
                        items
                    }))
                });
               const result = await response.json().catch(() => ({}));
               if (!response.ok || result.status === 'error') throw new Error(result.message || 'GAS belum menerima action saveLearningContent');
               setStatus('Sinkron GAS berhasil.');
           } catch (error) {
               setStatus(`Tersimpan lokal. GAS belum siap: ${error.message}`);
           }
       });

       render();
       fillForm(activeItem());
   };
   
   // PERBAIKAN LOGOUT: Synchronous & Clean
   window.handleAdminLogout = function(event) {
       if (event) event.preventDefault();
       
       const adminId = localStorage.getItem('adminId');
       if (!adminId) {
           window.location.hash = "#/dashboard";
           window.location.reload();
           return;
       }
       
       // Log aktivitas (fire and forget)
       window.logAdminActivity("Melakukan Logout dari sistem").catch(() => {});
       
       // Hapus sesi
       localStorage.removeItem('adminId');
       localStorage.removeItem('heraiAdminProfile');
       sessionStorage.clear();
       
       // Redirect dan reload
       window.location.hash = "#/dashboard";
       setTimeout(() => {
           window.location.reload(true);
       }, 50);
   };
   
   window.toggleModal = function(modalId, action) {
       const modal = document.getElementById(modalId);
       if (modal) {
           if (action === 'open') {
               modal.classList.add('active');
               document.body.style.overflow = 'hidden';
           } else {
               modal.classList.remove('active');
               document.body.style.overflow = 'auto';
           }
       }
   };
   
   // ==========================================
   // PERBAIKAN SIDEBAR: Sinkron dengan hashchange
   // ==========================================
   window.loadSidebar = async function() {
       const sidebarContainer = document.getElementById('sidebar-container');
       if (!sidebarContainer) return;
   
       // Load sidebar HTML jika belum ada
       if (sidebarContainer.innerHTML.trim() === "") {
           try {
               if (!window.__HERAI_SIDEBAR_HTML__) {
                   const response = await fetch('/components/sidebar.html'); 
                if (response.ok) {
                        window.__HERAI_SIDEBAR_HTML__ = await response.text();
                    }
                }
                sidebarContainer.innerHTML = window.__HERAI_SIDEBAR_HTML__ || '';
           } catch (error) {
               console.error("Gagal memuat sidebar:", error);
               return;
           }
       }
       window.applyAdminSidebarAccess(sidebarContainer);
   
       // Update active state berdasarkan hash saat ini
       updateSidebarActiveState();

       if (typeof window.initAdminMobileMenu === "function") {
           window.initAdminMobileMenu();
       }
   };
   
   window.initAdminMobileMenu = function() {
       const dashboardLayout = document.querySelector('.dashboard-layout');
       const topbarLeft = document.querySelector('.topbar-left');
       const sidebar = document.querySelector('.sidebar');
   
       if (!dashboardLayout || !topbarLeft || !sidebar) return;
   
       if (!topbarLeft.querySelector('.admin-menu-toggle')) {
           // Wrap the existing h1 and p into a div so flex layout doesn't break them
           const textWrapper = document.createElement('div');
           while (topbarLeft.firstChild) {
               textWrapper.appendChild(topbarLeft.firstChild);
           }
           topbarLeft.appendChild(textWrapper);

           const toggleBtn = document.createElement('button');
           toggleBtn.className = 'admin-menu-toggle';
           toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
           toggleBtn.setAttribute('aria-label', 'Toggle Sidebar');
           
           topbarLeft.insertBefore(toggleBtn, topbarLeft.firstChild);
   
           toggleBtn.addEventListener('click', () => {
               sidebar.classList.add('mobile-active');
               let scrim = document.querySelector('.admin-sidebar-scrim');
               if (scrim) scrim.classList.add('active');
               document.body.style.overflow = 'hidden';
           });
       }
   
       let scrim = dashboardLayout.querySelector('.admin-sidebar-scrim');
       if (!scrim) {
           scrim = document.createElement('div');
           scrim.className = 'admin-sidebar-scrim';
           dashboardLayout.appendChild(scrim);
   
           scrim.addEventListener('click', () => {
               sidebar.classList.remove('mobile-active');
               scrim.classList.remove('active');
               document.body.style.overflow = '';
           });
       }
   
       sidebar.querySelectorAll('.nav-link').forEach(link => {
           if (!link.dataset.mobileListener) {
               link.dataset.mobileListener = "true";
               link.addEventListener('click', () => {
                   if (window.innerWidth <= 1024) {
                       sidebar.classList.remove('mobile-active');
                       let s = document.querySelector('.admin-sidebar-scrim');
                       if (s) s.classList.remove('active');
                       document.body.style.overflow = '';
                   }
               });
           }
       });
   };
   
   // Fungsi terpisah untuk update active state (dipanggil saat hashchange)
   window.updateSidebarActiveState = function() {
       const sidebarContainer = document.getElementById('sidebar-container');
       if (!sidebarContainer) return;
       
       // Hapus semua active class
       const allLinks = sidebarContainer.querySelectorAll('a');
       allLinks.forEach(link => link.classList.remove('active'));
       
       // Dapatkan hash saat ini
       let currentHash = window.location.hash;
       if(currentHash === "" || currentHash === "#/") currentHash = "#/dashboard";
   
       // Set active pada link yang sesuai
       const activeLink = sidebarContainer.querySelector(`a[href="${currentHash}"]`);
       if (activeLink) {
           activeLink.classList.add('active');
       }
   };
   
   // Update admin profile info
   window.updateAdminProfile = function() {
       const adminId = localStorage.getItem('adminId');
       if (!adminId) return;
       
       const adminName = adminId.split('-')[0] || 'Admin';
       const adminProfileElements = document.querySelectorAll('.admin-profile');
       
       adminProfileElements.forEach(el => {
           const nameEl = el.querySelector('.admin-name');
           const idEl = el.querySelector('.admin-id');
           
           if (nameEl) nameEl.textContent = adminName.toUpperCase();
           if (idEl) idEl.textContent = adminId;
       });
   };
   
   
   // ==========================================
   // 1. ANTI-FRAUD CHECKER
   // ==========================================
   window.initAntiFraud = async function() {
       await window.loadSidebar();
       if (!window.checkAdminAccess()) return;
       window.updateAdminProfile();
   
       window.logAdminActivity("Sedang melihat halaman Anti-Fraud Check");
   
       const btnRunScan = document.getElementById('btnRunScan');
       const scanArea = document.getElementById('scanProgressArea');
       if (btnRunScan && scanArea) {
           btnRunScan.onclick = async () => {
               window.logAdminActivity("Menjalankan pemindaian Anti-Fraud System (System Scan)"); 
               scanArea.style.display = 'block';
               btnRunScan.disabled = true;
               btnRunScan.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Scanning...';
               await runDuplicateIdentityScan();
               setTimeout(() => {
                   scanArea.style.display = 'none';
                   btnRunScan.disabled = false;
                   btnRunScan.innerHTML = '<i class="fas fa-radar"></i> Jalankan System Scan';
               }, 350);
           };
       }

       document.getElementById('searchFraud')?.addEventListener('input', renderFraudRows);
       document.getElementById('filterRisk')?.addEventListener('change', renderFraudRows);
       await runDuplicateIdentityScan();
   
       document.addEventListener('click', e => {
           if (window.location.hash !== '#/anti-fraud') return;
           const detailBtn = e.target.closest('.btn-fraud-detail');
           if (detailBtn) {
               window.logAdminActivity("Membuka detail investigasi duplikasi pendaftar");
               openFraudDetail(detailBtn.dataset.id);
           }
           if (e.target.closest('#btnCloseInvestigate') || e.target.closest('#btnCancelInvestigate')) {
               window.logAdminActivity("Menutup Modal Investigasi Fraud");
               window.toggleModal('investigationModal', 'close');
           }
       });
   };

   let fraudFindings = [];

   async function runDuplicateIdentityScan() {
       const tbody = document.getElementById('fraudTableBody');
       if (tbody) {
           tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:40px; color:var(--text-muted);"><i class="fas fa-circle-notch fa-spin"></i> Membaca database pendaftar...</td></tr>`;
       }
       try {
            const response = await fetch(API_URL, {
                method: 'POST',
                body: JSON.stringify(withAdminToken({ action: 'getData' }))
            });
           const result = await response.json();
           if (result.status !== 'success') throw new Error(result.message || 'Gagal mengambil data pendaftar');
           fraudFindings = buildDuplicateFindings(result.data || []);
           renderFraudRows();
           updateFraudStats();
       } catch (error) {
           if (tbody) tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:35px; color:var(--danger);">Gagal memindai database: ${escapeHtml(error.message)}</td></tr>`;
       }
   }

   function buildDuplicateFindings(participants) {
       const buckets = new Map();
       const addToBucket = (type, value, participant) => {
           const clean = normalizeFraudValue(type, value);
           if (!clean) return;
           const key = `${type}:${clean}`;
           if (!buckets.has(key)) buckets.set(key, { id: key, type, value: clean, participants: [] });
           buckets.get(key).participants.push(participant);
       };

       participants.forEach(participant => {
           addToBucket('nik', participant.nik, participant);
           addToBucket('email', participant.email, participant);
           addToBucket('whatsapp', participant.whatsapp, participant);
       });

       return [...buckets.values()]
           .filter(item => item.participants.length > 1)
           .map(item => ({
               ...item,
               risk: item.type === 'nik' ? 'high' : 'medium',
               label: item.type === 'nik' ? 'NIK dobel' : item.type === 'email' ? 'Email dobel' : 'WhatsApp dobel'
           }))
           .sort((a, b) => (a.risk === b.risk ? b.participants.length - a.participants.length : a.risk === 'high' ? -1 : 1));
   }

   function normalizeFraudValue(type, value) {
       const raw = String(value || '').trim().toLowerCase();
       if (!raw || raw === '-') return '';
       if (type === 'email') return raw;
       const digits = raw.replace(/\D/g, '');
       if (type === 'nik') return digits.length >= 12 ? digits : '';
       if (type === 'whatsapp') {
           if (digits.length < 8) return '';
           return digits.replace(/^62/, '0');
       }
       return raw;
   }

   function renderFraudRows() {
       const tbody = document.getElementById('fraudTableBody');
       if (!tbody) return;
       const search = String(document.getElementById('searchFraud')?.value || '').toLowerCase();
       const risk = document.getElementById('filterRisk')?.value || 'all';
       const rows = fraudFindings.filter(item => {
           const names = item.participants.map(p => p.nama_lengkap || '').join(' ').toLowerCase();
           const matchSearch = !search || names.includes(search) || item.value.includes(search) || item.label.toLowerCase().includes(search);
           const matchRisk = risk === 'all' || item.risk === risk;
           return matchSearch && matchRisk;
       });

       if (rows.length === 0) {
           tbody.innerHTML = `<tr class="loading-row"><td colspan="5" style="text-align:center; padding:40px;"><i class="fas fa-check-circle" style="font-size:2.5rem; color:var(--success);"></i><h3 style="color:var(--dark-purple); margin:10px 0 5px;">Tidak ada duplikasi identitas</h3><p style="color:var(--text-muted); margin:0;">NIK, email, dan WhatsApp terlihat unik pada data yang terambil.</p></td></tr>`;
           return;
       }

       tbody.innerHTML = rows.map(item => {
           const first = item.participants[0] || {};
           const names = item.participants.slice(0, 3).map(p => p.nama_lengkap || '-').join(', ');
           const riskBadge = item.risk === 'high'
               ? '<span class="badge gugur"><i class="fas fa-triangle-exclamation"></i> High</span>'
               : '<span class="badge pending"><i class="fas fa-circle-exclamation"></i> Medium</span>';
           return `
               <tr>
                   <td><strong>${escapeHtml(first.nama_lengkap || '-')}</strong><br><small>${escapeHtml(names)}${item.participants.length > 3 ? ' ...' : ''}</small></td>
                   <td><span class="fraud-badge duplicate"><i class="fas fa-fingerprint"></i> ${escapeHtml(item.label)}</span><br><small>${escapeHtml(maskFraudValue(item.type, item.value))}</small></td>
                   <td><strong>${item.participants.length}</strong> data</td>
                   <td>${riskBadge}</td>
                   <td><button class="btn-action btn-fraud-detail" data-id="${escapeAttr(item.id)}"><i class="fas fa-eye"></i> Detail</button></td>
               </tr>
           `;
       }).join('');
   }

   function updateFraudStats() {
       const duplicateNik = fraudFindings.filter(item => item.type === 'nik').length;
       const duplicateContact = fraudFindings.filter(item => item.type !== 'nik').length;
       const highRisk = fraudFindings.filter(item => item.risk === 'high').length;
       const setHtml = (id, value) => { const el = document.getElementById(id); if (el) el.innerHTML = value; };
       setHtml('statDuplicate', `${duplicateNik} <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 500;">Kasus</span>`);
       setHtml('statPlagiarism', `${duplicateContact} <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 500;">Kasus</span>`);
       const riskEl = document.getElementById('statHighRisk');
       if (riskEl) {
           riskEl.textContent = highRisk ? `${highRisk} High` : 'Aman';
           riskEl.style.color = highRisk ? 'var(--danger)' : 'var(--success)';
       }
   }

   function openFraudDetail(id) {
       const item = fraudFindings.find(finding => finding.id === id);
       if (!item) return;
       const modalScore = document.getElementById('modalSimScore');
       const suspect1Name = document.getElementById('suspect1Name');
       const suspect1ID = document.getElementById('suspect1ID');
       const suspect1Text = document.getElementById('suspect1Text');
       const suspect2Name = document.getElementById('suspect2Name');
       const suspect2ID = document.getElementById('suspect2ID');
       const suspect2Text = document.getElementById('suspect2Text');
       const [first, second] = item.participants;
       if (modalScore) modalScore.textContent = `${item.participants.length} data`;
       if (suspect1Name) suspect1Name.textContent = first?.nama_lengkap || 'Kandidat A';
       if (suspect1ID) suspect1ID.textContent = `${item.label}: ${maskFraudValue(item.type, item.value)}`;
       if (suspect1Text) suspect1Text.innerHTML = renderFraudParticipant(first);
       if (suspect2Name) suspect2Name.textContent = second?.nama_lengkap || 'Kandidat B';
       if (suspect2ID) suspect2ID.textContent = `${item.label}: ${maskFraudValue(item.type, item.value)}`;
       if (suspect2Text) suspect2Text.innerHTML = renderFraudParticipant(second);
       window.toggleModal('investigationModal', 'open');
   }

   function renderFraudParticipant(p = {}) {
       return `
           <p><strong>NIK:</strong> ${escapeHtml(maskFraudValue('nik', p.nik || '-'))}</p>
           <p><strong>Email:</strong> ${escapeHtml(p.email || '-')}</p>
           <p><strong>WhatsApp:</strong> ${escapeHtml(p.whatsapp || '-')}</p>
           <p><strong>Jalur:</strong> ${escapeHtml(p.jalur || p.jalur_pendaftaran || '-')}</p>
           <p><strong>Latar:</strong> ${escapeHtml(p.status_kerja || p.status || '-')}</p>
           <p><strong>Alamat:</strong> ${escapeHtml(p.alamat || '-')}</p>
           <p><strong>Status:</strong> ${escapeHtml(p.status_seleksi || 'pending')}</p>
       `;
   }

   function maskFraudValue(type, value) {
       const text = String(value || '-');
       if (type === 'nik' && text.length >= 16) return `${text.slice(0, 6)}******${text.slice(-4)}`;
       if (type === 'email') return text.replace(/^(.{2}).*(@.*)$/, '$1***$2');
       if (type === 'whatsapp' && text.length > 6) return `${text.slice(0, 4)}****${text.slice(-3)}`;
       return text;
   }
   
   // ==========================================
   // 2. COMM ENGINE (BLAST)
   // ==========================================
   window.initCommEngine = async function() {
       await window.loadSidebar();
       if (!window.checkAdminAccess()) return;
       window.updateAdminProfile();
   
       window.logAdminActivity("Sedang melihat halaman Comm. Engine");
   
       const radios = document.querySelectorAll('input[name="channel"]');
       const subjectArea = document.getElementById('subjectArea');
       radios.forEach(radio => {
           radio.addEventListener('change', (e) => {
               window.logAdminActivity("Mengubah jalur komunikasi Blast ke: " + e.target.value.toUpperCase());
               if (e.target.value === 'whatsapp') subjectArea.style.display = 'none';
               else subjectArea.style.display = 'block';
           });
       });
   
       const tags = document.querySelectorAll('.var-tag');
       const textarea = document.getElementById('msgBody');
       tags.forEach(tag => {
           tag.onclick = () => {
               window.logAdminActivity("Menyisipkan variabel [" + tag.innerText + "] ke dalam pesan Blast");
               if (textarea) textarea.value += ` ${tag.innerText} `;
               textarea.focus();
           };
       });
   
       const btnBlast = document.getElementById('btnBlastExecute');
       if (btnBlast) {
           btnBlast.onclick = () => {
               window.logAdminActivity("Membuka modal Konfirmasi Blast Pesan");
               window.toggleModal('blastConfirmModal', 'open');
           };
       }
       const btnCancelBlast = document.getElementById('btnCancelBlast');
       if (btnCancelBlast) {
           btnCancelBlast.onclick = () => {
               window.logAdminActivity("Membatalkan eksekusi Blast Pesan");
               window.toggleModal('blastConfirmModal', 'close');
           };
       }
   };

   // ==========================================
   // 2B. VIDEO CONFERENCE ROOM
   // ==========================================
   window.initVideoConference = async function() {
       await window.loadSidebar();
       if (!window.checkAdminAccess()) return;
       window.updateAdminProfile();
       window.logAdminActivity("Sedang melihat halaman Video Conference");

       const statusEl = document.getElementById('manualConferenceStatus');
       const signalStatusEl = document.getElementById('manualSignalStatus');
       const peerCountEl = document.getElementById('manualPeerCount');
       const localVideo = document.getElementById('manualLocalVideo');
       const remoteGrid = document.getElementById('manualRemoteGrid');
       const signalServerInput = document.getElementById('signalServerUrl');
       const meetingPublicUrlInput = document.getElementById('meetingPublicUrl');
       const roomInput = document.getElementById('signalRoomId');
       const titleInput = document.getElementById('signalRoomTitle');
       const inviteLinkEl = document.getElementById('signalInviteLink');
       const roomList = document.getElementById('meetingRoomList');
       let localStream = null;
       let socket = null;
       let latestActiveMeetingRooms = [];
       let meetingServerReachable = false;
       const clientId = getOrCreateSignalClientId();
       const peers = new Map();

       const setStatus = (value) => {
           if (statusEl) statusEl.textContent = value;
       };
       const setSignalStatus = (value) => {
           if (signalStatusEl) signalStatusEl.textContent = value;
       };
       const updatePeerCount = () => {
           if (peerCountEl) peerCountEl.textContent = String(peers.size);
           if (remoteGrid && peers.size === 0) {
               remoteGrid.innerHTML = '<div class="manual-empty-remote">Remote stream akan muncul setelah peer bergabung.</div>';
           }
       };
       const closePeer = (peerId) => {
           const pc = peers.get(peerId);
           if (pc) pc.close();
           peers.delete(peerId);
           removeRemoteStream(peerId);
           updatePeerCount();
       };
       const roomId = () => formatSignalRoomCode(roomInput?.value || 'ABCD-EFGH-JKLM');
       const roomTitle = () => String(titleInput?.value || 'HerAI Meeting').trim() || 'HerAI Meeting';
       const publicAppUrl = () => normalizeMeetingPublicUrl(meetingPublicUrlInput?.value || localStorage.getItem('herai_meeting_public_url') || `${location.origin}${location.pathname}`);
       const inviteUrl = () => `${publicAppUrl()}#/meeting?room=${encodeURIComponent(roomId())}&title=${encodeURIComponent(roomTitle())}&signal=${encodeURIComponent((signalServerInput?.value || 'wss://herai-signaling.onrender.com/ws').trim())}`;
       const updateInviteLink = () => {
           if (inviteLinkEl) inviteLinkEl.textContent = inviteUrl();
       };
       const signalUrl = () => {
           const base = (signalServerInput?.value || 'wss://herai-signaling.onrender.com/ws').trim();
           const url = new URL(base);
           url.searchParams.set('room', roomId());
           url.searchParams.set('clientId', clientId);
           return url.toString();
       };
       const sendSignal = (type, to, payload) => {
           if (!socket || socket.readyState !== WebSocket.OPEN) return;
           socket.send(JSON.stringify({ type, room: roomId(), to, payload }));
       };
       const ensureLocalMedia = async () => {
           if (localStream) return localStream;
           localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
           if (localVideo) localVideo.srcObject = localStream;
           setStatus('Media Ready');
           return localStream;
       };
       const createPeer = (peerId) => {
           if (peers.has(peerId)) return peers.get(peerId);
           const pc = new RTCPeerConnection({
               iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
           });
           if (localStream) {
               localStream.getTracks().forEach(track => pc.addTrack(track, localStream));
           }
           pc.ontrack = event => {
               renderRemoteStream(peerId, event.streams[0]);
           };
           pc.onicecandidate = event => {
               if (event.candidate) sendSignal('ice', peerId, event.candidate);
           };
           pc.onconnectionstatechange = () => {
               setStatus(`${peerId.slice(0, 6)}: ${pc.connectionState || 'connecting'}`);
               if (['failed', 'closed', 'disconnected'].includes(pc.connectionState)) {
                   closePeer(peerId);
               }
           };
           peers.set(peerId, pc);
           updatePeerCount();
           return pc;
       };
       const createOfferForPeer = async (peerId) => {
           const pc = createPeer(peerId);
           const offer = await pc.createOffer({ offerToReceiveAudio: true, offerToReceiveVideo: true });
           await pc.setLocalDescription(offer);
           sendSignal('offer', peerId, pc.localDescription);
       };
       const handleSignal = async (message) => {
           const { type, from, payload } = message;
           if (!from || from === clientId) return;
           if (type === 'joined') return;
           if (type === 'peer-joined') {
               createPeer(from);
               return;
           }
           if (type === 'peer-left') {
               closePeer(from);
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
           }
       };
       const connectRoom = async () => {
           await ensureLocalMedia();
           if (socket && socket.readyState === WebSocket.OPEN) socket.close();
           socket = new WebSocket(signalUrl());
           setSignalStatus('Connecting');
           socket.onopen = () => {
               setSignalStatus('Online');
               setStatus(`Joined ${roomId()}`);
               window.logAdminActivity(`Bergabung ke video room ${roomId()}`);
           };
           socket.onmessage = async event => {
               const message = JSON.parse(event.data);
               if (message.type === 'joined') {
                   const existingPeers = message.payload?.peers || [];
                   for (const peerId of existingPeers) {
                       await createOfferForPeer(peerId);
                   }
                   return;
               }
               await handleSignal(message);
           };
           socket.onclose = () => {
               setSignalStatus('Offline');
               setStatus('Disconnected');
           };
           socket.onerror = () => {
               setSignalStatus('Error');
               setStatus('Signal Error');
           };
       };

       document.getElementById('btnStartManualMedia')?.addEventListener('click', async () => {
           try {
               await ensureLocalMedia();
               peers.forEach(pc => localStream.getTracks().forEach(track => pc.addTrack(track, localStream)));
               if (!socket || socket.readyState !== WebSocket.OPEN) {
                   await connectRoom();
               }
               window.logAdminActivity("Mengaktifkan kamera dan mic video conference");
           } catch (error) {
               alert('Kamera/mic tidak bisa diakses. Pastikan permission browser diizinkan.');
               setStatus('Media Blocked');
           }
       });

       document.getElementById('btnGenerateSignalRoom')?.addEventListener('click', () => {
           if (roomInput) roomInput.value = generateHeraiRoomCode();
           persistAdminMeetingRoom();
           updateInviteLink();
           renderAdminMeetingRooms();
           setStatus('Room Generated');
           window.logAdminActivity(`Generate room video conference ${roomId()}`);
       });

       roomInput?.addEventListener('input', () => {
           roomInput.value = formatSignalRoomCode(roomInput.value);
           updateInviteLink();
       });
       titleInput?.addEventListener('input', updateInviteLink);
       signalServerInput?.addEventListener('input', updateInviteLink);
       meetingPublicUrlInput?.addEventListener('input', () => {
           localStorage.setItem('herai_meeting_public_url', publicAppUrl());
           updateInviteLink();
       });

       document.getElementById('btnCopyRoomLink')?.addEventListener('click', async () => {
           persistAdminMeetingRoom();
           renderAdminMeetingRooms();
           updateInviteLink();
           await navigator.clipboard.writeText(inviteUrl());
           setStatus('Room Link Copied');
       });

       document.getElementById('btnHangupManualCall')?.addEventListener('click', () => {
           if (socket) socket.close();
           socket = null;
           peers.forEach(pc => pc.close());
           peers.clear();
           if (localStream) localStream.getTracks().forEach(track => track.stop());
           localStream = null;
           if (localVideo) localVideo.srcObject = null;
           if (remoteGrid) remoteGrid.innerHTML = '<div class="manual-empty-remote">Remote stream akan muncul setelah peer bergabung.</div>';
           updatePeerCount();
           setStatus('Closed');
           setSignalStatus('Offline');
           window.logAdminActivity("Menutup video conference");
       });

       const roomFromHash = new URLSearchParams((location.hash.split('?')[1] || '')).get('room');
       if (roomFromHash && roomInput) roomInput.value = formatSignalRoomCode(roomFromHash);
       document.getElementById('btnRefreshMeetingRooms')?.addEventListener('click', refreshActiveMeetingRooms);
       updateInviteLink();
       renderAdminMeetingRooms();
       refreshActiveMeetingRooms();
       const meetingMonitorTimer = setInterval(() => {
           if (window.location.hash !== '#/video-conference') {
               clearInterval(meetingMonitorTimer);
               return;
           }
           refreshActiveMeetingRooms();
       }, 5000);
       updatePeerCount();

       function persistAdminMeetingRoom() {
           const rooms = readAdminMeetingRooms().filter(room => room.id !== roomId());
           rooms.unshift({
               id: roomId(),
               title: roomTitle(),
               inviteUrl: inviteUrl(),
               createdAt: new Date().toISOString()
           });
           localStorage.setItem('herai_admin_meeting_rooms', JSON.stringify(rooms.slice(0, 20)));
       }

       function renderAdminMeetingRooms(activeRooms = latestActiveMeetingRooms, serverReachable = meetingServerReachable) {
           if (!roomList) return;
           const rooms = readAdminMeetingRooms();
           if (rooms.length === 0 && activeRooms.length === 0) {
               roomList.innerHTML = `<div class="manual-note">${serverReachable ? 'Belum ada room tersimpan.' : 'Server meeting belum terbaca. Klik Refresh atau cek URL signaling.'}</div>`;
               return;
           }
           const activeMap = new Map(activeRooms.map(room => [normalizeRoomId(room.room), room]));
           const savedIds = new Set(rooms.map(room => normalizeRoomId(room.id)));
           const activeOnly = activeRooms
               .filter(room => !savedIds.has(normalizeRoomId(room.room)))
               .map(room => ({ id: room.room, title: 'Active External Room', inviteUrl: `${publicAppUrl()}#/meeting?room=${encodeURIComponent(formatSignalRoomCode(room.room))}` }));
           roomList.innerHTML = [...rooms, ...activeOnly].map(room => {
               const active = activeMap.get(normalizeRoomId(room.id));
               const statusLabel = active ? `${Number(active.clients || 0)} online` : (serverReachable ? 'offline' : 'unknown');
               const transportLabel = active?.transport ? String(active.transport).replace(',', ' + ') : 'saved';
               const canDeleteServer = Boolean(active);
               return `
                   <div class="meeting-room-card ${active ? 'is-online' : serverReachable ? 'is-offline' : 'is-unknown'}">
                       <div>
                           <div class="meeting-room-title-row">
                               <strong>${escapeHtml(room.title)}</strong>
                               <span class="meeting-room-status ${active ? 'online' : serverReachable ? 'offline' : 'unknown'}">
                                   <i class="fas fa-circle"></i> ${escapeHtml(statusLabel)}
                               </span>
                           </div>
                           <small>${escapeHtml(formatSignalRoomCode(room.id))} • ${escapeHtml(transportLabel)}</small>
                       </div>
                       <div class="meeting-room-actions">
                           <button class="btn-action btn-copy-saved-room" data-url="${escapeAttr(room.inviteUrl)}" title="Copy link"><i class="far fa-copy"></i></button>
                           <button class="btn-action btn-delete-meeting-room" data-room="${escapeAttr(room.id)}" data-server-delete="${canDeleteServer ? 'true' : 'false'}" title="Hapus room"><i class="fas fa-trash"></i></button>
                       </div>
                   </div>
               `;
           }).join('');
           roomList.querySelectorAll('.btn-copy-saved-room').forEach(button => {
               button.addEventListener('click', async () => {
                   await navigator.clipboard.writeText(button.dataset.url || '');
                   setStatus('Saved Link Copied');
               });
           });
           roomList.querySelectorAll('.btn-delete-meeting-room').forEach(button => {
               button.addEventListener('click', () => deleteAdminMeetingRoom(button.dataset.room || '', button.dataset.serverDelete === 'true'));
           });
       }

       async function refreshActiveMeetingRooms() {
           try {
               const base = (signalServerInput?.value || 'wss://herai-signaling.onrender.com/ws').replace(/^ws/, 'http').replace(/\/ws.*$/, '/rooms');
               const response = await fetch(base, { cache: 'no-store' });
               const result = await response.json();
               meetingServerReachable = response.ok && result.ok !== false;
               latestActiveMeetingRooms = Array.isArray(result.rooms) ? result.rooms : [];
               renderAdminMeetingRooms(latestActiveMeetingRooms, meetingServerReachable);
           } catch (error) {
               meetingServerReachable = false;
               latestActiveMeetingRooms = [];
               renderAdminMeetingRooms(latestActiveMeetingRooms, meetingServerReachable);
           }
       }

       async function deleteAdminMeetingRoom(room, shouldDeleteServerRoom) {
           const formattedRoom = formatSignalRoomCode(room);
           if (!formattedRoom) return;
           const active = latestActiveMeetingRooms.some(item => normalizeRoomId(item.room) === normalizeRoomId(formattedRoom));
           const message = active
               ? `Room ${formattedRoom} masih online. Hapus room ini dan putuskan peserta yang sedang tersambung?`
               : `Hapus room ${formattedRoom} dari daftar tersimpan?`;
           if (!confirm(message)) return;
           const rooms = readAdminMeetingRooms().filter(item => normalizeRoomId(item.id) !== normalizeRoomId(formattedRoom));
           localStorage.setItem('herai_admin_meeting_rooms', JSON.stringify(rooms));
           if (shouldDeleteServerRoom || active) {
               try {
                   const base = (signalServerInput?.value || 'wss://herai-signaling.onrender.com/ws').replace(/^ws/, 'http').replace(/\/ws.*$/, '/rooms');
                   const url = new URL(base);
                   url.searchParams.set('room', formattedRoom);
                   await fetch(url.toString(), { method: 'DELETE' });
               } catch (error) {
                   console.warn('Gagal menghapus room aktif dari server meeting.', error);
               }
           }
           setStatus('Room Deleted');
           window.logAdminActivity(`Menghapus room meeting ${formattedRoom}`);
           refreshActiveMeetingRooms();
        }
   };

   function normalizeRoomId(value) {
       return String(value || '').replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
   }

   function generateHeraiRoomCode() {
       const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
       let code = '';
       for (let i = 0; i < 12; i++) {
           code += alphabet[Math.floor(Math.random() * alphabet.length)];
       }
       return formatSignalRoomCode(code);
   }

   function getOrCreateSignalClientId() {
       const key = 'herai_signal_client_id';
       let id = sessionStorage.getItem(key);
       if (!id) {
           id = crypto.randomUUID ? crypto.randomUUID() : `client-${Date.now()}-${Math.random().toString(16).slice(2)}`;
           sessionStorage.setItem(key, id);
       }
       return id;
   }

   function sanitizeSignalValue(value) {
       return formatSignalRoomCode(value) || 'ABCD-EFGH-JKLM';
   }

   function normalizeMeetingPublicUrl(value) {
       try {
           const url = new URL(String(value || '').trim(), location.origin);
           url.search = '';
           url.hash = '';
           url.pathname = url.pathname.replace(/index\.html$/i, '');
           if (!url.pathname.endsWith('/')) url.pathname += '/';
           return url.toString();
       } catch (error) {
           return `${location.origin}${location.pathname}`;
       }
   }

   function formatSignalRoomCode(value) {
       const compact = String(value || '')
           .trim()
           .replace(/[^a-zA-Z0-9_-]/g, '')
           .replace(/-/g, '')
           .toUpperCase()
           .slice(0, 12);
       return compact.match(/.{1,4}/g)?.join('-') || '';
   }

   function readAdminMeetingRooms() {
       try {
           return JSON.parse(localStorage.getItem('herai_admin_meeting_rooms') || '[]');
       } catch (error) {
           return [];
       }
   }

   function renderRemoteStream(peerId, stream) {
       const remoteGrid = document.getElementById('manualRemoteGrid');
       if (!remoteGrid) return;
       remoteGrid.querySelector('.manual-empty-remote')?.remove();
       const safeId = peerId.replace(/[^a-zA-Z0-9_-]/g, '');
       let tile = document.getElementById(`remote-peer-${safeId}`);
       if (!tile) {
           tile = document.createElement('div');
           tile.id = `remote-peer-${safeId}`;
           tile.className = 'manual-remote-tile';
           tile.innerHTML = `<video autoplay playsinline></video><span>${peerId.slice(0, 8)}</span>`;
           remoteGrid.appendChild(tile);
       }
       const video = tile.querySelector('video');
       if (video) video.srcObject = stream;
   }

   function removeRemoteStream(peerId) {
       const safeId = peerId.replace(/[^a-zA-Z0-9_-]/g, '');
       const tile = document.getElementById(`remote-peer-${safeId}`);
       tile?.remove();
   }
   
   // ==========================================
   // 3. ASSET & LINKS MANAGER
   // ==========================================
   window.initAssets = async function() {
       await window.loadSidebar();
       if (!window.checkAdminAccess()) return;
       window.updateAdminProfile();
   
       window.logAdminActivity("Sedang melihat halaman Asset & Links");

       loadAssetsFromStorage();
       renderAssetTable();

       const btnAdd = document.getElementById('btnAddAsset');
       if (btnAdd) {
           btnAdd.onclick = () => {
               const form = document.getElementById('assetForm');
               form?.reset();
               form?.removeAttribute('data-edit-id');
               const title = document.getElementById('assetModalTitle');
               if (title) title.textContent = 'Tambah Tautan Baru';
               window.logAdminActivity("Membuka form Tambah Asset/Link Baru");
               window.toggleModal('assetModal', 'open');
           };
       }

       document.getElementById('searchAsset')?.addEventListener('input', renderAssetTable);
       document.getElementById('filterCategory')?.addEventListener('change', renderAssetTable);
       document.getElementById('btnSaveAsset')?.addEventListener('click', saveAssetFromForm);
       
       document.addEventListener('click', e => {
           if (window.location.hash !== '#/assets') return;
           const btnCopy = e.target.closest('.btn-copy-url');
           if (btnCopy) {
               window.logAdminActivity("Menyalin URL Asset/Link ke Clipboard");
               const urlText = btnCopy.dataset.url || btnCopy.previousElementSibling?.innerText || '';
               navigator.clipboard.writeText(urlText);
               const icon = btnCopy.querySelector('i');
               icon.className = 'fas fa-check text-success';
               setTimeout(() => icon.className = 'far fa-copy', 2000);
           }
           const btnEdit = e.target.closest('.btn-edit-asset');
           if (btnEdit) editAsset(btnEdit.dataset.id);
           const btnDelete = e.target.closest('.btn-delete-asset');
           if (btnDelete) deleteAsset(btnDelete.dataset.id);
           const toggle = e.target.closest('.asset-access-toggle');
           if (toggle) {
               const asset = assetState.find(item => item.id === toggle.dataset.id);
               if (asset) {
                   asset.active = toggle.checked;
                   persistAssets();
                   window.logAdminActivity(`Mengubah akses asset ${asset.name} menjadi ${asset.active ? 'aktif' : 'nonaktif'}`);
               }
           }
           if (e.target.closest('#btnCloseAsset') || e.target.closest('#btnCancelAsset')) {
               window.logAdminActivity("Menutup/Membatalkan form Tambah Asset");
               window.toggleModal('assetModal', 'close');
           }
       });
   };

   let assetState = [];
   const defaultAssets = [
       { id: 'asset-telegram', name: 'Grup Telegram Resmi HerAI', category: 'komunitas', url: 'https://t.me/+HerAI2026SecureLink', notes: 'Batch 1 (2026)', active: true, icon: 'fab fa-telegram-plane' },
       { id: 'asset-zoom-kickoff', name: 'Zoom: Kick-off ASCEND 2026', category: 'webinar', url: 'https://zoom.us/j/123456789', notes: 'Passcode: HERAI26', active: true, icon: 'fas fa-video' },
       { id: 'asset-module-python', name: 'Modul 1: Intro to Python & AI', category: 'kurikulum', url: 'https://drive.google.com/file/d/...', notes: 'Pyronyx Academy Syllabus', active: false, icon: 'fas fa-file-pdf' },
       { id: 'asset-vbg-herai', name: 'HerAI Virtual Background', category: 'branding', url: 'https://datasorcerers.id/vbg-herai', notes: 'Gunakan saat sesi Mentoring', active: true, icon: 'fas fa-image' }
   ];

   function loadAssetsFromStorage() {
       try {
           assetState = JSON.parse(localStorage.getItem('herai_assets') || '[]');
       } catch (error) {
           assetState = [];
       }
       if (!Array.isArray(assetState) || assetState.length === 0) assetState = [...defaultAssets];
   }

   function persistAssets() {
       localStorage.setItem('herai_assets', JSON.stringify(assetState));
   }

   function renderAssetTable() {
       const tbody = document.getElementById('assetTableBody');
       if (!tbody) return;
       const search = String(document.getElementById('searchAsset')?.value || '').toLowerCase();
       const category = document.getElementById('filterCategory')?.value || 'all';
       const categoryLabels = { komunitas: 'Komunitas', webinar: 'Webinar', kurikulum: 'Kurikulum', branding: 'Branding Kit' };
       const iconBg = { komunitas: '#e0f2fe', webinar: '#eff6ff', kurikulum: '#dcfce7', branding: 'var(--light-pink)' };
       const iconColor = { komunitas: '#0284c7', webinar: '#3b82f6', kurikulum: '#16a34a', branding: 'var(--primary-pink)' };
       const rows = assetState.filter(asset => {
           const matchSearch = asset.name.toLowerCase().includes(search) || asset.url.toLowerCase().includes(search);
           const matchCategory = category === 'all' || asset.category === category;
           return matchSearch && matchCategory;
       });

       if (rows.length === 0) {
           tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding:30px; color:var(--text-muted);">Tidak ada asset sesuai filter.</td></tr>';
       } else {
           tbody.innerHTML = rows.map(asset => `
               <tr>
                   <td>
                       <div style="font-weight: 700; color: var(--dark-purple); display: flex; align-items: center; gap: 10px;">
                           <div style="width: 35px; height: 35px; border-radius: 8px; background: ${iconBg[asset.category] || '#f8fafc'}; color: ${iconColor[asset.category] || 'var(--icon-purple)'}; display: flex; align-items: center; justify-content: center; font-size: 1.2rem;">
                               <i class="${asset.icon || 'fas fa-link'}"></i>
                           </div>
                           <div>${escapeHtml(asset.name)}<div style="font-size: 0.8rem; color: var(--text-muted); font-weight: 500;">${escapeHtml(asset.notes || '-')}</div></div>
                       </div>
                   </td>
                   <td><span class="badge cat-${asset.category}">${categoryLabels[asset.category] || asset.category}</span></td>
                   <td><div class="url-display"><span class="url-text">${escapeHtml(asset.url)}</span><button class="btn-copy-url" data-url="${escapeAttr(asset.url)}" title="Salin Tautan"><i class="far fa-copy"></i></button></div></td>
                   <td><label class="cyber-switch"><input class="asset-access-toggle" data-id="${asset.id}" type="checkbox" ${asset.active ? 'checked' : ''}><span class="slider round"></span></label></td>
                   <td><div style="display:flex; gap:8px; justify-content:center;"><button class="btn-action btn-edit-asset" data-id="${asset.id}" title="Edit"><i class="fas fa-pen"></i></button><button class="btn-action btn-delete-asset" data-id="${asset.id}" style="color: var(--danger); border-color: rgba(230,57,70,0.3);" title="Hapus"><i class="fas fa-trash"></i></button></div></td>
               </tr>
           `).join('');
       }

       const setText = (id, value) => { const el = document.getElementById(id); if (el) el.textContent = value; };
       setText('statTotalLinks', assetState.filter(asset => asset.active).length);
       setText('statModules', `${assetState.filter(asset => asset.category === 'kurikulum').length} File`);
       setText('statMeetings', `${assetState.filter(asset => asset.category === 'webinar').length} Ruang`);
   }

   async function saveAssetFromForm() {
       const form = document.getElementById('assetForm');
       const name = document.getElementById('assetName')?.value.trim();
       const category = document.getElementById('assetCategory')?.value || 'komunitas';
       const url = document.getElementById('assetUrl')?.value.trim();
       const notes = document.getElementById('assetNotes')?.value.trim();
       if (!name || !url) {
           alert('Nama dan URL wajib diisi.');
           return;
       }
       const editId = form?.dataset.editId;
       const payload = { id: editId || `asset-${Date.now()}`, name, category, url, notes, active: true };
       if (editId) {
           assetState = assetState.map(asset => asset.id === editId ? { ...asset, ...payload, active: asset.active } : asset);
       } else {
           assetState.unshift(payload);
       }
       persistAssets();
       renderAssetTable();
       window.toggleModal('assetModal', 'close');
       window.logAdminActivity(`${editId ? 'Mengedit' : 'Menambahkan'} asset/link: ${name}`);
       try {
            await fetch(API_URL, { method: 'POST', body: JSON.stringify(withAdminToken({ action: 'saveAsset', asset: payload })) });
       } catch (error) {
           console.warn('Asset tersimpan lokal, GAS belum merespons.', error);
       }
   }

   function editAsset(id) {
       const asset = assetState.find(item => item.id === id);
       if (!asset) return;
       const form = document.getElementById('assetForm');
       if (form) form.dataset.editId = id;
       const title = document.getElementById('assetModalTitle');
       if (title) title.textContent = 'Edit Tautan';
       document.getElementById('assetName').value = asset.name;
       document.getElementById('assetCategory').value = asset.category;
       document.getElementById('assetUrl').value = asset.url;
       document.getElementById('assetNotes').value = asset.notes || '';
       window.toggleModal('assetModal', 'open');
   }

   function deleteAsset(id) {
       const asset = assetState.find(item => item.id === id);
       if (!asset || !confirm(`Hapus asset "${asset.name}"?`)) return;
       assetState = assetState.filter(item => item.id !== id);
       persistAssets();
       renderAssetTable();
       window.logAdminActivity(`Menghapus asset/link: ${asset.name}`);
   }
   
   // ==========================================
   // 4. GLOBAL SETTINGS
   // ==========================================
   window.initGlobalSettings = async function() {
       await window.loadSidebar();
       if (!window.checkAdminAccess()) return;
       window.updateAdminProfile();
   
       window.logAdminActivity("Sedang melihat halaman Global Settings");

       const fields = {
           registrationOpen: document.getElementById('toggleRegis'),
           afirmasiOpen: document.getElementById('toggleAfirmasi'),
           announcementLive: document.getElementById('togglePengumuman'),
           participantPortalOpen: document.getElementById('toggleParticipantPortal'),
           competencyTestOpen: document.getElementById('toggleCompetencyTest'),
           finalProjectSubmissionOpen: document.getElementById('toggleFinalProjectSubmission'),
           finalProjectSubmissionDeadline: document.getElementById('finalProjectSubmissionDeadline'),
           maintenanceMode: document.getElementById('toggleMaintenance'),
           registrationClosedMessage: document.getElementById('msgRegisClosed'),
           twibbonUrl: document.getElementById('urlTwibbon'),
           announcementLaunchAt: document.getElementById('announcementLaunchAt'),
           passedInfoMessage: document.getElementById('msgLolosInfo')
       };
       const participantDashboardEnabled = document.getElementById('toggleFellowDashboard');
       const participantPortalApiUrl = document.getElementById('participantPortalApiUrl');
       const participantPageFields = [...document.querySelectorAll('[data-participant-page-toggle]')];
       const settingsForm = document.getElementById('globalSettingsForm');
       const statusText = document.getElementById('globalSettingsStatus');
       const btnSave = document.getElementById('btnSaveGlobalSettings');
       const finalProjectPolicyPreview = document.getElementById('finalProjectSubmissionPolicyPreview');
       const announcementLaunchControl = document.getElementById('announcementLaunchControl');
       const announcementDatePreview = document.getElementById('announcementDatePreview');
       const announcementTimePreview = document.getElementById('announcementTimePreview');
       const defaultFinalProjectDeadline = '2026-08-24T00:05:00+07:00';
       let isHydratingSettings = true;

       function setSettingsStatus(message, state = 'neutral') {
           if (!statusText) return;
           statusText.textContent = message;
           statusText.dataset.state = state;
       }

       function markSettingsDirty() {
           if (isHydratingSettings) return;
           btnSave?.classList.add('is-dirty');
           setSettingsStatus('Ada perubahan yang belum diterapkan.', 'warning');
       }

       function renderPublicAccessStatus() {
           const items = [
               { input: fields.registrationOpen, chipId: 'registrationStatusChip' },
               { input: fields.afirmasiOpen, chipId: 'affirmationStatusChip' },
               { input: fields.announcementLive, chipId: 'announcementStatusChip' }
           ];

           items.forEach(({ input, chipId }) => {
               if (!input) return;
               const active = !!input.checked;
               const chip = document.getElementById(chipId);
               const chipState = chip?.querySelector('em');
               const switchState = document.querySelector(`[data-switch-state="${input.id}"]`);
               chip?.classList.toggle('is-off', !active);
               if (chipState) chipState.textContent = active ? 'Aktif' : 'Nonaktif';
               if (switchState) {
                   switchState.textContent = active ? 'Aktif' : 'Nonaktif';
                   switchState.classList.toggle('is-off', !active);
               }
           });
       }

       function toJakartaDateTimeLocal(value) {
           const date = new Date(value || defaultFinalProjectDeadline);
           if (Number.isNaN(date.getTime())) return '2026-08-24T00:05';
           const parts = new Intl.DateTimeFormat('en-CA', {
               timeZone: 'Asia/Jakarta',
               year: 'numeric',
               month: '2-digit',
               day: '2-digit',
               hour: '2-digit',
               minute: '2-digit',
               hourCycle: 'h23'
           }).formatToParts(date).reduce((result, part) => {
               result[part.type] = part.value;
               return result;
           }, {});
           return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
       }

       function fromJakartaDateTimeLocal(value) {
           const localValue = String(value || '').trim();
           if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(localValue)) return '';
           return `${localValue}:00+07:00`;
       }

       function renderAnnouncementLaunchPreview() {
           const localValue = String(fields.announcementLaunchAt?.value || '').trim();
           const match = localValue.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/);
           const hasValidValue = !!match;
           announcementLaunchControl?.classList.toggle('is-empty', !hasValidValue);

           if (!hasValidValue) {
               if (announcementDatePreview) announcementDatePreview.textContent = 'Pilih tanggal';
               if (announcementTimePreview) announcementTimePreview.textContent = 'Pilih waktu';
               return;
           }

           const [, year, month, day, hour, minute] = match;
           const jakartaDate = new Date(`${year}-${month}-${day}T${hour}:${minute}:00+07:00`);
           if (Number.isNaN(jakartaDate.getTime())) {
               announcementLaunchControl?.classList.add('is-empty');
               if (announcementDatePreview) announcementDatePreview.textContent = 'Pilih tanggal';
               if (announcementTimePreview) announcementTimePreview.textContent = 'Pilih waktu';
               return;
           }

           if (announcementDatePreview) {
               announcementDatePreview.textContent = new Intl.DateTimeFormat('id-ID', {
                   day: 'numeric',
                   month: 'long',
                   year: 'numeric',
                   timeZone: 'Asia/Jakarta'
               }).format(jakartaDate);
           }
           if (announcementTimePreview) announcementTimePreview.textContent = `${hour}.${minute}`;
       }

       function renderFinalProjectPolicyPreview() {
           if (!finalProjectPolicyPreview) return;
           const manualOpen = !!fields.finalProjectSubmissionOpen?.checked;
           const deadlineIso = fromJakartaDateTimeLocal(fields.finalProjectSubmissionDeadline?.value);
           const deadlineMs = new Date(deadlineIso || '').getTime();
           const validDeadline = Number.isFinite(deadlineMs);
           const effectiveOpen = manualOpen && validDeadline && Date.now() < deadlineMs;
           const strong = finalProjectPolicyPreview.querySelector('strong');
           const small = finalProjectPolicyPreview.querySelector('small');
           finalProjectPolicyPreview.classList.toggle('is-open', effectiveOpen);
           finalProjectPolicyPreview.classList.toggle('is-closed', !effectiveOpen);

           if (strong) strong.textContent = effectiveOpen ? 'Submission terbuka' : 'Submission tertutup';
           if (small) {
               if (!manualOpen) {
                   small.textContent = 'Ditutup manual oleh Super Admin.';
               } else if (!validDeadline) {
                   small.textContent = 'Deadline WIB wajib diisi dengan format yang valid.';
               } else if (Date.now() >= deadlineMs) {
                   small.textContent = 'Deadline sudah lewat; backend akan menolak mutation.';
               } else {
                   small.textContent = `Terbuka sampai ${new Intl.DateTimeFormat('id-ID', {
                       dateStyle: 'long',
                       timeStyle: 'short',
                       timeZone: 'Asia/Jakarta'
                   }).format(new Date(deadlineMs))} WIB.`;
               }
           }
       }

       async function loadSettingsToForm() {
           const settings = typeof window.getGlobalSettingsAsync === 'function'
               ? await window.getGlobalSettingsAsync()
               : (typeof window.getGlobalSettings === 'function' ? window.getGlobalSettings() : {});
           if (fields.registrationOpen) fields.registrationOpen.checked = settings.registrationOpen !== false;
           if (fields.afirmasiOpen) fields.afirmasiOpen.checked = settings.afirmasiOpen !== false;
           if (fields.announcementLive) fields.announcementLive.checked = settings.announcementLive === true;
           if (fields.participantPortalOpen) fields.participantPortalOpen.checked = settings.participantPortalOpen === true;
           if (fields.competencyTestOpen) fields.competencyTestOpen.checked = settings.competencyTestOpen === true;
           if (fields.finalProjectSubmissionOpen) fields.finalProjectSubmissionOpen.checked = settings.finalProjectSubmissionOpen !== false;
           if (fields.finalProjectSubmissionDeadline) fields.finalProjectSubmissionDeadline.value = toJakartaDateTimeLocal(settings.finalProjectSubmissionDeadline);
           if (fields.maintenanceMode) fields.maintenanceMode.checked = settings.maintenanceMode === true;
           if (fields.registrationClosedMessage) fields.registrationClosedMessage.value = settings.registrationClosedMessage || '';
           if (fields.twibbonUrl) fields.twibbonUrl.value = settings.twibbonUrl || '#/twibbon';
           if (fields.announcementLaunchAt) fields.announcementLaunchAt.value = settings.announcementLaunchAt || '';
           if (fields.passedInfoMessage) fields.passedInfoMessage.value = settings.passedInfoMessage || '';

           if (participantPortalApiUrl) {
               participantPortalApiUrl.value = localStorage.getItem('heraiParticipantPortalApiUrl') || participantPortalApiUrl.value || 'http://127.0.0.1:8092';
           }
           const participantSettings = {
                enabled: settings.enabled !== false,
                pages: settings.pages || {}
            };
            const participantPages = participantSettings.pages || {};
           if (participantDashboardEnabled) participantDashboardEnabled.checked = participantSettings.enabled !== false;
           participantPageFields.forEach(input => {
               const key = input.getAttribute('data-participant-page-toggle');
               input.checked = participantPages[key] !== false;
           });
           renderPublicAccessStatus();
           renderAnnouncementLaunchPreview();
           renderFinalProjectPolicyPreview();
       }

       function readSettingsFromForm() {
           return {
               registrationOpen: !!fields.registrationOpen?.checked,
               afirmasiOpen: !!fields.afirmasiOpen?.checked,
               announcementLive: !!fields.announcementLive?.checked,
               participantPortalOpen: !!fields.participantPortalOpen?.checked,
               competencyTestOpen: !!fields.competencyTestOpen?.checked,
               finalProjectSubmissionOpen: !!fields.finalProjectSubmissionOpen?.checked,
               finalProjectSubmissionDeadline: fromJakartaDateTimeLocal(fields.finalProjectSubmissionDeadline?.value) || defaultFinalProjectDeadline,
               maintenanceMode: !!fields.maintenanceMode?.checked,
               registrationClosedMessage: fields.registrationClosedMessage?.value.trim() || 'Pendaftaran HerAI Fellowship Batch 1 (2026) telah resmi ditutup.',
               twibbonUrl: fields.twibbonUrl?.value.trim() || '#/twibbon',
               announcementLaunchAt: fields.announcementLaunchAt?.value || '',
               announcementStage1LaunchAt: '2026-05-25T19:00:00+07:00',
               announcementFinalLaunchAt: '2026-05-31T19:00:00+07:00',
               passedInfoMessage: fields.passedInfoMessage?.value.trim() || 'Harap periksa email Anda untuk undangan grup Telegram.',
               ...readParticipantSettingsFromForm()
           };
       }

       function readParticipantSettingsFromForm() {
           const pages = {};
           participantPageFields.forEach(input => {
               pages[input.getAttribute('data-participant-page-toggle')] = !!input.checked;
           });
           return {
               enabled: !!participantDashboardEnabled?.checked,
               pages
           };
       }

       await loadSettingsToForm();
       isHydratingSettings = false;
       fields.finalProjectSubmissionOpen?.addEventListener('change', renderFinalProjectPolicyPreview);
       fields.finalProjectSubmissionDeadline?.addEventListener('input', renderFinalProjectPolicyPreview);
       fields.announcementLaunchAt?.addEventListener('input', renderAnnouncementLaunchPreview);
       fields.announcementLaunchAt?.addEventListener('change', renderAnnouncementLaunchPreview);
       fields.announcementLaunchAt?.addEventListener('click', () => {
           if (typeof fields.announcementLaunchAt.showPicker !== 'function') return;
           try {
               fields.announcementLaunchAt.showPicker();
           } catch (_) {
               // Native input remains usable when a browser blocks programmatic picker opening.
           }
       });
       fields.announcementLaunchAt?.addEventListener('keydown', event => {
           if (!['Enter', ' '].includes(event.key) || typeof fields.announcementLaunchAt.showPicker !== 'function') return;
           event.preventDefault();
           try {
               fields.announcementLaunchAt.showPicker();
           } catch (_) {
               // Keep the native keyboard behavior as the fallback.
           }
       });
       [fields.registrationOpen, fields.afirmasiOpen, fields.announcementLive].forEach(input => {
           input?.addEventListener('change', renderPublicAccessStatus);
       });
       settingsForm?.addEventListener('input', markSettingsDirty);
       settingsForm?.addEventListener('change', markSettingsDirty);

       if (btnSave) {
           btnSave.onclick = async () => {
               const deadlineValue = fromJakartaDateTimeLocal(fields.finalProjectSubmissionDeadline?.value);
               if (!deadlineValue) {
                   setSettingsStatus('Deadline Final Project wajib diisi dalam WIB.', 'danger');
                   fields.finalProjectSubmissionDeadline?.focus();
                   renderFinalProjectPolicyPreview();
                   return;
               }

               window.logAdminActivity("Mengeksekusi penyimpanan perubahan di Global Settings");
               btnSave.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Menerapkan...';
               btnSave.disabled = true;
               const settings = readSettingsFromForm();
               try {
                   const resp = await fetch(API_URL, {
                       method: 'POST',
                       body: JSON.stringify(withAdminToken({ action: 'saveSettings', settings }))
                   });
                   const result = await resp.json().catch(() => ({}));
                   if (!resp.ok || result.status !== 'success') {
                       throw new Error(result.message || 'Backend tidak mengonfirmasi penyimpanan settings.');
                   }

                   window.saveGlobalSettings(settings);
                   if (participantPortalApiUrl) {
                       localStorage.setItem('heraiParticipantPortalApiUrl', participantPortalApiUrl.value.trim() || 'http://127.0.0.1:8092');
                   }
                   btnSave.innerHTML = '<i class="fas fa-check"></i> Pengaturan Diterapkan';
                   btnSave.classList.remove('is-dirty');
                   setSettingsStatus(
                       `Tersimpan ${new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}`,
                       settings.maintenanceMode ? 'danger' : 'success'
                   );
                   if (typeof window.applyPublicVisibilitySettings === 'function') {
                       window.applyPublicVisibilitySettings(settings);
                   }
                   renderFinalProjectPolicyPreview();
                   setTimeout(() => {
                       btnSave.innerHTML = '<i class="fas fa-cloud-upload-alt"></i> Terapkan Pengaturan';
                   }, 2000);
               } catch (e) {
                   console.error('Gagal menyimpan settings ke server:', e);
                   btnSave.innerHTML = '<i class="fas fa-triangle-exclamation"></i> Gagal Menerapkan';
                   btnSave.classList.add('is-dirty');
                   setSettingsStatus(e.message || 'Pengaturan belum tersimpan.', 'danger');
                   setTimeout(() => {
                       btnSave.innerHTML = '<i class="fas fa-cloud-upload-alt"></i> Terapkan Pengaturan';
                   }, 2500);
               } finally {
                   btnSave.disabled = false;
               }
           };
       }

       const btnClearCache = document.getElementById('btnClearGlobalCache');
       if (btnClearCache) {
           btnClearCache.onclick = () => {
               window.resetGlobalSettings();
               localStorage.removeItem('heraiParticipantPortalSettings');
               loadSettingsToForm();
               btnSave?.classList.add('is-dirty');
               setSettingsStatus('Cache lokal direset. Terapkan jika ingin menyimpan perubahan.', 'warning');
               window.logAdminActivity("Melakukan reset cache Global Settings");
           };
       }
   };

   // ==========================================
   // 4B. PROGRAM OPERATIONS MODULES
   // ==========================================
   window.initStageControl = async function() {
       await window.loadSidebar();
       if (!window.checkAdminAccess()) return;
       window.updateAdminProfile();
       window.logAdminActivity("Sedang melihat halaman Stage Control");

       const settings = typeof window.getGlobalSettings === 'function' ? window.getGlobalSettings() : {};
       const stageSelect = document.getElementById('stageSelect');
       const stageNotes = document.getElementById('stageNotes');
       const badge = document.getElementById('stageLiveBadge');
       const stageLabels = {
           draft: 'Draft / Preparation',
           registration_open: 'Pendaftaran Dibuka',
           registration_closed: 'Pendaftaran Ditutup',
           selection_1: 'Seleksi Tahap 1',
           ai_prescreening: 'AI Pre-Screening',
           review_scoring: 'Reviewer Scoring',
           announcement_stage_1: 'Pengumuman Lolos Tahap 1',
           competency_test: 'Seleksi Tahap 2',
           announcement_stage_2: 'Pengumuman Final',
           announcement_live: 'Pengumuman Tahap 1 Live',
           bootcamp_active: 'Bootcamp Aktif',
           final_project: 'Final Project',
           announcement_final: 'Pengumuman Final',
           graduation: 'Graduation',
           alumni: 'Alumni / Wall of Fame'
       };

       if (stageSelect) stageSelect.value = settings.currentStage || 'draft';
       if (stageNotes) stageNotes.value = settings.stageNotes || '';
       if (badge) badge.textContent = stageSelect?.selectedOptions?.[0]?.textContent || 'Draft';
       renderStageControlOverview({ ...settings, currentStage: stageSelect?.value || settings.currentStage || 'draft' }, stageLabels);

       stageSelect?.addEventListener('change', () => {
           if (badge) badge.textContent = stageSelect.selectedOptions[0].textContent;
           renderStageControlOverview({ ...settings, currentStage: stageSelect.value }, stageLabels);
       });

       document.getElementById('btnSaveStage')?.addEventListener('click', async () => {
           const nextSettings = {
               ...settings,
               currentStage: stageSelect?.value || 'draft',
               stageNotes: stageNotes?.value || '',
               registrationOpen: ['registration_open'].includes(stageSelect?.value),
               competencyTestOpen: ['competency_test'].includes(stageSelect?.value),
               announcementLive: ['announcement_stage_1', 'announcement_stage_2', 'announcement_final', 'announcement_live', 'bootcamp_active', 'final_project', 'graduation', 'alumni'].includes(stageSelect?.value),
               announcementStage1LaunchAt: '2026-05-25T19:00:00+07:00',
               announcementFinalLaunchAt: '2026-05-31T19:00:00+07:00'
           };
            window.saveGlobalSettings(nextSettings);
            try {
                await fetch(API_URL, {
                    method: 'POST',
                    body: JSON.stringify(withAdminToken({ action: 'saveSettings', settings: nextSettings }))
                });
            } catch (e) {
                console.warn('Gagal sinkron stage ke server:', e.message);
            }
           window.logAdminActivity(`Mengubah stage acara menjadi ${nextSettings.currentStage}`);
           alert('Stage acara tersimpan dan sinkron ke pengaturan publik.');
           renderStageControlOverview(nextSettings, stageLabels);
       });
   };

   function renderStageControlOverview(settings, stageLabels) {
       const currentStage = settings.currentStage || 'draft';
       const setText = (id, value) => {
           const el = document.getElementById(id);
           if (el) el.textContent = value;
       };

       setText('stageSummaryActive', stageLabels[currentStage] || currentStage);
       setText('stageSummaryRegistration', settings.registrationOpen ? 'Open' : 'Closed');
       setText('stageSummaryAnnouncement', settings.announcementLive ? 'Live' : 'Locked');
       setText('stageSummaryPortal', settings.participantPortalOpen ? 'Open' : 'Hidden');

       const timeline = [
           ['draft', 'Persiapan program, audit form, dan sinkronisasi sheet.', 'fa-clipboard-check'],
           ['registration_open', 'Form pendaftaran publik dibuka dan data masuk ke Participants.', 'fa-file-signature'],
           ['selection_1', 'Kurasi administrasi dan validasi jalur afirmasi.', 'fa-users-cog'],
           ['ai_prescreening', 'AI membaca essay dan menyiapkan baseline skor.', 'fa-robot'],
           ['review_scoring', 'Reviewer mengedit nilai sebelum keputusan tahap 1.', 'fa-sliders'],
           ['announcement_stage_1', 'Pengumuman lolos tahap 1 dan instruksi tes kompetensi tampil.', 'fa-bullhorn'],
           ['competency_test', 'Peserta lolos tahap 1 mengerjakan tes logika dan matematika daring.', 'fa-square-root-variable'],
           ['announcement_stage_2', 'Pengumuman final dari hasil tes kompetensi tampil.', 'fa-clipboard-list'],
           ['bootcamp_active', 'Kelas, task, mentoring, dan attendance berjalan.', 'fa-chalkboard-user'],
           ['final_project', 'Tim mengerjakan final project dan demo.', 'fa-laptop-code'],
           ['graduation', 'Sertifikat, graduation, dan wall of fame.', 'fa-certificate']
       ];
       const currentIndex = timeline.findIndex(([key]) => key === currentStage);
       const list = document.getElementById('stageFlowList');
       if (list) {
           list.innerHTML = timeline.map(([key, desc, icon], index) => {
               const status = index < currentIndex ? 'Selesai' : index === currentIndex ? 'Aktif' : 'Planned';
               const badgeClass = index < currentIndex ? 'lolos' : index === currentIndex ? 'reguler' : 'pending';
               return `
                   <div class="stage-flow-item">
                       <div class="stage-flow-icon"><i class="fas ${icon}"></i></div>
                       <div><strong>${stageLabels[key] || key}</strong><p>${desc}</p></div>
                       <span class="badge ${badgeClass}">${status}</span>
                   </div>
               `;
           }).join('');
       }
   }

   window.initBootcamp = async function() {
       await initOpsModule('Bootcamp Control', 'getBootcampSessions', 'bootcampSessionBody', renderBootcampSessions);
       document.getElementById('btnAddBootcampSession')?.addEventListener('click', () => {
           const title = prompt('Nama sesi bootcamp:');
           if (!title) return;
           const mentor = prompt('Nama mentor:', 'Mentor Team') || 'Mentor Team';
           const date = prompt('Tanggal sesi:', 'TBD') || 'TBD';
           const rows = readLocalRows('herai_bootcamp_sessions');
           rows.unshift({ title, mentor, date, link: '#/assets', attendance: '0 / 100', status: 'Planned' });
           writeLocalRows('herai_bootcamp_sessions', rows);
           renderBootcampSessions(rows);
           window.logAdminActivity(`Menambahkan sesi bootcamp: ${title}`);
       });
   };

   window.initFinalProject = async function() {
       await initOpsModule('Final Project Tracker', 'getFinalProjects', 'projectBoardBody', renderFinalProjects);
       document.getElementById('btnAddProjectTeam')?.addEventListener('click', () => {
           const team = prompt('Nama tim:');
           if (!team) return;
           const project = prompt('Nama project:', 'Untitled AI Project') || 'Untitled AI Project';
           const rows = readLocalRows('herai_final_projects');
           rows.unshift({ team, project, mentor: 'TBD', repository: '-', score: 0, status: 'Draft' });
           writeLocalRows('herai_final_projects', rows);
           renderFinalProjects(rows);
           window.logAdminActivity(`Menambahkan final project team: ${team}`);
       });
   };

   window.initCertificates = async function() {
       await initOpsModule('Certificate Manager', 'getCertificates', 'certificateRegistryBody', renderCertificates);
       document.getElementById('btnGenerateCertificates')?.addEventListener('click', () => {
           const rows = readLocalRows('herai_certificates');
           if (rows.length === 0) {
               rows.push({ no: 'HERAI-2026-0001', name: 'Sample Fellow', score: 0, status: 'Pending', issuedAt: '-' });
           }
           writeLocalRows('herai_certificates', rows);
           renderCertificates(rows);
           window.logAdminActivity('Menjalankan generate eligible certificates');
           alert('Registry sertifikat siap. Data final akan mengikuti peserta eligible dari database.');
       });
   };

   async function initOpsModule(label, action, tableBodyId, renderer) {
       await window.loadSidebar();
       if (!window.checkAdminAccess()) return;
       window.updateAdminProfile();
       window.logAdminActivity(`Sedang melihat halaman ${label}`);

       const syncBtn = document.querySelector(`#${tableBodyId}`)?.closest('.data-section, .ops-panel')?.querySelector('.btn-action');
       if (syncBtn) {
           syncBtn.onclick = () => loadOpsTable(action, tableBodyId, renderer);
       }
       await loadOpsTable(action, tableBodyId, renderer);
   }

   async function loadOpsTable(action, tableBodyId, renderer) {
       const tableBody = document.getElementById(tableBodyId);
       if (!tableBody) return;

       tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:30px; color:var(--text-muted);"><i class="fas fa-circle-notch fa-spin"></i> Sinkronisasi data...</td></tr>`;
       try {
            const response = await fetch(API_URL, {
                method: 'POST',
                body: JSON.stringify(withAdminToken({ action }))
            });
           const result = await response.json();
           if (result.status !== 'success') throw new Error(result.message || 'Gagal memuat data');
           const rows = result.data || result.sessions || result.projects || result.certificates || [];
           renderer(Array.isArray(rows) && rows.length ? rows : getDefaultOpsRows(tableBodyId));
       } catch (error) {
           renderer(getDefaultOpsRows(tableBodyId));
       }
   }

   function readLocalRows(key) {
       try { return JSON.parse(localStorage.getItem(key) || '[]'); }
       catch (error) { return []; }
   }

   function writeLocalRows(key, rows) {
       localStorage.setItem(key, JSON.stringify(rows));
   }

   function getDefaultOpsRows(tableBodyId) {
       if (tableBodyId === 'bootcampSessionBody') {
           const local = readLocalRows('herai_bootcamp_sessions');
           return local.length ? local : [{ title: 'AI Fundamentals', date: 'TBD', mentor: 'Mentor Team', link: '#/assets', attendance: '0 / 100', status: 'Planned' }];
       }
       if (tableBodyId === 'projectBoardBody') {
           const local = readLocalRows('herai_final_projects');
           return local.length ? local : [{ team: 'Team A', project: 'Untitled AI Project', mentor: 'TBD', repository: '-', score: 0, status: 'Draft' }];
       }
       const local = readLocalRows('herai_certificates');
       return local.length ? local : [{ no: 'HERAI-2026-0001', name: '-', score: 0, status: 'Pending', issuedAt: '-' }];
   }

   function renderBootcampSessions(rows) {
       const tbody = document.getElementById('bootcampSessionBody');
       if (!tbody) return;
       tbody.innerHTML = rows.map(row => `
           <tr><td>${escapeHtml(row.title || row.session || '-')}</td><td>${escapeHtml(row.date || '-')}</td><td>${escapeHtml(row.mentor || '-')}</td><td><a href="${escapeAttr(row.link || '#/assets')}">Open Link</a></td><td>${escapeHtml(row.attendance || '0 / 100')}</td><td><span class="badge pending">${escapeHtml(row.status || 'Planned')}</span></td></tr>
       `).join('');
       document.getElementById('bootcampActiveCount').textContent = '0';
       document.getElementById('bootcampDoneCount').textContent = rows.filter(row => String(row.status).toLowerCase() === 'done').length;
       document.getElementById('bootcampAttendanceAvg').textContent = rows.length ? '0%' : '0%';
   }

   function renderFinalProjects(rows) {
       const tbody = document.getElementById('projectBoardBody');
       if (!tbody) return;
       tbody.innerHTML = rows.map(row => `
           <tr><td>${escapeHtml(row.team || '-')}</td><td>${escapeHtml(row.project || '-')}</td><td>${escapeHtml(row.mentor || '-')}</td><td>${row.repository && row.repository !== '-' ? `<a href="${escapeAttr(row.repository)}" target="_blank">Repo</a>` : '-'}</td><td>${escapeHtml(row.score ?? 0)}</td><td><span class="badge pending">${escapeHtml(row.status || 'Draft')}</span></td></tr>
       `).join('');
       document.getElementById('projectTeamCount').textContent = rows.length;
       document.getElementById('projectSubmittedCount').textContent = rows.filter(row => String(row.status).toLowerCase().includes('submit')).length;
       document.getElementById('projectReadyCount').textContent = rows.filter(row => String(row.status).toLowerCase().includes('ready')).length;
   }

   function renderCertificates(rows) {
       const tbody = document.getElementById('certificateRegistryBody');
       if (!tbody) return;
       tbody.innerHTML = rows.map(row => `
           <tr><td>${escapeHtml(row.no || row.certificateNo || '-')}</td><td>${escapeHtml(row.name || '-')}</td><td>${escapeHtml(row.score ?? row.finalScore ?? 0)}</td><td><span class="badge pending">${escapeHtml(row.status || 'Pending')}</span></td><td>${escapeHtml(row.issuedAt || '-')}</td><td><button class="btn-action" onclick="alert('Preview sertifikat akan mengikuti template final.')">Preview</button></td></tr>
       `).join('');
       document.getElementById('certEligibleCount').textContent = rows.length;
       document.getElementById('certSentCount').textContent = rows.filter(row => String(row.status).toLowerCase() === 'sent').length;
       document.getElementById('certPendingCount').textContent = rows.filter(row => String(row.status).toLowerCase() !== 'sent').length;
   }
   
   // ==========================================
   // 5. RBAC AUTH
   // ==========================================
   window.initRbac = async function() {
       await window.loadSidebar();
       if (!window.checkAdminAccess()) return;
       window.updateAdminProfile();
   
       window.logAdminActivity("Sedang melihat halaman RBAC Auth");
   
       // Load data admin dari Google Sheets
       await loadAdminData();
       
       const btnAdd = document.getElementById('btnAddAdmin');
       if (btnAdd) {
           btnAdd.onclick = () => {
               window.logAdminActivity("Membuka form Tambah Admin/Role Baru");
               window.toggleModal('adminModal', 'open');
           };
       }
       
       const btnSaveAdmin = document.getElementById('btnSaveAdmin');
       if (btnSaveAdmin) {
           btnSaveAdmin.onclick = () => {
               window.logAdminActivity("Menyimpan data Admin/Role baru");
               saveNewAdmin();
           };
       }
       
       document.addEventListener('click', e => {
           if (window.location.hash !== '#/rbac') return;
           if (e.target.closest('#btnCloseAdmin') || e.target.closest('#btnCancelAdmin')) {
               window.logAdminActivity("Membatalkan/Menutup form Tambah Admin");
               window.toggleModal('adminModal', 'close');
           }
           
           // Handle edit & delete buttons
           if (e.target.closest('.btn-edit-admin')) {
               const adminId = e.target.closest('.btn-edit-admin').dataset.id;
               window.logAdminActivity(`Mengedit data Admin ID: ${adminId}`);
               editAdmin(adminId);
           }
           
           if (e.target.closest('.btn-delete-admin')) {
               const adminId = e.target.closest('.btn-delete-admin').dataset.id;
               window.logAdminActivity(`Menghapus Admin ID: ${adminId}`);
               deleteAdmin(adminId);
           }
       });
   };
   
   // Helper functions untuk RBAC
   async function loadAdminData() {
       const tableBody = document.getElementById('adminTableBody');
       const loading = document.getElementById('loadingAdmins');
       
       if (!tableBody) return;
       
       loading?.classList.remove('hidden');
       tableBody.innerHTML = '';
       
       try {
            const response = await fetch(API_URL, {
                method: 'POST',
                body: JSON.stringify(withAdminToken({ action: 'getAdmins' }))
            });
           
           const result = await response.json();
           
           const admins = result.admins || result.data || [];
           if (result.status === 'success' && admins.length) {
               renderAdminTable(admins);
           } else {
               renderAdminTable(getDefaultAdmins());
           }
       } catch (error) {
           console.error('Error loading admin data:', error);
           renderAdminTable(getDefaultAdmins());
       } finally {
           loading?.classList.add('hidden');
       }
   }

   function getDefaultAdmins() {
       return [
           { adminId: 'ROOT-CHEN', name: 'Marchel Andrian', role: 'superadmin', active: true, lastLogin: 'Baru saja' },
           { adminId: 'REV-FENDY', name: 'Fendy Hendriyanto', role: 'reviewer', active: true, lastLogin: '-' },
           { adminId: 'KUR-DITHA', name: 'Ditha Adinda', role: 'kurator', active: true, lastLogin: '-' }
       ];
   }
   
   function renderAdminTable(admins) {
       const tableBody = document.getElementById('adminTableBody');
       if (!tableBody) return;
       
       tableBody.innerHTML = '';
       
       admins.forEach(rawAdmin => {
           const admin = normalizeAdminRecord(rawAdmin);
           const roleClass = admin.role === 'superadmin' ? 'role-super' : 
                            admin.role === 'kurator' ? 'role-kurator' : 'role-reviewer';
           const moduleAccess = admin.role === 'superadmin' ? 'ALL MODULES'
                              : admin.role === 'kurator' ? 'Seleksi Tahap 1, Anti-Fraud'
                              : 'Skoring, AI Pre-Screening';
           
           const row = `
               <tr>
                   <td>
                       <div style="font-weight: 700; color: var(--dark-purple);">${escapeHtml(admin.name)}</div>
                       <div style="font-size: 0.8rem; color: var(--text-muted); font-family: monospace;">ID: ${escapeHtml(admin.adminId)}</div>
                   </td>
                   <td><span class="role-badge ${roleClass}">${admin.roleLabel}</span></td>
                   <td style="font-size: 0.85rem; color: var(--text-muted);">${moduleAccess}</td>
                   <td style="font-size: 0.85rem; color: var(--text-dark);">${escapeHtml(admin.lastLogin || '-')}</td>
                   <td><span class="badge" style="background: rgba(5, 205, 153, 0.1); color: var(--success); border: 1px solid rgba(5, 205, 153, 0.3);">${admin.active ? 'Active' : 'Inactive'}</span></td>
                   <td>
                       <div style="display:flex; gap:8px; justify-content:center;">
                           <button class="btn-action btn-edit-admin" data-id="${escapeAttr(admin.adminId)}" title="Reset password"><i class="fas fa-key"></i></button>
                           <button class="btn-action btn-delete-admin" data-id="${escapeAttr(admin.adminId)}" style="color: var(--danger); border-color: rgba(230,57,70,0.3);" title="Cabut akses"><i class="fas fa-user-slash"></i></button>
                       </div>
                   </td>
               </tr>
           `;
           tableBody.insertAdjacentHTML('beforeend', row);
       });

       const setStat = (id, value) => { const el = document.getElementById(id); if (el) el.innerHTML = `${value} <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 500;">User</span>`; };
       setStat('statTotalAdmins', admins.length);
       setStat('statSuperAdmins', admins.map(normalizeAdminRecord).filter(admin => admin.role === 'superadmin').length);
   }

   function normalizeAdminRecord(admin) {
       const roleRaw = String(admin.role || admin.peran_admin || 'reviewer').toLowerCase().replace(/\s+/g, '');
       const role = roleRaw.includes('super') ? 'superadmin' : roleRaw.includes('kurator') || roleRaw.includes('admin') ? 'kurator' : 'reviewer';
       const roleLabel = role === 'superadmin' ? 'Super Admin' : role === 'kurator' ? 'Kurator Data' : 'Reviewer';
       return {
           adminId: admin.adminId || admin.id_admin || admin.id || '-',
           name: admin.name || admin.nama_admin || admin.adminName || admin.adminId || admin.id_admin || 'Admin',
           role,
           roleLabel,
           lastLogin: admin.lastLogin || admin.last_login || '-',
           active: admin.active !== false && admin.status !== 'inactive'
       };
   }
   
   async function saveNewAdmin() {
       const name = document.getElementById('adminName')?.value.trim();
       const adminId = document.getElementById('adminUsername')?.value.trim();
       const password = document.getElementById('adminPass')?.value.trim();
       const role = document.querySelector('input[name="role"]:checked')?.value || 'reviewer';
       
       if (!name || !adminId || !password || !role) {
           alert('Semua field harus diisi!');
           return;
       }
       
       try {
            const response = await fetch(API_URL, {
                method: 'POST',
                body: JSON.stringify(withAdminToken({
                    action: 'addAdmin',
                    adminId,
                    id_admin: adminId,
                    name,
                    password,
                    role,
                    peran_admin: role
                }))
            });
           
           const result = await response.json();
           
           if (result.status === 'success') {
               alert('Admin berhasil ditambahkan!');
               window.toggleModal('adminModal', 'close');
               await loadAdminData();
               
               // Reset form
               document.getElementById('adminForm')?.reset();
           } else {
               alert('Gagal menambahkan admin: ' + result.message);
           }
       } catch (error) {
           console.error('Error saving admin:', error);
           alert('Terjadi kesalahan saat menyimpan data');
       }
   }
   
   async function editAdmin(adminId) {
       // Implementasi edit - bisa di-customize sesuai kebutuhan
       const newPassword = prompt(`Masukkan password baru untuk ${adminId}:`);
       if (!newPassword) return;
       
       try {
            const response = await fetch(API_URL, {
                method: 'POST',
                body: JSON.stringify(withAdminToken({
                    action: 'updateAdmin',
                    adminId,
                    id_admin: adminId,
                    password: newPassword
                }))
            });
           
           const result = await response.json();
           
           if (result.status === 'success') {
               alert('Password berhasil diupdate!');
               await loadAdminData();
           } else {
               alert('Gagal mengupdate password: ' + result.message);
           }
       } catch (error) {
           console.error('Error updating admin:', error);
           alert('Terjadi kesalahan saat mengupdate data');
       }
   }
   
   async function deleteAdmin(adminId) {
       if (!confirm(`Apakah Anda yakin ingin menghapus admin ${adminId}?`)) return;
       
       try {
            const response = await fetch(API_URL, {
                method: 'POST',
                body: JSON.stringify(withAdminToken({
                    action: 'deleteAdmin',
                    adminId,
                    id_admin: adminId
                }))
            });
           
           const result = await response.json();
           
           if (result.status === 'success') {
               alert('Admin berhasil dihapus!');
               await loadAdminData();
           } else {
               alert('Gagal menghapus admin: ' + result.message);
           }
       } catch (error) {
        console.error('Error deleting admin:', error);
            alert('Terjadi kesalahan saat menghapus data');
         }
    }

    // ── Live Monitor ──────────────────────────────────────────────────────

    window.initLiveMonitor = function () {
        var apiUrl = '/__gas';
        var PAGE_SIZE = 30;
        var SKELETON_THRESHOLD_MS = 300;

        if (typeof window.loadSidebar === 'function') {
            window.loadSidebar('nav-live-monitor');
        }

        try {
            var profile = JSON.parse(localStorage.getItem('heraiAdminProfile') || '{}');
            var nameEl = document.getElementById('display-admin-name');
            var idEl = document.getElementById('display-admin-id');
            if (nameEl) nameEl.textContent = profile.name || 'Admin';
            if (idEl) idEl.textContent = profile.role === 'superadmin' ? 'Super Admin Access' : 'Admin Access';
        } catch (_) {}

        var pollTimer = null;
        var activityOffset = 0;
        var totalActivityCount = 0;
        var dateFrom = '';
        var dateTo = '';
        var currentNik = '';
        var isLoading = false;
        var skeletonTimer = null;
        var skeletonShown = false;

        function presenceSkeleton(n) {
            n = n || 4;
            var html = '';
            for (var i = 0; i < n; i++) {
                html += '<div class="sk-card">'
                    + '<div class="sk sk-avatar"></div>'
                    + '<div class="sk-lines">'
                    + '<div class="sk sk-line sk-w60"></div>'
                    + '<div class="sk sk-line sk-w40"></div>'
                    + '</div></div>';
            }
            return '<div class="sk-list">' + html + '</div>';
        }

        function activitySkeleton(n) {
            n = n || 4;
            var html = '';
            for (var i = 0; i < n; i++) {
                html += '<div class="sk-card sk-row">'
                    + '<div class="sk sk-icon"></div>'
                    + '<div class="sk-lines">'
                    + '<div class="sk sk-line sk-w70"></div>'
                    + '<div class="sk sk-line sk-w90"></div>'
                    + '<div class="sk sk-line sk-w30"></div>'
                    + '</div></div>';
            }
            return '<div class="sk-list">' + html + '</div>';
        }

        function maybeShowPresenceSkeleton() {
            if (skeletonTimer) clearTimeout(skeletonTimer);
            skeletonTimer = setTimeout(function () {
                var list = document.getElementById('live-online-presence');
                if (list && list.children.length === 0) {
                    list.innerHTML = presenceSkeleton(5);
                    skeletonShown = true;
                }
            }, SKELETON_THRESHOLD_MS);
        }

        function maybeShowActivitySkeleton(append) {
            if (append) return;
            var feed = document.getElementById('live-activity-feed');
            if (!feed) return;
            if (skeletonTimer) clearTimeout(skeletonTimer);
            skeletonTimer = setTimeout(function () {
                if (feed.children.length === 0 || feed.querySelector('.empty-feed') || feed.querySelector('.sk-list')) {
                    feed.innerHTML = activitySkeleton(5);
                    skeletonShown = true;
                }
            }, SKELETON_THRESHOLD_MS);
        }

        function clearSkeletonTimer() {
            if (skeletonTimer) { clearTimeout(skeletonTimer); skeletonTimer = null; }
        }

        function activeFilters() {
            var o = {};
            if (dateFrom) o.dateFrom = dateFrom;
            if (dateTo) o.dateTo = dateTo;
            return o;
        }

        function updateResultCount() {
            var el = document.getElementById('live-result-count');
            if (!el) return;
            var n = totalActivityCount;
            el.textContent = n + ' aktivitas';
            el.classList.toggle('is-filtered', !!(dateFrom || dateTo || currentNik));
        }

        function updateActiveFilterIndicator() {
            var wrap = document.getElementById('live-active-filter');
            var textEl = document.getElementById('live-active-filter-text');
            if (!wrap || !textEl) return;
            var active = !!(dateFrom || dateTo || currentNik);
            if (!active) { wrap.hidden = true; return; }
            var parts = [];
            if (dateFrom && dateTo) {
                parts.push(escapeHtml(formatDateRange(dateFrom, dateTo)));
            } else if (dateFrom) {
                parts.push('Dari ' + escapeHtml(formatDateShort(dateFrom)));
            } else if (dateTo) {
                parts.push('Sampai ' + escapeHtml(formatDateShort(dateTo)));
            }
            if (currentNik) {
                var sel = document.getElementById('live-feed-filter-nik');
                var label = (sel && sel.selectedIndex >= 0) ? sel.options[sel.selectedIndex].text : currentNik;
                parts.push('Peserta: ' + escapeHtml(label));
            }
            textEl.innerHTML = 'Filter aktif — ' + parts.join(' · ');
            wrap.hidden = false;
        }

        function formatDateShort(iso) {
            try {
                var d = new Date(iso + 'T00:00:00');
                return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
            } catch (_) { return iso; }
        }

        function formatDateRange(a, b) {
            return formatDateShort(a) + ' — ' + formatDateShort(b);
        }

        function updatePollStatus(busy) {
            var s = document.getElementById('live-poll-status');
            var dot = document.querySelector('.lmc-pulse-dot');
            if (s) s.textContent = busy ? 'Memperbarui' : 'Live';
            if (dot) dot.classList.toggle('is-busy', !!busy);
        }

        function poll() {
            fetchOnlineParticipants();
            fetchRecentActivity();
        }

        function fetchOnlineParticipants() {
            maybeShowPresenceSkeleton();
            try {
                fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                    body: JSON.stringify(withAdminToken({ action: 'getOnlineParticipants' }))
                })
                    .then(function (r) { return r.json(); })
                    .then(function (data) {
                        clearSkeletonTimer();
                        if (!data || data.status !== 'success') return;
                        renderOnlinePresence(data.participants || [], data.count || (data.participants || []).length);
                    })
                    .catch(function () { clearSkeletonTimer(); });
            } catch (_) { clearSkeletonTimer(); }
        }

        function fetchRecentActivity(options) {
            options = options || {};
            var append = !!options.append;
            var nikOverride = options.nik;
            var limit = options.limit || PAGE_SIZE;

            if (options.reset) {
                activityOffset = 0;
                totalActivityCount = 0;
                append = false;
            }

            if (nikOverride !== undefined) currentNik = nikOverride || '';

            if (isLoading) return;
            isLoading = true;
            updatePollStatus(true);

            if (append) {
                showLoadMoreLoader();
            } else {
                maybeShowActivitySkeleton(false);
            }

            var payload = withAdminToken(Object.assign(
                { action: 'getRecentActivity', limit: limit, offset: append ? activityOffset : 0 },
                activeFilters()
            ));
            if (currentNik) payload.nik = currentNik;

            fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify(payload)
            })
                .then(function (r) { return r.json(); })
                .then(function (data) {
                    clearSkeletonTimer();
                    if (data.status !== 'success') return;
                    totalActivityCount = data.total || 0;
                    updateResultCount();
                    updateActiveFilterIndicator();
                    renderActivityFeed(data.activities || [], append);
                    if (activityOffset === 0 && !append) populateNikFilter(data.activities || []);
                })
                .catch(function () { clearSkeletonTimer(); })
                .then(function () {
                    isLoading = false;
                    removeLoadMoreLoader();
                    updatePollStatus(false);
                });
        }

        function showLoadMoreLoader() {
            var feed = document.getElementById('live-activity-feed');
            if (!feed) return;
            var existing = feed.querySelector('.live-load-more-loading');
            if (existing) return;
            feed.insertAdjacentHTML('beforeend',
                '<div class="live-load-more-loading" aria-live="polite">'
                + '<span class="lm-spin"><i class="fas fa-circle-notch"></i></span>'
                + '<span>Memuat lebih banyak...</span>'
                + '</div>');
        }

        function removeLoadMoreLoader() {
            var feed = document.getElementById('live-activity-feed');
            if (!feed) return;
            var node = feed.querySelector('.live-load-more-loading');
            if (node) node.remove();
        }

        function renderOnlinePresence(participants, count) {
            clearSkeletonTimer();
            var badge = document.getElementById('live-online-badge');
            var list = document.getElementById('live-online-presence');
            var title = document.getElementById('live-online-title');
            if (badge) {
                badge.textContent = count + ' online';
                badge.classList.toggle('is-empty', count === 0);
            }
            if (title) title.innerHTML = '<i class="fas fa-dot-circle ' + (count > 0 ? 'icon-green' : 'icon-gray') + '"></i> Peserta Online';

            if (!list) return;

            if (participants.length === 0) {
                list.innerHTML = '<div class="empty-presence">'
                    + '<div class="empty-illust"><i class="fas fa-user-slash"></i></div>'
                    + '<span class="empty-title">Belum ada peserta online</span>'
                    + '<span class="empty-sub">Peserta yang sedang aktif akan tampil di sini secara langsung.</span>'
                    + '</div>';
                return;
            }

            var html = '';
            for (var i = 0; i < participants.length; i++) {
                var p = participants[i];
                var name = p.nama_lengkap || 'Peserta';
                var initials = (name.split(/\s+/).slice(0, 2).map(function (w) { return w.charAt(0).toUpperCase(); }).join('')) || '?';
                var page = p.page ? p.page.replace(/^\/participant-/, '') : '';
                var module = p.module_id || '';
                var where = module || page || 'Dashboard';
                var seen = getRelativeTime(p.last_seen || p.timestamp);
                var hb = p.last_seen ? formatHeartbeat(p.last_seen) : '';
                html += '<div class="presence-card" style="animation-delay:' + (i * 40) + 'ms">'
                    + '<div class="presence-avatar">' + escapeHtml(initials) + '<span class="presence-dot online"></span></div>'
                    + '<div class="presence-meta">'
                    + '<span class="presence-name">' + escapeHtml(name) + '</span>'
                    + '<span class="presence-page"><i class="fas fa-location-crosshairs"></i> ' + escapeHtml(where) + '</span>'
                    + (hb ? '<span class="presence-hb"><i class="fas fa-heart-pulse"></i> ' + escapeHtml(hb) + '</span>' : '')
                    + '</div>'
                    + (seen ? '<span class="presence-seen">' + escapeHtml(seen) + '</span>' : '')
                    + '</div>';
            }
            list.innerHTML = html;
        }

        function formatHeartbeat(ts) {
            try {
                var diff = Date.now() - new Date(ts).getTime();
                var sec = Math.max(0, Math.floor(diff / 1000));
                if (sec < 60) return sec + 'd lalu';
                var min = Math.floor(sec / 60);
                if (min < 60) return min + 'm lalu';
                var hr = Math.floor(min / 60);
                return hr + 'j lalu';
            } catch (_) { return ''; }
        }

        var ACTIVITY_META = {
            login:               { icon: 'fas fa-right-to-bracket',   tone: 'tone-green' },
            password_change:     { icon: 'fas fa-key',                tone: 'tone-amber' },
            progress_update:     { icon: 'fas fa-book-open',          tone: 'tone-blue' },
            discussion_post:     { icon: 'fas fa-comment-dots',       tone: 'tone-pink' },
            discussion_reply:    { icon: 'fas fa-reply',              tone: 'tone-pink' },
            exercise_submitted:  { icon: 'fas fa-pen-to-square',      tone: 'tone-violet' },
            exercise_draft_saved:{ icon: 'fas fa-floppy-disk',        tone: 'tone-slate' },
            page_view:           { icon: 'fas fa-eye',                tone: 'tone-slate' }
        };

        function getActivityMeta(type) {
            return ACTIVITY_META[type] || { icon: 'fas fa-circle-dot', tone: 'tone-slate' };
        }

        function getRelativeTime(ts) {
            if (!ts) return '';
            var diff = Date.now() - new Date(ts).getTime();
            if (diff < 0) return 'Baru saja';
            var sec = Math.floor(diff / 1000);
            if (sec < 60) return 'Baru saja';
            var min = Math.floor(sec / 60);
            if (min < 60) return min + ' menit lalu';
            var hr = Math.floor(min / 60);
            if (hr < 24) return hr + ' jam lalu';
            return Math.floor(hr / 24) + ' hari lalu';
        }

        function renderActivityFeed(activities, append) {
            var feed = document.getElementById('live-activity-feed');
            if (!feed) return;

            if (!append) {
                if (activities.length === 0) {
                    feed.innerHTML = '<div class="empty-feed">'
                        + '<div class="empty-illust"><i class="fas fa-inbox"></i></div>'
                        + '<span class="empty-title">Tidak ada aktivitas</span>'
                        + '<span class="empty-sub">Coba ubah rentang tanggal atau hapus filter untuk melihat seluruh aktivitas.</span>'
                        + '<button type="button" class="lm-empty-action" id="live-empty-clear">'
                        + '<i class="fas fa-rotate-left"></i> Hapus Filter</button>'
                        + '</div>';
                    var ec = document.getElementById('live-empty-clear');
                    if (ec) ec.addEventListener('click', resetDateFilter);
                    return;
                }
                feed.innerHTML = '';
            } else {
                var stale = feed.querySelector('.empty-feed');
                if (stale) stale.remove();
                var sk = feed.querySelector('.sk-list');
                if (sk) sk.remove();
            }

            var html = '';
            for (var i = 0; i < activities.length; i++) {
                var a = activities[i];
                var meta = getActivityMeta(a.activity_type);
                var relTime = getRelativeTime(a.timestamp);
                var actor = escapeHtml(a.nama_lengkap || a.nik || '?');
                var desc = escapeHtml(a.activity || '');
                var ts = a.timestamp ? new Date(a.timestamp).toLocaleString('id-ID', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) : '';
                var delay = append ? (i * 30) + 'ms' : (i * 40) + 'ms';
                html += '<div class="activity-item ' + meta.tone + '" style="animation-delay:' + delay + '">'
                    + '<div class="activity-rail"></div>'
                    + '<span class="activity-icon"><i class="' + meta.icon + '"></i></span>'
                    + '<div class="activity-body">'
                    + '<span class="activity-name">' + actor + '</span>'
                    + '<span class="activity-desc">' + desc + '</span>'
                    + (ts ? '<span class="activity-ts"><i class="far fa-clock"></i> ' + escapeHtml(ts) + '</span>' : '')
                    + '</div>'
                    + '<span class="activity-time">' + escapeHtml(relTime) + '</span>'
                    + '</div>';
            }
            feed.insertAdjacentHTML('beforeend', html);

            if (append) activityOffset += activities.length;

            var loadMore = feed.querySelector('.live-load-more');
            if (loadMore) loadMore.remove();
            if (activityOffset < totalActivityCount && activities.length > 0) {
                feed.insertAdjacentHTML('beforeend',
                    '<button class="live-load-more" id="live-load-more-btn">'
                    + '<i class="fas fa-chevron-down"></i><span>Muat Lebih Banyak</span>'
                    + '<em>' + (totalActivityCount - activityOffset) + ' aktivitas tersisa</em>'
                    + '</button>');
                var btn = document.getElementById('live-load-more-btn');
                if (btn) btn.addEventListener('click', function () {
                    fetchRecentActivity({ append: true });
                });
            }
        }

        function populateNikFilter(activities) {
            var select = document.getElementById('live-feed-filter-nik');
            if (!select || select.dataset.filled) return;
            select.dataset.filled = '1';

            var seen = {};
            for (var i = 0; i < activities.length; i++) {
                var key = (activities[i].nik || '') + '|' + (activities[i].nama_lengkap || '');
                if (!seen[key]) {
                    seen[key] = true;
                    var opt = document.createElement('option');
                    opt.value = activities[i].nik || '';
                    opt.textContent = (activities[i].nama_lengkap || activities[i].nik || '?');
                    select.appendChild(opt);
                }
            }

            select.addEventListener('change', function () {
                currentNik = this.value || '';
                fetchRecentActivity({ reset: true, nik: currentNik });
                updateActiveFilterIndicator();
            });
        }

        function applyDateFilter() {
            clearPresetActive();
            var fEl = document.getElementById('live-filter-from');
            var tEl = document.getElementById('live-filter-to');
            dateFrom = (fEl && fEl.value) || '';
            dateTo = (tEl && tEl.value) || '';
            if (dateFrom && dateTo && dateFrom > dateTo) {
                var tmp = dateFrom; dateFrom = dateTo; dateTo = tmp;
                if (fEl) fEl.value = dateFrom;
                if (tEl) tEl.value = dateTo;
            }
            fetchRecentActivity({ reset: true });
        }

        function resetDateFilter() {
            dateFrom = ''; dateTo = '';
            clearPresetActive();
            var fEl = document.getElementById('live-filter-from');
            var tEl = document.getElementById('live-filter-to');
            if (fEl) fEl.value = '';
            if (tEl) tEl.value = '';
            var nikSel = document.getElementById('live-feed-filter-nik');
            if (nikSel) { nikSel.value = ''; currentNik = ''; }
            fetchRecentActivity({ reset: true, nik: '' });
            updateActiveFilterIndicator();
        }

        function isoToday() {
            var d = new Date();
            return d.toISOString().slice(0, 10);
        }
        function isoDaysAgo(n) {
            var d = new Date();
            d.setDate(d.getDate() - n);
            return d.toISOString().slice(0, 10);
        }
        function isoStartOfMonth() {
            var d = new Date();
            return new Date(d.getFullYear(), d.getMonth(), 1).toISOString().slice(0, 10);
        }

        function applyPreset(kind) {
            var fEl = document.getElementById('live-filter-from');
            var tEl = document.getElementById('live-filter-to');
            var f = '', t = isoToday();
            if (kind === 'today') { f = isoToday(); t = isoToday(); }
            else if (kind === '7d') { f = isoDaysAgo(6); t = isoToday(); }
            else if (kind === '30d') { f = isoDaysAgo(29); t = isoToday(); }
            else if (kind === 'month') { f = isoStartOfMonth(); t = isoToday(); }
            if (fEl) fEl.value = f;
            if (tEl) tEl.value = t;
            dateFrom = f; dateTo = t;
            setPresetActive(kind);
            fetchRecentActivity({ reset: true });
        }

        function setPresetActive(kind) {
            document.querySelectorAll('.lm-preset').forEach(function (b) {
                b.classList.toggle('is-active', b.getAttribute('data-preset') === kind);
            });
        }

        function clearPresetActive() {
            document.querySelectorAll('.lm-preset').forEach(function (b) {
                b.classList.remove('is-active');
            });
        }

        function bindControls() {
            var apply = document.getElementById('live-filter-apply');
            var reset = document.getElementById('live-filter-reset');
            var clearActive = document.getElementById('live-active-filter-clear');
            if (apply) apply.addEventListener('click', applyDateFilter);
            if (reset) reset.addEventListener('click', resetDateFilter);
            if (clearActive) clearActive.addEventListener('click', resetDateFilter);
            document.querySelectorAll('.lm-preset').forEach(function (b) {
                b.addEventListener('click', function () {
                    applyPreset(b.getAttribute('data-preset'));
                });
            });
            var fEl = document.getElementById('live-filter-from');
            var tEl = document.getElementById('live-filter-to');
            if (fEl) fEl.addEventListener('input', clearPresetActive);
            if (tEl) tEl.addEventListener('input', clearPresetActive);
        }

        var initList = document.getElementById('live-online-presence');
        var initFeed = document.getElementById('live-activity-feed');
        if (initList) initList.innerHTML = presenceSkeleton(5);
        if (initFeed) initFeed.innerHTML = activitySkeleton(5);

        bindControls();
        poll();
        pollTimer = setInterval(poll, 30000);

        window.addEventListener('hashchange', function cleanup() {
            if (!window.location.hash.startsWith('#/live-monitor')) {
                if (pollTimer) { clearInterval(pollTimer); pollTimer = null; }
                clearSkeletonTimer();
                window.removeEventListener('hashchange', cleanup);
            }
        });
    };

    // ==========================================
    // RESET PASSWORD PESERTA (Superadmin Only)
    // ==========================================

    window.initResetPassword = async function() {
        // 1. RBAC gate — superadmin only
        if (!window.checkAdminAccess || (typeof window.checkAdminAccess === 'function' && !window.checkAdminAccess())) {
            return;
        }
        const access = window.getCurrentAdminAccess ? window.getCurrentAdminAccess() : {};
        if (access.role !== 'superadmin') {
            var mc = document.querySelector('.main-content') || document.getElementById('admin-main-content');
            if (mc) {
                mc.innerHTML = '<div style="padding:60px 30px;text-align:center;">' +
                    '<i class="fas fa-lock" style="font-size:3rem;color:var(--danger);margin-bottom:16px;"></i>' +
                    '<h2 style="color:var(--dark-purple);margin:0 0 8px;">Akses Ditolak</h2>' +
                    '<p style="color:var(--text-muted);">Hanya superadmin yang dapat mengakses fitur Reset Password.</p></div>';
            }
            return;
        }

        // 2. Load sidebar
        if (typeof window.loadSidebar === 'function') await window.loadSidebar();

        // 3. Log activity
        if (typeof window.logAdminActivity === 'function') {
            window.logAdminActivity('Membuka halaman Reset Password Peserta');
        }

        // 4. Bind events (idempotent)
        var submitBtn = document.getElementById('admin-reset-pass-submit');
        if (!submitBtn || submitBtn.dataset.ready === 'true') return;
        submitBtn.dataset.ready = 'true';

        // Toggle password visibility
        function bindToggle(toggleId, inputId) {
            var toggle = document.getElementById(toggleId);
            var input = document.getElementById(inputId);
            if (toggle && input) {
                toggle.addEventListener('click', function() {
                    var isPassword = input.type === 'password';
                    input.type = isPassword ? 'text' : 'password';
                    var icon = toggle.querySelector('i');
                    if (icon) {
                        icon.className = isPassword ? 'fas fa-eye-slash' : 'fas fa-eye';
                    }
                });
            }
        }
        bindToggle('admin-reset-pass-toggle-pw', 'admin-reset-pass-password');
        bindToggle('admin-reset-pass-toggle-confirm', 'admin-reset-pass-confirm');

        // Focus ring styling for inputs
        ['admin-reset-pass-nik', 'admin-reset-pass-password', 'admin-reset-pass-confirm'].forEach(function(id) {
            var el = document.getElementById(id);
            if (el) {
                el.addEventListener('focus', function() { el.style.borderColor = 'var(--primary-pink)'; el.style.boxShadow = '0 0 0 3px rgba(255,20,147,0.12)'; });
                el.addEventListener('blur', function() { el.style.borderColor = 'var(--gray-border)'; el.style.boxShadow = 'none'; });
            }
        });

        // NIK input: only allow digits
        var nikInput = document.getElementById('admin-reset-pass-nik');
        if (nikInput) {
            nikInput.addEventListener('input', function() {
                nikInput.value = nikInput.value.replace(/\D/g, '').slice(0, 16);
            });
        }

        // Alert helper
        function showAlert(message, type) {
            var alertEl = document.getElementById('admin-reset-pass-alert');
            if (!alertEl) return;
            var isSuccess = type === 'success';
            alertEl.style.display = 'flex';
            alertEl.style.background = isSuccess ? 'rgba(5, 205, 153, 0.1)' : 'rgba(230, 57, 70, 0.1)';
            alertEl.style.border = '1px solid ' + (isSuccess ? 'rgba(5, 205, 153, 0.3)' : 'rgba(230, 57, 70, 0.3)');
            alertEl.style.color = isSuccess ? '#047857' : 'var(--danger)';
            alertEl.innerHTML = '<i class="fas fa-' + (isSuccess ? 'check-circle' : 'times-circle') + '"></i> ' +
                '<span>' + message + '</span>';
            alertEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        // Submit handler
        submitBtn.addEventListener('click', async function() {
            var nik = (document.getElementById('admin-reset-pass-nik')?.value || '').trim();
            var password = document.getElementById('admin-reset-pass-password')?.value || '';
            var confirm = document.getElementById('admin-reset-pass-confirm')?.value || '';

            // Client-side validation
            if (!nik) { showAlert('NIK peserta wajib diisi.', 'error'); return; }
            if (!/^\d{16}$/.test(nik)) { showAlert('NIK harus tepat 16 digit angka.', 'error'); return; }
            if (!password) { showAlert('Password baru wajib diisi.', 'error'); return; }
            if (password.length < 6) { showAlert('Password minimal 6 karakter.', 'error'); return; }
            if (password.length > 72) { showAlert('Password maksimal 72 karakter.', 'error'); return; }
            if (password.indexOf('pw$1$') === 0) { showAlert('Password tidak boleh diawali dengan "pw$1$".', 'error'); return; }
            if (password !== confirm) { showAlert('Konfirmasi password tidak cocok.', 'error'); return; }

            // Confirmation dialog
            if (!window.confirm('Yakin reset password untuk NIK ' + nik + '?\n\nTindakan ini akan mengganti password peserta dan tercatat di audit trail.')) {
                return;
            }

            // Disable button + loading state
            submitBtn.disabled = true;
            var originalHtml = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memproses...';

            try {
                var response = await fetch(API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                    body: JSON.stringify(withAdminToken({
                        action: 'adminResetParticipantPassword',
                        nik: nik,
                        newPassword: password
                    }))
                });
                var result = await response.json();

                if (result.status === 'success') {
                    var msg = escapeHtml(result.message || 'Password berhasil direset.');
                    if (result.nama_lengkap) {
                        msg += ' — Nama: <strong>' + escapeHtml(result.nama_lengkap) + '</strong>';
                    }
                    showAlert(msg, 'success');

                    // Clear form
                    if (document.getElementById('admin-reset-pass-nik')) document.getElementById('admin-reset-pass-nik').value = '';
                    if (document.getElementById('admin-reset-pass-password')) document.getElementById('admin-reset-pass-password').value = '';
                    if (document.getElementById('admin-reset-pass-confirm')) document.getElementById('admin-reset-pass-confirm').value = '';

                    if (typeof window.logAdminActivity === 'function') {
                        window.logAdminActivity('Reset password peserta NIK: ' + nik);
                    }
                } else {
                    showAlert(escapeHtml(result.message || 'Terjadi kesalahan.'), 'error');
                }
            } catch (err) {
                console.error('Reset password error:', err);
                showAlert('Terjadi kesalahan jaringan. Coba lagi.', 'error');
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalHtml;
            }
        });
    };

    // ==========================================
    // PROGRESS PESERTA (PLAN 1)
    // ==========================================
    window.initProgressPeserta = async function() {
        if (!window.checkAdminAccess || (typeof window.checkAdminAccess === 'function' && !window.checkAdminAccess())) {
            return;
        }
        await window.loadSidebar();
        window.updateAdminProfile();
        
        const container = document.getElementById('progress-overview-container');
        const tbody = document.getElementById('progress-table-body');
        const refreshBtn = document.getElementById('refresh-progress-btn');
        const searchInput = document.getElementById('progress-search-input');
        const apiUrl = '/__gas';
        let allData = [];

        async function loadData(forceRefresh = false) {
            try {
                if (refreshBtn) {
                    refreshBtn.disabled = true;
                    refreshBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memuat...';
                }
                
                // Fetch Overview
                const resOverview = await fetch(apiUrl, {
                    method: 'POST',
                    body: JSON.stringify(withAdminToken({
                        action: 'getAdminLearningProgressOverview',
                        ...window.getCurrentAdminAccess(),
                        forceRefresh: forceRefresh
                    }))
                });
                
                // Fetch Detail
                const resDetail = await fetch(apiUrl, {
                    method: 'POST',
                    body: JSON.stringify(withAdminToken({
                        action: 'getAdminParticipantProgressDetail',
                        ...window.getCurrentAdminAccess(),
                        forceRefresh: forceRefresh
                    }))
                });

                if (resOverview.ok && resDetail.ok) {
                    const overviewJson = await resOverview.json();
                    const detailJson = await resDetail.json();
                    
                    if (overviewJson.status === 'success') {
                        renderOverview(overviewJson.data);
                    }
                    if (detailJson.status === 'success') {
                        allData = detailJson.data || [];
                        renderTable(allData);
                    } else {
                        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:20px; color:red;">Gagal memuat: ${escapeHtml(detailJson.message || 'Error tidak diketahui')}</td></tr>`;
                    }
                } else {
                    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding:20px; color:red;">Gagal menghubungi server GAS. Pastikan GAS sudah di-deploy.</td></tr>';
                }
            } catch (err) {
                console.error("Gagal memuat data progress", err);
                if (tbody) tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding:20px; color:red;">Terjadi kesalahan jaringan atau server.</td></tr>';
            } finally {
                if (refreshBtn) {
                    refreshBtn.disabled = false;
                    refreshBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Segarkan Data';
                }
            }
        }

        function getInitials(name) {
            if (!name) return '??';
            const parts = name.trim().split(' ');
            if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
            return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
        }

        function timeSince(dateString) {
            if (!dateString) return '-';
            const date = new Date(dateString);
            const seconds = Math.floor((new Date() - date) / 1000);
            let interval = seconds / 31536000;
            if (interval > 1) return Math.floor(interval) + " tahun yang lalu";
            interval = seconds / 2592000;
            if (interval > 1) return Math.floor(interval) + " bulan yang lalu";
            interval = seconds / 86400;
            if (interval > 1) return Math.floor(interval) + " hari yang lalu";
            interval = seconds / 3600;
            if (interval > 1) return Math.floor(interval) + " jam yang lalu";
            interval = seconds / 60;
            if (interval > 1) return Math.floor(interval) + " menit yang lalu";
            return Math.floor(seconds) + " detik yang lalu";
        }

        function renderOverview(data) {
            if (!container) return;
            
            // Calculate active in last 7 days from allData
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
            const active7d = allData.filter(p => p.lastActiveAt && new Date(p.lastActiveAt) > sevenDaysAgo).length;
            const activePercent = allData.length > 0 ? ((active7d / allData.length) * 100).toFixed(1) : 0;

            container.innerHTML = `
                <div class="premium-summary-card">
                    <div class="premium-summary-icon"><i class="fas fa-users"></i></div>
                    <div class="premium-summary-content">
                        <h4>Total Peserta</h4>
                        <p class="main-val">${data.totalActiveParticipants || allData.length}</p>
                        <p>Peserta terdaftar</p>
                    </div>
                </div>
                <div class="premium-summary-card">
                    <div class="premium-summary-icon" style="color: var(--wit-pink);"><i class="fas fa-chart-line"></i></div>
                    <div class="premium-summary-content">
                        <h4>Rata-rata Progress</h4>
                        <p class="main-val pink-text">${data.averageOverallProgress}%</p>
                        <p>Keseluruhan progress</p>
                    </div>
                </div>
                <div class="premium-summary-card">
                    <div class="premium-summary-icon"><i class="fas fa-award"></i></div>
                    <div class="premium-summary-content">
                        <h4>Peserta Aktif</h4>
                        <p class="main-val" style="display:flex; align-items:center;">
                            ${active7d}
                            <span class="premium-summary-badge">${activePercent}%</span>
                        </p>
                        <p>Aktif dalam 7 hari terakhir</p>
                    </div>
                </div>
            `;
        }

        window.globalParticipantMap = {};
        let currentPage = 1;
        const itemsPerPage = 20;
        let currentFilteredData = [];

        function renderPagination() {
            const paginationContainer = document.getElementById('progress-pagination');
            const pageInfo = document.getElementById('page-info');
            if (!paginationContainer || !pageInfo) return;

            const totalPages = Math.ceil(currentFilteredData.length / itemsPerPage) || 1;
            
            const startIdx = (currentPage - 1) * itemsPerPage + 1;
            const endIdx = Math.min(currentPage * itemsPerPage, currentFilteredData.length);
            pageInfo.innerHTML = `Menampilkan ${currentFilteredData.length > 0 ? startIdx : 0} - ${endIdx} dari ${currentFilteredData.length} peserta`;

            let html = '';
            
            // Prev button
            html += `<button class="page-btn" onclick="window.changeProgressPage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}><i class="fas fa-chevron-left"></i></button>`;
            
            // Page numbers logic (max 5 buttons)
            let startPage = Math.max(1, currentPage - 2);
            let endPage = Math.min(totalPages, startPage + 4);
            if (endPage - startPage < 4) {
                startPage = Math.max(1, endPage - 4);
            }

            if (startPage > 1) {
                html += `<button class="page-btn" onclick="window.changeProgressPage(1)">1</button>`;
                if (startPage > 2) html += `<span style="color:var(--wit-slate); padding: 0 4px;">...</span>`;
            }

            for (let i = startPage; i <= endPage; i++) {
                html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="window.changeProgressPage(${i})">${i}</button>`;
            }

            if (endPage < totalPages) {
                if (endPage < totalPages - 1) html += `<span style="color:var(--wit-slate); padding: 0 4px;">...</span>`;
                html += `<button class="page-btn" onclick="window.changeProgressPage(${totalPages})">${totalPages}</button>`;
            }

            // Next button
            html += `<button class="page-btn" onclick="window.changeProgressPage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}><i class="fas fa-chevron-right"></i></button>`;

            paginationContainer.innerHTML = html;
        }

        window.changeProgressPage = function(page) {
            const totalPages = Math.ceil(currentFilteredData.length / itemsPerPage);
            if (page < 1 || page > totalPages) return;
            currentPage = page;
            renderTablePage();
        };

        function renderTable(dataArray) {
            currentFilteredData = dataArray;
            currentPage = 1;
            renderTablePage();
        }

        function renderTablePage() {
            if (!tbody) return;
            if (currentFilteredData.length === 0) {
                tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:20px; color:var(--wit-slate);">Tidak ada data ditemukan.</td></tr>';
                renderPagination();
                return;
            }
            
            const startIdx = (currentPage - 1) * itemsPerPage;
            const pageData = currentFilteredData.slice(startIdx, startIdx + itemsPerPage);

            let html = '';
            pageData.forEach(p => {
                const tempId = 'id_' + Math.random().toString(36).substr(2, 9);
                window.globalParticipantMap[tempId] = p;
                
                // Get most engaged course based on highest progress
                let mainCourse = "Kelas AI Mastery"; // Default fallback
                if (p.courses && Object.keys(p.courses).length > 0) {
                    const sortedCourses = Object.entries(p.courses).sort((a,b) => b[1] - a[1]);
                    if (sortedCourses[0][0] === 'ai-fundamentals' || sortedCourses[0][0] === 'math-for-ai') {
                         mainCourse = "HerAI Labs";
                    }
                }
                if (p.overallProgress === 0) mainCourse = "-";

                // Generate random colors for avatar for variety if we don't have images
                const colors = ['#FF2F8A', '#B79CFF', '#ff5e8e', '#8F9CFF', '#FF8FC4'];
                const avatarColor = colors[p.name.length % colors.length];

                html += `
                <tr>
                    <td>
                        <div class="participant-identity">
                            <div class="participant-avatar" style="color: ${avatarColor}; background: ${avatarColor}15;">${getInitials(p.name)}</div>
                            <span class="participant-name">${escapeHtml(p.name)}</span>
                        </div>
                    </td>
                    <td class="class-name">${mainCourse}</td>
                    <td>
                        <div class="progress-track">
                            <div class="progress-fill" style="width: ${p.overallProgress}%;"></div>
                        </div>
                    </td>
                    <td class="progress-percentage">${p.overallProgress}%</td>
                    <td class="last-active">${timeSince(p.lastActiveAt)}</td>
                    <td>
                        <button class="btn-detail" onclick="window.showAdminParticipantDetail('${tempId}')">Detail</button>
                        <button class="btn-more"><i class="fas fa-ellipsis-v"></i></button>
                    </td>
                </tr>
                `;
            });
            tbody.innerHTML = html;
            renderPagination();
        }

        window.showAdminParticipantDetail = function(tempId) {
            console.log('Detail diklik:', tempId);
            const detail = window.globalParticipantMap[tempId];
            if (detail) {
                showModal(detail);
            } else {
                alert('Gagal membuka detail. Data tidak ditemukan.');
            }
        };

        function showModal(detail) {
            try {
                document.querySelectorAll('.dynamic-progress-modal-overlay').forEach(el => el.remove());
                
                // Kalkulasi AI Fundamentals
                let aiSubmodules = [
                    { id: 'ai-fundamentals', title: 'Pengantar AI' },
                    { id: 'python-untuk-ai', title: 'Python untuk AI' },
                    { id: 'konsep-ai-modern', title: 'Konsep AI Modern' },
                    { id: 'reasoning', title: 'Reasoning AI' },
                    { id: 'evaluation', title: 'Evaluation AI' },
                    { id: 'evolution', title: 'Evolution of AI' }
                ];
                let aiTotalProg = 0;
                let aiTuntas = 0;
                let aiProses = 0;
                let aiBelum = 0;
                
                let aiListHtml = '';
                
                if (detail.courses) {
                    aiSubmodules.forEach(sub => {
                        const prog = detail.courses[sub.id] || 0;
                        aiTotalProg += prog;
                        if (prog === 100) aiTuntas++;
                        else if (prog > 0) aiProses++;
                        else aiBelum++;
                        
                        const stats = detail.courseDetails && detail.courseDetails[sub.id] ? detail.courseDetails[sub.id] : { completed: 0, total: 0 };
                        const subStatsText = stats.total > 0 ? `<span style="font-size:0.75rem; color: #888; margin-right: 8px;">${stats.completed}/${stats.total}</span>` : '';
                        
                        aiListHtml += `
                        <div style="display:flex; justify-content:space-between; align-items:center; padding: 6px 0;">
                            <span style="font-size: 0.9rem; color: #444;"><i class="fas fa-level-up-alt fa-rotate-90" style="margin-right: 8px; color: #FF2F8A; opacity: 0.7;"></i>${sub.title}</span>
                            <div style="display:flex; align-items:center; width: 140px;">
                                ${subStatsText}
                                <div style="background:rgba(255,47,138,0.1); flex-grow: 1; height:6px; border-radius:3px; overflow:hidden;">
                                    <div style="background: #FF2F8A; height:100%; width:${prog}%; border-radius: 3px;"></div>
                                </div>
                                <span style="font-size:0.8rem; color:#111; font-weight:800; min-width: 35px; text-align: right;">${prog}%</span>
                            </div>
                        </div>`;
                    });
                }
                const aiGroupProg = detail.courses ? Math.round(aiTotalProg / aiSubmodules.length) : 0;
                
                // Kalkulasi Math for AI
                const mathProg = detail.courses && detail.courses['math-for-ai'] ? detail.courses['math-for-ai'] : 0;
                const mathStats = detail.courseDetails && detail.courseDetails['math-for-ai'] ? detail.courseDetails['math-for-ai'] : { completed: 0, total: 89 };
                const mathCompleted = mathStats.completed;
                const mathTotal = mathStats.total > 0 ? mathStats.total : 89;
                
                let mathListHtml = '';
                let mathSubmodulesCount = 0;
                let mathTopicsCount = 0;
                const mathTitles = {
                    'Submodule 01': 'Kenapa AI Butuh Matematika?',
                    'Submodule 02': 'Linear Algebra',
                    'Submodule 03': 'Statistics for AI',
                    'Submodule 04': 'Probability',
                    'Submodule 05': 'Calculus',
                    'Submodule 06': 'Optimization',
                    'Submodule 07': 'Integrated Case Study'
                };
                if (detail.mathSubmodules) {
                    mathSubmodulesCount = Object.keys(detail.mathSubmodules).length || 7;
                    for (const [subId, subData] of Object.entries(detail.mathSubmodules)) {
                        const subProg = typeof subData === 'object' ? subData.percentage : subData;
                        mathTopicsCount += (typeof subData === 'object' && subData.total) ? subData.total : 0;
                        const subStatsText = typeof subData === 'object' ? `<span style="font-size:0.75rem; color: #888; margin-right: 8px;">${subData.completed}/${subData.total}</span>` : '';
                        const displayTitle = mathTitles[subId] || subId;
                        
                        mathListHtml += `
                        <div style="display:flex; justify-content:space-between; align-items:center; padding: 6px 0;">
                            <span style="font-size: 0.9rem; color: #444;"><i class="fas fa-level-up-alt fa-rotate-90" style="margin-right: 8px; color: #FF2F8A; opacity: 0.7;"></i>${displayTitle}</span>
                            <div style="display:flex; align-items:center; width: 140px;">
                                ${subStatsText}
                                <div style="background:rgba(255,47,138,0.1); flex-grow: 1; height:6px; border-radius:3px; overflow:hidden;">
                                    <div style="background: #FF2F8A; height:100%; width:${subProg}%; border-radius: 3px;"></div>
                                </div>
                                <span style="font-size:0.8rem; color:#111; font-weight:800; min-width: 35px; text-align: right;">${subProg}%</span>
                            </div>
                        </div>`;
                    }
                } else {
                    mathSubmodulesCount = 7;
                    mathTopicsCount = 54;
                    mathListHtml = '<p style="font-size:0.9rem; color:#888; margin:0;">Belum ada detail submodul.</p>';
                }
                
                // Helper untuk diagram SVG bercahaya
                const getSvgDonut = (prog, type) => {
                    const radius = 55;
                    const circum = 2 * Math.PI * radius;
                    const offset = circum - (prog / 100) * circum;
                    const gradId = type === 'math' ? 'grad-green' : 'grad-pink';
                    
                    return `
                    <svg width="150" height="150" viewBox="0 0 150 150" style="filter: drop-shadow(0 10px 15px ${type === 'math' ? 'rgba(0,230,118,0.3)' : 'rgba(255,47,138,0.3)'});">
                        <defs>
                            <linearGradient id="grad-pink" x1="0%" y1="100%" x2="100%" y2="0%">
                                <stop offset="0%" stop-color="#E23183" />
                                <stop offset="100%" stop-color="#FF2F8A" />
                            </linearGradient>
                            <linearGradient id="grad-green" x1="0%" y1="100%" x2="100%" y2="0%">
                                <stop offset="0%" stop-color="#00E676" />
                                <stop offset="100%" stop-color="#43B581" />
                            </linearGradient>
                        </defs>
                        <circle cx="75" cy="75" r="${radius}" fill="none" stroke="#EFE9EF" stroke-width="14" />
                        <circle cx="75" cy="75" r="${radius}" fill="none" stroke="url(#${gradId})" stroke-width="14" 
                                stroke-dasharray="${circum}" stroke-dashoffset="${offset}" 
                                stroke-linecap="round" transform="rotate(-90 75 75)" 
                                style="transition: stroke-dashoffset 1s ease-out;" />
                    </svg>`;
                };
                
                const modalHtml = `
<style>
.pr-modal-bg {
    position:fixed; top:0; left:0; width:100%; height:100%; 
    background:rgba(17, 25, 79, 0.5); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
    z-index:999999; display:flex; justify-content:center; align-items:center; padding: 20px;
}
.pr-modal {
    background: linear-gradient(135deg, #F8F5F8 0%, #F0EAF0 100%);
    width: 100%; max-width: 850px;
    border-radius: 30px;
    max-height: 90vh; overflow-y: auto;
    position: relative;
    font-family: 'Plus Jakarta Sans', sans-serif;
    box-shadow: 0 30px 60px rgba(0,0,0,0.2), inset 0 2px 5px rgba(255,255,255,0.8);
}
.pr-close {
    position:absolute; top:25px; right:25px; width:40px; height:40px; border-radius:50%; 
    background: white; color:#FF2F8A; border:none; font-size:1.2rem; cursor:pointer; 
    box-shadow: 0 4px 15px rgba(0,0,0,0.08); transition: 0.2s; z-index: 10;
}
.pr-close:hover { background: #FF2F8A; color: white; transform: scale(1.1); }
.pr-header {
    background: rgba(255,255,255,0.4); padding: 30px 40px; border-radius: 30px 30px 0 0;
    display: flex; gap: 24px; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.8);
    backdrop-filter: blur(10px);
}
.pr-avatar {
    width: 70px; height: 70px; border-radius: 22px; background: linear-gradient(135deg, #FF2F8A, #ff5e8e); 
    color: white; display: flex; align-items: center; justify-content: center; font-size: 28px; font-weight: bold;
    box-shadow: 0 10px 20px rgba(255,47,138,0.3);
}
.pr-name { font-size: 24px; font-weight: 800; color: #11194F; margin: 0 0 6px 0; letter-spacing: -0.5px;}
.pr-nik { font-family: monospace; font-size: 15px; background: white; color: #FF2F8A; padding: 6px 14px; border-radius: 10px; font-weight: 700; box-shadow: 0 4px 10px rgba(0,0,0,0.03); border: 1px solid rgba(255,47,138,0.1); }
.pr-body { padding: 30px; display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.pr-body-bottom { grid-column: 1 / -1; }

/* Card Styles */
.pr-card {
    background: rgba(255,255,255,0.85);
    border-radius: 24px;
    padding: 28px;
    box-shadow: 0 15px 35px rgba(0,0,0,0.04), inset 0 2px 0 rgba(255,255,255,1);
    border: 1px solid rgba(255,255,255,1);
    backdrop-filter: blur(20px);
}
.pr-card-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.pr-card-title { font-size: 20px; font-weight: 800; color: #11194F; margin: 0; letter-spacing: -0.5px; }
.pr-badge { background: rgba(255,47,138,0.08); color: #FF2F8A; padding: 6px 14px; border-radius: 999px; font-size: 13px; font-weight: 700; border: 1px solid rgba(255,47,138,0.15); }
.pr-badge.green { background: #E8F5E9; color: #2E7D32; border-color: #C8E6C9;}

.pr-grid { display: flex; gap: 24px; align-items: center; }

/* Donut Chart SVG Container */
.pr-donut {
    width: 150px; height: 150px;
    position: relative; display: flex; justify-content: center; align-items: center;
    flex-shrink: 0;
}
.pr-donut-content { position: absolute; z-index: 2; text-align: center; }
.pr-donut-val { font-size: 34px; font-weight: 800; color: #11194F; line-height: 1; letter-spacing: -1px; }
.pr-donut-lbl { font-size: 11px; color: #666; font-weight: 600; margin-top: 6px; }

/* Stats List */
.pr-stats { display: flex; flex-direction: column; gap: 12px; flex-grow: 1; }
.pr-stat-box { 
    background: linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(248,245,248,1) 100%); 
    padding: 14px 18px; border-radius: 16px;
    display: flex; align-items: center; gap: 12px; position: relative;
    border: 1px solid rgba(255,255,255,1);
    box-shadow: 0 4px 15px rgba(0,0,0,0.03);
}
.pr-stat-icon {
    width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; color: white;
}
.dot-green .pr-stat-icon { background: linear-gradient(135deg, #00E676, #43B581); box-shadow: 0 4px 10px rgba(0,230,118,0.3); }
.dot-pink .pr-stat-icon { background: linear-gradient(135deg, #FF2F8A, #ff5e8e); box-shadow: 0 4px 10px rgba(255,47,138,0.3); }
.dot-gray .pr-stat-icon { background: linear-gradient(135deg, #B39DDB, #D1C4E9); box-shadow: 0 4px 10px rgba(179,157,219,0.3); }

.pr-stat-text { display: flex; flex-direction: column; }
.pr-stat-title { font-size: 14px; font-weight: 800; color: #11194F; }
.pr-stat-sub { font-size: 12px; color: #61698F; font-weight: 500; margin-top:2px; }
.pr-stat-val-right { position: absolute; right: 18px; top: 50%; transform: translateY(-50%); font-size: 18px; font-weight: 800; color: #111; }


.pr-info-pill {
    background: rgba(255,47,138,0.03); border: 1px solid rgba(255,47,138,0.1); padding: 16px 20px; border-radius: 16px;
    font-size: 13px; color: #61698F; display: flex; gap: 12px; align-items: center; line-height: 1.5; margin-top: 24px;
}
.pr-info-pill-icon {
    width: 32px; height: 32px; border-radius: 10px; background: white; color: #FF2F8A; 
    display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(255,47,138,0.1); flex-shrink: 0;
}
.pr-info-pill.green { background: rgba(0,230,118,0.05); color: #2E7D32; border-color: rgba(0,230,118,0.2); }
.pr-info-pill.green .pr-info-pill-icon { color: #00E676; box-shadow: 0 4px 10px rgba(0,230,118,0.1); }

.pr-list-wrap {
    margin-top: 24px; padding-top: 24px; border-top: 1px solid rgba(0,0,0,0.05);
}
.pr-list-wrap > div {
    background: white; padding: 12px 16px; border-radius: 12px; margin-bottom: 8px; border: 1px solid rgba(0,0,0,0.03);
    box-shadow: 0 2px 5px rgba(0,0,0,0.02);
}

</style>
<div class="pr-modal-bg dynamic-progress-modal-overlay">
    <div class="pr-modal">
        <button class="pr-close" onclick="this.closest('.dynamic-progress-modal-overlay').remove()"><i class="fas fa-times"></i></button>
        
        <div class="pr-header">
            <div class="pr-avatar"><i class="fas fa-user"></i></div>
            <div>
                <h2 class="pr-name">${escapeHtml(detail.name || 'Peserta')}</h2>
                <span class="pr-nik">${escapeHtml(detail.nik || '-')}</span>
            </div>
        </div>
        
        <div class="pr-body">
            
            <!-- SECTION 1: OVERALL -->
            <div class="pr-card">
                <div class="pr-card-head">
                    <h3 class="pr-card-title">Progres Keseluruhan</h3>
                    <span class="pr-badge green"><i class="fas fa-circle" style="font-size:8px; vertical-align:middle; margin-right:4px;"></i> Live</span>
                </div>
                <div class="pr-grid">
                    <div class="pr-donut">
                        ${getSvgDonut(overallProg, 'pink')}
                        <div class="pr-donut-content">
                            <div class="pr-donut-val">${overallProg}%</div>
                            <div class="pr-donut-lbl">2 course aktif</div>
                        </div>
                    </div>
                    <div class="pr-stats">
                        <div class="pr-stat-box dot-pink">
                            <div class="pr-stat-icon"><i class="fas fa-layer-group"></i></div>
                            <div class="pr-stat-text">
                                <span class="pr-stat-title">AI Fundamentals</span>
                                <span class="pr-stat-sub">6 modul</span>
                            </div>
                            <span class="pr-stat-val-right" style="color: #FF2F8A;">${aiGroupProg}%</span>
                        </div>
                        <div class="pr-stat-box dot-green">
                            <div class="pr-stat-icon"><i class="fas fa-square-root-variable"></i></div>
                            <div class="pr-stat-text">
                                <span class="pr-stat-title">Math for AI</span>
                                <span class="pr-stat-sub">${mathTotal} aktivitas</span>
                            </div>
                            <span class="pr-stat-val-right" style="color: #00E676;">${mathProg}%</span>
                        </div>
                    </div>
                </div>
                <div class="pr-info-pill">
                    <div class="pr-info-pill-icon"><i class="fas fa-calculator"></i></div>
                    <div><strong>Rumus:</strong> (${aiGroupProg}% AI Fundamentals + ${mathProg}% Math for AI) &divide; 2 = ${overallProg}%.<br><span style="color:#888; font-size:11px;">Sinkron dengan progres server.</span></div>
                </div>
            </div>

            <!-- SECTION 2: AI FUNDAMENTALS -->
            <div class="pr-card">
                <div class="pr-card-head">
                    <h3 class="pr-card-title">Progres AI Fundamentals</h3>
                    <span class="pr-badge">6 modul</span>
                </div>
                <div class="pr-grid">
                    <div class="pr-donut">
                        ${getSvgDonut(aiGroupProg, 'pink')}
                        <div class="pr-donut-content">
                            <div class="pr-donut-val">${aiGroupProg}%</div>
                            <div class="pr-donut-lbl">Rata-rata</div>
                        </div>
                    </div>
                    <div class="pr-stats">
                        <div class="pr-stat-box dot-green">
                            <div class="pr-stat-icon"><i class="fas fa-check"></i></div>
                            <div class="pr-stat-text">
                                <span class="pr-stat-title">Tuntas</span>
                                <span class="pr-stat-sub">${aiTuntas} Modul</span>
                            </div>
                            <span class="pr-stat-val-right" style="color:#00E676;">${aiTuntas}</span>
                        </div>
                        <div class="pr-stat-box dot-pink">
                            <div class="pr-stat-icon"><i class="fas fa-spinner"></i></div>
                            <div class="pr-stat-text">
                                <span class="pr-stat-title">Dalam Proses</span>
                                <span class="pr-stat-sub">${aiProses} Modul</span>
                            </div>
                            <span class="pr-stat-val-right" style="color:#FF2F8A;">${aiProses}</span>
                        </div>
                        <div class="pr-stat-box dot-gray">
                            <div class="pr-stat-icon"><i class="fas fa-circle-pause"></i></div>
                            <div class="pr-stat-text">
                                <span class="pr-stat-title">Belum Dimulai</span>
                                <span class="pr-stat-sub">${aiBelum} Modul</span>
                            </div>
                            <span class="pr-stat-val-right" style="color:#888;">${aiBelum}</span>
                        </div>
                    </div>
                </div>
                <div class="pr-info-pill">
                    <div class="pr-info-pill-icon"><i class="fas fa-sparkles"></i></div>
                    <div><strong>Cakupan:</strong> Pengantar AI hingga Evolution of AI.</div>
                </div>
                <div class="pr-list-wrap">
                    ${aiListHtml}
                </div>
            </div>

            <!-- SECTION 3: MATH FOR AI -->
            <div class="pr-card pr-body-bottom">
                <div class="pr-card-head">
                    <h3 class="pr-card-title">Progres Belajar</h3>
                    <span class="pr-badge" style="background: transparent; border: none;"></span>
                </div>
                <div class="pr-grid" style="grid-template-columns: 200px 1fr; gap: 40px;">
                    <div class="pr-donut" style="width:180px; height:180px;">
                        ${getSvgDonut(mathProg, 'math').replace(/150/g, '180').replace(/75/g, '90').replace(/55/g, '75')}
                        <div class="pr-donut-content">
                            <div class="pr-donut-val" style="font-size:42px;">${mathProg}%</div>
                            <div class="pr-donut-lbl" style="font-size:14px;">Selesai</div>
                        </div>
                    </div>
                    <div class="pr-stats">
                        <div class="pr-stat-box dot-green">
                            <div class="pr-stat-icon"><i class="fas fa-badge-check"></i></div>
                            <div class="pr-stat-text">
                                <span class="pr-stat-title">Selesai</span>
                                <span class="pr-stat-sub">${mathCompleted} dari ${mathTotal} bagian</span>
                            </div>
                            <span class="pr-stat-val-right" style="color:#00E676;">${mathProg === 100 ? '100%' : mathCompleted}</span>
                        </div>
                        <div class="pr-stat-box dot-pink">
                            <div class="pr-stat-icon"><i class="fas fa-layer-group"></i></div>
                            <div class="pr-stat-text">
                                <span class="pr-stat-title">Submodul</span>
                                <span class="pr-stat-sub">${mathSubmodulesCount} total</span>
                            </div>
                            <span class="pr-stat-val-right" style="color:#FF2F8A;">${mathSubmodulesCount}</span>
                        </div>
                        <div class="pr-stat-box dot-gray">
                            <div class="pr-stat-icon"><i class="fas fa-book-open"></i></div>
                            <div class="pr-stat-text">
                                <span class="pr-stat-title">Topik materi</span>
                                <span class="pr-stat-sub">${mathTopicsCount || 54} topik</span>
                            </div>
                            <span class="pr-stat-val-right" style="color:#888;">${mathTopicsCount || 54}</span>
                        </div>
                    </div>
                </div>
                <div class="pr-info-pill green">
                    <div class="pr-info-pill-icon"><i class="fas fa-check-circle"></i></div>
                    <div>Progres terbaru sudah tersinkron dengan akun peserta.</div>
                </div>
                <div class="pr-list-wrap" style="display:grid; grid-template-columns: 1fr 1fr; gap:16px;">
                    ${mathListHtml}
                </div>
            </div>

        </div>
    </div>
</div>`;
                
                const modalWrapper = document.createElement('div');
                modalWrapper.innerHTML = modalHtml.trim();
                document.body.appendChild(modalWrapper.firstChild);
            } catch (err) {
                alert('CRITICAL ERROR saat merender modal: ' + err.message);
                console.error('Modal error:', err);
            }
        }

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const q = e.target.value.toLowerCase();
                const filtered = allData.filter(d => 
                    d.name.toLowerCase().includes(q) || d.nik.toLowerCase().includes(q)
                );
                renderTable(filtered);
            });
        }

        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => loadData(true));
        }
        
        if (document.getElementById('close-modal-btn')) {
            document.getElementById('close-modal-btn').addEventListener('click', () => {
                document.getElementById('progress-detail-modal').style.display = 'none';
            });
        }

        loadData();
    };

})();
