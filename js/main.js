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

    // Animate elements on scroll
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
  } catch (err) {
    console.error('[AI Clubhouse] Initialization error:', err);
  }
});
