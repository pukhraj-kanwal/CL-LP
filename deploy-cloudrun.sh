#!/bin/bash

echo "🚀 Deploying to Cloud Run..."

PROJECT_ID="cargolynx-main"
SERVICE_NAME="cargolynx-landing"
REGION="asia-east2"

# Build and push container
echo "📦 Building container..."
gcloud builds submit --tag gcr.io/$PROJECT_ID/$SERVICE_NAME

# Deploy to Cloud Run
echo "☁️ Deploying to Cloud Run..."
gcloud run deploy $SERVICE_NAME \
  --image gcr.io/$PROJECT_ID/$SERVICE_NAME \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --port 8080

# Get the URL
SERVICE_URL=$(gcloud run services describe $SERVICE_NAME --region $REGION --format 'value(status.url)')
echo "✅ Deployed to: $SERVICE_URL"

# Set up custom domain
echo ""
echo "🌐 To map cargolynx.io:"
echo "1. Run: gcloud beta run domain-mappings create --service $SERVICE_NAME --domain cargolynx.io --region $REGION"
echo "2. Add the DNS records shown to your domain provider"