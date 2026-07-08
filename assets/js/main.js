const nav = document.querySelector('.nav');
const toggle = document.querySelector('.menu-toggle');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    toggle.textContent = nav.classList.contains('open') ? 'Close' : 'Menu';
  });
}

document.querySelectorAll('.dock-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    link.classList.remove('bubble-pop');
    void link.offsetWidth;
    link.classList.add('bubble-pop');
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
