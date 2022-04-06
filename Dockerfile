FROM node:16.14.2-alpine3.15

RUN apk --no-cache add curl
RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

COPY /server/pnpm-lock.yaml /server/./
COPY /frontend/pnpm-lock.yaml /frontend/./

RUN cd server && pnpm fetch
RUN cd frontend && pnpm fetch

ADD . ./

ENV NODE_ENV=development
WORKDIR /server
RUN pnpm install -r --offline
ENV NODE_ENV=production
RUN pnpm run build

WORKDIR /frontend
ENV NODE_ENV=development
RUN pnpm install -r --offline
ENV NODE_ENV=production
RUN pnpm run build

WORKDIR /server

EXPOSE 3000

CMD ["node", "dist/index.js"]
