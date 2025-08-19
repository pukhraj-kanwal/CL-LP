#!/bin/bash

echo "🔧 Fixing HTTPS for Firebase Hosting..."
echo ""

# Step 1: Clear any existing deployment
echo "1️⃣ Clearing Firebase cache..."
rm -rf .firebase/

# Step 2: Verify project
echo "2️⃣ Verifying Firebase project..."
firebase use cargolynx-main

# Step 3: Deploy with fresh configuration
echo "3️⃣ Deploying with HTTPS enforcement..."
firebase deploy --only hosting --project cargolynx-main

echo ""
echo "4️⃣ Testing HTTPS..."
echo ""
echo "Please test these URLs:"
echo "✅ https://cargolynx-main.web.app"
echo "✅ https://cargolynx-main.firebaseapp.com"
echo ""
echo "If you're still redirected to HTTP, try:"
echo "1. Clear your browser cache completely"
echo "2. Use incognito/private mode"
echo "3. Try a different browser"
echo "4. Check if you have any browser extensions forcing HTTP"
echo ""
echo "5️⃣ Alternative test:"
echo "Run this command to test HTTPS directly:"
echo "curl -I https://cargolynx-main.web.app"
echo ""
echo "Look for 'HTTP/2 200' or 'HTTP/1.1 200 OK' in the response."