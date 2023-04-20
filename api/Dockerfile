FROM node:16.15-alpine

WORKDIR /app

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install --production --frozen-lockfile && yarn cache clean

COPY . .

EXPOSE 8800

CMD [ "server.js" ]

# FROM node:16.15-alpine AS builder
# USER node

# WORKDIR /app

# COPY --chown=node . .
# # Building the production-ready application code - alias to 'nest build'
# RUN yarn install --production && yarn start

# FROM node:16.15-alpine

# USER node

# WORKDIR /app

# COPY --from=builder --chown=node /app/node_modules ./node_modules
# # Copying the production-ready application code, so it's one of few required artifacts
# COPY --from=builder --chown=node /app/dist ./dist
# COPY --from=builder --chown=node /app/public ./public
# COPY --from=builder --chown=node /app/package.json .

# EXPOSE 8800

# CMD [ "server.js" ]