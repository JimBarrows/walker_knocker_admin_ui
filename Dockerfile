FROM nginx:1.11

EXPOSE 80

COPY ./web/public/* /usr/share/nginx/html/
