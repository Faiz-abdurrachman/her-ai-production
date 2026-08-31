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
    // PROGRESS PESERTA — authoritative server snapshot
    // ==========================================
    window.initProgressPeserta = async function() {
        if (!window.checkAdminAccess || !window.checkAdminAccess()) return;

        if (typeof window.__cleanupProgressPeserta === 'function') {
            window.__cleanupProgressPeserta();
        }

        await window.loadSidebar();
        window.updateAdminProfile();

        const container = document.getElementById('progress-overview-container');
        const tbody = document.getElementById('progress-table-body');
        const refreshBtn = document.getElementById('refresh-progress-btn');
        const searchInput = document.getElementById('progress-search-input');
        const paginationContainer = document.getElementById('progress-pagination');
        const pageInfo = document.getElementById('page-info');
        const snapshotStatus = document.getElementById('progress-snapshot-status');
        const errorBox = document.getElementById('progress-error');
        const apiUrl = '/__gas';
        const itemsPerPage = 20;
        const foundationSubmoduleDefinitions = [
            { id: 'ai-fundamentals', title: 'Pengantar AI' },
            { id: 'python-untuk-ai', title: 'Python untuk AI' },
            { id: 'reasoning', title: 'Reasoning AI' },
            { id: 'konsep-ai-modern', title: 'Konsep AI Modern' },
            { id: 'evaluation', title: 'Evaluation AI' },
            { id: 'evolution', title: 'Evolution of AI' }
        ];
        const mathSubmoduleDefinitions = [
            { id: '01', title: 'Kenapa AI Butuh Matematika' },
            { id: '02', title: 'Aljabar Linear' },
            { id: '03', title: 'Statistika untuk AI' },
            { id: '04', title: 'Probabilitas' },
            { id: '05', title: 'Kalkulus' },
            { id: '06', title: 'Optimisasi' },
            { id: '07', title: 'Studi Kasus Terintegrasi' }
        ];

        let allData = [];
        let currentFilteredData = [];
        let currentPage = 1;
        let participantMap = {};
        let activeModal = null;
        let modalReturnFocus = null;
        let previousBodyOverflow = '';

        const clampPercent = function(value) {
            const number = Number(value);
            return Number.isFinite(number) ? Math.max(0, Math.min(100, number)) : 0;
        };

        const formatPercent = function(value) {
            const number = clampPercent(value);
            return Number.isInteger(number) ? String(number) : number.toFixed(1);
        };

        const getInitials = function(name) {
            const parts = String(name || '').trim().split(/\s+/).filter(Boolean);
            if (!parts.length) return '??';
            if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
            return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
        };

        const formatTimestamp = function(value) {
            if (!value) return 'Belum ada aktivitas belajar';
            const date = new Date(value);
            if (Number.isNaN(date.getTime())) return 'Waktu tidak tersedia';
            return new Intl.DateTimeFormat('id-ID', {
                dateStyle: 'medium',
                timeStyle: 'short'
            }).format(date);
        };

        const relativeTime = function(value) {
            if (!value) return 'Belum pernah belajar';
            const date = new Date(value);
            if (Number.isNaN(date.getTime())) return 'Waktu tidak tersedia';
            const deltaSeconds = Math.round((date.getTime() - Date.now()) / 1000);
            const units = [
                ['year', 31536000],
                ['month', 2592000],
                ['day', 86400],
                ['hour', 3600],
                ['minute', 60]
            ];
            const formatter = new Intl.RelativeTimeFormat('id-ID', { numeric: 'auto' });
            for (const unit of units) {
                if (Math.abs(deltaSeconds) >= unit[1]) {
                    return formatter.format(Math.round(deltaSeconds / unit[1]), unit[0]);
                }
            }
            return 'baru saja';
        };

        const showError = function(message) {
            if (!errorBox) return;
            errorBox.textContent = String(message || 'Data progress tidak dapat dimuat.');
            errorBox.style.display = 'block';
        };

        const clearError = function() {
            if (!errorBox) return;
            errorBox.textContent = '';
            errorBox.style.display = 'none';
        };

        const orderSubmoduleRows = function(rows, definitions, idKey) {
            const sourceRows = Array.isArray(rows) ? rows : [];
            const rowsById = {};
            sourceRows.forEach(function(row) {
                const id = String(row && row[idKey] || '');
                if (id && !rowsById[id]) rowsById[id] = row;
            });
            const knownIds = definitions.map(function(definition) { return definition.id; });
            const orderedRows = definitions.filter(function(definition) {
                return Boolean(rowsById[definition.id]);
            }).map(function(definition) {
                return Object.assign({}, rowsById[definition.id], {
                    submoduleId: definition.id,
                    title: definition.title
                });
            });
            sourceRows.forEach(function(row) {
                const id = String(row && row[idKey] || '');
                if (id && knownIds.indexOf(id) < 0) {
                    orderedRows.push(Object.assign({}, row, { submoduleId: id }));
                }
            });
            return orderedRows;
        };

        const buildLearningHierarchy = function(participant) {
            const source = participant || {};
            const ai = source.aiFundamentals || {};
            const math = source.mathForAi || {};
            const aiRows = orderSubmoduleRows(ai.modules, foundationSubmoduleDefinitions, 'moduleId');
            const mathSourceRows = Object.keys(math.submodules || {}).map(function(id) {
                return Object.assign({}, math.submodules[id] || {}, { submoduleId: id });
            });
            const mathRows = orderSubmoduleRows(mathSourceRows, mathSubmoduleDefinitions, 'submoduleId');
            return {
                modules: [
                    {
                        moduleId: 'ai-fundamentals-advanced',
                        title: 'AI Fundamentals',
                        progress: ai.progress,
                        completed: Number(ai.completedModules || 0),
                        total: Number(ai.moduleTotal || aiRows.length),
                        itemLabel: 'submodul',
                        submodules: aiRows
                    },
                    {
                        moduleId: 'math-for-ai',
                        title: 'Math for AI',
                        progress: math.progress,
                        completed: Number(math.completedActivities || 0),
                        total: Number(math.totalActivities || 0),
                        itemLabel: 'aktivitas',
                        topicTotal: Number(math.topicTotal || 0),
                        submoduleTotal: mathSubmoduleDefinitions.length,
                        submodules: mathRows
                    }
                ]
            };
        };

        const moduleCell = function(moduleSummary, label) {
            const safeModule = moduleSummary || {};
            const progress = clampPercent(safeModule.progress);
            const completed = Number(safeModule.completed || 0);
            const total = Number(safeModule.total || 0);
            return [
                '<td class="course-progress-cell">',
                    '<div class="course-progress-row">',
                        '<div class="progress-track" role="progressbar" aria-label="', escapeAttr(label), '" aria-valuemin="0" aria-valuemax="100" aria-valuenow="', progress, '">',
                            '<div class="progress-fill" style="width:', progress, '%"></div>',
                        '</div>',
                        '<span class="progress-percentage">', formatPercent(progress), '%</span>',
                    '</div>',
                    '<span class="course-progress-meta">', completed, ' / ', total, ' ', escapeHtml(safeModule.itemLabel || 'item'), '</span>',
                '</td>'
            ].join('');
        };

        const renderOverview = function(overview) {
            if (!container) return;
            const data = overview || {};
            const total = Number(data.totalParticipants || 0);
            const average = formatPercent(data.averageOverallProgress);
            const active = Number(data.activeLearners7d || 0);
            const activePercent = formatPercent(data.activePercent);
            container.innerHTML = [
                '<div class="premium-summary-card">',
                    '<div class="premium-summary-icon"><i class="fas fa-users" aria-hidden="true"></i></div>',
                    '<div class="premium-summary-content"><h4>Total Peserta</h4>',
                    '<p class="main-val">', total, '</p><p>Peserta aktif dalam cohort resmi</p></div>',
                '</div>',
                '<div class="premium-summary-card">',
                    '<div class="premium-summary-icon"><i class="fas fa-chart-line" aria-hidden="true"></i></div>',
                    '<div class="premium-summary-content"><h4>Rata-rata Progress</h4>',
                    '<p class="main-val pink-text">', average, '%</p><p>Rata-rata dari 2 modul aktif</p></div>',
                '</div>',
                '<div class="premium-summary-card">',
                    '<div class="premium-summary-icon"><i class="fas fa-bolt" aria-hidden="true"></i></div>',
                    '<div class="premium-summary-content"><h4>Peserta Aktif Belajar</h4>',
                    '<p class="main-val" style="display:flex;align-items:center">', active,
                    ' <span class="premium-summary-badge">', activePercent, '%</span></p>',
                    '<p>Memiliki aktivitas belajar dalam 7 hari</p></div>',
                '</div>'
            ].join('');
        };

        const renderPagination = function() {
            if (!paginationContainer || !pageInfo) return;
            const totalPages = Math.max(1, Math.ceil(currentFilteredData.length / itemsPerPage));
            currentPage = Math.min(currentPage, totalPages);
            const startIndex = currentFilteredData.length ? (currentPage - 1) * itemsPerPage + 1 : 0;
            const endIndex = Math.min(currentPage * itemsPerPage, currentFilteredData.length);
            pageInfo.textContent = 'Menampilkan ' + startIndex + '–' + endIndex + ' dari ' + currentFilteredData.length + ' peserta';

            const controls = [];
            controls.push('<button class="page-btn" type="button" data-page="' + (currentPage - 1) + '" aria-label="Halaman sebelumnya" ' + (currentPage === 1 ? 'disabled' : '') + '><i class="fas fa-chevron-left" aria-hidden="true"></i></button>');
            let startPage = Math.max(1, currentPage - 2);
            let endPage = Math.min(totalPages, startPage + 4);
            startPage = Math.max(1, endPage - 4);
            for (let page = startPage; page <= endPage; page++) {
                controls.push('<button class="page-btn ' + (page === currentPage ? 'active' : '') + '" type="button" data-page="' + page + '" aria-label="Halaman ' + page + '" ' + (page === currentPage ? 'aria-current="page"' : '') + '>' + page + '</button>');
            }
            controls.push('<button class="page-btn" type="button" data-page="' + (currentPage + 1) + '" aria-label="Halaman berikutnya" ' + (currentPage === totalPages ? 'disabled' : '') + '><i class="fas fa-chevron-right" aria-hidden="true"></i></button>');
            paginationContainer.innerHTML = controls.join('');
        };

        const renderTablePage = function() {
            if (!tbody) return;
            participantMap = {};
            if (!currentFilteredData.length) {
                tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:28px;color:var(--wit-slate)">Tidak ada peserta yang cocok.</td></tr>';
                renderPagination();
                return;
            }

            const startIndex = (currentPage - 1) * itemsPerPage;
            const pageData = currentFilteredData.slice(startIndex, startIndex + itemsPerPage);
            tbody.innerHTML = pageData.map(function(participant, index) {
                const key = 'participant-' + startIndex + '-' + index;
                const name = String(participant.name || 'Peserta');
                const overall = clampPercent(participant.overallProgress);
                const hierarchy = buildLearningHierarchy(participant);
                participantMap[key] = participant;
                return [
                    '<tr>',
                        '<td><div class="participant-identity">',
                            '<div class="participant-avatar" aria-hidden="true">', escapeHtml(getInitials(name)), '</div>',
                            '<div><span class="participant-name">', escapeHtml(name), '</span>',
                            '<span class="course-progress-meta">NIK ', escapeHtml(participant.maskedNik || participant.nik || '****'), '</span></div>',
                        '</div></td>',
                        moduleCell(hierarchy.modules[0], 'Progress AI Fundamentals ' + name),
                        moduleCell(hierarchy.modules[1], 'Progress Math for AI ' + name),
                        '<td class="course-progress-cell"><div class="course-progress-row">',
                            '<div class="progress-track" role="progressbar" aria-label="Progress keseluruhan ', escapeAttr(name), '" aria-valuemin="0" aria-valuemax="100" aria-valuenow="', overall, '">',
                                '<div class="progress-fill" style="width:', overall, '%"></div>',
                            '</div><span class="progress-percentage">', formatPercent(overall), '%</span>',
                        '</div></td>',
                        '<td class="last-active"><span title="', escapeAttr(formatTimestamp(participant.lastLearningAt)), '">', escapeHtml(relativeTime(participant.lastLearningAt)), '</span></td>',
                        '<td><button class="btn-detail" type="button" data-participant-key="', key, '">Detail</button></td>',
                    '</tr>'
                ].join('');
            }).join('');
            renderPagination();
        };

        const renderTable = function(data) {
            currentFilteredData = Array.isArray(data) ? data : [];
            currentPage = 1;
            renderTablePage();
        };

        const ensureModalStyles = function() {
            if (document.getElementById('admin-progress-modal-styles')) return;
            const style = document.createElement('style');
            style.id = 'admin-progress-modal-styles';
            style.textContent = [
                '.pr-modal-overlay{position:fixed;inset:0;z-index:999999;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(17,25,79,.58);backdrop-filter:blur(10px)}',
                '.pr-modal-dialog{width:min(900px,100%);max-height:92vh;overflow:auto;border-radius:26px;background:#fffafd;box-shadow:0 30px 70px rgba(17,25,79,.28);color:#11194f;font-family:"Plus Jakarta Sans",sans-serif}',
                '.pr-modal-header{position:sticky;top:0;z-index:2;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:24px 28px;border-bottom:1px solid #f0dce7;background:rgba(255,250,253,.96);backdrop-filter:blur(12px)}',
                '.pr-modal-heading{display:flex;align-items:center;gap:14px}.pr-modal-avatar{width:52px;height:52px;display:grid;place-items:center;border-radius:16px;background:linear-gradient(135deg,#ff2f8a,#ff78ac);color:white;font-weight:800}',
                '.pr-modal-title{margin:0;font-size:22px}.pr-modal-subtitle{margin:4px 0 0;color:#61698f;font-size:13px}',
                '.pr-modal-close{min-width:44px;height:44px;border:1px solid #f2c8db;border-radius:50%;background:white;color:#d92372;cursor:pointer;font-size:18px}.pr-modal-close:hover{background:#fff0f7}',
                '.pr-modal-body{padding:26px;display:grid;gap:18px}.pr-overall-card,.pr-course-card{border:1px solid #f0dce7;border-radius:20px;background:white;padding:20px}',
                '.pr-overall-card{display:grid;grid-template-columns:150px 1fr;gap:22px;align-items:center;background:linear-gradient(135deg,#fff6fa,#faf7ff)}',
                '.pr-overall-value{font-size:42px;font-weight:800;color:#ff2f8a}.pr-overall-label{color:#61698f;font-size:13px}',
                '.pr-course-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}.pr-course-card h3{margin:2px 0 0;font-size:17px}.pr-course-head{display:flex;justify-content:space-between;gap:12px;align-items:center;margin-bottom:14px}.pr-level-label{display:block;color:#7a81a3;font-size:11px;font-weight:700;letter-spacing:.04em;text-transform:uppercase}',
                '.pr-pill{padding:6px 10px;border-radius:999px;background:#fff0f7;color:#d92372;font-size:12px;font-weight:700}.pr-modal-track{height:8px;overflow:hidden;border-radius:999px;background:#fceaf2}.pr-modal-fill{height:100%;border-radius:999px;background:linear-gradient(90deg,#ff2f8a,#ff78ac)}',
                '.pr-course-meta{display:flex;justify-content:space-between;gap:12px;margin-top:8px;color:#61698f;font-size:12px}.pr-detail-group{margin-top:14px;border-top:1px solid #f2e3eb;padding-top:12px}.pr-detail-group summary{min-height:44px;display:flex;align-items:center;cursor:pointer;font-weight:700;color:#2a3166}',
                '.pr-detail-row{display:grid;grid-template-columns:minmax(120px,1fr) 120px 48px;gap:12px;align-items:center;padding:10px 0;border-top:1px solid #f7edf2;font-size:12px}.pr-detail-name{font-weight:600}.pr-detail-count{color:#61698f}',
                '.pr-activity-note{padding:14px 16px;border-radius:14px;background:#f7f3ff;color:#4e5681;font-size:13px;line-height:1.5}',
                '.pr-modal-close:focus-visible,.pr-detail-group summary:focus-visible{outline:3px solid rgba(255,47,138,.28);outline-offset:2px}',
                '@media(max-width:700px){.pr-modal-overlay{padding:8px}.pr-modal-dialog{max-height:96vh;border-radius:20px}.pr-modal-header,.pr-modal-body{padding:18px}.pr-overall-card{grid-template-columns:1fr}.pr-course-grid{grid-template-columns:1fr}.pr-detail-row{grid-template-columns:1fr 80px 42px}}',
                '@media(prefers-reduced-motion:reduce){.pr-modal-overlay *{transition:none!important;animation:none!important}}'
            ].join('');
            document.head.appendChild(style);
        };

        const closeModal = function() {
            if (!activeModal) return;
            activeModal.remove();
            activeModal = null;
            document.body.style.overflow = previousBodyOverflow;
            if (modalReturnFocus && document.contains(modalReturnFocus)) modalReturnFocus.focus();
            modalReturnFocus = null;
        };

        const progressBarHtml = function(progress, label) {
            const safeProgress = clampPercent(progress);
            return [
                '<div class="pr-modal-track" role="progressbar" aria-label="', escapeAttr(label), '" aria-valuemin="0" aria-valuemax="100" aria-valuenow="', safeProgress, '">',
                    '<div class="pr-modal-fill" style="width:', safeProgress, '%"></div>',
                '</div>'
            ].join('');
        };

        const detailRowsHtml = function(rows, unit) {
            const sourceRows = Array.isArray(rows) ? rows : [];
            if (!sourceRows.length) return '<p class="pr-modal-subtitle">Belum ada konfigurasi aktif.</p>';
            return sourceRows.map(function(row) {
                const progress = clampPercent(row.progress);
                const title = row.title || row.submoduleId || row.moduleId || 'Submodul';
                return [
                    '<div class="pr-detail-row" data-submodule-id="', escapeAttr(row.submoduleId || row.moduleId || ''), '">',
                        '<span class="pr-detail-name">', escapeHtml(title), '</span>',
                        '<span class="pr-detail-count">', Number(row.completed || 0), ' / ', Number(row.total || 0), ' ', escapeHtml(unit), '</span>',
                        '<strong>', formatPercent(progress), '%</strong>',
                    '</div>'
                ].join('');
            }).join('');
        };

        const showModal = function(participant, trigger) {
            closeModal();
            ensureModalStyles();
            modalReturnFocus = trigger || document.activeElement;
            const hierarchy = buildLearningHierarchy(participant);
            const aiModule = hierarchy.modules[0];
            const mathModule = hierarchy.modules[1];
            const name = String(participant.name || 'Peserta');
            const overall = clampPercent(participant.overallProgress);
            const wrapper = document.createElement('div');
            wrapper.className = 'pr-modal-overlay dynamic-progress-modal-overlay';
            wrapper.innerHTML = [
                '<section class="pr-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="pr-modal-title">',
                    '<header class="pr-modal-header">',
                        '<div class="pr-modal-heading"><div class="pr-modal-avatar" aria-hidden="true">', escapeHtml(getInitials(name)), '</div><div>',
                            '<h2 class="pr-modal-title" id="pr-modal-title">', escapeHtml(name), '</h2>',
                            '<p class="pr-modal-subtitle">NIK ', escapeHtml(participant.maskedNik || participant.nik || '****'), '</p>',
                        '</div></div>',
                        '<button class="pr-modal-close" type="button" aria-label="Tutup detail progress"><i class="fas fa-times" aria-hidden="true"></i></button>',
                    '</header>',
                    '<div class="pr-modal-body">',
                        '<section class="pr-overall-card" aria-label="Ringkasan progress keseluruhan">',
                            '<div><div class="pr-overall-value">', formatPercent(overall), '%</div><div class="pr-overall-label">Overall progress dari server</div></div>',
                            '<div>', progressBarHtml(overall, 'Overall progress ' + name),
                                '<p class="pr-modal-subtitle">Rata-rata setara dari 2 modul: AI Fundamentals dan Math for AI. Nilai ini memakai snapshot server, bukan dihitung ulang di browser.</p>',
                            '</div>',
                        '</section>',
                        '<div class="pr-course-grid">',
                            '<section class="pr-course-card" data-learning-module="', escapeAttr(aiModule.moduleId), '">',
                                '<div class="pr-course-head"><div><span class="pr-level-label">Modul · ', aiModule.total, ' submodul</span><h3>', escapeHtml(aiModule.title), '</h3></div><span class="pr-pill">', formatPercent(aiModule.progress), '%</span></div>',
                                progressBarHtml(aiModule.progress, aiModule.title + ' ' + name),
                                '<div class="pr-course-meta"><span>', aiModule.completed, ' submodul tuntas</span><span>', aiModule.total, ' submodul terpantau</span></div>',
                                '<details class="pr-detail-group" open><summary>Rincian ', aiModule.total, ' submodul</summary>', detailRowsHtml(aiModule.submodules, 'bab'), '</details>',
                            '</section>',
                            '<section class="pr-course-card" data-learning-module="', escapeAttr(mathModule.moduleId), '">',
                                '<div class="pr-course-head"><div><span class="pr-level-label">Modul · ', mathModule.submoduleTotal, ' submodul</span><h3>', escapeHtml(mathModule.title), '</h3></div><span class="pr-pill">', formatPercent(mathModule.progress), '%</span></div>',
                                progressBarHtml(mathModule.progress, mathModule.title + ' ' + name),
                                '<div class="pr-course-meta"><span>', mathModule.completed, ' / ', mathModule.total, ' aktivitas</span><span>', mathModule.topicTotal, ' topik</span></div>',
                                '<details class="pr-detail-group"><summary>Rincian ', mathModule.submoduleTotal, ' submodul</summary>', detailRowsHtml(mathModule.submodules, 'aktivitas'), '</details>',
                            '</section>',
                        '</div>',
                        '<div class="pr-activity-note"><strong>Terakhir belajar:</strong> ', escapeHtml(formatTimestamp(participant.lastLearningAt)),
                            participant.lastModuleId ? '<br><span>Aktivitas terakhir: ' + escapeHtml(participant.lastModuleId) + ' / ' + escapeHtml(participant.lastItemId || '-') + '</span>' : '',
                            '<br><span>Snapshot server: ', escapeHtml(formatTimestamp(participant.snapshotGeneratedAt)), '</span>',
                        '</div>',
                    '</div>',
                '</section>'
            ].join('');
            previousBodyOverflow = document.body.style.overflow;
            document.body.appendChild(wrapper);
            document.body.style.overflow = 'hidden';
            activeModal = wrapper;
            wrapper.querySelector('.pr-modal-close').addEventListener('click', closeModal);
            wrapper.addEventListener('click', function(event) {
                if (event.target === wrapper) closeModal();
            });
            wrapper.querySelector('.pr-modal-close').focus();
        };

        const renderSnapshot = function(snapshot) {
            if (!snapshot || !snapshot.overview || !Array.isArray(snapshot.participants)) {
                throw new Error('Format snapshot progress tidak valid.');
            }
            allData = snapshot.participants.map(function(participant) {
                return Object.assign({}, participant, { snapshotGeneratedAt: snapshot.generatedAt || null });
            });
            renderOverview(snapshot.overview);
            renderTable(allData);
            if (snapshotStatus) {
                const ttlMinutes = Math.max(1, Math.round(Number(snapshot.cacheTtlSeconds || 300) / 60));
                snapshotStatus.textContent = 'Snapshot server ' + formatTimestamp(snapshot.generatedAt) + ' · cache maksimal ' + ttlMinutes + ' menit';
            }
        };

        const setLoading = function(isLoading) {
            if (!refreshBtn) return;
            refreshBtn.disabled = isLoading;
            refreshBtn.innerHTML = isLoading
                ? '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Memuat…'
                : '<i class="fas fa-sync-alt" aria-hidden="true"></i> Segarkan Data';
        };

        const loadData = async function(forceRefresh) {
            clearError();
            setLoading(true);
            if (snapshotStatus) snapshotStatus.textContent = forceRefresh ? 'Meminta snapshot terbaru dari server…' : 'Memuat snapshot server…';
            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(withAdminToken(Object.assign({
                        action: 'getAdminLearningProgressSnapshot',
                        forceRefresh: Boolean(forceRefresh)
                    }, window.getCurrentAdminAccess())))
                });
                const result = await response.json().catch(function() { return null; });
                if (!response.ok || !result || result.status !== 'success') {
                    throw new Error(result && result.message ? result.message : 'Server tidak mengembalikan snapshot progress.');
                }
                renderSnapshot(result.data);
            } catch (error) {
                console.error('Gagal memuat snapshot progress peserta:', error);
                showError(error.message || 'Terjadi kesalahan jaringan atau server.');
                if (tbody && !allData.length) {
                    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:28px;color:#8f174e">Data belum dapat ditampilkan. Coba segarkan kembali.</td></tr>';
                }
                if (snapshotStatus) snapshotStatus.textContent = 'Snapshot gagal dimuat';
            } finally {
                setLoading(false);
            }
        };

        const onModalKeydown = function(event) {
            if (event.key === 'Escape' && activeModal) closeModal();
            if (event.key === 'Tab' && activeModal) {
                const focusable = Array.from(activeModal.querySelectorAll('button:not([disabled]),summary,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])'));
                if (!focusable.length) return;
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (event.shiftKey && document.activeElement === first) {
                    event.preventDefault();
                    last.focus();
                } else if (!event.shiftKey && document.activeElement === last) {
                    event.preventDefault();
                    first.focus();
                }
            }
        };

        const onProgressRouteChange = function() {
            closeModal();
        };

        if (searchInput) {
            searchInput.addEventListener('input', function(event) {
                const query = String(event.target.value || '').trim().toLowerCase();
                renderTable(allData.filter(function(participant) {
                    return String(participant.name || '').toLowerCase().includes(query)
                        || String(participant.maskedNik || participant.nik || '').toLowerCase().includes(query);
                }));
            });
        }

        if (refreshBtn) refreshBtn.addEventListener('click', function() { loadData(true); });
        if (paginationContainer) {
            paginationContainer.addEventListener('click', function(event) {
                const button = event.target.closest('[data-page]');
                if (!button || button.disabled) return;
                const page = Number(button.dataset.page);
                const totalPages = Math.max(1, Math.ceil(currentFilteredData.length / itemsPerPage));
                if (page < 1 || page > totalPages) return;
                currentPage = page;
                renderTablePage();
            });
        }
        if (tbody) {
            tbody.addEventListener('click', function(event) {
                const button = event.target.closest('[data-participant-key]');
                if (!button) return;
                const participant = participantMap[button.dataset.participantKey];
                if (!participant) {
                    showError('Detail peserta tidak ditemukan pada halaman ini. Silakan segarkan data.');
                    return;
                }
                showModal(participant, button);
            });
        }
        document.addEventListener('keydown', onModalKeydown);
        window.addEventListener('hashchange', onProgressRouteChange);

        window.__cleanupProgressPeserta = function() {
            closeModal();
            document.removeEventListener('keydown', onModalKeydown);
            window.removeEventListener('hashchange', onProgressRouteChange);
        };

        loadData(false);
    };
})();
