FROM node:current-alpine3.12 AS BUILD_IMAGE

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
RUN yarn install

COPY . .
RUN yarn run build

FROM node:current-alpine3.12

ARG HOST=0.0.0.0
ARG PORT=5000
ENV HOST=$HOST
ENV PORT=$PORT

ENV NODE_ENV=production

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
RUN yarn install

COPY --from=BUILD_IMAGE /app/dist ./dist
RUN rm -r package.json yarn.lock

CMD [ "node", "dist/index.js" ]

EXPOSE $PORT/tcp
