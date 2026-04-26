/**
 * js/main.js
 * Dioptimalkan untuk Arsitektur SPA (Single Page Application)
 */

// ==========================================
// FUNGSI KHUSUS NAVBAR (Dipanggil 1x oleh router.js)
// ==========================================
window.initNavbar = function() {
    // 1. Navbar Slide for Mobile (Fixed Visibility)
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links > li');

    if (burger && nav) {
        // Remove previous event listeners jika ada
        const newBurger = burger.cloneNode(true);
        burger.parentNode.replaceChild(newBurger, burger);
        
        newBurger.addEventListener('click', () => {
            // Toggle Navigasi
            nav.classList.toggle('nav-active');

            // Burger Animation (X)
            newBurger.classList.toggle('toggle');

            // Animate Links bertahap
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
        });
    }

    // 2. Dropdown Menu (Fixed for Mobile Touch)
    const dropBtn = document.querySelector('.dropbtn');
    const dropContent = document.querySelector('.dropdown-content');

    if (dropBtn && dropContent) {
        // Remove previous event listeners
        const newDropBtn = dropBtn.cloneNode(true);
        dropBtn.parentNode.replaceChild(newDropBtn, dropBtn);
        
        newDropBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            if (window.innerWidth <= 992) {
                // Mobile: toggle dropdown
                const dropContentCurrent = document.querySelector('.dropdown-content');
                dropContentCurrent.classList.toggle('show-dropdown-mobile');
                
                if (dropContentCurrent.classList.contains('show-dropdown-mobile')) {
                    dropContentCurrent.style.display = 'block';
                } else {
                    dropContentCurrent.style.display = 'none';
                }
            }
        });

        // Desktop hover behavior (CSS handles this)
        // Tapi kita perlu close dropdown ketika klik di luar
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.dropdown')) {
                const dropContentCurrent = document.querySelector('.dropdown-content');
                if (dropContentCurrent) {
                    dropContentCurrent.classList.remove('show-dropdown-mobile');
                    if (window.innerWidth <= 992) {
                        dropContentCurrent.style.display = 'none';
                    }
                }
            }
        });
    }

    // 3. Navbar Shadow Effect on Scroll
    const header = document.querySelector('header');
    if (header) {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
            } else {
                header.style.boxShadow = '0 2px 15px rgba(0,0,0,0.05)';
            }
        };

        // Remove previous scroll listeners dan tambahkan yang baru
        window.removeEventListener('scroll', handleScroll);
        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    // 4. Auto-close mobile menu ketika navigasi
    const closeMobileMenu = () => {
        const navCurrent = document.querySelector('.nav-links');
        const burgerCurrent = document.querySelector('.burger');
        const dropContentCurrent = document.querySelector('.dropdown-content');
        
        if (window.innerWidth <= 992 && navCurrent && navCurrent.classList.contains('nav-active')) {
            navCurrent.classList.remove('nav-active');
            if (burgerCurrent) burgerCurrent.classList.remove('toggle');
            if (dropContentCurrent) {
                dropContentCurrent.classList.remove('show-dropdown-mobile');
                dropContentCurrent.style.display = 'none';
            }
            // Reset animasi link
            document.querySelectorAll('.nav-links > li').forEach(link => {
                link.style.animation = '';
            });
        }
    };

    // Attach close handler ke semua nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
};

// ==========================================
// FUNGSI KHUSUS HALAMAN (Dipanggil router.js setiap pindah menu)
// ==========================================
window.initPageInteractions = function() {
    
    // 1. FAQ Accordion (Fixed Height Calculation)
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        // Remove previous listeners
        const newQuestion = question.cloneNode(true);
        question.parentNode.replaceChild(newQuestion, question);
        
        newQuestion.addEventListener('click', function() {
            const currentItem = this.parentElement;
            const answer = this.nextElementSibling;
            const icon = this.querySelector('i');
            const isActive = currentItem.classList.contains('active');
            
            // Tutup semua yang sedang terbuka
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                const itemAnswer = item.querySelector('.faq-answer');
                if(itemAnswer) {
                    itemAnswer.style.maxHeight = null;
                    itemAnswer.style.paddingTop = '0';
                    itemAnswer.style.paddingBottom = '0';
                }
                const itemIcon = item.querySelector('i');
                if(itemIcon) itemIcon.style.transform = 'rotate(0deg)';
            });
            
            // Buka yang diklik (jika belum aktif)
            if (!isActive) {
                currentItem.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 40 + "px";
                answer.style.paddingTop = '15px';
                answer.style.paddingBottom = '20px';
                if(icon) icon.style.transform = 'rotate(180deg)';
            }
        });
    });
};

/* ==========================================================================
   LEGAL MODAL LOGIC (js/main.js)
   ========================================================================== */

// Fungsi buat buka Modal
window.openLegal = function(type) {
    const modalId = type === 'privacy' ? 'modal-privacy' : 'modal-terms';
    const modal = document.getElementById(modalId);
    
    if (modal) {
        modal.classList.add('active');
        // Kunci scroll body biar user fokus ke pop-up
        document.body.style.overflow = 'hidden';
        console.log(`🔓 Opening ${type} modal`);
    }
};

// Fungsi buat tutup semua Modal
window.closeLegal = function() {
    const modals = document.querySelectorAll('.legal-modal');
    modals.forEach(modal => {
        modal.classList.remove('active');
    });
    // Balikin scroll body
    document.body.style.overflow = 'auto';
    console.log('🔒 Modals closed');
};

// JURUS PRO: Klik di mana saja di luar kotak putih untuk nutup modal
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('legal-modal')) {
        closeLegal();
    }
});

// Tutup pakai tombol ESC di keyboard
window.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeLegal();
    }
});