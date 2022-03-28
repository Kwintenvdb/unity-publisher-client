FROM node:16.14.2

COPY /server/package*.json /server/./
COPY /frontend/package*.json /frontend/./

COPY . .

ENV NODE_ENV=development
WORKDIR /server
RUN npm ci
ENV NODE_ENV=production
RUN npm run build

WORKDIR /frontend
ENV NODE_ENV=development
RUN npm ci
ENV NODE_ENV=production
RUN npm run build

WORKDIR /server

EXPOSE 3000

CMD ["node", "dist/index.js"]
