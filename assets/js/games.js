document.addEventListener('DOMContentLoaded', async () => {
    // Inject shared header using absolute path — works from any depth
    const placeholder = document.getElementById('header-placeholder');
    if (placeholder) {
        try {
            const res = await fetch('/includes/header.html');
            if (res.ok) placeholder.innerHTML = await res.text();
        } catch (e) {
            console.warn('[games] Header inject failed', e);
        }

        // Hamburger toggle (runs after header is in DOM)
        const burger = document.getElementById('burger');
        const mobNav = document.getElementById('mob-nav');
        const mobClose = document.getElementById('mob-close');
        if (burger && mobNav) {
            burger.addEventListener('click', () => mobNav.classList.add('open'));
            mobClose?.addEventListener('click', () => mobNav.classList.remove('open'));
        }

        // Nav scrolled glass effect
        const nav = document.querySelector('nav');
        if (nav) {
            const onScroll = () => nav.classList.toggle('scrolled', scrollY > 30);
            window.addEventListener('scroll', onScroll, { passive: true });
            onScroll();
        }
    }

    // Scroll reveal via IntersectionObserver
    const ro = new IntersectionObserver(
        entries => entries.forEach(e => {
            if (e.isIntersecting) { e.target.classList.add('on'); ro.unobserve(e.target); }
        }),
        { threshold: 0.12 }
    );
    document.querySelectorAll('.rv').forEach(el => ro.observe(el));
});
