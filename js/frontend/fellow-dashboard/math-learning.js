(function() {
    'use strict';

    const RUNTIME_VERSION = '20260810-learner-facing-v3';
    const routeFor = (base, suffix) => suffix ? `${base}/${suffix}` : base;
    const createSubmodule = config => Object.freeze({
        ...config,
        items: Object.freeze(config.items.map(item => Object.freeze({
            ...item,
            route: routeFor(config.routeBase, item.slug)
        })))
    });
    const SUBMODULES = Object.freeze([
        createSubmodule({
            id: '01', slug: 'kenapa-ai-butuh-matematika',
            title: 'Kenapa AI Butuh Matematika? + Mathematical Readiness',
            sourceBase: '/materi2/math%20for%20ai/kenapa%20ai%20butuh%20matematika/',
            routeBase: '#/participant-ai-lab-math/kenapa-ai-butuh-matematika',
            storageKey: 'heraiMathLearningSubmodule01', topicCount: 7,
            items: [
                { id: 'info', slug: '', short: 'Ikhtisar', title: 'Kenapa AI Butuh Matematika? + Mathematical Readiness', file: '00-informasi-submodul.md', type: 'info', icon: 'fa-compass' },
                { id: 'topic-01', slug: 'dunia-nyata-menjadi-representasi-komputasional', short: 'Dunia nyata → representasi', title: 'Dunia Nyata Menjadi Representasi Komputasional', file: '01-dunia-nyata-menjadi-representasi.md', type: 'topic', icon: 'fa-shapes' },
                { id: 'topic-02', slug: 'data-observation-feature-dan-target', short: 'Data, observation, feature, target', title: 'Data, Observation, Feature, dan Target', file: '02-data-observation-feature-target.md', type: 'topic', icon: 'fa-table-columns' },
                { id: 'topic-03', slug: 'pecahan-desimal-dan-persentase', short: 'Pecahan, desimal, persentase', title: 'Pecahan, Desimal, dan Persentase', file: '03-refresh-angka-pecahan-desimal-persentase.md', type: 'topic', icon: 'fa-percent' },
                { id: 'topic-04', slug: 'variable-expression-dan-equation', short: 'Variable, expression, equation', title: 'Variable, Expression, dan Equation', file: '04-variable-expression-equation.md', type: 'topic', icon: 'fa-square-root-variable' },
                { id: 'topic-05', slug: 'function-dari-input-ke-output', short: 'Function: input → output', title: 'Function: Dari Input ke Output', file: '05-function-input-output.md', type: 'topic', icon: 'fa-arrow-right-arrow-left' },
                { id: 'topic-06', slug: 'coordinate-graph-dan-perubahan', short: 'Coordinate, graph, perubahan', title: 'Coordinate, Graph, dan Perubahan', file: '06-coordinate-graph-perubahan.md', type: 'topic', icon: 'fa-chart-line' },
                { id: 'topic-07', slug: 'powers-logarithms-dan-sigma', short: 'Powers, logarithms, sigma', title: 'Powers, Logarithms, dan Sigma', file: '07-powers-log-sigma.md', type: 'topic', icon: 'fa-superscript' },
                { id: 'practice', slug: 'latihan', short: 'Latihan', title: 'Latihan Submodul 01', file: 'latihan.md', type: 'practice', icon: 'fa-pen-ruler' },
                { id: 'quiz', slug: 'kuis', short: 'Kuis', title: 'Kuis Submodul 01', file: 'kuis.md', type: 'quiz', icon: 'fa-clipboard-check' },
                { id: 'discussion', slug: 'diskusi', short: 'Diskusi', title: 'Diskusi Submodul 01', file: 'diskusi.md', type: 'discussion', icon: 'fa-comments' },
                { id: 'references', slug: 'referensi', short: 'Referensi', title: 'Referensi Submodul 01', file: 'referensi.md', type: 'references', icon: 'fa-book-bookmark' }
            ]
        }),
        createSubmodule({
            id: '02', slug: 'linear-algebra',
            title: 'Linear Algebra: Representasi Data, Vektor, dan Matriks',
            sourceBase: '/materi2/math%20for%20ai/02-linear-algebra/',
            routeBase: '#/participant-ai-lab-math/linear-algebra',
            storageKey: 'heraiMathLearningSubmodule02', topicCount: 8,
            items: [
                { id: 'info', slug: '', short: 'Ikhtisar', title: 'Linear Algebra: Representasi Data, Vektor, dan Matriks', file: '00-informasi-submodul.md', type: 'info', icon: 'fa-vector-square' },
                { id: 'topic-01', slug: 'dari-scalar-ke-vector', short: 'Dari scalar ke vector', title: 'Dari Scalar ke Vector — Satu Peserta, Banyak Feature', file: '01-dari-scalar-ke-vector.md', type: 'topic', icon: 'fa-arrow-right-to-bracket' },
                { id: 'topic-02', slug: 'membaca-vektor', short: 'Membaca vektor', title: 'Membaca Vektor — Komponen, Dimensi, Shape, dan Feature Order', file: '02-membaca-vektor.md', type: 'topic', icon: 'fa-list-ol' },
                { id: 'topic-03', slug: 'operasi-vektor', short: 'Operasi vektor', title: 'Operasi Vektor — Penjumlahan, Pengurangan, dan Scalar Multiplication', file: '03-operasi-vektor.md', type: 'topic', icon: 'fa-plus-minus' },
                { id: 'topic-04', slug: 'norm-dan-distance', short: 'Norm dan distance', title: 'Magnitude/Norm dan Distance — Mengukur Besar dan Kedekatan', file: '04-norm-dan-distance.md', type: 'topic', icon: 'fa-ruler-combined' },
                { id: 'topic-05', slug: 'dot-product', short: 'Dot product', title: 'Dot Product — Menggabungkan Dua Vektor Secara Matematis', file: '05-dot-product.md', type: 'topic', icon: 'fa-circle-dot' },
                { id: 'topic-06', slug: 'cosine-similarity', short: 'Cosine similarity', title: 'Cosine Similarity — Membandingkan Arah, Bukan Sekadar Besar', file: '06-cosine-similarity.md', type: 'topic', icon: 'fa-compass-drafting' },
                { id: 'topic-07', slug: 'matrix', short: 'Matrix', title: 'Matrix — Banyak Observation dalam Satu Struktur', file: '07-matrix.md', type: 'topic', icon: 'fa-table-cells' },
                { id: 'topic-08', slug: 'matrix-operations-multiplication', short: 'Matrix multiplication', title: 'Matrix Operations & Matrix Multiplication — Shape, Transformasi, dan AI Connection', file: '08-matrix-operations-multiplication.md', type: 'topic', icon: 'fa-table-cells-large' },
                { id: 'practice', slug: 'latihan', short: 'Latihan', title: 'Latihan Submodul 02', file: 'latihan.md', type: 'practice', icon: 'fa-pen-ruler' },
                { id: 'quiz', slug: 'kuis', short: 'Kuis', title: 'Kuis Submodul 02', file: 'kuis.md', type: 'quiz', icon: 'fa-clipboard-check' },
                { id: 'discussion', slug: 'diskusi', short: 'Diskusi', title: 'Diskusi Submodul 02', file: 'diskusi.md', type: 'discussion', icon: 'fa-comments' },
                { id: 'references', slug: 'referensi', short: 'Referensi', title: 'Referensi Submodul 02', file: 'referensi.md', type: 'references', icon: 'fa-book-bookmark' }
            ]
        }),
        createSubmodule({
            id: '03', slug: 'statistics-for-ai',
            title: 'Statistics for AI: Membaca Pola dan Variasi Data',
            sourceBase: '/materi2/math%20for%20ai/statistik/',
            routeBase: '#/participant-ai-lab-math/statistics-for-ai',
            storageKey: 'heraiMathLearningSubmodule03', topicCount: 8,
            items: [
                { id: 'info', slug: '', short: 'Ikhtisar', title: 'Statistics for AI: Membaca Pola dan Variasi Data', file: 'final/00-informasi-submodul.md', type: 'info', icon: 'fa-chart-pie' },
                { id: 'topic-01', slug: 'dari-matrix-ke-dataset-statistik', short: 'Matrix ke dataset', title: 'Dari Matrix ke Dataset Statistik', file: '01-dari-matrix-ke-dataset-statistik.md', type: 'topic', icon: 'fa-table' },
                { id: 'topic-02', slug: 'mean-median-mode', short: 'Mean, median, mode', title: 'Mean, Median, Mode: Membaca Pusat Data dengan Tepat', file: '02-mean-median-mode.md', type: 'topic', icon: 'fa-bullseye' },
                { id: 'topic-03', slug: 'range-variance-standard-deviation', short: 'Range, variance, SD', title: 'Range, Variance, Standard Deviation: Membaca Seberapa Menyebar Data', file: '03-range-variance-standard-deviation.md', type: 'topic', icon: 'fa-arrows-left-right' },
                { id: 'topic-04', slug: 'distribution-dan-histogram', short: 'Distribution & histogram', title: 'Distribution dan Histogram: Melihat Pola Seluruh Data', file: '04-distribution-dan-histogram.md', type: 'topic', icon: 'fa-chart-column' },
                { id: 'topic-05', slug: 'percentile-quartile-iqr', short: 'Percentile, quartile, IQR', title: 'Percentile, Quartile, dan IQR', file: '05-percentile-quartile-iqr.md', type: 'topic', icon: 'fa-grip-lines' },
                { id: 'topic-06', slug: 'outlier-sinyal-untuk-diperiksa', short: 'Outlier', title: 'Outlier: Sinyal untuk Diperiksa', file: '06-outlier-sinyal-untuk-diperiksa.md', type: 'topic', icon: 'fa-circle-exclamation' },
                { id: 'topic-07', slug: 'covariance-correlation-association', short: 'Covariance, correlation', title: 'Covariance, Correlation, dan Association', file: '07-covariance-correlation-association.md', type: 'topic', icon: 'fa-chart-line' },
                { id: 'topic-08', slug: 'data-quality-untuk-ai', short: 'Data quality', title: 'Data Quality untuk AI', file: '08-data-quality-untuk-ai.md', type: 'topic', icon: 'fa-broom' },
                { id: 'practice', slug: 'latihan', short: 'Latihan', title: 'Latihan Submodul 03', file: 'final/latihan.md', type: 'practice', icon: 'fa-pen-ruler' },
                { id: 'quiz', slug: 'kuis', short: 'Kuis', title: 'Kuis Submodul 03', file: 'final/kuis.md', type: 'quiz', icon: 'fa-clipboard-check' },
                { id: 'discussion', slug: 'diskusi', short: 'Diskusi', title: 'Diskusi Submodul 03', file: 'final/diskusi.md', type: 'discussion', icon: 'fa-comments' },
                { id: 'references', slug: 'referensi', short: 'Referensi', title: 'Referensi Submodul 03', file: 'final/referensi.md', type: 'references', icon: 'fa-book-bookmark' }
            ]
        }),
        createSubmodule({
            id: '04', slug: 'probability',
            title: 'Probability: Menalar Ketidakpastian dalam AI',
            sourceBase: '/materi2/math%20for%20ai/04-probability/',
            routeBase: '#/participant-ai-lab-math/probability',
            storageKey: 'heraiMathLearningSubmodule04', topicCount: 8,
            items: [
                { id: 'info', slug: '', short: 'Ikhtisar', title: 'Probability: Menalar Ketidakpastian dalam AI', file: '00-informasi-submodul.md', type: 'info', icon: 'fa-dice' },
                { id: 'topic-01', slug: 'event-outcome-sample-space', short: 'Sample space', title: 'Event, Outcome, dan Sample Space', file: '01-event-outcome-sample-space.md', type: 'topic', icon: 'fa-list-ul' },
                { id: 'topic-02', slug: 'probability-complement', short: 'Probability & complement', title: 'Probability dan Complement', file: '02-probability-complement.md', type: 'topic', icon: 'fa-circle-half-stroke' },
                { id: 'topic-03', slug: 'joint-union-probability-table', short: 'Joint, union, table', title: 'Joint, Union, dan Probability Table', file: '03-joint-union-probability-table.md', type: 'topic', icon: 'fa-table-cells' },
                { id: 'topic-04', slug: 'conditional-probability', short: 'Conditional probability', title: 'Conditional Probability', file: '04-conditional-probability.md', type: 'topic', icon: 'fa-filter' },
                { id: 'topic-05', slug: 'independence-dependence', short: 'Independence & dependence', title: 'Independence dan Dependence', file: '05-independence-dependence.md', type: 'topic', icon: 'fa-code-branch' },
                { id: 'topic-06', slug: 'bayes-sebagai-update-keyakinan', short: 'Bayes', title: 'Bayes sebagai Update Keyakinan', file: '06-bayes-sebagai-update-keyakinan.md', type: 'topic', icon: 'fa-scale-balanced' },
                { id: 'topic-07', slug: 'random-variable-distribution-expected-value', short: 'Random variable, expected value', title: 'Random Variable, Distribution, dan Expected Value', file: '07-random-variable-distribution-expected-value.md', type: 'topic', icon: 'fa-chart-area' },
                { id: 'topic-08', slug: 'score-probability-calibration-probabilistic-loss', short: 'Score, probability, calibration', title: 'Score, Probability, Calibration, dan Probabilistic Loss', file: '08-score-probability-calibration-probabilistic-loss.md', type: 'topic', icon: 'fa-bullseye' },
                { id: 'practice', slug: 'latihan', short: 'Latihan', title: 'Latihan Submodul 04', file: 'latihan.md', type: 'practice', icon: 'fa-pen-ruler' },
                { id: 'quiz', slug: 'kuis', short: 'Kuis', title: 'Kuis Submodul 04', file: 'kuis.md', type: 'quiz', icon: 'fa-clipboard-check' },
                { id: 'discussion', slug: 'diskusi', short: 'Diskusi', title: 'Diskusi Submodul 04', file: 'diskusi.md', type: 'discussion', icon: 'fa-comments' },
                { id: 'references', slug: 'referensi', short: 'Referensi', title: 'Referensi Submodul 04', file: 'referensi.md', type: 'references', icon: 'fa-book-bookmark' }
            ]
        }),
        createSubmodule({
            id: '05', slug: 'calculus',
            title: 'Calculus: Perubahan, Turunan, dan Gradient',
            sourceBase: '/materi2/math%20for%20ai/calculus/final/',
            routeBase: '#/participant-ai-lab-math/calculus',
            storageKey: 'heraiMathLearningSubmodule05', topicCount: 8,
            items: [
                { id: 'info', slug: '', short: 'Ikhtisar', title: 'Calculus: Perubahan, Turunan, dan Gradient', file: '00-informasi-submodul.md', type: 'info', icon: 'fa-compass' },
                { id: 'topic-01', slug: 'function-dan-graph-aktivasi-kembali', short: 'Function & graph', title: 'Function dan Graph: Aktivasi Kembali', file: 'materi/01-function-dan-graph-aktivasi-kembali.md', type: 'topic', icon: 'fa-arrow-right-arrow-left' },
                { id: 'topic-02', slug: 'slope-dan-rate-of-change', short: 'Slope & rate change', title: 'Slope dan Rate of Change', file: 'materi/02-slope-dan-rate-of-change.md', type: 'topic', icon: 'fa-chart-area' },
                { id: 'topic-03', slug: 'derivative-sebagai-local-change', short: 'Local change', title: 'Derivative sebagai Local Change', file: 'materi/03-derivative-sebagai-local-change.md', type: 'topic', icon: 'fa-microscope' },
                { id: 'topic-04', slug: 'menghitung-derivative-sederhana', short: 'Simple derivative', title: 'Menghitung Derivative Sederhana', file: 'materi/04-menghitung-derivative-sederhana.md', type: 'topic', icon: 'fa-calculator' },
                { id: 'topic-05', slug: 'partial-derivative', short: 'Partial derivative', title: 'Partial Derivative', file: 'materi/05-partial-derivative.md', type: 'topic', icon: 'fa-layer-group' },
                { id: 'topic-06', slug: 'gradient-sebagai-vector-partial-derivatives', short: 'Gradient vector', title: 'Gradient sebagai Vector Partial Derivatives', file: 'materi/06-gradient-sebagai-vector-partial-derivatives.md', type: 'topic', icon: 'fa-arrows-to-circle' },
                { id: 'topic-07', slug: 'chain-rule-dan-computational-graph', short: 'Chain rule', title: 'Chain Rule dan Computational Graph', file: 'materi/07-chain-rule-dan-computational-graph.md', type: 'topic', icon: 'fa-diagram-project' },
                { id: 'topic-08', slug: 'loss-landscape-dan-bridge-ke-optimization', short: 'Loss landscape', title: 'Loss Landscape dan Bridge ke Optimization', file: 'materi/08-loss-landscape-dan-bridge-ke-optimization.md', type: 'topic', icon: 'fa-mountain' },
                { id: 'practice', slug: 'latihan', short: 'Latihan', title: 'Latihan Submodul 05', file: 'latihan.md', type: 'practice', icon: 'fa-pen-ruler' },
                { id: 'quiz', slug: 'kuis', short: 'Kuis', title: 'Kuis Submodul 05', file: 'kuis.md', type: 'quiz', icon: 'fa-clipboard-check' },
                { id: 'discussion', slug: 'diskusi', short: 'Diskusi', title: 'Diskusi Submodul 05', file: 'diskusi.md', type: 'discussion', icon: 'fa-comments' },
                { id: 'references', slug: 'referensi', short: 'Referensi', title: 'Referensi Submodul 05', file: 'referensi.md', type: 'references', icon: 'fa-book-bookmark' }
            ]
        }),
        createSubmodule({
            id: '06', slug: 'optimization',
            title: 'Optimization: Dari Loss ke Parameter yang Lebih Baik',
            sourceBase: '/materi2/math%20for%20ai/optimization/final/',
            routeBase: '#/participant-ai-lab-math/optimization',
            storageKey: 'heraiMathLearningSubmodule06', topicCount: 8,
            items: [
                { id: 'info', slug: '', short: 'Ikhtisar', title: 'Optimization: Dari Loss ke Parameter yang Lebih Baik', file: '00-informasi-submodul.md', type: 'info', icon: 'fa-bullseye' },
                { id: 'topic-01', slug: 'loss-objective-evaluation-metric', short: 'Loss & metric', title: 'Loss, Objective, dan Evaluation Metric', file: 'materi/01-loss-objective-evaluation-metric.md', type: 'topic', icon: 'fa-scale-balanced' },
                { id: 'topic-02', slug: 'minimization-dan-landscape', short: 'Minimization & landscape', title: 'Minimization dan Landscape', file: 'materi/02-minimization-dan-landscape.md', type: 'topic', icon: 'fa-mountain' },
                { id: 'topic-03', slug: 'gradient-descent-update-rule', short: 'Gradient Descent', title: 'Gradient Descent Update Rule', file: 'materi/03-gradient-descent-update-rule.md', type: 'topic', icon: 'fa-arrow-turn-down' },
                { id: 'topic-04', slug: 'learning-rate', short: 'Learning rate', title: 'Learning Rate', file: 'materi/04-learning-rate.md', type: 'topic', icon: 'fa-gauge-high' },
                { id: 'topic-05', slug: 'beberapa-iterasi-sampai-loss-berubah', short: 'Iteration trace', title: 'Beberapa Iterasi Sampai Loss Berubah', file: 'materi/05-beberapa-iterasi-sampai-loss-berubah.md', type: 'topic', icon: 'fa-rotate-right' },
                { id: 'topic-06', slug: 'batch-minibatch-stochastic-gradient', short: 'Batch & stochastic', title: 'Batch, Minibatch, dan Stochastic Gradient', file: 'materi/06-batch-minibatch-stochastic-gradient.md', type: 'topic', icon: 'fa-layer-group' },
                { id: 'topic-07', slug: 'momentum-dan-adam-peta-konsep', short: 'Momentum & Adam', title: 'Momentum dan Adam: Peta Konsep', file: 'materi/07-momentum-dan-adam-peta-konsep.md', type: 'topic', icon: 'fa-forward-fast' },
                { id: 'topic-08', slug: 'regularization-generalization-boundary', short: 'Regularization', title: 'Regularization, Generalization, dan Boundary Modul', file: 'materi/08-regularization-generalization-boundary-modul.md', type: 'topic', icon: 'fa-shield-halved' },
                { id: 'practice', slug: 'latihan', short: 'Latihan', title: 'Latihan Submodul 06', file: 'latihan.md', type: 'practice', icon: 'fa-pen-ruler' },
                { id: 'quiz', slug: 'kuis', short: 'Kuis', title: 'Kuis Submodul 06', file: 'kuis.md', type: 'quiz', icon: 'fa-clipboard-check' },
                { id: 'discussion', slug: 'diskusi', short: 'Diskusi', title: 'Diskusi Submodul 06', file: 'diskusi.md', type: 'discussion', icon: 'fa-comments' },
                { id: 'references', slug: 'referensi', short: 'Referensi', title: 'Referensi Submodul 06', file: 'referensi.md', type: 'references', icon: 'fa-book-bookmark' }
            ]
        }),
        createSubmodule({
            id: '07', slug: 'integrated-case-study',
            title: 'Integrated Case Study: Math for AI di HerAI',
            sourceBase: '/materi2/math%20for%20ai/integral/herai-submodule-07-integrated-case-study-final/',
            routeBase: '#/participant-ai-lab-math/integrated-case-study',
            storageKey: 'heraiMathLearningSubmodule07', topicCount: 7,
            items: [
                { id: 'info', slug: '', short: 'Ikhtisar', title: 'Integrated Case Study: Math for AI di HerAI', file: '00-informasi-submodul.md', type: 'info', icon: 'fa-diagram-project' },
                { id: 'topic-01', slug: 'problem-definition-data-contract', short: 'Problem & contract', title: 'Problem Definition dan Data Contract', file: 'materi/01-problem-definition-data-contract.md', type: 'topic', icon: 'fa-file-contract' },
                { id: 'topic-02', slug: 'representation-dan-matching', short: 'Representation & matching', title: 'Representation dan Matching', file: 'materi/02-representation-dan-matching.md', type: 'topic', icon: 'fa-vector-square' },
                { id: 'topic-03', slug: 'data-diagnostics', short: 'Data diagnostics', title: 'Data Diagnostics', file: 'materi/03-data-diagnostics.md', type: 'topic', icon: 'fa-stethoscope' },
                { id: 'topic-04', slug: 'uncertainty', short: 'Uncertainty', title: 'Uncertainty', file: 'materi/04-uncertainty.md', type: 'topic', icon: 'fa-dice-d20' },
                { id: 'topic-05', slug: 'prediction-score-dan-loss', short: 'Score & loss', title: 'Prediction Score dan Loss', file: 'materi/05-prediction-score-dan-loss.md', type: 'topic', icon: 'fa-scale-balanced' },
                { id: 'topic-06', slug: 'gradient-dan-parameter-update', short: 'Gradient & update', title: 'Gradient dan Parameter Update', file: 'materi/06-gradient-dan-parameter-update.md', type: 'topic', icon: 'fa-arrow-turn-down' },
                { id: 'topic-07', slug: 'evaluation-failure-modes-dan-what-comes-next', short: 'Evaluation & future', title: 'Evaluation, Failure Modes, dan What Comes Next', file: 'materi/07-evaluation-failure-modes-dan-what-comes-next.md', type: 'topic', icon: 'fa-clipboard-list' },
                { id: 'practice', slug: 'latihan', short: 'Latihan', title: 'Latihan Submodul 07', file: 'latihan.md', type: 'practice', icon: 'fa-pen-ruler' },
                { id: 'quiz', slug: 'kuis', short: 'Kuis', title: 'Kuis Submodul 07', file: 'kuis.md', type: 'quiz', icon: 'fa-clipboard-check' },
                { id: 'discussion', slug: 'diskusi', short: 'Diskusi', title: 'Diskusi Submodul 07', file: 'diskusi.md', type: 'discussion', icon: 'fa-comments' },
                { id: 'references', slug: 'referensi', short: 'Referensi', title: 'Referensi Submodul 07', file: 'referensi.md', type: 'references', icon: 'fa-book-bookmark' }
            ]
        })
    ]);
    const CONTENT = Object.freeze(SUBMODULES.flatMap(submodule => submodule.items));
    const SUBMODULE_ROUTE = SUBMODULES[0].routeBase;

    const LEGACY_ROUTES = Object.freeze({
        '/participant-ai-lab-math-intro': SUBMODULE_ROUTE.slice(1),
        '/participant-ai-lab-math-practice': `${SUBMODULE_ROUTE.slice(1)}/latihan`,
        '/participant-ai-lab-math-quiz': `${SUBMODULE_ROUTE.slice(1)}/kuis`,
        '/participant-ai-lab-math-discussion': `${SUBMODULE_ROUTE.slice(1)}/diskusi`,
        '/participant-ai-lab-math/submodule-01': SUBMODULE_ROUTE.slice(1),
        '/participant-ai-lab-math/submodule-01/topic-01': CONTENT[1].route.slice(1),
        '/participant-ai-lab-math/submodule-01/topic-02': CONTENT[2].route.slice(1),
        '/participant-ai-lab-math/submodule-01/topic-03': CONTENT[3].route.slice(1),
        '/participant-ai-lab-math/submodule-01/topic-04': CONTENT[4].route.slice(1),
        '/participant-ai-lab-math/submodule-01/topic-05': CONTENT[5].route.slice(1),
        '/participant-ai-lab-math/submodule-01/topic-06': CONTENT[6].route.slice(1),
        '/participant-ai-lab-math/submodule-01/topic-07': CONTENT[7].route.slice(1),
        '/participant-ai-lab-math/submodule-01/practice': CONTENT[8].route.slice(1),
        '/participant-ai-lab-math/submodule-01/quiz': CONTENT[9].route.slice(1),
        '/participant-ai-lab-math/submodule-01/discussion': CONTENT[10].route.slice(1),
        '/participant-ai-lab-math/submodule-01/references': CONTENT[11].route.slice(1),
        '/participant-ai-lab-math-linear-algebra': SUBMODULES[1].routeBase.slice(1),
        '/participant-ai-lab-math/submodule-02': SUBMODULES[1].routeBase.slice(1),
        '/participant-ai-lab-math/submodule-02/topic-01': SUBMODULES[1].items[1].route.slice(1),
        '/participant-ai-lab-math/submodule-02/topic-02': SUBMODULES[1].items[2].route.slice(1),
        '/participant-ai-lab-math/submodule-02/topic-03': SUBMODULES[1].items[3].route.slice(1),
        '/participant-ai-lab-math/submodule-02/topic-04': SUBMODULES[1].items[4].route.slice(1),
        '/participant-ai-lab-math/submodule-02/topic-05': SUBMODULES[1].items[5].route.slice(1),
        '/participant-ai-lab-math/submodule-02/topic-06': SUBMODULES[1].items[6].route.slice(1),
        '/participant-ai-lab-math/submodule-02/topic-07': SUBMODULES[1].items[7].route.slice(1),
        '/participant-ai-lab-math/submodule-02/topic-08': SUBMODULES[1].items[8].route.slice(1),
        '/participant-ai-lab-math/submodule-02/practice': SUBMODULES[1].items[9].route.slice(1),
        '/participant-ai-lab-math/submodule-02/quiz': SUBMODULES[1].items[10].route.slice(1),
        '/participant-ai-lab-math/submodule-02/discussion': SUBMODULES[1].items[11].route.slice(1),
        '/participant-ai-lab-math/submodule-02/references': SUBMODULES[1].items[12].route.slice(1),
        
        '/participant-ai-lab-math/submodule-03/topic-01': SUBMODULES[2].items[1].route.slice(1),
        '/participant-ai-lab-math/submodule-03/topic-02': SUBMODULES[2].items[2].route.slice(1),
        '/participant-ai-lab-math/submodule-03/topic-03': SUBMODULES[2].items[3].route.slice(1),
        '/participant-ai-lab-math/submodule-03/topic-04': SUBMODULES[2].items[4].route.slice(1),
        '/participant-ai-lab-math/submodule-03/topic-05': SUBMODULES[2].items[5].route.slice(1),
        '/participant-ai-lab-math/submodule-03/topic-06': SUBMODULES[2].items[6].route.slice(1),
        '/participant-ai-lab-math/submodule-03/topic-07': SUBMODULES[2].items[7].route.slice(1),
        '/participant-ai-lab-math/submodule-03/topic-08': SUBMODULES[2].items[8].route.slice(1),
        '/participant-ai-lab-math/submodule-03/practice': SUBMODULES[2].items[9].route.slice(1),
        '/participant-ai-lab-math/submodule-03/quiz': SUBMODULES[2].items[10].route.slice(1),
        '/participant-ai-lab-math/submodule-03/discussion': SUBMODULES[2].items[11].route.slice(1),
        '/participant-ai-lab-math/submodule-03/references': SUBMODULES[2].items[12].route.slice(1),
        
        '/participant-ai-lab-math/submodule-04/topic-01': SUBMODULES[3].items[1].route.slice(1),
        '/participant-ai-lab-math/submodule-04/topic-02': SUBMODULES[3].items[2].route.slice(1),
        '/participant-ai-lab-math/submodule-04/topic-03': SUBMODULES[3].items[3].route.slice(1),
        '/participant-ai-lab-math/submodule-04/topic-04': SUBMODULES[3].items[4].route.slice(1),
        '/participant-ai-lab-math/submodule-04/topic-05': SUBMODULES[3].items[5].route.slice(1),
        '/participant-ai-lab-math/submodule-04/topic-06': SUBMODULES[3].items[6].route.slice(1),
        '/participant-ai-lab-math/submodule-04/topic-07': SUBMODULES[3].items[7].route.slice(1),
        '/participant-ai-lab-math/submodule-04/topic-08': SUBMODULES[3].items[8].route.slice(1),
        '/participant-ai-lab-math/submodule-04/practice': SUBMODULES[3].items[9].route.slice(1),
        '/participant-ai-lab-math/submodule-04/quiz': SUBMODULES[3].items[10].route.slice(1),
        '/participant-ai-lab-math/submodule-04/discussion': SUBMODULES[3].items[11].route.slice(1),
        '/participant-ai-lab-math/submodule-04/references': SUBMODULES[3].items[12].route.slice(1),

        '/participant-ai-lab-math/submodule-05/topic-01': SUBMODULES[4].items[1].route.slice(1),
        '/participant-ai-lab-math/submodule-05/topic-02': SUBMODULES[4].items[2].route.slice(1),
        '/participant-ai-lab-math/submodule-05/topic-03': SUBMODULES[4].items[3].route.slice(1),
        '/participant-ai-lab-math/submodule-05/topic-04': SUBMODULES[4].items[4].route.slice(1),
        '/participant-ai-lab-math/submodule-05/topic-05': SUBMODULES[4].items[5].route.slice(1),
        '/participant-ai-lab-math/submodule-05/topic-06': SUBMODULES[4].items[6].route.slice(1),
        '/participant-ai-lab-math/submodule-05/topic-07': SUBMODULES[4].items[7].route.slice(1),
        '/participant-ai-lab-math/submodule-05/topic-08': SUBMODULES[4].items[8].route.slice(1),
        '/participant-ai-lab-math/submodule-05/practice': SUBMODULES[4].items[9].route.slice(1),
        '/participant-ai-lab-math/submodule-05/quiz': SUBMODULES[4].items[10].route.slice(1),
        '/participant-ai-lab-math/submodule-05/discussion': SUBMODULES[4].items[11].route.slice(1),
        '/participant-ai-lab-math/submodule-05/references': SUBMODULES[4].items[12].route.slice(1),
        '/participant-ai-lab-math/submodule-06/topic-01': SUBMODULES[5].items[1].route.slice(1),
        '/participant-ai-lab-math/submodule-06/topic-02': SUBMODULES[5].items[2].route.slice(1),
        '/participant-ai-lab-math/submodule-06/topic-03': SUBMODULES[5].items[3].route.slice(1),
        '/participant-ai-lab-math/submodule-06/topic-04': SUBMODULES[5].items[4].route.slice(1),
        '/participant-ai-lab-math/submodule-06/topic-05': SUBMODULES[5].items[5].route.slice(1),
        '/participant-ai-lab-math/submodule-06/topic-06': SUBMODULES[5].items[6].route.slice(1),
        '/participant-ai-lab-math/submodule-06/topic-07': SUBMODULES[5].items[7].route.slice(1),
        '/participant-ai-lab-math/submodule-06/topic-08': SUBMODULES[5].items[8].route.slice(1),
        '/participant-ai-lab-math/submodule-06/practice': SUBMODULES[5].items[9].route.slice(1),
        '/participant-ai-lab-math/submodule-06/quiz': SUBMODULES[5].items[10].route.slice(1),
        '/participant-ai-lab-math/submodule-06/discussion': SUBMODULES[5].items[11].route.slice(1),
        '/participant-ai-lab-math/submodule-06/references': SUBMODULES[5].items[12].route.slice(1),
        '/participant-ai-lab-math-integrated-case-study': SUBMODULES[6].routeBase.slice(1),
        '/participant-ai-lab-math/submodule-07': SUBMODULES[6].routeBase.slice(1),
        '/participant-ai-lab-math/submodule-07/topic-01': SUBMODULES[6].items[1].route.slice(1),
        '/participant-ai-lab-math/submodule-07/topic-02': SUBMODULES[6].items[2].route.slice(1),
        '/participant-ai-lab-math/submodule-07/topic-03': SUBMODULES[6].items[3].route.slice(1),
        '/participant-ai-lab-math/submodule-07/topic-04': SUBMODULES[6].items[4].route.slice(1),
        '/participant-ai-lab-math/submodule-07/topic-05': SUBMODULES[6].items[5].route.slice(1),
        '/participant-ai-lab-math/submodule-07/topic-06': SUBMODULES[6].items[6].route.slice(1),
        '/participant-ai-lab-math/submodule-07/topic-07': SUBMODULES[6].items[7].route.slice(1),
        '/participant-ai-lab-math/submodule-07/practice': SUBMODULES[6].items[8].route.slice(1),
        '/participant-ai-lab-math/submodule-07/quiz': SUBMODULES[6].items[9].route.slice(1),
        '/participant-ai-lab-math/submodule-07/discussion': SUBMODULES[6].items[10].route.slice(1),
        '/participant-ai-lab-math/submodule-07/references': SUBMODULES[6].items[11].route.slice(1)
    });

    let renderSequence = 0;
    let pageAbort = null;

    function escapeHtml(value) {
        return String(value == null ? '' : value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function currentPath() {
        const path = (window.location.hash || '#/').slice(1).split('?')[0];
        return LEGACY_ROUTES[path] || path;
    }

    function getCurrentContext() {
        const path = currentPath();
        const submodule = SUBMODULES.find(entry => path === entry.routeBase.slice(1) || path.startsWith(`${entry.routeBase.slice(1)}/`));
        const item = submodule?.items.find(entry => entry.route.slice(1) === path);
        return submodule && item ? { submodule, item } : null;
    }

    function getNumericChapterId(submodule, item) {
        const subNum = parseInt(submodule.id, 10) || 0;
        const itemIndex = submodule.items.findIndex(i => i.id === item.id);
        return (subNum * 100) + itemIndex + 1;
    }

    let _serverSyncDone = false;
    async function syncServerProgress() {
        if (_serverSyncDone || !window.getParticipantProgress) return;
        try {
            const res = await window.getParticipantProgress('math-for-ai');
            if (res.status === 'success' && Array.isArray(res.data)) {
                const serverCompleted = res.data.filter(row => row.status === 'completed').map(row => String(row.chapter_id));
                SUBMODULES.forEach(sub => {
                    const state = readState(sub);
                    let changed = false;
                    sub.items.forEach(item => {
                        const chId = String(getNumericChapterId(sub, item));
                        if (serverCompleted.includes(chId) && !state.completed.includes(item.id)) {
                            state.completed.push(item.id);
                            changed = true;
                        }
                    });
                    if (changed) writeState(sub, state);
                });
                _serverSyncDone = true;
            }
        } catch (e) {
            console.error('[Math Learning] Sync failed:', e);
        }
    }

    function readState(submodule) {
        try {
            const value = JSON.parse(localStorage.getItem(submodule.storageKey) || '{}');
            return { completed: Array.isArray(value.completed) ? value.completed : [] };
        } catch (error) {
            return { completed: [] };
        }
    }

    function writeState(submodule, state) {
        localStorage.setItem(submodule.storageKey, JSON.stringify({ completed: [...new Set(state.completed)] }));
    }

    async function markComplete(submodule, id) {
        const state = readState(submodule);
        if (!state.completed.includes(id)) {
            state.completed.push(id);
            writeState(submodule, state);
            
            if (window.saveChapterProgress) {
                const item = submodule.items.find(i => i.id === id);
                if (item) {
                    const chapterId = getNumericChapterId(submodule, item);
                    await window.saveChapterProgress('math-for-ai', chapterId, 'completed');
                }
            }
        }
        return state;
    }

    async function renderOverviewProgress() {
        const page = document.querySelector('.math-course-overview');
        if (!page) return;
        await syncServerProgress();

        const overview = SUBMODULES.map(submodule => {
            const state = readState(submodule);
            const completed = submodule.items.filter(item => state.completed.includes(item.id));
            return { submodule, state, completed };
        });
        const completedCount = overview.reduce((total, entry) => total + entry.completed.length, 0);
        const totalCount = overview.reduce((total, entry) => total + entry.submodule.items.length, 0);
        const progress = Math.round(completedCount / totalCount * 100);
        const firstIncomplete = overview.flatMap(entry => entry.submodule.items.map(item => ({ submodule: entry.submodule, item, state: entry.state })))
            .find(entry => !entry.state.completed.includes(entry.item.id));
        const action = page.querySelector('[data-math-overview-action]');
        const progressCopy = page.querySelector('[data-math-overview-copy]');
        const donut = page.querySelector('[data-math-overview-donut]');

        page.querySelectorAll('[data-math-overview-progress], [data-math-overview-side-progress]').forEach(node => {
            node.textContent = `${progress}%`;
        });
        page.querySelector('[data-math-overview-bar]')?.style.setProperty('--value', `${progress}%`);

        if (donut) {
            donut.style.setProperty('--completed-end', `${progress}%`);
            donut.style.setProperty('--started-end', `${progress}%`);
            donut.setAttribute('aria-label', `Progres Math for AI: ${progress} persen`);
        }

        if (progressCopy) {
            progressCopy.textContent = completedCount
                ? `${completedCount} dari ${totalCount} bagian selesai di perangkat ini.`
                : `${totalCount} bagian belajar dari dua submodul siap dijelajahi di perangkat ini.`;
        }

        if (action) {
            action.href = firstIncomplete?.item.route || SUBMODULES[0].items[0].route;
            action.innerHTML = firstIncomplete
                ? `Lanjutkan Submodul ${firstIncomplete.submodule.id} <i class="fas fa-play" aria-hidden="true"></i>`
                : `Buka Kembali Math for AI <i class="fas fa-rotate-right" aria-hidden="true"></i>`;
        }

        overview.forEach(entry => page.querySelector(`[data-math-submodule="${entry.submodule.id}"]`)
            ?.classList.toggle('done', entry.completed.length === entry.submodule.items.length));
    }

    function loadScriptOnce(src, key) {
        if (document.querySelector(`script[data-math-runtime="${key}"]`)) {
            return new Promise((resolve, reject) => {
                const existing = document.querySelector(`script[data-math-runtime="${key}"]`);
                if (existing.dataset.ready === 'true') return resolve();
                existing.addEventListener('load', resolve, { once: true });
                existing.addEventListener('error', reject, { once: true });
            });
        }
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.dataset.mathRuntime = key;
            script.onload = () => {
                script.dataset.ready = 'true';
                resolve();
            };
            script.onerror = () => reject(new Error(`Asset ${key} gagal dimuat.`));
            document.head.appendChild(script);
        });
    }

    function ensureRuntime() {
        const tasks = [];
        if (!window.marked) tasks.push(loadScriptOnce(`/vendor/marked/marked.umd.js?v=18.0.9`, 'marked'));
        if (!window.katex) tasks.push(loadScriptOnce(`/vendor/katex/katex.min.js?v=0.18.3`, 'katex'));
        return Promise.all(tasks).then(() => {
            if (!window.marked || !window.katex) throw new Error('Markdown atau KaTeX runtime tidak tersedia.');
        });
    }

    function extractTitle(markdown, fallback) {
        const matches = [...String(markdown).matchAll(/^#\s+(.+)$/gm)];
        if (!matches.length) return fallback;
        if (/^00\s*[—-]/.test(matches[0][1]) && matches[1]) return matches[1][1].trim();
        return matches[0][1].trim();
    }

    function extractMeta(markdown) {
        const meta = {};
        const block = String(markdown).split('\n').slice(0, 16);
        block.forEach(line => {
            const match = line.match(/^>?\s*\*\*([^*]+):\*\*\s*(.+?)\s{0,2}$/);
            if (match) meta[match[1].trim().toLowerCase()] = match[2].replace(/\s{2,}$/, '').trim();
        });
        return meta;
    }

    function stripLeadingAuthoringMetadata(markdown) {
        const lines = String(markdown).split('\n');
        const separatorIndex = lines.findIndex((line, index) => index < 24 && line.trim() === '---');
        if (separatorIndex < 0) return String(markdown);
        const header = lines.slice(0, separatorIndex);
        const metaStart = header.findIndex(line => /^>\s*/.test(line) || /^\*\*[^*]+:\*\*/.test(line));
        if (metaStart < 0) return String(markdown);
        const metaBlock = header.slice(metaStart);
        const hasStructuredMetadata = metaBlock.some(line => /^>?\s*\*\*[^*]+:\*\*/.test(line) || /^>?\s*(?:\*\*|)Final Consolidation/.test(line));
        if (!hasStructuredMetadata) return String(markdown);
        return [...header.slice(0, metaStart), ...lines.slice(separatorIndex + 1)].join('\n');
    }

    function cleanMetaValue(value) {
        return String(value || '')
            .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
            .replace(/[*_`]/g, '')
            .replace(/\s{2,}/g, ' ')
            .trim();
    }

    function buildLearnerContext(meta) {
        const entries = [
            { key: 'prerequisite', label: 'Sebelum mulai', icon: 'fa-layer-group' },
            { key: 'boundary', label: 'Batas pembahasan', icon: 'fa-shield-halved' },
            { key: 'forward dependency', label: 'Lanjutan belajar', icon: 'fa-arrow-trend-up' }
        ].filter(entry => meta[entry.key]);
        if (!entries.length) return '';
        return `<aside class="math-learning-context" aria-label="Konteks pembelajaran">${entries.map(entry => `<div class="math-learning-context-item"><i class="fas ${entry.icon}" aria-hidden="true"></i><div><strong>${entry.label}</strong><p>${escapeHtml(cleanMetaValue(meta[entry.key]))}</p></div></div>`).join('')}</aside>`;
    }

    function extractLead(markdown, fallback) {
        const lines = String(markdown).split('\n');
        let pastMetadata = false;
        for (const rawLine of lines) {
            const line = rawLine.trim();
            if (line === '---') {
                pastMetadata = true;
                continue;
            }
            if (!pastMetadata || !line || /^(#|>|[-*+]\s|\d+\.\s|\$\$|```)/.test(line)) continue;
            return line
                .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
                .replace(/[*_`]/g, '')
                .replace(/\[R\d+\]/g, '')
                .trim();
        }
        return fallback;
    }

    function extractInteractiveSpecs(markdown) {
        const lines = String(markdown).split('\n');
        const specs = [];
        const kept = [];
        const markerPattern = '(STATIC VISUAL|INTERACTIVE VISUAL|NUMBER MANIPULATOR|COMPARE VIEW|STEP-BY-STEP REVEAL)';
        for (let index = 0; index < lines.length;) {
            const directMarker = lines[index].match(new RegExp(`^(#{1,6})\\s+(?:\\d+\\.\\s+)?\\[${markerPattern}\\]\\s+(.+)$`));
            const specHeading = lines[index].match(/^(#{1,6})\s+(?:\d+\.\s+)?(?:Visual\s*\/\s*Interactive Spec(?:ification)?|Visualization Spec(?:ification)?|Interactive Spec(?:ification)?)(?:\s+\d+)?\s*(?:[—-]\s*(.*))?$/i);
            let markerType = directMarker?.[2] || '';
            let markerTitle = directMarker?.[3]?.trim() || specHeading?.[2]?.trim() || '';
            let markerLevel = (directMarker?.[1] || specHeading?.[1] || '').length;
            if (specHeading) {
                for (let lookahead = index + 1; lookahead < Math.min(lines.length, index + 6); lookahead += 1) {
                    const label = lines[lookahead].match(new RegExp(`\\[${markerPattern}\\](?:\\s+(.*))?`, 'i'));
                    if (label) {
                        markerType = label[1];
                        if (!markerTitle && label[2]) markerTitle = label[2].trim();
                        break;
                    }
                }
            }
            if (!markerType) {
                kept.push(lines[index]);
                index += 1;
                continue;
            }
            const specLines = [lines[index]];
            index += 1;
            while (index < lines.length) {
                const heading = lines[index].match(/^(#{1,6})\s+/);
                if (heading && heading[1].length <= markerLevel) break;
                specLines.push(lines[index]);
                index += 1;
            }
            specs.push({ type: markerType.toUpperCase(), title: markerTitle, source: specLines.join('\n') });
            kept.push('', `HERAI_INTERACTIVE_${specs.length - 1}`, '');
        }
        return { markdown: kept.join('\n'), specs };
    }

    function extractDiagnostic(markdown) {
        const source = String(markdown);
        const section = source.match(/^#\s+6\.\s+Diagnostic Ringan\s*\n([\s\S]*?)(?=\n---\s*\n\n#\s+7\.)/m);
        if (!section) return { markdown: source, data: null };

        const body = section[1];
        const questionMatches = [...body.matchAll(/^##\s+(D\d+)\s*\n([\s\S]*?)(?=^##\s+D\d+\s*$|^###\s+Kunci Diagnostic\s*$)/gm)];
        const keyLine = (body.match(/^###\s+Kunci Diagnostic\s*\n+([^\n]+)/m) || [])[1] || '';
        const answers = Object.fromEntries(
            [...keyLine.matchAll(/(D\d+)\s+([A-D])/g)].map(match => [match[1], match[2]])
        );
        const questions = questionMatches.map(match => {
            const questionBody = match[2].trim();
            const optionMatches = [...questionBody.matchAll(/^([A-D])\.\s+(.+?)\s*$/gm)];
            const promptEnd = optionMatches[0]?.index ?? questionBody.length;
            return {
                id: match[1],
                prompt: questionBody.slice(0, promptEnd).trim(),
                options: optionMatches.map(option => ({ letter: option[1], text: option[2].trim() })),
                answer: answers[match[1]]
            };
        });

        const isComplete = questions.length === 10
            && questions.every(question => question.answer && question.options.length >= 2);
        if (!isComplete) {
            console.warn('[Math Learning] Diagnostic source tidak lengkap; fallback ke Markdown biasa.');
            return { markdown: source, data: null };
        }

        const introEnd = body.search(/^##\s+D1\s*$/m);
        return {
            markdown: source.replace(section[0], '\nHERAI_DIAGNOSTIC_BLOCK\n'),
            data: {
                intro: introEnd >= 0 ? body.slice(0, introEnd).trim() : '',
                questions
            }
        };
    }

    function removeAndShiftTitle(markdown) {
        let skippedPrimary = false;
        let skippedInfoLabel = false;
        let beforeBody = true;
        let fenced = false;
        return String(markdown).split('\n').map(line => {
            if (/^```/.test(line)) {
                fenced = !fenced;
                return line;
            }
            if (fenced) return line;
            if (beforeBody && /^#\s+/.test(line)) {
                if (!skippedPrimary && /^#\s+00\s*[—-]/.test(line)) {
                    skippedInfoLabel = true;
                    return '';
                }
                if (!skippedPrimary) {
                    skippedPrimary = true;
                    beforeBody = false;
                    return '';
                }
            }
            if (skippedInfoLabel && !skippedPrimary && line.trim() === '') return line;
            if (line.trim() && !/^>/.test(line) && !/^---$/.test(line)) beforeBody = false;
            const heading = line.match(/^(#{1,5})\s+(.+)$/);
            return heading ? `${heading[1]}# ${heading[2]}` : line;
        }).join('\n');
    }

    function protectMath(markdown) {
        const tokens = [];
        const lines = String(markdown).split('\n');
        let fenced = false;
        const output = [];
        for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
            const line = lines[lineIndex];
            if (/^\s*```/.test(line)) {
                fenced = !fenced;
                output.push(line);
                continue;
            }
            if (fenced) {
                output.push(line);
                continue;
            }
            if (line.trim() === '$$') {
                const expressionLines = [];
                let closingIndex = lineIndex + 1;
                while (closingIndex < lines.length && lines[closingIndex].trim() !== '$$') {
                    expressionLines.push(lines[closingIndex]);
                    closingIndex += 1;
                }
                if (closingIndex < lines.length) {
                    const token = `HERAI_MATH_${tokens.length}_DISPLAY`;
                    tokens.push({ token, expression: expressionLines.join('\n').trim(), display: true });
                    output.push('', token, '');
                    lineIndex = closingIndex;
                    continue;
                }
            }
            let result = '';
            let cursor = 0;
            let inlineCode = false;
            while (cursor < line.length) {
                const char = line[cursor];
                if (char === '`' && line[cursor - 1] !== '\\') {
                    inlineCode = !inlineCode;
                    result += char;
                    cursor += 1;
                    continue;
                }
                if (!inlineCode && char === '$' && line[cursor - 1] !== '\\') {
                    const display = line[cursor + 1] === '$';
                    const delimiter = display ? '$$' : '$';
                    const start = cursor + delimiter.length;
                    let end = start;
                    while (end < line.length) {
                        if (line.startsWith(delimiter, end) && line[end - 1] !== '\\') break;
                        end += 1;
                    }
                    if (end < line.length) {
                        const expression = line.slice(start, end);
                        const token = `HERAI_MATH_${tokens.length}_${display ? 'DISPLAY' : 'INLINE'}`;
                        tokens.push({ token, expression, display });
                        result += token;
                        cursor = end + delimiter.length;
                        continue;
                    }
                }
                result += char;
                cursor += 1;
            }
            output.push(result);
        }
        return { markdown: output.join('\n'), tokens };
    }

    function renderKatex(expression, display) {
        try {
            const html = window.katex.renderToString(expression, {
                displayMode: display,
                throwOnError: true,
                output: 'htmlAndMathml',
                strict: 'warn',
                trust: false
            });
            return display
                ? `<div class="math-learning-math-display" data-katex-source="${escapeHtml(expression)}">${html}</div>`
                : `<span class="math-learning-math-inline" data-katex-source="${escapeHtml(expression)}">${html}</span>`;
        } catch (error) {
            console.error('[Math Learning] KaTeX render failed:', expression, error);
            return `<span class="math-learning-math-error" title="Formula gagal dirender">${escapeHtml(expression)}</span>`;
        }
    }

    function renderMarkdown(markdown, interactiveSpecs) {
        if (markdown.includes('VISUAL / INTERACTIVE SPEC')) {
            const keyMap = {
                'Input → Function → Output': 'input-function-output',
                'Function Value Explorer': 'function-value-explorer',
                'Linear vs Quadratic': 'linear-vs-quadratic',
                'HerAI Instructional Score Reader': 'herai-instructional-score-reader',
                'Rise, Run, dan Dua Titik': 'rise-run-dan-dua-titik',
                'Geser Endpoint': 'geser-endpoint',
                'Linear vs Nonlinear': 'linear-vs-nonlinear',
                'HerAI Instructional Rate': 'herai-instructional-rate',
                'Secant → Tangent': 'secant-tangent',
                'Ubah $h$': 'ubah-h',
                'Average vs Local': 'average-vs-local',
                'Corner yang Tidak Differentiable': 'corner-yang-tidak-differentiable',
                'Derivative Function sebagai “Peta Slope”': 'derivative-function-sebagai-peta-slope',
                'Power Rule Manipulator': 'power-rule-manipulator',
                'Differentiate Term by Term': 'differentiate-term-by-term',
                'Surface dan Dua Slice': 'surface-dan-dua-slice',
                'Hold One Variable Fixed': 'hold-one-variable-fixed',
                'HerAI Sensitivity': 'herai-sensitivity',
                'Partial Components → Gradient Vector': 'partial-components-gradient-vector',
                'Contour + Gradient Arrow': 'contour-gradient-arrow',
                'Gradient vs Negative Gradient': 'gradient-vs-negative-gradient',
                'Canonical HerAI Gradient': 'canonical-herai-gradient',
                'Serial Computational Graph': 'serial-computational-graph',
                'Ubah Inner Sensitivity': 'ubah-inner-sensitivity',
                'Direct Formula vs Composed View': 'direct-formula-vs-composed-view',
                'Chain Rule vs Optimization Boundary': 'chain-rule-vs-optimization-boundary',
                '— 1D Loss Curve + Local Tangent': '1d-loss-curve-local-tangent',
                '— Move One Parameter on a Loss Curve': 'move-one-parameter-on-a-loss-curve',
                '— 2D Contour + Gradient Arrow': '2d-contour-gradient-arrow',
                '— Explore 2D Landscape': 'explore-2d-landscape',
                '— Score vs Loss': 'score-vs-loss',
                '— Calculus → Optimization Boundary': 'calculus-optimization-boundary'
            };

            const replaceBlock = (regex, formatType) => {
                let match;
                while ((match = regex.exec(markdown)) !== null) {
                    const fullMatch = match[0];
                    const title = formatType === 1 ? match[2].trim() : match[1].trim();
                    const key = keyMap[title];
                    if (key) {
                        const startIndex = match.index;
                        const searchStr = markdown.substring(startIndex + fullMatch.length);
                        const nextSectionMatch = searchStr.match(/\n(#|---)/);
                        let endIndex = markdown.length;
                        if (nextSectionMatch) {
                            endIndex = startIndex + fullMatch.length + nextSectionMatch.index;
                        }
                        const replacement = `<div data-math-interactive="${key}"></div>\n`;
                        markdown = markdown.substring(0, startIndex) + replacement + markdown.substring(endIndex);
                        regex.lastIndex = 0;
                    }
                }
            };
            replaceBlock(/##\s+\[(.*?)\]\s+(.*?)\n/g, 1);
            replaceBlock(/#\s+\d+\.\s+VISUAL\s+\/\s+INTERACTIVE\s+SPEC\s+—\s+(.*?)\n/g, 2);
            markdown = markdown.replace(/#\s+\d+\.\s+VISUAL\s+\/\s+INTERACTIVE\s+SPEC\s*\n+/g, '');
        }
        
        markdown = markdown.replace(/>\s*Browser-level target HerAI Markdown parser \+ KaTeX runtime:\s*\*\*NOT TESTED \/ NOT CLAIMED\*\*\./g, '');
        markdown = markdown.replace(/##\s*Program\s*\n[\s\S]*?(?=\n##\s)/gi, '');
        markdown = markdown.replace(/##\s*Status\s*\n[\s\S]*?(?=\n##\s)/gi, '');

        const math = protectMath(markdown);
        let html = window.marked.parse(math.markdown, { gfm: true, breaks: false, pedantic: false });
        math.tokens.forEach(item => {
            const rendered = renderKatex(item.expression, item.display);
            html = html.replace(`<p>${item.token}</p>`, rendered).replaceAll(item.token, rendered);
        });
        interactiveSpecs.forEach((_spec, index) => {
            const token = `HERAI_INTERACTIVE_${index}`;
            html = html.replace(`<p>${token}</p>`, `<div data-math-interactive="${index}"></div>`).replaceAll(token, `<div data-math-interactive="${index}"></div>`);
        });
        html = html.replace('<p>HERAI_DIAGNOSTIC_BLOCK</p>', '<div data-math-diagnostic></div>');
        return html;
    }

    function mountDiagnostic(container, diagnostic) {
        const placeholder = container.querySelector('[data-math-diagnostic]');
        if (!placeholder || !diagnostic?.questions?.length) return;

        const section = document.createElement('section');
        section.className = 'math-learning-diagnostic';
        section.setAttribute('aria-labelledby', 'mathDiagnosticTitle');
        section.innerHTML = `
            <div class="math-learning-diagnostic-heading">
                <span><i class="fas fa-route" aria-hidden="true"></i> Cek kesiapan awal</span>
                <h2 id="mathDiagnosticTitle">6. Diagnostic Ringan</h2>
            </div>
            <div class="math-learning-diagnostic-intro">${renderMarkdown(diagnostic.intro, [])}</div>
            <form class="math-learning-diagnostic-list" data-diagnostic-form novalidate>
                ${diagnostic.questions.map(question => `
                    <fieldset class="math-learning-diagnostic-question" data-diagnostic-question="${question.id}">
                        <legend class="math-learning-visually-hidden">Pertanyaan ${question.id}</legend>
                        <div class="math-learning-diagnostic-prompt">
                            <span aria-hidden="true">${escapeHtml(question.id)}</span>
                            <div>${renderMarkdown(question.prompt, [])}</div>
                        </div>
                        <div class="math-learning-diagnostic-options">
                            ${question.options.map(option => `
                                <label class="math-learning-diagnostic-option">
                                    <input type="radio" name="diagnostic-${question.id}" value="${option.letter}">
                                    <span class="math-learning-diagnostic-letter" aria-hidden="true">${option.letter}</span>
                                    <div>${renderMarkdown(option.text, [])}</div>
                                </label>`).join('')}
                        </div>
                        <p class="math-learning-diagnostic-feedback" data-diagnostic-feedback aria-live="polite"></p>
                    </fieldset>`).join('')}
                <div class="math-learning-diagnostic-actions">
                    <button class="math-learning-action is-primary" type="submit">Periksa jawaban</button>
                    <button class="math-learning-action" type="reset">Ulangi diagnostic</button>
                </div>
                <div class="math-learning-diagnostic-result" data-diagnostic-result role="status" aria-live="polite" hidden></div>
            </form>`;
        placeholder.replaceWith(section);

        const form = section.querySelector('[data-diagnostic-form]');
        const result = section.querySelector('[data-diagnostic-result]');
        const submit = form.querySelector('button[type="submit"]');

        const clearReview = () => {
            section.querySelectorAll('.math-learning-diagnostic-option').forEach(option => {
                option.classList.remove('is-correct', 'is-incorrect');
            });
            section.querySelectorAll('[data-diagnostic-feedback]').forEach(feedback => {
                feedback.className = 'math-learning-diagnostic-feedback';
                feedback.replaceChildren();
            });
            result.hidden = true;
            result.className = 'math-learning-diagnostic-result';
            result.replaceChildren();
            submit.textContent = 'Periksa jawaban';
        };

        form.addEventListener('change', clearReview);
        form.addEventListener('submit', event => {
            event.preventDefault();
            const unanswered = diagnostic.questions.find(question => !form.querySelector(`input[name="diagnostic-${question.id}"]:checked`));
            if (unanswered) {
                const fieldset = form.querySelector(`[data-diagnostic-question="${unanswered.id}"]`);
                result.hidden = false;
                result.className = 'math-learning-diagnostic-result is-warning';
                result.innerHTML = `<i class="fas fa-circle-exclamation" aria-hidden="true"></i><div><strong>Masih ada yang kosong</strong><p>Jawab seluruh 10 pertanyaan sebelum melihat hasil diagnostic.</p></div>`;
                fieldset?.querySelector('input')?.focus();
                fieldset?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                return;
            }

            let correct = 0;
            diagnostic.questions.forEach(question => {
                const fieldset = form.querySelector(`[data-diagnostic-question="${question.id}"]`);
                const selected = fieldset.querySelector('input:checked');
                const correctInput = fieldset.querySelector(`input[value="${question.answer}"]`);
                const feedback = fieldset.querySelector('[data-diagnostic-feedback]');
                const isCorrect = selected.value === question.answer;
                if (isCorrect) correct += 1;
                correctInput.closest('label').classList.add('is-correct');
                if (!isCorrect) selected.closest('label').classList.add('is-incorrect');
                feedback.classList.add(isCorrect ? 'is-correct' : 'is-incorrect');
                feedback.innerHTML = isCorrect
                    ? '<i class="fas fa-circle-check" aria-hidden="true"></i><strong>Benar.</strong>'
                    : `<i class="fas fa-circle-xmark" aria-hidden="true"></i><strong>Belum tepat.</strong> Jawaban yang benar: ${question.answer}.`;
            });

            const path = correct <= 4 ? 'Foundation Path' : (correct <= 7 ? 'Standard Path' : 'Accelerated Path');
            result.hidden = false;
            result.className = 'math-learning-diagnostic-result is-complete';
            result.innerHTML = `<div class="math-learning-diagnostic-score"><strong>${correct}<span>/10</span></strong><small>Jawaban benar</small></div><div><span>Rekomendasi awal</span><h3>${path}</h3><p>Diagnostic ini bukan tes kelulusan. Gunakan hasilnya untuk memilih jalur belajar pada bagian berikutnya.</p></div>`;
            submit.textContent = `Skor ${correct}/10`;
            result.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
        form.addEventListener('reset', () => {
            window.setTimeout(() => {
                clearReview();
                form.querySelector('input')?.focus();
            }, 0);
        });
    }

    function slugify(value) {
        return String(value).toLowerCase().normalize('NFKD').replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').slice(0, 90);
    }

    function enhanceMarkdown(container, specs) {
        container.querySelectorAll('h2, h3, h4').forEach((heading, index) => {
            if (!heading.id) heading.id = `${slugify(heading.textContent) || 'bagian'}-${index + 1}`;
        });
        container.querySelectorAll('table').forEach(table => {
            if (table.parentElement?.classList.contains('math-learning-table-wrap')) return;
            const wrapper = document.createElement('div');
            wrapper.className = 'math-learning-table-wrap';
            wrapper.tabIndex = 0;
            wrapper.setAttribute('role', 'region');
            wrapper.setAttribute('aria-label', 'Tabel materi, dapat digulir horizontal');
            table.parentNode.insertBefore(wrapper, table);
            wrapper.appendChild(table);
        });
        container.querySelectorAll('a[href]').forEach(link => {
            const href = link.getAttribute('href') || '';
            if (/^https?:\/\//i.test(href)) {
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
            }
        });
        transformPedagogicalMarkers(container);
        specs.forEach((spec, index) => {
            const placeholder = container.querySelector(`[data-math-interactive="${index}"]`);
            if (placeholder) placeholder.replaceWith(createInteractive(spec));
        });
        removeAuthoringSections(container);
        if (getCurrentContext()?.item.type === 'practice') collapseExerciseSupport(container);
    }

    function transformPedagogicalMarkers(container) {
        const headings = [...container.querySelectorAll('h2, h3, h4')];
        headings.forEach(heading => {
            const text = heading.textContent.toLowerCase();
            let cardType = null;
            let icon = '';
            let newTitle = '';

            if (text.includes('prediksi')) {
                cardType = 'prediction'; icon = 'fa-lightbulb';
                newTitle = heading.textContent.replace(/^[\d\.\s]*Prediksi[\s—-]*(.*)$/i, 'Prediksi: $1').replace(/:\s*$/, '');
            } else if (text.includes('miskonsepsi')) {
                cardType = 'misconception'; icon = 'fa-triangle-exclamation';
                newTitle = heading.textContent.replace(/^[\d\.\s]*Miskonsepsi[\s—-]*(.*)$/i, 'Miskonsepsi: $1').replace(/:\s*$/, '');
            } else if (text.includes('math reading skill')) {
                cardType = 'reading-skill'; icon = 'fa-book-open';
                newTitle = heading.textContent.replace(/^[\d\.\s]*Math Reading Skill[\s—-]*(.*)$/i, 'Cara Membaca: $1').replace(/:\s*$/, '');
            } else if (text.includes('change one thing')) {
                cardType = 'reasoning'; icon = 'fa-sliders';
                newTitle = heading.textContent.replace(/^[\d\.\s]*Change One Thing[\s—-]*(.*)$/i, 'Eksplorasi: $1').replace(/:\s*$/, '');
            } else if (text.includes('mastery check')) {
                cardType = 'mastery'; icon = 'fa-list-check';
                newTitle = heading.textContent.replace(/^[\d\.\s]*Mastery Check[\s—-]*(.*)$/i, 'Mastery Check: $1').replace(/:\s*$/, '');
            } else if (text.includes('intuisi')) {
                cardType = 'intuition'; icon = 'fa-lightbulb';
                newTitle = heading.textContent.replace(/^[\d\.\s]*Intuisi[\s—-]*(.*)$/i, 'Intuisi: $1').replace(/:\s*$/, '');
            } else if (text.includes('try it yourself') || text.includes('coba sendiri')) {
                cardType = 'activity'; icon = 'fa-pen-to-square';
                newTitle = heading.textContent.replace(/^[\d\.\s]*(Try It Yourself|Coba Sendiri)[\s—-]*(.*)$/i, 'Coba Sendiri: $2').replace(/:\s*$/, '');
            }

            if (cardType) {
                const level = parseInt(heading.tagName[1]);
                const siblings = [];
                let next = heading.nextElementSibling;
                while (next) {
                    if (/^H[1-6]$/.test(next.tagName)) {
                        if (parseInt(next.tagName[1]) <= level) break;
                    }
                    siblings.push(next);
                    next = next.nextElementSibling;
                }
                if (siblings.length === 0 && !newTitle.trim()) return;
                
                const wrapper = document.createElement('div');
                wrapper.className = `math-learning-interactive-card math-learning-card-${cardType}`;
                wrapper.style.marginTop = '24px';
                wrapper.style.marginBottom = '24px';
                wrapper.innerHTML = `<h4 style="display:flex; align-items:center; gap:8px;"><i class="fas ${icon}" aria-hidden="true" style="color:var(--math-accent);"></i> ${newTitle}</h4>`;
                
                siblings.forEach(el => wrapper.appendChild(el));
                heading.replaceWith(wrapper);
            }
        });
    }

    function removeAuthoringSections(container) {
        const headings = [...container.querySelectorAll('h2, h3')];
        headings.forEach(heading => {
            if (!/QA Notes|STOP(?: CHECKPOINT| Gate)|Math Authoring Contract|Assessment Alignment|KaTeX\s*[—-]\s*(?:Supported Functions|Auto-render Extension)/i.test(heading.textContent)) return;
            if (!heading.isConnected) return;
            const level = Number(heading.tagName.slice(1));
            let node = heading;
            while (node) {
                const nodeLevel = /^H[1-6]$/.test(node.tagName || '') ? Number(node.tagName.slice(1)) : 7;
                if (node !== heading && nodeLevel <= level) break;
                const next = node.nextSibling;
                node.remove();
                node = next;
            }
        });
    }

    function collapseExerciseSupport(container) {
        const labels = /Staged Hints|Expected Reasoning|Strong Answer Example|Common Mistakes/i;
        [...container.querySelectorAll('h3')].forEach(heading => {
            if (!labels.test(heading.textContent)) return;
            const details = document.createElement('details');
            details.className = 'math-learning-reveal';
            const summary = document.createElement('summary');
            summary.innerHTML = `<i class="fas fa-eye" aria-hidden="true"></i> ${escapeHtml(heading.textContent)}`;
            const body = document.createElement('div');
            body.className = 'math-learning-reveal-body';
            heading.parentNode.insertBefore(details, heading);
            details.append(summary, body);
            let node = heading.nextSibling;
            heading.remove();
            while (node && !['H2', 'H3'].includes(node.tagName)) {
                const next = node.nextSibling;
                body.appendChild(node);
                node = next;
            }
        });
    }

    function iconForInteractive(type) {
        if (type === 'NUMBER MANIPULATOR') return 'fa-sliders';
        if (type === 'COMPARE VIEW') return 'fa-code-compare';
        if (type === 'STEP-BY-STEP REVEAL') return 'fa-list-ol';
        return 'fa-hand-pointer';
    }

    function interactiveSpecField(source, label) {
        const pattern = new RegExp(`\\*\\*${label}:\\*\\*\\s*`, 'i');
        const match = pattern.exec(source);
        if (!match) return '';
        const remainder = source.slice(match.index + match[0].length);
        const nextLabel = remainder.search(/\n\*\*[^*\n]+:\*\*/);
        return (nextLabel >= 0 ? remainder.slice(0, nextLabel) : remainder).trim();
    }

    function interactiveShell(spec, body) {
        const section = document.createElement('section');
        section.className = 'math-learning-interactive';
        section.dataset.interactiveTitle = spec.title;
        const purpose = interactiveSpecField(spec.source, 'Learning purpose');
        const action = interactiveSpecField(spec.source, 'Learner action');
        const guidance = purpose || action ? `
            <div class="math-learning-interactive-guidance">
                ${purpose ? `<div><strong>Tujuan belajar</strong>${renderMarkdown(purpose, [])}</div>` : ''}
                ${action ? `<div><strong>Yang kamu lakukan</strong>${renderMarkdown(action, [])}</div>` : ''}
            </div>` : '';
        section.innerHTML = `
            <header class="math-learning-interactive-head">
                <div class="math-learning-interactive-icon"><i class="fas ${iconForInteractive(spec.type)}" aria-hidden="true"></i></div>
                <div><span>${escapeHtml(spec.type.replaceAll('-', ' '))}</span><h3>${escapeHtml(spec.title)}</h3></div>
            </header>
            ${guidance}
            <div class="math-learning-interactive-body">${body}</div>
            <div class="math-learning-feedback" data-feedback aria-live="polite">Eksplorasi komponen untuk melihat hubungan konsepnya.</div>`;
        return section;
    }

    function createInteractive(spec) {
        const key = slugify(spec.title);
        const section = interactiveShell(spec, interactiveTemplate(key, spec));
        bindInteractive(section, key);
        return section;
    }

    function mathHtml(expression, display) {
        return renderKatex(expression, Boolean(display));
    }

    function interactiveTemplate(key, spec) {
        const templates = interactiveTemplates(spec);
        if (templates[key]) return templates[key];
        const initial = interactiveSpecFieldAny(spec.source, ['Initial state/data', 'Initial state', 'Initial vector', 'Initial data']);
        const expected = interactiveSpecFieldAny(spec.source, ['Expected behavior', 'Expected message']);
        const sourceFeedback = interactiveSpecFieldAny(spec.source, ['Feedback']);
        const safety = interactiveSpecFieldAny(spec.source, ['Safety / interpretation note', 'Safety note', 'Safety']);
        return `<div class="math-learning-spec-fallback">
            ${initial ? `<div class="math-learning-interactive-card"><h4>Keadaan awal</h4>${renderMarkdown(initial, [])}</div>` : '<p>Prediksi hasil visual ini sebelum membuka urutan penjelasannya.</p>'}
            <details class="math-learning-spec-details"><summary><i class="fas fa-layer-group" aria-hidden="true"></i> Buka visual langkah demi langkah</summary><div>
                ${expected ? `<h4>Yang akan diamati</h4>${renderMarkdown(expected, [])}` : '<p>Bandingkan representasi, proses, dan interpretasinya secara berurutan.</p>'}
                ${sourceFeedback ? `<h4>Feedback</h4>${renderMarkdown(sourceFeedback, [])}` : ''}
                ${safety ? `<aside class="math-learning-spec-safety"><strong>Catatan interpretasi</strong>${renderMarkdown(safety, [])}</aside>` : ''}
            </div></details></div>`;
    }

    function interactiveTemplates(spec) {
        return {
            'real-world-representation': `<div class="math-learning-compare"><div class="math-learning-interactive-card"><h4>Alya di dunia nyata</h4><p>Seorang peserta dengan konteks, pengalaman, dan keadaan yang tidak sepenuhnya tertangkap sistem.</p></div><div class="math-learning-interactive-card"><h4>Yang direkam sistem</h4><ol data-representation-list></ol></div></div><div class="math-learning-button-row"><button class="math-learning-action is-primary" type="button" data-representation-next>Lihat apa yang direkam sistem</button></div>`,
            'rich-vs-compressed-representation': `<div class="math-learning-compare"><div class="math-learning-interactive-card"><h4>Representasi kaya</h4><strong>Quiz Score = 8/10</strong></div><div class="math-learning-interactive-card"><h4>Representasi ringkas</h4><strong>Quiz Result = Pass</strong></div></div><div class="math-learning-button-row">${['Berapa jawaban benar?','Apakah peserta lulus?','Bisakah membedakan 6/10 dan 10/10 jika keduanya Pass?'].map((q,i)=>`<button class="math-learning-choice" type="button" data-rich-question="${i}">${q}</button>`).join('')}</div>`,
            'does-this-number-behave-like-a-number': roleSorter(['45 minutes','8 correct answers','55281 postal code','Basic = 1','Medium = 2','High = 3'], ['Quantitative','Categorical / label','Needs context']),
            'encoding-trap': `${mathHtml('Red=1,\\quad Green=2,\\quad Blue=3', true)}${mathHtml('3-1=2', true)}<p>Apakah biru dua unit lebih jauh dari merah secara warna?</p><div class="math-learning-button-row"><button class="math-learning-action is-primary" type="button" data-generic-reveal>Periksa kesimpulan</button></div>`,
            'what-does-one-row-mean': `<div class="math-learning-button-row"><button class="math-learning-choice" type="button" data-row-unit="participant">Participant</button><button class="math-learning-choice" type="button" data-row-unit="session">Study Session</button></div><div class="math-learning-chip-list" data-row-output></div>`,
            'column-role-sorter': roleSorter(['participant_id','quiz_correct','quiz_total','completion_done','study_duration_min','mastery_after_material'], ['Identifier','Candidate Feature','Target','Context / Needs Task Definition']),
            'features-prediction-vs-target': stepTemplate(['Features Alya: quiz = 8, completion = 6, duration = 45','Model memproses features', mathHtml('\\hat{y}^{(1)}=\\text{Yes}', true) + '<p>Model Prediction</p>', mathHtml('y^{(1)}=\\text{Yes}', true) + '<p>Observed Target — tetap berbeda peran walau nilainya sama.</p>']),
            'same-column-different-task': compareReveal('Predict mastery','study_duration → Feature','Predict next-session duration','study_duration_next → Target','Role sebuah field bergantung pada problem definition.'),
            'time-travel-feature-trap': choiceCheck(['previous_quiz_score','previous_completion','previous_study_duration','post_material_quiz_score'], 'Pilih data yang tersedia sebelum material dimulai.'),
            'fraction-decimal-percentage': `<div class="math-learning-control-grid"><label class="math-learning-control">Numerator<input type="number" min="0" step="1" value="6" data-fraction-num></label><label class="math-learning-control">Denominator<input type="number" min="1" step="1" value="8" data-fraction-den></label></div><div class="math-learning-equation-result" data-fraction-output></div>`,
            'denominator-matters': choiceReveal(['6/8','7/10'],'Mana proporsi yang lebih besar?','6/8 = 75%, sedangkan 7/10 = 70%. Bandingkan proporsi, bukan hanya pembilang.'),
            'same-numerator-different-whole': compareReveal('8/10','Belum dikonversi','8/20','Belum dikonversi','8/10 = 80%, sedangkan 8/20 = 40%. Denominator mengubah whole.'),
            '075-vs-075': stepTemplate(['0.75 dan 0.75% terlihat mirip','0.75 = 75%', '0.75% = 0.0075','Keduanya berbeda dengan faktor 100.']),
            'same-percentage-different-denominator': compareReveal('1/1','100%','100/100','100%','Persentase sama, tetapi evidence masing-masing berasal dari denominator 1 dan 100.'),
            'meaning-tagger': roleSorter(['completion = 0.75','similarity_score = 0.75','normalized_feature = 0.75','predicted_probability = 0.75'], ['Boleh dibaca 75% chance','Tidak otomatis probability']),
            'from-data-to-symbol': stepTemplate(['Quiz ratio Alya = 0.80', mathHtml('q=0.80', true), 'Completion ratio Alya = 0.75', mathHtml('c=0.75', true), 'Symbol memberi nama ringkas pada quantity; maknanya tetap harus didefinisikan.']),
            'expression-builder': `<div class="math-learning-chip-list" data-expression-palette>${['0.6','q','+','0.4','c'].map(v=>`<button class="math-learning-chip" type="button" data-expression-token="${v}">${v}</button>`).join('')}</div><div class="math-learning-equation-result" data-expression-output>...</div><div class="math-learning-button-row"><button class="math-learning-action" type="button" data-expression-reset>Reset</button><button class="math-learning-action is-primary" type="button" data-expression-check>Periksa expression</button></div>`,
            'substitution-engine': stepTemplate([mathHtml('s=0.6q+0.4c', true), mathHtml('s=0.6(0.80)+0.4(0.75)', true), mathHtml('s=0.48+0.30', true), mathHtml('s=0.78', true)]),
            'change-one-input': scoreManipulator(false),
            'change-the-coefficients': scoreManipulator(true),
            'expression-vs-equation': compareReveal('Expression','0.6q + 0.4c','Equation','s = 0.6q + 0.4c','Equation memiliki equality; expression tidak membuat pernyataan equality.'),
            'mathematics-vs-programming-assignment': compareReveal('Mathematical equation','x = x + 1','Possible programming assignment','x = x + 1','Dalam matematika equality ini tidak mungkin untuk bilangan biasa; dalam program, bentuk yang sama dapat berarti update nilai.'),
            'function-machine': `<label class="math-learning-control">Input<input type="number" value="3" data-function-input></label><div class="math-learning-interactive-grid"><div class="math-learning-interactive-card"><h4>Rule</h4><p>× 2, lalu + 1</p></div><div class="math-learning-interactive-card"><h4>Output</h4><strong data-function-output>?</strong></div></div><div class="math-learning-button-row"><button class="math-learning-action is-primary" type="button" data-function-run>Run function</button></div>`,
            'one-input-one-output': oneInputOutputTemplate(),
            'function-notation-vs-multiplication': compareReveal('Function evaluation','f(x)','Multiplication','f × x','Parentheses pada f(x) berarti function f dievaluasi pada input x.'),
            'formula-table': formulaTableTemplate(),
            'herai-one-input-function': oneInputFunctionTemplate(),
            'herai-two-input-function': twoInputFunctionTemplate(),
            'same-input-different-rule': compareReveal('f(x)=2x+1','f(3)=7','g(x)=4x+1','g(3)=13','Input sama dapat menghasilkan output berbeda ketika rule berbeda.'),
            'table-to-ordered-pairs': stepTemplate(['q=0.0 → r(q)=0.20','(0.0, 0.20)','q=0.2 → r(q)=0.30','(0.2, 0.30)','q=0.8 → r(q)=0.60','(0.8, 0.60)','Ordered pairs ini akan menjadi points pada coordinate plane.']),
            'coordinate-plane-basics': coordinateTemplate(),
            'table-points-graph': graphRevealTemplate(),
            'rise-and-run': riseRunTemplate(),
            'average-rate-of-change': averageRateTemplate(),
            'same-data-different-axis-scale': axisScaleTemplate(),
            'hold-completion-fixed': holdCompletionTemplate(),
            'positive-negative-zero-slope': slopeTemplate(),
            'average-vs-instantaneous': stepTemplate(['Dua points pada curve menentukan sebuah secant.','Average rate dibaca di antara dua points.','Jika kedua points dibuat makin dekat, kita mendekati pertanyaan tentang perubahan pada satu saat.','Derivative formal baru akan dipelajari di Calculus.']),
            'power-builder': powerTemplate(),
            '2x-vs-x2': coefficientExponentTemplate(),
            'exponent-logarithm': exponentLogTemplate(),
            'anatomy-of-sigma': stepTemplate([mathHtml('\\sum_{i=1}^{4}x_i', true),'Σ adalah operation','i adalah index','1 dan 4 adalah lower/upper bounds',mathHtml('x_i', true) + '<p>adalah term</p>',mathHtml('x_1+x_2+x_3+x_4', true)]),
            'sigma-calculator': sigmaTemplate(),
            'square-of-sum-vs-sum-of-squares': squareSumTemplate(),
            'read-a-future-ai-formula': stepTemplate([mathHtml('\\frac{1}{n}\\sum_{i=1}^{n}(y^{(i)}-\\hat{y}^{(i)})^2', true),'Baca selisih target dan prediction.','Square setiap selisih.','Sum across observations.','Divide by n.','Formula panjang dapat dibaca sebagai urutan operasi, bukan satu blok simbol.']),
            ...linearAlgebraInteractiveTemplates(spec),
            ...statisticsInteractiveTemplates(spec),
            ...probabilityInteractiveTemplates(spec),
            ...calculusInteractiveTemplates(spec)
        };
    }

    function statisticsInteractiveTemplates(spec) {
        return {
            'matrix-semantic-table': stateToggleTemplate([
                ['Matrix view', `${mathHtml('\\mathbf{X} = \\begin{bmatrix} 0.80 & 0.75 \\\\ 0.60 & 0.625 \\\\ 0.90 & 1.00 \\\\ 0.70 & 0.50 \\end{bmatrix}', true)}<p>Hanya angka dalam grid. Tidak memiliki makna tanpa konteks.</p>`, 'Angka murni.'],
                ['Statistical dataset view', `<div style="overflow-x: auto;"><table class="math-learning-data-table"><thead><tr><th>Participant</th><th>Quiz Ratio (q)</th><th>Completion Ratio (c)</th></tr></thead><tbody><tr><td>Alya</td><td>0.80</td><td>0.75</td></tr><tr><td>Bima</td><td>0.60</td><td>0.625</td></tr><tr><td>Citra</td><td>0.90</td><td>1.00</td></tr><tr><td>Dewi</td><td>0.70</td><td>0.50</td></tr></tbody></table></div><p>n = 4 observations. Baris = observasi; Kolom = variabel.</p>`, 'Dataset dengan semantics dan label.']
            ]),
            'pilih-row-atau-column': `<div class="math-learning-compare"><div class="math-learning-interactive-card" style="flex: 2; overflow-x: auto;"><table class="math-learning-data-table" data-interactive-table><thead><tr><th data-col="participant" style="cursor: pointer;">Participant</th><th data-col="q" style="cursor: pointer;">Quiz Ratio (q)</th><th data-col="c" style="cursor: pointer;">Completion Ratio (c)</th><th data-col="t" style="cursor: pointer;">Study Duration (t)</th></tr></thead><tbody><tr data-row="1" style="cursor: pointer;"><td data-col="participant">Alya</td><td data-col="q">0.80</td><td data-col="c">0.75</td><td data-col="t">45</td></tr><tr data-row="2" style="cursor: pointer;"><td data-col="participant">Bima</td><td data-col="q">0.60</td><td data-col="c">0.625</td><td data-col="t">30</td></tr><tr data-row="3" style="cursor: pointer;"><td data-col="participant">Citra</td><td data-col="q">0.90</td><td data-col="c">1.00</td><td data-col="t">55</td></tr><tr data-row="4" style="cursor: pointer;"><td data-col="participant">Dewi</td><td data-col="q">0.70</td><td data-col="c">0.50</td><td data-col="t">40</td></tr></tbody></table></div><div class="math-learning-interactive-card" style="flex: 1;"><h4 data-table-selection-title>Pilih baris atau kolom</h4><p data-table-selection-desc>Klik salah satu baris untuk melihat observasi, atau salah satu judul kolom untuk melihat variabel.</p></div></div>`,
            'numerical-vs-categorical-vs-identifier': roleSorter(['participant_id = 104', 'study_duration_min = 40', 'track = NLP', 'completion_ratio = 0.50'], ['Identifier', 'Numerical', 'Categorical']),
            'change-the-observational-unit': stateToggleTemplate([
                ['Participant view', `<div style="overflow-x: auto;"><table class="math-learning-data-table"><thead><tr><th>participant</th><th>study_duration_min</th></tr></thead><tbody><tr><td>Alya</td><td>45</td></tr><tr><td>Bima</td><td>30</td></tr><tr><td>Citra</td><td>55</td></tr><tr><td>Dewi</td><td>40</td></tr></tbody></table></div><p>Satu baris mewakili <strong>satu participant</strong>.</p>`, 'Unit observasi adalah participant.'],
                ['Session view (Illustrative)', `<div style="overflow-x: auto;"><table class="math-learning-data-table"><thead><tr><th>participant</th><th>session</th><th>study_duration_min</th></tr></thead><tbody><tr><td>Alya</td><td>1</td><td>20</td></tr><tr><td>Alya</td><td>2</td><td>25</td></tr><tr><td>Bima</td><td>1</td><td>30</td></tr><tr><td>Citra</td><td>1</td><td>25</td></tr><tr><td>Citra</td><td>2</td><td>30</td></tr><tr><td>Dewi</td><td>1</td><td>40</td></tr></tbody></table></div><p>Satu baris mewakili <strong>satu session</strong>. Participant bisa muncul berkali-kali.</p>`, 'Unit observasi adalah session.']
            ]),
            'data-reading-skill': stepTemplate([
                mathHtml('q_3=0.90', true),
                mathHtml('q', true) + ' → variable quiz ratio',
                'subscript 3 → observation ke-3',
                'observation ke-3 → Citra',
                '0.90 → nilai quiz ratio Citra',
                'Makna → 9/10 quiz correct pada canonical data.<br><br><span class="math-learning-preview-note">Peringatan: 0.90 adalah ratio quiz, bukan otomatis probability.</span>'
            ]),
            
            // Topic 02
            'mean-median-mode-pada-number-line': `<div class="math-learning-interactive-card" style="text-align:center;"><h4>Pusat Data pada Number Line</h4><p>Tiga ukuran pusat (Mean, Median, Mode) tidak selalu berada di titik yang sama.</p><div style="position:relative; width:100%; height:60px; margin-top:20px; border-bottom:2px solid var(--math-border);"><div style="position:absolute; bottom:-10px; left:10%; width:80%; border-bottom:2px solid #ccc;"></div><div style="position:absolute; bottom:0; left:30%; width:20px; height:20px; background:var(--math-ink); border-radius:50%; transform:translateX(-50%);"></div><div style="position:absolute; bottom:0; left:30%; width:20px; height:20px; background:var(--math-ink); border-radius:50%; transform:translate(-50%, -25px);"></div><span style="position:absolute; bottom:55px; left:30%; transform:translateX(-50%); font-size:12px; font-weight:bold;">Mode (paling tinggi)</span><div style="position:absolute; bottom:0; left:45%; width:2px; height:45px; background:var(--math-accent);"></div><span style="position:absolute; bottom:50px; left:45%; transform:translateX(-50%); font-size:12px; font-weight:bold; color:var(--math-accent);">Median (tengah observasi)</span><div style="position:absolute; bottom:0; left:60%; width:2px; height:45px; background:#c9166c;"></div><span style="position:absolute; bottom:50px; left:60%; transform:translateX(-50%); font-size:12px; font-weight:bold; color:#c9166c;">Mean (titik seimbang)</span></div></div>`,
            'change-one-extreme-value': `<div class="math-learning-interactive-card"><label class="math-learning-control">Ubah nilai observasi ke-4 (Eksperimen Sensitivitas)<input type="range" min="45" max="150" step="5" value="55" data-stat-extreme><output>55</output></label><div style="margin-top:20px; display:flex; gap:20px; text-align:center;"><div class="math-learning-stat-box" style="flex:1; padding:15px; background:#f9f9f9; border-radius:8px;"><h4>Mean</h4><strong data-stat-mean style="font-size:24px; color:#c9166c;">42.5</strong></div><div class="math-learning-stat-box" style="flex:1; padding:15px; background:#f9f9f9; border-radius:8px;"><h4>Median</h4><strong data-stat-median style="font-size:24px; color:var(--math-accent);">42.5</strong></div></div><p style="margin-top:15px; font-size:14px;"><strong>Data:</strong> 30, 40, 45, <span data-stat-extreme-val>55</span></p><div class="math-learning-feedback" style="display:block;">Mean memakai besar setiap nilai. Median terutama menggunakan posisi setelah data diurutkan.</div></div>`,
            'build-the-median': stepTemplate([
                'Initial state:<br>'+mathHtml('12,\\ 4,\\ 9,\\ 5,\\ 20', true),
                'Urutkan data dari kecil ke besar:<br>'+mathHtml('4,\\ 5,\\ 9,\\ 12,\\ 20', true),
                'Cari posisi tengah (n=5, ganjil, posisi ke-3):<br>'+mathHtml('4,\\ 5,\\ \\mathbf{9},\\ 12,\\ 20', true),
                '<strong>Median = 9</strong><br><br><span class="math-learning-preview-note">Untuk jumlah genap, ambil rata-rata dari dua nilai tengah.</span>'
            ]),
            'which-statistic': `<div class="math-learning-compare"><div class="math-learning-interactive-card"><h4>Data numerik dengan nilai ekstrem</h4><p>Contoh: Gaji 99 karyawan 5 juta, 1 direktur 500 juta.</p><button type="button" class="math-learning-choice" style="width:100%; margin-top:10px;" data-choice-reveal="Median lebih tahan terhadap nilai ekstrem.">Gunakan Median</button></div><div class="math-learning-interactive-card"><h4>Data kategorikal dominan</h4><p>Contoh: Track terbanyak di HerAI adalah NLP.</p><button type="button" class="math-learning-choice" style="width:100%; margin-top:10px;" data-choice-reveal="Mode digunakan untuk melihat kategori yang paling sering muncul.">Gunakan Mode</button></div></div>`,
            
            // Topic 03
            'center-vs-spread': compareReveal('Center Sama, Spread Beda', 'Contoh A: 4, 5, 5, 6 (Mean 5)<br>Range: 2', 'Center Beda, Spread Sama', 'Contoh B: 14, 15, 15, 16 (Mean 15)<br>Range: 2', 'Pusat (Center) lokasi data berbeda, tetapi tingkat penyebaran (Spread) bisa sama.'),
            'dari-deviasi-ke-variance': stepTemplate([
                'Data: 4, 6, 8 (Mean = 6)',
                'Deviasi dari Mean: (4-6)=-2, (6-6)=0, (8-6)=2',
                'Squared Deviasi: (-2)²=4, 0²=0, 2²=4',
                'Variance = (4+0+4) / 3 = 2.67'
            ]),
            'change-one-observation': (!spec || !spec.source || spec.source.toLowerCase().includes('variance'))
                ? `<div class="math-learning-interactive-card"><label class="math-learning-control">Ubah nilai durasi Citra (awalnya 55)<input type="range" min="20" max="100" step="5" value="55" data-stat-obs-var><output>55</output></label><div style="margin-top:20px; display:flex; gap:20px; text-align:center;"><div class="math-learning-stat-box" style="flex:1; padding:15px; background:#f9f9f9; border-radius:8px;"><h4>Mean</h4><strong data-stat-mean style="font-size:24px; color:var(--math-accent);">42.5</strong></div><div class="math-learning-stat-box" style="flex:1; padding:15px; background:#f9f9f9; border-radius:8px;"><h4>Variance (σ²)</h4><strong data-stat-variance style="font-size:24px; color:#c9166c;">78.13</strong></div><div class="math-learning-stat-box" style="flex:1; padding:15px; background:#f9f9f9; border-radius:8px;"><h4>Standard Deviation (σ)</h4><strong data-stat-sd style="font-size:24px; color:var(--math-accent);">8.84</strong></div></div><p style="margin-top:15px; font-size:14px;"><strong>Data:</strong> 45, 30, <span data-stat-obs-val>55</span>, 40</p><div class="math-learning-feedback" style="display:block;">Spread mengukur seberapa jauh data tersebar dari pusatnya. Perhatikan bagaimana nilai ekstrem meningkatkan variance!</div></div>`
                : `<div class="math-learning-interactive-card"><label class="math-learning-control">Ubah quiz ratio (awalnya 0.60)<input type="range" min="0.10" max="0.90" step="0.10" value="0.60" data-stat-obs-perc><output>0.60</output></label><div style="margin-top:20px; display:flex; gap:20px; text-align:center;"><div class="math-learning-stat-box" style="flex:1; padding:15px; background:#f9f9f9; border-radius:8px;"><h4>Q1 (25th)</h4><strong data-stat-q1 style="font-size:24px; color:#c9166c;">0.65</strong></div><div class="math-learning-stat-box" style="flex:1; padding:15px; background:#f9f9f9; border-radius:8px;"><h4>Q2 / Median</h4><strong data-stat-q2 style="font-size:24px; color:#c9166c;">0.75</strong></div><div class="math-learning-stat-box" style="flex:1; padding:15px; background:#f9f9f9; border-radius:8px;"><h4>Q3 (75th)</h4><strong data-stat-q3 style="font-size:24px; color:#c9166c;">0.85</strong></div><div class="math-learning-stat-box" style="flex:1; padding:15px; background:#f9f9f9; border-radius:8px;"><h4>IQR</h4><strong data-stat-iqr style="font-size:24px; color:var(--math-accent);">0.20</strong></div></div><p style="margin-top:15px; font-size:14px;"><strong>Data:</strong> <span data-stat-perc-val>0.60</span>, 0.70, 0.80, 0.90</p><div class="math-learning-feedback" style="display:block;">Percentile dan Quartile sangat robust terhadap data ekstrem.</div></div>`,
            'variance-vs-standard-deviation-unit': compareReveal('Variance', 'Memiliki unit kuadrat (misal: menit² atau unit²). Berguna untuk perhitungan matematika lanjutan.', 'Standard Deviation', 'Dikembalikan ke unit asli (misal: menit). Sangat intuitif untuk interpretasi deviasi rata-rata dari mean.', 'SD = √Variance.'),
            
            // Topic 04
            'dot-plot-histogram': stepTemplate([
                'Setiap titik mewakili satu observation.',
                'Titik-titik yang memiliki nilai berdekatan mulai bertumpuk.',
                'Kita kelompokkan titik-titik tersebut ke dalam "bin" atau keranjang.',
                'Tinggi bar pada Histogram = Jumlah titik dalam bin tersebut.'
            ]),
            'draggable-bin-boundaries': `<div class="math-learning-interactive-card"><label class="math-learning-control">Geser titik mulai bin (Bin Offset)<input type="range" min="15" max="25" step="1" value="20" data-stat-bin-offset><output>20</output></label><div style="margin-top:20px;"><p style="font-size:14px; margin-bottom:10px;"><strong>Data (n=24):</strong> 23..63</p><div style="display:flex; align-items:flex-end; gap:4px; height:120px; border-bottom:2px solid var(--math-ink); padding-bottom:5px;" data-stat-hist-bars></div></div><div class="math-learning-feedback" style="display:block;">Perhatikan bagaimana tinggi bar berubah secara drastis (bin sensitivity) meskipun data raw sama persis!</div></div>`,
            'same-data-two-histograms': stateToggleTemplate([
                ['Binning A [20-70]', '<div class="math-learning-stat-box"><strong>Bins:</strong> [20,30), [30,40), [40,50), [50,60), [60,70]<br><strong>Counts:</strong> 2, 7, 8, 5, 2</div>', 'Shape terlihat memusat di tengah (unimodal).'],
                ['Binning B [15-65]', '<div class="math-learning-stat-box"><strong>Bins:</strong> [15,25), [25,35), [35,45), [45,55), [55,65]<br><strong>Counts:</strong> 1, 4, 7, 8, 4</div>', 'Peak (puncak) bergeser ke kanan. Shape terlihat berbeda!']
            ]),
            'center-spread-shape': compareReveal('Center & Spread', 'Menjawab: Di mana pusatnya? Berapa rentangnya?', 'Shape', 'Menjawab: Apakah simetris? Apakah ada ekor (skew) panjang ke kanan/kiri? Apakah ada lebih dari satu puncak (bimodal)?', 'Histogram menunjukkan ketiganya (Center, Spread, Shape) sekaligus.'),
            
            // Topic 05
            'ordered-strip-quartiles': stepTemplate([
                '10, 15, 20, 25, 30, 35, 40, 45, 50 (Terurut)',
                'Potong di tengah (Q2/Median): 30',
                'Potong paruh bawah (Q1): 20',
                'Potong paruh atas (Q3): 40',
                'Setiap potongan memuat 25% data observasi.'
            ]),
            'percentile-locator': `<div class="math-learning-interactive-card"><label class="math-learning-control">Pilih Percentile ke-<input type="range" min="0" max="100" step="10" value="50" data-stat-percentile><output>50th</output></label><div style="margin-top:20px; text-align:center;"><div class="math-learning-stat-box" style="padding:15px; background:#f9f9f9; border-radius:8px;"><h4>Makna</h4><strong data-stat-percentile-desc style="font-size:18px; color:var(--math-accent);">50% observation bernilai ≤ angka ini.</strong></div></div><div class="math-learning-feedback" style="display:block;">Percentile ke-50 persis sama dengan Median.</div></div>`,
            'percentage-vs-percentile': compareReveal('Percentage (%)', 'Rasio atau proporsi. Contoh: "Kamu menjawab benar 80% dari kuis." (Skor mutlak)', 'Percentile (th)', 'Peringkat relatif. Contoh: "Skormu berada di 80th percentile." (Skormu lebih baik dari 80% peserta lain)', 'Nilai 80% tidak sama dengan 80th percentile.'),
            
            // Topic 06
            'quartiles-iqr-fences': stepTemplate([
                'Q1 = 20, Q3 = 40',
                'IQR (Interquartile Range) = Q3 - Q1 = 20',
                'Lower Fence = Q1 - 1.5×IQR = -10',
                'Upper Fence = Q3 + 1.5×IQR = 70',
                'Nilai di luar [-10, 70] di-flag sebagai potential outlier.'
            ]),
            'inspect-flagged-record': `<div class="math-learning-interactive-card"><label class="math-learning-control">Ubah observasi ke-24 (awalnya 63)<input type="range" min="63" max="100" step="1" value="63" data-stat-outlier><output>63</output></label><div style="margin-top:20px; display:flex; gap:20px; text-align:center;"><div class="math-learning-stat-box" style="flex:1; padding:15px; background:#f9f9f9; border-radius:8px;"><h4>Lower Fence</h4><strong style="font-size:24px; color:var(--text);">13.5</strong></div><div class="math-learning-stat-box" style="flex:1; padding:15px; background:#f9f9f9; border-radius:8px;"><h4>Upper Fence</h4><strong style="font-size:24px; color:var(--text);">73.5</strong></div><div class="math-learning-stat-box" style="flex:1; padding:15px; background:#fff3f3; border-radius:8px;"><h4>Flag</h4><strong data-stat-flag style="font-size:24px; color:#c9166c;">0</strong></div></div><div data-stat-inspect-result style="margin-top:20px; padding:15px; background:#f5f5f5; border-radius:8px; border-left:4px solid #c9166c;"><strong>Interpretation:</strong> <span data-stat-interp>Valid data (≤ 73.5)</span></div></div>`,
            'before-vs-after-extreme': stateToggleTemplate([
                ['Termasuk Outlier (Dirty)', '<div class="math-learning-stat-box">Mean = 85. SD = 140.</div>', 'Satu outlier mengacaukan keseluruhan metrik.'],
                ['Tanpa Outlier (Clean)', '<div class="math-learning-stat-box">Mean = 40. SD = 12.</div>', 'Distribusi kembali representatif untuk typical participants.']
            ]),
            'boxplotfence-preview': `<div class="math-learning-interactive-card" style="text-align:center;"><h4>Anatomi Boxplot</h4><p>Visualisasi ringkas dari Five-Number Summary dan Fences.</p><div style="position:relative; width:100%; height:60px; margin-top:20px;"><div style="position:absolute; top:28px; left:10%; right:10%; height:4px; background:#ccc;"></div><div style="position:absolute; top:20px; left:30%; right:30%; height:20px; background:var(--math-surface); border:2px solid var(--math-ink);"></div><div style="position:absolute; top:15px; left:50%; width:4px; height:30px; background:var(--math-accent);"></div><div style="position:absolute; top:15px; left:10%; width:4px; height:30px; background:#ccc;"></div><div style="position:absolute; top:15px; left:90%; width:4px; height:30px; background:#ccc;"></div><span style="position:absolute; top:50px; left:10%; transform:translateX(-50%); font-size:10px;">Lower Fence</span><span style="position:absolute; top:50px; left:30%; transform:translateX(-50%); font-size:10px;">Q1</span><span style="position:absolute; top:50px; left:50%; transform:translateX(-50%); font-size:10px; font-weight:bold; color:var(--math-accent);">Median</span><span style="position:absolute; top:50px; left:70%; transform:translateX(-50%); font-size:10px;">Q3</span><span style="position:absolute; top:50px; left:90%; transform:translateX(-50%); font-size:10px;">Upper Fence</span></div></div>`,
            
            // Topic 07
            'labeled-herai-scatterplot': `<div class="math-learning-interactive-card" style="text-align:center;"><h4>Scatterplot: Study Duration vs Quiz Completion</h4><div style="margin:20px; padding:20px; border-left:2px solid #ccc; border-bottom:2px solid #ccc; position:relative; height:100px;"><span style="position:absolute; bottom:-25px; left:50%; transform:translateX(-50%); font-size:12px;">Study Duration (X)</span><span style="position:absolute; top:50%; left:-25px; transform:translateY(-50%) rotate(-90deg); font-size:12px;">Quiz Completion (Y)</span><div style="position:absolute; bottom:20%; left:20%; width:10px; height:10px; background:var(--math-accent); border-radius:50%;"></div><div style="position:absolute; bottom:40%; left:45%; width:10px; height:10px; background:var(--math-accent); border-radius:50%;"></div><div style="position:absolute; bottom:70%; left:80%; width:10px; height:10px; background:var(--math-accent); border-radius:50%;"></div></div><p style="font-size:14px; text-align:left;">Setiap titik mewakili <strong>satu participant</strong> dengan sepasang (X, Y).</p></div>`,
            'deviation-quadrants': stepTemplate([
                'Kita plot titik di (X, Y).',
                'Kita potong scatterplot dengan garis vertikal (Mean X) dan horizontal (Mean Y).',
                'Terbentuk 4 Kuadran. Jika dominan Kuadran Kanan Atas dan Kiri Bawah → Positive Association.',
                'Jika dominan Kiri Atas dan Kanan Bawah → Negative Association.'
            ]),
            'move-one-participant': `<div class="math-learning-interactive-card"><label class="math-learning-control">Ubah quiz Citra (awalnya 0.90)<input type="range" min="0.65" max="0.90" step="0.05" value="0.90" data-stat-citra-quiz><output>0.90</output></label><div style="margin-top:20px; display:flex; gap:20px; text-align:center;"><div class="math-learning-stat-box" style="flex:1; padding:15px; background:#f9f9f9; border-radius:8px;"><h4>Covariance</h4><strong data-stat-covar-val style="font-size:24px; color:#c9166c;">0.0171875</strong></div><div class="math-learning-stat-box" style="flex:1; padding:15px; background:#f9f9f9; border-radius:8px;"><h4>Correlation (r)</h4><strong data-stat-corr-val style="font-size:24px; color:var(--math-accent);">0.8315</strong></div></div><p style="margin-top:15px; font-size:14px;"><strong>Data Quiz:</strong> 0.80, 0.60, <span data-stat-citra-val>0.90</span>, 0.70<br><strong>Data Completion:</strong> 0.75, 0.625, 1.00, 0.50</p><div class="math-learning-feedback" style="display:block;">Satu data ekstrem dapat menghancurkan correlation (bahkan menjadi negatif)!</div></div>`,
            'minutes-vs-seconds': compareReveal('Covariance (Menit)', 'Contoh: 12.5 (Sulit membandingkan kekuatan asosiasi)', 'Covariance (Detik)', 'Contoh: 750. (Angka sangat besar padahal data sama)', 'Karena covariance sensitif terhadap unit, kita menstandarisasinya menjadi Correlation.'),
            
            // Topic 08
            'canonical-controlled-corruption': stepTemplate([
                'Dataset bersih (Canonical): Tidak ada missing values, tipe data tepat.',
                'Controlled Corruption (Injeksi Error): 1 participant nilainya NULL.',
                'Observe: Model AI gagal train atau yield biased weights.',
                'Solusi: Data cleaning (Imputation/Removal) sebelum training.'
            ]),
            'data-quality-audit-dashboard': `<div class="math-learning-interactive-card"><h4>Data Quality Audit Dashboard</h4><p style="font-size:14px; margin-bottom:15px;">Pilih audit check untuk melihat temuan di corrupted audit copy:</p><div style="display:flex; flex-direction:column; gap:10px;"><button type="button" class="math-learning-choice" data-choice-reveal="A02 Quiz = 60. Ini pelanggaran scale (canonical ratio adalah 0-1). Ingat: Normalization tidak bisa memperbaiki makna jika datanya memang berbeda dimensi.">1. Check Scale Mismatch</button><button type="button" class="math-learning-choice" data-choice-reveal="A03 Completion = NA. Ini missing value (unavailable), BUKAN observed zero (0). Jangan disamakan!">2. Check Missingness</button><button type="button" class="math-learning-choice" data-choice-reveal="A04 Duration = '1.5 hours'. Mixed unit (sebelumnya menit). Unit repair harus dilakukan secara semantic, bukan asal impute.">3. Check Mixed Unit</button><button type="button" class="math-learning-choice" data-choice-reveal="A01 dan A05 memiliki nama yang sama. Ini candidate duplicate, TAPI repeated entity ≠ automatic duplicate (bisa saja 2 sesi yang berbeda). Perlu cek Observational Unit!">4. Check Duplicate Candidate</button><button type="button" class="math-learning-choice" data-choice-reveal="Participant Code (misal 1001) bertipe numerik, TAPI semantics-nya categorical nominal. Menghitung rata-rata Participant ID tidak ada gunanya.">5. Check Numeric Semantics</button><button type="button" class="math-learning-choice" data-choice-reveal="Target (misal: Lulus/Gagal) memiliki perbandingan 90:10. Ini Class Imbalance! Perhatikan: Class imbalance BUKAN sekadar uneven numerical feature distribution.">6. Check Target Imbalance</button></div></div>`,
            'missing-vs-zero': compareReveal('Missing (NULL)', 'Data tidak dicatat. Participant mungkin sakit, atau sistem gagal.', 'Zero (0)', 'Data valid dicatat sebagai nol. Participant menjawab semua quiz salah.', 'Menyamakan NULL dengan 0 adalah bahaya besar untuk AI.'),
            'scale-vs-semantics': `<div class="math-learning-interactive-card"><label class="math-learning-control">Pilih variabel fitur untuk ML<select data-stat-semantic><option value="id">Participant ID (1001, 1002)</option><option value="duration">Duration (Menit)</option><option value="zipcode">Zip Code (90210)</option></select></label><div style="margin-top:20px;"><div class="math-learning-stat-box" style="padding:15px; background:#f9f9f9; border-radius:8px;"><h4 data-stat-semantic-title>...</h4><strong data-stat-semantic-desc style="font-size:16px; color:var(--math-accent); font-weight:normal;">Pilih fitur di atas.</strong></div></div></div>`
        };
    }

    function interactiveSpecFieldAny(source, labels) {
        for (const label of labels) {
            const value = interactiveSpecField(source, label);
            if (value) return value;
        }
        return '';
    }

    function probabilityInteractiveTemplates(spec) {
        return {
            'outcomesample-spaceevent-selector': stateToggleTemplate([
                ['Process', '<p>Process: Session dimulai. Possible outcomes: selesai_mandiri, selesai_dengan_bantuan, belum_selesai.</p>', 'Pilih Process'],
                ['Sample Space Ω', '<p>Ω = { selesai_mandiri, selesai_dengan_bantuan, belum_selesai }</p>', 'Pilih Sample Space'],
                ['Event A', '<p>Event A (selesai dalam 30 menit) = { selesai_mandiri, selesai_dengan_bantuan }</p>', 'Pilih Event A']
            ]),
            'probability-complement': stateToggleTemplate([
                ['Probability', '<p>P(A) = 0.40</p>', 'Pilih Probability'],
                ['Complement', '<p>P(A^c) = 0.60</p>', 'Pilih Complement']
            ]),
            'overlap-two-way-probability-table': stateToggleTemplate([
                ['Two-Way Table', '<p>Menunjukkan joint probabilities (overlap) di dalam grid.</p>', 'Table'],
                ['Venn Regions', '<p>Menunjukkan area yang tumpang tindih secara visual.</p>', 'Regions']
            ]),
            'filter-the-universe': stateToggleTemplate([
                ['No condition', '<p>Total probability space = 1.00</p>', 'No condition'],
                ['Given B', '<p>Denominator menjadi P(B) = 0.40</p>', 'Condition B'],
                ['Given A', '<p>Denominator menjadi P(A) = 0.30</p>', 'Condition A']
            ]),
            'independent-vs-dependent-vs-mutually-exclusive': stateToggleTemplate([
                ['Independent', '<p>P(A | B) = P(A)</p>', 'Independent'],
                ['Dependent', '<p>P(A | B) ≠ P(A)</p>', 'Dependent'],
                ['Mutually Exclusive', '<p>P(A ∩ B) = 0</p>', 'Mutually Exclusive']
            ]),
            'prior-evidence-posterior': stepTemplate([
                'Prior: Keyakinan awal P(H).',
                'Evidence: Data baru E muncul.',
                'Posterior: Keyakinan di-update menjadi P(H|E).'
            ]),
            'outcome-x-distribution-expected-value': stepTemplate([
                'Outcome: H, T',
                'Random Variable X: Map H ke 1, T ke 0',
                'Distribution: P(X=1) = 0.5, P(X=0) = 0.5',
                'Expected Value: E[X] = (1 × 0.5) + (0 × 0.5) = 0.5'
            ]),
            'score-vs-probability-vs-calibration-reliability-diagram': stateToggleTemplate([
                ['Instructional Score', '<p>h(q,c) = 0.6q + 0.4c. Angka kinerja historis.</p>', 'Score'],
                ['Predicted Probability', '<p>Estimasi model tentang future outcome.</p>', 'Probability'],
                ['Calibration', '<p>Proporsi aktual = probabilitas prediksi.</p>', 'Calibration']
            ])
        };
    }

    function calculusInteractiveTemplates(spec) {
        return {
            'input-function-output': stepTemplate([
                'Nilai masuk ke dalam kotak fungsi.',
                'Kotak fungsi menerapkan aturan operasi.',
                'Satu input menghasilkan tepat satu output.',
                'Proses ini deterministik.'
            ]),
            'function-value-explorer': `<div class="math-learning-control-grid"><label class="math-learning-control">Input x<input type="range" min="-10" max="10" step="1" value="0" data-calc-func-x><output>0</output></label></div><div class="math-learning-equation-result" data-calc-func-output></div>`,
            'linear-vs-quadratic': compareReveal('Linear', 'f(x) = 2x + 3. Perubahan x menghasilkan perubahan konstan pada f(x). Graph berbentuk garis lurus.', 'Quadratic', 'f(x) = x². Perubahan f(x) bergantung pada nilai x saat ini. Graph berbentuk kurva parabola.', 'Tingkat kesulitan optimasi berbeda untuk jenis fungsi yang berbeda.'),
            'herai-instructional-score-reader': `<div class="math-learning-control-grid"><label class="math-learning-control">Quiz Score<input type="range" min="0" max="100" step="5" value="80" data-calc-score-q><output>80</output></label><label class="math-learning-control">Completion<input type="range" min="0" max="100" step="5" value="60" data-calc-score-c><output>60</output></label></div><div class="math-learning-equation-result" data-calc-score-output></div>`,
            'rise-run-dan-dua-titik': stepTemplate([
                'Pilih titik A dan titik B di grafik.',
                'Hitung perubahan vertikal (Rise = y2 - y1).',
                'Hitung perubahan horizontal (Run = x2 - x1).',
                'Slope = Rise / Run.'
            ]),
            'geser-endpoint': `<div class="math-learning-control-grid"><label class="math-learning-control">Titik Akhir x<input type="range" min="1" max="10" step="0.5" value="5" data-calc-slope-x><output>5</output></label></div><div class="math-learning-equation-result" data-calc-slope-output></div>`,
            'linear-vs-nonlinear': compareReveal('Linear Rate', 'Slope sama di mana pun kita mengukurnya.', 'Nonlinear Rate', 'Slope berubah-ubah tergantung di titik mana kita berada.', 'Fungsi non-linear membutuhkan Calculus untuk mendeskripsikan rate of change di satu titik.'),
            'herai-instructional-rate': stepTemplate([
                'Jika quiz naik 10 poin, skor total naik 6 poin (0.6 * 10).',
                'Jika completion naik 10 poin, skor total naik 4 poin (0.4 * 10).',
                'Setiap komponen memiliki constant rate of change.'
            ]),
            'secant-tangent': stepTemplate([
                'Garis secant memotong dua titik (x dan x+h).',
                'Titik kedua digeser mendekati titik pertama (h mendekati 0).',
                'Garis secant perlahan berubah menjadi garis singgung (tangent).',
                'Slope garis tangent adalah derivative di titik tersebut.'
            ]),
            'ubah-h': `<div class="math-learning-control-grid"><label class="math-learning-control">Jarak h<input type="range" min="0.01" max="2" step="0.01" value="2" data-calc-h><output>2.00</output></label></div><div class="math-learning-equation-result" data-calc-h-output></div>`,
            'average-vs-local': compareReveal('Average Change', 'Slope garis secant antara dua waktu berbeda.', 'Local Change (Instantaneous)', 'Slope garis tangent pada satu momen tepat.', 'Calculus memberikan local change.'),
            'corner-yang-tidak-differentiable': stepTemplate([
                'Fungsi nilai mutlak f(x) = |x| memiliki sudut tajam di x = 0.',
                'Pendekatan dari kiri memberikan slope -1.',
                'Pendekatan dari kanan memberikan slope 1.',
                'Karena limit kiri dan kanan berbeda, derivative tidak ada di x=0 (non-differentiable).'
            ]),
            'derivative-function-sebagai-peta-slope': stepTemplate([
                'Fungsi asli f(x) memetakan lokasi x ke ketinggian y.',
                'Derivative f\\\'(x) memetakan lokasi x ke kemiringan di sana.',
                'Jika f\\\'(x) positif, kurva asli sedang menanjak.',
                'Jika f\\\'(x) negatif, kurva asli sedang menurun.'
            ]),
            'power-rule-manipulator': `<div class="math-learning-control-grid"><label class="math-learning-control">Exponent n<input type="range" min="1" max="5" step="1" value="2" data-calc-power-n><output>2</output></label></div><div class="math-learning-equation-result" data-calc-power-output></div>`,
            'differentiate-term-by-term': stepTemplate([
                'Fungsi: f(x) = 3x² + 5x - 2',
                'Ambil turunan term pertama: d/dx(3x²) = 6x',
                'Ambil turunan term kedua: d/dx(5x) = 5',
                'Ambil turunan term ketiga (konstanta): d/dx(-2) = 0',
                'Gabungkan: f\\\'(x) = 6x + 5'
            ]),
            'surface-dan-dua-slice': stepTemplate([
                'Fungsi 2 variabel f(x,y) membentuk permukaan 3D.',
                'Iris sejajar sumbu x (y konstan): slope adalah partial derivative thd x.',
                'Iris sejajar sumbu y (x konstan): slope adalah partial derivative thd y.',
                'Partial derivative hanya melihat satu arah sumbu pada satu waktu.'
            ]),
            'hold-one-variable-fixed': `<div class="math-learning-control-grid"><label class="math-learning-control">Variabel yang ditahan<select data-calc-partial-hold><option value="y">Tahan Y, Ubah X</option><option value="x">Tahan X, Ubah Y</option></select></label></div><div class="math-learning-equation-result" data-calc-partial-output></div>`,
            'herai-sensitivity': compareReveal('Sensitivity terhadap Q', 'Turunan skor terhadap Q adalah 0.6. Kenaikan 1 unit Q menambah 0.6 skor.', 'Sensitivity terhadap C', 'Turunan skor terhadap C adalah 0.4. Kenaikan 1 unit C menambah 0.4 skor.', 'Score lebih sensitif terhadap komponen Quiz.'),
            'partial-components-gradient-vector': stepTemplate([
                'Hitung partial derivative terhadap x (kemiringan arah timur-barat).',
                'Hitung partial derivative terhadap y (kemiringan arah utara-selatan).',
                'Gabungkan menjadi vektor: [∂f/∂x, ∂f/∂y].',
                'Vektor ini (Gradient) menunjuk ke arah tanjakan paling curam.'
            ]),
            'contour-gradient-arrow': `<div class="math-learning-control-grid"><label class="math-learning-control">Posisi X<input type="range" min="-3" max="3" step="0.5" value="1" data-calc-grad-x><output>1</output></label><label class="math-learning-control">Posisi Y<input type="range" min="-3" max="3" step="0.5" value="2" data-calc-grad-y><output>2</output></label></div><div class="math-learning-equation-result" data-calc-grad-output></div>`,
            'gradient-vs-negative-gradient': compareReveal('Gradient (+)', 'Vektor yang menunjuk ke arah kenaikan tercepat (steepest ascent).', 'Negative Gradient (-)', 'Vektor yang menunjuk ke arah penurunan tercepat (steepest descent).', 'Dalam optimasi loss, kita mengikuti Negative Gradient.'),
            'canonical-herai-gradient': stepTemplate([
                'Fungsi skor linier: h(q,c) = 0.6q + 0.4c',
                '∂h/∂q = 0.6',
                '∂h/∂c = 0.4',
                'Gradient ∇h = [0.6, 0.4]. Konstan di setiap titik!'
            ]),
            'serial-computational-graph': stepTemplate([
                'Input awal x masuk ke fungsi f: y = f(x)',
                'Hasil y menjadi input ke fungsi g: z = g(y)',
                'Hasil z menjadi input ke fungsi h: Loss = h(z)',
                'Untuk mencari efek x pada Loss, kalikan pengaruh lokal di tiap langkah (Chain Rule).'
            ]),
            'ubah-inner-sensitivity': `<div class="math-learning-control-grid"><label class="math-learning-control">Local Sensitivity 1 (Inner)<input type="range" min="-2" max="2" step="0.5" value="1" data-calc-chain-inner><output>1</output></label><label class="math-learning-control">Local Sensitivity 2 (Outer)<input type="range" min="-2" max="2" step="0.5" value="2" data-calc-chain-outer><output>2</output></label></div><div class="math-learning-equation-result" data-calc-chain-output></div>`,
            'direct-formula-vs-composed-view': compareReveal('Direct Formula', 'Substitusi semua fungsi menjadi satu persamaan raksasa. Menghitung turunan menjadi rumit dan mudah salah.', 'Composed View (Chain Rule)', 'Hitung turunan setiap modul sederhana secara lokal, lalu kalikan semuanya.', 'Sistem AI memakai Composed View melalui Backpropagation.'),
            'chain-rule-vs-optimization-boundary': stepTemplate([
                'Chain Rule memberitahu KEMANA dan SEBERAPA TAJAM fungsi berubah.',
                'Ini hanyalah pengukur/alat baca (diagnostic).',
                'Berapa langkah kita harus berjalan? Apakah kita harus melambat? Itu urusan Optimization.',
                'Calculus menyediakan sinyal; Optimization memakai sinyal.'
            ]),
            '1d-loss-curve-local-tangent': stepTemplate([
                'Visual ini menunjukkan profil Loss jika kita mengubah satu parameter (W).',
                'Loss Curve melengkung ke bawah membentuk sebuah lembah.',
                'Garis tangent di suatu titik menunjukkan kemiringan di titik tersebut.',
                'Target AI adalah titik terendah dari lembah ini (minimum loss).'
            ]),
            'move-one-parameter-on-a-loss-curve': `<div class="math-learning-control-grid"><label class="math-learning-control">Parameter W<input type="range" min="-5" max="5" step="0.5" value="3" data-calc-loss-w><output>3.0</output></label></div><div class="math-learning-equation-result" data-calc-loss-output></div>`,
            '2d-contour-gradient-arrow': stepTemplate([
                'Setiap cincin contour menghubungkan titik-titik dengan nilai Loss yang sama.',
                'Lingkaran terdalam adalah titik dengan Loss paling kecil (global minimum untuk loss sederhana).',
                'Panah Gradient selalu tegak lurus terhadap garis contour.',
                'Negative gradient selalu menunjuk masuk ke dalam lembah.'
            ]),
            'explore-2d-landscape': `<div class="math-learning-control-grid"><label class="math-learning-control">W1<input type="range" min="-3" max="3" step="0.5" value="2" data-calc-land-w1><output>2.0</output></label><label class="math-learning-control">W2<input type="range" min="-3" max="3" step="0.5" value="2" data-calc-land-w2><output>2.0</output></label></div><div class="math-learning-equation-result" data-calc-land-output></div>`,
            'score-vs-loss': compareReveal('Score / Reward', 'Semakin tinggi semakin baik. Gradient digunakan untuk memanjat naik (Ascent).', 'Loss / Error', 'Semakin rendah semakin baik. Gradient digunakan untuk turun (Descent).', 'Dalam AI Training, kita hampir selalu melakukan Gradient Descent pada Loss.'),
            'calculus-optimization-boundary': stepTemplate([
                'Selamat! Kamu telah memahami fungsi, slope, derivative, dan gradient (Calculus).',
                'Calculus memberikan sinyal lokal untuk memperbaiki model.',
                'Submodul berikutnya (Optimization) akan membahas bagaimana cara terbaik menggunakan sinyal tersebut.',
                'End of Calculus Submodule.'
            ])
        };
    }

    function linearAlgebraInteractiveTemplates(spec) {
        return {
            'scalar-cards-vector': stepTemplate([
                '<div class="math-learning-scalar-pair"><span><small>quiz ratio</small><strong>q = 0.80</strong></span><span><small>completion ratio</small><strong>c = 0.75</strong></span></div>',
                '<p><strong>Feature order:</strong> q → c</p>',
                mathHtml('\\mathbf{x}^{(1)}=\\begin{bmatrix}0.80\\\\0.75\\end{bmatrix}', true),
                '<p>Component 1 = quiz ratio; component 2 = completion ratio.</p><p class="math-learning-preview-note">Vector ini merepresentasikan selected participant features, bukan participant secara utuh.</p>'
            ]),
            'participant-switcher': participantVectorTemplate(),
            'same-numbers-different-order': stateToggleTemplate([
                ['Urutan benar', `${mathHtml('\\begin{bmatrix}0.80\\\\0.75\\end{bmatrix}', true)}<p><strong>[quiz ratio, completion ratio]</strong></p>`, 'Posisi pertama tetap quiz ratio; posisi kedua tetap completion ratio.'],
                ['Urutan tertukar', `${mathHtml('\\begin{bmatrix}0.75\\\\0.80\\end{bmatrix}', true)}<p><strong>[quiz ratio, completion ratio]</strong></p>`, 'Angkanya sama, tetapi component positions berubah. Posisi pertama wajib tetap quiz ratio.']
            ]),
            'point-vs-vector-vs-participant': representationViewsTemplate(),
            'add-one-feature-preview': stateToggleTemplate([
                ['2 components', mathHtml('\\begin{bmatrix}0.80\\\\0.75\\end{bmatrix}\\in\\mathbb{R}^{2\\times1}', true), 'Dua ratio features memakai scale 0–1.'],
                ['Tambah 45 menit', `${mathHtml('\\begin{bmatrix}0.80\\\\0.75\\\\45\\end{bmatrix}\\in\\mathbb{R}^{3\\times1}', true)}<p class="math-learning-preview-note">Feature ketiga memakai menit. Scale treatment perlu dipikirkan sebelum geometry atau distance digunakan.</p>`, '2 components → 3 components; dimension berubah, dan units kini mixed.']
            ]),
            'anatomy-of-a-vector': stateToggleTemplate([
                ['Component 1', `${mathHtml('\\mathbf{v}=\\begin{bmatrix}\\color{#c9166c}{4}\\\\7\\\\2\\end{bmatrix}', true)}<p>v₁ = 4 · dimension tetap 3.</p>`, 'Kamu memilih component ke-1, bukan mengubah dimension.'],
                ['Component 2', `${mathHtml('\\mathbf{v}=\\begin{bmatrix}4\\\\\\color{#c9166c}{7}\\\\2\\end{bmatrix}', true)}<p>v₂ = 7 · dimension tetap 3.</p>`, 'Kamu memilih component ke-2, bukan mengubah dimension.'],
                ['Component 3', `${mathHtml('\\mathbf{v}=\\begin{bmatrix}4\\\\7\\\\\\color{#c9166c}{2}\\end{bmatrix}', true)}<p>v₃ = 2 · dimension tetap 3.</p>`, 'Kamu memilih component ke-3, bukan mengubah dimension.']
            ]),
            'observation-index-vs-feature-index': observationFeatureTemplate(),
            'dimension-vs-numerical-values': compareReveal('Large values', '[1000, 2000] · dimension = 2', 'Small values', '[0.1, 0.2, 0.3] · dimension = 3', 'Dimension menghitung slots/components, bukan besar kecil values.'),
            'shape-orientation-switch': shapeOrientationTemplate(),
            'feature-order-bug-detector': stateToggleTemplate([
                ['Schema aligned', `${mathHtml('\\mathbf{x}^{(2)}=\\begin{bmatrix}0.60\\\\0.625\\end{bmatrix}', true)}<p>quiz ratio → slot 1; completion ratio → slot 2.</p>`, 'Values dan feature order selaras.'],
                ['Schema tertukar', `${mathHtml('\\begin{bmatrix}0.625\\\\0.60\\end{bmatrix}', true)}<p>completion ratio masuk slot quiz.</p>`, 'Numerically valid, semantically misaligned.']
            ]),
            'addremove-feature-slot': stateToggleTemplate([
                ['2 slots', mathHtml('\\mathbb{R}^{2\\times1}', true), 'Dua components berarti dimension 2.'],
                ['3 slots', `${mathHtml('\\mathbb{R}^{3\\times1}', true)}<p>Feature ketiga: study duration = 45 min.</p>`, 'Dimension 2→3; ratio dan minutes mempunyai units/scale berbeda.']
            ]),
            'component-wise-addition-builder': vectorOperationTemplate('add'),
            'same-dimension-vs-same-schema': compareReveal('Aligned schemas', 'quiz ratio, completion ratio ↔ quiz ratio, completion ratio', 'Same dimension only', 'quiz ratio, completion ratio ↔ study minutes, age years', 'Arithmetic may be structurally possible, tetapi interpretation tidak valid tanpa aligned feature semantics.'),
            'arrow-addition-head-to-tail': arrowAdditionTemplate(),
            'scalar-multiplier': scalarMultiplierTemplate(),
            'herai-difference-audit': stepTemplate([
                '<p>Schema Alya dan Bima sama: [quiz ratio, completion ratio].</p>',
                mathHtml('0.80-0.60=0.20', true),
                '<p>Quiz ratio Alya lebih tinggi 0.20 pada signed difference ini.</p>',
                mathHtml('0.75-0.625=0.125', true),
                '<p>Completion ratio Alya lebih tinggi 0.125 pada signed difference ini.</p>',
                mathHtml('\\mathbf{x}_{Alya}-\\mathbf{x}_{Bima}=\\begin{bmatrix}0.20\\\\0.125\\end{bmatrix}', true),
                '<p class="math-learning-preview-note">Signed difference adalah vector—bukan distance dan bukan overall quality score.</p>'
            ]),
            'norm-sebagai-panjang-arrow': normStaticTemplate(),
            'norm-component-sliders': normTemplate(),
            'distance-builder': stepTemplate([
                mathHtml('\\mathbf{u}=\\begin{bmatrix}1\\\\2\\end{bmatrix},\\quad\\mathbf{v}=\\begin{bmatrix}4\\\\6\\end{bmatrix}', true),
                mathHtml('\\mathbf{u}-\\mathbf{v}=\\begin{bmatrix}-3\\\\-4\\end{bmatrix}', true),
                mathHtml('(-3)^2+(-4)^2=9+16', true),
                mathHtml('9+16=25', true),
                mathHtml('d(\\mathbf{u},\\mathbf{v})=\\sqrt{25}=5', true),
                '<p>Difference vector masih vector; Euclidean distance adalah scalar nonnegative.</p>'
            ]),
            'difference-vector-vs-distance': stateToggleTemplate([
                ['x − y', `${mathHtml('\\mathbf{x}-\\mathbf{y}=\\begin{bmatrix}-3\\\\-4\\end{bmatrix}', true)}<p>Signed direction retained.</p>`, 'Difference vector menyimpan direction.'],
                ['y − x', `${mathHtml('\\mathbf{y}-\\mathbf{x}=\\begin{bmatrix}3\\\\4\\end{bmatrix}', true)}${mathHtml('d(\\mathbf{x},\\mathbf{y})=d(\\mathbf{y},\\mathbf{x})=5', true)}`, 'Direction changed; separation did not.']
            ]),
            'herai-distance-explorer': distanceTemplate(true),
            'scale-trap-2d-vs-3d-raw-features': stateToggleTemplate([
                ['q + c', '<p>Distance memakai dua ratio features pada scale 0–1.</p>', 'Kontribusi q dan c dapat dibaca pada shared ratio scale.'],
                ['q + c + minutes', '<p>Duration minutes dapat mendominasi squared contribution karena raw scale-nya jauh lebih besar.</p><p class="math-learning-preview-note">Dominance karena scale bukan bukti feature importance.</p>', 'Scaling/preprocessing perlu dipertimbangkan sebelum distance ditafsirkan.']
            ]),
            'dot-product-builder': stepTemplate([
                mathHtml('\\mathbf{u}=\\begin{bmatrix}2\\\\3\\end{bmatrix},\\quad\\mathbf{v}=\\begin{bmatrix}4\\\\5\\end{bmatrix}', true),
                '<p>Pair components: (2, 4) dan (3, 5).</p>',
                `${mathHtml('2(4)=8', true)}${mathHtml('3(5)=15', true)}`,
                mathHtml('8+15=23', true),
                '<p><strong>Output 23 adalah scalar.</strong> Ia bukan similarity percentage.</p>'
            ]),
            'component-contribution-explorer': dotProductTemplate(),
            'herai-weighted-score': weightedScoreTemplate(),
            'geometric-dot-product-explorer': cosineTemplate('dot'),
            'same-direction-different-magnitude': compareReveal('Candidate b', 'a=[1,1], b=[2,2] → aᵀb=4', 'Candidate c', 'a=[1,1], c=[10,10] → aᵀc=20', 'Directions sama, tetapi raw dot product sensitif terhadap magnitude.'),
            'feature-order-audit': stateToggleTemplate([
                ['Aligned', '<p>weight schema [quiz, completion] dipasangkan dengan feature schema [quiz, completion].</p>', 'Pairing semantics aligned.'],
                ['Misaligned', '<p>weight schema [quiz, completion] dipasangkan dengan [completion, quiz].</p>', 'Math-valid result tidak berarti semantically valid result.']
            ]),
            'angle-vs-magnitude-explorer': cosineTemplate('both'),
            'rotate-the-vector': cosineTemplate('cosine'),
            'dot-vs-cosine-ranking': stateToggleTemplate([
                ['Dot Product', `${mathHtml('\\mathbf{q}=[1,0],\\;\\mathbf{a}=[5,5],\\;\\mathbf{b}=[2,0.2]', true)}<p>Dot ranks A first.</p>`, 'Raw dot product mempertahankan sensitivity terhadap norm/magnitude.'],
                ['Cosine Similarity', '<p>Cosine ranks B first karena direction B lebih dekat ke query.</p>', 'Ranking berubah ketika metric memisahkan direction dari magnitude.']
            ]),
            'herai-needsupport-matching': needSupportTemplate(),
            'zero-vector-guard': zeroVectorTemplate(),
            'feature-order-trap': featureOrderTrapTemplate(spec),
            'stack-vectors-into-matrix': stackVectorsTemplate(),
            'rowcolumn-highlighter': matrixExplorerTemplate(),
            'shape-builder': matrixDatasetShapeTemplate(),
            'entry-locator': matrixExplorerTemplate(),
            'dataset-matrix-vs-material-matrix': compareReveal('Participant X ∈ R⁴ˣ²', 'Rows = participants; columns = quiz/completion ratios.', 'Material M ∈ R³ˣ²', 'Rows = materials; columns require separately defined material semantics.', 'Same number of columns does not guarantee identical meaning.'),
            'transpose-animation': transposeTemplate(),
            'matrix-multiplication-shape-gate': matrixShapeTemplate(),
            'row-column-dot-product-reveal': matrixProductRevealTemplate(),
            'elementwise-vs-matrix-product': stateToggleTemplate([
                ['Elementwise', '<p>Same-position cells are multiplied; output keeps the same 2×2 layout.</p>', 'Elementwise multiplication pairs positions directly.'],
                ['Matrix product', '<p>Each output cell comes from a row–column dot product.</p>', 'Matrix multiplication is not elementwise multiplication.']
            ]),
            'herai-batch-score-engine': batchScoreTemplate(),
            'transformation-dimension-mapper': `${mathHtml('(4\\times2)(2\\times3)\\to(4\\times3)', true)}<div class="math-learning-compare"><div class="math-learning-interactive-card"><h4>Input</h4><p>4 participant rows × 2 input features</p></div><div class="math-learning-interactive-card"><h4>Output</h4><p>4 participant rows × 3 outputs</p></div></div><p class="math-learning-preview-note">Rows flow through; output semantics still must be defined.</p>`,
            'order-matters': stateToggleTemplate([
                ['A B', `${mathHtml('\\begin{bmatrix}1&2\\\\0&1\\end{bmatrix}\\begin{bmatrix}1&0\\\\3&1\\end{bmatrix}=\\begin{bmatrix}7&2\\\\3&1\\end{bmatrix}', true)}`, 'Row–column order A then B.'],
                ['B A', `${mathHtml('\\begin{bmatrix}1&0\\\\3&1\\end{bmatrix}\\begin{bmatrix}1&2\\\\0&1\\end{bmatrix}=\\begin{bmatrix}1&2\\\\3&7\\end{bmatrix}', true)}`, 'Matrix multiplication is generally non-commutative.']
            ]),
            'participant-material-score-matrix': participantMaterialTemplate()
        };
    }

    function participantVectorTemplate() {
        return `<label class="math-learning-control">Participant<select data-la-participant>${['Alya','Bima','Citra','Dewi'].map(name => `<option>${name}</option>`).join('')}</select></label><div class="math-learning-la-result" data-la-participant-result></div>`;
    }

    function representationViewsTemplate() {
        return `<div class="math-learning-button-row">${['Participant','Data','Vector','2D view'].map((label, index) => `<button class="math-learning-choice" type="button" data-la-view="${index}">${label}</button>`).join('')}</div><div class="math-learning-la-result" data-la-view-result></div>`;
    }

    function shapeOrientationTemplate() {
        return `<div class="math-learning-button-row"><button class="math-learning-choice is-selected" type="button" data-la-orientation="column">Column vector</button><button class="math-learning-choice" type="button" data-la-orientation="row">Row vector</button></div><div class="math-learning-la-result" data-la-orientation-result></div>`;
    }

    function vectorOperationTemplate(operation) {
        return `<div class="math-learning-control-grid"><label class="math-learning-control">u₁<input type="number" step="0.1" value="2" data-la-x1></label><label class="math-learning-control">u₂<input type="number" step="0.1" value="5" data-la-x2></label><label class="math-learning-control">v₁<input type="number" step="0.1" value="3" data-la-y1></label><label class="math-learning-control">v₂<input type="number" step="0.1" value="-1" data-la-y2></label></div><label class="math-learning-control">Operasi<select data-la-vector-operation><option value="add"${operation === 'add' ? ' selected' : ''}>Addition</option><option value="subtract">Subtraction</option></select></label><div class="math-learning-la-result" data-la-vector-result></div>`;
    }

    function scalarMultiplierTemplate() {
        return `<label class="math-learning-control">Scalar k <input type="range" min="-3" max="3" step="0.25" value="1" data-la-scalar data-vector="2,-1"><output data-la-scalar-value>1</output></label><div class="math-learning-la-result" data-la-scalar-result></div>`;
    }

    function normTemplate() {
        return `<div class="math-learning-control-grid"><label class="math-learning-control">v₁<input type="range" min="-6" max="6" step="0.25" value="3" data-la-norm-x></label><label class="math-learning-control">v₂<input type="range" min="-6" max="6" step="0.25" value="4" data-la-norm-y></label></div><div class="math-learning-la-result" data-la-norm-result></div>`;
    }

    function distanceTemplate(withParticipants) {
        const participantControls = withParticipants ? `<div class="math-learning-control-grid"><label class="math-learning-control">Participant A<select data-la-distance-a>${['Alya','Bima','Citra','Dewi'].map(name => `<option>${name}</option>`).join('')}</select></label><label class="math-learning-control">Participant B<select data-la-distance-b>${['Bima','Alya','Citra','Dewi'].map(name => `<option>${name}</option>`).join('')}</select></label></div>` : '';
        return `${participantControls}<div class="math-learning-la-result" data-la-distance-result data-participants="${withParticipants ? 'true' : 'false'}"></div>`;
    }

    function dotProductTemplate() {
        return `<div class="math-learning-control-grid"><label class="math-learning-control">x₁<input type="number" step="0.1" value="0.8" data-la-dot-x1></label><label class="math-learning-control">x₂<input type="number" step="0.1" value="0.75" data-la-dot-x2></label><label class="math-learning-control">y₁<input type="number" step="0.1" value="0.6" data-la-dot-y1></label><label class="math-learning-control">y₂<input type="number" step="0.1" value="0.4" data-la-dot-y2></label></div><div class="math-learning-la-result" data-la-dot-result></div>`;
    }

    function weightedScoreTemplate() {
        return `<div class="math-learning-control-grid"><label class="math-learning-control">Quiz weight<input type="range" min="0" max="1" step="0.05" value="0.6" data-la-weight-q><output>0.60</output></label><label class="math-learning-control">Completion weight<input type="range" min="0" max="1" step="0.05" value="0.4" data-la-weight-c><output>0.40</output></label></div><div class="math-learning-la-result" data-la-weight-result></div><p class="math-learning-preview-note">Output adalah toy instructional score—bukan probability, confidence, atau production recommendation.</p>`;
    }

    function cosineTemplate(mode) {
        return `<div class="math-learning-control-grid"><label class="math-learning-control">Angle y<input type="range" min="0" max="180" step="5" value="45" data-la-angle><output>45°</output></label><label class="math-learning-control">Magnitude y<input type="range" min="0.5" max="5" step="0.1" value="1" data-la-magnitude><output>1.0</output></label></div><svg class="math-learning-la-geometry" viewBox="0 0 420 260" role="img" aria-label="Dua vektor dengan angle dan magnitude yang dapat diubah" data-la-cosine-svg></svg><div class="math-learning-la-result" data-la-cosine-result data-mode="${mode}"></div>`;
    }

    function zeroVectorTemplate() {
        return `${stepTemplate([mathHtml('\\mathbf{x}=\\begin{bmatrix}0\\\\0\\end{bmatrix}', true), mathHtml('\\|\\mathbf{x}\\|_2=0', true), '<p>Denominator cosine menjadi 0.</p>', '<p><strong>Stop:</strong> undefined under standard cosine formula.</p>'])}<p class="math-learning-preview-note">Nilai tidak diubah menjadi probability atau angka buatan.</p>`;
    }

    function matrixExplorerTemplate() {
        return `<div class="math-learning-button-row"><button class="math-learning-choice is-selected" type="button" data-la-matrix-mode="row">Highlight row</button><button class="math-learning-choice" type="button" data-la-matrix-mode="column">Highlight column</button><button class="math-learning-choice" type="button" data-la-matrix-mode="entry">Locate entry</button></div><div class="math-learning-matrix-stage" data-la-matrix-stage></div>`;
    }

    function transposeTemplate() {
        return `<div class="math-learning-button-row"><button class="math-learning-action is-primary" type="button" data-la-transpose>Transpose matrix</button></div><div class="math-learning-matrix-stage" data-la-transpose-stage></div>`;
    }

    function matrixShapeTemplate() {
        return `<div class="math-learning-control-grid">${['m','n','r','p'].map((label, index) => `<label class="math-learning-control">${label}<input type="number" min="1" max="6" value="${[4,2,2,3][index]}" data-la-shape="${label}"></label>`).join('')}</div><div class="math-learning-la-result" data-la-shape-result></div>`;
    }

    function matrixProductRevealTemplate() {
        return stepTemplate([
            '<div class="math-learning-matrix-expression"><span class="is-active">row 1: [1, 2]</span><span>×</span><span class="is-active">column 2: [6, 8]</span></div>',
            mathHtml('C_{12}=1(6)+2(8)', true),
            mathHtml('C_{12}=6+16=22', true),
            '<p>Output cell terisi dari satu row–column dot product.</p>'
        ]);
    }

    function batchScoreTemplate() {
        return `<label class="math-learning-control">Quiz weight<input type="range" min="0" max="1" step="0.05" value="0.6" data-la-batch-weight><output>0.60</output></label><div class="math-learning-matrix-stage" data-la-batch-result></div><p class="math-learning-preview-note">Semua output adalah toy instructional scores, bukan probabilities.</p>`;
    }

    function participantMaterialTemplate() {
        return `<div class="math-learning-matrix-stage" data-la-material-matrix></div><div class="math-learning-la-result" data-la-material-result>Pilih satu output cell untuk melihat pairwise dot product.</div>`;
    }

    function stateToggleTemplate(states) {
        const normalized = states.map(([label, body, message]) => ({ label, body, message }));
        return `<div data-la-state-toggle data-states="${escapeHtml(JSON.stringify(normalized))}"><div class="math-learning-button-row">${normalized.map((state, index) => `<button class="math-learning-choice${index === 0 ? ' is-selected' : ''}" type="button" data-la-state-index="${index}">${escapeHtml(state.label)}</button>`).join('')}</div><div class="math-learning-la-result" data-la-state-result>${normalized[0]?.body || ''}</div></div>`;
    }

    function observationFeatureTemplate() {
        return `<div class="math-learning-control-grid"><label class="math-learning-control">Observation i<select data-la-observation>${['Alya','Bima','Citra','Dewi'].map((name, index) => `<option value="${index}">${index + 1} · ${name}</option>`).join('')}</select></label><label class="math-learning-control">Feature j<select data-la-feature><option value="0">1 · quiz ratio</option><option value="1">2 · completion ratio</option></select></label></div><div class="math-learning-la-result" data-la-observation-result></div>`;
    }

    function arrowAdditionTemplate() {
        return `<div class="math-learning-control-grid"><label class="math-learning-control">u₁<input type="range" min="-3" max="3" step="1" value="2" data-la-arrow-u1></label><label class="math-learning-control">u₂<input type="range" min="-3" max="3" step="1" value="1" data-la-arrow-u2></label><label class="math-learning-control">v₁<input type="range" min="-3" max="3" step="1" value="1" data-la-arrow-v1></label><label class="math-learning-control">v₂<input type="range" min="-3" max="3" step="1" value="2" data-la-arrow-v2></label></div><svg class="math-learning-la-geometry" viewBox="0 0 420 300" role="img" aria-label="Vector addition head-to-tail" data-la-arrow-svg></svg><div class="math-learning-la-result" data-la-arrow-result></div><p class="math-learning-preview-note">Arrow adalah mathematical visualization, bukan participant physical movement.</p>`;
    }

    function normStaticTemplate() {
        return `${mathHtml('\\mathbf{v}=\\begin{bmatrix}3\\\\4\\end{bmatrix},\\quad\\|\\mathbf{v}\\|_2=5', true)}<svg class="math-learning-la-geometry" viewBox="0 0 420 280" role="img" aria-label="Segitiga siku-siku dengan legs 3 dan 4 serta norm 5"><line class="axis" x1="55" y1="230" x2="370" y2="230"/><line class="axis" x1="55" y1="230" x2="55" y2="25"/><line class="guide" x1="55" y1="230" x2="265" y2="230"/><line class="guide" x1="265" y1="230" x2="265" y2="70"/><line class="vector" x1="55" y1="230" x2="265" y2="70"/><text x="150" y="250">component 1 = 3</text><text x="275" y="155">component 2 = 4</text><text x="135" y="130">norm = 5</text></svg><p class="math-learning-preview-note">Arrow geometry merepresentasikan vector, bukan lokasi fisik real-world object.</p>`;
    }

    function needSupportTemplate() {
        return `<label class="math-learning-control">Participant<select data-la-need-participant>${['Alya','Bima','Citra','Dewi'].map(name => `<option>${name}</option>`).join('')}</select></label><div class="math-learning-la-result" data-la-need-result></div><p class="math-learning-preview-note">Cosine di sini adalah toy directional alignment—bukan probability atau bukti causal suitability.</p>`;
    }

    function stackVectorsTemplate() {
        return stepTemplate([
            '<div class="math-learning-score-list"><span><strong>Alya</strong><output>[0.80, 0.75]</output></span><span><strong>Bima</strong><output>[0.60, 0.625]</output></span><span><strong>Citra</strong><output>[0.90, 1.00]</output></span><span><strong>Dewi</strong><output>[0.70, 0.50]</output></span></div>',
            '<p>Setiap compatible participant vector diorientasikan sebagai satu dataset row.</p>',
            mathHtml('\\mathbf{X}=\\begin{bmatrix}0.80&0.75\\\\0.60&0.625\\\\0.90&1.00\\\\0.70&0.50\\end{bmatrix}\\in\\mathbb{R}^{4\\times2}', true),
            '<p>Observation → row; feature → column. Orientation berubah, feature meaning tidak.</p>'
        ]);
    }

    function matrixDatasetShapeTemplate() {
        return `<div class="math-learning-control-grid"><label class="math-learning-control">Observations n<input type="range" min="1" max="6" step="1" value="4" data-la-dataset-rows><output>4</output></label><label class="math-learning-control">Features d<input type="range" min="1" max="5" step="1" value="2" data-la-dataset-columns><output>2</output></label></div><div class="math-learning-matrix-stage" data-la-dataset-shape></div>`;
    }

    function featureOrderTrapTemplate(spec) {
        if (/Bima row swapped|same shape|rectangular structure/i.test(spec?.source || '')) {
            return stateToggleTemplate([
                ['Hide headers', '<p>Dua rectangular 4×2 structures tampak shape-valid.</p>', 'Shape check alone cannot verify semantics.'],
                ['Show headers', '<p>Correct schema: [quiz ratio, completion ratio]. Pada matrix bermasalah, Bima row tertukar.</p>', 'Headers memperlihatkan Bima semantic mismatch yang tidak tertangkap shape.']
            ]);
        }
        return stateToggleTemplate([
            ['Correct order', '<p>[quiz_gap, completion_gap] ↔ [quiz_support, completion_support]</p>', 'Component semantics correspond.'],
            ['Wrong order', '<p>[quiz_gap, completion_gap] ↔ [completion_support, quiz_support]</p>', 'Numerical computation succeeded, but component pairing changed.']
        ]);
    }

    function roleSorter(cards, roles) {
        return `<div class="math-learning-interactive-grid">${cards.map((card,index)=>`<label class="math-learning-control"><span><code>${escapeHtml(card)}</code></span><select data-role-card="${index}"><option value="">Pilih peran…</option>${roles.map(role=>`<option>${escapeHtml(role)}</option>`).join('')}</select></label>`).join('')}</div><div class="math-learning-button-row"><button class="math-learning-action is-primary" type="button" data-role-check>Periksa reasoning</button></div>`;
    }

    function stepTemplate(steps) {
        return `<div class="math-learning-interactive-card" data-step-stage>${steps[0]}</div><div class="math-learning-button-row"><button class="math-learning-step-button" type="button" data-step-next data-steps="${escapeHtml(JSON.stringify(steps))}">Buka langkah berikutnya</button></div>`;
    }

    function compareReveal(leftTitle, leftBody, rightTitle, rightBody, feedback) {
        return `<div class="math-learning-compare"><div class="math-learning-interactive-card"><h4>${escapeHtml(leftTitle)}</h4><p>${escapeHtml(leftBody)}</p></div><div class="math-learning-interactive-card"><h4>${escapeHtml(rightTitle)}</h4><p>${escapeHtml(rightBody)}</p></div></div><div class="math-learning-button-row"><button class="math-learning-action is-primary" type="button" data-compare-reveal data-message="${escapeHtml(feedback)}">Buka interpretasi</button></div>`;
    }

    function choiceReveal(options, prompt, feedback) {
        return `<p>${escapeHtml(prompt)}</p><div class="math-learning-button-row">${options.map((option,index)=>`<button class="math-learning-choice" type="button" data-choice-reveal="${index}" data-message="${escapeHtml(feedback)}">${escapeHtml(option)}</button>`).join('')}</div>`;
    }

    function choiceCheck(cards, prompt) {
        return `<p>${escapeHtml(prompt)}</p><div class="math-learning-chip-list">${cards.map((card,index)=>`<label class="math-learning-chip"><input type="checkbox" data-time-card="${index}"> ${escapeHtml(card)}</label>`).join('')}</div><div class="math-learning-button-row"><button class="math-learning-action is-primary" type="button" data-time-check>Periksa pilihan</button></div>`;
    }

    function scoreManipulator(weights) {
        return `<div class="math-learning-control-grid">${weights ? '<label class="math-learning-control">Quiz weight <input type="range" min="0" max="1" step="0.05" value="0.6" data-score-wq></label><label class="math-learning-control">Completion weight <input type="range" min="0" max="1" step="0.05" value="0.4" data-score-wc></label><label class="math-learning-control"><span><input type="checkbox" checked data-score-lock> Jaga total weights = 1</span></label>' : '<label class="math-learning-control">Completion ratio c <input type="range" min="0" max="1" step="0.05" value="0.75" data-score-c></label>'}</div><div class="math-learning-equation-result" data-score-output></div>`;
    }

    function oneInputOutputTemplate() {
        return `<div class="math-learning-interactive-grid">${[1,2,3].map(n=>`<label class="math-learning-control">Input ${n}<select data-function-map="${n}">${[4,5,6].map(v=>`<option>${v}</option>`).join('')}</select></label>`).join('')}</div><label class="math-learning-control"><span><input type="checkbox" data-function-conflict> Hubungkan input 2 ke output kedua juga</span></label>`;
    }

    function formulaTableTemplate() {
        return `<label class="math-learning-control">x = <input type="range" min="-5" max="5" step="1" value="0" data-table-x></label><div class="math-learning-equation-result" data-table-result></div><div class="math-learning-table-wrap"><table><thead><tr><th>x</th><th>f(x)=2x+1</th></tr></thead><tbody data-function-table></tbody></table></div>`;
    }

    function oneInputFunctionTemplate() {
        return `<label class="math-learning-control">Quiz ratio q <input type="range" min="0" max="1" step="0.1" value="0.4" data-one-q></label><div class="math-learning-equation-result" data-one-output></div>`;
    }

    function twoInputFunctionTemplate() {
        return `<div class="math-learning-control-grid"><label class="math-learning-control">Quiz ratio q <input type="range" min="0" max="1" step="0.05" value="0.8" data-two-q></label><label class="math-learning-control">Completion ratio c <input type="range" min="0" max="1" step="0.05" value="0.75" data-two-c></label></div><div class="math-learning-equation-result" data-two-output></div><p class="math-learning-preview-note">Toy instructional score—bukan probability, confidence, atau production recommendation.</p>`;
    }

    function coordinateTemplate() {
        return `<svg class="math-learning-svg" viewBox="0 0 420 300" role="img" aria-label="Bidang koordinat interaktif"><line class="axis" x1="30" y1="150" x2="390" y2="150"/><line class="axis" x1="210" y1="20" x2="210" y2="280"/><line class="guide" data-guide-x/><line class="guide" data-guide-y/><circle class="plot-point" cx="282" cy="72" r="11" tabindex="0" data-drag-point/><text x="375" y="143">x</text><text x="218" y="32">y</text></svg><div class="math-learning-equation-result" data-coordinate-output>(2, 3)</div>`;
    }

    function graphRevealTemplate() {
        return `<div class="math-learning-table-wrap"><table><thead><tr><th>q</th><th>r(q)</th></tr></thead><tbody>${[[0,.2],[.2,.3],[.4,.4],[.6,.5],[.8,.6]].map(row=>`<tr><td>${row[0].toFixed(1)}</td><td>${row[1].toFixed(2)}</td></tr>`).join('')}</tbody></table></div><svg class="math-learning-svg" viewBox="0 0 420 280" data-graph-reveal aria-label="Graph points dari table"></svg><div class="math-learning-button-row"><button class="math-learning-action is-primary" type="button" data-graph-next>Plot point berikutnya</button></div>`;
    }

    function riseRunTemplate() {
        return `<svg class="math-learning-svg" viewBox="0 0 420 280" role="img" aria-label="Rise and run dari titik 2,5 ke 6,13"><line class="axis" x1="35" y1="245" x2="390" y2="245"/><line class="axis" x1="35" y1="20" x2="35" y2="245"/><polyline class="plot-line" points="105,170 245,170 245,60"/><circle class="plot-point" cx="105" cy="170" r="7"/><circle class="plot-point" cx="245" cy="60" r="7"/><text x="145" y="190">Δx = 4</text><text x="255" y="120">Δy = 8</text></svg><div class="math-learning-button-row"><button class="math-learning-action is-primary" type="button" data-generic-reveal>Hitung rate</button></div>`;
    }

    function averageRateTemplate() {
        return `<div class="math-learning-control-grid"><label class="math-learning-control">x₁<input type="number" value="1" step="0.5" data-rate-x1></label><label class="math-learning-control">x₂<input type="number" value="3" step="0.5" data-rate-x2></label></div><div class="math-learning-equation-result" data-rate-output></div>`;
    }

    function axisScaleTemplate() {
        return `<div class="math-learning-compare"><div class="math-learning-interactive-card"><h4>Axis 0–100</h4><svg class="math-learning-svg" viewBox="0 0 260 160"><polyline class="plot-line" points="30,130 125,128 220,126"/><text x="10" y="25">100</text><text x="18" y="140">0</text></svg></div><div class="math-learning-interactive-card"><h4>Axis 78–82</h4><svg class="math-learning-svg" viewBox="0 0 260 160"><polyline class="plot-line" points="30,125 125,80 220,35"/><text x="10" y="25">82</text><text x="10" y="140">78</text></svg></div></div><div class="math-learning-button-row"><button class="math-learning-action is-primary" type="button" data-generic-reveal>Apakah datanya berubah?</button></div>`;
    }

    function holdCompletionTemplate() {
        return `<label class="math-learning-control">Quiz ratio q <input type="range" min="0" max="1" step="0.05" value="0.8" data-hold-q></label><svg class="math-learning-svg" viewBox="0 0 420 250" data-hold-graph aria-label="Graph toy formula saat completion ditahan 0.75"></svg><div class="math-learning-equation-result" data-hold-output></div><p class="math-learning-preview-note">Ini property toy formula, bukan causal effect.</p>`;
    }

    function slopeTemplate() {
        return `<div class="math-learning-interactive-grid">${[['increasing','Positive'],['decreasing','Negative'],['horizontal','Zero']].map(([kind,label])=>`<button class="math-learning-interactive-card math-learning-choice" type="button" data-slope="${kind}" data-label="${label}"><h4>${kind} line</h4><span>Pilih interpretasi</span></button>`).join('')}</div>`;
    }

    function powerTemplate() {
        return `<div class="math-learning-control-grid"><label class="math-learning-control">Base a<input type="range" min="1" max="10" step="1" value="3" data-power-base></label><label class="math-learning-control">Exponent n<input type="range" min="1" max="6" step="1" value="4" data-power-exp></label></div><div class="math-learning-equation-result" data-power-output></div>`;
    }

    function coefficientExponentTemplate() {
        return `<label class="math-learning-control">x<input type="range" min="-5" max="5" step="1" value="3" data-coeff-x></label><div class="math-learning-compare"><div class="math-learning-interactive-card" data-coeff-left></div><div class="math-learning-interactive-card" data-coeff-right></div></div>`;
    }

    function exponentLogTemplate() {
        return `<div class="math-learning-control-grid"><label class="math-learning-control">Base<input type="range" min="2" max="10" step="1" value="2" data-log-base></label><label class="math-learning-control">Exponent<input type="range" min="1" max="6" step="1" value="3" data-log-exp></label></div><div class="math-learning-equation-result" data-log-output></div>`;
    }

    function sigmaTemplate() {
        return `<div class="math-learning-control-grid">${[2,5,3,10].map((value,index)=>`<label class="math-learning-control">x${index+1}<input type="number" value="${value}" data-sigma-value></label>`).join('')}</div><div class="math-learning-equation-result" data-sigma-output></div>`;
    }

    function squareSumTemplate() {
        return `<div class="math-learning-control-grid">${[1,2,3].map((value,index)=>`<label class="math-learning-control">x${index+1}<input type="number" value="${value}" data-square-value></label>`).join('')}</div><div class="math-learning-compare"><div class="math-learning-interactive-card" data-square-left></div><div class="math-learning-interactive-card" data-square-right></div></div>`;
    }

    function bindInteractive(section, key) {
        const feedback = section.querySelector('[data-feedback]');
        const say = (message, tone) => {
            feedback.textContent = message;
            feedback.className = `math-learning-feedback${tone ? ` is-${tone}` : ''}`;
        };
        bindCommonInteractive(section, key, say);
        bindNumericInteractive(section, key, say);
        bindGraphInteractive(section, key, say);
        bindLinearAlgebraInteractive(section, key, say);
        bindStatisticsInteractive(section, key, say);
        bindProbabilityInteractive(section, key, say);
        bindCalculusInteractive(section, key, say);
    }

    function bindProbabilityInteractive(section, key, say) {
    }

    function bindCalculusInteractive(section, key, say) {
        if (key === 'function-value-explorer') {
            const input = section.querySelector('[data-calc-func-x]');
            const output = section.querySelector('[data-calc-func-output]');
            const update = () => {
                const x = Number(input.value);
                input.nextElementSibling.textContent = x;
                const y = 2 * x + 5;
                output.innerHTML = `<div class="math-learning-stat-box" style="padding:15px; background:#f9f9f9; border-radius:8px;"><h4>f(x) = 2x + 5</h4><strong style="font-size:24px; color:var(--math-accent);">f(${x}) = ${y}</strong></div>`;
                say('Satu nilai input menghasilkan tepat satu nilai output.', 'success');
            };
            if (input) { input.addEventListener('input', update); update(); }
        }
        if (key === 'herai-instructional-score-reader') {
            const qInput = section.querySelector('[data-calc-score-q]');
            const cInput = section.querySelector('[data-calc-score-c]');
            const output = section.querySelector('[data-calc-score-output]');
            const update = () => {
                const q = Number(qInput.value);
                const c = Number(cInput.value);
                qInput.nextElementSibling.textContent = q;
                cInput.nextElementSibling.textContent = c;
                const score = 0.6 * (q / 100) + 0.4 * (c / 100);
                output.innerHTML = `<div class="math-learning-stat-box" style="padding:15px; background:#f9f9f9; border-radius:8px;"><h4>Score</h4><strong style="font-size:24px; color:#c9166c;">${score.toFixed(3)}</strong></div>`;
            };
            if (qInput) { qInput.addEventListener('input', update); cInput.addEventListener('input', update); update(); }
        }
        if (key === 'geser-endpoint') {
            const input = section.querySelector('[data-calc-slope-x]');
            const output = section.querySelector('[data-calc-slope-output]');
            const update = () => {
                const x2 = Number(input.value);
                input.nextElementSibling.textContent = x2;
                const x1 = 0, y1 = 0;
                const y2 = x2 * 2; // linear f(x)=2x
                const slope = x2 !== 0 ? (y2 - y1) / (x2 - x1) : 2;
                output.innerHTML = `<div class="math-learning-stat-box" style="padding:15px; background:#f9f9f9; border-radius:8px;"><h4>Slope</h4><strong style="font-size:24px; color:var(--math-accent);">${slope}</strong><p style="margin-top:10px;">Rise: ${y2}, Run: ${x2}</p></div>`;
            };
            if (input) { input.addEventListener('input', update); update(); }
        }
        if (key === 'ubah-h') {
            const input = section.querySelector('[data-calc-h]');
            const output = section.querySelector('[data-calc-h-output]');
            const update = () => {
                const h = Number(input.value);
                input.nextElementSibling.textContent = h.toFixed(2);
                const x = 1;
                const fx = x * x; // x^2
                const fxh = (x + h) * (x + h);
                const slope = (fxh - fx) / h;
                output.innerHTML = `<div class="math-learning-stat-box" style="padding:15px; background:#f9f9f9; border-radius:8px;"><h4>Average Rate of Change (Secant Slope)</h4><strong style="font-size:24px; color:#c9166c;">${slope.toFixed(3)}</strong></div>`;
                if (h <= 0.05) {
                    say('h sangat kecil! Secant slope hampir sama dengan Tangent slope (Derivative = 2.0).', 'success');
                } else {
                    say('Geser h mendekati 0 untuk melihat limit derivative.', 'warning');
                }
            };
            if (input) { input.addEventListener('input', update); update(); }
        }
        if (key === 'power-rule-manipulator') {
            const input = section.querySelector('[data-calc-power-n]');
            const output = section.querySelector('[data-calc-power-output]');
            const update = () => {
                const n = Number(input.value);
                input.nextElementSibling.textContent = n;
                const newExp = n - 1;
                output.innerHTML = `<div class="math-learning-stat-box" style="padding:15px; background:#f9f9f9; border-radius:8px;"><h4>f(x) = x<sup style="font-size:0.6em">${n}</sup></h4><strong style="font-size:24px; color:var(--math-accent);">f'(x) = ${n}x<sup style="font-size:0.6em">${newExp !== 1 ? newExp : ''}</sup>${newExp === 0 ? ' = ' + n : ''}</strong></div>`;
            };
            if (input) { input.addEventListener('input', update); update(); }
        }
        if (key === 'hold-one-variable-fixed') {
            const select = section.querySelector('[data-calc-partial-hold]');
            const output = section.querySelector('[data-calc-partial-output]');
            const update = () => {
                const hold = select.value;
                if (hold === 'y') {
                    output.innerHTML = `<div class="math-learning-stat-box" style="padding:15px; background:#f9f9f9; border-radius:8px;"><h4>Partial thd x (y konstan)</h4><strong style="font-size:20px; color:#c9166c;">Slice sepanjang sumbu X. Slope dihitung dengan aturan biasa thd X.</strong></div>`;
                } else {
                    output.innerHTML = `<div class="math-learning-stat-box" style="padding:15px; background:#f9f9f9; border-radius:8px;"><h4>Partial thd y (x konstan)</h4><strong style="font-size:20px; color:var(--math-accent);">Slice sepanjang sumbu Y. Slope dihitung dengan aturan biasa thd Y.</strong></div>`;
                }
            };
            if (select) { select.addEventListener('change', update); update(); }
        }
        if (key === 'contour-gradient-arrow') {
            const xInput = section.querySelector('[data-calc-grad-x]');
            const yInput = section.querySelector('[data-calc-grad-y]');
            const output = section.querySelector('[data-calc-grad-output]');
            const update = () => {
                const x = Number(xInput.value);
                const y = Number(yInput.value);
                xInput.nextElementSibling.textContent = x.toFixed(1);
                yInput.nextElementSibling.textContent = y.toFixed(1);
                // f(x,y) = x^2 + y^2 => grad = [2x, 2y]
                const gx = 2 * x;
                const gy = 2 * y;
                output.innerHTML = `<div class="math-learning-stat-box" style="padding:15px; background:#f9f9f9; border-radius:8px;"><h4>Gradient Vector ∇f</h4><strong style="font-size:24px; color:var(--math-accent);">[${gx.toFixed(1)}, ${gy.toFixed(1)}]</strong><p style="margin-top:10px;">Menunjuk menjauh dari pusat (0,0) menuju nilai yang lebih besar.</p></div>`;
            };
            if (xInput) { xInput.addEventListener('input', update); yInput.addEventListener('input', update); update(); }
        }
        if (key === 'ubah-inner-sensitivity') {
            const iInput = section.querySelector('[data-calc-chain-inner]');
            const oInput = section.querySelector('[data-calc-chain-outer]');
            const output = section.querySelector('[data-calc-chain-output]');
            const update = () => {
                const inner = Number(iInput.value);
                const outer = Number(oInput.value);
                iInput.nextElementSibling.textContent = inner.toFixed(1);
                oInput.nextElementSibling.textContent = outer.toFixed(1);
                const total = inner * outer;
                output.innerHTML = `<div class="math-learning-stat-box" style="padding:15px; background:#f9f9f9; border-radius:8px;"><h4>Total Derivative</h4><strong style="font-size:24px; color:#c9166c;">${inner.toFixed(1)} × ${outer.toFixed(1)} = ${total.toFixed(2)}</strong></div>`;
                say('Chain rule: kalikan seluruh turunan lokal.', 'success');
            };
            if (iInput) { iInput.addEventListener('input', update); oInput.addEventListener('input', update); update(); }
        }
        if (key === 'move-one-parameter-on-a-loss-curve') {
            const wInput = section.querySelector('[data-calc-loss-w]');
            const output = section.querySelector('[data-calc-loss-output]');
            const update = () => {
                const w = Number(wInput.value);
                wInput.nextElementSibling.textContent = w.toFixed(1);
                const loss = w * w; // W^2
                const grad = 2 * w;
                let dir = grad > 0 ? "Kurangi W" : (grad < 0 ? "Tambah W" : "Sudah Minimum");
                output.innerHTML = `<div class="math-learning-stat-box" style="padding:15px; background:#f9f9f9; border-radius:8px;"><h4>Loss</h4><strong style="font-size:24px; color:var(--text);">${loss.toFixed(2)}</strong><div style="margin-top:10px;"><strong>Gradient:</strong> ${grad.toFixed(1)}</div><div style="margin-top:10px; color:var(--math-accent);"><strong>Rekomendasi Update:</strong> ${dir}</div></div>`;
            };
            if (wInput) { wInput.addEventListener('input', update); update(); }
        }
        if (key === 'explore-2d-landscape') {
            const w1Input = section.querySelector('[data-calc-land-w1]');
            const w2Input = section.querySelector('[data-calc-land-w2]');
            const output = section.querySelector('[data-calc-land-output]');
            const update = () => {
                const w1 = Number(w1Input.value);
                const w2 = Number(w2Input.value);
                w1Input.nextElementSibling.textContent = w1.toFixed(1);
                w2Input.nextElementSibling.textContent = w2.toFixed(1);
                const loss = (w1 * w1) + (w2 * w2);
                const grad = [2 * w1, 2 * w2];
                output.innerHTML = `<div class="math-learning-stat-box" style="padding:15px; background:#f9f9f9; border-radius:8px;"><h4>Loss</h4><strong style="font-size:24px; color:var(--text);">${loss.toFixed(2)}</strong><div style="margin-top:10px;"><strong>Gradient:</strong> [${grad[0].toFixed(1)}, ${grad[1].toFixed(1)}]</div><div style="margin-top:10px; color:var(--math-accent);">Titik Minimum Global ada di [0, 0].</div></div>`;
                if (loss === 0) say('Global Minimum Tercapai!', 'success');
                else say('Gradient memberitahu arah pendakian terdalam. Untuk loss, kita turun melawan arah gradient.', 'warning');
            };
            if (w1Input) { w1Input.addEventListener('input', update); w2Input.addEventListener('input', update); update(); }
        }
    }

    function bindStatisticsInteractive(section, key, say) {
        if (key === 'pilih-row-atau-column') {
            const table = section.querySelector('[data-interactive-table]');
            const title = section.querySelector('[data-table-selection-title]');
            const desc = section.querySelector('[data-table-selection-desc]');
            if (table && title && desc) {
                table.querySelectorAll('tr[data-row]').forEach(tr => {
                    tr.addEventListener('click', (e) => {
                        e.stopPropagation();
                        table.querySelectorAll('.is-selected').forEach(el => el.classList.remove('is-selected'));
                        tr.classList.add('is-selected');
                        const participant = tr.querySelector('[data-col="participant"]').textContent;
                        title.textContent = `Satu observation: ${participant}`;
                        desc.textContent = `Baris ini mencatat seluruh nilai (observed values) untuk participant ${participant}.`;
                        say('Kamu telah memilih satu OBSERVATION.', 'success');
                    });
                });

                table.querySelectorAll('th[data-col]').forEach(th => {
                    th.addEventListener('click', (e) => {
                        e.stopPropagation();
                        table.querySelectorAll('.is-selected').forEach(el => el.classList.remove('is-selected'));
                        table.querySelectorAll(`td[data-col="${th.dataset.col}"]`).forEach(td => td.classList.add('is-selected'));
                        th.classList.add('is-selected');
                        const varName = th.textContent;
                        title.textContent = `Satu variable: ${varName}`;
                        desc.textContent = `Kolom ini mencatat seluruh nilai untuk variabel ${varName} pada semua participant.`;
                        say('Kamu telah memilih satu VARIABLE.', 'success');
                    });
                });
            }
        } else if (key === 'change-one-extreme-value') {
            const range = section.querySelector('[data-stat-extreme]');
            const output = section.querySelector('output');
            const meanText = section.querySelector('[data-stat-mean]');
            const medianText = section.querySelector('[data-stat-median]');
            const valText = section.querySelector('[data-stat-extreme-val]');
            if (range && output && meanText && medianText && valText) {
                range.addEventListener('input', () => {
                    const val = Number(range.value);
                    output.textContent = val;
                    valText.textContent = val;
                    const sum = 30 + 40 + 45 + val;
                    meanText.textContent = (sum / 4).toFixed(1);
                    medianText.textContent = "42.5";
                });
            }
        } else if (key === 'change-one-observation') {
            const rangeVar = section.querySelector('[data-stat-obs-var]');
            if (rangeVar) {
                const output = section.querySelector('output');
                const varianceText = section.querySelector('[data-stat-variance]');
                const sdText = section.querySelector('[data-stat-sd]');
                const valText = section.querySelector('[data-stat-obs-val]');
                const meanText = section.querySelector('[data-stat-mean]');
                
                rangeVar.addEventListener('input', () => {
                    const val = Number(rangeVar.value);
                    output.textContent = val;
                    valText.textContent = val;
                    const mean = (45 + 30 + val + 40) / 4;
                    if (meanText) meanText.textContent = mean.toFixed(1);
                    const variance = (Math.pow(45-mean, 2) + Math.pow(30-mean, 2) + Math.pow(val-mean, 2) + Math.pow(40-mean, 2)) / 4;
                    varianceText.textContent = variance.toFixed(2);
                    sdText.textContent = Math.sqrt(variance).toFixed(4);
                });
            }
            
            const rangePerc = section.querySelector('[data-stat-obs-perc]');
            if (rangePerc) {
                const output = section.querySelector('output');
                const q1Text = section.querySelector('[data-stat-q1]');
                const q2Text = section.querySelector('[data-stat-q2]');
                const q3Text = section.querySelector('[data-stat-q3]');
                const iqrText = section.querySelector('[data-stat-iqr]');
                const valText = section.querySelector('[data-stat-perc-val]');
                
                rangePerc.addEventListener('input', () => {
                    const val = Number(rangePerc.value);
                    output.textContent = val.toFixed(2);
                    valText.textContent = val.toFixed(2);
                    const arr = [val, 0.70, 0.80, 0.90].sort((a,b)=>a-b);
                    const q1 = (arr[0] + arr[1]) / 2;
                    const q2 = (arr[1] + arr[2]) / 2;
                    const q3 = (arr[2] + arr[3]) / 2;
                    q1Text.textContent = q1.toFixed(2);
                    q2Text.textContent = q2.toFixed(2);
                    q3Text.textContent = q3.toFixed(2);
                    iqrText.textContent = (q3 - q1).toFixed(2);
                });
            }
        } else if (key === 'draggable-bin-boundaries') {
            const range = section.querySelector('[data-stat-bin-offset]');
            if (range) {
                const output = section.querySelector('output');
                const barsContainer = section.querySelector('[data-stat-hist-bars]');
                
                const data = [23, 27, 30, 32, 33, 35, 37, 38, 38, 40, 42, 42, 45, 45, 47, 48, 48, 50, 52, 53, 55, 57, 60, 63];
                
                const updateHistogram = () => {
                    const offset = Number(range.value);
                    output.textContent = offset;
                    
                    const width = 10;
                    const bins = [];
                    // Create bins
                    for (let i = 0; i < 5; i++) {
                        bins.push(0);
                    }
                    
                    data.forEach(val => {
                        if (val >= offset && val <= offset + (5 * width)) {
                            let binIdx = Math.floor((val - offset) / width);
                            // Edge case for the absolute max value 63 if offset is 15 (63 is < 15+50=65) -> idx 4
                            // If offset is 15 and val is 65, it would be idx 5. The canonical says [60,70] is inclusive.
                            if (binIdx >= 5) binIdx = 4;
                            bins[binIdx]++;
                        }
                    });
                    
                    const maxCount = Math.max(...bins) || 1;
                    barsContainer.innerHTML = bins.map(count => {
                        const h = (count / maxCount) * 100;
                        return `<div style="flex:1; background:var(--math-accent); height:${h}%; min-height:5px; position:relative;" class="math-interactive-hist-bar"><span style="position:absolute; top:-20px; left:50%; transform:translateX(-50%); font-size:12px; font-weight:bold;" class="math-interactive-hist-count">${count}</span></div>`;
                    }).join('');
                };
                range.addEventListener('input', updateHistogram);
                updateHistogram(); // Initial call
            }
        } else if (key === 'percentile-locator') {
            const range = section.querySelector('[data-stat-percentile]');
            if (range) {
                const output = section.querySelector('output');
                const desc = section.querySelector('[data-stat-percentile-desc]');
                range.addEventListener('input', () => {
                    const val = Number(range.value);
                    output.textContent = val + 'th';
                    desc.textContent = `${val}% observation bernilai ≤ angka ini.`;
                });
            }
        } else if (key === 'inspect-flagged-record') {
            const range = section.querySelector('[data-stat-outlier]');
            if (range) {
                const output = section.querySelector('output');
                const flagCount = section.querySelector('[data-stat-flag]');
                const interpText = section.querySelector('[data-stat-interp]');
                
                range.addEventListener('input', () => {
                    const val = Number(range.value);
                    output.textContent = val;
                    if (val > 73.5) {
                        flagCount.textContent = '1';
                        interpText.textContent = `Potential outlier detected! Action: inspect`;
                    } else {
                        flagCount.textContent = '0';
                        interpText.textContent = `Valid data (≤ 73.5)`;
                    }
                });
            }
        } else if (key === 'move-one-participant') {
            const range = section.querySelector('[data-stat-citra-quiz]');
            if (range) {
                const output = section.querySelector('output');
                const covarText = section.querySelector('[data-stat-covar-val]');
                const corrText = section.querySelector('[data-stat-corr-val]');
                const valText = section.querySelector('[data-stat-citra-val]');
                
                range.addEventListener('input', () => {
                    const val = Number(range.value);
                    output.textContent = val.toFixed(2);
                    valText.textContent = val.toFixed(2);
                    
                    const q = [0.80, 0.60, val, 0.70];
                    const s = [0.75, 0.625, 1.00, 0.50];
                    const meanQ = q.reduce((a,b)=>a+b)/4;
                    const meanS = s.reduce((a,b)=>a+b)/4;
                    
                    let covar = 0;
                    let varQ = 0;
                    let varS = 0;
                    for (let i=0; i<4; i++) {
                        const dq = q[i] - meanQ;
                        const ds = s[i] - meanS;
                        covar += (dq * ds);
                        varQ += (dq * dq);
                        varS += (ds * ds);
                    }
                    covar = covar / 4;
                    varQ = varQ / 4;
                    varS = varS / 4;
                    
                    const corr = covar / Math.sqrt(varQ * varS);
                    
                    covarText.textContent = covar.toFixed(7);
                    corrText.textContent = corr.toFixed(7);
                });
            }
        } else if (key === 'scale-vs-semantics') {
            const select = section.querySelector('[data-stat-semantic]');
            if (select) {
                const title = section.querySelector('[data-stat-semantic-title]');
                const desc = section.querySelector('[data-stat-semantic-desc]');
                select.addEventListener('change', () => {
                    if (select.value === 'id') {
                        title.textContent = 'Nominal / Identifier';
                        desc.textContent = 'Angka ini hanya label. Menghitung rata-rata Participant ID tidak ada maknanya!';
                    } else if (select.value === 'duration') {
                        title.textContent = 'Numerical (Ratio)';
                        desc.textContent = 'Valid untuk diukur mean, median, dan variansinya. Angka 0 menit berarti benar-benar tidak ada durasi.';
                    } else if (select.value === 'zipcode') {
                        title.textContent = 'Categorical (Nominal)';
                        desc.textContent = 'Angka ini lokasi. Rata-rata dari dua kode pos tidak menghasilkan kode pos tengah yang valid.';
                    }
                });
            }
        }
    }

    function bindCommonInteractive(section, key, say) {
        section.querySelector('[data-generic-reveal]')?.addEventListener('click', () => {
            const messages = {
                'encoding-trap': 'Tidak dapat disimpulkan. 1, 2, dan 3 adalah index kategori; jarak numeriknya tidak otomatis memiliki makna jarak warna.',
                'rise-and-run': 'Δy/Δx = 8/4 = 2 output units per input unit.',
                'same-data-different-axis-scale': 'Datanya tetap 79, 80, 81. Hanya visual scale yang berubah, sehingga steepness harus dibaca bersama axis.',
            };
            say(messages[key] || 'Interpretasi dibuka. Cocokkan hasil dengan makna quantity, bukan hanya bentuk angkanya.', 'success');
        });
        section.querySelectorAll('[data-compare-reveal]').forEach(button => button.addEventListener('click', () => say(button.dataset.message, 'success')));
        section.querySelectorAll('[data-choice-reveal]').forEach(button => button.addEventListener('click', () => {
            section.querySelectorAll('[data-choice-reveal]').forEach(item => item.classList.toggle('is-selected', item === button));
            say(button.dataset.message, 'success');
        }));
        const stateToggle = section.querySelector('[data-la-state-toggle]');
        if (stateToggle) {
            const states = JSON.parse(stateToggle.dataset.states || '[]');
            stateToggle.querySelectorAll('[data-la-state-index]').forEach(button => button.addEventListener('click', () => {
                const state = states[Number(button.dataset.laStateIndex)];
                stateToggle.querySelectorAll('[data-la-state-index]').forEach(item => item.classList.toggle('is-selected', item === button));
                stateToggle.querySelector('[data-la-state-result]').innerHTML = state?.body || '';
                say(state?.message || 'State diperbarui.', Number(button.dataset.laStateIndex) ? 'warning' : 'success');
            }));
        }
        const stepButton = section.querySelector('[data-step-next]');
        if (stepButton) {
            const steps = JSON.parse(stepButton.dataset.steps || '[]');
            let step = 0;
            stepButton.addEventListener('click', () => {
                step = Math.min(step + 1, steps.length - 1);
                section.querySelector('[data-step-stage]').innerHTML = steps.slice(0, step + 1).map(value => `<div class="math-learning-interactive-card">${value}</div>`).join('');
                stepButton.textContent = step === steps.length - 1 ? 'Semua langkah terbuka' : 'Buka langkah berikutnya';
                stepButton.disabled = step === steps.length - 1;
                if (step === steps.length - 1) say('Urutan lengkap terbuka. Baca setiap langkah sebagai perubahan yang terpisah.', 'success');
            });
        }
        if (key === 'real-world-representation') {
            const values = ['AI Interest = High','Python Readiness = Basic','Math Readiness = Medium','Quiz Score = 8/10','Completion = 6/8','Study Duration = 45 min'];
            let count = 0;
            section.querySelector('[data-representation-next]').addEventListener('click', event => {
                count = Math.min(count + 1, values.length);
                section.querySelector('[data-representation-list]').innerHTML = values.slice(0, count).map(value => `<li>${escapeHtml(value)}</li>`).join('');
                if (count === values.length) {
                    event.currentTarget.disabled = true;
                    say('Ini adalah representasi data tentang Alya, bukan Alya secara keseluruhan.', 'success');
                }
            });
        }
        if (key === 'rich-vs-compressed-representation') {
            const answers = ['Hanya representasi kaya yang mempertahankan jumlah benar 8/10.','Keduanya dapat menjawab status lulus.','Representasi Pass tidak dapat membedakan 6/10 dan 10/10 jika keduanya lulus.'];
            section.querySelectorAll('[data-rich-question]').forEach(button => button.addEventListener('click', () => say(answers[Number(button.dataset.richQuestion)], 'success')));
        }
        if (section.querySelector('[data-role-check]')) {
            section.querySelector('[data-role-check]').addEventListener('click', () => {
                const selected = [...section.querySelectorAll('[data-role-card]')].filter(select => select.value).length;
                if (!selected) return say('Pilih peran untuk minimal satu item terlebih dahulu.', 'warning');
                const special = key === 'does-this-number-behave-like-a-number'
                    ? 'Durasi dan jumlah benar adalah quantity. Postal code adalah identifier/kategori. Readiness code membutuhkan definisi scale sebelum jarak angkanya ditafsirkan.'
                    : key === 'meaning-tagger'
                        ? 'Hanya predicted_probability yang secara eksplisit boleh dibaca sebagai chance. Nilai 0.75 lain mengikuti semantics masing-masing.'
                        : key === 'numerical-vs-categorical-vs-identifier'
                            ? 'participant_id adalah identifier; duration dan ratio adalah numerical; track adalah categorical. Identifier yang berupa digit tidak otomatis bermakna kuantitatif.'
                        : 'Untuk task predict mastery: participant_id adalah identifier; mastery_after_material adalah target; metric lain hanya candidate feature/context sesuai definisi task.';
                say(special, 'success');
            });
        }
        if (key === 'what-does-one-row-mean') {
            section.querySelectorAll('[data-row-unit]').forEach(button => button.addEventListener('click', () => {
                const participant = button.dataset.rowUnit === 'participant';
                section.querySelectorAll('[data-row-unit]').forEach(item => item.classList.toggle('is-selected', item === button));
                const values = participant ? ['Alya','Bima','Citra'] : ['Alya · S1','Alya · S2','Bima · S1','Bima · S2','Citra · S1','Citra · S2'];
                section.querySelector('[data-row-output]').innerHTML = values.map(value => `<span class="math-learning-chip">${value}</span>`).join('');
                say(`Unit ${participant ? 'Participant menghasilkan 3 rows' : 'Study Session menghasilkan 6 rows'}. Jumlah observation bergantung pada unit analisis.`, 'success');
            }));
        }
        if (section.querySelector('[data-time-check]')) {
            section.querySelector('[data-time-check]').addEventListener('click', () => {
                const values = [...section.querySelectorAll('[data-time-card]')].map(input => input.checked);
                const correct = values[0] && values[1] && values[2] && !values[3];
                say(correct ? 'Tepat. Post-material quiz belum tersedia pada prediction time.' : 'Tinjau timeline: hanya previous_* fields yang tersedia sebelum material dimulai.', correct ? 'success' : 'warning');
            });
        }
        if (key === 'expression-builder') {
            let built = [];
            const output = section.querySelector('[data-expression-output]');
            section.querySelectorAll('[data-expression-token]').forEach(button => button.addEventListener('click', () => {
                built.push(button.dataset.expressionToken);
                output.textContent = built.join('');
            }));
            section.querySelector('[data-expression-reset]').addEventListener('click', () => { built = []; output.textContent = '...'; });
            section.querySelector('[data-expression-check]').addEventListener('click', () => say(built.join('') === '0.6q+0.4c' ? 'Tepat: dua coefficients, dua variables, dua terms, dan operator + membentuk expression.' : 'Susun token menjadi 0.6q+0.4c.', built.join('') === '0.6q+0.4c' ? 'success' : 'warning'));
        }
        if (key === 'one-input-one-output') {
            section.querySelector('[data-function-conflict]').addEventListener('change', event => say(event.currentTarget.checked ? 'Input 2 sekarang memiliki dua outputs: relation ini bukan function dari input tersebut.' : 'Setiap input kembali memiliki tepat satu output. Multiple inputs tetap boleh menuju output yang sama.', event.currentTarget.checked ? 'warning' : 'success'));
        }
        if (key === 'positive-negative-zero-slope') {
            section.querySelectorAll('[data-slope]').forEach(button => button.addEventListener('click', () => say(`${button.dataset.label} rate cocok dengan ${button.dataset.slope} line.`, 'success')));
        }
    }

    function bindNumericInteractive(section, key, say) {
        const updateFraction = () => {
            const numerator = Number(section.querySelector('[data-fraction-num]')?.value);
            const denominator = Number(section.querySelector('[data-fraction-den]')?.value);
            if (!Number.isFinite(numerator) || !Number.isFinite(denominator) || denominator === 0) {
                section.querySelector('[data-fraction-output]').textContent = 'Denominator harus berupa angka bukan nol.';
                return say('Denominator 0 tidak valid untuk fraction.', 'error');
            }
            const decimal = numerator / denominator;
            section.querySelector('[data-fraction-output]').innerHTML = mathHtml(`\\frac{${numerator}}{${denominator}}=${decimal.toFixed(4).replace(/0+$/,'').replace(/\.$/,'')}=${(decimal*100).toFixed(2).replace(/\.00$/,'')}\\%`, true);
            say('Fraction, decimal, dan percentage merepresentasikan proporsi yang sama.', 'success');
        };
        section.querySelectorAll('[data-fraction-num], [data-fraction-den]').forEach(input => input.addEventListener('input', updateFraction));
        if (section.querySelector('[data-fraction-output]')) updateFraction();

        const updateScore = event => {
            const output = section.querySelector('[data-score-output]');
            if (!output) return;
            const q = 0.8;
            const cInput = section.querySelector('[data-score-c]');
            const wqInput = section.querySelector('[data-score-wq]');
            const wcInput = section.querySelector('[data-score-wc]');
            if (cInput) {
                const c = Number(cInput.value);
                const score = 0.6 * q + 0.4 * c;
                output.innerHTML = mathHtml(`s=0.6(0.80)+0.4(${c.toFixed(2)})=${score.toFixed(3)}`, true);
                say('Ketika c naik dan coefficient-nya positif, output toy rule ini ikut naik.', 'success');
            } else {
                let wq = Number(wqInput.value);
                let wc = Number(wcInput.value);
                if (section.querySelector('[data-score-lock]').checked && event?.target === wqInput) { wc = 1 - wq; wcInput.value = String(wc); }
                if (section.querySelector('[data-score-lock]').checked && event?.target === wcInput) { wq = 1 - wc; wqInput.value = String(wq); }
                const score = wq * 0.8 + wc * 0.75;
                output.innerHTML = mathHtml(`s=${wq.toFixed(2)}q+${wc.toFixed(2)}c=${score.toFixed(3)}`, true);
                say('Weights adalah bagian dari rule/design; weight besar bukan bukti causal importance.', 'warning');
            }
        };
        section.querySelectorAll('[data-score-c], [data-score-wq], [data-score-wc], [data-score-lock]').forEach(input => input.addEventListener('input', updateScore));
        if (section.querySelector('[data-score-output]')) updateScore();

        if (key === 'function-machine') {
            section.querySelector('[data-function-run]').addEventListener('click', () => {
                const x = Number(section.querySelector('[data-function-input]').value);
                if (!Number.isFinite(x)) return say('Masukkan input numerik yang valid.', 'error');
                section.querySelector('[data-function-output]').textContent = String(2 * x + 1);
                say(`f(${x}) = 2(${x}) + 1 = ${2*x+1}.`, 'success');
            });
        }
        const updateTable = () => {
            const xInput = section.querySelector('[data-table-x]');
            if (!xInput) return;
            const x = Number(xInput.value);
            section.querySelector('[data-table-result]').innerHTML = mathHtml(`(x,f(x))=(${x},${2*x+1})`, true);
            section.querySelector('[data-function-table]').innerHTML = Array.from({length:11},(_,i)=>i-5).map(value=>`<tr${value===x?' style="background:#fff0f7"':''}><td>${value}</td><td>${2*value+1}</td></tr>`).join('');
        };
        section.querySelector('[data-table-x]')?.addEventListener('input', updateTable);
        updateTable();
        const updateOne = () => {
            const input = section.querySelector('[data-one-q]');
            if (!input) return;
            const q = Number(input.value);
            section.querySelector('[data-one-output]').innerHTML = mathHtml(`r(${q.toFixed(1)})=0.5(${q.toFixed(1)})+0.2=${(0.5*q+0.2).toFixed(2)}`, true);
            say('Setiap kenaikan q sebesar 0.1 menaikkan output rule ini sebesar 0.05.', 'success');
        };
        section.querySelector('[data-one-q]')?.addEventListener('input', updateOne);
        updateOne();
        const updateTwo = () => {
            const qInput = section.querySelector('[data-two-q]');
            if (!qInput) return;
            const q = Number(qInput.value), c = Number(section.querySelector('[data-two-c]').value);
            section.querySelector('[data-two-output]').innerHTML = mathHtml(`h(${q.toFixed(2)},${c.toFixed(2)})=0.6(${q.toFixed(2)})+0.4(${c.toFixed(2)})=${(0.6*q+0.4*c).toFixed(3)}`, true);
            say('Output berubah menurut toy instructional rule. Ini sensitivity intuition, bukan causal claim.', 'warning');
        };
        section.querySelectorAll('[data-two-q], [data-two-c]').forEach(input=>input.addEventListener('input',updateTwo));
        updateTwo();
        const updateRate = () => {
            const x1Input = section.querySelector('[data-rate-x1]');
            if (!x1Input) return;
            const x1 = Number(x1Input.value), x2 = Number(section.querySelector('[data-rate-x2]').value);
            const output = section.querySelector('[data-rate-output]');
            if (!Number.isFinite(x1) || !Number.isFinite(x2) || x1 === x2) {
                output.textContent = 'x₁ dan x₂ harus valid dan berbeda.';
                return say('Interval membutuhkan dua input yang berbeda.', 'error');
            }
            const rate = (x2*x2-x1*x1)/(x2-x1);
            output.innerHTML = mathHtml(`\\frac{f(${x2})-f(${x1})}{${x2}-${x1}}=${rate.toFixed(3)}`, true);
            say('Untuk f(x)=x², average rate bergantung pada interval yang dipilih.', 'success');
        };
        section.querySelectorAll('[data-rate-x1], [data-rate-x2]').forEach(input=>input.addEventListener('input',updateRate));
        updateRate();
        const updatePower = () => {
            const baseInput = section.querySelector('[data-power-base]');
            if (!baseInput) return;
            const base=Number(baseInput.value), exp=Number(section.querySelector('[data-power-exp]').value);
            section.querySelector('[data-power-output]').innerHTML=mathHtml(`${base}^{${exp}}=${Array.from({length:exp},()=>base).join('\\times')}=${base**exp}`,true);
        };
        section.querySelectorAll('[data-power-base], [data-power-exp]').forEach(input=>input.addEventListener('input',updatePower));
        updatePower();
        const updateCoeff = () => {
            const input=section.querySelector('[data-coeff-x]'); if(!input)return;
            const x=Number(input.value);
            section.querySelector('[data-coeff-left]').innerHTML=`<h4>Coefficient</h4>${mathHtml(`2(${x})=${2*x}`,true)}`;
            section.querySelector('[data-coeff-right]').innerHTML=`<h4>Exponent</h4>${mathHtml(`${x}^2=${x*x}`,true)}`;
        };
        section.querySelector('[data-coeff-x]')?.addEventListener('input',updateCoeff); updateCoeff();
        const updateLog=()=>{const b=section.querySelector('[data-log-base]');if(!b)return;const base=Number(b.value),exp=Number(section.querySelector('[data-log-exp]').value),value=base**exp;section.querySelector('[data-log-output]').innerHTML=mathHtml(`${base}^{${exp}}=${value}\\quad\\Longleftrightarrow\\quad\\log_{${base}}(${value})=${exp}`,true);};
        section.querySelectorAll('[data-log-base], [data-log-exp]').forEach(input=>input.addEventListener('input',updateLog));updateLog();
        const updateSigma=()=>{const inputs=[...section.querySelectorAll('[data-sigma-value]')];if(!inputs.length)return;const values=inputs.map(input=>Number(input.value)||0),total=values.reduce((a,b)=>a+b,0);section.querySelector('[data-sigma-output]').innerHTML=mathHtml(`\\sum_{i=1}^{4}x_i=${values.join('+')}=${total}`,true);};
        section.querySelectorAll('[data-sigma-value]').forEach(input=>input.addEventListener('input',updateSigma));updateSigma();
        const updateSquares=()=>{const inputs=[...section.querySelectorAll('[data-square-value]')];if(!inputs.length)return;const values=inputs.map(input=>Number(input.value)||0),sum=values.reduce((a,b)=>a+b,0),squares=values.reduce((a,b)=>a+b*b,0);section.querySelector('[data-square-left]').innerHTML=`<h4>Square of sum</h4>${mathHtml(`(${values.join('+')})^2=${sum*sum}`,true)}`;section.querySelector('[data-square-right]').innerHTML=`<h4>Sum of squares</h4>${mathHtml(values.map(v=>`${v}^2`).join('+')+`=${squares}`,true)}`;};
        section.querySelectorAll('[data-square-value]').forEach(input=>input.addEventListener('input',updateSquares));updateSquares();
    }

    function bindLinearAlgebraInteractive(section, _key, say) {
        const participants = {
            Alya: [0.80, 0.75],
            Bima: [0.60, 0.625],
            Citra: [0.90, 1.00],
            Dewi: [0.70, 0.50]
        };
        const numericValue = input => {
            const value = Number(input?.value);
            return Number.isFinite(value) ? value : 0;
        };
        const vectorLatex = values => `\\begin{bmatrix}${values.map(value => Number(value).toFixed(3).replace(/0+$/, '').replace(/\\.$/, '')).join('\\\\')}\\end{bmatrix}`;

        const participantSelect = section.querySelector('[data-la-participant]');
        if (participantSelect) {
            const update = () => {
                const name = participantSelect.value;
                const values = participants[name];
                section.querySelector('[data-la-participant-result]').innerHTML = `<h4>${name}</h4>${mathHtml(`\\mathbf{x}^{(${Object.keys(participants).indexOf(name) + 1})}=${vectorLatex(values)}`, true)}<p>Component order tetap: quiz ratio q, lalu completion ratio c.</p>`;
                say('Values berubah antar-observation; feature order dan semantics tetap.', 'success');
            };
            participantSelect.addEventListener('change', update);
            update();
        }

        const observationResult = section.querySelector('[data-la-observation-result]');
        if (observationResult) {
            const names = Object.keys(participants);
            const features = ['quiz ratio', 'completion ratio'];
            const update = () => {
                const observationIndex = Number(section.querySelector('[data-la-observation]').value);
                const featureIndex = Number(section.querySelector('[data-la-feature]').value);
                const value = participants[names[observationIndex]][featureIndex];
                observationResult.innerHTML = `${mathHtml(`x_{${featureIndex + 1}}^{(${observationIndex + 1})}=${value.toFixed(featureIndex ? 3 : 2)}`, true)}<p>Feature ke-${featureIndex + 1} observation ke-${observationIndex + 1} = ${features[featureIndex]} ${names[observationIndex]}.</p>`;
                say('i memilih observation/row; j memilih feature/component.', 'success');
            };
            section.querySelectorAll('[data-la-observation], [data-la-feature]').forEach(select => select.addEventListener('change', update));
            update();
        }

        const viewResult = section.querySelector('[data-la-view-result]');
        if (viewResult) {
            const views = [
                '<h4>Participant</h4><p>Alya adalah manusia dengan konteks yang jauh lebih kaya daripada record sistem.</p>',
                '<h4>Selected data</h4><p>quiz ratio q = 0.80; completion ratio c = 0.75.</p>',
                `<h4>Vector representation</h4>${mathHtml('\\mathbf{x}^{(1)}=\\begin{bmatrix}0.80\\\\0.75\\end{bmatrix}', true)}`,
                '<h4>2D mathematical view</h4><svg class="math-learning-la-geometry" viewBox="0 0 320 220" role="img" aria-label="Vektor dari origin menuju titik 0.80, 0.75"><line class="axis" x1="36" y1="184" x2="292" y2="184"/><line class="axis" x1="36" y1="184" x2="36" y2="24"/><line class="vector" x1="36" y1="184" x2="240" y2="64"/><circle class="plot-point" cx="240" cy="64" r="7"/><text x="214" y="52">(0.80, 0.75)</text></svg>'
            ];
            section.querySelectorAll('[data-la-view]').forEach(button => button.addEventListener('click', () => {
                section.querySelectorAll('[data-la-view]').forEach(item => item.classList.toggle('is-selected', item === button));
                viewResult.innerHTML = views[Number(button.dataset.laView)];
                say('Keempat view berkaitan, tetapi bukan object yang identik.', 'warning');
            }));
            section.querySelector('[data-la-view="0"]')?.click();
        }

        const orientationResult = section.querySelector('[data-la-orientation-result]');
        if (orientationResult) {
            const update = button => {
                const row = button.dataset.laOrientation === 'row';
                orientationResult.innerHTML = row
                    ? mathHtml('\\mathbf{x}^{\\top}=\\begin{bmatrix}0.80 & 0.75\\end{bmatrix}\\in\\mathbb{R}^{1\\times2}', true)
                    : mathHtml('\\mathbf{x}=\\begin{bmatrix}0.80\\\\0.75\\end{bmatrix}\\in\\mathbb{R}^{2\\times1}', true);
                section.querySelectorAll('[data-la-orientation]').forEach(item => item.classList.toggle('is-selected', item === button));
                say(`Orientation berubah menjadi ${row ? 'row 1×2' : 'column 2×1'}; jumlah components tetap dua.`, 'success');
            };
            section.querySelectorAll('[data-la-orientation]').forEach(button => button.addEventListener('click', () => update(button)));
            update(section.querySelector('[data-la-orientation="column"]'));
        }

        const vectorResult = section.querySelector('[data-la-vector-result]');
        if (vectorResult) {
            const update = () => {
                const fields = [...section.querySelectorAll('[data-la-x1], [data-la-x2], [data-la-y1], [data-la-y2]')];
                if (fields.some(input => input.value === '' || !Number.isFinite(Number(input.value)))) {
                    vectorResult.className = 'math-learning-la-result is-invalid';
                    vectorResult.textContent = 'Masukkan empat component values yang valid.';
                    return say('Vector operation memerlukan component numerik pada kedua vector.', 'error');
                }
                vectorResult.className = 'math-learning-la-result';
                const x = fields.slice(0, 2).map(input => Number(input.value));
                const y = fields.slice(2).map(input => Number(input.value));
                const operation = section.querySelector('[data-la-vector-operation]').value;
                const result = x.map((value, index) => operation === 'add' ? value + y[index] : value - y[index]);
                const symbol = operation === 'add' ? '+' : '-';
                vectorResult.innerHTML = mathHtml(`${vectorLatex(x)}${symbol}${vectorLatex(y)}=${vectorLatex(result)}`, true);
                say('Operasi dilakukan component-wise setelah dimension dan feature schema cocok.', 'success');
            };
            section.querySelectorAll('[data-la-x1], [data-la-x2], [data-la-y1], [data-la-y2], [data-la-vector-operation]').forEach(input => input.addEventListener('input', update));
            update();
        }

        const scalarInput = section.querySelector('[data-la-scalar]');
        if (scalarInput) {
            const update = () => {
                const scalar = numericValue(scalarInput);
                const sourceVector = String(scalarInput.dataset.vector || '0.8,0.75').split(',').map(Number);
                section.querySelector('[data-la-scalar-value]').textContent = scalar.toFixed(2);
                section.querySelector('[data-la-scalar-result]').innerHTML = `${mathHtml(`${scalar.toFixed(2)}${vectorLatex(sourceVector)}=${vectorLatex(sourceVector.map(value => scalar * value))}`, true)}<p>Values changed. Number of components tetap d = 2.</p>`;
                say('Scalar multiplication mengubah component values, bukan dimension vector.', 'success');
            };
            scalarInput.addEventListener('input', update);
            update();
        }

        const arrowResult = section.querySelector('[data-la-arrow-result]');
        if (arrowResult) {
            const update = () => {
                const u = [numericValue(section.querySelector('[data-la-arrow-u1]')), numericValue(section.querySelector('[data-la-arrow-u2]'))];
                const v = [numericValue(section.querySelector('[data-la-arrow-v1]')), numericValue(section.querySelector('[data-la-arrow-v2]'))];
                const result = [u[0] + v[0], u[1] + v[1]];
                const origin = [210, 150];
                const scale = 20;
                const first = [origin[0] + u[0] * scale, origin[1] - u[1] * scale];
                const end = [first[0] + v[0] * scale, first[1] - v[1] * scale];
                section.querySelector('[data-la-arrow-svg]').innerHTML = `<line class="axis" x1="20" y1="150" x2="400" y2="150"/><line class="axis" x1="210" y1="280" x2="210" y2="20"/><line class="vector is-fixed" x1="${origin[0]}" y1="${origin[1]}" x2="${first[0]}" y2="${first[1]}"/><line class="vector" x1="${first[0]}" y1="${first[1]}" x2="${end[0]}" y2="${end[1]}"/><line class="guide" x1="${origin[0]}" y1="${origin[1]}" x2="${end[0]}" y2="${end[1]}"/><text x="${first[0] + 6}" y="${first[1] - 6}">u</text><text x="${end[0] + 6}" y="${end[1] - 6}">u+v</text>`;
                arrowResult.innerHTML = mathHtml(`${vectorLatex(u)}+${vectorLatex(v)}=${vectorLatex(result)}`, true);
                say('Second arrow ditempatkan head-to-tail; resultant tetap component-wise sum.', 'success');
            };
            section.querySelectorAll('[data-la-arrow-u1], [data-la-arrow-u2], [data-la-arrow-v1], [data-la-arrow-v2]').forEach(input => input.addEventListener('input', update));
            update();
        }

        const normResult = section.querySelector('[data-la-norm-result]');
        if (normResult) {
            const update = () => {
                const x = numericValue(section.querySelector('[data-la-norm-x]'));
                const y = numericValue(section.querySelector('[data-la-norm-y]'));
                const norm = Math.hypot(x, y);
                normResult.innerHTML = `${mathHtml(`\\|\\mathbf{x}\\|_2=\\sqrt{(${x.toFixed(2)})^2+(${y.toFixed(2)})^2}=\\sqrt{${(x*x).toFixed(2)}+${(y*y).toFixed(2)}}=${norm.toFixed(3)}`, true)}<svg class="math-learning-la-geometry" viewBox="0 0 320 220" role="img" aria-label="Panjang vektor dari origin"><line class="axis" x1="20" y1="110" x2="300" y2="110"/><line class="axis" x1="160" y1="205" x2="160" y2="15"/><line class="vector" x1="160" y1="110" x2="${160 + x * 15}" y2="${110 - y * 15}"/></svg>`;
                say('Norm mengukur magnitude satu vector; ia bukan distance antara dua vector.', 'success');
            };
            section.querySelectorAll('[data-la-norm-x], [data-la-norm-y]').forEach(input => input.addEventListener('input', update));
            update();
        }

        const distanceResult = section.querySelector('[data-la-distance-result]');
        if (distanceResult) {
            const update = () => {
                const nameA = section.querySelector('[data-la-distance-a]')?.value || 'Alya';
                const nameB = section.querySelector('[data-la-distance-b]')?.value || 'Bima';
                const a = participants[nameA];
                const b = participants[nameB];
                const difference = a.map((value, index) => value - b[index]);
                const distance = Math.hypot(...difference);
                distanceResult.innerHTML = `<h4>${nameA} ↔ ${nameB}</h4>${mathHtml(`\\mathbf{x}-\\mathbf{y}=${vectorLatex(difference)}`, true)}${mathHtml(`d(\\mathbf{x},\\mathbf{y})=\\sqrt{(${difference[0].toFixed(3)})^2+(${difference[1].toFixed(3)})^2}=${distance.toFixed(3)}`, true)}`;
                say('Difference adalah vector; Euclidean distance adalah scalar nonnegative. Scale dan unit tetap memengaruhi hasil.', 'warning');
            };
            section.querySelectorAll('[data-la-distance-a], [data-la-distance-b]').forEach(input => input.addEventListener('change', update));
            update();
        }

        const dotResult = section.querySelector('[data-la-dot-result]');
        if (dotResult) {
            const update = () => {
                const fields = [...section.querySelectorAll('[data-la-dot-x1], [data-la-dot-x2], [data-la-dot-y1], [data-la-dot-y2]')];
                if (fields.some(input => input.value === '' || !Number.isFinite(Number(input.value)))) {
                    dotResult.className = 'math-learning-la-result is-invalid';
                    dotResult.textContent = 'Masukkan empat component values yang valid.';
                    return say('Dot product memerlukan pair component numerik.', 'error');
                }
                dotResult.className = 'math-learning-la-result';
                const x = fields.slice(0, 2).map(input => Number(input.value));
                const y = fields.slice(2).map(input => Number(input.value));
                const contributions = x.map((value, index) => value * y[index]);
                const total = contributions[0] + contributions[1];
                dotResult.innerHTML = `<div class="math-learning-contribution-row"><span>${x[0]} × ${y[0]} = <strong>${contributions[0].toFixed(3)}</strong></span><span>${x[1]} × ${y[1]} = <strong>${contributions[1].toFixed(3)}</strong></span></div>${mathHtml(`\\mathbf{x}^{\\top}\\mathbf{y}=${contributions[0].toFixed(3)}+${contributions[1].toFixed(3)}=${total.toFixed(3)}`, true)}`;
                say('Pair corresponding components, multiply, lalu sum. Output dot product adalah scalar.', 'success');
            };
            section.querySelectorAll('[data-la-dot-x1], [data-la-dot-x2], [data-la-dot-y1], [data-la-dot-y2]').forEach(input => input.addEventListener('input', update));
            update();
        }

        const weightResult = section.querySelector('[data-la-weight-result]');
        if (weightResult) {
            const qInput = section.querySelector('[data-la-weight-q]');
            const cInput = section.querySelector('[data-la-weight-c]');
            const update = event => {
                if (event?.target === qInput) cInput.value = (1 - numericValue(qInput)).toFixed(2);
                if (event?.target === cInput) qInput.value = (1 - numericValue(cInput)).toFixed(2);
                qInput.nextElementSibling.textContent = numericValue(qInput).toFixed(2);
                cInput.nextElementSibling.textContent = numericValue(cInput).toFixed(2);
                const score = 0.8 * numericValue(qInput) + 0.75 * numericValue(cInput);
                weightResult.innerHTML = mathHtml(`h(q,c)=${numericValue(qInput).toFixed(2)}(0.80)+${numericValue(cInput).toFixed(2)}(0.75)=${score.toFixed(3)}`, true);
                say('Weights mengubah contribution pada toy instructional score; bukan confidence atau probability.', 'warning');
            };
            [qInput, cInput].forEach(input => input.addEventListener('input', update));
            update();
        }

        const cosineResult = section.querySelector('[data-la-cosine-result]');
        if (cosineResult) {
            const angleInput = section.querySelector('[data-la-angle]');
            const magnitudeInput = section.querySelector('[data-la-magnitude]');
            const update = () => {
                const angle = numericValue(angleInput);
                const magnitude = numericValue(magnitudeInput);
                const cosine = Math.cos(angle * Math.PI / 180);
                const dot = magnitude * cosine;
                angleInput.nextElementSibling.textContent = `${angle.toFixed(0)}°`;
                magnitudeInput.nextElementSibling.textContent = magnitude.toFixed(1);
                const endX = 75 + Math.cos(angle * Math.PI / 180) * magnitude * 45;
                const endY = 190 - Math.sin(angle * Math.PI / 180) * magnitude * 45;
                section.querySelector('[data-la-cosine-svg]').innerHTML = `<line class="axis" x1="40" y1="190" x2="380" y2="190"/><line class="axis" x1="75" y1="225" x2="75" y2="28"/><line class="vector is-fixed" x1="75" y1="190" x2="255" y2="190"/><line class="vector" x1="75" y1="190" x2="${endX}" y2="${endY}"/><text x="258" y="180">x</text><text x="${endX + 8}" y="${endY - 8}">y</text>`;
                cosineResult.innerHTML = `${mathHtml(`\\mathbf{x}^{\\top}\\mathbf{y}=${dot.toFixed(3)}`, true)}${mathHtml(`\\operatorname{cos\\_sim}(\\mathbf{x},\\mathbf{y})=\\cos(${angle.toFixed(0)}^\\circ)=${cosine.toFixed(3)}`, true)}`;
                say('Magnitude mengubah raw dot product; cosine tetap ditentukan oleh direction selama norms nonzero.', 'warning');
            };
            [angleInput, magnitudeInput].forEach(input => input.addEventListener('input', update));
            update();
        }

        const needResult = section.querySelector('[data-la-need-result]');
        if (needResult) {
            const needs = { Alya:[0.20,0.25], Bima:[0.40,0.375], Citra:[0.10,0.00], Dewi:[0.30,0.50] };
            const supports = { A:[0.90,0.30], B:[0.35,0.90], C:[0.75,0.75] };
            const auditedCosines = {
                Alya:[0.8396,0.9542,0.9939], Bima:[0.9084,0.9019,0.9995],
                Citra:[0.9487,0.3624,0.7071], Dewi:[0.7593,0.9857,0.9701]
            };
            const update = () => {
                const name = section.querySelector('[data-la-need-participant]').value;
                const need = needs[name];
                const cosines = auditedCosines[name];
                const ranked = ['A','B','C'].map((material, index) => ({ material, value: cosines[index] })).sort((a,b) => b.value - a.value);
                needResult.innerHTML = `${mathHtml(`\\mathbf{n}_{\\text{${name}}}=${vectorLatex(need)}`, true)}<div class="math-learning-score-list">${ranked.map(item => `<span><strong>Materi ${item.material}</strong><output>${item.value.toFixed(4)}</output></span>`).join('')}</div><p>Support profiles: A ${JSON.stringify(supports.A)}, B ${JSON.stringify(supports.B)}, C ${JSON.stringify(supports.C)}. Highest directional alignment: <strong>Materi ${ranked[0].material}</strong>.</p>`;
                say('Ranking memakai audited cosine values pada shared quiz-need/completion-need axes.', 'warning');
            };
            section.querySelector('[data-la-need-participant]').addEventListener('change', update);
            update();
        }

        const matrixStage = section.querySelector('[data-la-matrix-stage]');
        if (matrixStage) {
            const values = [[0.80,0.75],[0.60,0.625],[0.90,1.00],[0.70,0.50]];
            const render = mode => {
                matrixStage.innerHTML = `<div class="math-learning-matrix-grid" role="grid" aria-label="HerAI feature matrix">${values.flatMap((row, rowIndex) => row.map((value, columnIndex) => `<button type="button" role="gridcell" class="${mode === 'row' && rowIndex === 1 ? 'is-highlighted' : ''}${mode === 'column' && columnIndex === 0 ? 'is-highlighted' : ''}${mode === 'entry' && rowIndex === 2 && columnIndex === 1 ? 'is-highlighted' : ''}" data-row="${rowIndex + 1}" data-column="${columnIndex + 1}">${value.toFixed(columnIndex ? 3 : 2)}</button>`)).join('')}</div><p>${mode === 'row' ? 'Row 2 = observation Bima.' : mode === 'column' ? 'Column 1 = quiz ratio q untuk semua observations.' : 'Entry X₃₂ = completion ratio Citra = 1.00.'}</p>`;
                matrixStage.querySelectorAll('button').forEach(button => button.addEventListener('click', () => say(`Entry X${button.dataset.row}${button.dataset.column} dipilih. Row adalah observation; column adalah feature.`, 'success')));
            };
            section.querySelectorAll('[data-la-matrix-mode]').forEach(button => button.addEventListener('click', () => {
                section.querySelectorAll('[data-la-matrix-mode]').forEach(item => item.classList.toggle('is-selected', item === button));
                render(button.dataset.laMatrixMode);
            }));
            render('row');
        }

        const transposeButton = section.querySelector('[data-la-transpose]');
        if (transposeButton) {
            let transposed = false;
            const render = () => {
                section.querySelector('[data-la-transpose-stage]').innerHTML = transposed
                    ? mathHtml('\\mathbf{A}^{\\top}=\\begin{bmatrix}1&4\\\\2&5\\\\3&6\\end{bmatrix}\\in\\mathbb{R}^{3\\times2}', true)
                    : mathHtml('\\mathbf{A}=\\begin{bmatrix}1&2&3\\\\4&5&6\\end{bmatrix}\\in\\mathbb{R}^{2\\times3}', true);
                transposeButton.textContent = transposed ? 'Kembalikan orientation' : 'Transpose matrix';
            };
            transposeButton.addEventListener('click', () => { transposed = !transposed; render(); say('Transpose menukar row dan column serta shape; ia tidak memperbaiki semantic mismatch.', 'warning'); });
            render();
        }

        const datasetShape = section.querySelector('[data-la-dataset-shape]');
        if (datasetShape) {
            const update = () => {
                const rowInput = section.querySelector('[data-la-dataset-rows]');
                const columnInput = section.querySelector('[data-la-dataset-columns]');
                const rows = Math.round(numericValue(rowInput));
                const columns = Math.round(numericValue(columnInput));
                rowInput.nextElementSibling.textContent = String(rows);
                columnInput.nextElementSibling.textContent = String(columns);
                datasetShape.innerHTML = `<div class="math-learning-shape-grid" style="--shape-columns:${columns}" aria-label="${rows} rows dan ${columns} columns">${Array.from({length: rows * columns}, (_, index) => `<span>${index + 1}</span>`).join('')}</div>${mathHtml(`\\mathbf{X}\\in\\mathbb{R}^{${rows}\\times${columns}}`, true)}<p>${rows} rows · ${columns} columns · ${rows * columns} total entries.</p>`;
                say('Rows menghitung observations; columns menghitung features.', 'success');
            };
            section.querySelectorAll('[data-la-dataset-rows], [data-la-dataset-columns]').forEach(input => input.addEventListener('input', update));
            update();
        }

        const shapeResult = section.querySelector('[data-la-shape-result]');
        if (shapeResult) {
            const update = () => {
                const inputs = [...section.querySelectorAll('[data-la-shape]')];
                if (inputs.some(input => input.value === '' || !Number.isInteger(Number(input.value)) || Number(input.value) < 1 || Number(input.value) > 6)) {
                    shapeResult.className = 'math-learning-la-result is-invalid';
                    shapeResult.textContent = 'Gunakan integer 1–6 untuk setiap matrix dimension.';
                    return say('Matrix shape harus berupa positive integer pada rentang kontrol.', 'error');
                }
                const values = Object.fromEntries(inputs.map(input => [input.dataset.laShape, Number(input.value)]));
                const valid = values.n === values.r;
                shapeResult.className = `math-learning-la-result ${valid ? 'is-valid' : 'is-invalid'}`;
                shapeResult.innerHTML = valid
                    ? `${mathHtml(`(${values.m}\\times${values.n})(${values.r}\\times${values.p})\\to(${values.m}\\times${values.p})`, true)}<strong>Inner dimensions match.</strong>`
                    : `${mathHtml(`(${values.m}\\times${values.n})(${values.r}\\times${values.p})`, true)}<strong>Cannot multiply: columns of A must equal rows of B.</strong>`;
                say(valid ? 'Product structurally valid; semantic compatibility still needs review.' : 'Inner dimensions do not match, so the product is undefined.', valid ? 'success' : 'error');
            };
            section.querySelectorAll('[data-la-shape]').forEach(input => input.addEventListener('input', update));
            update();
        }

        const batchResult = section.querySelector('[data-la-batch-result]');
        if (batchResult) {
            const input = section.querySelector('[data-la-batch-weight]');
            const update = () => {
                const quizWeight = numericValue(input);
                const completionWeight = 1 - quizWeight;
                input.nextElementSibling.textContent = quizWeight.toFixed(2);
                const rows = Object.entries(participants).map(([name, values]) => [name, quizWeight * values[0] + completionWeight * values[1]]);
                batchResult.innerHTML = `<div class="math-learning-score-list">${rows.map(([name, score]) => `<span><strong>${name}</strong><output>${score.toFixed(3)}</output></span>`).join('')}</div>${mathHtml(`\\boldsymbol{\\theta}=\\begin{bmatrix}${quizWeight.toFixed(2)}\\\\${completionWeight.toFixed(2)}\\end{bmatrix}`, true)}`;
                say('Satu weight vector memproses empat observation rows secara konsisten.', 'warning');
            };
            input.addEventListener('input', update);
            update();
        }

        const materialMatrix = section.querySelector('[data-la-material-matrix]');
        if (materialMatrix) {
            const needs = [[0.20,0.25],[0.40,0.375],[0.10,0.00],[0.30,0.50]];
            const supports = [[0.90,0.20],[0.20,0.90],[0.70,0.70]];
            const scores = [[0.2300,0.2650,0.3150],[0.4350,0.4175,0.5425],[0.0900,0.0200,0.0700],[0.3700,0.5100,0.5600]];
            materialMatrix.innerHTML = `<div class="math-learning-score-matrix" role="grid" aria-label="Raw participant need by material support dot score matrix">${scores.flatMap((row, rowIndex) => row.map((value, columnIndex) => `<button type="button" role="gridcell" data-score-row="${rowIndex}" data-score-column="${columnIndex}" aria-label="Pilih row ${rowIndex + 1}, column ${columnIndex + 1}">${value.toFixed(4)}</button>`)).join('')}</div>`;
            materialMatrix.querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
                const names = Object.keys(participants);
                const materials = ['A','B','C'];
                const rowIndex = Number(button.dataset.scoreRow);
                const columnIndex = Number(button.dataset.scoreColumn);
                const need = needs[rowIndex];
                const support = supports[columnIndex];
                const score = scores[rowIndex][columnIndex];
                section.querySelector('[data-la-material-result]').innerHTML = `<strong>${names[rowIndex]} × Material ${materials[columnIndex]}</strong>${mathHtml(`${need[0].toFixed(2)}(${support[0].toFixed(2)})+${need[1].toFixed(3)}(${support[1].toFixed(2)})=${score.toFixed(4)}`, true)}<p>Cell ini adalah raw dot-product alignment score, bukan cosine similarity, probability, atau causal suitability.</p>`;
                materialMatrix.querySelectorAll('button').forEach(item => item.classList.toggle('is-highlighted', item === button));
                say('Selected cell diuraikan sebagai participant row × material column.', 'warning');
            }));
        }
    }

    function bindGraphInteractive(section, key, say) {
        if (key === 'coordinate-plane-basics') {
            const svg=section.querySelector('svg'),point=section.querySelector('[data-drag-point]'),gx=section.querySelector('[data-guide-x]'),gy=section.querySelector('[data-guide-y]'),output=section.querySelector('[data-coordinate-output]');
            const update=(clientX,clientY)=>{const rect=svg.getBoundingClientRect(),x=Math.max(30,Math.min(390,(clientX-rect.left)*420/rect.width)),y=Math.max(20,Math.min(280,(clientY-rect.top)*300/rect.height)),cx=(x-210)/36,cy=(150-y)/26;point.setAttribute('cx',x);point.setAttribute('cy',y);gx.setAttribute('x1',210);gx.setAttribute('y1',y);gx.setAttribute('x2',x);gx.setAttribute('y2',y);gy.setAttribute('x1',x);gy.setAttribute('y1',150);gy.setAttribute('x2',x);gy.setAttribute('y2',y);output.textContent=`(${cx.toFixed(1)}, ${cy.toFixed(1)})`;say('Horizontal guide membaca x; vertical guide membaca y.', 'success');};
            point.addEventListener('pointerdown',event=>{point.setPointerCapture(event.pointerId);update(event.clientX,event.clientY);});point.addEventListener('pointermove',event=>{if(point.hasPointerCapture(event.pointerId))update(event.clientX,event.clientY);});
        }
        if (key === 'table-points-graph') {
            const svg=section.querySelector('[data-graph-reveal]'),points=[[0,.2],[.2,.3],[.4,.4],[.6,.5],[.8,.6]];let count=0;const draw=()=>{const visible=points.slice(0,count);svg.innerHTML='<line class="axis" x1="35" y1="240" x2="390" y2="240"/><line class="axis" x1="35" y1="20" x2="35" y2="240"/>'+visible.map(([x,y])=>`<circle class="plot-point" cx="${45+x*400}" cy="${250-y*350}" r="7"/>`).join('')+(count===points.length?`<polyline class="plot-line" points="${points.map(([x,y])=>`${45+x*400},${250-y*350}`).join(' ')}"/>`:'');};draw();section.querySelector('[data-graph-next]').addEventListener('click',event=>{count=Math.min(points.length,count+1);draw();if(count===points.length){event.currentTarget.disabled=true;say('Semua ordered pairs sudah menjadi points dan membentuk graph function.', 'success');}});
        }
        if (key === 'hold-completion-fixed') {
            const input=section.querySelector('[data-hold-q]'),svg=section.querySelector('[data-hold-graph]'),output=section.querySelector('[data-hold-output]');const update=()=>{const q=Number(input.value),score=.6*q+.3;svg.innerHTML='<line class="axis" x1="35" y1="215" x2="390" y2="215"/><line class="axis" x1="35" y1="20" x2="35" y2="215"/><line class="plot-line" x1="35" y1="155" x2="390" y2="35"/><circle class="plot-point" cx="'+(35+q*355)+'" cy="'+(215-score*180)+'" r="8"/>';output.innerHTML=mathHtml(`h(${q.toFixed(2)},0.75)=0.6(${q.toFixed(2)})+0.30=${score.toFixed(3)}`,true);say('Completion tetap 0.75; hanya q dan output toy formula yang bergerak.', 'warning');};input.addEventListener('input',update);update();
        }
    }

    async function renderQuiz(markdown, container, submodule) {
        let externalKey = {};
        if (submodule && (submodule.id === '04' || submodule.id === '05' || submodule.id === '07')) {
            try {
                const res = await fetch(submodule.sourceBase + 'kunci-jawaban-rubrik.md', { cache: 'no-store' });
                if (res.ok) {
                    const text = await res.text();
                    const matches = [...text.matchAll(/^\|\s*(\d+)\s*\|(?:\s*[^\|]+\s*\|)?\s*([A-D])\s*\|/gm)];
                    for (const m of matches) externalKey[m[1]] = m[2];
                }
            } catch(e) {}
        }
        const chunks = String(markdown).split(/^#{1,2}\s+(?:Soal\s+|Q)?(\d+)[^\n]*\n/gm);
        const questions = [];
        for (let i=1;i<chunks.length;i+=2) {
            const number=Number(chunks[i]),body=chunks[i+1].split(/^---\s*$/m)[0];
            const answer=externalKey[number] || (body.match(/\*\*(?:Jawaban benar|Correct answer|Jawaban):\*\*\s*([A-D])/)||[])[1];
            const optionMatches=[...body.matchAll(/^([A-D])\.\s+(.+?)(?=\s{2}$|$)/gm)];
            const firstOption=optionMatches[0]?.index ?? body.length;
            const prompt=body.slice(0,firstOption).trim();
            const rationaleStart=body.search(/^\*\*(?:Jawaban benar|Correct answer|Jawaban|Mengapa|Rationale|Perhitungan|A salah|A benar)/m);
            const rationale=rationaleStart>=0?body.slice(rationaleStart):'';
            questions.push({number,prompt,options:optionMatches.map(match=>({letter:match[1],text:match[2].trim()})),answer,rationale});
        }
        const intro = removeAndShiftTitle(chunks[0]);
        if (!questions.length || questions.some(question => !question.answer || question.options.length !== 4)) {
            throw new Error('Source kuis tidak memiliki question, empat opsi, atau canonical answer key yang lengkap.');
        }
        container.innerHTML=`<div class="math-learning-quiz-intro">${renderMarkdown(intro,[])}</div><p class="math-learning-preview-note"><strong>Penyimpanan hasil:</strong> hasil pemeriksaan pada halaman ini belum tersinkron ke akun peserta.</p><form class="math-learning-quiz-list" data-quiz-form>${questions.map(question=>`<fieldset class="math-learning-quiz-card" data-quiz-question="${question.number}" tabindex="-1" aria-labelledby="mathQuizQuestion${question.number}"><legend class="math-learning-visually-hidden">Soal ${question.number}</legend><div class="math-learning-quiz-prompt" id="mathQuizQuestion${question.number}"><span class="math-learning-quiz-number" aria-hidden="true">${String(question.number).padStart(2,'0')}</span><div class="math-learning-quiz-question-copy">${renderMarkdown(removeAndShiftTitle(question.prompt),[])}</div></div><div class="math-learning-quiz-options">${question.options.map(option=>`<label class="math-learning-quiz-option"><input type="radio" name="quiz-${question.number}" value="${option.letter}"><span class="math-learning-quiz-letter" aria-hidden="true">${option.letter}</span><span class="math-learning-quiz-option-copy">${renderMarkdown(option.text,[])}</span></label>`).join('')}</div><div data-quiz-review aria-live="polite"></div></fieldset>`).join('')}<div class="math-learning-button-row math-learning-quiz-actions"><button class="math-learning-action is-primary" type="submit">Periksa jawaban</button><button class="math-learning-action" type="reset">Ulangi kuis</button></div></form>`;
        const form=container.querySelector('[data-quiz-form]');
        form.addEventListener('submit', async event => {
            event.preventDefault();
            const unanswered=questions.find(question=>!form.querySelector(`input[name="quiz-${question.number}"]:checked`));
            if(unanswered){
                const fieldset=form.querySelector(`[data-quiz-question="${unanswered.number}"]`);
                fieldset?.focus({preventScroll:true});
                fieldset?.scrollIntoView({behavior:'smooth',block:'center'});
                window.__aiLabToast?.(`Jawab seluruh ${questions.length} soal sebelum final review.`, 'error');
                return;
            }
            let correct=0;
            questions.forEach(question=>{
                const fieldset=form.querySelector(`[data-quiz-question="${question.number}"]`);
                const selected=fieldset.querySelector('input:checked');
                const isCorrect=selected.value===question.answer;
                if(isCorrect)correct+=1;
                fieldset.querySelectorAll('.math-learning-quiz-option').forEach(label=>{
                    const input=label.querySelector('input');
                    label.classList.toggle('is-correct',input.value===question.answer);
                    label.classList.toggle('is-incorrect',input.checked&&!isCorrect);
                    input.disabled=true;
                });
                const review=fieldset.querySelector('[data-quiz-review]');
                review.className=`math-learning-quiz-review ${isCorrect?'is-correct':'is-incorrect'}`;
                review.innerHTML=`<strong><i class="fas ${isCorrect?'fa-circle-check':'fa-circle-info'}" aria-hidden="true"></i>${isCorrect?'Benar':'Jawaban terbaik: '+question.answer}</strong>${renderMarkdown(removeAndShiftTitle(question.rationale),[])}`;
            });
            form.classList.add('is-reviewed');
            const submit=form.querySelector('button[type="submit"]');
            submit.textContent='Menyimpan...';
            submit.disabled=true;
            
            const scorePercent = Math.round(correct/questions.length*100);
            if (window.saveChapterProgress) {
                await window.saveChapterProgress('math-for-ai', `quiz-${submodule.id}`, 'completed', scorePercent);
                if (submodule.id === '07' && window.getParticipantProgress) {
                    const progResult = await window.getParticipantProgress('math-for-ai');
                    if (progResult.status === 'success' && Array.isArray(progResult.data)) {
                        let totalScore = scorePercent;
                        for (let i = 1; i <= 6; i++) {
                            const row = progResult.data.find(r => String(r.chapter_id) === `quiz-0${i}`);
                            if (row && row.score !== undefined && row.score !== null) {
                                totalScore += Number(row.score);
                            }
                        }
                        const averageScore = Math.round(totalScore / 7);
                        await window.saveChapterProgress('math-for-ai', 'quiz', 'completed', averageScore);
                    }
                }
            }
            
            window.__aiLabToast?.(`Skor kuis: ${correct}/${questions.length} (${scorePercent}%). Tersimpan ke akun.`, scorePercent>=75?'success':'info');
            submit.textContent=`Skor ${correct}/${questions.length}`;
        });
        form.addEventListener('reset',()=>setTimeout(()=>{
            form.classList.remove('is-reviewed');
            container.querySelectorAll('.math-learning-quiz-option').forEach(label=>label.classList.remove('is-correct','is-incorrect'));
            container.querySelectorAll('.math-learning-quiz-option input').forEach(input=>{input.disabled=false;});
            container.querySelectorAll('[data-quiz-review]').forEach(node=>{node.className='';node.innerHTML='';});
            const submit=form.querySelector('button[type="submit"]');
            submit.textContent='Periksa jawaban';
            submit.disabled=false;
        },0));
    }

    function buildTabs(submodule, active) {
        const items = submodule.items;
        const tabs = [
            { label: 'Materi', icon: 'fas fa-book-open', route: items[0].route, types: ['info', 'topic'] },
            { label: 'Latihan', icon: 'fas fa-pen-to-square', route: items.find(item => item.type === 'practice').route, types: ['practice'] },
            { label: 'Kuis', icon: 'far fa-clipboard', route: items.find(item => item.type === 'quiz').route, types: ['quiz'] },
            { label: 'Diskusi', icon: 'far fa-message', route: items.find(item => item.type === 'discussion').route, types: ['discussion'] }
            // { label: 'Referensi', icon: 'fas fa-book-bookmark', route: items.find(item => item.type === 'references').route, types: ['references'] }
        ];
        return `<div class="lesson-tabs" role="navigation" aria-label="Jenis materi Submodul ${submodule.id}">${tabs.map(tab => `<a href="${tab.route}" class="${tab.types.includes(active.type) ? 'active' : ''}" ${tab.types.includes(active.type) ? 'aria-current="page"' : ''}><i class="${tab.icon}" aria-hidden="true"></i>${tab.label}</a>`).join('')}</div>`;
    }

    function buildLessonList(submodule, active, state) {
        const materials = submodule.items.filter(item => item.type === 'info' || item.type === 'topic');
        return `<ol>${materials.map((item, index) => {
            const current = item.id === active.id;
            const complete = state.completed.includes(item.id);
            const icon = current ? 'far fa-circle-play' : (complete ? 'fas fa-circle-check' : 'far fa-circle');
            return `<li class="${current ? 'active' : ''} ${complete && !current ? 'completed' : ''}"><span>${String(index).padStart(2, '0')}</span><a href="${item.route}" ${current ? 'aria-current="page"' : ''}>${escapeHtml(item.short)}</a><i class="${icon}" aria-hidden="true"></i></li>`;
        }).join('')}</ol>`;
    }

    function buildRightPanel(submodule, active, state, progress) {
        const complete = state.completed.includes(active.id);
        return `<section class="module-side-card lesson-progress-card">
            <h2>Progres Submodul</h2>
            <div class="lesson-progress-mini"><b style="--value:${progress}%" data-math-progress-bar></b><strong data-math-progress-text>${progress}%</strong></div>
            <p>Progres otomatis tersimpan dan tersinkron ke akun peserta.</p>
            <button type="button" class="math-learning-complete-button ${complete ? 'is-complete' : ''}" data-mark-complete><i class="fas ${complete ? 'fa-circle-check' : 'fa-check'}" aria-hidden="true"></i>${complete ? 'Selesai' : 'Tandai selesai'}</button>
        </section>
        <section class="module-side-card lesson-list-card"><h2>Daftar Materi</h2>${buildLessonList(submodule, active, state)}</section>`;
    }

    function footerNav(submodule, item) {
        const index = submodule.items.findIndex(entry => entry.id === item.id);
        const prev = submodule.items[index - 1];
        const next = submodule.items[index + 1];
        return `<footer class="lesson-nav-footer">${prev ? `<a href="${prev.route}"><i class="fas fa-chevron-left" aria-hidden="true"></i>${escapeHtml(prev.short)}</a>` : '<span></span>'}${next ? `<a class="math-learning-next-link" href="${next.route}">${escapeHtml(next.short)}<i class="fas fa-arrow-right" aria-hidden="true"></i></a>` : '<span></span>'}</footer>`;
    }

    function bindShell(submodule, item) {
        const page = document.querySelector('.math-learning-page');
        
        // Manual mark complete button
        page?.querySelector('[data-mark-complete]')?.addEventListener('click', async event => {
            const button = event.currentTarget;
            button.disabled = true;
            button.innerHTML = '<i class="fas fa-circle-notch fa-spin" aria-hidden="true"></i>Menyimpan...';
            
            const state = await markComplete(submodule, item.id);
            
            button.classList.add('is-complete');
            button.innerHTML = '<i class="fas fa-circle-check" aria-hidden="true"></i>Selesai';
            button.disabled = false;
            
            const percent = Math.round(state.completed.length / submodule.items.length * 100);
            const percentText = page.querySelector('[data-math-progress-text]');
            const percentBar = page.querySelector('[data-math-progress-bar]');
            if (percentText) percentText.textContent = `${percent}%`;
            if (percentBar) percentBar.style.setProperty('--value', `${percent}%`);
            const itemRow = page.querySelector(`.lesson-list-card a[href="${item.route}"]`)?.closest('li');
            itemRow?.classList.add('completed');
            window.__aiLabToast?.('Status tersimpan dan tersinkron ke akun peserta.', 'success');
        }, { once: true, signal: pageAbort.signal });

        // Auto-complete when clicking "Next Topic"
        page?.querySelector('.math-learning-next-link')?.addEventListener('click', () => {
            const state = readState(submodule);
            if (!state.completed.includes(item.id)) {
                // Background execution. No await needed because localStorage writes synchronously.
                markComplete(submodule, item.id).catch(console.error);
            }
        });
    }

    function renderError(root, message) {
        root.innerHTML=`<section class="math-learning-error" role="alert"><i class="fas fa-triangle-exclamation" aria-hidden="true"></i><h1>Materi belum bisa dimuat</h1><p>${escapeHtml(message)}</p><button type="button" data-math-retry>Coba lagi</button></section>`;
        root.querySelector('[data-math-retry]').addEventListener('click',()=>window.initMathLearningRoute());
    }

    async function renderCurrentRoute() {
        const sequence = ++renderSequence;
        const context = getCurrentContext();
        const root = document.getElementById('mathLearningRoot');
        if (!root) return;
        if (!context) {
            renderError(root, 'Route Math tidak terdaftar. Kembali ke overview dan pilih materi yang tersedia.');
            return;
        }
        const { submodule, item } = context;
        root.dataset.mathContentType = item.type;
        document.querySelector('.math-learning-page')?.setAttribute('data-math-submodule', submodule.slug);
        document.querySelector('[data-math-submodule-label]')?.replaceChildren(document.createTextNode(`Submodul ${submodule.id}`));
        if (pageAbort) pageAbort.abort();
        pageAbort = new AbortController();
        root.innerHTML = '<div class="math-learning-loading" role="status"><i class="fas fa-circle-notch fa-spin" aria-hidden="true"></i><strong>Menyiapkan materi…</strong><span>Markdown dan formula matematika sedang dirender.</span></div>';
        try {
            await Promise.all([ensureRuntime(), syncServerProgress()]);
            const response = await fetch(submodule.sourceBase + encodeURIComponent(item.file), { cache: 'no-store', signal: pageAbort.signal });
            if (!response.ok) throw new Error(`Source ${item.file} mengembalikan HTTP ${response.status}.`);
            const source = await response.text();
            if (sequence !== renderSequence) return;
            const title = extractTitle(source, item.title);
            const meta = extractMeta(source);
            const lead = extractLead(source, item.title);
            const learnerSource = stripLeadingAuthoringMetadata(source);
            const extracted = extractInteractiveSpecs(learnerSource);
            const diagnostic = extractDiagnostic(extracted.markdown);
            const bodySource = removeAndShiftTitle(diagnostic.markdown);
            const state = readState(submodule);
            const progress = Math.round(state.completed.length / submodule.items.length * 100);
            document.querySelector('[data-math-learning-breadcrumb]')?.replaceChildren(document.createTextNode(item.short));
            const topicPosition = item.type === 'topic' ? `Topik ${Number(item.id.slice(-2))} dari ${submodule.topicCount}` : item.short;
            root.innerHTML = `<div class="lesson-layout math-learning-layout"><div class="lesson-main-content"><section class="lesson-hero compact math-learning-lesson-hero"><div class="lesson-hero-copy"><span class="math-learning-kicker"><i class="fas ${item.icon}" aria-hidden="true"></i>Foundation &amp; Core AI · Math for AI · Submodul ${submodule.id}</span><h1>${escapeHtml(title)}</h1><p>${escapeHtml(lead)}</p><div class="lesson-meta-row"><span><i class="far fa-clock" aria-hidden="true"></i>${escapeHtml(meta['estimasi belajar'] || 'Belajar sesuai ritme')}</span><span><i class="fas fa-book-open" aria-hidden="true"></i>${escapeHtml(topicPosition)}</span><b>${escapeHtml(meta.level || 'Beginner')}</b></div></div><img src="/assets/messaging/herai-chat-persona.png" alt="HerAI fellow belajar Math for AI"></section><section class="lesson-material-panel math-learning-material-panel">${buildTabs(submodule, item)}<article class="lesson-article math-learning-article" id="mathLearningContent" tabindex="-1">${buildLearnerContext(meta)}<div class="math-learning-markdown" data-markdown-content></div></article>${footerNav(submodule, item)}</section></div><aside class="lesson-right-panel">${buildRightPanel(submodule, item, state, progress)}</aside></div>`;
            const content = root.querySelector('[data-markdown-content]');
            if (item.type === 'quiz') {
                await renderQuiz(learnerSource, content, submodule);
                enhanceMarkdown(content, []);
            } else {
                content.innerHTML = renderMarkdown(bodySource, extracted.specs);
                enhanceMarkdown(content, extracted.specs);
                mountDiagnostic(content, diagnostic.data);
            }
            bindShell(submodule, item);
            root.querySelector('#mathLearningContent')?.focus({preventScroll:true});
        } catch (error) {
            if (error.name === 'AbortError') return;
            console.error('[Math Learning] Render failed:', error);
            renderError(root, error.message || 'Terjadi kesalahan yang tidak diketahui.');
        }
    }

    window.HerAiMathLearning=Object.freeze({submodules:SUBMODULES,content:CONTENT,renderCurrentRoute,renderOverviewProgress,version:RUNTIME_VERSION});
    window.initMathOverviewRoute=renderOverviewProgress;
    window.initMathLearningRoute=renderCurrentRoute;
})();
