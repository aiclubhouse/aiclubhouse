/* AI Clubhouse — Interactive JS (Lando Norris-inspired) */

// Global error guard
window.addEventListener('error', (e) => {
  console.error('[AI Clubhouse]', e.error);
});

document.addEventListener('DOMContentLoaded', () => {
  try {

    // ── SCROLL PROGRESS BAR ──
    const progressBar = document.getElementById('scrollProgress');
    const updateProgress = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (progressBar && scrollHeight > 0) {
        progressBar.style.width = ((scrollTop / scrollHeight) * 100) + '%';
      }
    };

    // ── HEADER SCROLL STATE ──
    const header = document.getElementById('siteHeader');
    const updateHeader = () => {
      if (header) {
        header.classList.toggle('scrolled', window.pageYOffset > 50);
      }
    };

    // ── SCROLL-TO-TOP BUTTON ──
    const scrollTopBtn = document.querySelector('.scroll-top');
    const updateScrollTop = () => {
      if (scrollTopBtn) {
        scrollTopBtn.classList.toggle('visible', window.pageYOffset > 400);
      }
    };

    if (scrollTopBtn) {
      scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // ── COMBINED SCROLL HANDLER (single rAF loop) ──
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateProgress();
          updateHeader();
          updateScrollTop();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    // Init on load
    updateProgress();
    updateHeader();
    updateScrollTop();

    // ── SCROLL REVEAL (IntersectionObserver) ──
    if ('IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

      document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
      });

      // Fallback: reveal all after 2s
      setTimeout(() => {
        document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
          el.classList.add('visible');
        });
      }, 2000);
    } else {
      // No IO support — show everything
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    }

    // ── ANIMATED COUNTERS ──
    const counters = document.querySelectorAll('[data-count]');
    if (counters.length && 'IntersectionObserver' in window) {
      const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.count);
            const suffix = el.dataset.suffix || '';
            const duration = 1800;
            const fps = 60;
            const totalFrames = Math.round(duration / (1000 / fps));
            let frame = 0;

            const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

            const animate = () => {
              frame++;
              const progress = easeOutQuart(frame / totalFrames);
              const current = Math.round(target * progress);
              el.textContent = current + suffix;

              if (frame < totalFrames) {
                requestAnimationFrame(animate);
              } else {
                el.textContent = target + suffix;
              }
            };
            requestAnimationFrame(animate);
            counterObserver.unobserve(el);
          }
        });
      }, { threshold: 0.5 });

      counters.forEach(el => counterObserver.observe(el));
    }

    // ── SMOOTH SCROLL FOR ANCHOR LINKS ──
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          document.querySelector('.nav-links')?.classList.remove('open');
        }
      });
    });

    // ── NEWSLETTER FORM ──
    const form = document.getElementById('signup-form');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]').value;
        const btn = form.querySelector('button');
        const origText = btn.textContent;

        btn.textContent = 'Subscribing...';
        btn.disabled = true;

        try {
          await new Promise(r => setTimeout(r, 800));
          btn.textContent = '✓ Subscribed!';
          btn.style.background = '#10b981';
          form.querySelector('input').value = '';

          if (typeof gtag === 'function') {
            gtag('event', 'newsletter_signup', { email_domain: email.split('@')[1] });
          }

          setTimeout(() => {
            btn.textContent = origText;
            btn.style.background = '';
            btn.disabled = false;
          }, 3000);
        } catch (err) {
          btn.textContent = 'Error — Try Again';
          btn.style.background = '#ef4444';
          setTimeout(() => {
            btn.textContent = origText;
            btn.style.background = '';
            btn.disabled = false;
          }, 2000);
        }
      });
    }

    // ── AFFILIATE CLICK TRACKING ──
    document.querySelectorAll('a[rel*="sponsored"]').forEach(link => {
      link.addEventListener('click', () => {
        const tool = link.closest('.tool-card')?.querySelector('h3')?.textContent ||
                     link.closest('tr')?.querySelector('strong')?.textContent || 'unknown';
        if (typeof gtag === 'function') {
          gtag('event', 'affiliate_click', {
            tool_name: tool,
            destination: link.href,
            location: link.closest('section')?.id || 'unknown'
          });
        }
      });
    });

    // ── CONSOLE GREETING ──
    console.log('%c⚡ AI CLUBHOUSE', 'font-size: 24px; font-weight: 900; color: #c8ff00; background: #1a1e14; padding: 8px 16px; border-radius: 8px;');
    console.log('%cWhere AI Meets Community', 'font-size: 14px; color: #b4b8a5;');

  } catch (err) {
    console.error('[AI Clubhouse] Init error:', err);
    // Ensure content visible on error
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }
});
