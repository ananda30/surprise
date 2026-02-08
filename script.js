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

/* Preload polaroid image */
const preloadImage = new Image();
preloadImage.src = 'us.jpg';

/* Dynamic Title Cycling */
const titles = [
  "Chellakutty ❤️",
  "Thangam ❤️",
  "Everything ❤️",
  "Forever ❤️",
  "Azhagu Kanmani ❤️"
];
let currentTitleIndex = 0;
let titleCycleInterval = null;

function cycleDynamicTitle() {
  const dynamicTitle = document.getElementById('dynamicTitle');
  if (!dynamicTitle) return;
  
  // Fade out
  dynamicTitle.classList.add('fade-out');
  
  setTimeout(() => {
    // Change text
    currentTitleIndex = (currentTitleIndex + 1) % titles.length;
    dynamicTitle.textContent = titles[currentTitleIndex];
    
    // Fade in
    dynamicTitle.classList.remove('fade-out');
    dynamicTitle.classList.add('fade-in');
    
    setTimeout(() => {
      dynamicTitle.classList.remove('fade-in');
    }, 500);
  }, 500);
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
    audio.volume = Math.min(v, 0.05); // cap at medium
    if (v >= 0.5) clearInterval(fade);
  }, 100);
}

// Yes button - Galaxy Swirl Transition
yesBtn.addEventListener('click', () => {
  // Disable button
  yesBtn.disabled = true;
  
  // Heart burst
  createHeartBurst(yesBtn);
  
  // Start galaxy swirl after short delay
  setTimeout(() => {
    startGalaxySwirl();
  }, 400);

  setTimeout(startConstellations, 5000);
});

function startGalaxySwirl() {
  const overlay = document.getElementById('galaxyOverlay');
  const content = document.querySelector('.landing-content');
  
  // Activate overlay
  overlay.classList.add('active');
  
  // Fade out content
  content.style.transition = 'opacity 1s ease';
  content.style.opacity = '0';
  
  // Create particles
  const particleCount = isMobile ? 60 : 100;
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  
  for (let i = 0; i < particleCount; i++) {
    setTimeout(() => {
      createGalaxyParticle(overlay, centerX, centerY, i);
    }, i * 20);
  }
  
  // Trigger reveal burst before main page appears
  setTimeout(() => {
    createRevealBurst();
  }, 2800);
  
  // Transition to main page with slight delay after burst starts
  setTimeout(() => {
    landingPage.classList.add('hidden');
    setTimeout(() => {
    document.body.classList.add('started');
    fadeInAudio();
    bigHeart.classList.add('heartbeat');
    
    // Start dynamic title cycling after a brief delay
    setTimeout(() => {
      titleCycleInterval = setInterval(cycleDynamicTitle, 3000);
    }, 2000);
  }, 600);
  }, 3000);
}

function createRevealBurst() {
  const revealBurst = document.getElementById('revealBurst');
  const burstCircle = revealBurst.querySelector('.burst-circle');
  
  // Show reveal burst container
  revealBurst.classList.add('active');
  
  // Trigger circle explosion
  burstCircle.classList.add('explode');
  
  // Create sparkle burst
  const sparkleCount = isMobile ? 30 : 50;
  
  for (let i = 0; i < sparkleCount; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle-burst';
    
    const angle = (Math.PI * 2 * i) / sparkleCount;
    const distance = 200 + Math.random() * 150;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;
    
    sparkle.style.left = '50%';
    sparkle.style.top = '50%';
    sparkle.style.setProperty('--tx', tx + 'px');
    sparkle.style.setProperty('--ty', ty + 'px');
    sparkle.style.animation = 'sparkleBurst 1s ease-out forwards';
    sparkle.style.animationDelay = (i * 0.01) + 's';
    
    // Random colors
    if (Math.random() > 0.7) {
      sparkle.style.background = '#ff6b9d';
      sparkle.style.boxShadow = '0 0 10px rgba(255, 107, 157, 0.9)';
    } else if (Math.random() > 0.4) {
      sparkle.style.background = '#ffd700';
      sparkle.style.boxShadow = '0 0 10px rgba(255, 215, 0, 0.9)';
    }
    
    revealBurst.appendChild(sparkle);
  }
  
  // Clean up after animation
  setTimeout(() => {
    revealBurst.style.transition = 'opacity 0.5s ease';
    revealBurst.style.opacity = '0';
    setTimeout(() => {
      revealBurst.classList.remove('active');
      revealBurst.style.opacity = '';
      burstCircle.classList.remove('explode');
      // Remove sparkles
      revealBurst.querySelectorAll('.sparkle-burst').forEach(s => s.remove());
    }, 500);
  }, 1200);
}

function createGalaxyParticle(container, centerX, centerY, index) {
  const particle = document.createElement('div');
  particle.className = 'galaxy-particle';
  
  // Random starting position from edges
  const side = Math.floor(Math.random() * 4);
  let startX, startY;
  
  switch(side) {
    case 0: // top
      startX = Math.random() * window.innerWidth;
      startY = -20;
      break;
    case 1: // right
      startX = window.innerWidth + 20;
      startY = Math.random() * window.innerHeight;
      break;
    case 2: // bottom
      startX = Math.random() * window.innerWidth;
      startY = window.innerHeight + 20;
      break;
    case 3: // left
      startX = -20;
      startY = Math.random() * window.innerHeight;
      break;
  }
  
  // Particle appearance
  const size = 3 + Math.random() * 6;
  const colors = ['#ff6b9d', '#ff8fab', '#ffc0cb', '#ffb6d9', '#ffffff', '#ffd700'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  
  particle.style.left = startX + 'px';
  particle.style.top = startY + 'px';
  particle.style.width = size + 'px';
  particle.style.height = size + 'px';
  particle.style.background = color;
  particle.style.boxShadow = `0 0 ${size * 3}px ${color}`;
  particle.style.opacity = '0';
  
  container.appendChild(particle);
  
  // Animate to center with spiral
  const duration = 2000 + Math.random() * 1000;
  const startTime = Date.now();
  
  function animate() {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    if (progress < 1) {
      // Spiral motion
      const currentX = startX + (centerX - startX) * progress;
      const currentY = startY + (centerY - startY) * progress;
      
      // Add spiral rotation
      const angle = progress * Math.PI * 4; // 2 full rotations
      const spiralRadius = 50 * (1 - progress);
      const spiralX = Math.cos(angle) * spiralRadius;
      const spiralY = Math.sin(angle) * spiralRadius;
      
      particle.style.left = (currentX + spiralX) + 'px';
      particle.style.top = (currentY + spiralY) + 'px';
      particle.style.opacity = progress < 0.1 ? progress * 10 : (progress > 0.9 ? (1 - progress) * 10 : 1);
      particle.style.transform = `scale(${1 - progress * 0.5}) rotate(${progress * 720}deg)`;
      
      requestAnimationFrame(animate);
    } else {
      particle.remove();
    }
  }
  
  requestAnimationFrame(animate);
}

// No button - moves away when clicked
let noClickCount = 0;
const sadMessages = [
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
  name1: 'Ananda',
  name2: 'Susha',
  letters: [], // Will be populated with positions
  foundLetters: new Set(),
  letterSlots: []
};

function initLetterGame() {
  const hiddenLettersContainer = document.getElementById('hiddenLetters');
  const letterGameInline = document.getElementById('letterGameInline');
  const letterSlots = document.querySelectorAll('.letter-slot');
  const messageCard = document.getElementById('messageCard');
  
  // Store letter slots reference
  letterGameData.letterSlots = Array.from(letterSlots);
  
  // Show the game UI inline
  letterGameInline.classList.add('active');
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
  const letterDisplay = document.querySelector('.letter-display-inline');
  const finalMessage = document.getElementById('finalMessageInline');
  const gameInstruction = document.querySelector('.game-instruction-inline');
  const polaroidContainer = document.getElementById('polaroid');
  const letterGameInline = document.getElementById('letterGameInline');
  
  // Hide instruction
  gameInstruction.style.opacity = '0';
  
  // Fade out letter display
  letterDisplay.classList.add('complete');
  
  // Show final message
  setTimeout(() => {
    finalMessage.classList.add('show');
    
    // Create massive heart burst
    createVictoryHearts();
    
    // Hide the inline game and reveal the polaroid photo
    setTimeout(() => {
      letterGameInline.style.transition = 'opacity 1s ease';
      letterGameInline.style.opacity = '0';
      
      setTimeout(() => {
        letterGameInline.style.display = 'none';
        polaroidContainer.classList.add('revealed');
        
        // Create sparkles around the photo
        createPhotoSparkles();
      }, 1000);
    }, 2000);
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
  const hearts = ['❤️', '💕', '🩷'];
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


const constellationData = {
  "ANANDA": { 
    x: 15, y: 20, 
    points: [[0,10], [5,0], [10,10], [2,6], [8,6]] // Simplified 'A' shape logic
  },
  "SUSHA": { 
    x: 60, y: 70, 
    points: [[0,0], [10,0], [0,5], [10,5], [0,10], [10,10]] // Organic pathing
  }
};

function drawOrganicConstellation(name, startX, startY) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "constellation-svg");
    document.getElementById('stars').appendChild(svg);

    // Letter paths - defined as relative coordinates
    const letters = {
        'A': [[0,10], [2,0], [4,10], [1,6], [3,6]],
        'N': [[0,10], [0,0], [4,10], [4,0]],
        'D': [[0,0], [0,10], [3,10], [4,5], [3,0], [0,0]],
        'S': [[4,0], [0,0], [0,5], [4,5], [4,10], [0,10]],
        'U': [[0,0], [0,10], [4,10], [4,0]],
        'H': [[0,0], [0,10], [0,5], [4,5], [4,0], [4,10]]
    };

    let currentX = startX;
    const nameStars = [];
    const nameLines = [];

    name.split('').forEach(char => {
        const path = letters[char.toUpperCase()];
        if (!path) return;

        let prevPoint = null;
        path.forEach(([px, py]) => {
            const jitterX = (Math.random() - 0.5) * 0.3;
            const jitterY = (Math.random() - 0.5) * 0.3;
            
            // Reduced scaling (0.8 and 1.0) to make the name smaller
            const finalX = currentX + (px * 0.8) + jitterX;
            const finalY = startY + (py * 1.0) + jitterY;

            const star = document.createElement('div');
            star.className = 'c-star';
            star.style.left = finalX + 'vw';
            star.style.top = finalY + 'vh';
            document.getElementById('stars').appendChild(star);
            nameStars.push(star);

            if (prevPoint) {
                const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                line.setAttribute("x1", prevPoint.x + "vw");
                line.setAttribute("y1", prevPoint.y + "vh");
                line.setAttribute("x2", finalX + "vw");
                line.setAttribute("y2", finalY + "vh");
                line.setAttribute("class", "constellation-line");
                svg.appendChild(line);
                nameLines.push(line);
            }
            prevPoint = {x: finalX, y: finalY};
        });
        currentX += 5; // Reduced spacing between letters
    });

    return { stars: nameStars, lines: nameLines };
}

// const ananda = drawOrganicConstellation("ANANDA", 8, 10);
// const susha = drawOrganicConstellation("SUSHA", 65, 80);
const susha = drawOrganicConstellation("SUSHA", 6, 8);
const ananda = drawOrganicConstellation("ANANDA", 62, 78);

function animateConstellation(group) {
    // 1. Stars start appearing
    group.stars.forEach((s, i) => {
        setTimeout(() => s.classList.add('visible'), i * 300);
    });

    // 2. Lines start drawing shortly after
    setTimeout(() => {
        group.lines.forEach((l, i) => {
            setTimeout(() => l.classList.add('line-active'), i * 400);
        });
    }, 1500);

    // 3. Linger: Keep everything visible for 15 seconds
    // Total time visible = 15000ms
    setTimeout(() => {
        group.stars.forEach(s => s.classList.remove('visible'));
        group.lines.forEach(l => l.classList.remove('line-active'));
    }, 20000); // 18s total (includes the draw time)
}

const startConstellations = () => {
    // Show Susha first
    animateConstellation(susha);
    
    // Show Ananda 6 seconds later so they overlap beautifully
    setTimeout(() => animateConstellation(ananda), 6000);

    // Repeat the whole cycle every 35 seconds
    setInterval(() => {
        animateConstellation(susha);
        setTimeout(() => animateConstellation(ananda), 6000);
    }, 25000);
};