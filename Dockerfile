FROM node:12-alpine AS build

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN yarn install

# Bundle app sources
COPY . .

# Build app
RUN yarn build

EXPOSE 80
CMD [ "node", "." ]
