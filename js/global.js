(function() {
  'use strict';

  // ===== 1. Global Background Music =====
  function initMusic() {
    if (window.location.pathname.includes('music.html')) return;

    const audio = new Audio('music/love.mp3');
    audio.loop = true;
    audio.volume = 0.4;

    const isPlaying = localStorage.getItem('musicPlaying') === 'true';

    const btn = document.createElement('button');
    btn.id = 'globalMusicBtn';
    btn.setAttribute('aria-label', 'Toggle music');
    btn.textContent = isPlaying ? '♪' : '♪';
    btn.style.cssText = `
      position: fixed; bottom: 5rem; right: 1.2rem; z-index: 999;
      width: 42px; height: 42px; border-radius: 50%; border: none;
      background: var(--primary, #FF6B9D); color: #fff;
      font-size: 1.2rem; cursor: pointer;
      box-shadow: 0 3px 12px rgba(255,107,157,0.4);
      transition: transform 0.3s, opacity 0.3s;
      display: flex; align-items: center; justify-content: center;
    `;
    document.body.appendChild(btn);

    let playing = false;

    function setPlaying(state) {
      playing = state;
      localStorage.setItem('musicPlaying', state);
      btn.style.animation = state ? 'spin 2s linear infinite' : 'none';
      btn.style.opacity = state ? '1' : '0.6';
    }

    if (isPlaying) {
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }

    btn.addEventListener('click', () => {
      if (playing) {
        audio.pause();
        setPlaying(false);
      } else {
        audio.play().then(() => setPlaying(true)).catch(() => {});
      }
    });
  }

  // ===== 2. Page Transition =====
  function initPageTransition() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.6s ease';
    requestAnimationFrame(() => {
      document.body.style.opacity = '1';
    });

    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href]');
      if (!link) return;
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('javascript')) return;

      e.preventDefault();
      document.body.style.opacity = '0';
      setTimeout(() => {
        window.location.href = href;
      }, 400);
    });
  }

  // ===== 3. Global Navigation =====
  function initNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    const navItems = [
      { icon: '🏠', label: '首页', href: 'index.html' },
      { icon: '💌', label: '回忆', href: 'memories.html' },
      { icon: '📷', label: '相册', href: 'gallery.html' },
      { icon: '💕', label: '关于她', href: 'about.html' },
      { icon: '🎵', label: '音乐', href: 'music.html' },
      { icon: '❤️', label: '结尾', href: 'ending.html' },
    ];

    const nav = document.createElement('nav');
    nav.id = 'globalNav';
    nav.innerHTML = navItems.map(item => {
      const active = currentPage === item.href ? ' active' : '';
      return `<a href="${item.href}" class="gnav-item${active}">
        <span class="gnav-icon">${item.icon}</span>
        <span class="gnav-label">${item.label}</span>
      </a>`;
    }).join('');
    document.body.appendChild(nav);

    const style = document.createElement('style');
    style.textContent = `
      /* Mobile: bottom tab bar */
      #globalNav {
        position: fixed; bottom: 0; left: 0; right: 0;
        height: 56px; display: flex; align-items: center; justify-content: space-around;
        background: rgba(255,240,245,0.85);
        backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
        border-top: 1px solid rgba(255,179,204,0.3);
        z-index: 998; padding: 0 0.5rem;
      }
      .gnav-item {
        display: flex; flex-direction: column; align-items: center; gap: 2px;
        text-decoration: none; color: #666; font-size: 0.7rem;
        padding: 0.4rem; border-radius: 8px; transition: all 0.3s;
      }
      .gnav-icon { font-size: 1.1rem; }
      .gnav-label { font-family: var(--font-cn, sans-serif); }
      .gnav-item.active { color: #FF6B9D; }
      .gnav-item.active .gnav-icon { transform: scale(1.15); }

      /* Desktop: left sidebar */
      @media (min-width: 769px) {
        #globalNav {
          top: 0; bottom: 0; left: 0; right: auto;
          width: 56px; height: 100vh;
          flex-direction: column; justify-content: center; gap: 0.5rem;
          border-top: none; border-right: 1px solid rgba(255,179,204,0.3);
          transition: width 0.3s ease;
          overflow: hidden;
        }
        #globalNav:hover { width: 130px; }
        .gnav-item { flex-direction: row; gap: 0.6rem; width: 100%; padding: 0.6rem 1rem; }
        .gnav-label { opacity: 0; white-space: nowrap; transition: opacity 0.3s; font-size: 0.85rem; }
        #globalNav:hover .gnav-label { opacity: 1; }
        .gnav-item:hover { background: rgba(255,107,157,0.08); }

        /* Adjust body padding for desktop nav */
        body { padding-left: 56px; }
      }

      /* Mobile body padding for bottom nav */
      @media (max-width: 768px) {
        body { padding-bottom: 56px; }
      }

      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
  }

  // ===== 4. Loading Screen =====
  function initLoader() {
    const loader = document.createElement('div');
    loader.id = 'globalLoader';
    loader.innerHTML = `
      <div class="loader-inner">
        <div class="loader-heart-shape"></div>
        <p>Loading our memories...</p>
      </div>
    `;
    document.body.prepend(loader);

    const loaderStyle = document.createElement('style');
    loaderStyle.textContent = `
      #globalLoader {
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: #FFF0F5; display: flex; align-items: center; justify-content: center;
        z-index: 99999; transition: opacity 0.5s ease, visibility 0.5s ease;
      }
      #globalLoader.hidden { opacity: 0; visibility: hidden; pointer-events: none; }
      .loader-inner { text-align: center; }
      .loader-inner p {
        font-family: var(--font-en, 'Pacifico', cursive);
        color: #FF6B9D; font-size: 0.95rem; margin-top: 1rem;
      }
      .loader-heart-shape {
        width: 30px; height: 30px; margin: 0 auto;
        background: #FF6B9D; position: relative;
        transform: rotate(45deg); animation: loaderPulse 0.8s ease infinite;
      }
      .loader-heart-shape::before, .loader-heart-shape::after {
        content: ''; position: absolute;
        width: 30px; height: 30px; background: #FF6B9D; border-radius: 50%;
      }
      .loader-heart-shape::before { top: -15px; left: 0; }
      .loader-heart-shape::after { top: 0; left: -15px; }
      @keyframes loaderPulse {
        0%, 100% { transform: rotate(45deg) scale(1); }
        50% { transform: rotate(45deg) scale(1.15); }
      }
    `;
    document.head.appendChild(loaderStyle);

    function hideLoader() {
      loader.classList.add('hidden');
    }

    window.addEventListener('load', () => setTimeout(hideLoader, 300));
    setTimeout(hideLoader, 1500);
  }

  // ===== 5. Floating Hearts =====
  function initFloatingHearts() {
    const heartStyle = document.createElement('style');
    heartStyle.textContent = `
      .deco-heart {
        position: fixed; top: -30px; pointer-events: none; z-index: 0;
        animation: decoFall linear forwards;
        font-size: 16px; opacity: 0.5;
      }
      @keyframes decoFall {
        0% { transform: translateY(0) rotate(0deg); opacity: 0.6; }
        100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
      }
    `;
    document.head.appendChild(heartStyle);

    function spawnHeart() {
      const heart = document.createElement('span');
      heart.classList.add('deco-heart');
      heart.textContent = '♥';
      heart.style.left = (60 + Math.random() * 35) + 'vw';
      heart.style.fontSize = (12 + Math.random() * 10) + 'px';
      heart.style.color = ['#FF6B9D','#FFB3CC','#FF4081'][Math.floor(Math.random()*3)];
      const duration = 5 + Math.random() * 4;
      heart.style.animationDuration = duration + 's';
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), duration * 1000);
    }

    function scheduleNext() {
      const delay = 3000 + Math.random() * 5000;
      setTimeout(() => {
        spawnHeart();
        scheduleNext();
      }, delay);
    }
    scheduleNext();
  }

  // ===== 6. Back to Top =====
  function initBackToTop() {
    const btn = document.createElement('button');
    btn.id = 'backToTop';
    btn.textContent = '↑';
    btn.setAttribute('aria-label', 'Back to top');
    btn.style.cssText = `
      position: fixed; bottom: 5rem; right: 4.5rem; z-index: 997;
      width: 38px; height: 38px; border-radius: 50%; border: none;
      background: var(--primary, #FF6B9D); color: #fff;
      font-size: 1.1rem; cursor: pointer;
      box-shadow: 0 3px 10px rgba(255,107,157,0.3);
      opacity: 0; visibility: hidden;
      transition: opacity 0.3s, visibility 0.3s, transform 0.3s;
      display: flex; align-items: center; justify-content: center;
    `;
    document.body.appendChild(btn);

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (window.scrollY > 300) {
          btn.style.opacity = '1';
          btn.style.visibility = 'visible';
        } else {
          btn.style.opacity = '0';
          btn.style.visibility = 'hidden';
        }
        ticking = false;
      });
    });
  }

  // ===== Init All =====
  function init() {
    initLoader();
    initPageTransition();
    initNav();
    initMusic();
    initFloatingHearts();
    initBackToTop();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
