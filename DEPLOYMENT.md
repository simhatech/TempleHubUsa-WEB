# Deployment Guide - TempleHubUSA

## Prerequisites

1. **AWS CLI** installed and configured
   ```bash
   aws configure
   ```

2. **Node.js** and npm installed

3. **Domain** templehubusa.com registered (Route 53 or external registrar)

## Deployment Options

### Option 1: Quick Deploy with Script (Recommended)

```bash
chmod +x deploy.sh
./deploy.sh
```

### Option 2: CloudFormation (Full Infrastructure)

```bash
chmod +x infrastructure/deploy-cloudformation.sh
./infrastructure/deploy-cloudformation.sh
```

### Option 3: Manual AWS Amplify Setup

1. **Build the application**
   ```bash
   npm install
   npm run build
   ```

2. **Create Amplify App**
   ```bash
   aws amplify create-app \
     --name templehubusa-web \
     --platform WEB_COMPUTE \
     --region us-east-1
   ```

3. **Deploy from Git** (if using repository)
   - Go to AWS Amplify Console
   - Connect your GitHub/GitLab repository
   - Select the main branch
   - Amplify will auto-detect Next.js and use amplify.yml

4. **Manual Deploy** (without Git)
   ```bash
   # Create a deployment package
   zip -r deployment.zip .next node_modules public package.json next.config.ts
   
   # Upload to Amplify
   aws amplify create-deployment \
     --app-id <YOUR_APP_ID> \
     --branch-name main
   ```

## Environment Variables

Configure in AWS Amplify Console or via CLI:

```bash
aws amplify update-app \
  --app-id <YOUR_APP_ID> \
  --environment-variables \
    NEXT_PUBLIC_API_BASE_URL=https://api.templehubusa.com/api \
    NEXT_PUBLIC_GOOGLE_CLIENT_ID=<your-client-id> \
    NEXT_PUBLIC_GOOGLE_MAPS_KEY=<your-maps-key>
```

## Custom Domain Setup

### If using Route 53:

1. The CloudFormation template automatically creates domain association
2. AWS will provide DNS records (CNAME/ANAME)
3. Verify domain in Amplify Console

### If using external DNS provider:

1. Get DNS records from Amplify Console
2. Add CNAME records to your DNS provider:
   ```
   templehubusa.com -> <amplify-domain>
   www.templehubusa.com -> <amplify-domain>
   ```

## Post-Deployment

1. **Verify deployment**
   ```bash
   curl https://templehubusa.com
   ```

2. **Monitor logs**
   - AWS Amplify Console → Your App → Monitoring
   - CloudWatch Logs

3. **Set up CI/CD**
   - Connect Git repository for automatic deployments
   - Configure branch-based deployments

## Troubleshooting

### Build fails
- Check Node.js version compatibility
- Verify all dependencies in package.json
- Review build logs in Amplify Console

### Domain not working
- Verify DNS propagation (can take 24-48 hours)
- Check SSL certificate status in Amplify
- Ensure domain is verified

### Environment variables not loading
- Verify variables are set in Amplify Console
- Redeploy after adding variables
- Check variable names match .env.example

## Costs

- AWS Amplify: ~$0.01 per build minute + $0.15/GB served
- Route 53: ~$0.50/month per hosted zone
- SSL Certificate: Free (AWS Certificate Manager)

## Support

For issues, check:
- AWS Amplify Documentation: https://docs.aws.amazon.com/amplify/
- Next.js Deployment: https://nextjs.org/docs/deployment
