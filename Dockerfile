FROM node:18.19.0 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

WORKDIR /app/apps/api
RUN npx prisma generate

WORKDIR /app
RUN npm run build api
RUN npm run build permissions

FROM node:18.19.0
WORKDIR /app
COPY --from=builder /app/dist/apps/api/package*.json ./
RUN npm ci
COPY --from=builder /app/dist/apps/api ./
COPY --from=builder /app/dist/libs/ /libs


WORKDIR /libs/permissions
RUN npm install

WORKDIR /app
EXPOSE 5000
ENTRYPOINT [ "node", "--experimental-specifier-resolution=node", "--no-warnings", "main.js" ];