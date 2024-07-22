FROM node:18.19.0 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
RUN npx prisma generate
COPY . .
RUN npm run build api

FROM node:18.19.0
WORKDIR /app
COPY --from=builder /app/dist/apps/api/package*.json ./
RUN npm ci
RUN npx prisma generate
COPY --from=builder /app/dist/apps/api ./
EXPOSE 5000
ENTRYPOINT [ "node", "main.js" ]