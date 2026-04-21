    const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
        entry.target.classList.remove('animate-zoom-out');
        entry.target.classList.add('animate-zoom');
        } else {
        // El elemento salió por abajo → scroll inverso → zoom out
        if (entry.boundingClientRect.top > 0) {
            entry.target.classList.remove('animate-zoom');
            entry.target.classList.add('animate-zoom-out');
        }
        }
    });
    }, { threshold: 0.1 });

    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));