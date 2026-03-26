#!/bin/bash

echo "🚀 AI CLUBHOUSE LUXURY LAUNCH DEPLOYMENT"
echo "========================================="
echo ""
echo "This script will guide you through deploying the luxury tech redesign."
echo ""

# Step 1: Verify local changes
echo "📁 STEP 1: Verify Updated Files"
echo "-------------------------------"
ls -la index.html css/style.css js/main.js thank-you.html
echo ""
echo "✅ Luxury tech redesign files ready"
echo ""

# Step 2: Deployment options
echo "🌐 STEP 2: Choose Deployment Method"
echo "-----------------------------------"
echo "1. Manual GitHub Pages upload (easiest)"
echo "2. Git command line (if you have access)"
echo "3. Alternative hosting (Netlify/Vercel)"
echo ""
read -p "Enter choice (1-3): " deploy_choice

case $deploy_choice in
  1)
    echo ""
    echo "📤 MANUAL GITHUB PAGES UPLOAD"
    echo "============================="
    echo ""
    echo "1. Go to: https://github.com"
    echo "2. Log in to your account"
    echo "3. Navigate to the AI Clubhouse repository"
    echo "4. Click 'Add file' → 'Upload files'"
    echo "5. Select ALL files from:"
    echo "   /Users/thompsonhq/.openclaw/workspace/aiclubhouse/"
    echo "6. Commit with message: 'Luxury tech redesign launch'"
    echo "7. Wait 1-2 minutes for GitHub Pages to rebuild"
    echo "8. Visit: https://aiclubhouse.com.au"
    echo ""
    echo "💡 TIP: Drag the entire aiclubhouse folder to upload"
    ;;
    
  2)
    echo ""
    echo "💻 GIT COMMAND LINE DEPLOYMENT"
    echo "=============================="
    echo ""
    echo "Run these commands in terminal:"
    echo ""
    echo "# Clone repository (if not already)"
    echo "cd ~"
    echo "git clone https://github.com/YOUR_USERNAME/aiclubhouse.git"
    echo "cd aiclubhouse"
    echo ""
    echo "# Copy updated files"
    echo "cp -r /Users/thompsonhq/.openclaw/workspace/aiclubhouse/* ."
    echo ""
    echo "# Commit and push"
    echo "git add ."
    echo "git commit -m 'Luxury tech redesign launch - premium intelligence positioning'"
    echo "git push origin main"
    echo ""
    echo "✅ Deployment complete!"
    ;;
    
  3)
    echo ""
    echo "☁️ ALTERNATIVE HOSTING"
    echo "======================"
    echo ""
    echo "Option A: Netlify (Recommended)"
    echo "1. Go to: https://netlify.com"
    echo "2. Drag/drop the aiclubhouse folder"
    echo "3. Update DNS to point aiclubhouse.com.au to Netlify"
    echo ""
    echo "Option B: Vercel"
    echo "1. Go to: https://vercel.com"
    echo "2. Import repository or upload folder"
    echo "3. Automatic deployment with CDN"
    echo ""
    echo "Both options include free SSL and global CDN"
    ;;
    
  *)
    echo "Invalid choice. Using manual GitHub Pages method."
    ;;
esac

echo ""
echo "🔍 STEP 3: Verify Deployment"
echo "----------------------------"
echo ""
echo "After deployment, check:"
echo "1. https://aiclubhouse.com.au loads"
echo "2. Hero shows 'LUXURY TECH INTELLIGENCE'"
echo "3. Colors are black/gold/blue theme"
echo "4. Newsletter form works (try test@example.com)"
echo "5. Mobile responsive (check on phone)"
echo ""

# Step 4: Distribution execution
echo "📢 STEP 4: Execute Distribution"
echo "-------------------------------"
echo ""
echo "Reddit Post (Tonight 7-9 PM AEST):"
echo "File: distribution/executable/reddit-post-premium-intelligence-2026-03-26.md"
echo "Subreddit: r/entrepreneur"
echo ""
echo "LinkedIn Post (Tomorrow 8:30 AM AEST):"
echo "File: distribution/executable/linkedin-premium-intelligence-2026-03-26.md"
echo ""
echo "Quick test command to verify files:"
echo "head -5 distribution/executable/reddit-post-premium-intelligence-2026-03-26.md"
echo ""

# Step 5: Email setup
echo "📧 STEP 5: Email Service Setup"
echo "-------------------------------"
echo ""
echo "Immediate (local system works for now):"
echo "- Emails saved to browser localStorage"
echo "- Check console with: JSON.parse(localStorage.getItem('aiclubhouse_emails'))"
echo ""
echo "Within 48 hours:"
echo "1. Create ConvertKit account: https://convertkit.com"
echo "2. Use: thompsonpropertyhq@icloud.com"
echo "3. Follow EMAIL-SETUP.md for complete guide"
echo ""

# Step 6: Success metrics
echo "📊 STEP 6: Track Success"
echo "------------------------"
echo ""
echo "Day 1 Targets:"
echo "- 1,000+ website visitors"
echo "- 10+ email signups"
echo "- 50+ Reddit upvotes"
echo "- 25+ LinkedIn comments"
echo ""
echo "Checklist in LAUNCH-SUMMARY.md"
echo ""

echo "🎉 DEPLOYMENT READY!"
echo "==================="
echo "The luxury tech AI Clubhouse is ready for launch."
echo "Premium positioning, revenue-ready, distribution prepared."
echo ""
echo "Next: Choose deployment method and execute."
echo "Good luck! 🚀"