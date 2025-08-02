// Enhanced Loader with particles and progress
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 3 + 's';
        particlesContainer.appendChild(particle);
    }
}

function updateProgress() {
    const progressText = document.getElementById('progressText');
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                document.getElementById('loader').classList.add('hidden');
                document.getElementById('pageContainer').classList.add('visible');
                initScrollAnimations();
            }, 500);
        }
        progressText.textContent = Math.floor(progress) + '%';
    }, 200);
}

// Liquid Page Transitions
function initPageTransitions() {
    const overlay = document.createElement('div');
    overlay.className = 'transition-overlay';
    
    const logo = document.createElement('div');
    logo.className = 'transition-logo';
    logo.textContent = 'AMRIT EV';
    
    const blob = document.createElement('div');
    blob.className = 'blob-shape';
    
    overlay.appendChild(logo);
    overlay.appendChild(blob);
    document.body.appendChild(overlay);

    window.showPage = function(pageId) {
        gsap.to(overlay, {
            clipPath: 'circle(75% at 50% 50%)',
            duration: 0.8,
            ease: 'power2.inOut',
            onStart: () => {
                gsap.to(logo, { opacity: 1, duration: 0.5 });
                gsap.to(blob, {
                    scale: 5,
                    borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                    duration: 1.2,
                    ease: 'elastic.out(1, 0.5)'
                });
            },
            onComplete: () => {
                document.querySelectorAll('.page').forEach(page => {
                    page.classList.remove('active');
                });
                document.getElementById(pageId).classList.add('active');
                
                gsap.to(overlay, {
                    clipPath: 'circle(0% at 50% 50%)',
                    duration: 0.8,
                    delay: 0.3,
                    ease: 'power2.inOut',
                    onStart: () => {
                        gsap.to(logo, { opacity: 0, duration: 0.3 });
                        gsap.to(blob, {
                            scale: 1,
                            borderRadius: '50%',
                            duration: 0.8
                        });
                    }
                });
            }
        });
    };
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    
    function handleScroll() {
        animatedElements.forEach(element => {
            if (isElementPartiallyInViewport(element)) {
                element.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();
}

function isElementPartiallyInViewport(el) {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    return (rect.top < windowHeight && rect.bottom > 0);
}

// Initialize everything
window.addEventListener('load', function() {
    createParticles();
    updateProgress();
    initPageTransitions();
});

// Glowing Liquid Cursor
function initLiquidCursor() {
  const cursor = document.getElementById('liquid-cursor');
  let lastX = 0, lastY = 0;
  let velocity = 0;

  // Main cursor movement
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
    
    // Calculate velocity
    const deltaX = e.clientX - lastX;
    const deltaY = e.clientY - lastY;
    velocity = Math.min(Math.sqrt(deltaX*deltaX + deltaY*deltaY) * 0.3, 10);
    lastX = e.clientX;
    lastY = e.clientY;

    // Create liquid trail
    if (velocity > 3) {
      const trail = document.createElement('div');
      trail.className = 'liquid-trail';
      trail.style.left = `${e.clientX}px`;
      trail.style.top = `${e.clientY}px`;
      trail.style.background = `hsl(${Math.random() * 60 + 160}, 100%, 50%)`;
      document.body.appendChild(trail);
      
      // Remove after animation
      setTimeout(() => trail.remove(), 800);
    }
  });

  // Click ripple
  document.addEventListener('click', (e) => {
    // Reset cursor position
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
    
    // Animate ripple
    cursor.style.transform = 'translate(-50%, -50%) scale(3)';
    cursor.style.opacity = '0.8';
    
    // Return to normal
    setTimeout(() => {
      cursor.style.transform = 'translate(-50%, -50%) scale(0)';
      cursor.style.opacity = '0';
    }, 300);
    
    // Create splash particles
    for (let i = 0; i < 8; i++) {
      const particle = document.createElement('div');
      particle.className = 'liquid-trail';
      particle.style.left = `${e.clientX}px`;
      particle.style.top = `${e.clientY}px`;
      particle.style.width = `${10 + Math.random() * 10}px`;
      particle.style.height = particle.style.width;
      particle.style.animationDuration = `${0.5 + Math.random() * 0.5}s`;
      
      // Random direction
      const angle = Math.random() * Math.PI * 2;
      const distance = 5 + Math.random() * 15;
      particle.style.transform = `translate(-50%, -50%) translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`;
      
      document.body.appendChild(particle);
      setTimeout(() => particle.remove(), 1000);
    }
  });
}

// Initialize
window.addEventListener('load', initLiquidCursor);