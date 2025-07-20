#!/bin/bash

# Deploy script for GCP App Engine

echo "🚀 Deploying landing page to Google Cloud Platform..."

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo "❌ gcloud CLI is not installed. Please install it first:"
    echo "Visit: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Check if user is authenticated
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" &> /dev/null; then
    echo "📝 Please authenticate with Google Cloud:"
    gcloud auth login
fi

# Get or set project ID
PROJECT_ID=$(gcloud config get-value project 2>/dev/null)
if [ -z "$PROJECT_ID" ]; then
    echo "📋 Please enter your GCP Project ID:"
    read -r PROJECT_ID
    gcloud config set project "$PROJECT_ID"
fi

echo "📦 Using project: $PROJECT_ID"

# Check if App Engine is initialized
if ! gcloud app describe &> /dev/null; then
    echo "🔧 Initializing App Engine..."
    echo "Please select a region for your app:"
    gcloud app create
fi

# Deploy the application
echo "🚀 Deploying to App Engine..."
gcloud app deploy app.yaml --quiet

# Get the app URL
APP_URL="https://$PROJECT_ID.appspot.com"
echo "✅ Deployment complete!"
echo "🌐 Your landing page is live at: $APP_URL"
echo ""
echo "📊 View logs: gcloud app logs tail -s default"
echo "🔍 View in console: https://console.cloud.google.com/appengine?project=$PROJECT_ID"