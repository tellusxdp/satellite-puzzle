FROM node:10.15.0-alpine
RUN npm i -g vue-cli
RUN npm i yarn
WORKDIR /app
ADD ./package.json /app
ADD ./yarn.lock /app
RUN yarn install
ADD ./ /app
RUN yarn build
ENV HOST 0.0.0.0
EXPOSE 3000
ENTRYPOINT ["yarn", "start"]
