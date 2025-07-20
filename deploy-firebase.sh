#!/bin/bash

echo "🚀 Deploying to Firebase Hosting..."

# Check if firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "📦 Installing Firebase CLI..."
    npm install -g firebase-tools
fi

# Initialize Firebase (if not already)
if [ ! -f ".firebaserc" ]; then
    echo "🔧 Initializing Firebase..."
    firebase use --add cargolynx-main
fi

# Deploy
echo "☁️ Deploying site..."
firebase deploy --only hosting

echo ""
echo "✅ Deployment complete!"
echo ""
echo "🌐 To set up custom domain:"
echo "1. Go to https://console.firebase.google.com/project/cargolynx-main/hosting/sites"
echo "2. Click 'Add custom domain'"
echo "3. Enter 'cargolynx.io'"
echo "4. Follow the verification and DNS setup instructions"
echo ""
echo "Firebase Hosting provides automatic SSL certificates!"