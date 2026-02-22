#!/bin/bash
set -e

APP_ID="d31dtyrye27j1c"
BRANCH="main"

echo "📦 Creating deployment package..."
zip -r deployment.zip . -x "node_modules/*" ".next/*" ".git/*" "*.zip"

echo "🚀 Starting deployment..."
aws amplify start-deployment \
    --app-id $APP_ID \
    --branch-name $BRANCH \
    --source-url deployment.zip

echo "✅ Deployment started! Check console for progress"
echo "🔗 https://us-east-1.console.aws.amazon.com/amplify/home?region=us-east-1#/$APP_ID"
