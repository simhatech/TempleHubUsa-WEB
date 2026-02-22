#!/bin/bash
set -e

STACK_NAME="templehubusa-web-stack"
TEMPLATE_FILE="infrastructure/cloudformation-template.yaml"
REGION="${AWS_REGION:-us-east-1}"

echo "🚀 Deploying TempleHubUSA infrastructure..."

aws cloudformation deploy \
  --template-file $TEMPLATE_FILE \
  --stack-name $STACK_NAME \
  --region $REGION \
  --capabilities CAPABILITY_IAM \
  --parameter-overrides DomainName=templehubusa.com

echo "✅ Deployment complete!"
