#!/bin/bash

echo "🚀 Deploying CargoLynx Landing Page to Firebase..."

# Check if firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI not found. Installing..."
    npm install -g firebase-tools
fi

# Check if user is logged in
firebase projects:list &> /dev/null
if [ $? -ne 0 ]; then
    echo "📝 Please login to Firebase..."
    firebase login
fi

# Deploy to Firebase Hosting
echo "🔧 Deploying to Firebase Hosting..."
firebase deploy --only hosting --project cargolynx-main

if [ $? -eq 0 ]; then
    echo "✅ Deployment successful!"
    echo "🌐 Your site is live at: https://cargolynx-main.web.app"
else
    echo "❌ Deployment failed. Please check the error messages above."
fi