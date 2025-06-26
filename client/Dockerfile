FROM node:20-alpine

WORKDIR /code

COPY . /code

COPY ./package.json package-lock.json /code/

RUN npm ci

RUN npm run build

CMD ["npm", "run", "start"]