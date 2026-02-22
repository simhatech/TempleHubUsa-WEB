#!/bin/bash
set -e

BUCKET="templehubusa"
DISTRIBUTION_ID="E2QY5K8S9WXDN8"

echo "🔨 Building Next.js app..."
npm run build

echo "📦 Deploying to S3..."
aws s3 sync out s3://$BUCKET --delete

echo "🔄 Invalidating CloudFront..."
aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"

echo "✅ Deployed to https://templehubusa.com"
