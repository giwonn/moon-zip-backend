FROM node:20-alpine AS base

COPY . /usr/src/app
WORKDIR /usr/src/app

RUN npm install -production && npm cache clean --force

EXPOSE 3000
CMD [ "npm", "run", "start" ]
