FROM node:18-alpine3.15

WORKDIR /home/bot

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "run", "dev"]