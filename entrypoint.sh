#!/bin/sh

# Set environment variables and run Prisma commands sequentially
RUN npm install -g nx

npx prisma migrate dev --name init
npx prisma db push
npx prisma db pull
npx prisma generate
# Set additional environment variables and start the API server
nx serve api &

sleep 20

# Run the E2E tests
npm run testbe:e2e
