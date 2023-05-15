#!/usr/bin/bash

if [ -d "dist" ]; then
  echo "Build directory already exists..."
	echo "Removing old build directory..."
	rm -rf dist
else
	echo "Build directory does not exist..."
fi

echo "Creating new build directory..."
mkdir dist

echo "Building..."
node scripts/build.js
