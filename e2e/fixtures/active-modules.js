const AI_INTRO = Object.freeze({
  key: 'intro',
  moduleId: 'ai-fundamentals',
  title: 'Pengantar AI',
  titlePattern: /Pengantar AI|Fondasi AI/i,
  routes: Object.freeze({
    overview: '/participant-ai-intro',
    practice: '/participant-ai-intro-practice',
    quiz: '/participant-ai-intro-quiz',
    discussion: '/participant-ai-intro-discussion'
  }),
  selectors: Object.freeze({
    quizForm: '#aiIntroQuizForm',
    practiceForm: '#aiIntroPracticeForm'
  }),
  quizTotal: 10,
  dashboardCard: false,
  summaryCard: true
});

const ACTIVE_DASHBOARD_MODULES = Object.freeze([
  Object.freeze({
    key: 'python',
    moduleId: 'python-untuk-ai',
    title: 'Python untuk AI',
    titlePattern: /Python(?: untuk)? AI|Diskusi Python|Kuis Python/i,
    loader: 'ai-python',
    overviewSelector: '.ai-modern-beginner-roadmap',
    chapterTotal: 8,
    quizTotal: 20,
    quizReady: true,
    practiceWiringReady: true,
    chapterWiringReady: true,
    routes: Object.freeze({
      overview: '/participant-ai-python',
      practice: '/participant-ai-python-practice',
      quiz: '/participant-ai-python-quiz',
      discussion: '/participant-ai-python-discussion'
    }),
    selectors: Object.freeze({
      practiceForm: '#aiPythonPracticeForm',
      practiceList: '#aiPythonPracticeList',
      quizForm: '#aiPythonQuizForm',
      quizList: '#aiPythonQuizList'
    })
  }),
  Object.freeze({
    key: 'reasoning',
    moduleId: 'reasoning',
    title: 'Reasoning AI',
    titlePattern: /Reasoning/i,
    loader: 'ai-reasoning',
    overviewSelector: '.reasoning-scaffold-rich',
    chapterTotal: 6,
    quizTotal: 26,
    quizReady: true,
    practiceWiringReady: true,
    chapterWiringReady: true,
    routes: Object.freeze({
      overview: '/participant-ai-reasoning',
      practice: '/participant-ai-reasoning-practice',
      quiz: '/participant-ai-reasoning-quiz',
      discussion: '/participant-ai-reasoning-discussion'
    }),
    selectors: Object.freeze({
      practiceForm: '#aiReasoningPracticeForm',
      practiceList: '#aiReasoningPracticeList',
      quizForm: '#aiReasoningQuizForm',
      quizList: '#aiReasoningQuizList'
    })
  }),
  Object.freeze({
    key: 'modern',
    moduleId: 'konsep-ai-modern',
    title: 'Konsep AI Modern',
    titlePattern: /Konsep AI Modern|AI Modern/i,
    loader: 'ai-modern',
    overviewSelector: '.ai-modern-beginner-roadmap',
    chapterTotal: 4,
    quizTotal: 20,
    quizReady: true,
    practiceWiringReady: false,
    chapterWiringReady: false,
    practiceKnownIssue: 'MODULE_ID tidak tersedia di IIFE practice/quiz AI Modern.',
    chapterKnownIssue: 'Chapter AI Modern mengirim object chapter, bukan ID numerik.',
    routes: Object.freeze({
      overview: '/participant-ai-modern',
      practice: '/participant-ai-modern-practice',
      quiz: '/participant-ai-modern-quiz',
      discussion: '/participant-ai-modern-discussion'
    }),
    selectors: Object.freeze({
      practiceForm: '#aiModernPracticeForm',
      practiceList: '#aiModernPracticeApp',
      quizForm: '#aiModernQuizForm',
      quizList: '#aiModernQuizApp'
    })
  }),
  Object.freeze({
    key: 'evaluation',
    moduleId: 'evaluation',
    title: 'Evaluation AI',
    titlePattern: /Evaluation/i,
    loader: 'ai-evaluation',
    overviewSelector: '.ai-modern-beginner-roadmap',
    chapterTotal: 6,
    quizTotal: 20,
    quizReady: true,
    practiceWiringReady: true,
    chapterWiringReady: true,
    routes: Object.freeze({
      overview: '/participant-ai-evaluation',
      practice: '/participant-ai-evaluation-practice',
      quiz: '/participant-ai-evaluation-quiz',
      discussion: '/participant-ai-evaluation-discussion'
    }),
    selectors: Object.freeze({
      practiceForm: '#aiEvaluationPracticeForm',
      practiceList: '#aiEvaluationPracticeList',
      quizForm: '#aiEvaluationQuizForm',
      quizList: '#aiEvaluationQuizList'
    })
  }),
  Object.freeze({
    key: 'evolution',
    moduleId: 'evolution',
    title: 'Evolution of AI',
    titlePattern: /Evolution of AI|Evolution/i,
    loader: 'ai-evolution',
    overviewSelector: '.ai-modern-beginner-roadmap',
    chapterTotal: 7,
    quizTotal: 20,
    quizReady: true,
    practiceWiringReady: true,
    chapterWiringReady: true,
    routes: Object.freeze({
      overview: '/participant-ai-evolution',
      practice: '/participant-ai-evolution-practice',
      quiz: '/participant-ai-evolution-quiz',
      discussion: '/participant-ai-evolution-discussion'
    }),
    selectors: Object.freeze({
      practiceForm: '#aiEvolutionPracticeForm',
      practiceList: '#aiEvolutionPracticeList',
      quizForm: '#aiEvolutionQuizForm',
      quizList: '#aiEvolutionQuizList'
    })
  })
]);

const CV_DIGITAL_IMAGE = Object.freeze({
  key: 'cv-digital-image',
  moduleId: 'computer-vision',
  title: 'Digital Image Fundamentals',
  routes: Object.freeze({
    overview: '/participant-cv-digital-image',
    practice: '/participant-cv-digital-image-practice',
    quiz: '/participant-cv-digital-image-quiz',
    discussion: '/participant-cv-digital-image-discussion'
  })
});

const AI_FUNDAMENTALS_MODULES = Object.freeze([AI_INTRO, ...ACTIVE_DASHBOARD_MODULES]);

module.exports = {
  ACTIVE_DASHBOARD_MODULES,
  AI_FUNDAMENTALS_MODULES,
  AI_INTRO,
  CV_DIGITAL_IMAGE
};
