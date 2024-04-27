FROM docker.io/nginx:alpine

COPY dist/apps/client/portal/web /usr/share/nginx/html
COPY apps/client/portal/web/nginx.conf  /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]