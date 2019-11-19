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

######################################
## Install node_modules (optimized) ##
######################################
FROM node:12-alpine AS dependencies

# Copy build app and packages json
WORKDIR /app
COPY --from=build /app/package.json .
COPY --from=build /app/yarn.lock .
COPY --from=build /app/node_modules ./node_modules

# Install node modules (not devDependencies)
RUN yarn install --prod

#######################################
## Launch app using small node image ##
#######################################
FROM mhart/alpine-node:slim-12

# Copy app (build app, node_modules optimized and package.json)
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=dependencies /app/package.json ./

EXPOSE 80
CMD [ "node", "." ]
