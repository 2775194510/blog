#!/bin/bash

# Add all changes to Git staging area
git add .

# Commit changes with a message
git commit -m "$1"

# Push changes to remote repository
git push
