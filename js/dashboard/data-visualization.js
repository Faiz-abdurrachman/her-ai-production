/* ==========================================================================
   Admin Data Visualization - HerAI Fellowship
   ========================================================================== */

const DATA_VIZ_API = '/__gas';
let dataVizState = {
    participants: [],
    competencySessions: [],
    retestSessions: [],
    loadedAt: null
};

const DATA_VIZ_PROVINCES = {
    11: 'Aceh', 12: 'Sumatera Utara', 13: 'Sumatera Barat', 14: 'Riau',
    15: 'Jambi', 16: 'Sumatera Selatan', 17: 'Bengkulu', 18: 'Lampung',
    19: 'Bangka Belitung', 21: 'Kepulauan Riau', 31: 'DKI Jakarta',
    32: 'Jawa Barat', 33: 'Jawa Tengah', 34: 'DI Yogyakarta',
    35: 'Jawa Timur', 36: 'Banten', 51: 'Bali',
    52: 'Nusa Tenggara Barat', 53: 'Nusa Tenggara Timur',
    61: 'Kalimantan Barat', 62: 'Kalimantan Tengah',
    63: 'Kalimantan Selatan', 64: 'Kalimantan Timur',
    65: 'Kalimantan Utara', 71: 'Sulawesi Utara',
    72: 'Sulawesi Tengah', 73: 'Sulawesi Selatan',
    74: 'Sulawesi Tenggara', 75: 'Gorontalo', 76: 'Sulawesi Barat',
    81: 'Maluku', 82: 'Maluku Utara', 91: 'Papua Barat',
    92: 'Papua Barat Daya', 93: 'Papua Selatan', 94: 'Papua',
    95: 'Papua Tengah', 96: 'Papua Pegunungan'
};

const DATA_VIZ_MAP_POINTS = {
    'Aceh': [8, 29], 'Sumatera Utara': [14, 37], 'Sumatera Barat': [18, 48], 'Riau': [23, 43],
    'Jambi': [25, 55], 'Sumatera Selatan': [29, 64], 'Bengkulu': [23, 66], 'Lampung': [33, 75],
    'Bangka Belitung': [37, 57], 'Kepulauan Riau': [34, 42], 'DKI Jakarta': [43, 79],
    'Jawa Barat': [45, 82], 'Jawa Tengah': [52, 82], 'DI Yogyakarta': [54, 86], 'Jawa Timur': [61, 83],
    'Banten': [40, 80], 'Bali': [68, 85], 'Nusa Tenggara Barat': [73, 86], 'Nusa Tenggara Timur': [82, 87],
    'Kalimantan Barat': [44, 45], 'Kalimantan Tengah': [51, 53], 'Kalimantan Selatan': [57, 64],
    'Kalimantan Timur': [60, 47], 'Kalimantan Utara': [58, 34], 'Sulawesi Utara': [75, 39],
    'Sulawesi Tengah': [70, 52], 'Sulawesi Selatan': [70, 68], 'Sulawesi Tenggara': [77, 66],
    'Gorontalo': [74, 45], 'Sulawesi Barat': [67, 62], 'Maluku': [85, 58], 'Maluku Utara': [84, 45],
    'Papua Barat': [92, 58], 'Papua Barat Daya': [89, 55], 'Papua Selatan': [96, 76],
    'Papua': [97, 63], 'Papua Tengah': [94, 67], 'Papua Pegunungan': [98, 70]
};

window.initDataVisualization = async function() {
    if (typeof window.loadSidebar === 'function') await window.loadSidebar();
    if (typeof window.checkAdminAccess === 'function' && !window.checkAdminAccess()) return;
    if (typeof window.updateAdminProfile === 'function') window.updateAdminProfile();
    if (typeof window.logAdminActivity === 'function') window.logAdminActivity('Membuka Visualisasi Data');

    document.getElementById('btnRefreshDataViz')?.addEventListener('click', loadDataVisualization);
    document.getElementById('dataVizScoreSource')?.addEventListener('change', renderDataVisualization);
    await loadDataVisualization();
};

async function loadDataVisualization() {
    const button = document.getElementById('btnRefreshDataViz');
    const original = button?.innerHTML || '';
    if (button) {
        button.disabled = true;
        button.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Memuat...';
    }
    setDataVizLoading();
    try {
        const [participantsResult, competencyResult, retestResult] = await Promise.all([
            postDataViz({ action: 'getData' }),
            postDataViz({ action: 'getCompetencySessions' }),
            postDataViz({ action: 'getReTestSessions' })
        ]);
        dataVizState = {
            participants: participantsResult.data || [],
            competencySessions: competencyResult.sessions || [],
            retestSessions: retestResult.sessions || [],
            loadedAt: new Date()
        };
        renderDataVisualization();
    } catch (error) {
        const summary = document.getElementById('dataVizSummary');
        if (summary) {
            summary.innerHTML = `<div class="data-viz-loading glass-panel data-viz-error"><i class="fas fa-triangle-exclamation"></i> ${escapeDataVizHtml(error.message || 'Gagal memuat data visualisasi.')}</div>`;
        }
    } finally {
        if (button) {
            button.disabled = false;
            button.innerHTML = original;
        }
    }
}

async function postDataViz(payload) {
    if (typeof window.heraiPostJson === 'function') {
        const result = await window.heraiPostJson(payload);
        if (result.status !== 'success') throw new Error(result.message || 'Permintaan data ditolak.');
        return result;
    }
    const response = await fetch(DATA_VIZ_API, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error('Server database tidak merespons.');
    const result = await response.json();
    if (result.status !== 'success') throw new Error(result.message || 'Permintaan data ditolak.');
    return result;
}

function setDataVizLoading() {
    const summary = document.getElementById('dataVizSummary');
    if (summary && !dataVizState.loadedAt) {
        summary.innerHTML = '<div class="data-viz-loading glass-panel"><i class="fas fa-circle-notch fa-spin"></i> Memuat data visualisasi...</div>';
    }
}

function renderDataVisualization() {
    const participants = dataVizState.participants || [];
    const competency = dataVizState.competencySessions || [];
    const retest = dataVizState.retestSessions || [];
    const scores = getDataVizScores();
    const submittedScores = scores.filter(item => Number.isFinite(item.raw) || Number.isFinite(item.weighted));
    const avgRaw = average(submittedScores.map(item => item.raw));
    const avgWeighted = average(submittedScores.map(item => item.weighted));
    const provinces = countBy(participants, getProvinceFromParticipant);
    const institutions = countBy(participants, getInstitutionName);

    renderDataVizSummary([
        { label: 'Total Pendaftar', value: participants.length, icon: 'fa-users' },
        { label: 'Kampus / Instansi', value: Object.keys(institutions).filter(Boolean).length, icon: 'fa-building-columns' },
        { label: 'Provinsi Terdeteksi', value: Object.keys(provinces).filter(Boolean).length, icon: 'fa-map' },
        { label: 'Rata-rata Raw', value: formatScore(avgRaw), icon: 'fa-chart-line' },
        { label: 'Rata-rata Bobot', value: formatScore(avgWeighted), icon: 'fa-weight-scale' },
        { label: 'Sesi Submitted', value: submittedScores.length, icon: 'fa-check-double' }
    ]);

    renderScatterChart('scoreScatterChart', submittedScores, 'Raw', 'Bobot');
    renderBars('scoreDistributionChart', buildScoreBuckets(submittedScores), { compact: true });
    renderRankList('institutionChart', toRankItems(institutions).slice(0, 10));
    renderRankList('provinceChart', toRankItems(provinces).slice(0, 10));
    renderProvinceHeatmap('provinceHeatmap', provinces);
    renderInsightGrid(buildInsightVisuals(participants, competency, retest, scores));
}

function renderDataVizSummary(items) {
    const summary = document.getElementById('dataVizSummary');
    if (!summary) return;
    summary.innerHTML = items.map(item => `
        <article class="data-viz-summary-card glass-panel">
            <span><i class="fas ${item.icon}"></i>${escapeDataVizHtml(item.label)}</span>
            <strong>${escapeDataVizHtml(item.value)}</strong>
        </article>
    `).join('');
}

function buildInsightVisuals(participants, competency, retest, scores) {
    const submittedCompetency = competency.filter(row => row.status === 'submitted');
    const submittedRetest = retest.filter(row => row.status === 'submitted');
    const sectionAverages = getSectionAverages([...submittedCompetency, ...submittedRetest]);
    return [
        { title: 'Funnel Seleksi Tahap 1', eyebrow: 'Decision', icon: 'fa-filter', type: 'bars', data: toRankItems(countBy(participants, row => normalizeDecision(row.status_seleksi))).slice(0, 6) },
        { title: 'Stage Peserta', eyebrow: 'Lifecycle', icon: 'fa-diagram-project', type: 'bars', data: toRankItems(countBy(participants, row => row.participant_stage || 'registered')).slice(0, 8) },
        { title: 'Jalur Pendaftaran', eyebrow: 'Acquisition', icon: 'fa-route', type: 'bars', data: toRankItems(countBy(participants, row => row.jalur || 'Tidak diisi')).slice(0, 8) },
        { title: 'Latar Belakang', eyebrow: 'Profile', icon: 'fa-id-badge', type: 'bars', data: toRankItems(countBy(participants, getBackgroundLabel)).slice(0, 8) },
        { title: 'Program Studi', eyebrow: 'Academic', icon: 'fa-graduation-cap', type: 'list', data: toRankItems(countBy(participants, row => row.program_studi || row.jurusan || 'Tidak diisi')).slice(0, 8) },
        { title: 'Domain Email', eyebrow: 'Contact', icon: 'fa-envelope', type: 'list', data: toRankItems(countBy(participants, getEmailDomain)).slice(0, 8) },
        { title: 'Rentang Usia', eyebrow: 'Demografi', icon: 'fa-cake-candles', type: 'bars', data: toRankItems(countBy(participants, getAgeBand)).slice(0, 8) },
        { title: 'Bulan Lahir', eyebrow: 'Demografi', icon: 'fa-calendar-days', type: 'bars', data: monthItems(countBy(participants, getBirthMonth)) },
        { title: 'CV Terkumpul', eyebrow: 'Readiness', icon: 'fa-file-lines', type: 'donut', data: countBy(participants, row => row.cv_link ? 'Ada CV' : 'Belum ada CV') },
        { title: 'Kelengkapan Esai', eyebrow: 'Application', icon: 'fa-pen-nib', type: 'bars', data: toRankItems(countBy(participants, getEssayCompletionBand)) },
        { title: 'Coverage AI Scan', eyebrow: 'AI Pre-Screening', icon: 'fa-robot', type: 'donut', data: countBy(participants, row => isScanned(row) ? 'Sudah Scan' : 'Belum Scan') },
        { title: 'Distribusi AI Score', eyebrow: 'AI Pre-Screening', icon: 'fa-brain', type: 'bars', data: buildNumericBuckets(participants.map(row => Number(row.ai_score || row.ai_data?.ai_score)).filter(Number.isFinite), 20) },
        { title: 'Status Tes Kompetensi', eyebrow: 'Tahap 2', icon: 'fa-square-root-variable', type: 'bars', data: toRankItems(countBy(mergeSessionByNik(participants, competency), row => row.status || 'not_started')) },
        { title: 'Status Re-Test', eyebrow: 'Tahap 2', icon: 'fa-rotate-right', type: 'bars', data: toRankItems(countBy(retest, row => row.status || 'not_started')) },
        { title: 'Rata-rata Section', eyebrow: 'Nilai Semua', icon: 'fa-layer-group', type: 'bars', data: sectionAverages },
        { title: 'Media Permission', eyebrow: 'Monitoring', icon: 'fa-video', type: 'bars', data: toRankItems(countBy([...competency, ...retest], getMediaLabel)) },
        { title: 'Focus Flags', eyebrow: 'Anti-Fraud Ringan', icon: 'fa-eye', type: 'bars', data: toRankItems(countBy([...competency, ...retest], getFocusBand)) },
        { title: 'Final Decision T2', eyebrow: 'Panitia', icon: 'fa-gavel', type: 'donut', data: countBy(participants, row => normalizeDecision(row.status_tahap_2 || row.competency_status)) },
        { title: 'Top 10 Nilai Bobot', eyebrow: 'Leaderboard', icon: 'fa-trophy', type: 'list', data: scores.filter(row => Number.isFinite(row.weighted)).sort((a, b) => b.weighted - a.weighted).slice(0, 10).map(row => ({ label: row.name, value: formatScore(row.weighted) })) },
        { title: 'Provinsi Top Score', eyebrow: 'Geo Performance', icon: 'fa-location-crosshairs', type: 'list', data: getProvinceScoreRanks(participants, scores).slice(0, 10) }
    ];
}

function renderInsightGrid(items) {
    const grid = document.getElementById('dataVizInsightGrid');
    if (!grid) return;
    grid.innerHTML = items.map((item, index) => `
        <article class="data-viz-card glass-panel">
            <div class="data-viz-card-header">
                <div>
                    <span>${escapeDataVizHtml(item.eyebrow)}</span>
                    <h3>${escapeDataVizHtml(item.title)}</h3>
                </div>
                <i class="fas ${escapeDataVizHtml(item.icon)}"></i>
            </div>
            <div class="data-viz-card-body">
                ${renderInsightBody(item, index)}
            </div>
        </article>
    `).join('');
}

function renderInsightBody(item, index) {
    if (item.type === 'donut') return renderDonut(item.data, index);
    if (item.type === 'list') return renderRankListHtml(item.data);
    return renderBarsHtml(Array.isArray(item.data) ? item.data : toRankItems(item.data), { compact: true });
}

function renderBars(targetId, items, options = {}) {
    const target = document.getElementById(targetId);
    if (!target) return;
    target.innerHTML = renderBarsHtml(items, options);
}

function renderBarsHtml(items, options = {}) {
    const rows = Array.isArray(items) ? items : [];
    if (!rows.length) return '<p class="data-viz-empty">Belum ada data.</p>';
    const numericRows = rows.map(item => ({ label: item.label, value: Number(item.value || 0) }));
    const max = Math.max(...numericRows.map(item => item.value), 1);
    return numericRows.map(item => `
        <div class="data-viz-bar-row ${options.compact ? 'compact' : ''}">
            <div class="data-viz-bar-meta"><span>${escapeDataVizHtml(item.label)}</span><strong>${escapeDataVizHtml(formatMetric(item.value))}</strong></div>
            <div class="data-viz-bar-track"><span style="width:${Math.max(3, (item.value / max) * 100)}%"></span></div>
        </div>
    `).join('');
}

function renderRankList(targetId, items) {
    const target = document.getElementById(targetId);
    if (!target) return;
    target.innerHTML = renderRankListHtml(items);
}

function renderRankListHtml(items) {
    if (!items || !items.length) return '<p class="data-viz-empty">Belum ada data.</p>';
    return `<ol class="data-viz-rank-list">${items.map((item, index) => `
        <li>
            <span>${index + 1}</span>
            <strong>${escapeDataVizHtml(item.label || '-')}</strong>
            <em>${escapeDataVizHtml(formatMetric(item.value))}</em>
        </li>
    `).join('')}</ol>`;
}

function renderScatterChart(targetId, scores, xLabel, yLabel) {
    const target = document.getElementById(targetId);
    if (!target) return;
    if (!scores.length) {
        target.innerHTML = '<p class="data-viz-empty">Belum ada nilai submitted.</p>';
        return;
    }
    const points = scores.filter(item => Number.isFinite(item.raw) && Number.isFinite(item.weighted));
    if (!points.length) {
        target.innerHTML = '<p class="data-viz-empty">Belum ada pasangan raw dan bobot.</p>';
        return;
    }
    target.innerHTML = `
        <svg viewBox="0 0 520 280" role="img" aria-label="Raw vs Bobot">
            <line x1="42" y1="236" x2="496" y2="236" class="data-viz-axis"></line>
            <line x1="42" y1="20" x2="42" y2="236" class="data-viz-axis"></line>
            ${[0, 25, 50, 75, 100].map(mark => `
                <line x1="42" y1="${236 - mark * 2.08}" x2="496" y2="${236 - mark * 2.08}" class="data-viz-gridline"></line>
                <text x="10" y="${241 - mark * 2.08}" class="data-viz-axis-label">${mark}</text>
            `).join('')}
            ${points.map(point => {
                const x = 42 + Math.max(0, Math.min(100, point.raw)) * 4.54;
                const y = 236 - Math.max(0, Math.min(100, point.weighted)) * 2.08;
                return `<circle cx="${x}" cy="${y}" r="5.5"><title>${escapeDataVizHtml(point.name)} - Raw ${formatScore(point.raw)}, Bobot ${formatScore(point.weighted)}</title></circle>`;
            }).join('')}
            <text x="244" y="270" class="data-viz-axis-label">${escapeDataVizHtml(xLabel)}</text>
            <text x="8" y="18" class="data-viz-axis-label">${escapeDataVizHtml(yLabel)}</text>
        </svg>
    `;
}

function renderProvinceHeatmap(targetId, provinceCounts) {
    const target = document.getElementById(targetId);
    if (!target) return;
    const items = toRankItems(provinceCounts);
    if (!items.length) {
        target.innerHTML = '<p class="data-viz-empty">Belum ada provinsi terdeteksi dari NIK.</p>';
        return;
    }
    const max = Math.max(...items.map(item => Number(item.value || 0)), 1);
    const circles = items.map(item => {
        const point = DATA_VIZ_MAP_POINTS[item.label] || [50, 50];
        const intensity = Number(item.value || 0) / max;
        const radius = 5 + (intensity * 18);
        const opacity = 0.28 + (intensity * 0.62);
        return `<circle cx="${point[0]}" cy="${point[1]}" r="${radius}" opacity="${opacity}"><title>${escapeDataVizHtml(item.label)}: ${item.value} peserta</title></circle>`;
    }).join('');
    target.innerHTML = `
        <svg viewBox="0 0 108 100" role="img" aria-label="Heatmap provinsi peserta">
            <path d="M5 29 C20 25 29 39 39 41 C52 27 64 32 64 45 C73 38 86 42 90 54 C99 57 103 67 100 77 C88 84 74 88 58 84 C42 91 25 83 15 73 C4 62 2 44 5 29 Z" class="data-viz-map-shape"></path>
            ${circles}
        </svg>
        <div class="data-viz-heatmap-legend">
            <span>Rendah</span><div></div><span>Tinggi</span>
        </div>
    `;
}

function renderDonut(data, index) {
    const items = toRankItems(data);
    if (!items.length) return '<p class="data-viz-empty">Belum ada data.</p>';
    const total = items.reduce((sum, item) => sum + Number(item.value || 0), 0) || 1;
    const first = items[0] || { value: 0 };
    const percent = Math.round((Number(first.value || 0) / total) * 100);
    return `
        <div class="data-viz-donut-wrap">
            <div class="data-viz-donut" style="--p:${percent}; --hue:${(index * 31) % 360};">
                <strong>${percent}%</strong>
            </div>
            ${renderRankListHtml(items.slice(0, 4))}
        </div>
    `;
}

function getDataVizScores() {
    const source = document.getElementById('dataVizScoreSource')?.value || 'all';
    const participants = dataVizState.participants || [];
    const byNik = new Map(participants.map(row => [normalizeDataVizNik(row.nik), row]));
    const rows = [];
    if (source === 'all' || source === 'competency') {
        dataVizState.competencySessions.forEach(row => rows.push(normalizeScoreRow(row, byNik, 'Tahap 2')));
    }
    if (source === 'all' || source === 'retest') {
        dataVizState.retestSessions.forEach(row => rows.push(normalizeScoreRow(row, byNik, 'Re-Test')));
    }
    if (source === 'all' || source === 'ai') {
        participants.forEach(row => {
            const aiScore = Number(row.ai_score || row.ai_data?.ai_score);
            if (Number.isFinite(aiScore) && aiScore > 0) {
                rows.push({ nik: normalizeDataVizNik(row.nik), name: row.nama_lengkap || '-', raw: aiScore, weighted: aiScore, source: 'AI' });
            }
        });
    }
    return rows.filter(row => row.nik || row.name).map(row => ({
        ...row,
        raw: Number.isFinite(row.raw) ? row.raw : null,
        weighted: Number.isFinite(row.weighted) ? row.weighted : null
    }));
}

function normalizeScoreRow(row, byNik, source) {
    const nik = normalizeDataVizNik(row.nik);
    const participant = byNik.get(nik) || {};
    return {
        nik,
        name: row.nama_lengkap || participant.nama_lengkap || '-',
        raw: Number(row.score),
        weighted: Number(row.weighted_score),
        source
    };
}

function buildScoreBuckets(scores) {
    const values = scores.map(item => Number.isFinite(item.weighted) ? item.weighted : item.raw).filter(Number.isFinite);
    return buildNumericBuckets(values, 20);
}

function buildNumericBuckets(values, step) {
    const buckets = [];
    for (let start = 0; start < 100; start += step) {
        const end = start + step;
        buckets.push({
            label: `${start}-${end}`,
            value: values.filter(value => value >= start && (end === 100 ? value <= end : value < end)).length
        });
    }
    return buckets;
}

function getSectionAverages(sessions) {
    const labels = { math: 'Math', logic: 'Logic', psychology: 'Psikologi' };
    return Object.keys(labels).map(key => {
        const values = sessions.map(row => parseDataVizJson(row.section_scores, {})[key]).map(Number).filter(Number.isFinite);
        return { label: labels[key], value: Number(average(values).toFixed(2)) || 0 };
    });
}

function getProvinceScoreRanks(participants, scores) {
    const provinceByNik = new Map(participants.map(row => [normalizeDataVizNik(row.nik), getProvinceFromParticipant(row)]));
    const grouped = {};
    scores.forEach(score => {
        const province = provinceByNik.get(score.nik) || 'Belum terdeteksi';
        if (!grouped[province]) grouped[province] = [];
        grouped[province].push(Number.isFinite(score.weighted) ? score.weighted : score.raw);
    });
    return Object.keys(grouped).map(label => ({ label, value: formatScore(average(grouped[label])) })).sort((a, b) => Number(b.value) - Number(a.value));
}

function mergeSessionByNik(participants, sessions) {
    const latest = new Map();
    sessions.forEach(session => {
        const nik = normalizeDataVizNik(session.nik);
        if (!nik) return;
        const existing = latest.get(nik);
        if (!existing || new Date(session.updated_at || 0) > new Date(existing.updated_at || 0)) latest.set(nik, session);
    });
    return participants.map(row => ({ ...row, ...(latest.get(normalizeDataVizNik(row.nik)) || { status: 'not_started' }) }));
}

function countBy(rows, mapper) {
    return rows.reduce((acc, row) => {
        const key = String(mapper(row) || 'Tidak diisi').trim() || 'Tidak diisi';
        acc[key] = (acc[key] || 0) + 1;
        return acc;
    }, {});
}

function toRankItems(counts) {
    return Object.keys(counts || {})
        .map(label => ({ label, value: counts[label] }))
        .sort((a, b) => Number(b.value) - Number(a.value));
}

function monthItems(counts) {
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    return labels.map((label, index) => ({ label, value: counts[String(index + 1)] || 0 }));
}

function getProvinceFromParticipant(row) {
    const code = normalizeDataVizNik(row.nik).slice(0, 2);
    return DATA_VIZ_PROVINCES[code] || 'Belum terdeteksi';
}

function getInstitutionName(row) {
    return row.univ || row.universitas || row.instansi || row.nama_instansi || 'Tidak diisi';
}

function getBackgroundLabel(row) {
    return row.status_kerja || row.jalur || (row.univ ? 'Mahasiswa' : row.instansi ? 'Profesional' : 'Tidak diisi');
}

function getEmailDomain(row) {
    const email = String(row.email || '');
    return email.includes('@') ? email.split('@').pop().toLowerCase() : 'Tidak diisi';
}

function getAgeBand(row) {
    const birth = parseDataVizDate(row.tanggal_lahir);
    if (!birth) return 'Tidak diisi';
    const age = Math.floor((Date.now() - birth.getTime()) / 31557600000);
    if (age < 18) return '<18';
    if (age <= 20) return '18-20';
    if (age <= 24) return '21-24';
    if (age <= 29) return '25-29';
    if (age <= 34) return '30-34';
    return '35+';
}

function getBirthMonth(row) {
    const birth = parseDataVizDate(row.tanggal_lahir);
    return birth ? String(birth.getMonth() + 1) : 'Tidak diisi';
}

function getEssayCompletionBand(row) {
    const essayKeys = ['essay_1', 'essay_2', 'essay_3', 'essay_4', 'essay_5', 'essay1', 'essay2', 'essay3', 'essay4', 'essay5'];
    const filled = essayKeys.filter(key => String(row[key] || '').trim().length > 0).length;
    const normalized = Math.min(5, filled);
    return `${normalized}/5 esai`;
}

function getMediaLabel(row) {
    if (!row || !row.nik) return 'Belum ada sesi';
    if (row.camera_status === 'granted' && row.mic_status === 'granted') return 'Cam & Mic OK';
    if (row.camera_status === 'granted') return 'Cam saja';
    if (row.mic_status === 'granted') return 'Mic saja';
    return 'Media belum lengkap';
}

function getFocusBand(row) {
    const flags = Number(row.focus_flags || 0);
    if (flags === 0) return '0 flag';
    if (flags <= 2) return '1-2 flag';
    if (flags <= 5) return '3-5 flag';
    return '>5 flag';
}

function normalizeDecision(value) {
    const raw = String(value || 'pending').toLowerCase();
    if (['lolos', 'accepted', 'accepted_stage_1', 'accepted_stage_2', 'passed_stage_2'].includes(raw)) return 'Lolos';
    if (['gugur', 'rejected', 'rejected_stage_1', 'rejected_stage_2', 'failed_stage_2'].includes(raw)) return 'Gugur';
    if (raw === 'submitted') return 'Submitted';
    if (raw === 'started') return 'Sedang Tes';
    return 'Pending';
}

function isScanned(row) {
    return row.is_scanned === true || row.is_scanned === 'true' || Number(row.ai_score || row.ai_data?.ai_score || 0) > 0 || !!row.ai_summary;
}

function parseDataVizDate(value) {
    if (!value) return null;
    const direct = new Date(value);
    if (!Number.isNaN(direct.getTime())) return direct;
    const parts = String(value).split(/[/-]/).map(Number);
    if (parts.length === 3) {
        const [a, b, c] = parts;
        const date = a > 31 ? new Date(a, b - 1, c) : new Date(c, b - 1, a);
        return Number.isNaN(date.getTime()) ? null : date;
    }
    return null;
}

function parseDataVizJson(value, fallback) {
    if (!value) return fallback;
    if (typeof value === 'object') return value;
    try {
        return JSON.parse(value);
    } catch (error) {
        return fallback;
    }
}

function normalizeDataVizNik(value) {
    return String(value || '').replace(/\D/g, '');
}

function average(values) {
    const clean = values.map(Number).filter(Number.isFinite);
    if (!clean.length) return 0;
    return clean.reduce((sum, value) => sum + value, 0) / clean.length;
}

function formatScore(value) {
    const number = Number(value || 0);
    return Number.isFinite(number) ? number.toFixed(number % 1 === 0 ? 0 : 1) : '0';
}

function formatMetric(value) {
    return Number.isFinite(Number(value)) ? String(value) : String(value || '-');
}

function escapeDataVizHtml(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
