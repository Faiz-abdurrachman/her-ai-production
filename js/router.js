/**
 * js/router.js
 * METODE FINAL: HASH ROUTING (ANTI BLANK & ANTI 404)
 * Otak Utama Sistem Single Page Application (SPA) HerAI Fellowship
 */

const router = {
    // ==========================================
    // 1. Peta Rute (URL Hash -> Lokasi File HTML)
    // Wajib pakai '/' di depan path folder agar terbaca absolut dari root
    // ==========================================
    routes: {
        "/": "/pages/home.html",
        "/home": "/pages/home.html",
        "/projects": "/pages/projects.html",
        "/announcement": "/pages/announcement.html",
        "/wall-of-fame": "/pages/wall-of-fame.html",
        "/leaderboard": "/pages/leaderboard.html",
        "/graduation": "/pages/graduation.html",
        "/register": "/pages/register.html",
        "/dashboard": "/pages/dashboard.html",
        "/twibbon": "/pages/twibbon.html",
        "/about-us": "/pages/about-us.html",
        "/curriculum": "/pages/curriculum.html",
        "/faq": "/pages/faq.html",
        "/industry-applications": "/pages/industry-applications.html"
    },

    currentPath: null,

    // ==========================================
    // 2. Fungsi Memuat Komponen Statis (Navbar & Footer)
    // ==========================================
    async loadComponents() {
        try {
            const [navResponse, footerResponse] = await Promise.all([
                fetch("/components/navbar.html"),
                fetch("/components/footer.html")
            ]);

            if (navResponse.ok) {
                document.getElementById("navbar-container").innerHTML = await navResponse.text();
            }
            if (footerResponse.ok) {
                document.getElementById("footer-container").innerHTML = await footerResponse.text();
            }

            // Eksekusi logika Navbar jika ada (dari js/main.js)
            if (typeof window.initNavbar === "function") {
                window.initNavbar();
            }
        } catch (error) {
            console.error("Gagal memuat komponen dasar:", error);
        }
    },

    // ==========================================
    // 3. Fungsi Scroll ke Anchor (Untuk link seperti #about)
    // ==========================================
    scrollToHash(hashId) {
        setTimeout(() => {
            const target = document.querySelector(hashId);
            if (target) {
                const headerOffset = 90;
                const offsetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: "smooth" });
            }
        }, 200);
    },

    // ==========================================
    // 4. Fungsi Utama Routing (Memuat Halaman)
    // ==========================================
    async handleRouting() {
        // Ambil path dari hash (Contoh: dari URL "http://web.com/#/dashboard" diambil "#/dashboard")
        let hash = window.location.hash;
        
        // Kalau web baru dibuka (tanpa hash) atau murni root, paksa arahkan ke #/home
        if (!hash || hash === "#" || hash === "#/") {
            window.location.hash = "#/home";
            return; 
        }

        // Hilangkan tanda '#' agar sesuai dengan peta rute di atas (menjadi "/dashboard")
        let path = hash.replace('#', '');
        
        // Bersihkan ekstensi .html jika user mengetik manual
        if (path.includes('.html')) {
            path = path.replace('.html', '');
        }

        const routeUrl = this.routes[path];
        const appContent = document.getElementById("app-content");
        const navContainer = document.getElementById("navbar-container");
        const footerContainer = document.getElementById("footer-container");

        try {
            // Jika rute tidak terdaftar di routes object
            if (!routeUrl) throw new Error("404");

            // Cek apakah perlu reload konten (hanya jika path berubah)
            if (this.currentPath !== path) {
                // Fetch file HTML-nya
                const response = await fetch(routeUrl);
                if (!response.ok) throw new Error("Gagal fetch file HTML");
                
                appContent.innerHTML = await response.text();
                this.currentPath = path;

                // ==========================================
                // LAYOUT MANAGEMENT: Sembunyikan Navbar/Footer di Dashboard
                // ==========================================
                if (path === "/dashboard") {
                    if (navContainer) navContainer.style.display = "none";
                    if (footerContainer) footerContainer.style.display = "none";
                } else {
                    if (navContainer) navContainer.style.display = "block";
                    if (footerContainer) footerContainer.style.display = "block";
                }

                // ==========================================
                // EKSEKUSI JAVASCRIPT KHUSUS HALAMAN
                // ==========================================
                
                // 1. Logika Register
                if (path === "/register" && typeof window.initRegisterLogic === "function") {
                    window.initRegisterLogic();
                } 
                // 2. Logika Dashboard
                else if (path === "/dashboard" && typeof window.initDashboardLogic === "function") {
                    // Beri waktu sejenak agar DOM dashboard benar-benar ter-render
                    setTimeout(() => window.initDashboardLogic(), 100);
                }
                // 3. Logika Twibbon
                else if (path === "/twibbon" && typeof window.initTwibbonLogic === "function") {
                    window.initTwibbonLogic();
                }

                // 4. Logika Interaksi Umum (FAQ, dll)
                if (typeof window.initPageInteractions === "function") {
                    window.initPageInteractions();
                }
            }

            // Selalu scroll ke atas saat pindah halaman (kecuali kalau ada anchor)
            window.scrollTo({ top: 0, behavior: 'instant' });

        } catch (error) {
            console.error("Router Error:", error);
            // Tampilan Halaman 404 Fallback
            appContent.innerHTML = `
                <section style="min-height: 70vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; background-color: #f8f9ff;">
                    <h1 style="font-size: 6rem; color: #FF1493; margin-bottom: 0; font-family: 'Space Grotesk', sans-serif;">404</h1>
                    <h2 style="color: #4B0082; font-family: 'Space Grotesk', sans-serif;">Halaman Tidak Ditemukan</h2>
                    <p style="color: #6c757d; max-width: 400px; margin-bottom: 20px;">Maaf, sepertinya Anda tersesat atau halaman yang dituju belum tersedia.</p>
                    <a href="#/home" style="background: #FF1493; color: white; padding: 12px 25px; border-radius: 50px; text-decoration: none; font-weight: bold;">Kembali ke Beranda</a>
                </section>
            `;
            this.currentPath = null;
        }
    }
};

// ==========================================
// 5. Inisialisasi & Event Listeners Global
// ==========================================
document.addEventListener("DOMContentLoaded", async () => {
    
    // 1. Load navbar & footer pertama kali
    await router.loadComponents();
    
    // 2. Jalankan routing saat web pertama kali dibuka
    router.handleRouting();

    // 3. TANGKAP SEMUA KLIK PADA LINK <a> (Event Delegation)
    document.body.addEventListener("click", e => {
        // Cari elemen a yang di-klik (bisa jadi klik pada icon di dalam tag a)
        const link = e.target.closest("a");
        
        // Jika tidak ada href, biarkan saja
        if (!link || !link.hasAttribute("href")) return;

        const href = link.getAttribute("href");

        // Abaikan link eksternal atau link kosong
        if (!href || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) return;

        // Jika link mengarah ke id anchor di halaman yang sama (contoh: #about)
        // Pastikan bukan link hash route (yang pakai #/)
        if (href.startsWith("#") && !href.startsWith("#/")) {
            e.preventDefault();
            router.scrollToHash(href);
            return;
        }

        // Jika link berupa navigasi path biasa (contoh: href="/dashboard")
        // Kita cegah browser reload, dan ubah paksa jadi format hash route ("#/dashboard")
        if (href.startsWith("/") && !href.startsWith("//")) {
            e.preventDefault();
            window.location.hash = "#" + href;
        }
    });

    // 4. Deteksi saat URL Hash berubah (Misal saat klik Back/Forward di browser)
    window.addEventListener("hashchange", () => {
        router.handleRouting();
    });
});