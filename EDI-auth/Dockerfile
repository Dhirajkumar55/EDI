FROM node:alpine
WORKDIR /app
COPY package*.json ./
RUN npm i 
COPY . .
CMD [ "npm", "start" ]


# sudo docker build --tag node-docker .
# sudo docker run -p 5000:5000 node-docker