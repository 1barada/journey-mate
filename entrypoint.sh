#!/bin/sh

# Install NX globally
npm install -g nx

# Run Prisma commands
npx prisma migrate dev --name init
npx prisma db push
npx prisma db pull
npx prisma generate

# Start the API server
nx serve api &

# Wait for the API server to be ready
sleep 20

# Run the E2E tests
npm run testbe:e2e
