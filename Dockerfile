FROM node:16.14.2

ENV NODE_ENV=production

COPY /server/package*.json /server/./
COPY /frontend/package*.json /frontend/./

COPY . .

WORKDIR /server
RUN npm ci && npm run build

WORKDIR /frontend
RUN npm ci && npm run build

WORKDIR /server

EXPOSE 3000

CMD ["node", "dist/index.js"]
