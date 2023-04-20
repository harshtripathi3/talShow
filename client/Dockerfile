FROM node:16.15-alpine


WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

EXPOSE 5173

CMD [ "yarn","run", "dev" ]

