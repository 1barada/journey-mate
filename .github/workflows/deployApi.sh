set -e


host=$1
username=$2
key=$3
AWS_ECR_REGISTRY=$4
AWS_ECR_REPOSITORY=$5
AWS_IMAGE_TAG=$6

ssh -i "$AWS_EC2_SSH_KEY" "$AWS_EC2_USER@$AWS_EC2_HOST" << EOF
  docker pull $AWS_ECR_REGISTRY/$AWS_ECR_REPOSITORY:$AWS_IMAGE_TAG
  docker stop journey || true
  docker rm journey || true
  docker run -d --name journey -p 80:80 $AWS_ECR_REGISTRY/$AWS_ECR_REPOSITORY:$AWS_IMAGE_TAG
EOF