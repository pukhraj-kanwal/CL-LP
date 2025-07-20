#!/bin/bash

# Custom domain setup script for cargolynx.io

echo "🌐 Setting up custom domain cargolynx.io for your GCP App Engine app..."

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo "❌ gcloud CLI is not installed. Please install it first:"
    echo "Visit: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Get project ID
PROJECT_ID=$(gcloud config get-value project 2>/dev/null)
if [ -z "$PROJECT_ID" ]; then
    echo "📋 Please enter your GCP Project ID:"
    read -r PROJECT_ID
    gcloud config set project "$PROJECT_ID"
fi

echo "📦 Using project: $PROJECT_ID"
echo ""
echo "📝 STEP 1: Domain Verification"
echo "================================"
echo "1. Go to: https://console.cloud.google.com/appengine/settings/domains?project=$PROJECT_ID"
echo "2. Click 'Add a custom domain'"
echo "3. Select 'Verify a new domain' and enter: cargolynx.io"
echo "4. Choose your verification method (recommended: DNS TXT record)"
echo "5. Add the TXT record to your DNS provider"
echo ""
echo "Press Enter once you've completed domain verification..."
read -r

echo ""
echo "🔧 STEP 2: Mapping the Domain"
echo "================================"
echo "Attempting to map domain to App Engine..."

# Map the domain
gcloud app domain-mappings create cargolynx.io --certificate-management=AUTOMATIC

# Also map www subdomain
gcloud app domain-mappings create www.cargolynx.io --certificate-management=AUTOMATIC

echo ""
echo "📍 STEP 3: DNS Configuration"
echo "================================"
echo "Add these DNS records at your domain registrar:"
echo ""
echo "For cargolynx.io (root domain):"
echo "  Type: A"
echo "  Name: @"
echo "  Values:"
echo "    216.239.32.21"
echo "    216.239.34.21"
echo "    216.239.36.21"
echo "    216.239.38.21"
echo ""
echo "For www.cargolynx.io:"
echo "  Type: CNAME"
echo "  Name: www"
echo "  Value: ghs.googlehosted.com"
echo ""
echo "🔒 SSL certificates will be automatically provisioned by Google (may take up to 24 hours)"
echo ""
echo "📊 Check domain mapping status:"
echo "gcloud app domain-mappings list"
echo ""
echo "🌐 Your site will be available at:"
echo "  - https://cargolynx.io"
echo "  - https://www.cargolynx.io"
echo "  - https://$PROJECT_ID.appspot.com (backup URL)"