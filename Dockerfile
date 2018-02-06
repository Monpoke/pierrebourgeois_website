FROM nginx
LABEL maintainer="Pierre Bourgeois <contact@pierrebourgeois.fr>"
COPY html /usr/share/nginx/html
EXPOSE 80

