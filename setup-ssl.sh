#!/bin/bash

echo "🔒 SSL Certificate Setup Options"
echo "================================"

# Function to setup Let's Encrypt with Certbot
setup_letsencrypt() {
    echo "📋 Let's Encrypt Setup Instructions:"
    echo ""
    echo "1. Install Certbot:"
    echo "   brew install certbot  # macOS"
    echo "   # or"
    echo "   sudo apt-get install certbot  # Ubuntu/Debian"
    echo ""
    echo "2. Get certificate for your domain:"
    echo "   sudo certbot certonly --standalone -d yourdomain.com -d www.yourdomain.com"
    echo ""
    echo "3. Certificates will be saved at:"
    echo "   /etc/letsencrypt/live/yourdomain.com/"
    echo "   - fullchain.pem (certificate)"
    echo "   - privkey.pem (private key)"
}

# Function for Firebase custom domain
setup_firebase_domain() {
    echo "🔥 Firebase Custom Domain Setup:"
    echo ""
    echo "1. Run this command:"
    echo "   firebase hosting:sites:create your-site-name"
    echo ""
    echo "2. Add custom domain:"
    echo "   firebase hosting:channel:deploy live"
    echo ""
    echo "3. In Firebase Console:"
    echo "   - Go to Hosting section"
    echo "   - Click 'Add custom domain'"
    echo "   - Follow DNS verification steps"
    echo "   - SSL certificate auto-provisioned!"
}

# Function for Cloudflare SSL
setup_cloudflare() {
    echo "☁️  Cloudflare SSL Setup (Easiest):"
    echo ""
    echo "1. Add your site to Cloudflare (free plan)"
    echo "2. Update nameservers at your registrar"
    echo "3. In Cloudflare dashboard:"
    echo "   - SSL/TLS → Overview"
    echo "   - Select 'Full' or 'Full (strict)'"
    echo "4. SSL certificate is automatic!"
}

# Menu
echo ""
echo "Choose your hosting setup:"
echo "1. Firebase Hosting (Recommended)"
echo "2. Let's Encrypt (Self-hosted)"
echo "3. Cloudflare (DNS Proxy)"
echo ""
read -p "Enter your choice (1-3): " choice

case $choice in
    1) setup_firebase_domain ;;
    2) setup_letsencrypt ;;
    3) setup_cloudflare ;;
    *) echo "Invalid choice" ;;
esac

echo ""
echo "📌 Quick Firebase Domain Setup:"
echo "firebase hosting:channel:deploy live --project cargolynx-main"
echo ""
echo "Then visit: https://console.firebase.google.com/project/cargolynx-main/hosting"