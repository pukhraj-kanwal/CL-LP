# Custom Domain Setup for cargolynx.io

## Overview
This guide will help you set up cargolynx.io with SSL certificates on Google Cloud Platform App Engine.

## Prerequisites
- Domain ownership of cargolynx.io
- Access to your domain's DNS settings (registrar or DNS provider)
- GCP project with billing enabled
- App deployed to App Engine

## Setup Process

### 1. Deploy Your App First
```bash
cd /Users/pukhraj/Desktop/CL/v1
./deploy.sh
```

### 2. Run Domain Setup Script
```bash
./setup-domain.sh
```

### 3. Domain Verification
1. Go to the [App Engine domains settings](https://console.cloud.google.com/appengine/settings/domains)
2. Click "Add a custom domain"
3. Select "Verify a new domain"
4. Enter `cargolynx.io`
5. Choose verification method:
   - **DNS TXT Record** (recommended)
   - HTML file upload
   - Meta tag
6. Add the verification record to your DNS provider
7. Click "Verify" (may take a few minutes)

### 4. DNS Configuration

Add these records at your domain registrar/DNS provider:

#### For Root Domain (cargolynx.io)
| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | 216.239.32.21 | 3600 |
| A | @ | 216.239.34.21 | 3600 |
| A | @ | 216.239.36.21 | 3600 |
| A | @ | 216.239.38.21 | 3600 |

#### For WWW Subdomain
| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | www | ghs.googlehosted.com | 3600 |

### 5. SSL Certificate

- SSL certificates are **automatically provisioned** by Google
- No manual configuration needed
- Provisioning can take up to 24 hours
- Both HTTP and HTTPS will work during provisioning

## Monitoring

Check domain mapping status:
```bash
gcloud app domain-mappings list
```

Check certificate status:
```bash
gcloud app ssl-certificates list
```

## Troubleshooting

### Domain Not Verified
- Ensure TXT record is properly added
- Wait 5-10 minutes for DNS propagation
- Try alternate verification method

### SSL Certificate Pending
- Normal - can take up to 24 hours
- Ensure DNS records are correct
- Check that domain is verified

### Site Not Loading
1. Verify DNS propagation:
   ```bash
   dig cargolynx.io
   nslookup cargolynx.io
   ```
2. Check App Engine logs:
   ```bash
   gcloud app logs tail -s default
   ```

## Alternative: Cloud Run with Load Balancer

If you need faster SSL provisioning or more control:
1. Deploy to Cloud Run instead
2. Use Cloud Load Balancer with managed SSL
3. This provides instant SSL certificates

## URLs After Setup

Your site will be accessible at:
- https://cargolynx.io
- https://www.cargolynx.io
- http://cargolynx.io (redirects to HTTPS)
- http://www.cargolynx.io (redirects to HTTPS)

## Security Headers

Consider adding security headers to your app.yaml:
```yaml
handlers:
- url: /.*
  static_files: index.html
  upload: index.html
  secure: always
  http_headers:
    Strict-Transport-Security: "max-age=31536000; includeSubDomains"
    X-Content-Type-Options: "nosniff"
    X-Frame-Options: "DENY"
```