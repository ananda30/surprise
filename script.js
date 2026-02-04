/* Landing Page Stars */
const landingStars = document.getElementById('landingStars');
for (let i = 0; i < 50; i++) { // Reduced from 100 for mobile performance
  const s = document.createElement('div');
  s.className = 'star';
  s.style.left = Math.random() * 100 + '%';
  s.style.top = Math.random() * 100 + '%';
  s.style.animationDelay = Math.random() * 3 + 's';
  landingStars.appendChild(s);
}

/* Landing Page Logic */
const landingPage = document.getElementById('landingPage');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const audio = document.getElementById('backgroundMusic');
const card = document.getElementById('messageCard');
const text = document.querySelector('.message-text');
const bigHeart = document.getElementById('bigHeart');

// Detect if mobile
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;

function fadeInAudio() {
  audio.volume = 0;
  audio.play().catch(()=>{});

  let v = 0;
  const fade = setInterval(() => {
    v += 0.02;
    audio.volume = Math.min(v, 0.08); // cap at medium
    if (v >= 0.5) clearInterval(fade);
  }, 100);
}

// Yes button - proceed to main site
yesBtn.addEventListener('click', () => {
  // Add celebration effect
  createHeartBurst(yesBtn);
  
  setTimeout(() => {
    landingPage.classList.add('hidden');
    document.body.classList.add('started');
    fadeInAudio();
    bigHeart.classList.add('heartbeat');
  }, 800);
});

// No button - moves away when clicked
let noClickCount = 0;
const sadMessages = [
  "Are you sure? 🥺",
  "Interesting choice. Bold.",
  "Pretty please? 💕",
  "Pattu, you pressed the wrong one 😌",
  "Come on... for me? ❤️",
  "Wow. Okay Susha. Rude.",
  "Let's pretend that didn't happen.",
  "Okay Ammu... I know you're smiling now 😏"
];

noBtn.addEventListener('click', (e) => {
  e.preventDefault();
  
  // Show sad message
  const landingTitle = document.querySelector('.landing-title');
  landingTitle.style.transition = 'all 0.5s ease';
  landingTitle.textContent = sadMessages[Math.min(noClickCount, sadMessages.length - 1)];
  
  // Calculate viewport dimensions
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const btnWidth = noBtn.offsetWidth;
  const btnHeight = noBtn.offsetHeight;
  
  // Get current button position
  const currentRect = noBtn.getBoundingClientRect();
  const currentX = currentRect.left;
  const currentY = currentRect.top;
  
  // Calculate safe boundaries
  const padding = 20;
  const maxX = viewportWidth - btnWidth - padding;
  const maxY = viewportHeight - btnHeight - padding;
  
  let newX, newY;
  let attempts = 0;
  const minDistance = isMobile ? 150 : 200; // Smaller min distance on mobile
  
  // Keep trying until we find a position far enough away
  do {
    newX = Math.random() * (maxX - padding) + padding;
    newY = Math.random() * (maxY - padding) + padding;
    attempts++;
    
    const distance = Math.sqrt(Math.pow(newX - currentX, 2) + Math.pow(newY - currentY, 2));
    if (distance >= minDistance || attempts >= 20) break;
  } while (attempts < 20);
  
  // Set position
  noBtn.style.position = 'fixed';
  noBtn.style.left = newX + 'px';
  noBtn.style.top = newY + 'px';
  
  // Make the Yes button grow and pulse
  yesBtn.style.transform = `scale(${1.1 + noClickCount * 0.05})`;
  yesBtn.style.animation = 'pulse 1s infinite';
  
  noClickCount++;
  
  // After several clicks, make the No button smaller
  if (noClickCount > 3) {
    const newFontSize = Math.max(1.0, 1.5 - (noClickCount - 3) * 0.1);
    const newPaddingY = Math.max(10, 20 - (noClickCount - 3) * 2);
    const newPaddingX = Math.max(25, 50 - (noClickCount - 3) * 5);
    noBtn.style.fontSize = newFontSize + 'rem';
    noBtn.style.padding = `${newPaddingY}px ${newPaddingX}px`;
  }
});

function createHeartBurst(element) {
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  const hearts = ['❤️','💖','💕','💗','💓','💘','🩷'];
  const count = isMobile ? 12 : 20; // Fewer hearts on mobile

  for (let i = 0; i < count; i++) {
    const h = document.createElement('div');
    h.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    h.style.position = 'fixed';
    h.style.left = centerX + 'px';
    h.style.top = centerY + 'px';
    h.style.fontSize = 14 + Math.random() * 28 + 'px';
    h.style.pointerEvents = 'none';
    h.style.zIndex = '99999';
    h.style.transition = 'transform 1.2s cubic-bezier(.17,.67,.3,1.33), opacity 1.2s ease';
    h.style.willChange = 'transform, opacity';
    document.body.appendChild(h);

    const angle = Math.random() * Math.PI * 2;
    const distance = 100 + Math.random() * 150;

    requestAnimationFrame(() => {
      h.style.transform =
        `translate(${Math.cos(angle)*distance}px, ${Math.sin(angle)*distance}px)
         rotate(${Math.random()*720}deg)`;
      h.style.opacity = '0';
    });

    setTimeout(() => h.remove(), 1200);
  }
}

/* Stars for main site */
const stars = document.getElementById('stars');
const starCount = isMobile ? 50 : 100; // Fewer stars on mobile
for (let i = 0; i < starCount; i++) {
  const s = document.createElement('div');
  s.className = 'star';
  s.style.left = Math.random() * 100 + '%';
  s.style.top = Math.random() * 100 + '%';
  s.style.animationDelay = Math.random() * 3 + 's';
  stars.appendChild(s);
}

/* Desktop parallax only - disabled on mobile for performance */
if (!isMobile) {
  document.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth - 0.5) * 10;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;

    card.style.transform =
      `perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg)`;
  });
}

/* Heart burst on big heart click */
const heart = document.getElementById('bigHeart');
heart.addEventListener('click', e => {
  const burstCount = isMobile ? 6 : 12;
  for (let i = 0; i < burstCount; i++) {
    const h = document.createElement('div');
    h.textContent = '❤️';
    h.style.position = 'fixed';
    h.style.left = e.clientX + 'px';
    h.style.top = e.clientY + 'px';
    h.style.pointerEvents = 'none';
    h.style.transition = 'transform 1s ease, opacity 1s ease';
    h.style.willChange = 'transform, opacity';
    document.body.appendChild(h);

    const angle = Math.random() * Math.PI * 2;
    const dist = 100 + Math.random() * 50;
    
    requestAnimationFrame(() => {
      h.style.transform =
        `translate(${Math.cos(angle)*dist}px, ${Math.sin(angle)*dist}px)`;
      h.style.opacity = '0';
    });

    setTimeout(() => h.remove(), 1000);
  }
});

/* Floating hearts - optimized for mobile */
const heartsLayer = document.getElementById('heartsLayer');
const heartEmojis = ['❤️','💕','💗'];

// Reduce heart spawn rate on mobile
const heartSpawnInterval = isMobile ? 2500 : 1500;
const maxFloatingHearts = isMobile ? 8 : 15;
let floatingHeartCount = 0;

function spawnHeart() {
  if (floatingHeartCount >= maxFloatingHearts) return;
  
  const heart = document.createElement('div');
  heart.className = 'floating-heart';
  heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];

  const size = 14 + Math.random() * 26;
  heart.style.fontSize = size + 'px';
  heart.style.left = Math.random() * 100 + '%';
  heart.style.animationDuration = 10 + Math.random() * 15 + 's';

  heartsLayer.appendChild(heart);
  floatingHeartCount++;

  setTimeout(() => {
    heart.remove();
    floatingHeartCount--;
  }, 25000);
}

setInterval(spawnHeart, heartSpawnInterval);

bigHeart.addEventListener('click', e => {
  const hearts = ['❤️','💖','💕','💗','💓','💘','🩷'];
  const count = isMobile ? 20 : 36;

  for (let i = 0; i < count; i++) {
    const h = document.createElement('div');
    h.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    h.style.position = 'fixed';
    h.style.left = e.clientX + 'px';
    h.style.top = e.clientY + 'px';
    h.style.fontSize = 14 + Math.random() * 28 + 'px';
    h.style.pointerEvents = 'none';
    h.style.transition = 'transform 1.3s cubic-bezier(.17,.67,.3,1.33), opacity 1.3s ease';
    h.style.willChange = 'transform, opacity';
    document.body.appendChild(h);

    const angle = Math.random() * Math.PI * 2;
    const distance = 140 + Math.random() * 140;

    requestAnimationFrame(() => {
      h.style.transform =
        `translate(${Math.cos(angle)*distance}px, ${Math.sin(angle)*distance}px)
         rotate(${Math.random()*720}deg)`;
      h.style.opacity = '0';
    });

    setTimeout(() => h.remove(), 1300);
  }
});

/* Audio glow effect */
audio.addEventListener('play', () => {
  setInterval(() => {
    card.style.boxShadow =
      `0 0 70px rgba(255,107,157,${0.4 + Math.random() * 0.5})`;
  }, 750);
});

/* Polaroid flip */
const polaroid = document.getElementById('polaroid');

polaroid.addEventListener('click', () => {
  polaroid.classList.toggle('flipped');
});
