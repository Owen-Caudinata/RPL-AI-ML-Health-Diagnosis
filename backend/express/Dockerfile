FROM node:slim

RUN apt-get update -y && apt-get install -y openssl

WORKDIR /usr/src/app

COPY package.json ./
RUN npm install

COPY prisma ./prisma/
RUN npx prisma generate

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
