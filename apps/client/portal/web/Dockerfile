FROM docker.io/nginx:alpine

COPY dist/apps/client/portal/web/fr /app
COPY apps/client/portal/web/nginx.conf  /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]