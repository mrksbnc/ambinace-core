#!/usr/bin/bash

echo "* Project setup starting..."

echo "* Installing dependencies..."
yarn install --silent

echo "* Generating prisma client..."
yarn prisma generate

echo "* Running required database migrations..."
yarn prisma migrate dev --name init

echo "* Project setup complete!"
