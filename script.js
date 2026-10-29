const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');

menuToggle?.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
});

navigation?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Abrir menu');
  });
});

const carousel = document.querySelector('.carousel');
if (carousel) {
  const slides = [...carousel.querySelectorAll('.hero-slide')];
  const dots = [...carousel.querySelectorAll('.carousel-dots button')];
  const previousButton = carousel.querySelector('.carousel-previous');
  const nextButton = carousel.querySelector('.carousel-next');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let activeSlide = 0;
  let timer;
  let paused = false;

  const showSlide = (index) => {
    activeSlide = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.hidden = i !== activeSlide;
      dots[i].setAttribute('aria-current', String(i === activeSlide));
    });
  };

  const stopTimer = () => {
    window.clearInterval(timer);
    timer = undefined;
  };

  const startTimer = () => {
    stopTimer();
    if (!paused && !reducedMotion.matches && !document.hidden) {
      timer = window.setInterval(() => showSlide(activeSlide + 1), 3000);
    }
  };

  previousButton.addEventListener('click', () => { showSlide(activeSlide - 1); startTimer(); });
  nextButton.addEventListener('click', () => { showSlide(activeSlide + 1); startTimer(); });
  dots.forEach((dot, i) => dot.addEventListener('click', () => { showSlide(i); startTimer(); }));
  carousel.addEventListener('mouseenter', () => { paused = true; stopTimer(); });
  carousel.addEventListener('mouseleave', () => { paused = false; startTimer(); });
  carousel.addEventListener('focusin', () => { paused = true; stopTimer(); });
  carousel.addEventListener('focusout', (event) => {
    if (!carousel.contains(event.relatedTarget)) { paused = false; startTimer(); }
  });
  document.addEventListener('visibilitychange', startTimer);
  reducedMotion.addEventListener?.('change', startTimer);
  startTimer();
}
