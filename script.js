document.addEventListener('DOMContentLoaded', () => {
    if (typeof DASHBOARD_DATA !== 'undefined') {
        initDashboard(DASHBOARD_DATA);
    } else {
        console.error('Data not found.');
    }
});

function initDashboard(data) {
    const setTxt = (id, txt) => {
        const el = document.getElementById(id);
        if (el) el.textContent = txt;
    };

    // 1. KPIs
    setTxt('total-students', data.overview.total_students.toLocaleString());
    setTxt('depression-rate', data.overview.depression_rate + '%');
    setTxt('avg-cgpa', data.overview.avg_cgpa.toFixed(2));
    setTxt('avg-age', data.overview.avg_age.toFixed(1));
    
    if (data.stress_analysis && data.stress_analysis.averages) {
        setTxt('stress-avg-false', data.stress_analysis.averages.false.toFixed(2));
        setTxt('stress-avg-true', data.stress_analysis.averages.true.toFixed(2));
    }

    // 2. Department Chart (Original Narrative)
    const deptCanvas = document.getElementById('deptChart');
    if (deptCanvas && data.department_analysis) {
        new Chart(deptCanvas.getContext('2d'), {
            type: 'pie',
            data: {
                labels: Object.keys(data.department_analysis),
                datasets: [{
                    data: Object.values(data.department_analysis),
                    backgroundColor: ['#2d5a4c', '#4a7c6a', '#a67c52', '#dcd7ce', '#1f362e'],
                    borderWidth: 0
                }]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right' } } }
        });
    }

    // 3. Mental Health Status Pie
    const distPieCanvas = document.getElementById('distPieChart');
    if (distPieCanvas && data.depression_distribution) {
        new Chart(distPieCanvas.getContext('2d'), {
            type: 'pie',
            data: {
                labels: Object.keys(data.depression_distribution),
                datasets: [{
                    data: Object.values(data.depression_distribution),
                    backgroundColor: ['#dcd7ce', '#2d5a4c'],
                    borderWidth: 0
                }]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }
        });
    }

    // 4. Sleep Chart (Original Line)
    const sleepCanvas = document.getElementById('sleepChart');
    if (sleepCanvas && data.sleep_analysis) {
        new Chart(sleepCanvas.getContext('2d'), {
            type: 'line',
            data: {
                labels: Object.keys(data.sleep_analysis),
                datasets: [{
                    label: 'Tasa de Depresión %',
                    data: Object.values(data.sleep_analysis),
                    borderColor: '#2d5a4c',
                    backgroundColor: 'rgba(45, 90, 76, 0.1)',
                    fill: true,
                    tension: 0.2
                }]
            },
            options: { responsive: true, maintainAspectRatio: false, scales: { y: { grid: { display: false } }, x: { grid: { display: false } } } }
        });
    }

    // 5. Lifestyle Comparison Bar Chart
    const lifestyleCanvas = document.getElementById('lifestyleBarChart');
    if (lifestyleCanvas && data.lifestyle_comparison) {
        const lifestyleLabels = ['Sueño (h)', 'Estudio (h)', 'Redes (h)', 'Actividad (min/10)'];
        const getLData = (isDep) => {
            const d = data.lifestyle_comparison[isDep];
            return [d.Sleep_Duration, d.Study_Hours, d.Social_Media_Hours, d.Physical_Activity / 10];
        };

        new Chart(lifestyleCanvas.getContext('2d'), {
            type: 'bar',
            data: {
                labels: lifestyleLabels,
                datasets: [
                    { label: 'Saludable', data: getLData("false"), backgroundColor: '#dcd7ce' },
                    { label: 'Depresión', data: getLData("true"), backgroundColor: '#2d5a4c' }
                ]
            },
            options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true } } }
        });
    }

    // 6. Gender & Dept Analysis
    const genderDeptCanvas = document.getElementById('genderDeptChart');
    if (genderDeptCanvas && data.dept_gender_analysis) {
        const depts = Object.keys(data.dept_gender_analysis.Female);
        const femaleData = depts.map(d => data.dept_gender_analysis.Female[d]);
        const maleData = depts.map(d => data.dept_gender_analysis.Male[d]);

        new Chart(genderDeptCanvas.getContext('2d'), {
            type: 'bar',
            data: {
                labels: depts,
                datasets: [
                    { label: 'Mujeres (%)', data: femaleData, backgroundColor: '#a67c52' },
                    { label: 'Hombres (%)', data: maleData, backgroundColor: '#2d5a4c' }
                ]
            },
            options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false, scales: { x: { beginAtZero: true, max: 20 } } }
        });
    }

    // 7. Heatmap
    if (data.correlation_matrix) {
        renderHeatmap(data.correlation_matrix);
    }

    // Sidebar: Stress Analysis
    const stressCanvas = document.getElementById('stressChart');
    if (stressCanvas && data.stress_analysis && data.stress_analysis.distribution) {
        const levels = Object.keys(data.stress_analysis.distribution);
        const sData = levels.map(l => data.stress_analysis.distribution[l]["true"] || 0);

        new Chart(stressCanvas.getContext('2d'), {
            type: 'bar',
            data: {
                labels: levels,
                datasets: [{ label: 'Frecuencia Depresión %', data: sData, backgroundColor: '#2d5a4c' }]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { display: false }, x: { grid: { display: false } } } }
        });
    }

    // Comparison Tool (Button Based)
    const metricButtons = document.querySelectorAll('.metric-btn');
    if (metricButtons.length > 0 && data.profiles) {
        metricButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Toggle classes
                metricButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Update Values
                const m = btn.getAttribute('data-metric');
                setTxt('val-false', data.profiles.false[m].toFixed(2));
                setTxt('val-true', data.profiles.true[m].toFixed(2));
            });
        });
        
        // Init first one
        const activeBtn = document.querySelector('.metric-btn.active');
        if (activeBtn) {
            const m = activeBtn.getAttribute('data-metric');
            setTxt('val-false', data.profiles.false[m].toFixed(2));
            setTxt('val-true', data.profiles.true[m].toFixed(2));
        }
    }

    // Conclusions
    const cList = document.getElementById('conclusion-list');
    if (cList && data.department_analysis) {
        const topD = Object.keys(data.department_analysis)[0];
        const items = [
            `Tasa de depresión confirmada en el ${data.overview.depression_rate}% de la muestra.`,
            `Diferencia crítica en sueño: Estudiantes con síntomas duermen ${data.profiles.true.Sleep_Duration.toFixed(1)}h vs ${data.profiles.false.Sleep_Duration.toFixed(1)}h.`,
            `El departamento de ${topD} muestra la mayor incidencia relativa.`,
            `Existe una correlación directa entre los niveles de estrés y la prevalencia de depresión.`,
            `Los estudiantes con depresión reportan un estrés promedio de ${data.stress_analysis.averages.true.toFixed(1)}/10.`
        ];
        cList.innerHTML = items.map(i => `<li>${i}</li>`).join('');
    }

    // Insight
    const dInsight = document.getElementById('dept-insight');
    if (dInsight && data.department_analysis) {
        const topD = Object.keys(data.department_analysis)[0];
        dInsight.textContent = `Nota: Se observa que el área de ${topD} requiere atención prioritaria en programas de bienestar.`;
    }
}

function renderHeatmap(matrix) {
    const container = document.getElementById('heatmap-grid');
    if (!container) return;

    const labels = {
        'Age': 'Edad',
        'CGPA': 'CGPA',
        'Sleep_Duration': 'Sueño',
        'Study_Hours': 'Estudio',
        'Social_Media_Hours': 'RRSS',
        'Physical_Activity': 'Físico',
        'Stress_Level': 'Estrés'
    };

    const vars = Object.keys(matrix);
    container.style.gridTemplateColumns = `repeat(${vars.length + 1}, 1fr)`;

    // Header
    container.innerHTML = '<div class="heatmap-header"></div>';
    vars.forEach(v => {
        const div = document.createElement('div');
        div.className = 'heatmap-header';
        div.textContent = labels[v] || v;
        container.appendChild(div);
    });

    // Rows
    vars.forEach(v1 => {
        const label = document.createElement('div');
        label.className = 'heatmap-label';
        label.textContent = labels[v1] || v1;
        container.appendChild(label);

        vars.forEach(v2 => {
            const val = matrix[v1][v2];
            const div = document.createElement('div');
            div.className = 'heatmap-cell';
            div.textContent = val.toFixed(2);
            
            const alpha = Math.abs(val);
            div.style.backgroundColor = `rgba(45, 90, 76, ${alpha})`;
            if (alpha < 0.4) div.style.color = '#1f362e';
            
            container.appendChild(div);
        });
    });
}
