FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=prod

COPY server ./server

EXPOSE 3000

CMD ["node", "server/index.js"]
