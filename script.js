document.addEventListener('DOMContentLoaded', () => {
    // Inicializar partículas
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: '#B24514' },
            shape: { type: 'circle' },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: '#6B8E7B', opacity: 0.4, width: 1 },
            move: { enable: true, speed: 2, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false }
        },
        interactivity: {
            detect_on: 'canvas',
            events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
            modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
        },
        retina_detect: true
    });

    // Toggle mobile menu
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.querySelector('i').classList.toggle('fa-bars');
            menuToggle.querySelector('i').classList.toggle('fa-times');
        });
    }

    // Modal functionality
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex';
            setTimeout(() => modal.classList.add('show'), 10); // Small delay for transition
        }
    }

    function closeModal(modal) {
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 500); // Match transition duration
        }
    }

    // Attach modal open events
    const modalTriggers = [
        'open-about-modal',
        'open-contact-modal',
        'open-treinamentos-modal',
        'open-investimentos-modal',
        'open-financas-modal',
        'open-tips-modal',
        'open-quiz-modal',
        'open-planejamento-modal',
        'open-empresarial-modal',
        'open-acompanhamento-modal'
    ];

    modalTriggers.forEach(id => {
        const trigger = document.getElementById(id);
        if (trigger) {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                openModal(id.replace('open-', ''));
            });
        }
    });

    // Close modals on close button click
    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            closeModal(btn.closest('.modal'));
        });
    });

    // Close modals on outside click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });

    // Close modals on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.show').forEach(modal => {
                closeModal(modal);
            });
        }
    });

    // Calculator section functionality
    const calculatorSection = document.getElementById('calculator-section');
    const showCalculatorBtn = document.getElementById('show-calculator');

    if (showCalculatorBtn && calculatorSection) {
        showCalculatorBtn.addEventListener('click', () => {
            const isVisible = calculatorSection.style.display === 'block';
            if (!isVisible) {
                calculatorSection.style.display = 'block';
                setTimeout(() => calculatorSection.classList.add('show'), 10); // Small delay for transition
                calculatorSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                calculatorSection.classList.remove('show');
                setTimeout(() => {
                    calculatorSection.style.display = 'none';
                }, 500); // Match transition duration
            }
        });
    }

    // Calculator logic
    const calculatorForm = document.getElementById('calculator-form');
    const resultDiv = document.getElementById('calculator-result');

    function calculateCompoundInterest(initial, monthly, rate, periods, isYears) {
        const monthlyRate = rate / 100 / 12;
        let totalPeriods = isYears ? periods * 12 : periods;

        // Validate inputs
        if (initial < 0 || monthly < 0 || rate < 0 || totalPeriods <= 0) {
            return 'Por favor, insira valores válidos (não negativos e período maior que 0).';
        }

        // Calculate compound interest with monthly contributions
        let futureValue = initial * Math.pow(1 + monthlyRate, totalPeriods);
        if (monthly > 0) {
            // Future value of a series (monthly contributions)
            futureValue += monthly * (Math.pow(1 + monthlyRate, totalPeriods) - 1) / monthlyRate;
        }

        return futureValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    function updateResult() {
        const initial = parseFloat(document.getElementById('initial-value').value) || 0;
        const monthly = parseFloat(document.getElementById('monthly-value').value) || 0;
        const rate = parseFloat(document.getElementById('interest-rate').value) || 0;
        const periods = parseInt(document.getElementById('period').value) || 1;
        const periodUnit = document.getElementById('period-unit').value;
        const isYears = periodUnit === 'years';

        const result = calculateCompoundInterest(initial, monthly, rate, periods, isYears);
        resultDiv.textContent = `Valor Futuro: ${result}`;
        resultDiv.classList.remove('show'); // Reset animation
        setTimeout(() => resultDiv.classList.add('show'), 10); // Trigger animation
    }

    if (calculatorForm) {
        // Real-time calculation on input change
        ['initial-value', 'monthly-value', 'interest-rate', 'period', 'period-unit'].forEach(id => {
            const input = document.getElementById(id);
            if (input) {
                input.addEventListener('input', updateResult);
            }
        });

        // Handle form submission for button click
        calculatorForm.addEventListener('submit', (e) => {
            e.preventDefault();
            updateResult();
        });

        // Initial calculation
        updateResult();
    }

    // Quiz logic
    const quizForm = document.getElementById('quiz-form');
    const quizResult = document.getElementById('quiz-result');

    if (quizForm) {
        quizForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const answers = [
                parseInt(quizForm.querySelector('input[name="q1"]:checked')?.value) || 0,
                parseInt(quizForm.querySelector('input[name="q2"]:checked')?.value) || 0,
                parseInt(quizForm.querySelector('input[name="q3"]:checked')?.value) || 0,
                parseInt(quizForm.querySelector('input[name="q4"]:checked')?.value) || 0,
                parseInt(quizForm.querySelector('input[name="q5"]:checked')?.value) || 0,
                parseInt(quizForm.querySelector('input[name="q6"]:checked')?.value) || 0
            ];

            const totalScore = answers.reduce((sum, val) => sum + val, 0);

            let profile = '';
            if (totalScore <= 8) {
                profile = 'Conservador: Você prioriza segurança e evita riscos. Recomendamos investimentos de baixo risco, como Tesouro Direto ou CDBs com liquidez diária.';
            } else if (totalScore <= 14) {
                profile = 'Moderado: Você equilibra risco e retorno. Uma carteira diversificada com renda fixa (60%) e renda variável (40%) pode ser ideal.';
            } else {
                profile = 'Arrojado: Você busca altos retornos, mesmo com riscos. Considere investir em ações, fundos imobiliários ou ETFs, com até 70% em renda variável.';
            }

            quizResult.textContent = `Seu Perfil: ${profile}`;
            quizResult.classList.remove('show'); // Reset animation
            setTimeout(() => quizResult.classList.add('show'), 10); // Trigger animation
            quizResult.scrollIntoView({ behavior: 'smooth' });
        });
    }
});
