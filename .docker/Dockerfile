FROM node:10.15.0-alpine
RUN npm i -g vue-cli
RUN npm i yarn
WORKDIR /app
COPY package.json yarn.lock /app/
RUN yarn
ADD ./ /app
ARG NODE_ENV
RUN echo $NODE_ENV
RUN yarn build
ENV HOST 0.0.0.0
ENTRYPOINT ["yarn", "start"]

