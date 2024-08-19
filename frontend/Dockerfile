# File ./Dockerfile
FROM node:20.11.1-alpine3.19 AS build

WORKDIR /frontend

COPY package.json ./

RUN npm install

ENV PATH /frontend/node_modules/.bin:$PATH

COPY . .

RUN npm run build

FROM nginx:1.25.4-alpine3.18

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /frontend/dist /var/www/html/

EXPOSE 5173

ENTRYPOINT ["nginx","-g","daemon off;"]