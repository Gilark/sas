// ===== LOADER =====
const loader = document.getElementById('loader');
const loaderFill = document.getElementById('loaderFill');
let loadPct = 0;

const loadInterval = setInterval(() => {
  loadPct += Math.random() * 15;
  if (loadPct >= 100) {
    loadPct = 100;
    clearInterval(loadInterval);
    setTimeout(() => loader.classList.add('hidden'), 400);
  }
  loaderFill.style.width = loadPct + '%';
}, 120);

// ===== SCROLL EFFECTS =====
const progressBar = document.getElementById('progressBar');
const navbar = document.getElementById('navbar');
const heroBg = document.getElementById('heroBg');
const ghostImg = document.getElementById('ghostImg');
const ghostName = document.getElementById('ghostName');

let ticking = false;

function onScroll() {
  const y = window.pageYOffset;
  const docH = document.documentElement.scrollHeight - window.innerHeight;

  progressBar.style.width = (y / docH) * 100 + '%';
  navbar.classList.toggle('scrolled', y > 60);

  if (y < window.innerHeight) {
    heroBg.style.transform = `translateY(${y * 0.4}px) scale(${1 + y * 0.0003})`;
    ghostImg.style.transform = `translateY(${y * 0.3}px) scale(${1 - y * 0.0005})`;
    ghostName.style.opacity = Math.max(0, 1 - y / (window.innerHeight * 0.6));
  }
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => { onScroll(); ticking = false; });
    ticking = true;
  }
});

// ===== INTERSECTION OBSERVER =====
const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale');

const io = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('active'), i * 100);
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -80px 0px' });

revealEls.forEach(el => io.observe(el));

// ===== COUNTER =====
const statNums = document.querySelectorAll('.stat-num');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = +el.dataset.target;
      let current = 0;
      const step = Math.max(1, Math.floor(target / 40));

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = current;
      }, 30);

      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

statNums.forEach(n => counterObserver.observe(n));

// ===== SMOOTH NAV =====
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    target?.scrollIntoView({ behavior: 'smooth' });
  });
});

// ===== MOUSE PARALLAX =====
document.addEventListener('mousemove', (e) => {
  if (window.pageYOffset > window.innerHeight) return;
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  ghostImg.style.transform = `translate(${x}px, ${y}px)`;
});

// ===== DUST PARTICLES =====
function createDust() {
  const hero = document.querySelector('.hero');
  for (let i = 0; i < 30; i++) {
    const d = document.createElement('div');
    const size = Math.random() * 3 + 1;
    d.style.cssText = `
      position: absolute;
      width: ${size}px; height: ${size}px;
      background: rgba(255,255,255,${Math.random() * 0.6 + 0.2});
      border-radius: 50%;
      top: ${Math.random() * 100}%;
      left: ${Math.random() * 100}%;
      pointer-events: none;
      z-index: 2;
      box-shadow: 0 0 ${Math.random() * 8 + 4}px rgba(255,255,255,0.5);
      animation: dustFloat ${Math.random() * 10 + 8}s linear infinite;
      animation-delay: ${Math.random() * 6}s;
    `;
    hero.appendChild(d);
  }
}

const dustStyle = document.createElement('style');
dustStyle.textContent = `
  @keyframes dustFloat {
    0% { transform: translateY(0) translateX(0); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { transform: translateY(-250px) translateX(${Math.random() * 100 - 50}px); opacity: 0; }
  }
`;
document.head.appendChild(dustStyle);

window.addEventListener('load', createDust);
onScroll();