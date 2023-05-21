#!/usr/bin/bash

if [ -z "$1" ]; then
  echo "> No argument received, defaulting to development environment..."
  NODE_ENV="development"
else
  echo "> Argument NODE_ENV received, setting environment to $1..."
  NODE_ENV=$1
fi

if [ "$1" == "production" ]; then
  echo "> Starting production server..."
  node dist/index.js
else
  echo "> Starting development server..."
  yarn nodemon
fi