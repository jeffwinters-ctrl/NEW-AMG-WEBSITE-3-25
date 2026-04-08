/* ============================================
   ABSTRAKT - Cinematic Industry Gateway
   ============================================ */

(function () {
  // If industry already chosen, skip gateway
  if (localStorage.getItem('abstrakt_industry')) {
    window.location.replace('./index.html');
    return;
  }

  const grid = document.getElementById('industryGrid');
  const tiles = grid.querySelectorAll('.gw-tile');
  const explosion = document.getElementById('explosion');
  const skipBtn = document.getElementById('skipBtn');
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');

  /* --- Floating Particles --- */
  let particles = [];
  let animFrame;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticles() {
    particles = [];
    const count = Math.floor((canvas.width * canvas.height) / 18000);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.4 + 0.1,
      });
    }
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of particles) {
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(225, 29, 72, ${p.alpha})`;
      ctx.fill();
    }
    animFrame = requestAnimationFrame(drawParticles);
  }

  resizeCanvas();
  createParticles();
  drawParticles();
  window.addEventListener('resize', () => {
    resizeCanvas();
    createParticles();
  });

  /* --- Staggered Tile Entrance --- */
  tiles.forEach((tile, i) => {
    setTimeout(() => {
      tile.classList.add('is-visible');
    }, 600 + i * 60);
  });

  /* --- 3D Tilt + Glow Follow on Hover --- */
  tiles.forEach((tile) => {
    tile.addEventListener('mousemove', (e) => {
      const rect = tile.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      tile.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
      tile.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
      tile.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
    });

    tile.addEventListener('mouseleave', () => {
      tile.style.transform = '';
    });
  });

  /* --- Industry Selection --- */
  const industryNames = {
    'hvac': 'HVAC',
    'roofing': 'Roofing',
    'construction': 'Construction',
    'landscaping': 'Landscaping',
    'paving': 'Paving',
    'commercial-cleaning': 'Commercial Cleaning',
    'flooring': 'Flooring',
    'electrical': 'Electrical',
    'fire-protection': 'Fire Protection',
    'painting': 'Painting',
    'solar': 'Solar',
    'general-contracting': 'General Contracting',
    'plumbing': 'Plumbing',
  };

  tiles.forEach((tile) => {
    tile.addEventListener('click', () => {
      const industry = tile.dataset.industry;
      if (!industry) return;

      // Mark selection
      tile.classList.add('is-selected');
      grid.classList.add('has-selection');

      // Get tile center for explosion origin
      const rect = tile.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const flash = explosion.querySelector('.gw-explosion__flash');
      flash.style.left = cx + 'px';
      flash.style.top = cy + 'px';
      flash.style.marginLeft = '-30px';
      flash.style.marginTop = '-30px';

      // Set label
      explosion.querySelector('.gw-explosion__label').textContent = industryNames[industry] || industry;

      // Fire explosion
      setTimeout(() => {
        explosion.classList.add('is-active');
      }, 300);

      // Store and redirect
      localStorage.setItem('abstrakt_industry', industry);

      setTimeout(() => {
        window.location.href = './index.html';
      }, 1300);
    });
  });

  /* --- Skip --- */
  skipBtn.addEventListener('click', () => {
    localStorage.setItem('abstrakt_industry', 'all');
    explosion.querySelector('.gw-explosion__label').textContent = 'All Industries';
    const flash = explosion.querySelector('.gw-explosion__flash');
    flash.style.left = '50%';
    flash.style.top = '50%';
    flash.style.marginLeft = '-30px';
    flash.style.marginTop = '-30px';
    explosion.classList.add('is-active');
    setTimeout(() => {
      window.location.href = './index.html';
    }, 1100);
  });
})();
