FROM node:latest
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm run sonar-scanner
COPY . .
EXPOSE 3001
CMD [ "node", "app.js" ]