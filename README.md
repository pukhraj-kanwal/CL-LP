# CargoLynx Landing Page v1.2 - Firebase & GCP Deployment

## Version 1.2 Features

- 🎨 Modern, clean design with consistent brand colors
- 📱 Fully responsive 4-column grid layouts
- ⚡ Optimized performance
- 🔒 Security headers configured
- 🚀 Automated deployment support

## Key Improvements in v1.2

1. **Better Content Organization**
   - Service tiers with aligned pricing tables
   - Enterprise-grade logistics cards in 4-column grid
   - Technology section with consistent styling
   - Improved CTA section with perfect alignment

2. **Enhanced UI/UX**
   - Consistent hover effects (6px lift, orange shadows)
   - Proper spacing and content segmentation
   - Visual hierarchy with alternating backgrounds
   - Glass-morphism effects on CTA boxes

## Deployment Options

### Option 1: Firebase Hosting (Recommended)

#### Prerequisites
1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Create a Firebase project at https://console.firebase.google.com

#### Automated Deployment with GitHub Actions

1. Push your code to GitHub
2. The included `.github/workflows/firebase-deploy.yml` will automatically deploy on push to main/master
3. Required GitHub Secrets:
   - `FIREBASE_SERVICE_ACCOUNT`: Your Firebase service account JSON
   - `FIREBASE_PROJECT_ID`: Your Firebase project ID

#### Manual Firebase Deployment
```bash
firebase login
firebase init hosting  # Select your project, use . as public directory
firebase deploy
```

### Option 2: Google Cloud Platform (App Engine)

#### Prerequisites
1. Install Google Cloud SDK:
   ```bash
   # macOS
   brew install google-cloud-sdk
   
   # Or download from: https://cloud.google.com/sdk/docs/install
   ```

2. Create a GCP project at https://console.cloud.google.com

3. Enable billing for your project

## Deployment Steps

1. Navigate to the project directory:
   ```bash
   cd /Users/pukhraj/Desktop/CL/v1
   ```

2. Run the deployment script:
   ```bash
   ./deploy.sh
   ```

   The script will:
   - Check for gcloud CLI installation
   - Authenticate you with Google Cloud
   - Set up your project ID
   - Initialize App Engine (first time only)
   - Deploy your landing page

## Manual Deployment

If you prefer to deploy manually:

```bash
# Authenticate
gcloud auth login

# Set your project
gcloud config set project YOUR_PROJECT_ID

# Initialize App Engine (first time only)
gcloud app create --region=us-central1

# Deploy
gcloud app deploy app.yaml

# View your app
gcloud app browse
```

## Files Created

- `app.yaml` - App Engine configuration
- `.gcloudignore` - Files to ignore during deployment
- `deploy.sh` - Automated deployment script

## Costs

- App Engine has a free tier that includes:
  - 28 hours per day of F1 instances
  - 1 GB of outbound data transfer
  - Sufficient for most landing pages

## Next Steps

- Set up a custom domain: https://cloud.google.com/appengine/docs/standard/mapping-custom-domains
- Enable HTTPS (automatic with App Engine)
- Set up monitoring: https://cloud.google.com/monitoring