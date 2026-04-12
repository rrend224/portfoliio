const menuLinks = document.querySelectorAll('.hero-menu a[href^="#"]');
const sections = document.querySelectorAll('main section[id]');
const workThumbs = document.querySelectorAll('.js-open-lightbox');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');

menuLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');
    const target = document.querySelector(targetId);

    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const id = entry.target.getAttribute('id');
      menuLinks.forEach((link) => {
        const isCurrent = link.getAttribute('href') === `#${id}`;
        link.classList.toggle('is-active', isCurrent);
      });
    });
  },
  {
    threshold: 0.4,
  }
);

sections.forEach((section) => sectionObserver.observe(section));

function openLightbox(imageSrc, imageAlt) {
  if (!lightbox || !lightboxImage) return;
  lightboxImage.src = imageSrc;
  lightboxImage.alt = imageAlt;
  lightbox.hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  if (!lightbox || !lightboxImage) return;
  lightbox.hidden = true;
  lightboxImage.src = '';
  lightboxImage.alt = '';
  document.body.style.overflow = '';
}

workThumbs.forEach((thumb) => {
  thumb.addEventListener('click', () => {
    const imageSrc = thumb.dataset.image;
    const imageAlt = thumb.dataset.alt || 'Work image';
    if (!imageSrc) return;
    openLightbox(imageSrc, imageAlt);
  });
});

if (lightboxClose) {
  lightboxClose.addEventListener('click', closeLightbox);
}

if (lightbox) {
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && lightbox && !lightbox.hidden) {
    closeLightbox();
  }
});

window.addEventListener('load', () => {
  const loader = document.getElementById('loading');
  if (!loader) return;

  loader.style.opacity = '0';
  loader.style.transition = 'opacity 0.5s';

  setTimeout(() => {
    loader.style.display = 'none';
  }, 500);
});
