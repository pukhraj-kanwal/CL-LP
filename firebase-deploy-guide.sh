#!/bin/bash

echo "🔥 Firebase Hosting Deployment Guide for cargolynx.io"
echo "===================================================="
echo ""
echo "Step 1: Login to Firebase"
echo "-------------------------"
echo "Run this command and follow the browser prompt:"
echo "$ firebase login"
echo ""
echo "Press Enter when you've logged in..."
read

echo ""
echo "Step 2: Initialize Firebase Hosting"
echo "-----------------------------------"
echo "Running Firebase init..."
firebase init hosting --project cargolynx-main

echo ""
echo "Step 3: Deploy to Firebase"
echo "---------------------------"
echo "Deploying your site..."
firebase deploy --only hosting

echo ""
echo "Step 4: Set up Custom Domain (cargolynx.io)"
echo "--------------------------------------------"
echo "1. Go to: https://console.firebase.google.com/project/cargolynx-main/hosting/sites"
echo "2. Click on your site"
echo "3. Click 'Add custom domain'"
echo "4. Enter: cargolynx.io"
echo "5. Verify domain ownership (TXT record)"
echo "6. Add the A records provided to your DNS:"
echo "   - 151.101.1.195"
echo "   - 151.101.65.195"
echo ""
echo "SSL certificates are automatically provisioned by Firebase!"
echo ""
echo "Your site will be available at:"
echo "- https://cargolynx-main.web.app (immediately)"
echo "- https://cargolynx-main.firebaseapp.com (immediately)"
echo "- https://cargolynx.io (after DNS propagation)"