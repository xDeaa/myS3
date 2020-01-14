###################
## Build the app ##
###################
FROM node:12-alpine AS build

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN yarn install

# Bundle app sources
COPY . .

# Execute tests
#RUN yarn test

# Build app
RUN yarn build

#######################################
## Launch app ##
#######################################
FROM nginx:alpine

COPY --from=build /app/build/ /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf

