FROM node:18.19.0 AS dependencies
WORKDIR /app
COPY package*.json ./
RUN npm ci

# install permission lib dependency
COPY ./libs/permissions ./permissions
WORKDIR /app/permissions
RUN npm install

FROM node:18.19.0 AS build
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

RUN npx prisma generate
RUN npm run build api
RUN npm run build permissions

FROM node:18.19.0 AS deploy
WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist/apps/api ./

WORKDIR /
COPY --from=build /app/dist/libs/ ./libs
COPY --from=dependencies /app/permissions/node_modules ./node_modules

# for simplicity of debugging
RUN apt-get update && apt-get install -y nano

WORKDIR /app
EXPOSE 5000
ENTRYPOINT [ "node", "--experimental-specifier-resolution=node", "--no-warnings", "main.js" ];