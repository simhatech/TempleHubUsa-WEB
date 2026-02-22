#!/bin/bash
set -e

APP_NAME="templehubusa-web"
REGION="us-east-1"

echo "🚀 Deploying to AWS Amplify..."

# Check if app exists
APP_ID=$(aws amplify list-apps --region $REGION --query "apps[?name=='$APP_NAME'].appId" --output text 2>/dev/null || echo "")

if [ -z "$APP_ID" ]; then
    echo "Creating Amplify app..."
    APP_ID=$(aws amplify create-app \
        --name $APP_NAME \
        --region $REGION \
        --platform WEB_COMPUTE \
        --query 'app.appId' \
        --output text)
    
    # Create branch
    aws amplify create-branch \
        --app-id $APP_ID \
        --branch-name main \
        --region $REGION
    
    echo "✅ Created app: $APP_ID"
else
    echo "✅ Found app: $APP_ID"
fi

# Set environment variables
aws amplify update-app \
    --app-id $APP_ID \
    --region $REGION \
    --environment-variables \
        NEXT_PUBLIC_API_BASE_URL=https://api.templehubusa.com/api

# Configure custom domain
aws amplify create-domain-association \
    --app-id $APP_ID \
    --domain-name templehubusa.com \
    --region $REGION \
    --sub-domain-settings prefix=,branchName=main \
    2>/dev/null || echo "Domain already configured"

echo ""
echo "✅ Amplify app configured!"
echo "🔗 Console: https://$REGION.console.aws.amazon.com/amplify/home?region=$REGION#/$APP_ID"
echo ""
echo "Next: Connect your Git repository in the Amplify Console for automatic deployments"
