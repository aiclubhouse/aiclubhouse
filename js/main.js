/* AI Clubhouse — Main JS */

// Global error logging
window.addEventListener('error', (e) => {
  console.error('[AI Clubhouse] Uncaught error:', e.error);
});

// Newsletter form handler
document.addEventListener('DOMContentLoaded', () => {
  try {
    const form = document.getElementById('signup-form');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]').value;
        const btn = form.querySelector('button');
        const origText = btn.textContent;
        
        btn.textContent = 'Subscribing...';
        btn.disabled = true;
        
        // TODO: Connect to GetResponse API
        // For now, store locally and show success
        try {
          // Simulate API call
          await new Promise(r => setTimeout(r, 800));
          btn.textContent = '✓ Subscribed!';
          btn.style.background = 'var(--success)';
          form.querySelector('input').value = '';
          
          // Track conversion
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

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Close mobile menu if open
          document.querySelector('.nav-links')?.classList.remove('open');
        }
      });
    });

    // Track affiliate link clicks
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
        
        // Log to console for debugging
        console.log(`[AI Clubhouse] Affiliate click: ${tool}`);
      });
    });

    // Animate elements on scroll (with feature detection)
    try {
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-in');
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.05, rootMargin: '50px' });

        document.querySelectorAll('.tool-card, .blog-card, .feature-card').forEach(el => {
          el.classList.add('animate-ready');
          observer.observe(el);
        });

        // Fallback: show everything after 1s in case observer doesn't fire
        setTimeout(() => {
          document.querySelectorAll('.animate-ready:not(.animate-in)').forEach(el => {
            el.classList.add('animate-in');
          });
        }, 1000);
      } else {
        // No IntersectionObserver support — animate everything immediately
        document.querySelectorAll('.tool-card, .blog-card, .feature-card').forEach(el => {
          el.classList.add('animate-ready', 'animate-in');
        });
      }
    } catch (err) {
      console.warn('[AI Clubhouse] Animation error:', err);
      // Ensure content is visible even if animation fails
      document.querySelectorAll('.animate-ready').forEach(el => {
        el.classList.add('animate-in');
      });
    }

    // Header scroll effect
    const header = document.querySelector('.site-header');
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
      } else {
        header.style.boxShadow = 'none';
      }
      lastScroll = currentScroll;
    });

    // Scroll progress bar
    const scrollProgress = document.getElementById('scrollProgress');
    if (scrollProgress) {
      window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollProgress.style.width = scrolled + '%';
      });
    }

    // Add hover‑lift class to interactive cards
    document.querySelectorAll('.tool-card, .blog-card, .feature-card, .panel, .interactive-card').forEach(card => {
      card.classList.add('hover-lift');
    });

    // Pulse animation on CTAs (buttons)
    const pulseButtons = document.querySelectorAll('.btn-primary, .nav-cta');
    pulseButtons.forEach(btn => {
      btn.classList.add('pulse');
    });

    // Mouse parallax effect for parallax containers
    const parallaxContainers = document.querySelectorAll('.parallax-container');
    if (parallaxContainers.length && window.innerWidth > 768) {
      document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) * 20 - 10;
        const y = (e.clientY / window.innerHeight) * 20 - 10;
        parallaxContainers.forEach(container => {
          const layers = container.querySelectorAll('.parallax-layer');
          layers.forEach((layer, i) => {
            const depth = (i + 1) * 0.5;
            layer.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
          });
        });
      });
    }

    // Staggered fade‑up for grid items
    const staggerGrids = document.querySelectorAll('.tools-grid, .features-grid, .interactive-grid');
    staggerGrids.forEach(grid => {
      grid.classList.add('stagger-child');
    });

    // Animated counters
    const counterElements = document.querySelectorAll('.number.countable');
    if (counterElements.length && 'IntersectionObserver' in window) {
      const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const count = parseInt(el.getAttribute('data-count'));
            const suffix = el.getAttribute('data-suffix') || '';
            const duration = 1500; // ms
            const step = Math.ceil(count / (duration / 16));
            let current = 0;
            const timer = setInterval(() => {
              current += step;
              if (current >= count) {
                current = count;
                clearInterval(timer);
              }
              el.textContent = current + suffix;
            }, 16);
            counterObserver.unobserve(el);
          }
        });
      }, { threshold: 0.5 });
      counterElements.forEach(el => counterObserver.observe(el));
    }

    // Console greeting
    console.log('%c🚀 AI Clubhouse — Interactive & Bold', 'font-size: 18px; font-weight: bold; color: #3b82f6;');
    console.log('%cWhere AI Meets Community', 'font-size: 14px; color: #94a3b8;');
  } catch (err) {
    console.error('[AI Clubhouse] Initialization error:', err);
  }
});
