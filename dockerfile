FROM php:7.4.0-apache

RUN apt-get update -y
RUN apt-get upgrade -y
RUN apt-get install git -y
# RUN apt-get install php7.0-gd -y

WORKDIR /var/www/html
RUN git clone https://github.com/Dolibarr/dolibarr.git
WORKDIR /var/www/html/dolibarr
RUN git fetch
RUN git checkout 16.0
RUN rm /etc/apache2/sites-available/000-default.conf
COPY ./000-default.conf /etc/apache2/sites-available/000-default.conf
RUN cp /var/www/html/dolibarr/htdocs/conf/conf.php.example /var/www/html/dolibarr/htdocs/conf/conf.php
RUN chmod -R 777 /var/www/html/dolibarr/htdocs
