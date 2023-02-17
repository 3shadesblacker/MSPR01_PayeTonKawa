FROM php:8.1.16-apache

RUN apt-get update -y
RUN apt-get upgrade -y
RUN apt-get install git -y
# RUN apt-get install php7.0-gd -y

WORKDIR /var/www/html
RUN git clone https://github.com/Dolibarr/dolibarr.git
RUN cp ./dolibarr/htdocs/. ./ -r
WORKDIR /var/www/html/dolibarr/htdocs/conf
RUN cp ./conf.php.example ./conf.php
RUN chmod 777 ./conf.php