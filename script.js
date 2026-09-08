// ===== Page-enter fade =====
// body starts at opacity:0 (see style.css); add .ready on load to fade in.
window.addEventListener('DOMContentLoaded', () => {
  requestAnimationFrame(() => document.body.classList.add('ready'));
});

// ===== Page-leave fade on internal navigation =====
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
document.addEventListener('click', (e) => {
  const link = e.target.closest('a');
  if(!link) return;
  const href = link.getAttribute('href');
  if(!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || link.target === '_blank') return;
  if(prefersReducedMotion) return; // let it navigate immediately
  e.preventDefault();
  document.body.classList.remove('ready');
  document.body.classList.add('leaving');
  setTimeout(() => { window.location.href = href; }, 300);
});

// ===== Mobile nav toggle =====
const navToggle = document.getElementById('navToggle');
const navList = document.getElementById('navList');
if(navToggle && navList){
  navToggle.addEventListener('click', () => {
    const open = navList.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open);
  });
  navList.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navList.classList.remove('open');
    navToggle.setAttribute('aria-expanded', false);
  }));
}

// ===== Active nav link for current page =====
(() => {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a[href]').forEach(a => {
    const target = a.getAttribute('href');
    if(target === path || (path === '' && target === 'index.html')){
      a.classList.add('active');
    }
  });
})();

// ===== Scroll reveal =====
const revealEls = document.querySelectorAll('.reveal, .project');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('in-view');
      io.unobserve(entry.target);
    }
  });
}, {threshold:0.12});
revealEls.forEach(el => io.observe(el));