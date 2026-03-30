// ===== Navigation =====
const nav = document.querySelector('.nav');
const navToggle = document.querySelector('.nav__toggle');
const navLinks = document.querySelector('.nav__links');
const navAnchors = document.querySelectorAll('.nav__links a[href^="#"]');

// Sticky nav on scroll
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
  highlightActiveLink();
});

// Mobile menu toggle
const navToggleSpans = navToggle ? navToggle.querySelectorAll('span') : [];

function closeMobileMenu() {
  navLinks.classList.remove('open');
  navToggle?.setAttribute('aria-expanded', 'false');
  navToggleSpans[0].style.transform = '';
  navToggleSpans[1].style.opacity = '1';
  navToggleSpans[2].style.transform = '';
}

navToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const isOpen = navLinks.classList.contains('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggleSpans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
  navToggleSpans[1].style.opacity = isOpen ? '0' : '1';
  navToggleSpans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
});

// Close mobile menu when a link is clicked
navAnchors.forEach(a => {
  a.addEventListener('click', closeMobileMenu);
});

// Active link on scroll
function highlightActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    if (window.scrollY >= top) current = section.id;
  });
  navAnchors.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });
}

// ===== Scroll Reveal =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== Work Filter =====
const filterBtns = document.querySelectorAll('.filter-btn');
const workCards = document.querySelectorAll('.work-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    workCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.style.display = match ? '' : 'none';
    });
  });
});

// ===== Modal =====
const modalOverlay = document.querySelector('.modal-overlay');
const modalClose = document.querySelector('.modal__close');

function openModal(card) {
  const title = card.querySelector('.work-card__title')?.textContent || '';
  const category = card.querySelector('.work-card__category')?.textContent || '';
  const desc = card.querySelector('.work-card__desc')?.textContent || '';
  const emoji = card.querySelector('.work-card__thumb-placeholder')?.textContent || '🎬';

  document.querySelector('.modal__title').textContent = title;
  document.querySelector('.modal__category').textContent = category;
  document.querySelector('.modal__desc').textContent = desc;
  document.querySelector('.modal__video').textContent = emoji;

  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

workCards.forEach(card => {
  card.addEventListener('click', () => openModal(card));
});

modalClose?.addEventListener('click', closeModal);
modalOverlay?.addEventListener('click', e => {
  if (e.target === modalOverlay) closeModal();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

// ===== Contact Form =====
const contactForm = document.getElementById('contactForm');
const formSuccess = document.querySelector('.form-success');

contactForm?.addEventListener('submit', e => {
  e.preventDefault();
  const btn = contactForm.querySelector('.btn--primary');
  btn.textContent = 'Sending…';
  btn.disabled = true;

  // Simulate submission delay
  setTimeout(() => {
    contactForm.reset();
    btn.textContent = 'Send Message';
    btn.disabled = false;
    formSuccess.style.display = 'block';
    setTimeout(() => { formSuccess.style.display = 'none'; }, 5000);
  }, 1200);
});

// ===== Smooth scroll for hero CTA =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Trigger on load
highlightActiveLink();
