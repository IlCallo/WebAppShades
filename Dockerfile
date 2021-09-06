# syntax=docker/dockerfile:1
FROM httpd:2.4
EXPOSE 80
RUN mkdir /usr/local/apache2/htdocs/reactshades
COPY build/ /usr/local/apache2/htdocs/reactshades
