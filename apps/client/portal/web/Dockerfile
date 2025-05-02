FROM docker.io/nginx:stable-alpine
COPY apps/client/portal/web/nginx.conf /etc/nginx/conf.d/default.conf
COPY dist/apps/client/portal/web/browser/* /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
