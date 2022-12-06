FROM node:16.15.0 as build
WORKDIR /patient

COPY package*.json .
RUN yarn
COPY . .

RUN yarn build
FROM nginx:1.19
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /patient/build /usr/share/nginx/html