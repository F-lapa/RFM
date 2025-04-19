document.addEventListener('DOMContentLoaded', () => {
    // Particles.js initialization
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: '#B24514' },
            shape: { type: 'circle', stroke: { width: 0, color: '#000000' } },
            opacity: { value: 0.5, random: false },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: '#B24514', opacity: 0.4, width: 1 },
            move: { enable: true, speed: 6, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false }
        },
        interactivity: {
            detect_on: 'canvas',
            events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
            modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
        },
        retina_detect: true
    });

    // Modal handling
    const modals = document.querySelectorAll('.modal');
    const openModalButtons = document.querySelectorAll('[id*="open-"]');
    const closeButtons = document.querySelectorAll('.close-btn');

    openModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.id.replace('open-', '') + '-modal';
            const modal = document.getElementById(modalId);
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            modal.classList.remove('show');
            document.body.style.overflow = '';
        });
    });

    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
    });

    // ALTERADO: Menu hamburger para mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Calculator handling
    const showCalculatorButton = document.getElementById('show-calculator');
    const calculatorSection = document.getElementById('calculator-section');
    const calculatorForm = document.getElementById('calculator-form');
    const calculatorResult = document.getElementById('calculator-result');

    showCalculatorButton.addEventListener('click', () => {
        calculatorSection.style.display = 'block';
        calculatorSection.classList.add('show');
        window.scrollTo({ top: calculatorSection.offsetTop, behavior: 'smooth' });
    });

    calculatorForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const initialValue = parseFloat(document.getElementById('initial-value').value);
        const monthlyValue = parseFloat(document.getElementById('monthly-value').value);
        const interestRate = parseFloat(document.getElementById('interest-rate').value) / 100;
        let period = parseInt(document.getElementById('period').value);
        const periodUnit = document.getElementById('period-unit').value;

        if (periodUnit === 'years') {
            period *= 12;
        }

        const monthlyRate = (Math.pow(1 + interestRate, 1 / 12) - 1);
        const futureValueInitial = initialValue * Math.pow(1 + monthlyRate, period);
        const futureValueMonthly = monthlyValue * (Math.pow(1 + monthlyRate, period) - 1) / monthlyRate;
        const totalValue = futureValueInitial + futureValueMonthly;

        calculatorResult.innerHTML = `
            <p>Valor Final: R$ ${totalValue.toFixed(2)}</p>
            <p>Valor Inicial Projetado: R$ ${futureValueInitial.toFixed(2)}</p>
            <p>Aportes Mensais Projetados: R$ ${futureValueMonthly.toFixed(2)}</p>
        `;
    });

    // ALTERADO: Quiz handling para 5 perguntas
    const quizModal = document.getElementById('open-quiz-modal');
    const quizForm = document.getElementById('quiz-form');
    const quizResult = document.getElementById('quiz-result');

    quizModal.addEventListener('click', () => {
        const modal = document.getElementById('quiz-modal');
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    });

    quizForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(quizForm);
        let score = 0;

        for (let i = 1; i <= 5; i++) {
            const value = parseInt(formData.get(`q${i}`));
            if (!isNaN(value)) {
                score += value;
            }
        }

        let profile;
        if (score <= 7) {
            profile = 'Conservador: Você prioriza segurança e evita riscos. Recomendamos investimentos de baixo risco, como renda fixa.';
        } else if (score <= 11) {
            profile = 'Moderado: Você busca equilíbrio entre segurança e crescimento. Uma carteira diversificada com renda fixa e variável pode ser ideal.';
        } else {
            profile = 'Agressivo: Você está disposto a correr riscos por maiores retornos. Investimentos em renda variável, como ações, podem ser adequados.';
        }

        quizResult.innerHTML = `<p>Seu Perfil: ${profile}</p>`;
    });

    // Scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.features, .testimonials, .consulting, .events, .resources, .calculator-section, .presentation-section').forEach(section => {
        observer.observe(section);
    });
});
