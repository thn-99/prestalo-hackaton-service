#ENVIRONMENT
FROM node:16-alpine

#Set the working directory
WORKDIR /usr/src/app

#Copy package.json to the container
COPY package.json ./
COPY package-lock.json ./

#Install dependencies
RUN npm install

#Copy the app to the container
COPY . .

#Expose app ports
EXPOSE 4000

ARG JWT_SECRET=${JWT_SECRET}
ARG MONGO_CONNECTION_URL=${MONGO_CONNECTION_URL}

#Start app
CMD ["npm", "start"]