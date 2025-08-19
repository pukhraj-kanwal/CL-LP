#!/bin/bash

echo "🔍 Firebase Hosting SSL/HTTPS Troubleshooting"
echo "============================================="
echo ""

# Check if firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI not found. Please install it first."
    exit 1
fi

echo "1️⃣ Checking Firebase project setup..."
firebase use --add 2>/dev/null || firebase use

echo ""
echo "2️⃣ Current hosting sites:"
firebase hosting:sites:list

echo ""
echo "3️⃣ Testing Firebase default domains:"
echo ""
echo "Default domains should have HTTPS automatically:"
echo "✅ https://cargolynx-main.web.app"
echo "✅ https://cargolynx-main.firebaseapp.com"
echo ""
echo "Test these URLs in your browser. Do they work with HTTPS?"
read -p "Press Enter to continue..."

echo ""
echo "4️⃣ If using a custom domain, check these:"
echo ""
echo "a) Domain Status in Firebase Console:"
echo "   https://console.firebase.google.com/project/cargolynx-main/hosting/sites"
echo ""
echo "b) DNS Propagation (can take 24-48 hours):"
echo "   Check if DNS has propagated: https://dnschecker.org"
echo ""
echo "c) SSL Certificate Status:"
echo "   - 'Pending' = Still provisioning (wait 24-48h)"
echo "   - 'Connected' = Should have HTTPS"
echo ""

echo "5️⃣ Common Issues & Fixes:"
echo ""
echo "Issue 1: Browser showing 'Not Secure'"
echo "Fix: Clear browser cache or try incognito mode"
echo ""
echo "Issue 2: Default Firebase domains not HTTPS"
echo "Fix: Deploy again with: firebase deploy --only hosting"
echo ""
echo "Issue 3: Custom domain not working"
echo "Fix: Verify DNS records match Firebase requirements exactly"
echo ""

echo "6️⃣ Quick Re-deployment:"
read -p "Would you like to redeploy now? (y/n): " redeploy
if [[ $redeploy == "y" ]]; then
    echo "Deploying..."
    firebase deploy --only hosting --project cargolynx-main
fi

echo ""
echo "7️⃣ Check deployment status:"
firebase hosting:channel:list

echo ""
echo "📝 Additional Debugging:"
echo "- Visit: https://console.firebase.google.com/project/cargolynx-main/hosting"
echo "- Check 'Releases' tab for deployment history"
echo "- Verify domain status in 'Domains' tab"
echo ""
echo "If default Firebase URLs (*.web.app) don't have HTTPS, there might be a deployment issue."
echo "If custom domain doesn't have HTTPS, it's likely a DNS or provisioning delay."