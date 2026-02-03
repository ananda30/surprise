/* Stars */
const stars = document.getElementById('stars');
for (let i = 0; i < 100; i++) {
  const s = document.createElement('div');
  s.className = 'star';
  s.style.left = Math.random() * 100 + '%';
  s.style.top = Math.random() * 100 + '%';
  s.style.animationDelay = Math.random() * 3 + 's';
  stars.appendChild(s);
}

/* Music gate */
const overlay = document.getElementById('playOverlay');
const audio = document.getElementById('backgroundMusic');
const card = document.getElementById('messageCard');
const text = document.querySelector('.message-text');

function fadeInAudio() {
  audio.volume = 0;
  audio.play().catch(()=>{});

  let v = 0;
  const fade = setInterval(() => {
    v += 0.01;
    audio.volume = Math.min(v, 0.08); // cap at medium
    if (v >= 0.5) clearInterval(fade);
  }, 100);
}

overlay.addEventListener('click', () => {
  fadeInAudio();
  overlay.style.display = 'none';
  bigHeart.classList.add('heartbeat');
  enableGyro();
});


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

/* Heart burst */
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

setInterval(spawnHeart, 1500); // 🔥 HEART RAIN

bigHeart.addEventListener('click', e => {
  const hearts = ['❤️','💖','💕','💗','💝','💘','🩷'];
  const count = 36; // INSANE but controlled

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

  handleHiddenMessage();
});


audio.addEventListener('play', () => {
  setInterval(() => {
    card.style.boxShadow =
      `0 0 70px rgba(255,107,157,${0.4 + Math.random() * 0.5})`;
  }, 750); // heartbeat-ish timing
});

const polaroid = document.getElementById('polaroid');

polaroid.addEventListener('click', () => {
  polaroid.classList.toggle('flipped');
});
