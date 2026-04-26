/* ==========================================================================
   js/dashboard.js
   Logic untuk Data Sorcerers Admin Panel (Elegant Clean Theme)
   Terintegrasi dengan Google Apps Script & SPA Routing
   ========================================================================== */

   const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxivp4g8mVai8rZcei4w9pblh8s2Kks84CnRshveD_IR69erw_Ffbn_TwithrpNTEj_yw/exec';
   let participantsData = [];
   
   // ==========================================
   // FUNGSI INISIALISASI (Dipanggil oleh router.js)
   // ==========================================
   window.initDashboardLogic = function() {
       console.log('🔵 Elegant Dashboard Logic Initialized');
       
       // DOM Elements Utama Dashboard
       const searchInput = document.getElementById('searchInput');
       const tableBody = document.getElementById('tableBody');
       const filterJalur = document.getElementById('filterJalur');
       const filterStatus = document.getElementById('filterStatus');
       const btnSync = document.getElementById('btnSync');
       
       if (!searchInput || !tableBody || !filterJalur || !filterStatus || !btnSync) {
           console.error('❌ Elemen Dashboard tidak ditemukan!');
           return; 
       }
   
       // Clone elemen untuk reset event listeners (mencegah memory leak SPA)
       const newSearchInput = searchInput.cloneNode(true);
       searchInput.parentNode.replaceChild(newSearchInput, searchInput);
       
       const newFilterJalur = filterJalur.cloneNode(true);
       filterJalur.parentNode.replaceChild(newFilterJalur, filterJalur);
       
       const newFilterStatus = filterStatus.cloneNode(true);
       filterStatus.parentNode.replaceChild(newFilterStatus, filterStatus);
       
       const newBtnSync = btnSync.cloneNode(true);
       btnSync.parentNode.replaceChild(newBtnSync, btnSync);
   
       // Attach Event Listeners Pencarian & Filter
       newSearchInput.addEventListener('input', filterData);
       newFilterJalur.addEventListener('change', filterData);
       newFilterStatus.addEventListener('change', filterData);
       newBtnSync.addEventListener('click', fetchData);
   
       // Event Delegation untuk Tombol Detail di dalam Tabel
       const newTableBody = document.getElementById('tableBody');
       newTableBody.addEventListener('click', function(e) {
           const btnView = e.target.closest('.btn-detail'); 
           if (btnView) {
               const rowId = parseInt(btnView.getAttribute('data-id'));
               viewDetail(rowId);
           }
       });
   
       // Event Listener Tutup Modal Detail
       const btnCloseModal = document.getElementById('btnCloseModal');
       if (btnCloseModal) {
           const newBtnCloseModal = btnCloseModal.cloneNode(true);
           btnCloseModal.parentNode.replaceChild(newBtnCloseModal, btnCloseModal);
           newBtnCloseModal.addEventListener('click', () => {
               document.getElementById('detailModal').classList.remove('active');
               document.body.style.overflow = 'auto';
           });
       }
   
       // Event Listener Logout
       const logoutBtn = document.querySelector('.logout-btn');
       if (logoutBtn) {
           const newLogoutBtn = logoutBtn.cloneNode(true);
           logoutBtn.parentNode.replaceChild(newLogoutBtn, logoutBtn);
           newLogoutBtn.addEventListener('click', (e) => {
               e.preventDefault();
               sessionStorage.removeItem('isAdminLoggedIn');
               window.location.hash = "#/home"; // Routing SPA
           });
       }
   
       checkLoginStatus();
   };
   
   // ==========================================
   // 1. SISTEM AUTENTIKASI (LOGIN OVERLAY)
   // ==========================================
   function checkLoginStatus() {
       if (!sessionStorage.getItem('isAdminLoggedIn')) {
           createLoginOverlay();
       } else {
           fetchData();
       }
   }
   
   function createLoginOverlay() {
       const existingOverlay = document.getElementById('loginOverlay');
       if (existingOverlay) existingOverlay.remove();
   
       const overlay = document.createElement('div');
       overlay.id = 'loginOverlay';
       overlay.style.cssText = `
           position: fixed; top: 0; left: 0; width: 100%; height: 100%;
           background: rgba(248, 249, 255, 0.8); z-index: 9999;
           display: flex; align-items: center; justify-content: center;
           backdrop-filter: blur(10px);
       `;
   
       overlay.innerHTML = `
           <div class="glass-panel" style="padding: 40px; width: 90%; max-width: 400px; text-align: center; background: #fff; border-radius: 24px; box-shadow: 0 20px 50px rgba(0,0,0,0.1);">
               <div style="margin-bottom: 30px;">
                   <h2 style="color: var(--dark-purple); font-size: 2.5rem; font-family: 'Space Grotesk', sans-serif; margin: 0; font-weight: 800;">W<span style="color: var(--primary-pink);">IT</span></h2>
                   <p style="color: var(--text-muted); font-size: 0.95rem; margin-top: 5px; font-weight: 600;">Data Sorcerers Security</p>
               </div>
               <form id="loginForm" style="display: flex; flex-direction: column; gap: 20px;">
                   <div style="position: relative;">
                       <i class="fas fa-user-shield" style="position: absolute; left: 15px; top: 16px; color: var(--text-muted);"></i>
                       <input type="text" id="adminId" placeholder="ID Admin" required 
                              style="width: 100%; padding: 15px 15px 15px 45px; border: 1px solid var(--gray-border); border-radius: 12px; outline: none; background: #fafbfe; color: var(--text-dark); box-sizing: border-box; font-family: 'Inter', sans-serif;">
                   </div>
                   <div style="position: relative;">
                       <i class="fas fa-key" style="position: absolute; left: 15px; top: 16px; color: var(--text-muted);"></i>
                       <input type="password" id="adminPass" placeholder="Password" required 
                              style="width: 100%; padding: 15px 15px 15px 45px; border: 1px solid var(--gray-border); border-radius: 12px; outline: none; background: #fafbfe; color: var(--text-dark); box-sizing: border-box; font-family: 'Inter', sans-serif;">
                   </div>
                   <button type="submit" id="btnLogin" class="btn-cyber" style="width: 100%; justify-content: center; padding: 15px; margin-top: 10px; font-size: 1rem;">
                       <i class="fas fa-lock"></i> Authenticate
                   </button>
               </form>
               <p id="loginError" style="color: var(--danger); font-size: 0.85rem; margin-top: 15px; display: none; font-weight: 600;"></p>
           </div>
       `;
       
       document.body.appendChild(overlay);
   
       document.getElementById('loginForm').addEventListener('submit', async (e) => {
           e.preventDefault();
           const btn = document.getElementById('btnLogin');
           const err = document.getElementById('loginError');
           
           btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Verifying...';
           btn.disabled = true;
           err.style.display = 'none';
   
           const payload = {
               action: 'login',
               id_admin: document.getElementById('adminId').value,
               password: document.getElementById('adminPass').value
           };
   
           try {
               const response = await fetch(SCRIPT_URL, {
                   method: 'POST',
                   headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                   body: JSON.stringify(payload)
               });
               const result = await response.json();
   
               if (result.status === 'success') {
                   sessionStorage.setItem('isAdminLoggedIn', 'true');
                   overlay.remove();
                   fetchData();
               } else {
                   throw new Error(result.message);
               }
           } catch (error) {
               err.textContent = error.message || "Gagal menghubungi server database.";
               err.style.display = 'block';
           } finally {
               btn.innerHTML = '<i class="fas fa-lock"></i> Authenticate';
               btn.disabled = false;
           }
       });
   }
   
   // ==========================================
   // 2. FETCH DATA DARI SPREADSHEET
   // ==========================================
   async function fetchData() {
       const tableBody = document.getElementById('tableBody');
       const btnSync = document.getElementById('btnSync');
       
       if (!tableBody || !btnSync) return;
       
       btnSync.innerHTML = '<i class="fas fa-sync-alt fa-spin"></i> Syncing...';
       tableBody.innerHTML = `
           <tr class="loading-row">
               <td colspan="6" style="text-align: center; padding: 40px;">
                   <i class="fas fa-circle-notch fa-spin" style="font-size: 2rem; color: var(--primary-pink);"></i>
                   <p style="margin-top: 15px; color: var(--text-muted);">Mengambil data dari secure database...</p>
               </td>
           </tr>
       `;
   
       try {
           const payload = { action: 'getData' };
           const response = await fetch(SCRIPT_URL, {
               method: 'POST',
               headers: { 'Content-Type': 'text/plain;charset=utf-8' },
               body: JSON.stringify(payload)
           });
           
           const result = await response.json();
           
           if (result.status === 'success') {
               participantsData = result.data.reverse(); 
               filterData(); 
           } else {
               throw new Error(result.message);
           }
       } catch (error) {
           console.error(error);
           tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; color: var(--danger); font-weight:600; padding:30px;">Gagal menarik data. Coba klik tombol Sync Data lagi.</td></tr>`;
       } finally {
           btnSync.innerHTML = '<i class="fas fa-sync-alt"></i> Sync Data';
       }
   }
   
   // ==========================================
   // 3. RENDER TABEL & STATISTIK
   // ==========================================
   function filterData() {
       const searchInput = document.getElementById('searchInput');
       const filterJalur = document.getElementById('filterJalur');
       const filterStatus = document.getElementById('filterStatus');
       
       if (!searchInput || !filterJalur || !filterStatus) return;
       
       const searchTerm = searchInput.value.toLowerCase();
       const filterJalurValue = filterJalur.value;
       const filterStatusValue = filterStatus.value;
   
       const filtered = participantsData.filter(p => {
           const nama = String(p.nama_lengkap || "").toLowerCase();
           const nik = String(p.nik || "");
           const jalur = String(p.jalur || "");
           const statusSeleksi = String(p.status_seleksi || "");
   
           const matchSearch = nama.includes(searchTerm) || nik.includes(searchTerm);
           const matchJalur = filterJalurValue === 'all' || jalur === filterJalurValue;
           const matchStatus = filterStatusValue === 'all' || statusSeleksi === filterStatusValue;
           return matchSearch && matchJalur && matchStatus;
       });
   
       renderTable(filtered);
       updateStats(participantsData); 
   }
   
   function renderTable(dataToRender) {
       const tableBody = document.getElementById('tableBody');
       if (!tableBody) return;
       
       tableBody.innerHTML = '';
       
       if (dataToRender.length === 0) {
           tableBody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding: 40px; color: var(--text-muted);">Tidak ada data ditemukan.</td></tr>';
           return;
       }
   
       dataToRender.forEach(p => {
           const jalurSafe = String(p.jalur || "");
           const jalurStyle = jalurSafe === 'afirmasi' 
               ? 'background: var(--light-pink); color: var(--primary-pink);' 
               : 'background: rgba(138, 43, 226, 0.1); color: var(--secondary-purple);';
           const jalurBadge = `<span style="padding: 4px 10px; border-radius: 6px; font-size:0.8rem; font-weight: 700; ${jalurStyle}">${jalurSafe === 'afirmasi' ? 'Afirmasi 3T' : 'Reguler'}</span>`;
           
           const statusKerjaSafe = String(p.status_kerja || "");
           const statusBgMap = { 'mahasiswa': 'Mahasiswa', 'fresh_graduate': 'Fresh Grad', 'profesional': 'Profesional', 'lainnya': 'Lainnya' };
           const statusKerjaText = statusBgMap[statusKerjaSafe] || statusKerjaSafe || "-";
           
           const statusSeleksiSafe = String(p.status_seleksi || "");
           let statusSeleksiBadge = '';
           if(statusSeleksiSafe === 'lolos') statusSeleksiBadge = '<span class="badge lolos"><i class="fas fa-check-circle"></i> Lolos</span>';
           else if(statusSeleksiSafe === 'gugur') statusSeleksiBadge = '<span class="badge gugur"><i class="fas fa-times-circle"></i> Gugur</span>';
           else statusSeleksiBadge = '<span class="badge pending"><i class="fas fa-clock"></i> Menunggu</span>';
   
           let daerahShort = p.alamat ? String(p.alamat).split(',')[0] : "-"; 
   
           const tr = document.createElement('tr');
           tr.innerHTML = `
               <td>
                   <div style="font-weight: 700; color: var(--dark-purple);">${p.nama_lengkap || "-"}</div>
                   <div style="font-size: 0.8rem; color: var(--text-muted); font-family: monospace;">${maskNIK(String(p.nik || ""))}</div>
               </td>
               <td>${jalurBadge}</td>
               <td><span style="font-weight: 600; font-size: 0.85rem; color: var(--text-dark);">${statusKerjaText}</span></td>
               <td><span style="font-size: 0.85rem; color: var(--text-muted);">${daerahShort}</span></td>
               <td>${statusSeleksiBadge}</td>
               <td>
                   <button class="btn-cyber btn-detail" data-id="${p.rowId}" style="padding: 8px 15px; font-size: 0.85rem; box-shadow: none;">
                       <i class="fas fa-eye"></i> Detail
                   </button>
               </td>
           `;
           tableBody.appendChild(tr);
       });
   }
   
   function updateStats(data) {
       const statTotal = document.getElementById('statTotal');
       const stat3T = document.getElementById('stat3T'); 
       const statMahasiswa = document.getElementById('statMahasiswa');
       const statLolos = document.getElementById('statLolos');
       
       if (statTotal) statTotal.innerText = data.length;
       if (stat3T) stat3T.innerText = data.filter(p => String(p.jalur) === 'afirmasi').length;
       if (statMahasiswa) statMahasiswa.innerText = data.filter(p => String(p.status_kerja) === 'mahasiswa' || String(p.status_kerja) === 'fresh_graduate').length;
       if (statLolos) statLolos.innerText = data.filter(p => String(p.status_seleksi) === 'lolos').length;
   }
   
   // ==========================================
   // 4. FUNGSI ENKRIPSI (MASKING) NIK
   // ==========================================
   function maskNIK(nik) {
       if (!nik || nik.length < 16) return String(nik || "-");
       return nik.substring(0, 6) + '******' + nik.substring(12);
   }
   
   // ==========================================
   // 5. MODAL DETAIL & KURASI PESERTA
   // ==========================================
   function viewDetail(rowId) {
       const participant = participantsData.find(p => p.rowId === rowId);
       if(!participant) return;
   
       const modal = document.getElementById('detailModal');
       const modalBody = document.getElementById('modalBodyContent');
       const modalFooter = document.getElementById('modalFooterControls');
   
       const safeJalur = String(participant.jalur || "");
       const safeStatusKerja = String(participant.status_kerja || "");
       const safeWA = String(participant.whatsapp || "");
       const cleanWA = safeWA.replace(/[^0-9]/g, '');
   
       let tglLahirDisplay = "-";
       if (participant.tanggal_lahir) {
           try {
               tglLahirDisplay = new Date(participant.tanggal_lahir).toLocaleDateString('id-ID');
               if (tglLahirDisplay === "Invalid Date") tglLahirDisplay = participant.tanggal_lahir;
           } catch (e) {
               tglLahirDisplay = participant.tanggal_lahir;
           }
       }
   
       let backgroundHTML = '';
       if (safeStatusKerja === 'mahasiswa' || safeStatusKerja === 'fresh_graduate') {
           backgroundHTML = `
               <div style="margin-bottom: 15px;">
                   <label style="color:var(--text-muted); font-size:0.8rem; text-transform:uppercase;">Asal Universitas / Kampus</label>
                   <p style="margin: 5px 0 0 0; color:var(--dark-purple); font-weight:600;">${participant.univ || "-"}</p>
               </div>
               <div style="margin-bottom: 15px;">
                   <label style="color:var(--text-muted); font-size:0.8rem; text-transform:uppercase;">Program Studi / Jurusan</label>
                   <p style="margin: 5px 0 0 0; color:var(--dark-purple); font-weight:600;">${participant.jurusan || "-"}</p>
               </div>
           `;
       } else if (safeStatusKerja === 'profesional') {
           backgroundHTML = `
               <div style="margin-bottom: 15px;">
                   <label style="color:var(--text-muted); font-size:0.8rem; text-transform:uppercase;">Instansi / Perusahaan</label>
                   <p style="margin: 5px 0 0 0; color:var(--dark-purple); font-weight:600;">${participant.instansi || "-"}</p>
               </div>
               <div style="margin-bottom: 15px;">
                   <label style="color:var(--text-muted); font-size:0.8rem; text-transform:uppercase;">Posisi / Jabatan</label>
                   <p style="margin: 5px 0 0 0; color:var(--dark-purple); font-weight:600;">${participant.posisi || "-"}</p>
               </div>
               <div style="margin-bottom: 15px;">
                   <label style="color:var(--text-muted); font-size:0.8rem; text-transform:uppercase;">Deskripsi Pekerjaan</label>
                   <p style="margin: 5px 0 0 0; color:var(--text-dark); font-size: 0.9rem; white-space: pre-wrap;">${participant.peng_kerja || "-"}</p>
               </div>
           `;
       }
   
       modalBody.innerHTML = `
           <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 25px;">
               <div>
                   <h3 style="color:var(--dark-purple); font-family:'Space Grotesk', sans-serif; font-size: 1.6rem; margin: 0 0 5px 0; font-weight: 800;">${participant.nama_lengkap || "-"}</h3>
                   <div style="color:var(--text-muted); font-family:monospace; font-weight: 600;">${maskNIK(String(participant.nik))}</div>
               </div>
               <span style="background: ${safeJalur === 'afirmasi' ? 'var(--light-pink)' : 'rgba(138, 43, 226, 0.1)'}; color: ${safeJalur === 'afirmasi' ? 'var(--primary-pink)' : 'var(--secondary-purple)'}; padding: 6px 12px; border-radius: 8px; font-size:0.85rem; font-weight:bold;">${safeJalur === 'afirmasi' ? 'JALUR AFIRMASI 3T' : 'JALUR REGULER'}</span>
           </div>
   
           <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; background: #fafbfe; padding: 20px; border-radius: 12px; border: 1px solid var(--gray-border);">
               <div>
                   <label style="color:var(--text-muted); font-size:0.8rem; text-transform:uppercase;">Tempat, Tanggal Lahir</label>
                   <p style="margin: 5px 0 0 0; color:var(--dark-purple); font-weight:600;">${participant.tempat_lahir || "-"}, ${tglLahirDisplay}</p>
               </div>
               <div>
                   <label style="color:var(--text-muted); font-size:0.8rem; text-transform:uppercase;">Alamat Domisili</label>
                   <p style="margin: 5px 0 0 0; color:var(--dark-purple); font-weight:600; font-size: 0.9rem;">${participant.alamat || "-"}</p>
               </div>
               <div>
                   <label style="color:var(--text-muted); font-size:0.8rem; text-transform:uppercase;">WhatsApp</label>
                   <p style="margin: 5px 0 0 0;"><a href="https://wa.me/${cleanWA}" target="_blank" style="color:var(--success); text-decoration:none; font-weight:600;"><i class="fab fa-whatsapp"></i> ${safeWA || "-"}</a></p>
               </div>
               <div>
                   <label style="color:var(--text-muted); font-size:0.8rem; text-transform:uppercase;">Email</label>
                   <p style="margin: 5px 0 0 0; color:var(--dark-purple); font-weight:600; font-size: 0.9rem;">${participant.email || "-"}</p>
               </div>
           </div>
   
           <h4 style="color:var(--dark-purple); border-bottom: 2px solid var(--gray-border); padding-bottom: 8px; margin-bottom: 20px;">Latar Belakang (${safeStatusKerja.replace('_', ' ').toUpperCase()})</h4>
           <div style="margin-bottom: 30px;">
               ${backgroundHTML}
           </div>
   
           <h4 style="color:var(--dark-purple); border-bottom: 2px solid var(--gray-border); padding-bottom: 8px; margin-bottom: 20px;">Organisasi & Prestasi</h4>
           <div style="margin-bottom: 30px;">
               <div style="margin-bottom: 15px;">
                   <label style="color:var(--text-muted); font-size:0.8rem; text-transform:uppercase;">Kejuaraan</label>
                   <p style="margin: 5px 0 0 0; color:var(--text-dark); font-size: 0.9rem; white-space: pre-wrap;">${participant.kejuaraan || "-"}</p>
               </div>
               <div style="margin-bottom: 15px;">
                   <label style="color:var(--text-muted); font-size:0.8rem; text-transform:uppercase;">Organisasi</label>
                   <p style="margin: 5px 0 0 0; color:var(--text-dark); font-size: 0.9rem; white-space: pre-wrap;">${participant.organisasi || "-"}</p>
               </div>
               ${participant.cv_link ? `<a href="${participant.cv_link}" target="_blank" style="display:inline-block; margin-top:10px; color:var(--secondary-purple); font-weight:600; text-decoration:none;"><i class="fas fa-external-link-alt"></i> Buka Link Portofolio</a>` : ''}
           </div>
   
           <h4 style="color:var(--dark-purple); border-bottom: 2px solid var(--gray-border); padding-bottom: 8px; margin-bottom: 20px;">Review Essay</h4>
           <div style="background: #fff; border: 1px solid var(--gray-border); border-radius: 12px; padding: 20px;">
               <p style="color:var(--dark-purple); font-weight:600; font-size:0.9rem; margin:0 0 5px 0;">1. Tell us about yourself!</p>
               <p style="color:var(--text-dark); font-size:0.9rem; margin-bottom: 20px; line-height: 1.6;">${participant.essay1 || "-"}</p>
               
               <p style="color:var(--dark-purple); font-weight:600; font-size:0.9rem; margin:0 0 5px 0;">2. Why you choose this program?</p>
               <p style="color:var(--text-dark); font-size:0.9rem; margin-bottom: 20px; line-height: 1.6;">${participant.essay2 || "-"}</p>
   
               <p style="color:var(--dark-purple); font-weight:600; font-size:0.9rem; margin:0 0 5px 0;">3. How this program can help your future career?</p>
               <p style="color:var(--text-dark); font-size:0.9rem; margin-bottom: 20px; line-height: 1.6;">${participant.essay3 || "-"}</p>
   
               <p style="color:var(--dark-purple); font-weight:600; font-size:0.9rem; margin:0 0 5px 0;">4. What you expect to join this program?</p>
               <p style="color:var(--text-dark); font-size:0.9rem; margin-bottom: 20px; line-height: 1.6;">${participant.essay4 || "-"}</p>
   
               <p style="color:var(--dark-purple); font-weight:600; font-size:0.9rem; margin:0 0 5px 0;">5. What makes you outstanding?</p>
               <p style="color:var(--text-dark); font-size:0.9rem; margin-bottom: 0; line-height: 1.6;">${participant.essay5 || "-"}</p>
           </div>
       `;
   
       modalFooter.innerHTML = `
           <span style="margin-right: auto; font-size: 0.9rem; color: var(--text-muted); display:flex; align-items:center;">
               Status Seleksi:&nbsp; <strong style="text-transform: uppercase; color: var(--dark-purple);">${participant.status_seleksi || "PENDING"}</strong>
           </span>
           <button class="btn-cyber" onclick="updateStatus(${participant.rowId}, 'gugur')" style="background: var(--danger); box-shadow: none;">
               <i class="fas fa-times"></i> Tandai Gugur
           </button>
           <button class="btn-cyber" onclick="updateStatus(${participant.rowId}, 'lolos')" style="background: var(--success); box-shadow: none;">
               <i class="fas fa-check"></i> Loloskan
           </button>
       `;
   
       modal.classList.add('active');
       document.body.style.overflow = 'hidden';
   }
   
   // ==========================================
   // 6. CUSTOM CONFIRMATION MODAL LOGIC
   // ==========================================
   function showConfirmDialog(newStatus) {
       return new Promise((resolve) => {
           const modal = document.getElementById('confirmModal');
           const btnCancel = document.getElementById('btnCancelConfirm');
           const btnProceed = document.getElementById('btnProceedConfirm');
           const confirmMessage = document.getElementById('confirmMessage');
           const confirmIcon = document.getElementById('confirmIcon');
   
           if (newStatus === 'lolos') {
               confirmMessage.innerHTML = `Apakah Anda yakin ingin menetapkan kandidat ini sebagai peserta <strong style="color: var(--success);">LOLOS</strong> tahap administrasi?`;
               confirmIcon.innerHTML = '<i class="fas fa-check-circle" style="color: var(--success);"></i>';
               confirmIcon.style.background = 'rgba(46, 204, 113, 0.1)';
               btnProceed.style.background = 'var(--success)';
           } else {
               confirmMessage.innerHTML = `Apakah Anda yakin ingin menandai kandidat ini <strong style="color: var(--danger);">GUGUR</strong> dari proses seleksi?`;
               confirmIcon.innerHTML = '<i class="fas fa-times-circle" style="color: var(--danger);"></i>';
               confirmIcon.style.background = 'rgba(231, 76, 60, 0.1)';
               btnProceed.style.background = 'var(--danger)';
           }
   
           modal.classList.add('active');
   
           const onProceed = () => { cleanup(); resolve(true); };
           const onCancel = () => { cleanup(); resolve(false); };
   
           btnProceed.addEventListener('click', onProceed);
           btnCancel.addEventListener('click', onCancel);
   
           function cleanup() {
               modal.classList.remove('active');
               btnProceed.removeEventListener('click', onProceed);
               btnCancel.removeEventListener('click', onCancel);
           }
       });
   }
   
   // ==========================================
   // 7. UPDATE STATUS (LOLOS/GUGUR KE GOOGLE SCRIPT)
   // ==========================================
   window.updateStatus = async function(rowId, newStatus) {
       const isConfirm = await showConfirmDialog(newStatus);
       if(!isConfirm) return;
   
       document.getElementById('detailModal').classList.remove('active');
       document.body.style.overflow = 'auto';
       
       const btnSync = document.getElementById('btnSync');
       if (!btnSync) return;
       
       const originalText = btnSync.innerHTML;
       btnSync.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Updating DB...';
       btnSync.disabled = true;
       
       // Update data lokal sementara (Optimistic UI)
       const index = participantsData.findIndex(p => p.rowId === rowId);
       if(index !== -1) {
           participantsData[index].status_seleksi = newStatus;
           filterData();
       }
   
       try {
           const payload = {
               action: 'updateStatus',
               rowId: rowId,
               newStatus: newStatus
           };
   
           const response = await fetch(SCRIPT_URL, {
               method: 'POST',
               headers: { 'Content-Type': 'text/plain;charset=utf-8' },
               body: JSON.stringify(payload)
           });
           
           const result = await response.json();
           if (result.status !== 'success') throw new Error("Gagal mengupdate ke database");
           
       } catch (error) {
           alert('Gagal mengupdate status ke server Google Sheets. Memuat ulang data...');
           console.error(error);
           fetchData(); // Rollback kalau gagal
       } finally {
           btnSync.innerHTML = originalText;
           btnSync.disabled = false;
       }
   };