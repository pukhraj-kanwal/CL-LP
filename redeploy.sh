#!/bin/bash

echo "🔐 Firebase Re-authentication and Deployment"
echo "==========================================="
echo ""

# Step 1: Re-authenticate
echo "1️⃣ Re-authenticating with Firebase..."
echo "   This will open your browser for login"
echo ""
firebase login --reauth

echo ""
echo "2️⃣ Setting correct project..."
firebase use cargolynx-main

echo ""
echo "3️⃣ Deploying to Firebase Hosting..."
firebase deploy --only hosting:main --project cargolynx-main

echo ""
echo "4️⃣ Deployment Complete!"
echo ""
echo "📌 URLs to test:"
echo "   • https://cargolynx-main.web.app"
echo "   • https://cargolynx-main.firebaseapp.com"
echo "   • https://cargolynx.io (custom domain)"
echo ""
echo "If custom domain still has issues, check:"
echo "   • https://console.firebase.google.com/project/cargolynx-main/hosting/sites"