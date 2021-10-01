# escape=`

# Above is a directive
# Main directives are escape and syntax
# This is a comment

# Environment variables

ARG NODE_VERSION=14

FROM node:${NODE_VERSION} As dependencies

ARG NODE_VERSION 
# Above is essention since first arg is defined outside the build stage

ENV NODE_ENV=production
ENV workpath=\code

WORKDIR $workpath

COPY package*.json ./

RUN npm install

COPY . .
EXPOSE 5000

CMD ["node", "server.js"]
