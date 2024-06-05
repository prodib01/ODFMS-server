FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN node index.js

EXPOSE 3000
