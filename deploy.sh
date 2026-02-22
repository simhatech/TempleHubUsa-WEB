#!/bin/bash
set -e

echo "🔨 Building..."
npm run build

echo "📦 Deploying to S3..."
aws s3 sync out s3://templehubusa --delete

echo "🔄 Invalidating CloudFront..."
aws cloudfront create-invalidation --distribution-id E2QY5K8S9WXDN8 --paths "/*"

echo "✅ Live at https://templehubusa.com"
