#!/usr/bin/env python3
import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract head (everything up to <body>)
head_match = re.search(r'(.*?)<body>', content, re.DOTALL)
head = head_match.group(1) if head_match else ''
# Extract header (from <body> up to <!-- ═══ HERO ═══ -->)
header_match = re.search(r'<body>(.*?)<!-- ═══ HERO ═══ -->', content, re.DOTALL)
header = header_match.group(1) if header_match else ''
# Extract footer (from <!-- ═══ FOOTER ═══ --> to </body>)
footer_match = re.search(r'(<!-- ═══ FOOTER ═══ -->.*?)</body>', content, re.DOTALL)
footer = footer_match.group(1) if footer_match else ''
# Extract tool cards (the whole tools-grid div)
tools_match = re.search(r'(<div class="tools-grid">.*?</div>\s*</div>)', content, re.DOTALL)
tools_grid = tools_match.group(1) if tools_match else ''
# Extract features grid (features-grid)
features_match = re.search(r'(<div class="features-grid">.*?</div>\s*</div>)', content, re.DOTALL)
features_grid = features_match.group(1) if features_match else ''
# Extract blog grid (blog-grid)
blog_match = re.search(r'(<div class="blog-grid">.*?</div>\s*</div>)', content, re.DOTALL)
blog_grid = blog_match.group(1) if blog_match else ''
# Extract comparison table (comparison-table)
table_match = re.search(r'(<table class="comparison-table">.*?</table>)', content, re.DOTALL)
comparison_table = table_match.group(1) if table_match else ''
# Extract community features grid (the second features-grid? we'll use the first one for community)
# We'll just reuse features_grid for community but we need separate extraction.
# Let's extract the community section manually later.

print(f'Head length: {len(head)}')
print(f'Header length: {len(header)}')
print(f'Footer length: {len(footer)}')
print(f'Tools grid length: {len(tools_grid)}')
print(f'Features grid length: {len(features_grid)}')
print(f'Blog grid length: {len(blog_grid)}')
print(f'Comparison table length: {len(comparison_table)}')

# Now construct new body
new_body = f'''<body>
{header}
  <!-- ═══ CINEMATIC HERO ═══ -->
  <section class="cinematic-hero">
    <div class="container">
      <div class="hero-badge">🚀 Australia's #1 AI Community Hub</div>
      <h1>
        Where <span class="gradient-text">AI</span> Meets<br>
        <span class="gradient-text">Community</span>
      </h1>
      <p class="hero-subtitle">
        Cut through the noise. We test, review, and recommend the best AI tools so you don't have to. 
        Join thousands of creators, marketers, and entrepreneurs building with AI.
      </p>
      <div class="hero-actions">
        <a href="#tools" class="btn-primary">🔍 Explore AI Tools</a>
        <a href="#newsletter" class="btn-secondary">📬 Get the Weekly Digest</a>
      </div>
      <div class="hero-stats">
        <div class="hero-stat">
          <div class="number">50+</div>
          <div class="label">AI Tools Reviewed</div>
        </div>
        <div class="hero-stat">
          <div class="number">10K+</div>
          <div class="label">Community Members</div>
        </div>
        <div class="hero-stat">
          <div class="number">Weekly</div>
          <div class="label">Expert Guides</div>
        </div>
      </div>
    </div>
  </section>

  <!-- ═══ SPLIT‑SCREEN: AI TOOLS ═══ -->
  <section class="split-screen" id="tools">
    <div class="split-content">
      <div class="tag">🏆 Top Picks</div>
      <h2>Best AI Tools — Tested & Recommended</h2>
      <p>Every tool reviewed by our team. Real tests, real results, honest opinions.</p>
      <a href="/blog/" class="btn-secondary">View All 50+ AI Tools →</a>
    </div>
    <div class="split-visual">
      {tools_grid}
    </div>
  </section>

  <!-- ═══ SPLIT‑SCREEN REVERSE: WHY US ═══ -->
  <section class="split-screen reverse" style="background:var(--bg-secondary); border-top:1px solid var(--border); border-bottom:1px solid var(--border);">
    <div class="split-visual">
      {features_grid}
    </div>
    <div class="split-content">
      <div class="tag">💡 Why Us</div>
      <h2>Not Just Reviews — Real Community</h2>
      <p>We don't just list tools. We test them, compare them, and help you pick the right one for YOUR use case.</p>
      <a href="#newsletter" class="btn-primary">Join the Community →</a>
    </div>
  </section>

  <!-- ═══ INTERACTIVE GRID: BLOG ═══ -->
  <section class="section" id="blog">
    <div class="container">
      <div class="section-header">
        <div class="tag">📖 Latest Insights</div>
        <h2>AI Tutorials, Guides & News</h2>
        <p>Practical content to help you get the most out of AI tools in your business.</p>
      </div>
      <div class="interactive-grid">
        {blog_grid}
      </div>
      <div style="text-align:center; margin-top:40px;">
        <a href="/blog/" class="btn-secondary">View All Articles →</a>
      </div>
    </div>
  </section>

  <!-- ═══ PARALLAX: COMPARISON TABLE ═══ -->
  <section class="parallax-section">
    <div class="parallax-bg" style="background-image: url('/img/banner.svg');"></div>
    <div class="container">
      <div class="section-header">
        <div class="tag">⚔️ Head-to-Head</div>
        <h2>AI Writing Tools Compared</h2>
        <p>Quick-reference comparison of the top AI content tools.</p>
      </div>
      {comparison_table}
    </div>
  </section>

  <!-- ═══ TRI‑PANEL: COMMUNITY ═══ -->
  <section class="section" id="community">
    <div class="container">
      <div class="section-header">
        <div class="tag">👥 Join the Conversation</div>
        <h2>The AI Clubhouse Community</h2>
        <p>Connect with creators, marketers, and entrepreneurs who are building with AI every day.</p>
      </div>
      <div class="tri-panel">
        <div class="panel">
          <div class="feature-icon">💬</div>
          <h3>Discord Community</h3>
          <p>Chat with fellow AI enthusiasts, share your wins, get feedback on your AI workflows, and discover new tools daily.</p>
          <div style="margin-top:16px;">
            <a href="#" class="btn-primary" style="font-size:0.9rem; padding:10px 24px;">Join Discord →</a>
          </div>
        </div>
        <div class="panel">
          <div class="feature-icon">📬</div>
          <h3>Weekly Newsletter</h3>
          <p>Every Saturday: curated AI tool launches, trending tutorials, community highlights, and exclusive deals. Free forever.</p>
          <div style="margin-top:16px;">
            <a href="#newsletter" class="btn-primary" style="font-size:0.9rem; padding:10px 24px;">Subscribe Free →</a>
          </div>
        </div>
        <div class="panel">
          <div class="feature-icon">🎓</div>
          <h3>AI Masterclass (Coming Soon)</h3>
          <p>In-depth video courses on using AI tools to grow your business. From prompting to full automation. Launching Q2 2026.</p>
          <div style="margin-top:16px;">
            <a href="#newsletter" class="btn-secondary" style="font-size:0.9rem; padding:10px 24px;">Get Early Access →</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ═══ NEWSLETTER ═══ -->
  <section class="section newsletter-section" id="newsletter">
    <div class="newsletter-inner">
      <h2>🧠 The AI Clubhouse Weekly</h2>
      <p>Join 10,000+ subscribers getting the best AI tools, tutorials, and news every Saturday. Free. No spam. Unsubscribe anytime.</p>
      <form class="newsletter-form" action="#" method="post" id="signup-form">
        <input type="email" name="email" placeholder="Enter your email address" required>
        <button type="submit">Subscribe →</button>
      </form>
      <div class="newsletter-note">🔒 We respect your privacy. Unsubscribe with one click.</div>
    </div>
  </section>

{footer}
</body>'''

# Combine head + new_body
new_html = head + new_body

# Write backup
import shutil
shutil.copy('index.html', 'index.html.backup3')

# Write new file
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_html)

print('Rebuild complete. Backup saved as index.html.backup3')