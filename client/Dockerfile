FROM node:16-alpine

# ENV CI=true
# ENV WDS_SOCKET_PORT=0

WORKDIR /usr/app
COPY ./package.json ./
RUN yarn install
COPY ./ ./

CMD ["yarn","start"]