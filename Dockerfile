FROM node:18.19.0 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

WORKDIR /app/apps/api
RUN npx prisma generate

WORKDIR /app
RUN npm run build api

FROM node:18.19.0
WORKDIR /app
COPY --from=builder /app/dist/apps/api/package*.json ./
RUN npm ci
COPY --from=builder /app/dist/apps/api ./
EXPOSE 5000
ENTRYPOINT [ "node", "--experimental-specifier-resolution=node", "--no-warnings", "main.js" ];