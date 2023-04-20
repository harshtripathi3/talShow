FROM node:14-slim

WORKDIR /app

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 8800

CMD [ "server.js" ]