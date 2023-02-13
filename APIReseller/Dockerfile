FROM node:latest
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run sonar-scanner
EXPOSE 3001
CMD [ "node", "app.js" ]