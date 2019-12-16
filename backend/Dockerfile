FROM node:12-alpine AS build

# Create app directory
WORKDIR /app

RUN apk --no-cache add --virtual builds-deps build-base python

# Install app dependencies
COPY package*.json ./
RUN yarn install

# Bundle app sources
COPY . .

# Build app
RUN yarn build

EXPOSE 80
CMD [ "node", "." ]
