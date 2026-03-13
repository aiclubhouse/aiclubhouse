/* AI Clubhouse — Interactive JS v2 (Lando Norris-level interactivity) */

window.addEventListener('error', (e) => console.error('[AIC]', e.error));

document.addEventListener('DOMContentLoaded', () => {
  try {

    // ── LENIS SMOOTH SCROLL (CDN) ──
    const lenisScript = document.createElement('script');
    lenisScript.src = 'https://unpkg.com/lenis@1.1.18/dist/lenis.min.js';
    lenisScript.onload = () => {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
      // Make lenis available globally for anchor scrolls
      window.__lenis = lenis;
    };
    document.head.appendChild(lenisScript);

    // ── SCROLL PROGRESS ──
    const progressBar = document.getElementById('scrollProgress');

    // ── HEADER STATE ──
    const header = document.getElementById('siteHeader');

    // ── SCROLL-TO-TOP ──
    const scrollTopBtn = document.querySelector('.scroll-top');
    if (scrollTopBtn) {
      scrollTopBtn.addEventListener('click', () => {
        if (window.__lenis) {
          window.__lenis.scrollTo(0);
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    }

    // ── SINGLE SCROLL HANDLER (rAF batched) ──
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const y = window.pageYOffset;
          const h = document.documentElement.scrollHeight - window.innerHeight;

          if (progressBar && h > 0) progressBar.style.width = ((y / h) * 100) + '%';
          if (header) header.classList.toggle('scrolled', y > 50);
          if (scrollTopBtn) scrollTopBtn.classList.toggle('visible', y > 500);

          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    // ── SCROLL REVEAL ──
    if ('IntersectionObserver' in window) {
      const revealObs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            revealObs.unobserve(e.target);
          }
        });
      }, { threshold: 0.06, rootMargin: '0px 0px -60px 0px' });
      document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

      // Fallback
      setTimeout(() => {
        document.querySelectorAll('.reveal:not(.visible)').forEach(el => el.classList.add('visible'));
      }, 3000);
    } else {
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    }

    // ── TEXT LINE REVEAL (Lando-style word-by-word) ──
    document.querySelectorAll('.text-reveal').forEach(el => {
      const words = el.textContent.trim().split(/\s+/);
      el.innerHTML = words.map((w, i) =>
        `<span class="word-wrap"><span class="word" style="animation-delay:${i * 0.06}s">${w}</span></span>`
      ).join(' ');
    });

    // ── ANIMATED COUNTERS (easeOutQuart) ──
    const counters = document.querySelectorAll('[data-count]');
    if (counters.length && 'IntersectionObserver' in window) {
      const cObs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const el = e.target;
            const target = parseInt(el.dataset.count);
            const suffix = el.dataset.suffix || '';
            const frames = 90;
            let frame = 0;
            const ease = t => 1 - Math.pow(1 - t, 4);
            const tick = () => {
              frame++;
              el.textContent = Math.round(target * ease(frame / frames)) + suffix;
              if (frame < frames) requestAnimationFrame(tick);
              else el.textContent = target + suffix;
            };
            requestAnimationFrame(tick);
            cObs.unobserve(el);
          }
        });
      }, { threshold: 0.5 });
      counters.forEach(el => cObs.observe(el));
    }

    // ── MARQUEE TICKER ──
    document.querySelectorAll('.marquee').forEach(marquee => {
      const inner = marquee.querySelector('.marquee-inner');
      if (!inner) return;
      // Clone content for seamless loop
      const clone = inner.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      marquee.appendChild(clone);
    });

    // ── MAGNETIC HOVER (buttons) ──
    if (window.innerWidth > 768) {
      document.querySelectorAll('.btn-primary, .btn-secondary, .nav-cta').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });
        btn.addEventListener('mouseleave', () => {
          btn.style.transform = '';
        });
      });
    }

    // ── TILT EFFECT ON CARDS ──
    if (window.innerWidth > 768) {
      document.querySelectorAll('.tool-card, .blog-card, .panel').forEach(card => {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          card.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-6px)`;
        });
        card.addEventListener('mouseleave', () => {
          card.style.transform = '';
        });
      });
    }

    // ── SMOOTH ANCHOR SCROLLS ──
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          if (window.__lenis) {
            window.__lenis.scrollTo(target);
          } else {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
          document.querySelector('.nav-links')?.classList.remove('open');
        }
      });
    });

    // ── NEWSLETTER ──
    const form = document.getElementById('signup-form');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]').value;
        const btn = form.querySelector('button');
        const orig = btn.textContent;
        btn.textContent = 'Subscribing...';
        btn.disabled = true;
        try {
          await new Promise(r => setTimeout(r, 800));
          btn.textContent = '✓ Subscribed!';
          btn.style.background = '#10b981';
          form.querySelector('input').value = '';
          if (typeof gtag === 'function') gtag('event', 'newsletter_signup', { email_domain: email.split('@')[1] });
          setTimeout(() => { btn.textContent = orig; btn.style.background = ''; btn.disabled = false; }, 3000);
        } catch {
          btn.textContent = 'Error — Retry';
          btn.style.background = '#ef4444';
          setTimeout(() => { btn.textContent = orig; btn.style.background = ''; btn.disabled = false; }, 2000);
        }
      });
    }

    // ── AFFILIATE TRACKING ──
    document.querySelectorAll('a[rel*="sponsored"]').forEach(link => {
      link.addEventListener('click', () => {
        const tool = link.closest('.tool-card')?.querySelector('h3')?.textContent ||
                     link.closest('tr')?.querySelector('strong')?.textContent || 'unknown';
        if (typeof gtag === 'function') {
          gtag('event', 'affiliate_click', { tool_name: tool, destination: link.href });
        }
      });
    });

    // ── CUSTOM CURSOR (desktop only) ──
    if (window.innerWidth > 768) {
      const cursor = document.createElement('div');
      cursor.className = 'custom-cursor';
      document.body.appendChild(cursor);
      const cursorDot = document.createElement('div');
      cursorDot.className = 'custom-cursor-dot';
      document.body.appendChild(cursorDot);

      let cx = 0, cy = 0, dx = 0, dy = 0;
      document.addEventListener('mousemove', (e) => {
        dx = e.clientX;
        dy = e.clientY;
        cursorDot.style.left = dx + 'px';
        cursorDot.style.top = dy + 'px';
      });
      function animateCursor() {
        cx += (dx - cx) * 0.12;
        cy += (dy - cy) * 0.12;
        cursor.style.left = cx + 'px';
        cursor.style.top = cy + 'px';
        requestAnimationFrame(animateCursor);
      }
      requestAnimationFrame(animateCursor);

      // Enlarge cursor on hover over interactive elements
      document.querySelectorAll('a, button, .tool-card, .blog-card, .panel, .feature-card').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
      });
    }

    console.log('%c⚡ AI CLUBHOUSE', 'font-size:24px;font-weight:900;color:#60a5fa;background:#0a1628;padding:8px 16px;border-radius:8px;');

  } catch (err) {
    console.error('[AIC] Init:', err);
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }
});
