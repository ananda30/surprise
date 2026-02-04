/* Landing Page Stars */
const landingStars = document.getElementById('landingStars');
for (let i = 0; i < 100; i++) {
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
    enableGyro();
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
  "Let’s pretend that didn’t happen.",
  "Okay Ammu... I know you’re smiling now 😏"
];

noBtn.addEventListener('click', (e) => {
  e.preventDefault();
  
  // Show sad message
  const landingTitle = document.querySelector('.landing-title');
  landingTitle.style.transition = 'all 0.5s ease';
  landingTitle.textContent = sadMessages[Math.min(noClickCount, sadMessages.length - 1)];
  
  // Move the No button to a random position
  const landingContent = document.querySelector('.landing-content');
  const contentRect = landingContent.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();
  
  // Calculate safe boundaries (keeping button visible and away from Yes button)
  const maxX = window.innerWidth - btnRect.width - 40;
  const maxY = window.innerHeight - btnRect.height - 40;
  
  let newX, newY;
  let attempts = 0;
  
  // Keep trying until we find a position far enough from the Yes button
  do {
    newX = Math.random() * (maxX - 40) + 20;
    newY = Math.random() * (maxY - 40) + 20;
    attempts++;
  } while (attempts < 10 && Math.abs(newX - btnRect.left) < 200 && Math.abs(newY - btnRect.top) < 200);
  
  noBtn.style.position = 'fixed';
  noBtn.style.left = newX + 'px';
  noBtn.style.top = newY + 'px';
  noBtn.style.transition = 'all 0.3s ease';
  
  // Make the Yes button grow and pulse
  yesBtn.style.transform = `scale(${1.1 + noClickCount * 0.05})`;
  yesBtn.style.animation = 'pulse 1s infinite';
  
  noClickCount++;
  
  // After several clicks, make the No button smaller
  if (noClickCount > 3) {
    noBtn.style.fontSize = `${1.5 - (noClickCount - 3) * 0.1}rem`;
    noBtn.style.padding = `${20 - (noClickCount - 3) * 2}px ${50 - (noClickCount - 3) * 5}px`;
  }
});

function createHeartBurst(element) {
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  const hearts = ['❤️','💖','💕','💗','💓','💘','🩷'];
  const count = 20;

  for (let i = 0; i < count; i++) {
    const h = document.createElement('div');
    h.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    h.style.position = 'fixed';
    h.style.left = centerX + 'px';
    h.style.top = centerY + 'px';
    h.style.fontSize = 14 + Math.random() * 28 + 'px';
    h.style.pointerEvents = 'none';
    h.style.zIndex = '99999';
    h.style.transition = '1.2s cubic-bezier(.17,.67,.3,1.33)';
    document.body.appendChild(h);

    const angle = Math.random() * Math.PI * 2;
    const distance = 100 + Math.random() * 150;

    requestAnimationFrame(() => {
      h.style.transform =
        `translate(${Math.cos(angle)*distance}px, ${Math.sin(angle)*distance}px)
         rotate(${Math.random()*720}deg)`;
      h.style.opacity = 0;
    });

    setTimeout(() => h.remove(), 1200);
  }
}

/* Stars for main site */
const stars = document.getElementById('stars');
for (let i = 0; i < 100; i++) {
  const s = document.createElement('div');
  s.className = 'star';
  s.style.left = Math.random() * 100 + '%';
  s.style.top = Math.random() * 100 + '%';
  s.style.animationDelay = Math.random() * 3 + 's';
  stars.appendChild(s);
}

/* Desktop parallax */
document.addEventListener('mousemove', e => {
  if (window.innerWidth < 768) return;

  const x = (e.clientX / window.innerWidth - 0.5) * 10;
  const y = (e.clientY / window.innerHeight - 0.5) * 10;

  card.style.transform =
    `perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg)`;
});

/* Mobile gyroscope parallax */
function enableGyro() {
  if (!window.DeviceOrientationEvent) return;

  if (typeof DeviceOrientationEvent.requestPermission === 'function') {
    DeviceOrientationEvent.requestPermission().then(p => {
      if (p === 'granted') {
        window.addEventListener('deviceorientation', handleGyro);
      }
    });
  } else {
    window.addEventListener('deviceorientation', handleGyro);
  }
}

function handleGyro(e) {
  const beta = e.beta || 0;
  const gamma = e.gamma || 0;

  const rx = Math.max(-10, Math.min(10, beta / 6));
  const ry = Math.max(-10, Math.min(10, gamma / 6));

  card.style.transform =
    `perspective(1000px) rotateX(${-rx}deg) rotateY(${ry}deg)`;

  text.style.transform =
    `translate(${gamma * 0.3}px, ${beta * 0.2}px)`;
}

/* Heart burst on big heart click */
const heart = document.getElementById('bigHeart');
heart.addEventListener('click', e => {
  for (let i = 0; i < 12; i++) {
    const h = document.createElement('div');
    h.textContent = '❤️';
    h.style.position = 'fixed';
    h.style.left = e.clientX + 'px';
    h.style.top = e.clientY + 'px';
    h.style.pointerEvents = 'none';
    h.style.transition = '1s';
    document.body.appendChild(h);

    const angle = Math.random() * Math.PI * 2;
    const dist = 100 + Math.random() * 50;
    h.style.transform =
      `translate(${Math.cos(angle)*dist}px, ${Math.sin(angle)*dist}px)`;
    h.style.opacity = 0;

    setTimeout(() => h.remove(), 1000);
  }
});

/* Floating hearts */
const heartsLayer = document.getElementById('heartsLayer');
const heartEmojis = ['❤️','💕','💗'];

function spawnHeart() {
  const heart = document.createElement('div');
  heart.className = 'floating-heart';
  heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];

  const size = 14 + Math.random() * 26;
  heart.style.fontSize = size + 'px';
  heart.style.left = Math.random() * 100 + '%';
  heart.style.animationDuration = 10 + Math.random() * 15 + 's';

  heartsLayer.appendChild(heart);

  setTimeout(() => heart.remove(), 25000);
}

setInterval(spawnHeart, 1500);

bigHeart.addEventListener('click', e => {
  const hearts = ['❤️','💖','💕','💗','💓','💘','🩷'];
  const count = 36;

  for (let i = 0; i < count; i++) {
    const h = document.createElement('div');
    h.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    h.style.position = 'fixed';
    h.style.left = e.clientX + 'px';
    h.style.top = e.clientY + 'px';
    h.style.fontSize = 14 + Math.random() * 28 + 'px';
    h.style.pointerEvents = 'none';
    h.style.transition = '1.3s cubic-bezier(.17,.67,.3,1.33)';
    document.body.appendChild(h);

    const angle = Math.random() * Math.PI * 2;
    const distance = 140 + Math.random() * 140;

    requestAnimationFrame(() => {
      h.style.transform =
        `translate(${Math.cos(angle)*distance}px, ${Math.sin(angle)*distance}px)
         rotate(${Math.random()*720}deg)`;
      h.style.opacity = 0;
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
