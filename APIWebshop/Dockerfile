FROM node:latest
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN wget https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-3.3.0.1492-linux.zip && \
    unzip sonar-scanner-cli-3.3.0.1492-linux.zip && \
    rm sonar-scanner-cli-3.3.0.1492-linux.zip && \
    mv sonar-scanner-3.3.0.1492-linux sonar-scanner && \
    rm /usr/src/app/sonar-scanner/conf/sonar-scanner.properties
COPY sonar-scanner.properties /usr/src/app/sonar-scanner/conf/sonar-scanner.properties
ENV PATH="$PATH:/usr/src/app/sonar-scanner/bin"
EXPOSE 3000
CMD [ "node", "app.js" ]