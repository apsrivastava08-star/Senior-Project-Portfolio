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
window.addEventListener('DOMContentLoaded', handleScroll);
handleScroll();



