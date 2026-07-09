const nav = document.querySelector('.nav');
const toggle = document.querySelector('.menu-toggle');
function updateVisualViewportHeight() {
  const height = window.visualViewport ? window.visualViewport.height : window.innerHeight;
  document.documentElement.style.setProperty('--visual-vh', `${height}px`);
}
updateVisualViewportHeight();
window.addEventListener('resize', updateVisualViewportHeight);
if (window.visualViewport) {
  window.visualViewport.addEventListener('resize', updateVisualViewportHeight);
}

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    toggle.textContent = nav.classList.contains('open') ? 'Close' : 'Menu';
  });
}

document.querySelectorAll('.dock-nav a').forEach((link) => {
  link.addEventListener('click', (event) => {
    link.classList.remove('bubble-pop');
    void link.offsetWidth;
    link.classList.add('bubble-pop');
    const isPlainLeftClick = event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
    const url = new URL(link.href, window.location.href);
    const isSamePage = url.href === window.location.href;
    if (!isPlainLeftClick || link.target || isSamePage) return;
    event.preventDefault();
    window.setTimeout(() => {
      window.location.href = link.href;
    }, 180);
  });
  link.addEventListener('animationend', () => link.classList.remove('bubble-pop'));
});

const courseTriggers = document.querySelectorAll('.course-trigger');
function closeCourse(trigger) {
  const panel = trigger.nextElementSibling;
  trigger.setAttribute('aria-expanded', 'false');
  if (panel) panel.style.maxHeight = '0px';
}
function openCourse(trigger) {
  const panel = trigger.nextElementSibling;
  trigger.setAttribute('aria-expanded', 'true');
  if (panel) panel.style.maxHeight = `${panel.scrollHeight}px`;
}
courseTriggers.forEach((trigger) => {
  closeCourse(trigger);
  trigger.addEventListener('click', () => {
    const isOpen = trigger.getAttribute('aria-expanded') === 'true';
    courseTriggers.forEach((item) => closeCourse(item));
    if (!isOpen) openCourse(trigger);
  });
});
window.addEventListener('resize', () => {
  courseTriggers.forEach((trigger) => {
    if (trigger.getAttribute('aria-expanded') === 'true') openCourse(trigger);
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.14 });
document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));
