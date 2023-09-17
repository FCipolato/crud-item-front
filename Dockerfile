FROM node:18-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install serve -g

RUN yarn install

RUN yarn build

EXPOSE 3001

CMD ["yarn", "serve"]