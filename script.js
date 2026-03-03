// Portfolio Functionality
document.addEventListener('DOMContentLoaded', () => {
    // 1. Tab Switching Logic
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');

            // Update button states
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update content visibility
            tabContents.forEach(content => {
                if (content.id === targetTab) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });

            // Re-run intersection observer check for newly visible elements
            checkVisibleElements();
        });
    });

    // 2. Intersection Observer for scroll animations
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '20px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
            }
        });
    }, observerOptions);

    function checkVisibleElements() {
        const elementsToFadeIn = document.querySelectorAll('.fade-in');
        elementsToFadeIn.forEach(el => {
            if (prefersReducedMotion) {
                el.classList.add('appear');
            } else {
                observer.observe(el);
            }
        });
    }

    checkVisibleElements();

    // 3. Background Parallax for Blobs
    if (!prefersReducedMotion) {
        document.addEventListener('mousemove', (e) => {
            const blobs = document.querySelectorAll('.blob');
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;

            blobs.forEach((blob, index) => {
                const depth = (index + 1) * 15;
                const moveX = x * depth;
                const moveY = y * depth;
                blob.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${moveX * 0.1}deg)`;
            });
        });
    }

    // 4. Console log for missing internship items (optional helper)
    const missingItems = document.querySelectorAll('.project-card[data-missing="true"]');
    if (missingItems.length > 0) {
        console.log(`%c Portfolio Status: ${missingItems.length} items are currently placeholders.`, 'color: #f59e0b; font-weight: bold;');
    }
});
