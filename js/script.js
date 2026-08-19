document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const year = document.querySelector('#currentYear');
  const revealItems = document.querySelectorAll('.reveal');
  const navLinks = document.querySelectorAll('.navbar .nav-link, .navbar-brand');

  if (year) year.textContent = new Date().getFullYear();

  const updateNavbar = () => navbar.classList.toggle('scrolled', window.scrollY > 20);
  updateNavbar();
  window.addEventListener('scroll', updateNavbar, { passive: true });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  navLinks.forEach((link) => link.addEventListener('click', () => {
    const openMenu = document.querySelector('.navbar-collapse.show');
    if (openMenu && window.bootstrap) window.bootstrap.Collapse.getOrCreateInstance(openMenu).hide();
  }));
});
