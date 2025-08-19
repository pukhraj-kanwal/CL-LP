#!/bin/bash

echo "🔍 Checking Firebase Hosting Status..."
echo "======================================"
echo ""

# Check current directory
echo "📁 Current directory: $(pwd)"
echo ""

# Check Firebase CLI
echo "1️⃣ Firebase CLI version:"
firebase --version || echo "❌ Firebase CLI not found!"
echo ""

# Check current project
echo "2️⃣ Current Firebase project:"
firebase use || echo "❌ No project selected!"
echo ""

# Check hosting channels
echo "3️⃣ Hosting channels:"
firebase hosting:channel:list || echo "❌ Could not list channels!"
echo ""

# Check recent deployments
echo "4️⃣ Recent hosting releases:"
firebase hosting:releases:list --limit 5 || echo "❌ Could not list releases!"
echo ""

# Test the URLs
echo "5️⃣ Testing URLs..."
echo ""
echo "Testing https://cargolynx-main.web.app:"
curl -I -s -o /dev/null -w "%{http_code}" https://cargolynx-main.web.app || echo " ❌ Failed"
echo ""
echo ""
echo "Testing https://cargolynx-main.firebaseapp.com:"
curl -I -s -o /dev/null -w "%{http_code}" https://cargolynx-main.firebaseapp.com || echo " ❌ Failed"
echo ""

# Check if files exist
echo ""
echo "6️⃣ Checking local files:"
echo "index.html: $([ -f index.html ] && echo '✅ Found' || echo '❌ Missing')"
echo "styles.css: $([ -f styles.css ] && echo '✅ Found' || echo '❌ Missing')"
echo "app.js: $([ -f app.js ] && echo '✅ Found' || echo '❌ Missing')"
echo "firebase.json: $([ -f firebase.json ] && echo '✅ Found' || echo '❌ Missing')"
echo ""

# Quick redeploy option
echo "7️⃣ Quick Actions:"
echo "=================="
echo "a) Redeploy now: firebase deploy --only hosting"
echo "b) Check Firebase Console: https://console.firebase.google.com/project/cargolynx-main/hosting"
echo "c) Check Firebase Status: https://status.firebase.google.com/"
echo ""
read -p "Would you like to redeploy now? (y/n): " redeploy

if [[ $redeploy == "y" ]]; then
    echo ""
    echo "🚀 Redeploying..."
    firebase deploy --only hosting --project cargolynx-main
    echo ""
    echo "✅ Deployment complete! Wait 1-2 minutes for propagation."
    echo "Test URL: https://cargolynx-main.web.app"
fi