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
    
    // Don't initialize letter game yet - wait for big heart click
  }, 800);
});

// No button - moves away when clicked
let noClickCount = 0;
const sadMessages = [
  "Are you sure? 🥺",
  "Interesting choice. Bold.",
  "Pretty please? 💕",
  "Pattu, you pressed the wrong one 😌",
  "Come on chellam... for me? ❤️",
  "Wow. Okay Susha. Rude.",
  "Let's pretend that didn't happen.",
  "Okay ammu... I know you're smiling now 😏"
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
  
  // Initialize letter game on first click
  if (letterGameData.letters.length === 0) {
    setTimeout(() => {
      initLetterGame();
    }, 500);
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

/* ==================== LETTER FINDING GAME ==================== */

const letterGameData = {
  name1: 'ananda',
  name2: 'susha',
  letters: [], // Will be populated with positions
  foundLetters: new Set(),
  letterSlots: []
};

function initLetterGame() {
  const hiddenLettersContainer = document.getElementById('hiddenLetters');
  const letterGameContainer = document.getElementById('letterGameContainer');
  const letterSlots = document.querySelectorAll('.letter-slot');
  const messageCard = document.getElementById('messageCard');
  
  // Store letter slots reference
  letterGameData.letterSlots = Array.from(letterSlots);
  
  // Show the game UI
  letterGameContainer.classList.add('active');
  hiddenLettersContainer.classList.add('active');
  
  // Get message card boundaries
  const cardRect = messageCard.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const viewportWidth = window.innerWidth;
  
  // Combine both names into one array of letters
  const allLetters = (letterGameData.name1 + letterGameData.name2).split('');
  
  // Generate random positions for each letter
  allLetters.forEach((letter, index) => {
    const letterEl = document.createElement('div');
    letterEl.className = 'clickable-letter';
    letterEl.textContent = letter;
    letterEl.dataset.index = index;
    letterEl.dataset.letter = letter;
    
    let positionFound = false;
    let attempts = 0;
    let xPos, yPos;
    
    // Try to find a position that doesn't overlap the message card
    while (!positionFound && attempts < 50) {
      // Random position across viewport
      xPos = 5 + Math.random() * 90; // 5% to 95% to avoid edges
      yPos = 10 + Math.random() * 85; // 10% to 95%
      
      // Convert percentages to pixels for comparison
      const xPixels = (xPos / 100) * viewportWidth;
      const yPixels = (yPos / 100) * viewportHeight;
      
      // Check if position overlaps with message card (with extra padding)
      const padding = 30; // Extra space around card
      const overlapsCard = (
        xPixels > (cardRect.left - padding) &&
        xPixels < (cardRect.right + padding) &&
        yPixels > (cardRect.top - padding) &&
        yPixels < (cardRect.bottom + padding)
      );
      
      if (!overlapsCard) {
        positionFound = true;
      }
      
      attempts++;
    }
    
    // If we couldn't find a non-overlapping position, place it in margins
    if (!positionFound) {
      // Place in left or right margin
      if (Math.random() > 0.5) {
        xPos = 5 + Math.random() * 15; // Left margin
      } else {
        xPos = 80 + Math.random() * 15; // Right margin
      }
      yPos = 10 + Math.random() * 85;
    }
    
    letterEl.style.left = xPos + '%';
    letterEl.style.top = yPos + '%';
    
    // Random animation delay
    letterEl.style.animationDelay = Math.random() * 2 + 's';
    
    // Click handler
    letterEl.addEventListener('click', () => handleLetterClick(letterEl, index));
    
    hiddenLettersContainer.appendChild(letterEl);
    letterGameData.letters.push(letterEl);
  });
}

function handleLetterClick(letterEl, index) {
  if (letterGameData.foundLetters.has(index)) return;
  
  // Mark as found
  letterGameData.foundLetters.add(index);
  
  // Animate the clicked letter
  letterEl.classList.add('collected');
  
  // Create celebration particles
  createLetterParticles(letterEl);
  
  // Update the display slot
  const slot = letterGameData.letterSlots[index];
  slot.textContent = letterEl.dataset.letter;
  slot.classList.add('found');
  
  // Play a sparkle sound effect (optional - would need audio file)
  // new Audio('sparkle.mp3').play().catch(() => {});
  
  // Check if all letters are found
  setTimeout(() => {
    if (letterGameData.foundLetters.size === letterGameData.letterSlots.length) {
      completeGame();
    }
  }, 500);
}

function createLetterParticles(element) {
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  const particles = ['✨', '⭐', '💫', '🌟'];
  const count = isMobile ? 8 : 12;
  
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.textContent = particles[Math.floor(Math.random() * particles.length)];
    particle.style.position = 'fixed';
    particle.style.left = centerX + 'px';
    particle.style.top = centerY + 'px';
    particle.style.fontSize = (10 + Math.random() * 15) + 'px';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '9999';
    particle.style.transition = 'transform 1s ease-out, opacity 1s ease-out';
    document.body.appendChild(particle);
    
    const angle = Math.random() * Math.PI * 2;
    const distance = 60 + Math.random() * 60;
    
    requestAnimationFrame(() => {
      particle.style.transform = 
        `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) rotate(${Math.random() * 360}deg)`;
      particle.style.opacity = '0';
    });
    
    setTimeout(() => particle.remove(), 1000);
  }
}

function completeGame() {
  const letterDisplay = document.querySelector('.letter-display');
  const finalMessage = document.getElementById('finalMessage');
  const gameInstruction = document.querySelector('.game-instruction');
  const polaroidContainer = document.getElementById('polaroid');
  
  // Hide instruction
  gameInstruction.style.opacity = '0';
  
  // Fade out letter display
  letterDisplay.classList.add('complete');
  
  // Show final message
  setTimeout(() => {
    finalMessage.classList.add('show');
    
    // Create massive heart burst
    createVictoryHearts();
    
    // Reveal the polaroid photo after a delay
    setTimeout(() => {
      polaroidContainer.classList.add('revealed');
      
      // Create sparkles around the photo
      createPhotoSparkles();
    }, 1500);
    
    // Hide the entire game container after message shows
    setTimeout(() => {
      document.getElementById('letterGameContainer').style.opacity = '0';
      setTimeout(() => {
        document.getElementById('letterGameContainer').style.display = 'none';
      }, 1000);
    }, 3000);
  }, 500);
}

function createPhotoSparkles() {
  const polaroid = document.getElementById('polaroid');
  const rect = polaroid.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  const sparkles = ['✨', '⭐', '💫', '🌟', '✨'];
  const count = isMobile ? 15 : 25;
  
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const sparkle = document.createElement('div');
      sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
      sparkle.style.position = 'fixed';
      sparkle.style.left = centerX + 'px';
      sparkle.style.top = centerY + 'px';
      sparkle.style.fontSize = (15 + Math.random() * 20) + 'px';
      sparkle.style.pointerEvents = 'none';
      sparkle.style.zIndex = '9999';
      sparkle.style.transition = 'all 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
      document.body.appendChild(sparkle);
      
      const angle = (Math.PI * 2 * i) / count;
      const distance = 100 + Math.random() * 80;
      
      requestAnimationFrame(() => {
        sparkle.style.transform = 
          `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) rotate(${Math.random() * 720}deg)`;
        sparkle.style.opacity = '0';
      });
      
      setTimeout(() => sparkle.remove(), 1500);
    }, i * 40);
  }
}

function createVictoryHearts() {
  const hearts = ['❤️', '💕', '💖', '💗', '💓', '💘', '🩷'];
  const count = isMobile ? 40 : 60;
  
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const heart = document.createElement('div');
      heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
      heart.style.position = 'fixed';
      
      // Random position across the screen
      heart.style.left = Math.random() * 100 + '%';
      heart.style.top = Math.random() * 100 + '%';
      
      heart.style.fontSize = (20 + Math.random() * 40) + 'px';
      heart.style.pointerEvents = 'none';
      heart.style.zIndex = '9999';
      heart.style.opacity = '0';
      heart.style.transition = 'all 2s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
      document.body.appendChild(heart);
      
      requestAnimationFrame(() => {
        heart.style.opacity = '1';
        heart.style.transform = `scale(1.5) rotate(${Math.random() * 360}deg)`;
      });
      
      setTimeout(() => {
        heart.style.opacity = '0';
        heart.style.transform = `scale(0) rotate(${720 + Math.random() * 360}deg)`;
      }, 1500);
      
      setTimeout(() => heart.remove(), 3500);
    }, i * 30); // Stagger the hearts
  }
}
