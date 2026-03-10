// Main site functionality

// Scroll effect for navigation
const handleScroll = () => {
    const nav = document.querySelector('nav');
    if (!nav) return;

    if (window.scrollY > 50) {
        nav.classList.add('bg-background-light', 'dark:bg-background-dark', 'border-b', 'border-neutral-200', 'dark:border-neutral-800', 'shadow-sm', 'py-4');
        nav.classList.remove('py-8');
    } else {
        nav.classList.remove('bg-background-light', 'dark:bg-background-dark', 'border-b', 'border-neutral-200', 'dark:border-neutral-800', 'shadow-sm', 'py-4');
        nav.classList.add('py-8');
    }
};


window.addEventListener('scroll', handleScroll);
window.addEventListener('DOMContentLoaded', () => {
    handleScroll();

    // Lightbox Event Delegation
    document.addEventListener('click', (e) => {
        const trigger = e.target.closest('[data-lightbox-src]');
        if (trigger) {
            openLightbox(trigger.getAttribute('data-lightbox-src'));
        }
    });
});

window.openLightbox = function (src) {
    const lightbox = document.getElementById('lightbox');
    const container = document.getElementById('lightbox-container');
    const img = document.getElementById('lightbox-img');
    if (lightbox && container && img) {
        img.src = src;
        lightbox.classList.remove('hidden');
        lightbox.classList.add('flex');
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            container.classList.remove('scale-95', 'opacity-0');
            container.classList.add('scale-100', 'opacity-100');
        }, 10);
    }
};

window.closeLightbox = function () {
    const lightbox = document.getElementById('lightbox');
    const container = document.getElementById('lightbox-container');
    if (lightbox && container) {
        container.classList.add('scale-95', 'opacity-0');
        container.classList.remove('scale-100', 'opacity-100');
        setTimeout(() => {
            lightbox.classList.add('hidden');
            lightbox.classList.remove('flex');
            document.body.style.overflow = '';
        }, 300);
    }
};

// Document Preview Interactivity
window.enableInteraction = function (container) {
    // 1. Reset all other documents back to preview state
    document.querySelectorAll('.doc-overlay').forEach(overlay => {
        const otherContainer = overlay.parentElement;
        if (otherContainer !== container) {
            const iframe = otherContainer.querySelector('iframe');
            if (iframe) {
                iframe.classList.add('pointer-events-none');
            }
            overlay.classList.remove('hidden');
        }
    });

    // 2. Enable interaction for the clicked document
    const iframe = container.querySelector('iframe');
    const overlay = container.querySelector('.doc-overlay');
    if (iframe && overlay) {
        iframe.classList.remove('pointer-events-none');
        overlay.classList.add('hidden');
    }
};
