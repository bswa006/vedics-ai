#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print error messages
error() {
    echo -e "${RED}Error: $1${NC}" >&2
}

# Function to print success messages
success() {
    echo -e "${GREEN}$1${NC}"
}

# Function to print info messages
info() {
    echo -e "${YELLOW}$1${NC}"
}

# Server details
SERVER="root@172.98.12.245"
PASSWORD="passpass21"
DEPLOY_DIR="vedics-ai"

# Check if sshpass is installed
if ! command -v sshpass &> /dev/null; then
    error "sshpass is not installed. Please install it first."
    info "On macOS: brew install eget && eget -i hudochenkov/sshpass"
    info "On Linux: sudo apt-get install sshpass"
    exit 1
fi

# Deploy function
deploy() {
    # SSH into the server and execute commands
    info "Connecting to server..."
    sshpass -p "$PASSWORD" ssh -o StrictHostKeyChecking=no "$SERVER" "
        set -e  # Exit on any error
        
        # Check if directory exists
        if [ ! -d \"$DEPLOY_DIR\" ]; then
            echo 'Directory not found. Creating and cloning repository...'
            git clone https://github.com/bswa006/vedics-ai.git $DEPLOY_DIR
        fi
        
        # Navigate to project directory
        cd $DEPLOY_DIR
        
        # Store current commit hash
        OLD_HASH=\$(git rev-parse HEAD)
        
        # Attempt to pull changes
        if ! git pull; then
            echo 'Git pull failed. Attempting to resolve...'
            git reset --hard HEAD
            git clean -f -d
            if ! git pull; then
                echo 'Git pull failed again. Exiting.'
                exit 1
            fi
        fi
        
        # Get new commit hash
        NEW_HASH=\$(git rev-parse HEAD)
        
        # Check if code actually changed
        if [ \"\$OLD_HASH\" = \"\$NEW_HASH\" ]; then
            echo 'No new changes to deploy.'
        else
            echo 'Changes detected. Rebuilding containers...'
            # Rebuild and restart containers
            docker compose down
            docker compose up -d --build
        fi
    "
    
    # Check the exit status
    if [ $? -eq 0 ]; then
        success "Deployment completed successfully!"
    else
        error "Deployment failed!"
        exit 1
    fi
}

# Main execution
echo "Starting deployment process..."
deploy
