(function () {
    const CV_BASE_PATH = "/pages/frontend/fellow-dashboard/data-engineering-domains/computer-vision/";
    const MODULE_ID = 'computer-vision';
    
    // Mapping base routes to their internal folder names
    const folderMap = {
        'cv-digital-image': '01-digital-image-fundamentals',
        'cv-cnn': '02-convolutional-neural-networks',
        'cv-advanced-cnn': '03-advanced-cnn-architectures'
    };

    window.loadCvChapter = async function(baseRoute, chapterId, mode = 'materi') {
        sessionStorage.setItem(`cv_active_chapter_${baseRoute}`, chapterId);
        const folder = folderMap[baseRoute];
        if (!folder) return;
        
        const containerId = `${baseRoute}-chapter-container`;
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = `
            <div style="text-align: center; padding: 60px; color: var(--fellow-muted);">
                <i class="fas fa-spinner fa-spin" style="font-size: 2rem; color: var(--fellow-pink); margin-bottom: 16px;"></i>
                <p>Memuat materi...</p>
            </div>
        `;

        try {
            const url = `${CV_BASE_PATH}${folder}/chapters/${chapterId}.html`;
            const response = await fetch(url);
            if (!response.ok) throw new Error("Gagal memuat materi");
            const html = await response.text();
            
            container.innerHTML = html;
            
            if (mode === 'materi') window.saveChapterProgress(MODULE_ID, chapterId, 'completed');
            if (mode === 'practice') {
                const article = container.querySelector('article.cv-chapter-wrapper') || container;
                const secQuiz = article.querySelector('#sec-quiz');
                
                let practiceHtml = '';
                
                // Get topic title from sidebar
                let topicTitle = "Topik " + chapterId;
                const sidebarList = document.getElementById(`${baseRoute}-sidebar-list`);
                if (sidebarList) {
                    const activeLi = sidebarList.querySelector(`li[data-chapter="${chapterId}"] a`);
                    if (activeLi) topicTitle = activeLi.textContent.trim();
                }
                
                if (secQuiz) {
                    // Update titles
                    const secNum = secQuiz.querySelector('.sec-num');
                    if (secNum) secNum.textContent = String(chapterId).padStart(2, '0');
                    const secTitle = secQuiz.querySelector('.sec-title');
                    if (secTitle) secTitle.textContent = `Quiz & Challenge ${chapterId}: ${topicTitle}`;
                    const secSub = secQuiz.querySelector('.sec-sub');
                    if (secSub) secSub.textContent = "Uji pemahaman dan selesaikan tantangan coding untuk lulus dari topik ini";

                    // Force it to be visible despite CSS rule
                    secQuiz.style.display = 'block';
                    secQuiz.style.setProperty('display', 'block', 'important');
                    practiceHtml += secQuiz.outerHTML;
                    secQuiz.remove();
                }

                if (practiceHtml) {
                    const backToMateriLink = `
                        <div style="margin-top: 40px; padding: 24px; background: rgba(246, 51, 146, 0.03); border: 1px dashed var(--fellow-pink); border-radius: 12px; text-align: center;">
                            <p style="margin-bottom: 16px; color: var(--fellow-text); font-size: 0.95rem;">Lupa teorinya atau butuh referensi untuk menjawab quiz?</p>
                            <a href="#/participant-${baseRoute}" class="btn btn-outline" style="display: inline-flex; align-items: center; gap: 8px; color: var(--fellow-pink); border: 1px solid var(--fellow-pink); padding: 10px 20px; border-radius: 100px; text-decoration: none; font-weight: 600; transition: all 0.2s;">
                                <i class="fas fa-book-open"></i> Kembali Baca Materi ${chapterId}: ${topicTitle}
                            </a>
                        </div>
                    `;

                    article.innerHTML = `
                        <div class="practice-challenges-container" style="display: flex; flex-direction: column; gap: 24px;">
                            ${practiceHtml}
                            ${backToMateriLink}
                        </div>
                    `;
                } else {
                    article.innerHTML = `<div style="padding: 40px; text-align: center; color: var(--fellow-muted);">Belum ada Quiz / Challenge untuk topik ini.</div>`;
                }
            } else {
                // Keep quiz section visible in materi mode (don't remove)
            }
            
            // Execute scripts inside the fetched HTML manually (e.g. OpenCV canvas scripts)
            const scripts = container.querySelectorAll("script");
            scripts.forEach(oldScript => {
                const newScript = document.createElement("script");
                Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
                newScript.appendChild(document.createTextNode(oldScript.innerHTML));
                oldScript.parentNode.replaceChild(newScript, oldScript);
            });

            // Force evaluate styles by appending them to the document head
            // Remove previous dynamically loaded CV styles to avoid duplication
            document.querySelectorAll("style[data-cv-dynamic]").forEach(el => el.remove());
            
            const styles = container.querySelectorAll("style");
            styles.forEach(oldStyle => {
                const newStyle = document.createElement("style");
                newStyle.setAttribute("data-cv-dynamic", "true");
                newStyle.textContent = oldStyle.innerHTML;
                document.head.appendChild(newStyle);
                oldStyle.remove();
            });

            // Initialize interactive widgets (canvas demos, sandbox, quiz, challenges)
            if (typeof window.initCvInteractives === 'function') {
                setTimeout(window.initCvInteractives, 300);
            }

            // Update Sidebar UI active states
            const sidebarList = document.getElementById(`${baseRoute}-sidebar-list`);
            if (sidebarList) {
                sidebarList.querySelectorAll("li").forEach(li => li.classList.remove("active"));
                const activeLi = sidebarList.querySelector(`li[data-chapter="${chapterId}"]`);
                if (activeLi) {
                    activeLi.classList.add("active");
                    // change icon
                    activeLi.querySelector("i").className = "far fa-circle-play";
                }
            }

            // Update Pagination Buttons
            const totalChapters = sidebarList ? sidebarList.querySelectorAll("li").length : 0;
            const btnPrev = document.getElementById("btn-prev-chapter");
            const btnNext = document.getElementById("btn-next-chapter");
            const btnFinish = document.getElementById("btn-finish-materi");

            // Execute legacy chapter initialization functions
            const initMap = {
                'cv-digital-image': {
                    1: window.initAiLabPixel,
                    2: window.initAiLabOpencv,
                    3: window.initAiLabFilteringKernels,
                    4: window.initAiLabMorph
                },
                'cv-cnn': {
                    1: window.initAiLabCnnIntro,
                    2: window.initAiLabCnnWhy,
                    3: window.initAiLabCnnRelu,
                    4: window.initAiLabCnnFc
                },
                'cv-advanced-cnn': {
                    1: window.initAiLabCnnArch,
                    2: window.initAiLabCnnArchBuilder,
                    3: window.initAiLabCnnHands
                }
            };
            
            // Allow a tiny delay for scripts to execute before calling the init function
            setTimeout(() => {
                if (initMap[baseRoute] && typeof initMap[baseRoute][chapterId] === 'function') {
                    initMap[baseRoute][chapterId]();
                }
            }, 100);

            if (btnPrev) {
                if (chapterId > 1) {
                    btnPrev.style.display = "block";
                    btnPrev.onclick = () => window.loadCvChapter(baseRoute, chapterId - 1, mode);
                    
                    let prevTopicTitle = "Topik " + (chapterId - 1);
                    if (sidebarList) {
                        const prevLi = sidebarList.querySelector(`li[data-chapter="${chapterId - 1}"] a`);
                        if (prevLi) prevTopicTitle = prevLi.textContent.trim();
                    }
                    const prefix = mode === 'practice' ? 'Quiz & Challenge' : 'Materi';
                    btnPrev.innerHTML = `<i class="fas fa-arrow-left" style="margin-right: 8px;"></i> ${prefix} ${chapterId - 1}`;
                } else {
                    btnPrev.style.display = "none";
                }
            }

            if (btnNext) {
                if (chapterId < totalChapters) {
                    btnNext.style.display = "block";
                    btnNext.onclick = () => window.loadCvChapter(baseRoute, chapterId + 1, mode);
                    if (btnFinish) btnFinish.style.display = "none";
                    
                    let nextTopicTitle = "Topik " + (chapterId + 1);
                    if (sidebarList) {
                        const nextLi = sidebarList.querySelector(`li[data-chapter="${chapterId + 1}"] a`);
                        if (nextLi) nextTopicTitle = nextLi.textContent.trim();
                    }
                    const prefix = mode === 'practice' ? 'Quiz & Challenge' : 'Materi';
                    btnNext.innerHTML = `Lanjut ke ${prefix} ${chapterId + 1}: ${nextTopicTitle} <i class="fas fa-arrow-right" style="margin-left: 8px;"></i>`;
                } else {
                    btnNext.style.display = "none";
                    if (btnFinish) btnFinish.style.display = "block";
                }
            }
        } catch (e) {
            container.innerHTML = `
                <div style="text-align: center; padding: 60px; color: var(--px-red);">
                    <i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-bottom: 16px;"></i>
                    <p>Terjadi kesalahan memuat materi: ${e.message}</p>
                </div>
            `;
        }
    };
    
    // Register global init functions for each sub-module
    window.initCvDigitalImage = function() {
        const chapterId = sessionStorage.getItem('cv_active_chapter_cv-digital-image') || 1;
        window.loadCvChapter('cv-digital-image', parseInt(chapterId), 'materi');
    };
    window.initCvDigitalImagePractice = function() {
        const chapterId = sessionStorage.getItem('cv_active_chapter_cv-digital-image') || 1;
        window.loadCvChapter('cv-digital-image', parseInt(chapterId), 'practice');
    };
    window.initCvCnn = function() {
        const chapterId = sessionStorage.getItem('cv_active_chapter_cv-cnn') || 1;
        window.loadCvChapter('cv-cnn', parseInt(chapterId), 'materi');
    };
    window.initCvCnnPractice = function() {
        const chapterId = sessionStorage.getItem('cv_active_chapter_cv-cnn') || 1;
        window.loadCvChapter('cv-cnn', parseInt(chapterId), 'practice');
    };
    window.initCvAdvancedCnn = function() {
        const chapterId = sessionStorage.getItem('cv_active_chapter_cv-advanced-cnn') || 1;
        window.loadCvChapter('cv-advanced-cnn', parseInt(chapterId), 'materi');
    };
})();
