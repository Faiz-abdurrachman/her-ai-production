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
        "/participant-ai-lab-culture": "/pages/frontend/fellow-dashboard/business-industry-application/ai-culture/materi.html",
        "/participant-ai-lab-culture-practice": "/pages/frontend/fellow-dashboard/business-industry-application/ai-culture/latihan.html",
        "/participant-ai-lab-culture-quiz": "/pages/frontend/fellow-dashboard/business-industry-application/ai-culture/kuis.html",
        "/participant-ai-lab-culture-discussion": "/pages/frontend/fellow-dashboard/business-industry-application/ai-culture/diskusi.html",
        "/participant-ai-lab-large-language-model": "/pages/frontend/fellow-dashboard/generative-multimodal-ai/large-language-model/materi.html",
        "/participant-ai-lab-large-language-model-practice": "/pages/frontend/fellow-dashboard/generative-multimodal-ai/large-language-model/latihan.html",
        "/participant-ai-lab-large-language-model-quiz": "/pages/frontend/fellow-dashboard/generative-multimodal-ai/large-language-model/kuis.html",
        "/participant-ai-lab-large-language-model-discussion": "/pages/frontend/fellow-dashboard/generative-multimodal-ai/large-language-model/diskusi.html",
        "/": "/pages/frontend/home.html",
        "/home": "/pages/frontend/home.html",
        "/projects": "/pages/frontend/projects.html",
        "/announcement": "/pages/frontend/announcement.html",
        "/announcement-stage-1": "/pages/frontend/announcement.html",
        "/announcement-stage-2": "/pages/frontend/announcement.html",
        "/announcement-final": "/pages/frontend/announcement.html",
        "/wall-of-fame": "/pages/frontend/wall-of-fame.html",
        "/leaderboard": "/pages/frontend/leaderboard.html",
        "/graduation": "/pages/frontend/graduation.html",
        "/register": "/pages/frontend/register.html",
        "/profile": "/pages/frontend/participant-login.html",
        "/participant-login": "/pages/frontend/participant-login.html",
        "/participant-profile": "/pages/frontend/fellow-dashboard/profile.html",
        "/participant-dashboard": "/pages/frontend/fellow-dashboard/dashboard.html",
        "/participant-modules": "/pages/frontend/fellow-dashboard/modules.html",
        "/participant-ai-fundamentals": "/pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/overview.html",
        "/participant-ai-intro": "/pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/01-pengantar-ai/materi.html",
        "/participant-ai-intro-practice": "/pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/01-pengantar-ai/latihan.html",
        "/participant-ai-intro-quiz": "/pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/01-pengantar-ai/kuis.html",
        "/participant-ai-intro-discussion": "/pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/01-pengantar-ai/diskusi.html",
        "/participant-ai-history": "/pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/01-pengantar-ai/lesson.html",
        "/participant-ai-types": "/pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/01-pengantar-ai/lesson.html",
        "/participant-ai-components": "/pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/01-pengantar-ai/lesson.html",
        "/participant-ai-applications": "/pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/01-pengantar-ai/lesson.html",
        "/participant-ai-pipeline": "/pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/01-pengantar-ai/lesson.html",
        "/participant-ai-ml-dl": "/pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/01-pengantar-ai/lesson.html",
        "/participant-ai-pros-cons": "/pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/01-pengantar-ai/lesson.html",
        "/participant-ai-ethics": "/pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/01-pengantar-ai/lesson.html",
        "/participant-ai-future": "/pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/01-pengantar-ai/lesson.html",
        "/participant-ai-summary": "/pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/01-pengantar-ai/lesson.html",
        "/participant-ai-python": "/pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/02-python-untuk-ai/materi.html",
        "/participant-ai-python-practice": "/pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/02-python-untuk-ai/latihan.html",
        "/participant-ai-python-quiz": "/pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/02-python-untuk-ai/kuis.html",
        "/participant-ai-python-kuis": "/pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/02-python-untuk-ai/kuis.html",
        "/participant-ai-python-discussion": "/pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/02-python-untuk-ai/diskusi.html",

        "/participant-under-development": "/pages/frontend/fellow-dashboard/under-development.html",
        "/participant-ai-modern": "/pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/03-konsep-ai-modern/materi.html",
        "/participant-ai-modern-practice": "/pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/03-konsep-ai-modern/latihan.html",
        "/participant-ai-modern-quiz": "/pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/03-konsep-ai-modern/kuis.html",
        "/participant-ai-modern-discussion": "/pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/03-konsep-ai-modern/diskusi.html",
        "/participant-ai-reasoning": "/pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/04-reasoning/materi.html",
        "/participant-ai-reasoning-practice": "/pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/04-reasoning/latihan.html",
        "/participant-ai-reasoning-quiz": "/pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/04-reasoning/kuis.html",
        "/participant-ai-reasoning-discussion": "/pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/04-reasoning/diskusi.html",
        "/participant-ai-evaluation": "/pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-advanced/05-evaluation/materi.html",
        "/participant-ai-evolution": "/pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-advanced/06-evolution-of-ai/materi.html",
        "/participant-mentor": "/pages/frontend/fellow-dashboard/mentor.html",
        "/participant-tasks": "/pages/frontend/fellow-dashboard/tasks.html",
        "/participant-projects": "/pages/frontend/fellow-dashboard/projects.html",
        "/participant-events": "/pages/frontend/fellow-dashboard/events.html",
        "/participant-community": "/pages/frontend/fellow-dashboard/community.html",
        "/participant-certificates": "/pages/frontend/fellow-dashboard/certificates.html",
        "/participant-leaderboard": "/pages/frontend/fellow-dashboard/leaderboard.html",
        "/participant-help": "/pages/frontend/fellow-dashboard/help.html",
        "/participant-settings": "/pages/frontend/fellow-dashboard/settings.html",
        "/participant-ai-lab-tokenization": "/pages/frontend/fellow-dashboard/under-development.html",
        "/participant-ai-lab-preprocessing": "/pages/frontend/fellow-dashboard/under-development.html",
        "/participant-ai-lab-pos-ner": "/pages/frontend/fellow-dashboard/under-development.html",
        "/participant-ai-lab-bow": "/pages/frontend/fellow-dashboard/under-development.html",
        "/participant-ai-lab-tfidf": "/pages/frontend/fellow-dashboard/under-development.html",
        "/participant-ai-lab-nlp": "/pages/frontend/fellow-dashboard/under-development.html",
        "/participant-ai-lab-machine-learning": "/pages/frontend/fellow-dashboard/under-development.html",
        "/participant-ai-lab-ml": "/pages/frontend/fellow-dashboard/under-development.html",
        "/participant-ai-lab-ml-practice": "/pages/frontend/fellow-dashboard/under-development.html",
        "/participant-ai-lab-ml-quiz": "/pages/frontend/fellow-dashboard/under-development.html",
        "/participant-ai-lab-ml-discussion": "/pages/frontend/fellow-dashboard/under-development.html",
        "/participant-ai-lab-ml-intro": "/pages/frontend/fellow-dashboard/under-development.html",
        "/participant-ai-lab-ml-hypothesis": "/pages/frontend/fellow-dashboard/under-development.html",
        "/participant-ai-lab-ml-vc-dim": "/pages/frontend/fellow-dashboard/under-development.html",
        "/participant-ai-lab-ml-bias-variance": "/pages/frontend/fellow-dashboard/under-development.html",
        "/participant-ai-lab-ml-supervised": "/pages/frontend/fellow-dashboard/under-development.html",
        "/participant-ai-lab-ml-regression-classification": "/pages/frontend/fellow-dashboard/under-development.html",
        "/participant-ai-lab-ml-probabilistic": "/pages/frontend/fellow-dashboard/under-development.html",
        "/participant-ai-lab-ml-linear-discriminative": "/pages/frontend/fellow-dashboard/under-development.html",
        "/participant-ai-lab-ml-svm": "/pages/frontend/fellow-dashboard/under-development.html",
        "/participant-ai-lab-ml-neural-networks": "/pages/frontend/fellow-dashboard/under-development.html",
        "/participant-ai-lab-ml-unsupervised": "/pages/frontend/fellow-dashboard/under-development.html",
        "/participant-ai-lab-math": "/pages/frontend/fellow-dashboard/under-development.html",
        "/participant-ai-lab-math-intro": "/pages/frontend/fellow-dashboard/under-development.html",
        "/participant-ai-lab-math-linear-algebra": "/pages/frontend/fellow-dashboard/under-development.html",
        "/participant-ai-lab-math-statistics": "/pages/frontend/fellow-dashboard/under-development.html",
        "/participant-ai-lab-math-probability": "/pages/frontend/fellow-dashboard/under-development.html",
        "/participant-ai-lab-math-calculus": "/pages/frontend/fellow-dashboard/under-development.html",
        "/participant-ai-lab-math-optimization": "/pages/frontend/fellow-dashboard/under-development.html",
        "/participant-ai-lab-math-case-study": "/pages/frontend/fellow-dashboard/under-development.html",
        "/participant-ai-lab-math-practice": "/pages/frontend/fellow-dashboard/under-development.html",
        "/participant-ai-lab-math-quiz": "/pages/frontend/fellow-dashboard/under-development.html",
        "/participant-ai-lab-math-discussion": "/pages/frontend/fellow-dashboard/under-development.html",
        "/participant-ai-lab-cv": "/pages/frontend/fellow-dashboard/under-development.html",
        "/participant-ai-lab-gen": "/pages/frontend/fellow-dashboard/under-development.html",
        "/participant-ai-lab-deep-learning": "/pages/frontend/fellow-dashboard/foundation-core-ai/deep-learning/materi.html",
        "/participant-ai-lab-deep-learning-practice": "/pages/frontend/fellow-dashboard/foundation-core-ai/deep-learning/latihan.html",
        "/participant-ai-lab-deep-learning-quiz": "/pages/frontend/fellow-dashboard/foundation-core-ai/deep-learning/kuis.html",
        "/participant-ai-lab-deep-learning-discussion": "/pages/frontend/fellow-dashboard/foundation-core-ai/deep-learning/diskusi.html",
        "/participant-ai-lab-reinforcement-learning": "/pages/frontend/fellow-dashboard/foundation-core-ai/reinforcement-learning/materi.html",
        "/participant-ai-lab-reinforcement-learning-practice": "/pages/frontend/fellow-dashboard/foundation-core-ai/reinforcement-learning/latihan.html",
        "/participant-ai-lab-reinforcement-learning-quiz": "/pages/frontend/fellow-dashboard/foundation-core-ai/reinforcement-learning/kuis.html",
        "/participant-ai-lab-reinforcement-learning-discussion": "/pages/frontend/fellow-dashboard/foundation-core-ai/reinforcement-learning/diskusi.html",
        "/participant-ai-lab-llm": "/pages/frontend/fellow-dashboard/under-development.html",
        "/participant-ai-lab-vlm": "/pages/frontend/fellow-dashboard/generative-multimodal-ai/vlm/materi.html",
        "/participant-ai-lab-vlm-practice": "/pages/frontend/fellow-dashboard/generative-multimodal-ai/vlm/latihan.html",
        "/participant-ai-lab-vlm-quiz": "/pages/frontend/fellow-dashboard/generative-multimodal-ai/vlm/kuis.html",
        "/participant-ai-lab-vlm-discussion": "/pages/frontend/fellow-dashboard/generative-multimodal-ai/vlm/diskusi.html",
        "/participant-ai-lab-multimodal-llm": "/pages/frontend/fellow-dashboard/generative-multimodal-ai/multimodal-llm/materi.html",
        "/participant-ai-lab-multimodal-llm-practice": "/pages/frontend/fellow-dashboard/generative-multimodal-ai/multimodal-llm/latihan.html",
        "/participant-ai-lab-multimodal-llm-quiz": "/pages/frontend/fellow-dashboard/generative-multimodal-ai/multimodal-llm/kuis.html",
        "/participant-ai-lab-multimodal-llm-discussion": "/pages/frontend/fellow-dashboard/generative-multimodal-ai/multimodal-llm/diskusi.html",
        "/participant-ai-lab-agentic-ai": "/pages/frontend/fellow-dashboard/generative-multimodal-ai/agentic-ai/materi.html",
        "/participant-ai-lab-agentic-ai-practice": "/pages/frontend/fellow-dashboard/generative-multimodal-ai/agentic-ai/latihan.html",
        "/participant-ai-lab-agentic-ai-quiz": "/pages/frontend/fellow-dashboard/generative-multimodal-ai/agentic-ai/kuis.html",
        "/participant-ai-lab-agentic-ai-discussion": "/pages/frontend/fellow-dashboard/generative-multimodal-ai/agentic-ai/diskusi.html",
        "/participant-ai-lab-bioinformatics": "/pages/frontend/fellow-dashboard/data-engineering-domain/bioinformatics/materi.html",
        "/participant-ai-lab-bioinformatics-practice": "/pages/frontend/fellow-dashboard/data-engineering-domain/bioinformatics/latihan.html",
        "/participant-ai-lab-bioinformatics-quiz": "/pages/frontend/fellow-dashboard/data-engineering-domain/bioinformatics/kuis.html",
        "/participant-ai-lab-bioinformatics-discussion": "/pages/frontend/fellow-dashboard/data-engineering-domain/bioinformatics/diskusi.html",
        "/participant-ai-lab-data-engineering": "/pages/frontend/fellow-dashboard/data-engineering-domain/data-engineering/materi.html",
        "/participant-ai-lab-data-engineering-practice": "/pages/frontend/fellow-dashboard/data-engineering-domain/data-engineering/latihan.html",
        "/participant-ai-lab-data-engineering-quiz": "/pages/frontend/fellow-dashboard/data-engineering-domain/data-engineering/kuis.html",
        "/participant-ai-lab-data-engineering-discussion": "/pages/frontend/fellow-dashboard/data-engineering-domain/data-engineering/diskusi.html",
        "/participant-ai-lab-data-science": "/pages/frontend/fellow-dashboard/data-engineering-domain/data-science/materi.html",
        "/participant-ai-lab-data-science-practice": "/pages/frontend/fellow-dashboard/data-engineering-domain/data-science/latihan.html",
        "/participant-ai-lab-data-science-quiz": "/pages/frontend/fellow-dashboard/data-engineering-domain/data-science/kuis.html",
        "/participant-ai-lab-data-science-discussion": "/pages/frontend/fellow-dashboard/data-engineering-domain/data-science/diskusi.html",
        "/participant-ai-lab-infrastructure": "/pages/frontend/fellow-dashboard/data-engineering-domain/infrastructure/materi.html",
        "/participant-ai-lab-infrastructure-practice": "/pages/frontend/fellow-dashboard/data-engineering-domain/infrastructure/latihan.html",
        "/participant-ai-lab-infrastructure-quiz": "/pages/frontend/fellow-dashboard/data-engineering-domain/infrastructure/kuis.html",
        "/participant-ai-lab-infrastructure-discussion": "/pages/frontend/fellow-dashboard/data-engineering-domain/infrastructure/diskusi.html",
        "/participant-ai-lab-deployment": "/pages/frontend/fellow-dashboard/data-engineering-domain/deployment/materi.html",
        "/participant-ai-lab-deployment-practice": "/pages/frontend/fellow-dashboard/data-engineering-domain/deployment/latihan.html",
        "/participant-ai-lab-deployment-quiz": "/pages/frontend/fellow-dashboard/data-engineering-domain/deployment/kuis.html",
        "/participant-ai-lab-deployment-discussion": "/pages/frontend/fellow-dashboard/data-engineering-domain/deployment/diskusi.html",
        "/participant-ai-lab-front-end": "/pages/frontend/fellow-dashboard/data-engineering-domain/front-end/materi.html",
        "/participant-ai-lab-front-end-practice": "/pages/frontend/fellow-dashboard/data-engineering-domain/front-end/latihan.html",
        "/participant-ai-lab-front-end-quiz": "/pages/frontend/fellow-dashboard/data-engineering-domain/front-end/kuis.html",
        "/participant-ai-lab-front-end-discussion": "/pages/frontend/fellow-dashboard/data-engineering-domain/front-end/diskusi.html",
        "/participant-ai-lab-back-end": "/pages/frontend/fellow-dashboard/data-engineering-domain/back-end/materi.html",
        "/participant-ai-lab-back-end-practice": "/pages/frontend/fellow-dashboard/data-engineering-domain/back-end/latihan.html",
        "/participant-ai-lab-back-end-quiz": "/pages/frontend/fellow-dashboard/data-engineering-domain/back-end/kuis.html",
        "/participant-ai-lab-back-end-discussion": "/pages/frontend/fellow-dashboard/data-engineering-domain/back-end/diskusi.html",
        "/participant-ai-lab-business-insight": "/pages/frontend/fellow-dashboard/business-industry-application/business-insight/materi.html",
        "/participant-ai-lab-business-insight-practice": "/pages/frontend/fellow-dashboard/business-industry-application/business-insight/latihan.html",
        "/participant-ai-lab-business-insight-quiz": "/pages/frontend/fellow-dashboard/business-industry-application/business-insight/kuis.html",
        "/participant-ai-lab-business-insight-discussion": "/pages/frontend/fellow-dashboard/business-industry-application/business-insight/diskusi.html",
        "/participant-ai-lab-people-business-mgt": "/pages/frontend/fellow-dashboard/business-industry-application/people-business-mgt/materi.html",
        "/participant-ai-lab-people-business-mgt-practice": "/pages/frontend/fellow-dashboard/business-industry-application/people-business-mgt/latihan.html",
        "/participant-ai-lab-people-business-mgt-quiz": "/pages/frontend/fellow-dashboard/business-industry-application/people-business-mgt/kuis.html",
        "/participant-ai-lab-people-business-mgt-discussion": "/pages/frontend/fellow-dashboard/business-industry-application/people-business-mgt/diskusi.html",
        "/participant-ai-lab-ai-culture": "/pages/frontend/fellow-dashboard/under-development.html",
        "/participant-ai-lab-healthcare": "/pages/frontend/fellow-dashboard/business-industry-application/healthcare/materi.html",
        "/participant-ai-lab-healthcare-practice": "/pages/frontend/fellow-dashboard/business-industry-application/healthcare/latihan.html",
        "/participant-ai-lab-healthcare-quiz": "/pages/frontend/fellow-dashboard/business-industry-application/healthcare/kuis.html",
        "/participant-ai-lab-healthcare-discussion": "/pages/frontend/fellow-dashboard/business-industry-application/healthcare/diskusi.html",
        "/participant-ai-lab-ui-ux": "/pages/frontend/fellow-dashboard/business-industry-application/ui-ux/materi.html",
        "/participant-ai-lab-ui-ux-practice": "/pages/frontend/fellow-dashboard/business-industry-application/ui-ux/latihan.html",
        "/participant-ai-lab-ui-ux-quiz": "/pages/frontend/fellow-dashboard/business-industry-application/ui-ux/kuis.html",
        "/participant-ai-lab-ui-ux-discussion": "/pages/frontend/fellow-dashboard/business-industry-application/ui-ux/diskusi.html",
        "/participant-ai-lab-manufacturing": "/pages/frontend/fellow-dashboard/business-industry-application/manufacturing/materi.html",
        "/participant-ai-lab-manufacturing-practice": "/pages/frontend/fellow-dashboard/business-industry-application/manufacturing/latihan.html",
        "/participant-ai-lab-manufacturing-quiz": "/pages/frontend/fellow-dashboard/business-industry-application/manufacturing/kuis.html",
        "/participant-ai-lab-manufacturing-discussion": "/pages/frontend/fellow-dashboard/business-industry-application/manufacturing/diskusi.html",
        "/participant-ai-lab-geospatial": "/pages/frontend/fellow-dashboard/business-industry-application/geospatial/materi.html",
        "/participant-ai-lab-geospatial-practice": "/pages/frontend/fellow-dashboard/business-industry-application/geospatial/latihan.html",
        "/participant-ai-lab-geospatial-quiz": "/pages/frontend/fellow-dashboard/business-industry-application/geospatial/kuis.html",
        "/participant-ai-lab-geospatial-discussion": "/pages/frontend/fellow-dashboard/business-industry-application/geospatial/diskusi.html",
        "/participant-specialization-computer-vision": "/pages/frontend/fellow-dashboard/under-development.html",
        "/participant-specialization-speech-recognition": "/pages/frontend/fellow-dashboard/under-development.html",
        "/participant-specialization-nlp-llm": "/pages/frontend/fellow-dashboard/under-development.html",
        "/participant-specialization-mlops-deployment": "/pages/frontend/fellow-dashboard/under-development.html",
        "/participant-specialization-multimodal-llm": "/pages/frontend/fellow-dashboard/under-development.html",
        "/participant-specialization-medical-biology-ai": "/pages/frontend/fellow-dashboard/under-development.html",
        "/participant-ai-lab-cv-cnn-intro": "/pages/frontend/fellow-dashboard/under-development.html",
        "/participant-ai-lab-cv-cnn-why": "/pages/frontend/fellow-dashboard/under-development.html",
        "/participant-ai-lab-cv-cnn-relu": "/pages/frontend/fellow-dashboard/under-development.html",
        "/participant-ai-lab-cv-filtering-kernels": "/pages/frontend/fellow-dashboard/under-development.html",
        "/participant-ai-lab-cv-cnn-fc": "/pages/frontend/fellow-dashboard/under-development.html",
        "/participant-ai-lab-cv-cnn-hands": "/pages/frontend/fellow-dashboard/under-development.html",
        "/participant-ai-lab-cv-cnn-arch": "/pages/frontend/fellow-dashboard/under-development.html",
        "/participant-ai-lab-cv-morph": "/pages/frontend/fellow-dashboard/under-development.html",
        "/participant-ai-lab-cv-opencv": "/pages/frontend/fellow-dashboard/under-development.html",
        "/participant-ai-lab-cv-pixel": "/pages/frontend/fellow-dashboard/under-development.html",
        "/participant-ai-lab-cv-cnn-arch-builder": "/pages/frontend/fellow-dashboard/under-development.html",
        "/meeting": "/pages/frontend/meeting.html",
        "/messaging": "/pages/frontend/fellow-dashboard/chatroom.html",
        "/messaging-alt": "/pages/frontend/messaging.html",
        "/competency-test": "/pages/frontend/competency-test.html",
        "/retest": "/pages/frontend/retest.html",
        "/dashboard": "/pages/dashboard/dashboard.html",
        "/dashboard/seleksi": "/pages/dashboard/dashboard.html",
        "/twibbon": "/pages/frontend/twibbon.html",
        "/about-us": "/pages/frontend/about-us.html",
        "/curriculum": "/pages/frontend/curriculum.html",
        "/faq": "/pages/frontend/faq.html",
        "/industry-applications": "/pages/frontend/industry-applications.html",
        "/skoring": "/pages/dashboard/skoring.html",
        "/ai-prescreening": "/pages/dashboard/ai-prescreening.html",
        "/anti-fraud": "/pages/dashboard/anti-fraud.html",
        "/comm-engine": "/pages/dashboard/comm-engine.html",
        "/competency-monitor": "/pages/dashboard/competency-monitor.html",
        "/retest-monitor": "/pages/dashboard/retest-monitor.html",
        "/data-visualization": "/pages/dashboard/data-visualization.html",
        "/video-conference": "/pages/dashboard/video-conference.html",
        "/stage-control": "/pages/dashboard/stage-control.html",
        "/bootcamp": "/pages/dashboard/bootcamp.html",
        "/final-project": "/pages/dashboard/final-project.html",
        "/certificates": "/pages/dashboard/certificates.html",
        "/audit-trail": "/pages/dashboard/audit-trail.html",
        "/global-settings": "/pages/dashboard/global-settings.html",
        "/learning-content": "/pages/dashboard/learning-content.html",
        "/rbac": "/pages/dashboard/rbac.html",
        "/assets": "/pages/dashboard/assets.html"
    },

    routeAliases: {
        "/x/h4a9d2": "/home",
        "/x/p8c3q1": "/projects",
        "/x/a7n5s2": "/announcement",
        "/x/a7n5s2/s1": "/announcement-stage-1",
        "/x/a7n5s2/s2": "/announcement-stage-2",
        "/x/a7n5s2/sf": "/announcement-final",
        "/x/w2f8m4": "/wall-of-fame",
        "/x/l6b9r3": "/leaderboard",
        "/x/g5d1u7": "/graduation",
        "/x/r9k2e4": "/register",
        "/x/u3p7v5": "/profile",
        "/x/fd6p1/profile": "/participant-profile",
        "/x/fd6p0": "/participant-dashboard",
        "/x/fd6p1": "/participant-dashboard",
        "/x/fd6p1/m": "/participant-modules",
        "/x/fd6p1/ai": "/participant-ai-fundamentals",
        "/x/fd6p1/ai/intro": "/participant-ai-intro",
        "/x/fd6p1/ai/intro/practice": "/participant-ai-intro-practice",
        "/x/fd6p1/ai/intro/quiz": "/participant-ai-intro-quiz",
        "/x/fd6p1/ai/intro/discussion": "/participant-ai-intro-discussion",
        "/x/fd6p1/ai/history": "/participant-ai-history",
        "/x/fd6p1/ai/types": "/participant-ai-types",
        "/x/fd6p1/ai/components": "/participant-ai-components",
        "/x/fd6p1/ai/applications": "/participant-ai-applications",
        "/x/fd6p1/ai/pipeline": "/participant-ai-pipeline",
        "/x/fd6p1/ai/ml-dl": "/participant-ai-ml-dl",
        "/x/fd6p1/ai/pros-cons": "/participant-ai-pros-cons",
        "/x/fd6p1/ai/ethics": "/participant-ai-ethics",
        "/x/fd6p1/ai/future": "/participant-ai-future",
        "/x/fd6p1/ai/summary": "/participant-ai-summary",
        "/x/fd6p1/mt": "/participant-mentor",
        "/x/fd6p1/t": "/participant-tasks",
        "/x/fd6p1/p": "/participant-projects",
        "/x/fd6p1/e": "/participant-events",
        "/x/fd6p1/c": "/participant-community",
        "/x/fd6p1/cert": "/participant-certificates",
        "/x/fd6p1/l": "/participant-leaderboard",
        "/x/fd6p1/h": "/participant-help",
        "/x/fd6p1/s": "/participant-settings",
        "/x/m7k9p2": "/meeting",
        "/x/msg2e": "/messaging",
        "/x/t4c8n6": "/competency-test",
        "/x/rt4s8": "/retest",
        "/x/d8s2h5": "/dashboard",
        "/x/d8s2h5/s1": "/dashboard/seleksi",
        "/x/tw5b1": "/twibbon",
        "/x/ab2u8": "/about-us",
        "/x/cu7r2": "/curriculum",
        "/x/fq3a6": "/faq",
        "/x/in9d4": "/industry-applications",
        "/x/sk4r8": "/skoring",
        "/x/ai2p6": "/ai-prescreening",
        "/x/fr7c1": "/anti-fraud",
        "/x/cm8e3": "/comm-engine",
        "/x/ct6m2": "/competency-monitor",
        "/x/rtm6q": "/retest-monitor",
        "/x/dv9q4": "/data-visualization",
        "/x/vc4o9": "/video-conference",
        "/x/sc1t5": "/stage-control",
        "/x/bc9p3": "/bootcamp",
        "/x/fp5j7": "/final-project",
        "/x/cr2t8": "/certificates",
        "/x/at6l4": "/audit-trail",
        "/x/gs3n9": "/global-settings",
        "/x/lc2m4": "/learning-content",
        "/x/rb8a2": "/rbac",
        "/x/as4e6": "/assets"
    },

    currentPath: null,
    sidebarHtml: "",

    // ==========================================
    // 2. Fungsi Memuat Komponen Statis (Navbar & Footer)
    // ==========================================
    async loadComponents() {
        try {
            const [navResponse, footerResponse, sidebarResponse] = await Promise.all([
                fetch("/components/navbar.html"),
                fetch("/components/footer.html"),
                fetch("/components/sidebar.html")
            ]);

            if (navResponse.ok) {
                document.getElementById("navbar-container").innerHTML = await navResponse.text();
            }
            if (footerResponse.ok) {
                document.getElementById("footer-container").innerHTML = await footerResponse.text();
            }
            if (sidebarResponse.ok) {
                this.sidebarHtml = await sidebarResponse.text();
                window.__HERAI_SIDEBAR_HTML__ = this.sidebarHtml;
            }

            // Eksekusi logika Navbar jika ada (dari js/main.js)
            if (typeof window.initNavbar === "function") {
                window.initNavbar();
            }
        } catch (error) {
            console.error("Gagal memuat komponen dasar:", error);
        }
    },

    hydrateAdminSidebar() {
        const sidebarContainer = document.getElementById("sidebar-container");
        if (!sidebarContainer) return;

        const html = window.__HERAI_SIDEBAR_HTML__ || this.sidebarHtml;
        if (html && sidebarContainer.innerHTML.trim() === "") {
            sidebarContainer.innerHTML = html;
        }
        if (typeof window.applyAdminSidebarAccess === "function") {
            window.applyAdminSidebarAccess(sidebarContainer);
        }

        if (typeof window.updateSidebarActiveState === "function") {
            window.updateSidebarActiveState();
        } else {
            const currentHash = window.location.hash || "#/dashboard";
            sidebarContainer.querySelectorAll("a").forEach(link => link.classList.remove("active"));
            const activeLink = sidebarContainer.querySelector(`a[href="${currentHash}"]`);
            if (activeLink) activeLink.classList.add("active");
        }
    },

    readParticipantSession() {
        try {
            const session = JSON.parse(sessionStorage.getItem("heraiParticipantSession") || "null");
            const expired = session?.expiresAt && new Date(session.expiresAt).getTime() <= Date.now();
            if (!session?.token || expired) {
                sessionStorage.removeItem("heraiParticipantSession");
                return null;
            }
            return session;
        } catch {
            return null;
        }
    },

    isParticipantRouteAllowed(path) {
        if (path === "/participant-dashboard" || path === "/participant-modules" || path === "/participant-settings") return true;
        return path.startsWith("/participant-ai-") || path.startsWith("/participant-ai-lab-") || path.startsWith("/participant-specialization-");
    },

    renderParticipantAccessNotice(appContent, navContainer, footerContainer, options = {}) {
        const title = options.title || "Akses Peserta Dibatasi";
        const message = options.message || "Sementara ini portal peserta hanya membuka Beranda, Modul, dan Pengaturan.";
        const actionHref = options.actionHref || "#/participant-dashboard";
        const actionLabel = options.actionLabel || "Kembali ke Beranda";
        appContent.innerHTML = `
            <section class="participant-route-guard">
                <div>
                    <i class="fas fa-lock"></i>
                    <h1>${title}</h1>
                    <p>${message}</p>
                    <a href="${actionHref}">${actionLabel}</a>
                </div>
            </section>
        `;
        if (navContainer) navContainer.style.display = "none";
        if (footerContainer) footerContainer.style.display = "none";
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
        const queryIndex = path.indexOf('?');
        if (queryIndex >= 0) {
            path = path.slice(0, queryIndex);
        }

        // Bersihkan ekstensi .html jika user mengetik manual
        if (path.includes('.html')) {
            path = path.replace('.html', '');
        }

        path = this.routeAliases[path] || path;

        const routeUrl = this.routes[path];
        const appContent = document.getElementById("app-content");
        const navContainer = document.getElementById("navbar-container");
        const footerContainer = document.getElementById("footer-container");
        const isMessagingPage = path === "/messaging";
        const isParticipantLoginPage = path === "/profile" || path === "/participant-login";
        const participantDashboardPages = [
            "/participant-ai-lab-culture",
            "/participant-ai-lab-culture-practice",
            "/participant-ai-lab-culture-quiz",
            "/participant-ai-lab-culture-discussion",
            "/participant-ai-lab-large-language-model",
            "/participant-ai-lab-large-language-model-practice",
            "/participant-ai-lab-large-language-model-quiz",
            "/participant-ai-lab-large-language-model-discussion",
            "/participant-ai-lab-vlm-practice",
            "/participant-ai-lab-vlm-quiz",
            "/participant-ai-lab-vlm-discussion",
            "/participant-ai-lab-multimodal-llm-practice",
            "/participant-ai-lab-multimodal-llm-quiz",
            "/participant-ai-lab-multimodal-llm-discussion",
            "/participant-ai-lab-agentic-ai-practice",
            "/participant-ai-lab-agentic-ai-quiz",
            "/participant-ai-lab-agentic-ai-discussion",
            "/participant-dashboard",
            "/participant-modules",
            "/participant-ai-fundamentals",
            "/participant-ai-intro",
            "/participant-ai-intro-practice",
            "/participant-ai-intro-quiz",
            "/participant-ai-intro-discussion",
            "/participant-ai-history",
            "/participant-ai-types",
            "/participant-ai-components",
            "/participant-ai-applications",
            "/participant-ai-pipeline",
            "/participant-ai-ml-dl",
            "/participant-ai-pros-cons",
            "/participant-ai-ethics",
            "/participant-ai-future",
            "/participant-ai-summary",
            "/participant-ai-python",
            "/participant-ai-python-practice",
            "/participant-ai-python-quiz",
            "/participant-ai-python-kuis",
            "/participant-ai-python-discussion",
            "/participant-ai-modern",
            "/participant-ai-modern-practice",
            "/participant-ai-modern-quiz",
            "/participant-ai-modern-discussion",
            "/participant-ai-reasoning",
            "/participant-ai-reasoning-practice",
            "/participant-ai-reasoning-quiz",
            "/participant-ai-reasoning-discussion",
            "/participant-ai-evaluation",
            "/participant-ai-evolution",
            "/participant-profile",
            "/participant-mentor",
            "/participant-tasks",
            "/participant-projects",
            "/participant-events",
            "/participant-community",
            "/participant-certificates",
            "/participant-leaderboard",
            "/participant-help",
            "/participant-settings",
            "/participant-ai-lab-tokenization",
            "/participant-ai-lab-preprocessing",
            "/participant-ai-lab-pos-ner",
            "/participant-ai-lab-bow",
            "/participant-ai-lab-tfidf",
            "/participant-ai-lab-nlp",
            "/participant-ai-lab-machine-learning",
            "/participant-ai-lab-ml",
            "/participant-ai-lab-cv",
            "/participant-ai-lab-deep-learning",
            "/participant-ai-lab-deep-learning-practice",
            "/participant-ai-lab-deep-learning-quiz",
            "/participant-ai-lab-deep-learning-discussion",
            "/participant-ai-lab-reinforcement-learning",
            "/participant-ai-lab-math",
            "/participant-ai-lab-math-intro",
            "/participant-ai-lab-math-linear-algebra",
            "/participant-ai-lab-math-statistics",
            "/participant-ai-lab-math-probability",
            "/participant-ai-lab-math-calculus",
            "/participant-ai-lab-math-optimization",
            "/participant-ai-lab-math-case-study",
            "/participant-ai-lab-math-practice",
            "/participant-ai-lab-math-quiz",
            "/participant-ai-lab-math-discussion",
            "/participant-ai-lab-gen",
            "/participant-ai-lab-llm",
            "/participant-ai-lab-vlm",
            "/participant-ai-lab-multimodal-llm",
            "/participant-ai-lab-agentic-ai",
            "/participant-ai-lab-bioinformatics",
            "/participant-ai-lab-data-engineering",
            "/participant-ai-lab-data-science",
            "/participant-ai-lab-infrastructure",
            "/participant-ai-lab-deployment",
            "/participant-ai-lab-front-end",
            "/participant-ai-lab-back-end",
            "/participant-ai-lab-business-insight",
            "/participant-ai-lab-people-business-mgt",
            "/participant-ai-lab-ai-culture",
            "/participant-ai-lab-healthcare",
            "/participant-ai-lab-ui-ux",
            "/participant-ai-lab-manufacturing",
            "/participant-ai-lab-geospatial",
            "/participant-specialization-computer-vision",
            "/participant-specialization-speech-recognition",
            "/participant-specialization-nlp-llm",
            "/participant-specialization-mlops-deployment",
            "/participant-specialization-multimodal-llm",
            "/participant-specialization-medical-biology-ai",
            "/participant-ai-lab-cv-cnn-intro",
            "/participant-ai-lab-cv-cnn-why",
            "/participant-ai-lab-cv-cnn-relu",
            "/participant-ai-lab-cv-filtering-kernels",
            "/participant-ai-lab-cv-cnn-fc",
            "/participant-ai-lab-cv-cnn-hands",
            "/participant-ai-lab-cv-cnn-arch",
            "/participant-ai-lab-cv-morph",
            "/participant-ai-lab-cv-opencv",
            "/participant-ai-lab-cv-pixel",
            "/participant-ai-lab-cv-cnn-arch-builder",
            "/participant-ai-lab-ml-intro",
            "/participant-ai-lab-ml-hypothesis",
            "/participant-ai-lab-ml-vc-dim",
            "/participant-ai-lab-ml-bias-variance",
            "/participant-ai-lab-ml-supervised",
            "/participant-ai-lab-ml-regression-classification",
            "/participant-ai-lab-ml-probabilistic",
            "/participant-ai-lab-ml-linear-discriminative",
            "/participant-ai-lab-ml-svm",
            "/participant-ai-lab-ml-neural-networks",
            "/participant-ai-lab-ml-unsupervised",
            "/participant-ai-lab-ml-practice",
            "/participant-ai-lab-ml-quiz",
            "/participant-ai-lab-ml-discussion",
            "/participant-ai-lab-tokenization-practice",
            "/participant-ai-lab-tokenization-quiz",
            "/participant-ai-lab-tokenization-discussion",
            "/participant-ai-lab-preprocessing-practice",
            "/participant-ai-lab-preprocessing-quiz",
            "/participant-ai-lab-preprocessing-discussion",
            "/participant-ai-lab-pos-ner-practice",
            "/participant-ai-lab-pos-ner-quiz",
            "/participant-ai-lab-pos-ner-discussion",
            "/participant-ai-lab-bow-practice",
            "/participant-ai-lab-bow-quiz",
            "/participant-ai-lab-bow-discussion",
            "/participant-ai-lab-tfidf-practice",
            "/participant-ai-lab-tfidf-quiz",
            "/participant-ai-lab-tfidf-discussion",
            "/participant-ai-lab-nlp-practice",
            "/participant-ai-lab-nlp-quiz",
            "/participant-ai-lab-nlp-discussion",
            "/participant-ai-lab-machine-learning-practice",
            "/participant-ai-lab-machine-learning-quiz",
            "/participant-ai-lab-machine-learning-discussion",
            "/participant-ai-lab-cv-practice",
            "/participant-ai-lab-cv-quiz",
            "/participant-ai-lab-cv-discussion",
            "/participant-ai-lab-reinforcement-learning-practice",
            "/participant-ai-lab-reinforcement-learning-quiz",
            "/participant-ai-lab-reinforcement-learning-discussion",
            "/participant-ai-lab-math-intro-practice",
            "/participant-ai-lab-math-intro-quiz",
            "/participant-ai-lab-math-intro-discussion",
            "/participant-ai-lab-math-linear-algebra-practice",
            "/participant-ai-lab-math-linear-algebra-quiz",
            "/participant-ai-lab-math-linear-algebra-discussion",
            "/participant-ai-lab-math-statistics-practice",
            "/participant-ai-lab-math-statistics-quiz",
            "/participant-ai-lab-math-statistics-discussion",
            "/participant-ai-lab-math-probability-practice",
            "/participant-ai-lab-math-probability-quiz",
            "/participant-ai-lab-math-probability-discussion",
            "/participant-ai-lab-math-calculus-practice",
            "/participant-ai-lab-math-calculus-quiz",
            "/participant-ai-lab-math-calculus-discussion",
            "/participant-ai-lab-math-optimization-practice",
            "/participant-ai-lab-math-optimization-quiz",
            "/participant-ai-lab-math-optimization-discussion",
            "/participant-ai-lab-math-case-study-practice",
            "/participant-ai-lab-math-case-study-quiz",
            "/participant-ai-lab-math-case-study-discussion",
            "/participant-ai-lab-gen-practice",
            "/participant-ai-lab-gen-quiz",
            "/participant-ai-lab-gen-discussion",
            "/participant-ai-lab-llm-practice",
            "/participant-ai-lab-llm-quiz",
            "/participant-ai-lab-llm-discussion",
            "/participant-ai-lab-bioinformatics-practice",
            "/participant-ai-lab-bioinformatics-quiz",
            "/participant-ai-lab-bioinformatics-discussion",
            "/participant-ai-lab-data-engineering-practice",
            "/participant-ai-lab-data-engineering-quiz",
            "/participant-ai-lab-data-engineering-discussion",
            "/participant-ai-lab-data-science-practice",
            "/participant-ai-lab-data-science-quiz",
            "/participant-ai-lab-data-science-discussion",
            "/participant-ai-lab-infrastructure-practice",
            "/participant-ai-lab-infrastructure-quiz",
            "/participant-ai-lab-infrastructure-discussion",
            "/participant-ai-lab-deployment-practice",
            "/participant-ai-lab-deployment-quiz",
            "/participant-ai-lab-deployment-discussion",
            "/participant-ai-lab-front-end-practice",
            "/participant-ai-lab-front-end-quiz",
            "/participant-ai-lab-front-end-discussion",
            "/participant-ai-lab-back-end-practice",
            "/participant-ai-lab-back-end-quiz",
            "/participant-ai-lab-back-end-discussion",
            "/participant-ai-lab-business-insight-practice",
            "/participant-ai-lab-business-insight-quiz",
            "/participant-ai-lab-business-insight-discussion",
            "/participant-ai-lab-people-business-mgt-practice",
            "/participant-ai-lab-people-business-mgt-quiz",
            "/participant-ai-lab-people-business-mgt-discussion",
            "/participant-ai-lab-ai-culture-practice",
            "/participant-ai-lab-ai-culture-quiz",
            "/participant-ai-lab-ai-culture-discussion",
            "/participant-ai-lab-healthcare-practice",
            "/participant-ai-lab-healthcare-quiz",
            "/participant-ai-lab-healthcare-discussion",
            "/participant-ai-lab-ui-ux-practice",
            "/participant-ai-lab-ui-ux-quiz",
            "/participant-ai-lab-ui-ux-discussion",
            "/participant-ai-lab-manufacturing-practice",
            "/participant-ai-lab-manufacturing-quiz",
            "/participant-ai-lab-manufacturing-discussion",
            "/participant-ai-lab-geospatial-practice",
            "/participant-ai-lab-geospatial-quiz",
            "/participant-ai-lab-geospatial-discussion",
            "/participant-ai-lab-cv-cnn-intro-practice",
            "/participant-ai-lab-cv-cnn-intro-quiz",
            "/participant-ai-lab-cv-cnn-intro-discussion",
            "/participant-ai-lab-cv-cnn-why-practice",
            "/participant-ai-lab-cv-cnn-why-quiz",
            "/participant-ai-lab-cv-cnn-why-discussion",
            "/participant-ai-lab-cv-cnn-relu-practice",
            "/participant-ai-lab-cv-cnn-relu-quiz",
            "/participant-ai-lab-cv-cnn-relu-discussion",
            "/participant-ai-lab-cv-filtering-kernels-practice",
            "/participant-ai-lab-cv-filtering-kernels-quiz",
            "/participant-ai-lab-cv-filtering-kernels-discussion",
            "/participant-ai-lab-cv-cnn-fc-practice",
            "/participant-ai-lab-cv-cnn-fc-quiz",
            "/participant-ai-lab-cv-cnn-fc-discussion",
            "/participant-ai-lab-cv-cnn-hands-practice",
            "/participant-ai-lab-cv-cnn-hands-quiz",
            "/participant-ai-lab-cv-cnn-hands-discussion",
            "/participant-ai-lab-cv-cnn-arch-practice",
            "/participant-ai-lab-cv-cnn-arch-quiz",
            "/participant-ai-lab-cv-cnn-arch-discussion",
            "/participant-ai-lab-cv-morph-practice",
            "/participant-ai-lab-cv-morph-quiz",
            "/participant-ai-lab-cv-morph-discussion",
            "/participant-ai-lab-cv-opencv-practice",
            "/participant-ai-lab-cv-opencv-quiz",
            "/participant-ai-lab-cv-opencv-discussion",
            "/participant-ai-lab-cv-pixel-practice",
            "/participant-ai-lab-cv-pixel-quiz",
            "/participant-ai-lab-cv-pixel-discussion",
            "/participant-ai-lab-cv-cnn-arch-builder-practice",
            "/participant-ai-lab-cv-cnn-arch-builder-quiz",
            "/participant-ai-lab-cv-cnn-arch-builder-discussion",
            "/participant-ai-lab-ml-intro-practice",
            "/participant-ai-lab-ml-intro-quiz",
            "/participant-ai-lab-ml-intro-discussion",
            "/participant-ai-lab-ml-hypothesis-practice",
            "/participant-ai-lab-ml-hypothesis-quiz",
            "/participant-ai-lab-ml-hypothesis-discussion",
            "/participant-ai-lab-ml-vc-dim-practice",
            "/participant-ai-lab-ml-vc-dim-quiz",
            "/participant-ai-lab-ml-vc-dim-discussion",
            "/participant-ai-lab-ml-bias-variance-practice",
            "/participant-ai-lab-ml-bias-variance-quiz",
            "/participant-ai-lab-ml-bias-variance-discussion",
            "/participant-ai-lab-ml-supervised-practice",
            "/participant-ai-lab-ml-supervised-quiz",
            "/participant-ai-lab-ml-supervised-discussion",
            "/participant-ai-lab-ml-regression-classification-practice",
            "/participant-ai-lab-ml-regression-classification-quiz",
            "/participant-ai-lab-ml-regression-classification-discussion",
            "/participant-ai-lab-ml-probabilistic-practice",
            "/participant-ai-lab-ml-probabilistic-quiz",
            "/participant-ai-lab-ml-probabilistic-discussion",
            "/participant-ai-lab-ml-linear-discriminative-practice",
            "/participant-ai-lab-ml-linear-discriminative-quiz",
            "/participant-ai-lab-ml-linear-discriminative-discussion",
            "/participant-ai-lab-ml-svm-practice",
            "/participant-ai-lab-ml-svm-quiz",
            "/participant-ai-lab-ml-svm-discussion",
            "/participant-ai-lab-ml-neural-networks-practice",
            "/participant-ai-lab-ml-neural-networks-quiz",
            "/participant-ai-lab-ml-neural-networks-discussion",
            "/participant-ai-lab-ml-unsupervised-practice",
            "/participant-ai-lab-ml-unsupervised-quiz",
            "/participant-ai-lab-ml-unsupervised-discussion"
        ];
        const isParticipantDashboardPage = participantDashboardPages.includes(path);
        const adminPages = [
            "/dashboard",
            "/dashboard/seleksi",
            "/skoring",
            "/ai-prescreening",
            "/anti-fraud",
            "/comm-engine",
            "/competency-monitor",
            "/retest-monitor",
            "/data-visualization",
            "/video-conference",
            "/stage-control",
            "/bootcamp",
            "/final-project",
            "/certificates",
            "/audit-trail",
            "/global-settings",
            "/learning-content",
            "/rbac",
            "/assets"
        ];

        try {
            // Jika rute tidak terdaftar di routes object
            if (!routeUrl) throw new Error("404");

            document.body.classList.toggle("messaging-page-active", isMessagingPage);
            document.body.classList.toggle("participant-login-active", isParticipantLoginPage);
            document.body.classList.toggle("participant-dashboard-active", isParticipantDashboardPage);

            if (isParticipantDashboardPage) {
                const participantSession = this.readParticipantSession();
                if (false && !participantSession?.nik) {
                    this.renderParticipantAccessNotice(appContent, navContainer, footerContainer, {
                        title: "Login Peserta Diperlukan",
                        message: "Masuk dengan NIK dan password peserta untuk membuka dashboard HerAI Fellowship.",
                        actionHref: "#/participant-login",
                        actionLabel: "Masuk Peserta"
                    });
                    this.currentPath = null;
                    return;
                }
                if (!this.isParticipantRouteAllowed(path)) {
                    this.renderParticipantAccessNotice(appContent, navContainer, footerContainer);
                    this.currentPath = null;
                    return;
                }
            }

            if (adminPages.includes(path) && path !== "/dashboard" && typeof window.canAdminAccessPath === "function" && !window.canAdminAccessPath(path)) {
                appContent.innerHTML = `
                    <div class="dashboard-layout">
                        <div id="sidebar-container"></div>
                        <main class="main-content">
                            <section class="access-denied-panel glass-panel">
                                <i class="fas fa-lock"></i>
                                <h1>Akses Modul Dibatasi</h1>
                                <p>Role admin aktif tidak memiliki permission untuk membuka modul ini.</p>
                                <a href="#/dashboard" class="btn-cyber"><i class="fas fa-arrow-left"></i> Kembali ke Overview</a>
                            </section>
                        </main>
                    </div>
                `;
                if (navContainer) navContainer.style.display = "none";
                if (footerContainer) footerContainer.style.display = "none";
                this.currentPath = path;
                this.hydrateAdminSidebar();
                return;
            }

            const globalSettings = typeof window.getGlobalSettings === "function"
                ? window.getGlobalSettings()
                : {};
            if (typeof window.applyPublicVisibilitySettings === "function") {
                window.applyPublicVisibilitySettings(globalSettings);
            }
            if (globalSettings.maintenanceMode && !adminPages.includes(path)) {
                appContent.innerHTML = window.renderPublicNotice({
                    icon: "fa-screwdriver-wrench",
                    title: "Website Sedang Maintenance",
                    message: "HerAI Fellowship sedang melakukan pembaruan sistem. Silakan kembali lagi beberapa saat lagi.",
                    actionHref: "#/home",
                    actionLabel: "Cek Lagi Nanti"
                });
                if (navContainer) navContainer.style.display = "none";
                if (footerContainer) footerContainer.style.display = "none";
                this.currentPath = path;
                return;
            }

            if ((path === "/profile" || path === "/participant-login") && globalSettings.participantPortalOpen !== true) {
                appContent.innerHTML = window.renderPublicNotice({
                    icon: "fa-user-lock",
                    title: "Portal Peserta Belum Dibuka",
                    message: "Login peserta akan tersedia setelah admin mengaktifkan Portal Profil Peserta.",
                    actionHref: "#/home",
                    actionLabel: "Kembali ke Beranda"
                });
                if (navContainer) navContainer.style.display = "none";
                if (footerContainer) footerContainer.style.display = "none";
                this.currentPath = path;
                return;
            }

            if (path === "/competency-test" && globalSettings.competencyTestOpen !== true) {
                appContent.innerHTML = window.renderPublicNotice({
                    icon: "fa-laptop-code",
                    title: "Tes Kompetensi Belum Dibuka",
                    message: "Seleksi Tahap 2 akan tersedia setelah panitia mengaktifkan fase Tes Kompetensi dari Stage Control.",
                    actionHref: "#/profile",
                    actionLabel: "Kembali ke Profil"
                });
                if (navContainer) navContainer.style.display = "block";
                if (footerContainer) footerContainer.style.display = "block";
                this.currentPath = path;
                return;
            }

            // Cek apakah perlu reload konten (hanya jika path berubah)
            if (this.currentPath !== path) {
                // Fetch file HTML-nya
                const response = await fetch(routeUrl);
                if (!response.ok) throw new Error("Gagal fetch file HTML");

                appContent.innerHTML = await response.text();
                this.currentPath = path;

                // ==========================================
                // LAYOUT MANAGEMENT: Atur Tampilan Navbar & Footer
                // ==========================================
                // Daftar SEMUA halaman Admin Panel yang NGGAK boleh ada Navbar/Footer Publik
                if (adminPages.includes(path) || isMessagingPage || isParticipantDashboardPage || isParticipantLoginPage) {
                    if (navContainer) navContainer.style.display = "none";
                    if (footerContainer) footerContainer.style.display = "none";
                    if (adminPages.includes(path)) {
                        this.hydrateAdminSidebar();
                        if (typeof window.applyAdminSidebarAccess === "function") window.applyAdminSidebarAccess();
                    }
                } else {
                    if (navContainer) navContainer.style.display = "block";
                    if (footerContainer) footerContainer.style.display = "block";
                }

                if (routeUrl === "/pages/frontend/fellow-dashboard/under-development.html" && path !== "/participant-under-development") {
                    if (typeof window.initFellowDashboardPage === "function") {
                        window.initFellowDashboardPage("under-development");
                    }
                    return;
                }

                // ==========================================
                // EKSEKUSI JAVASCRIPT KHUSUS HALAMAN
                // ==========================================

                // 1. Logika Register & Twibbon
                if (path === "/register" && typeof window.initRegisterLogic === "function") {
                    window.initRegisterLogic();
                } else if ((path === "/profile" || path === "/participant-login") && typeof window.initParticipantLogin === "function") {
                    window.initParticipantLogin();
                } else if (path === "/competency-test" && typeof window.initCompetencyTest === "function") {
                    window.initCompetencyTest();
                } else if (path === "/retest" && typeof window.initCompetencyTest === "function") {
                    window.initCompetencyTest({ mode: "retest" });
                } else if (path === "/meeting" && typeof window.initMeetingRoom === "function") {
                    window.initMeetingRoom();
                } else if (path === "/messaging" && typeof window.initMessagingPage === "function") {
                    window.initMessagingPage();
                } else if (path === "/participant-dashboard" && typeof window.initFellowDashboardPage === "function") {
                    window.initFellowDashboardPage("dashboard");
                } else if (path === "/participant-modules" && typeof window.initFellowDashboardPage === "function") {
                    window.initFellowDashboardPage("modules");
                } else if (path === "/participant-ai-fundamentals" && typeof window.initFellowDashboardPage === "function") {
                    window.initFellowDashboardPage("modules");
                } else if (path === "/participant-ai-intro" && typeof window.initFellowDashboardPage === "function") {
                    window.initFellowDashboardPage("modules");
                } else if ((path === "/participant-ai-intro-practice" || path === "/participant-ai-intro-quiz" || path === "/participant-ai-intro-discussion") && typeof window.initFellowDashboardPage === "function") {
                    window.initFellowDashboardPage("modules");
                } else if (path.startsWith("/participant-ai-python") && typeof window.initFellowDashboardPage === "function") {
                    window.initFellowDashboardPage("modules");
                    if (path === "/participant-ai-python" && typeof window.initAiPythonMateri === "function") {
                        window.initAiPythonMateri();
                    }
                    if (path === "/participant-ai-python-practice" && typeof window.initAiPythonPractice === "function") {
                        window.initAiPythonPractice();
                    }
                    if ((path === "/participant-ai-python-quiz" || path === "/participant-ai-python-kuis") && typeof window.initAiPythonQuiz === "function") {
                        window.initAiPythonQuiz();
                    }
                    if (path === "/participant-ai-python-discussion" && typeof window.initAiPythonDiscussion === "function") {
                        window.initAiPythonDiscussion();
                    }
                } else if (path.startsWith("/participant-ai-modern") && typeof window.initFellowDashboardPage === "function") {
                    window.initFellowDashboardPage("modules");
                    if (path === "/participant-ai-modern" && typeof window.initAiModernMateri === "function") {
                        window.initAiModernMateri();
                    }
                    if (path === "/participant-ai-modern-practice" && typeof window.initAiModernPractice === "function") {
                        window.initAiModernPractice();
                    }
                    if (path === "/participant-ai-modern-quiz" && typeof window.initAiModernQuiz === "function") {
                        window.initAiModernQuiz();
                    }
                    if (path === "/participant-ai-modern-discussion" && typeof window.initAiModernDiscussion === "function") {
                        window.initAiModernDiscussion();
                    }
                } else if (path.startsWith("/participant-ai-reasoning") && typeof window.initFellowDashboardPage === "function") {
                    window.initFellowDashboardPage("modules");
                    if (path === "/participant-ai-reasoning" && typeof window.initAiReasoningMateri === "function") {
                        window.initAiReasoningMateri();
                    }
                    if (path === "/participant-ai-reasoning-practice" && typeof window.initAiReasoningPractice === "function") {
                        window.initAiReasoningPractice();
                    }
                    if (path === "/participant-ai-reasoning-quiz" && typeof window.initAiReasoningQuiz === "function") {
                        window.initAiReasoningQuiz();
                    }
                    if (path === "/participant-ai-reasoning-discussion" && typeof window.initAiReasoningDiscussion === "function") {
                        window.initAiReasoningDiscussion();
                    }
                } else if ((path === "/participant-ai-lab-machine-learning" || path.startsWith("/participant-ai-lab-ml")) && typeof window.initFellowDashboardPage === "function") {
                    window.initFellowDashboardPage("modules");
                    if ((path === "/participant-ai-lab-machine-learning" || (path.startsWith("/participant-ai-lab-ml") && path !== "/participant-ai-lab-ml-practice" && path !== "/participant-ai-lab-ml-quiz" && path !== "/participant-ai-lab-ml-discussion")) && typeof window.initAiMlMateri === "function") {
                        window.initAiMlMateri();
                    }
                    if (path === "/participant-ai-lab-ml-practice" && typeof window.initAiMlBasic === "function") {
                        window.initAiMlBasic();
                    }
                    if (path === "/participant-ai-lab-ml-quiz" && typeof window.initAiMlQuiz === "function") {
                        window.initAiMlQuiz();
                    }
                    if (path === "/participant-ai-lab-ml-discussion" && typeof window.initAiMlDiscussion === "function") {
                        window.initAiMlDiscussion();
                    }
                } else if (path.startsWith("/participant-ai-lab-deep-learning") && typeof window.initFellowDashboardPage === "function") {
                    window.initFellowDashboardPage("modules");
                    if (path === "/participant-ai-lab-deep-learning" && typeof window.initAiDeepLearningMateri === "function") {
                        window.initAiDeepLearningMateri();
                    }
                    if (path === "/participant-ai-lab-deep-learning-practice" && typeof window.initAiDeepLearningPractice === "function") {
                        window.initAiDeepLearningPractice();
                    }
                    if ((path === "/participant-ai-lab-deep-learning-quiz" || path === "/participant-ai-lab-deep-learning-kuis") && typeof window.initAiDeepLearningQuiz === "function") {
                        window.initAiDeepLearningQuiz();
                    }
                    if (path === "/participant-ai-lab-deep-learning-discussion" && typeof window.initAiDeepLearningDiscussion === "function") {
                        window.initAiDeepLearningDiscussion();
                    }
                } else if (path.startsWith("/participant-ai-lab-geospatial") && typeof window.initFellowDashboardPage === "function") {
                    window.initFellowDashboardPage("modules");
                    if (path === "/participant-ai-lab-geospatial" && typeof window.initAiGeospatialMateri === "function") {
                        window.initAiGeospatialMateri();
                    }
                    if (path === "/participant-ai-lab-geospatial-practice" && typeof window.initAiGeospatialPractice === "function") {
                        window.initAiGeospatialPractice();
                    }
                    if (path === "/participant-ai-lab-geospatial-quiz" && typeof window.initAiGeospatialQuiz === "function") {
                        window.initAiGeospatialQuiz();
                    }
                    if (path === "/participant-ai-lab-geospatial-discussion" && typeof window.initAiGeospatialDiscussion === "function") {
                        window.initAiGeospatialDiscussion();
                    }

                } else if (path.startsWith("/participant-ai-lab-manufacturing") && typeof window.initFellowDashboardPage === "function") {
                    window.initFellowDashboardPage("modules");
                    if (path === "/participant-ai-lab-manufacturing" && typeof window.initAiManufacturingMateri === "function") {
                        window.initAiManufacturingMateri();
                    }
                    if (path === "/participant-ai-lab-manufacturing-practice" && typeof window.initAiManufacturingPractice === "function") {
                        window.initAiManufacturingPractice();
                    }
                    if (path === "/participant-ai-lab-manufacturing-quiz" && typeof window.initAiManufacturingQuiz === "function") {
                        window.initAiManufacturingQuiz();
                    }
                    if (path === "/participant-ai-lab-manufacturing-discussion" && typeof window.initAiManufacturingDiscussion === "function") {
                        window.initAiManufacturingDiscussion();
                    }

                } else if (path.startsWith("/participant-ai-lab-ui-ux") && typeof window.initFellowDashboardPage === "function") {
                    window.initFellowDashboardPage("modules");
                    if (path === "/participant-ai-lab-ui-ux" && typeof window.initAiUiUxMateri === "function") {
                        window.initAiUiUxMateri();
                    }
                    if (path === "/participant-ai-lab-ui-ux-practice" && typeof window.initAiUiUxPractice === "function") {
                        window.initAiUiUxPractice();
                    }
                    if (path === "/participant-ai-lab-ui-ux-quiz" && typeof window.initAiUiUxQuiz === "function") {
                        window.initAiUiUxQuiz();
                    }
                    if (path === "/participant-ai-lab-ui-ux-discussion" && typeof window.initAiUiUxDiscussion === "function") {
                        window.initAiUiUxDiscussion();
                    }

                } else if (path.startsWith("/participant-ai-lab-healthcare") && typeof window.initFellowDashboardPage === "function") {
                    window.initFellowDashboardPage("modules");
                    if (path === "/participant-ai-lab-healthcare" && typeof window.initAiHealthcareMateri === "function") {
                        window.initAiHealthcareMateri();
                    }
                    if (path === "/participant-ai-lab-healthcare-practice" && typeof window.initAiHealthcarePractice === "function") {
                        window.initAiHealthcarePractice();
                    }
                    if (path === "/participant-ai-lab-healthcare-quiz" && typeof window.initAiHealthcareQuiz === "function") {
                        window.initAiHealthcareQuiz();
                    }
                    if (path === "/participant-ai-lab-healthcare-discussion" && typeof window.initAiHealthcareDiscussion === "function") {
                        window.initAiHealthcareDiscussion();
                    }

                } else if (path.startsWith("/participant-ai-lab-culture") && typeof window.initFellowDashboardPage === "function") {
                    window.initFellowDashboardPage("modules");
                    if (path === "/participant-ai-lab-culture" && typeof window.initAiCultureMateri === "function") {
                        window.initAiCultureMateri();
                    }
                    if (path === "/participant-ai-lab-culture-practice" && typeof window.initAiCulturePractice === "function") {
                        window.initAiCulturePractice();
                    }
                    if (path === "/participant-ai-lab-culture-quiz" && typeof window.initAiCultureQuiz === "function") {
                        window.initAiCultureQuiz();
                    }
                    if (path === "/participant-ai-lab-culture-discussion" && typeof window.initAiCultureDiscussion === "function") {
                        window.initAiCultureDiscussion();
                    }

                } else if (path.startsWith("/participant-ai-lab-people-business-mgt") && typeof window.initFellowDashboardPage === "function") {
                    window.initFellowDashboardPage("modules");
                    if (path === "/participant-ai-lab-people-business-mgt" && typeof window.initAiPeopleBusinessMgtMateri === "function") {
                        window.initAiPeopleBusinessMgtMateri();
                    }
                    if (path === "/participant-ai-lab-people-business-mgt-practice" && typeof window.initAiPeopleBusinessMgtPractice === "function") {
                        window.initAiPeopleBusinessMgtPractice();
                    }
                    if (path === "/participant-ai-lab-people-business-mgt-quiz" && typeof window.initAiPeopleBusinessMgtQuiz === "function") {
                        window.initAiPeopleBusinessMgtQuiz();
                    }
                    if (path === "/participant-ai-lab-people-business-mgt-discussion" && typeof window.initAiPeopleBusinessMgtDiscussion === "function") {
                        window.initAiPeopleBusinessMgtDiscussion();
                    }

                } else if (path.startsWith("/participant-ai-lab-business-insight") && typeof window.initFellowDashboardPage === "function") {
                    window.initFellowDashboardPage("modules");
                    if (path === "/participant-ai-lab-business-insight" && typeof window.initAiBusinessInsightMateri === "function") {
                        window.initAiBusinessInsightMateri();
                    }
                    if (path === "/participant-ai-lab-business-insight-practice" && typeof window.initAiBusinessInsightPractice === "function") {
                        window.initAiBusinessInsightPractice();
                    }
                    if (path === "/participant-ai-lab-business-insight-quiz" && typeof window.initAiBusinessInsightQuiz === "function") {
                        window.initAiBusinessInsightQuiz();
                    }
                    if (path === "/participant-ai-lab-business-insight-discussion" && typeof window.initAiBusinessInsightDiscussion === "function") {
                        window.initAiBusinessInsightDiscussion();
                    }

                } else if (path.startsWith("/participant-ai-lab-back-end") && typeof window.initFellowDashboardPage === "function") {
                    window.initFellowDashboardPage("modules");
                    if (path === "/participant-ai-lab-back-end" && typeof window.initAiBackEndMateri === "function") {
                        window.initAiBackEndMateri();
                    }
                    if (path === "/participant-ai-lab-back-end-practice" && typeof window.initAiBackEndPractice === "function") {
                        window.initAiBackEndPractice();
                    }
                    if (path === "/participant-ai-lab-back-end-quiz" && typeof window.initAiBackEndQuiz === "function") {
                        window.initAiBackEndQuiz();
                    }
                    if (path === "/participant-ai-lab-back-end-discussion" && typeof window.initAiBackEndDiscussion === "function") {
                        window.initAiBackEndDiscussion();
                    }

                } else if (path.startsWith("/participant-ai-lab-front-end") && typeof window.initFellowDashboardPage === "function") {
                    window.initFellowDashboardPage("modules");
                    if (path === "/participant-ai-lab-front-end" && typeof window.initAiFrontEndMateri === "function") {
                        window.initAiFrontEndMateri();
                    }
                    if (path === "/participant-ai-lab-front-end-practice" && typeof window.initAiFrontEndPractice === "function") {
                        window.initAiFrontEndPractice();
                    }
                    if (path === "/participant-ai-lab-front-end-quiz" && typeof window.initAiFrontEndQuiz === "function") {
                        window.initAiFrontEndQuiz();
                    }
                    if (path === "/participant-ai-lab-front-end-discussion" && typeof window.initAiFrontEndDiscussion === "function") {
                        window.initAiFrontEndDiscussion();
                    }

                } else if (path.startsWith("/participant-ai-lab-deployment") && typeof window.initFellowDashboardPage === "function") {
                    window.initFellowDashboardPage("modules");
                    if (path === "/participant-ai-lab-deployment" && typeof window.initAiDeploymentMateri === "function") {
                        window.initAiDeploymentMateri();
                    }
                    if (path === "/participant-ai-lab-deployment-practice" && typeof window.initAiDeploymentPractice === "function") {
                        window.initAiDeploymentPractice();
                    }
                    if (path === "/participant-ai-lab-deployment-quiz" && typeof window.initAiDeploymentQuiz === "function") {
                        window.initAiDeploymentQuiz();
                    }
                    if (path === "/participant-ai-lab-deployment-discussion" && typeof window.initAiDeploymentDiscussion === "function") {
                        window.initAiDeploymentDiscussion();
                    }

                } else if (path.startsWith("/participant-ai-lab-infrastructure") && typeof window.initFellowDashboardPage === "function") {
                    window.initFellowDashboardPage("modules");
                    if (path === "/participant-ai-lab-infrastructure" && typeof window.initAiInfrastructureMateri === "function") {
                        window.initAiInfrastructureMateri();
                    }
                    if (path === "/participant-ai-lab-infrastructure-practice" && typeof window.initAiInfrastructurePractice === "function") {
                        window.initAiInfrastructurePractice();
                    }
                    if (path === "/participant-ai-lab-infrastructure-quiz" && typeof window.initAiInfrastructureQuiz === "function") {
                        window.initAiInfrastructureQuiz();
                    }
                    if (path === "/participant-ai-lab-infrastructure-discussion" && typeof window.initAiInfrastructureDiscussion === "function") {
                        window.initAiInfrastructureDiscussion();
                    }

                } else if (path.startsWith("/participant-ai-lab-data-science") && typeof window.initFellowDashboardPage === "function") {
                    window.initFellowDashboardPage("modules");
                    if (path === "/participant-ai-lab-data-science" && typeof window.initAiDataScienceMateri === "function") {
                        window.initAiDataScienceMateri();
                    }
                    if (path === "/participant-ai-lab-data-science-practice" && typeof window.initAiDataSciencePractice === "function") {
                        window.initAiDataSciencePractice();
                    }
                    if (path === "/participant-ai-lab-data-science-quiz" && typeof window.initAiDataScienceQuiz === "function") {
                        window.initAiDataScienceQuiz();
                    }
                    if (path === "/participant-ai-lab-data-science-discussion" && typeof window.initAiDataScienceDiscussion === "function") {
                        window.initAiDataScienceDiscussion();
                    }

                } else if (path.startsWith("/participant-ai-lab-data-engineering") && typeof window.initFellowDashboardPage === "function") {
                    window.initFellowDashboardPage("modules");
                    if (path === "/participant-ai-lab-data-engineering" && typeof window.initAiDataEngineeringMateri === "function") {
                        window.initAiDataEngineeringMateri();
                    }
                    if (path === "/participant-ai-lab-data-engineering-practice" && typeof window.initAiDataEngineeringPractice === "function") {
                        window.initAiDataEngineeringPractice();
                    }
                    if (path === "/participant-ai-lab-data-engineering-quiz" && typeof window.initAiDataEngineeringQuiz === "function") {
                        window.initAiDataEngineeringQuiz();
                    }
                    if (path === "/participant-ai-lab-data-engineering-discussion" && typeof window.initAiDataEngineeringDiscussion === "function") {
                        window.initAiDataEngineeringDiscussion();
                    }

                } else if (path.startsWith("/participant-ai-lab-bioinformatics") && typeof window.initFellowDashboardPage === "function") {
                    window.initFellowDashboardPage("modules");
                    if (path === "/participant-ai-lab-bioinformatics" && typeof window.initAiBioinformaticsMateri === "function") {
                        window.initAiBioinformaticsMateri();
                    }
                    if (path === "/participant-ai-lab-bioinformatics-practice" && typeof window.initAiBioinformaticsPractice === "function") {
                        window.initAiBioinformaticsPractice();
                    }
                    if (path === "/participant-ai-lab-bioinformatics-quiz" && typeof window.initAiBioinformaticsQuiz === "function") {
                        window.initAiBioinformaticsQuiz();
                    }
                    if (path === "/participant-ai-lab-bioinformatics-discussion" && typeof window.initAiBioinformaticsDiscussion === "function") {
                        window.initAiBioinformaticsDiscussion();
                    }

                } else if (path.startsWith("/participant-ai-lab-agentic-ai") && typeof window.initFellowDashboardPage === "function") {
                    window.initFellowDashboardPage("modules");
                    if (path === "/participant-ai-lab-agentic-ai" && typeof window.initAiAgenticAiMateri === "function") {
                        window.initAiAgenticAiMateri();
                    }
                    if (path === "/participant-ai-lab-agentic-ai-practice" && typeof window.initAiAgenticAiPractice === "function") {
                        window.initAiAgenticAiPractice();
                    }
                    if (path === "/participant-ai-lab-agentic-ai-quiz" && typeof window.initAiAgenticAiQuiz === "function") {
                        window.initAiAgenticAiQuiz();
                    }
                    if (path === "/participant-ai-lab-agentic-ai-discussion" && typeof window.initAiAgenticAiDiscussion === "function") {
                        window.initAiAgenticAiDiscussion();
                    }

                } else if (path.startsWith("/participant-ai-lab-multimodal-llm") && typeof window.initFellowDashboardPage === "function") {
                    window.initFellowDashboardPage("modules");
                    if (path === "/participant-ai-lab-multimodal-llm" && typeof window.initAiMultimodalLlmMateri === "function") {
                        window.initAiMultimodalLlmMateri();
                    }
                    if (path === "/participant-ai-lab-multimodal-llm-practice" && typeof window.initAiMultimodalLlmPractice === "function") {
                        window.initAiMultimodalLlmPractice();
                    }
                    if (path === "/participant-ai-lab-multimodal-llm-quiz" && typeof window.initAiMultimodalLlmQuiz === "function") {
                        window.initAiMultimodalLlmQuiz();
                    }
                    if (path === "/participant-ai-lab-multimodal-llm-discussion" && typeof window.initAiMultimodalLlmDiscussion === "function") {
                        window.initAiMultimodalLlmDiscussion();
                    }

                } else if (path.startsWith("/participant-ai-lab-vlm") && typeof window.initFellowDashboardPage === "function") {
                    window.initFellowDashboardPage("modules");
                    if (path === "/participant-ai-lab-vlm" && typeof window.initAiVlmMateri === "function") {
                        window.initAiVlmMateri();
                    }
                    if (path === "/participant-ai-lab-vlm-practice" && typeof window.initAiVlmPractice === "function") {
                        window.initAiVlmPractice();
                    }
                    if (path === "/participant-ai-lab-vlm-quiz" && typeof window.initAiVlmQuiz === "function") {
                        window.initAiVlmQuiz();
                    }
                    if (path === "/participant-ai-lab-vlm-discussion" && typeof window.initAiVlmDiscussion === "function") {
                        window.initAiVlmDiscussion();
                    }

                } else if (path.startsWith("/participant-ai-lab-large-language-model") && typeof window.initFellowDashboardPage === "function") {
                    window.initFellowDashboardPage("modules");
                    if (path === "/participant-ai-lab-large-language-model" && typeof window.initAiLargeLanguageModelMateri === "function") {
                        window.initAiLargeLanguageModelMateri();
                    }
                    if (path === "/participant-ai-lab-large-language-model-practice" && typeof window.initAiLargeLanguageModelPractice === "function") {
                        window.initAiLargeLanguageModelPractice();
                    }
                    if (path === "/participant-ai-lab-large-language-model-quiz" && typeof window.initAiLargeLanguageModelQuiz === "function") {
                        window.initAiLargeLanguageModelQuiz();
                    }
                    if (path === "/participant-ai-lab-large-language-model-discussion" && typeof window.initAiLargeLanguageModelDiscussion === "function") {
                        window.initAiLargeLanguageModelDiscussion();
                    }

                } else if (path.startsWith("/participant-ai-lab-reinforcement-learning") && typeof window.initFellowDashboardPage === "function") {
                    window.initFellowDashboardPage("modules");
                    if (path === "/participant-ai-lab-reinforcement-learning" && typeof window.initAiReinforcementLearningMateri === "function") {
                        window.initAiReinforcementLearningMateri();
                    }
                    if (path === "/participant-ai-lab-reinforcement-learning-practice" && typeof window.initAiReinforcementLearningPractice === "function") {
                        window.initAiReinforcementLearningPractice();
                    }
                    if (path === "/participant-ai-lab-reinforcement-learning-quiz" && typeof window.initAiReinforcementLearningQuiz === "function") {
                        window.initAiReinforcementLearningQuiz();
                    }
                    if (path === "/participant-ai-lab-reinforcement-learning-discussion" && typeof window.initAiReinforcementLearningDiscussion === "function") {
                        window.initAiReinforcementLearningDiscussion();
                    }

                } else if (path.startsWith("/participant-ai-lab-math") && typeof window.initFellowDashboardPage === "function") {
                    window.initFellowDashboardPage("modules");
                    if (path === "/participant-ai-lab-math" && typeof window.initAiLabMathOverview === "function") {
                        window.initAiLabMathOverview();
                    }
                    if ((path === "/participant-ai-lab-math-intro" || path === "/participant-ai-lab-math-linear-algebra" || path === "/participant-ai-lab-math-statistics" || path === "/participant-ai-lab-math-probability" || path === "/participant-ai-lab-math-calculus" || path === "/participant-ai-lab-math-optimization" || path === "/participant-ai-lab-math-case-study") && typeof window.initAiLabMathLesson === "function") {
                        window.initAiLabMathLesson();
                    }
                    if (path === "/participant-ai-lab-math-practice" && typeof window.initAiLabMathPractice === "function") {
                        window.initAiLabMathPractice();
                    }
                    if (path === "/participant-ai-lab-math-quiz" && typeof window.initAiLabMathQuiz === "function") {
                        window.initAiLabMathQuiz();
                    }
                    if (path === "/participant-ai-lab-math-discussion" && typeof window.initAiLabMathDiscussion === "function") {
                        window.initAiLabMathDiscussion();
                    }
                } else if (path.startsWith("/participant-ai-lab-") && typeof window.initFellowDashboardPage === "function") {
                    window.initFellowDashboardPage("ai-lab");
                    if (typeof window.initCoursePlaceholder === "function") {
                        window.initCoursePlaceholder();
                    }
                    if (path === "/participant-ai-lab-tokenization" && typeof window.initAiLabTokenization === "function") {
                        window.initAiLabTokenization();
                    }
                    if (path === "/participant-ai-lab-preprocessing" && typeof window.initAiLabPreprocessing === "function") {
                        window.initAiLabPreprocessing();
                    }
                    if (path === "/participant-ai-lab-pos-ner" && typeof window.initAiLabPosNer === "function") {
                        window.initAiLabPosNer();
                    }
                    if (path === "/participant-ai-lab-bow" && typeof window.initAiLabBow === "function") {
                        window.initAiLabBow();
                    }
                    if (path === "/participant-ai-lab-tfidf" && typeof window.initAiLabTfidf === "function") {
                        window.initAiLabTfidf();
                    }
                    if (path === "/participant-ai-lab-nlp" && typeof window.initNlpOverview === "function") {
                        window.initNlpOverview();
                    }
                    if (path === "/participant-ai-lab-cv-cnn-intro" && typeof window.initAiLabCnnIntro === "function") {
                        window.initAiLabCnnIntro();
                    }
                    if (path === "/participant-ai-lab-cv-cnn-why" && typeof window.initAiLabCnnWhy === "function") {
                        window.initAiLabCnnWhy();
                    }
                    if (path === "/participant-ai-lab-cv-cnn-arch-builder" && typeof window.initAiLabCnnArchBuilder === "function") {
                        window.initAiLabCnnArchBuilder();
                    }
                    if (path === "/participant-ai-lab-cv-pixel" && typeof window.initAiLabPixel === "function") {
                        window.initAiLabPixel();
                    }
                    if (path === "/participant-ai-lab-cv-opencv" && typeof window.initAiLabOpencv === "function") {
                        window.initAiLabOpencv();
                    }
                    if (path === "/participant-ai-lab-cv-morph" && typeof window.initAiLabMorph === "function") {
                        window.initAiLabMorph();
                    }
                    if (path === "/participant-ai-lab-cv-cnn-arch" && typeof window.initAiLabCnnArch === "function") {
                        window.initAiLabCnnArch();
                    }
                    if (path === "/participant-ai-lab-cv-cnn-hands" && typeof window.initAiLabCnnHands === "function") {
                        window.initAiLabCnnHands();
                    }
                    if (path === "/participant-ai-lab-cv-cnn-fc" && typeof window.initAiLabCnnFc === "function") {
                        window.initAiLabCnnFc();
                    }
                    if (path === "/participant-ai-lab-cv-filtering-kernels" && typeof window.initAiLabFilteringKernels === "function") {
                        window.initAiLabFilteringKernels();
                    }
                    if (path === "/participant-ai-lab-cv-cnn-relu" && typeof window.initAiLabCnnRelu === "function") {
                        window.initAiLabCnnRelu();
                    }

                    if (path === "/participant-ai-lab-cv" && typeof window.initCvOverview === "function") {
                        window.initCvOverview();
                    }


                } else if (path === "/participant-ai-evaluation" && typeof window.initFellowDashboardPage === "function") {
                    window.initFellowDashboardPage("modules");
                    if (typeof window.initAiEvaluation === "function") {
                        window.initAiEvaluation();
                    }
                } else if (path === "/participant-ai-evolution" && typeof window.initFellowDashboardPage === "function") {
                    window.initFellowDashboardPage("modules");
                    if (typeof window.initAiEvolution === "function") {
                        window.initAiEvolution();
                    }
                } else if (path.startsWith("/participant-ai-") && typeof window.initFellowDashboardPage === "function") {
                    window.initFellowDashboardPage("modules");
                } else if (path.startsWith("/participant-specialization-") && typeof window.initFellowDashboardPage === "function") {
                    window.initFellowDashboardPage("modules");
                    if (typeof window.initCoursePlaceholder === "function") {
                        window.initCoursePlaceholder();
                    }
                } else if (path === "/participant-profile" && typeof window.initFellowDashboardPage === "function") {
                    window.initFellowDashboardPage("profile");
                    if (typeof window.initParticipantProfileDashboard === "function") window.initParticipantProfileDashboard();
                } else if (path.startsWith("/participant-") && typeof window.initFellowDashboardPage === "function") {
                    window.initFellowDashboardPage("under-development");
                } else if (path === "/projects" && typeof window.initProjectsPage === "function") {
                    window.initProjectsPage();
                } else if (path === "/twibbon" && typeof window.initTwibbon === "function") {
                    setTimeout(() => window.initTwibbon(), 100);
                }

                // 2. Logika Dashboard Utama & Skoring
                else if ((path === "/dashboard" || path === "/dashboard/seleksi") && typeof window.initDashboardLogic === "function") {
                    window.initDashboardLogic();
                } else if (path === "/skoring" && typeof window.initSkoringLogic === "function") {
                    window.initSkoringLogic();
                }

                // 3. Logika Sorcerers Intelligence
                else if (path === "/ai-prescreening" && typeof window.initAiPreScreening === "function") {
                    window.initAiPreScreening();
                } else if (path === "/anti-fraud" && typeof window.initAntiFraud === "function") {
                    window.initAntiFraud();
                }

                // 4. Logika Manajemen
                else if (path === "/comm-engine" && typeof window.initCommEngine === "function") {
                    window.initCommEngine();
                } else if (path === "/competency-monitor" && typeof window.initCompetencyMonitor === "function") {
                    window.initCompetencyMonitor();
                } else if (path === "/retest-monitor" && typeof window.initReTestMonitor === "function") {
                    window.initReTestMonitor();
                } else if (path === "/data-visualization" && typeof window.initDataVisualization === "function") {
                    window.initDataVisualization();
                } else if (path === "/video-conference" && typeof window.initVideoConference === "function") {
                    window.initVideoConference();
                } else if (path === "/assets" && typeof window.initAssets === "function") {
                    window.initAssets();
                } else if (path === "/stage-control" && typeof window.initStageControl === "function") {
                    window.initStageControl();
                } else if (path === "/bootcamp" && typeof window.initBootcamp === "function") {
                    window.initBootcamp();
                } else if (path === "/final-project" && typeof window.initFinalProject === "function") {
                    window.initFinalProject();
                } else if (path === "/certificates" && typeof window.initCertificates === "function") {
                    window.initCertificates();
                }

                // 5. Logika System Admin
                else if (path === "/global-settings" && typeof window.initGlobalSettings === "function") {
                    window.initGlobalSettings();
                } else if (path === "/learning-content" && typeof window.initLearningContentManager === "function") {
                    window.initLearningContentManager();
                } else if (path === "/audit-trail" && typeof window.initAuditTrail === "function") {
                    window.initAuditTrail();
                } else if (path === "/rbac" && typeof window.initRbac === "function") {
                    window.initRbac();
                }

                // 6. Logika Pengumuman
                else if (path.startsWith("/announcement") && typeof window.initAnnouncement === "function") {
                    setTimeout(() => window.initAnnouncement(), 100);
                }

                // 7. Logika Interaksi Umum pada halaman publik (Selain Admin & Halaman Khusus)
                else if (!adminPages.includes(path) && typeof window.initPageInteractions === "function") {
                    window.initPageInteractions();
                }

            }

            if (routeUrl === "/pages/frontend/fellow-dashboard/course-placeholder.html" && typeof window.initCoursePlaceholder === "function") {
                window.initCoursePlaceholder();
            }

            // Halaman publik tetap mulai dari atas; halaman admin menjaga konteks panel samping.
            if (!adminPages.includes(path) && !isMessagingPage && !isParticipantDashboardPage) {
                window.scrollTo({ top: 0, behavior: 'instant' });
            }

        } catch (error) {
            document.body.classList.remove("messaging-page-active");
            document.body.classList.remove("participant-login-active");
            document.body.classList.remove("participant-dashboard-active");
            console.error("Router Error:", error);
            // Tampilan Halaman 404 Fallback
            appContent.innerHTML = `
                <section style="min-height: 70vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; background-color: #fcfcfd;">
                    <h1 style="font-size: 6rem; color: #FF1493; margin-bottom: 0; font-family: 'Space Grotesk', sans-serif;">404</h1>
                    <h2 style="color: #1a0b2e; font-family: 'Space Grotesk', sans-serif;">Halaman Tidak Ditemukan</h2>
                    <p style="color: #6b7a90; max-width: 400px; margin-bottom: 20px;">Maaf, sepertinya Anda tersesat atau halaman yang dituju belum tersedia.</p>
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
        const link = e.target.closest("a");
        if (!link || !link.hasAttribute("href")) return;

        const href = link.getAttribute("href");

        // Abaikan link eksternal atau link kosong atau javascript:void(0)
        if (!href || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:")) return;

        // Jika link mengarah ke id anchor di halaman yang sama (contoh: #about)
        if (href.startsWith("#") && !href.startsWith("#/")) {
            e.preventDefault();
            router.scrollToHash(href);
            return;
        }

        // Jika link berupa navigasi path biasa (contoh: href="/dashboard")
        if (href.startsWith("/") && !href.startsWith("//")) {
            e.preventDefault();
            window.location.hash = "#" + href;
        }
    });

    // 4. Deteksi saat URL Hash berubah
    window.addEventListener("hashchange", () => {
        router.handleRouting();
    });

    // 5. Fetch settings in the background on initial load
    if (typeof window.getGlobalSettingsAsync === "function") {
        window.getGlobalSettingsAsync();
    }
});
