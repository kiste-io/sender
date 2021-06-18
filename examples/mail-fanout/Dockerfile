FROM node:12.22.1-alpine3.11

EXPOSE 8080 

WORKDIR /app

COPY . .

RUN npm install --production

CMD [ "npm", "run", "start" ]