(function () {
    const ML_BASE = "/pages/frontend/fellow-dashboard/foundation-core-ai/machine-learning";
    const STORAGE = {
        chapter: "heraiAiMlCurrentChapter",
        practice: "heraiAiMlPractice",
        quizDone: "heraiAiMlQuizDone",
        quizScore: "heraiAiMlQuizScore",
        quizAnswers: "heraiAiMlQuizAnswers",
        discussion: "heraiAiMlDiscussion"
    };

    const CHAPTERS = [
        {
            number: 1,
            route: "/participant-ai-lab-ml-intro",
            title: "Pengantar Machine Learning",
            shortTitle: "Pengantar"
        },
        {
            number: 2,
            route: "/participant-ai-lab-ml-supervised",
            aliases: ["/participant-ai-lab-ml-hypothesis"],
            title: "Supervised Learning",
            shortTitle: "Supervised"
        },
        {
            number: 3,
            route: "/participant-ai-lab-ml-regression-classification",
            aliases: ["/participant-ai-lab-ml-vc-dim", "/participant-ai-lab-ml-bias-variance"],
            title: "Regresi & Klasifikasi Dasar",
            shortTitle: "Regresi & Klasifikasi"
        },
        {
            number: 4,
            route: "/participant-ai-lab-ml-probabilistic",
            title: "Probabilistic Models",
            shortTitle: "Probabilistic"
        },
        {
            number: 5,
            route: "/participant-ai-lab-ml-linear-discriminative",
            title: "Linear Discriminative Models",
            shortTitle: "Linear Models"
        },
        {
            number: 6,
            route: "/participant-ai-lab-ml-svm",
            title: "Support Vector Machine",
            shortTitle: "SVM"
        },
        {
            number: 7,
            route: "/participant-ai-lab-ml-neural-networks",
            title: "Neural Networks",
            shortTitle: "Neural Networks"
        },
        {
            number: 8,
            route: "/participant-ai-lab-ml-unsupervised",
            title: "Unsupervised Learning",
            shortTitle: "Unsupervised"
        }
    ];

    const getPath = () => {
        const raw = (window.location.hash || "#/participant-ai-lab-ml").replace("#", "");
        const queryIndex = raw.indexOf("?");
        return queryIndex >= 0 ? raw.slice(0, queryIndex) : raw;
    };

    const getSavedTopik = () => {
        const saved = Number(localStorage.getItem(STORAGE.chapter));
        return Number.isInteger(saved) && saved >= 1 && saved <= CHAPTERS.length ? saved : 1;
    };

    const findChapterByRoute = (path) => {
        const match = CHAPTERS.find(chapter => chapter.route === path || (chapter.aliases || []).includes(path));
        if (match) return match.number;
        return null;
    };

    const safeJsonParse = (value, fallback) => {
        if (!value) return fallback;
        try {
            return JSON.parse(value);
        } catch (error) {
            return fallback;
        }
    };

    const escapeSelector = (value) => {
        if (window.CSS && typeof window.CSS.escape === "function") {
            return window.CSS.escape(value);
        }
        return String(value).replace(/["\\]/g, "\\$&");
    };

    const escapeHtml = (value) => String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

    const setStatus = (selector, message, tone) => {
        const status = document.querySelector(selector);
        if (!status) return;
        status.textContent = message;
        status.dataset.tone = tone || "neutral";
    };

    function updateChapterUi(chapterNumber) {
        const percentage = Math.round((chapterNumber / CHAPTERS.length) * 100);
        const currentTopik = CHAPTERS[chapterNumber - 1];

        document.querySelectorAll("#ml-sidebar-list li").forEach(item => {
            const isActive = Number(item.dataset.chapter) === chapterNumber;
            item.classList.toggle("active", isActive);
            item.classList.toggle("completed", Number(item.dataset.chapter) < chapterNumber);

            const icon = item.querySelector("i");
            if (icon) {
                icon.className = Number(item.dataset.chapter) < chapterNumber
                    ? "fas fa-circle-check"
                    : (isActive ? "far fa-circle-play" : "far fa-circle");
            }
        });

        document.querySelectorAll("[data-ml-progress-fill]").forEach(fill => {
            fill.style.setProperty("--value", `${percentage}%`);
        });

        document.querySelectorAll("[data-ml-progress-value]").forEach(node => {
            node.textContent = `${percentage}%`;
        });

        document.querySelectorAll("[data-ml-progress-text]").forEach(node => {
            node.textContent = `${chapterNumber} dari ${CHAPTERS.length} materi selesai`;
        });

        document.querySelectorAll("[data-ml-current-title]").forEach(node => {
            node.textContent = currentChapter.title;
        });

        const prevButton = document.getElementById("btn-prev-chapter");
        const nextButton = document.getElementById("btn-next-chapter");
        const finishButton = document.getElementById("btn-finish-materi");

        if (prevButton) {
            prevButton.hidden = chapterNumber === 1;
            prevButton.dataset.targetTopik = String(chapterNumber - 1);
        }

        if (nextButton) {
            nextButton.hidden = chapterNumber === CHAPTERS.length;
            nextButton.dataset.targetTopik = String(chapterNumber + 1);
        }

        if (finishButton) {
            finishButton.hidden = chapterNumber !== CHAPTERS.length;
        }
    }

    function navigateToChapter(chapterNumber) {
        const target = CHAPTERS[chapterNumber - 1];
        if (!target) return;

        const nextHash = `#${target.route}`;
        if (window.location.hash !== nextHash) {
            window.location.hash = nextHash;
            return;
        }

        loadMlChapter(chapterNumber, { syncHash: false });
    }

    async function loadMlChapter(chapterNumber, options = {}) {
        const container = document.getElementById("ml-chapter-container");
        if (!container) return;

        const target = Math.min(Math.max(Number(chapterNumber) || 1, 1), CHAPTERS.length);
        if (options.syncHash) {
            navigateToChapter(target);
            return;
        }

        localStorage.setItem(STORAGE.chapter, String(target));
        updateChapterUi(target);

        container.innerHTML = `
            <div class="ml-loading-state">
                <i class="fas fa-spinner fa-spin"></i>
                <p>Memuat materi Machine Learning...</p>
            </div>
        `;

        try {
            const response = await fetch(`${ML_BASE}/chapters/chapter-${target}.html`);
            if (!response.ok) throw new Error("Topik tidak ditemukan");
            container.innerHTML = await response.text();
            updateChapterUi(target);
            container.querySelectorAll("[data-ml-next]").forEach(link => {
                const next = Number(link.dataset.mlNext);
                link.addEventListener("click", event => {
                    event.preventDefault();
                    navigateToChapter(next);
                });
            });
        } catch (error) {
            container.innerHTML = `
                <div class="ml-error-state">
                    <i class="fas fa-circle-exclamation"></i>
                    <h2>Materi belum bisa dimuat</h2>
                    <p>Silakan refresh halaman atau buka daftar materi dari sidebar.</p>
                </div>
            `;
            console.error("Gagal memuat chapter ML:", error);
        }
    }

    window.loadMlTopik = function (chapterNumber) {
        navigateToChapter(Number(chapterNumber));
    };

    window.initAiMlMateri = function () {
        const path = getPath();
        const routeTopik = findChapterByRoute(path);
        const initialTopik = routeTopik || getSavedChapter();

        document.querySelectorAll("[data-ml-chapter]").forEach(link => {
            link.addEventListener("click", event => {
                const chapterNumber = Number(link.dataset.mlChapter);
                if (!chapterNumber) return;
                event.preventDefault();
                navigateToChapter(chapterNumber);
            });
        });

        const prevButton = document.getElementById("btn-prev-chapter");
        const nextButton = document.getElementById("btn-next-chapter");

        if (prevButton) {
            prevButton.addEventListener("click", () => {
                navigateToChapter(Number(prevButton.dataset.targetChapter));
            });
        }

        if (nextButton) {
            nextButton.addEventListener("click", () => {
                navigateToChapter(Number(nextButton.dataset.targetChapter));
            });
        }

        loadMlChapter(initialChapter, { syncHash: false });
    };

    function getPracticePayload(form) {
        const answers = {};
        form.querySelectorAll("textarea, select").forEach(field => {
            if (!field.name) return;
            answers[field.name] = field.value.trim();
        });

        return {
            updatedAt: new Date().toISOString(),
            answers
        };
    }

    function restorePractice(form) {
        const saved = safeJsonParse(localStorage.getItem(STORAGE.practice), null);
        if (!saved || !saved.answers) return false;

        Object.entries(saved.answers).forEach(([name, value]) => {
            const field = form.querySelector(`[name="${escapeSelector(name)}"]`);
            if (field) field.value = value;
        });

        return true;
    }

    function updatePracticeFeedback(form) {
        form.querySelectorAll("[data-feedback-for]").forEach(box => {
            const target = form.querySelector(`[name="${escapeSelector(box.dataset.feedbackFor)}"]`);
            const value = target ? target.value.trim() : "";
            box.hidden = !value;
            if (value) {
                box.innerHTML = `<i class="fas fa-circle-check"></i><span>${box.dataset.feedback || "Jawaban tersimpan. Pastikan alasanmu spesifik dan berbasis data."}</span>`;
            }
        });
    }

    function setPracticeReadonly(form, readonly) {
        form.querySelectorAll("textarea, select").forEach(field => {
            field.disabled = readonly;
        });
        form.classList.toggle("is-saved", readonly);
    }

    window.initAiMlBasic = function () {
        const form = document.getElementById("aiMlPracticeForm");
        if (!form) return;

        const restored = restorePractice(form);
        updatePracticeFeedback(form);
        setStatus("#aiMlPracticeStatus", restored ? "Jawaban terakhir berhasil dipulihkan dari browsermu." : "Jawaban akan tersimpan di browsermu.", restored ? "success" : "neutral");

        form.querySelectorAll("textarea, select").forEach(field => {
            field.addEventListener("input", () => updatePracticeFeedback(form));
            field.addEventListener("change", () => updatePracticeFeedback(form));
        });

        const saveButton = form.querySelector("[data-practice-save]");
        const editButton = form.querySelector("[data-practice-edit]");
        const deleteButton = form.querySelector("[data-practice-delete]");

        if (saveButton) {
            saveButton.addEventListener("click", () => {
                localStorage.setItem(STORAGE.practice, JSON.stringify(getPracticePayload(form)));
                updatePracticeFeedback(form);
                setPracticeReadonly(form, true);
                setStatus("#aiMlPracticeStatus", "Latihan ML tersimpan. Kamu bisa lanjut ke kuis atau edit lagi bila perlu.", "success");
            });
        }

        if (editButton) {
            editButton.addEventListener("click", () => {
                setPracticeReadonly(form, false);
                setStatus("#aiMlPracticeStatus", "Mode edit aktif. Jangan lupa simpan ulang setelah mengubah jawaban.", "neutral");
            });
        }

        if (deleteButton) {
            deleteButton.addEventListener("click", () => {
                localStorage.removeItem(STORAGE.practice);
                form.reset();
                setPracticeReadonly(form, false);
                updatePracticeFeedback(form);
                setStatus("#aiMlPracticeStatus", "Jawaban latihan dihapus dari browser ini.", "neutral");
            });
        }
    };

    function getQuizGroups(form) {
        const names = Array.from(new Set(
            Array.from(form.querySelectorAll('input[type="radio"]')).map(input => input.name)
        ));
        return names;
    }

    function getQuizAnswers(form) {
        return getQuizGroups(form).reduce((acc, name) => {
            const checked = form.querySelector(`input[name="${escapeSelector(name)}"]:checked`);
            acc[name] = checked ? checked.value : "";
            return acc;
        }, {});
    }

    function renderQuizResult(form, score, total, message) {
        const result = document.getElementById("aiMlQuizResult");
        if (!result) return;
        const percent = Math.round((score / total) * 100);
        result.hidden = false;
        result.innerHTML = `
            <strong>Skor kamu: ${score}/${total} (${percent}%)</strong>
            <span>${message || "Review pembahasan di tiap soal untuk memperkuat konsep."}</span>
        `;

        const quizDone = localStorage.getItem(STORAGE.quizDone) === "true";
        if (quizDone && (location.hostname === "localhost" || location.hostname === "127.0.0.1") && !result.querySelector("[data-quiz-reset]")) {
            const resetButton = document.createElement("button");
            resetButton.type = "button";
            resetButton.className = "ml-dev-reset";
            resetButton.dataset.quizReset = "true";
            resetButton.textContent = "Reset Dev";
            resetButton.addEventListener("click", () => {
                localStorage.removeItem(STORAGE.quizDone);
                localStorage.removeItem(STORAGE.quizScore);
                localStorage.removeItem(STORAGE.quizAnswers);
                window.initAiMlQuiz();
            });
            result.appendChild(resetButton);
        }
    }

    function lockQuiz(form, answers) {
        form.querySelectorAll('input[type="radio"]').forEach(input => {
            input.disabled = true;
            if (answers && answers[input.name] === input.value) input.checked = true;
        });

        form.querySelectorAll(".quiz-list article").forEach(article => {
            const selected = article.querySelector('input[type="radio"]:checked');
            const explanation = article.dataset.explanation || "Pembahasan belum tersedia.";

            article.querySelectorAll("label").forEach(label => {
                const input = label.querySelector("input");
                const isCorrect = input && input.value === "1";
                const isSelected = input && selected && input === selected;
                label.classList.toggle("is-correct", Boolean(isCorrect));
                label.classList.toggle("is-wrong", Boolean(isSelected && !isCorrect));
            });

            let explanationBox = article.querySelector(".quiz-explanation");
            if (!explanationBox) {
                explanationBox = document.createElement("p");
                explanationBox.className = "quiz-explanation";
                article.appendChild(explanationBox);
            }
            explanationBox.innerHTML = `<i class="fas fa-lightbulb"></i> ${escapeHtml(explanation)}`;
        });

        const submitButton = form.querySelector(".quiz-submit-btn");
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Kuis Sudah Dikirim";
        }

        const next = document.getElementById("aiMlQuizNext");
        if (next) next.classList.remove("is-disabled");
    }

    window.initAiMlQuiz = function () {
        const form = document.getElementById("aiMlQuizForm");
        if (!form) return;

        form.querySelectorAll(".quiz-explanation").forEach(node => node.remove());
        form.querySelectorAll("label").forEach(label => label.classList.remove("is-correct", "is-wrong"));
        form.querySelectorAll('input[type="radio"]').forEach(input => {
            input.disabled = false;
            input.checked = false;
        });

        const groups = getQuizGroups(form);
        const isDone = localStorage.getItem(STORAGE.quizDone) === "true";
        if (isDone) {
            const answers = safeJsonParse(localStorage.getItem(STORAGE.quizAnswers), {});
            if (Object.keys(answers).length !== groups.length) {
                localStorage.removeItem(STORAGE.quizDone);
                localStorage.removeItem(STORAGE.quizScore);
                localStorage.removeItem(STORAGE.quizAnswers);
                window.initAiMlQuiz();
                return;
            }

            const score = Number(localStorage.getItem(STORAGE.quizScore)) || 0;
            renderQuizResult(form, score, groups.length, "Kuis ini single attempt. Jawaban dan pembahasan sudah dikunci.");
            lockQuiz(form, answers);
            return;
        }

        const result = document.getElementById("aiMlQuizResult");
        if (result) {
            result.hidden = true;
            result.innerHTML = "";
        }

        const next = document.getElementById("aiMlQuizNext");
        if (next) next.classList.add("is-disabled");

        form.addEventListener("submit", event => {
            event.preventDefault();
            const answers = getQuizAnswers(form);
            const unanswered = groups.filter(name => !answers[name]);
            if (unanswered.length) {
                renderQuizResult(form, 0, groups.length, `Masih ada ${unanswered.length} soal yang belum dijawab.`);
                return;
            }

            const score = groups.reduce((total, name) => total + (answers[name] === "1" ? 1 : 0), 0);
            localStorage.setItem(STORAGE.quizDone, "true");
            localStorage.setItem(STORAGE.quizScore, String(score));
            localStorage.setItem(STORAGE.quizAnswers, JSON.stringify(answers));

            renderQuizResult(form, score, groups.length, "Pembahasan sudah dibuka. Gunakan ini untuk membaca ulang materi yang belum kuat.");
            lockQuiz(form, answers);
        });
    };

    const DISCUSSION_PROMPTS = [
        "Ceritakan satu kasus di sekitarmu yang cocok diselesaikan dengan ML, bukan rule-based biasa.",
        "Bagaimana kamu menentukan fitur, label, loss, dan metrik untuk masalah supervised learning?",
        "Kapan kamu memilih regresi, klasifikasi, decision tree, random forest, atau k-NN?",
        "Apa risiko asumsi independen pada Naive Bayes, dan kapan asumsi itu masih berguna?",
        "Mana yang lebih penting untuk kasus sensitif: akurasi tinggi, recall tinggi, atau model yang mudah dijelaskan?",
        "Bagaimana margin, support vector, dan kernel membantu SVM memisahkan data non-linear?",
        "Apa tantangan utama melatih neural network agar tidak overfit atau gagal belajar?",
        "Kapan clustering atau reduksi dimensi lebih tepat dibanding supervised learning?"
    ];

    function getDiscussionPosts() {
        const saved = safeJsonParse(localStorage.getItem(STORAGE.discussion), null);
        if (Array.isArray(saved)) {
            const missingPrompts = DISCUSSION_PROMPTS.filter(prompt => !saved.some(post => post.prompt === prompt));
            if (!missingPrompts.length) return saved;

            const migrated = [
                ...missingPrompts.map((prompt, index) => ({
                    id: `seed-new-${index + 1}`,
                    prompt,
                    text: "Gunakan prompt ini sebagai titik mulai diskusi.",
                    createdAt: new Date().toISOString(),
                    replies: []
                })),
                ...saved
            ];
            saveDiscussionPosts(migrated);
            return migrated;
        }

        return DISCUSSION_PROMPTS.map((prompt, index) => ({
            id: `seed-${index + 1}`,
            prompt,
            text: "Gunakan prompt ini sebagai titik mulai diskusi.",
            createdAt: new Date().toISOString(),
            replies: []
        }));
    }

    function saveDiscussionPosts(posts) {
        localStorage.setItem(STORAGE.discussion, JSON.stringify(posts));
    }

    function renderDiscussion(posts) {
        const list = document.getElementById("aiMlDiscussionList");
        if (!list) return;

        if (!posts.length) {
            list.innerHTML = `<div class="ml-empty-state">Belum ada diskusi. Jadilah yang pertama membuka percakapan.</div>`;
            return;
        }

        list.innerHTML = posts.map((post, index) => {
            const initials = post.id && post.id.startsWith("seed") ? "H" : "A";
            const replies = Array.isArray(post.replies) ? post.replies : [];
            return `
                <article class="discussion-bubble" data-discussion-id="${escapeHtml(post.id)}">
                    <div>
                        <span>${initials}</span>
                        <strong>${post.id && post.id.startsWith("seed") ? "HerAI Prompt" : "Aisyah Putri"}</strong>
                        <small>${new Date(post.createdAt).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" })}</small>
                    </div>
                    <p><b>${escapeHtml(post.prompt)}</b></p>
                    <p>${escapeHtml(post.text)}</p>
                    <button type="button" data-reply="${escapeHtml(post.id)}"><i class="far fa-message"></i> Balas</button>
                    <div class="discussion-replies">
                        ${replies.map(reply => `
                            <article>
                                <strong>Aisyah Putri</strong>
                                <small>${new Date(reply.createdAt).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" })}</small>
                                <p>${escapeHtml(reply.text)}</p>
                            </article>
                        `).join("")}
                    </div>
                </article>
            `;
        }).join("");

        list.querySelectorAll("[data-reply]").forEach(button => {
            button.addEventListener("click", () => {
                const text = window.prompt("Tulis balasan singkat untuk thread ini:");
                if (!text || !text.trim()) return;

                const nextPosts = getDiscussionPosts();
                const target = nextPosts.find(post => post.id === button.dataset.reply);
                if (!target) return;
                target.replies = Array.isArray(target.replies) ? target.replies : [];
                target.replies.push({
                    text: text.trim(),
                    createdAt: new Date().toISOString()
                });
                saveDiscussionPosts(nextPosts);
                renderDiscussion(nextPosts);
            });
        });
    }

    window.initAiMlDiscussion = function () {
        const form = document.getElementById("aiMlDiscussionForm");
        const textarea = form ? form.querySelector("textarea") : null;
        const select = form ? form.querySelector("select") : null;
        let posts = getDiscussionPosts();

        renderDiscussion(posts);

        document.querySelectorAll("[data-discussion-prompt]").forEach(button => {
            button.addEventListener("click", () => {
                if (select) select.value = button.dataset.discussionPrompt;
                if (textarea && !textarea.value.trim()) {
                    textarea.value = `${button.dataset.discussionPrompt}\n\n`;
                    textarea.focus();
                }
            });
        });

        if (!form || !textarea || !select) return;

        form.addEventListener("submit", event => {
            event.preventDefault();
            const text = textarea.value.trim();
            if (!text) {
                setStatus("#aiMlDiscussionStatus", "Tulis isi diskusi terlebih dahulu.", "warning");
                return;
            }

            posts = getDiscussionPosts();
            posts.unshift({
                id: `post-${Date.now()}`,
                prompt: select.value,
                text,
                createdAt: new Date().toISOString(),
                replies: []
            });
            saveDiscussionPosts(posts);
            form.reset();
            setStatus("#aiMlDiscussionStatus", "Diskusi berhasil diposting dan tersimpan di browser ini.", "success");
            renderDiscussion(posts);
        });
    };
})();
