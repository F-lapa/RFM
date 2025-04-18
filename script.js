document.addEventListener('DOMContentLoaded', () => {
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
    }

    if (calculatorForm) {
        // Real-time calculation on input change
        ['initial-value', 'monthly-value', 'interest-rate', 'period', 'period-unit'].forEach(id => {
            const input = document.getElementById(id);
            if (input) {
                input.addEventListener('input', updateResult);
            }
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
                parseInt(quizForm.querySelector('input[name="q3"]:checked')?.value) || 0
            ];

            const totalScore = answers.reduce((sum, val) => sum + val, 0);

            let profile = '';
            if (totalScore <= 4) {
                profile = 'Conservador: Você prefere segurança e estabilidade. Considere investimentos de baixo risco, como Tesouro Direto ou CDBs.';
            } else if (totalScore <= 7) {
                profile = 'Moderado: Você aceita algum risco para melhores retornos. Uma carteira diversificada com renda fixa e variável pode ser ideal.';
            } else {
                profile = 'Agressivo: Você busca altos retornos e tolera riscos. Ações e fundos de investimento podem ser boas opções.';
            }

            quizResult.textContent = `Seu Perfil: ${profile}`;
            quizResult.scrollIntoView({ behavior: 'smooth' });
        });
    }
});