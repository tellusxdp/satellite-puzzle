FROM node:10.15.0-alpine
RUN npm i -g vue-cli
RUN npm i yarn
WORKDIR /app
ADD ./front/package.json /app
ADD ./front/yarn.lock /app
RUN yarn install
ADD ./front /app
RUN yarn build
ENV HOST 0.0.0.0
EXPOSE 3000
ENTRYPOINT ["yarn", "start"]
