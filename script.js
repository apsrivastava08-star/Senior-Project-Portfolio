// Intersection Observer for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const elementsToFadeIn = document.querySelectorAll('.fade-in');
    
    if (prefersReducedMotion) {
        elementsToFadeIn.forEach(el => el.classList.add('appear'));
    } else {
        elementsToFadeIn.forEach(el => observer.observe(el));
    }

    // Optional: Add simple parallax effect to blobs if motion is allowed
    if (!prefersReducedMotion) {
        document.addEventListener('mousemove', (e) => {
            const blobs = document.querySelectorAll('.blob');
            const x = e.clientX / window.innerWidth - 0.5;
            const y = e.clientY / window.innerHeight - 0.5;

            blobs.forEach((blob, index) => {
                const speed = (index + 1) * 20;
                blob.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
            });
        });
    }
});
