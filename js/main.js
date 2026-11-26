// ==========================================================================
// FERRARI OFFICIAL HIGH-PERFORMANCE INTERACTIVE SCRIPT
// Audio Synthesis Engine • Telemetry HUD • Color Atelier • Video Switcher
// ==========================================================================

document.addEventListener('DOMContentLoaded', function () {
  
  // --------------------------------------------------------------------------
  // 1. HEADER SCROLL & MOBILE MENU DRAWER
  // --------------------------------------------------------------------------
  const header = document.querySelector('.header');
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const drawerClose = document.querySelector('.drawer-close');
  const drawerOverlay = document.querySelector('.drawer-overlay');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  function openDrawer() {
    mobileDrawer?.classList.add('open');
    drawerOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer?.classList.remove('open');
    drawerOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  }

  mobileToggle?.addEventListener('click', openDrawer);
  drawerClose?.addEventListener('click', closeDrawer);
  drawerOverlay?.addEventListener('click', closeDrawer);

  // --------------------------------------------------------------------------
  // 2. HERO VIDEO SWITCHER & AUDIO UNMUTE TOGGLE
  // --------------------------------------------------------------------------
  const heroVideo = document.querySelector('.hero-video');
  const videoPills = document.querySelectorAll('.video-pill');
  const soundToggleBtn = document.querySelector('.sound-toggle-btn');

  const videoSources = {
    '12cilindri': './assets/videos/Welcome_the_Ferrari_12Cilindri_1080P.mp4',
    '499p': './assets/videos/Ferrari_Reveals_the_New_Livery_of_the_Ferrari_499P_I_FIA_WEC_1080P.mp4',
    'ss2026': './assets/videos/YTDown.com_YouTube_Ferrari-Presents-Spring-Summer-2026-Camp_Media_ZCtpe9rOcr4_002_720p.mp4'
  };

  videoPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const videoKey = pill.getAttribute('data-video');
      if (heroVideo && videoSources[videoKey]) {
        videoPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        
        // Smooth switch
        heroVideo.style.opacity = '0';
        setTimeout(() => {
          heroVideo.src = videoSources[videoKey];
          heroVideo.load();
          heroVideo.play().catch(e => console.log('Autoplay:', e));
          heroVideo.style.opacity = '1';
        }, 200);
      }
    });
  });

  // Sound toggle (video mute/unmute)
  if (soundToggleBtn && heroVideo) {
    soundToggleBtn.addEventListener('click', () => {
      heroVideo.muted = !heroVideo.muted;
      if (!heroVideo.muted) {
        soundToggleBtn.classList.add('playing');
        soundToggleBtn.querySelector('.sound-text').textContent = 'SOUND ON';
      } else {
        soundToggleBtn.classList.remove('playing');
        soundToggleBtn.querySelector('.sound-text').textContent = 'SOUND OFF';
      }
    });
  }

  // --------------------------------------------------------------------------
  // 3. V12 ENGINE ACOUSTIC BENCH (WEB AUDIO SYNTHESIZER)
  // --------------------------------------------------------------------------
  let audioCtx = null;
  let masterGain = null;
  let osc1 = null;
  let osc2 = null;
  let subOsc = null;
  let isRevving = false;
  let currentRpm = 1000;
  let rpmInterval = null;

  const rpmDisplay = document.getElementById('gaugeRpm');
  const gaugeGlow = document.getElementById('gaugeGlow');
  const revBtn = document.getElementById('revHoldBtn');
  const shiftLeds = document.querySelectorAll('.shift-led');
  const heroRevBtn = document.getElementById('heroRevBtn');

  function initAudioEngine() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();

      masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(0, audioCtx.currentTime);
      masterGain.connect(audioCtx.destination);

      // Low rumble (Sub)
      subOsc = audioCtx.createOscillator();
      subOsc.type = 'triangle';
      subOsc.frequency.setValueAtTime(45, audioCtx.currentTime);

      // Primary cylinder fire (Sawtooth)
      osc1 = audioCtx.createOscillator();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(90, audioCtx.currentTime);

      // High harmonic intake rasp
      osc2 = audioCtx.createOscillator();
      osc2.type = 'sawtooth';
      osc2.frequency.setValueAtTime(180, audioCtx.currentTime);

      // Filter for warm mechanical resonance
      const filter = audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, audioCtx.currentTime);

      subOsc.connect(filter);
      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(masterGain);

      subOsc.start();
      osc1.start();
      osc2.start();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function updateShiftLights(rpm) {
    shiftLeds.forEach((led, idx) => {
      led.classList.remove('on');
      // 10 LEDs total
      const threshold = 2500 + idx * 700;
      if (rpm >= threshold) {
        led.classList.add('on');
      }
    });
  }

  function startRev() {
    initAudioEngine();
    isRevving = true;
    revBtn?.classList.add('active');
    gaugeGlow?.classList.add('revving');

    if (masterGain && audioCtx) {
      masterGain.gain.cancelScheduledValues(audioCtx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.35, audioCtx.currentTime + 0.05);
    }

    clearInterval(rpmInterval);
    rpmInterval = setInterval(() => {
      if (currentRpm < 9500) {
        currentRpm += 320;
        if (currentRpm > 9500) currentRpm = 9500;
      }

      if (rpmDisplay) rpmDisplay.textContent = currentRpm.toLocaleString();
      updateShiftLights(currentRpm);

      // Adjust acoustic frequencies proportional to RPM (V12 firing pulse: RPM / 60 * 6)
      if (audioCtx && osc1 && osc2 && subOsc) {
        const baseFreq = (currentRpm / 60) * 3; // harmonic order
        osc1.frequency.setTargetAtTime(baseFreq * 1.5, audioCtx.currentTime, 0.05);
        osc2.frequency.setTargetAtTime(baseFreq * 3.0, audioCtx.currentTime, 0.05);
        subOsc.frequency.setTargetAtTime(baseFreq * 0.75, audioCtx.currentTime, 0.05);
      }
    }, 25);
  }

  function stopRev() {
    isRevving = false;
    revBtn?.classList.remove('active');
    gaugeGlow?.classList.remove('revving');

    // Quick exhaust pop burble on release
    if (currentRpm > 6000 && audioCtx) {
      const popOsc = audioCtx.createOscillator();
      const popGain = audioCtx.createGain();
      popOsc.type = 'sine';
      popOsc.frequency.setValueAtTime(140, audioCtx.currentTime);
      popGain.gain.setValueAtTime(0.4, audioCtx.currentTime);
      popGain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.12);
      popOsc.connect(popGain);
      popGain.connect(audioCtx.destination);
      popOsc.start();
      popOsc.stop(audioCtx.currentTime + 0.12);
    }

    clearInterval(rpmInterval);
    rpmInterval = setInterval(() => {
      if (currentRpm > 1000) {
        currentRpm -= 240;
        if (currentRpm < 1000) currentRpm = 1000;
      } else {
        clearInterval(rpmInterval);
        if (masterGain && audioCtx) {
          masterGain.gain.cancelScheduledValues(audioCtx.currentTime);
          masterGain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.2);
        }
      }

      if (rpmDisplay) rpmDisplay.textContent = currentRpm.toLocaleString();
      updateShiftLights(currentRpm);

      if (audioCtx && osc1 && osc2 && subOsc) {
        const baseFreq = (currentRpm / 60) * 3;
        osc1.frequency.setTargetAtTime(baseFreq * 1.5, audioCtx.currentTime, 0.05);
        osc2.frequency.setTargetAtTime(baseFreq * 3.0, audioCtx.currentTime, 0.05);
        subOsc.frequency.setTargetAtTime(baseFreq * 0.75, audioCtx.currentTime, 0.05);
      }
    }, 20);
  }

  // Rev Button listeners (mouse, touch, keyboard)
  if (revBtn) {
    revBtn.addEventListener('mousedown', startRev);
    window.addEventListener('mouseup', () => { if (isRevving) stopRev(); });
    revBtn.addEventListener('touchstart', (e) => { e.preventDefault(); startRev(); }, { passive: false });
    window.addEventListener('touchend', () => { if (isRevving) stopRev(); });
  }

  // Hero "START ENGINE" button scrolls down and revs
  if (heroRevBtn) {
    heroRevBtn.addEventListener('click', () => {
      const bench = document.querySelector('.acoustic-bench');
      if (bench) {
        bench.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => {
          startRev();
          setTimeout(stopRev, 1400);
        }, 700);
      }
    });
  }

  // --------------------------------------------------------------------------
  // 4. BESPOKE COLOR STUDIO / ATELIER VISUALIZER
  // --------------------------------------------------------------------------
  const swatchButtons = document.querySelectorAll('.swatch-btn');
  const paintNameDisplay = document.getElementById('paintName');
  const paintCodeDisplay = document.getElementById('paintCode');
  const paintTypeDisplay = document.getElementById('paintType');
  const stageFloorLight = document.querySelector('.stage-floor-light');
  const carStageImage = document.querySelector('.car-stage-image');

  const paintData = {
    'rosso': {
      name: 'Rosso Corsa',
      code: 'FER 322',
      type: 'Three-layer Racing Gloss',
      color: '#d40000',
      image: 'assets/images/im3.jpg'
    },
    'giallo': {
      name: 'Giallo Modena',
      code: 'FER 102',
      type: 'Maranello Canary Gloss',
      color: '#ffd200',
      image: 'assets/images/ferrari.png'
    },
    'nero': {
      name: 'Nero Daytona',
      code: 'FER 901',
      type: 'Metallic Diamond Mica',
      color: '#1a1a24',
      image: 'assets/images/im1.jpg'
    },
    'bianco': {
      name: 'Bianco Avus',
      code: 'FER 100',
      type: 'Solid Tri-Coat Pearl',
      color: '#ffffff',
      image: 'assets/images/im2.webp'
    },
    'blu': {
      name: 'Blu Tour de France',
      code: 'FER 522',
      type: 'Heritage Metallic Tint',
      color: '#0b3c74',
      image: 'assets/images/im4.webp'
    }
  };

  swatchButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      swatchButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const colorKey = btn.getAttribute('data-color');
      const data = paintData[colorKey];
      if (data) {
        if (paintNameDisplay) paintNameDisplay.textContent = data.name;
        if (paintCodeDisplay) paintCodeDisplay.textContent = data.code;
        if (paintTypeDisplay) paintTypeDisplay.textContent = data.type;
        if (stageFloorLight) {
          stageFloorLight.style.background = data.color;
          stageFloorLight.style.opacity = colorKey === 'bianco' ? '0.7' : '0.5';
        }
        if (carStageImage && data.image) {
          carStageImage.style.opacity = '0';
          setTimeout(() => {
            carStageImage.src = data.image;
            carStageImage.style.opacity = '1';
          }, 180);
        }
      }
    });
  });

  // --------------------------------------------------------------------------
  // 5. MODEL SHOWCASE FILTER TABS
  // --------------------------------------------------------------------------
  const filterPills = document.querySelectorAll('.filter-pill');
  const modelCards = document.querySelectorAll('.featured-card');

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filterCategory = pill.getAttribute('data-filter');

      modelCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterCategory === 'all' || cardCategory === filterCategory) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 6. VIP TEST DRIVE & CONSULTATION MODAL
  // --------------------------------------------------------------------------
  const modalBackdrop = document.getElementById('testDriveModal');
  const modalCloseBtn = document.querySelector('.modal-close-btn');
  const modalTriggers = document.querySelectorAll('.open-test-drive');
  const modalForm = document.getElementById('modalTestDriveForm');

  function openModal(defaultModel) {
    if (modalBackdrop) {
      modalBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
      if (defaultModel && document.getElementById('modalModelSelect')) {
        document.getElementById('modalModelSelect').value = defaultModel;
      }
    }
  }

  function closeModal() {
    if (modalBackdrop) {
      modalBackdrop.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  modalTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const model = btn.getAttribute('data-model') || '';
      openModal(model);
    });
  });

  modalCloseBtn?.addEventListener('click', closeModal);
  modalBackdrop?.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  modalForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const model = document.getElementById('modalModelSelect')?.value || 'Ferrari';
    const name = document.getElementById('modalName')?.value || 'Guest';
    const refCode = 'FER-' + Math.floor(100000 + Math.random() * 900000);

    alert(`CONGRATULATIONS ${name.toUpperCase()}!\n\nYour VIP Test Drive reservation for the ${model} is confirmed.\nVIP Reference Code: ${refCode}\n\nA Scuderia Ferrari Concierge will contact you within 24 hours.`);
    modalForm.reset();
    closeModal();
  });

  // Contact Page Form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you! Your Ferrari concierge inquiry has been registered. An official representative will contact you shortly.');
      contactForm.reset();
    });
  }

  // --------------------------------------------------------------------------
  // 7. LIGHTBOX FOR GALLERY
  // --------------------------------------------------------------------------
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (!img) return;
      const overlay = document.createElement('div');
      overlay.style.cssText = 'position:fixed;inset:0;background:rgba(4,4,6,0.95);backdrop-filter:blur(15px);z-index:9999;display:flex;align-items:center;justify-content:center;cursor:pointer;padding:20px;animation:fadeIn 0.25s ease;';
      overlay.innerHTML = `
        <div style="position:relative;max-width:92%;max-height:92%;">
          <img src="${img.src}" style="max-width:100%;max-height:85vh;border-radius:16px;border:1px solid rgba(255,255,255,0.15);box-shadow:0 25px 60px rgba(0,0,0,0.9);">
          <div style="text-align:center;color:#fff;font-family:'Montserrat',sans-serif;margin-top:12px;font-size:0.9rem;letter-spacing:2px;text-transform:uppercase;">${img.alt || 'Ferrari Official'}</div>
        </div>
      `;
      overlay.addEventListener('click', () => overlay.remove());
      document.body.appendChild(overlay);
    });
  });

  // --------------------------------------------------------------------------
  // 8. SCROLL INDICATOR
  // --------------------------------------------------------------------------
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
      const nextSection = document.querySelector('.telemetry-strip') || document.querySelector('.section');
      nextSection?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // --------------------------------------------------------------------------
  // 9. SEARCH & USER MODALS (REALISTIC FEEDBACK)
  // --------------------------------------------------------------------------
  document.querySelector('.search-btn')?.addEventListener('click', () => {
    const query = prompt('Enter a Ferrari model, technology, or heritage topic to search:');
    if (query && query.trim()) {
      window.location.href = 'models.html';
    }
  });

  document.querySelector('.user-btn')?.addEventListener('click', () => {
    openModal('My Ferrari VIP Access');
  });

});
