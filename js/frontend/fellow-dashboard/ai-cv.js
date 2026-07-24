(function () {
    const CV_BASE_PATH = "/pages/frontend/fellow-dashboard/data-engineering-domains/computer-vision/";
    
    // Mapping base routes to their internal folder names
    const folderMap = {
        'cv-digital-image': '01-digital-image-fundamentals',
        'cv-cnn': '02-convolutional-neural-networks',
        'cv-advanced-cnn': '03-advanced-cnn-architectures'
    };

    window.loadCvChapter = async function(baseRoute, chapterId) {
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
                // Optionally remove it from the container to keep it clean
                oldStyle.remove();
            });

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
                    btnPrev.onclick = () => window.loadCvChapter(baseRoute, chapterId - 1);
                } else {
                    btnPrev.style.display = "none";
                }
            }

            if (btnNext) {
                if (chapterId < totalChapters) {
                    btnNext.style.display = "block";
                    btnNext.onclick = () => window.loadCvChapter(baseRoute, chapterId + 1);
                    if (btnFinish) btnFinish.style.display = "none";
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
        window.loadCvChapter('cv-digital-image', 1);
    };
    window.initCvCnn = function() {
        window.loadCvChapter('cv-cnn', 1);
    };
    window.initCvAdvancedCnn = function() {
        window.loadCvChapter('cv-advanced-cnn', 1);
    };
})();
