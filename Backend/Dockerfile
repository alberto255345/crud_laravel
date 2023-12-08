FROM php:8.2-fpm

RUN apt clean && rm -rf /var/lib/apt/lists/*
RUN apt update -y 
RUN apt upgrade -y
ENV ACCEPT_EULA=Y

ARG user
ARG uid

# Adding Tz information
ENV TZ=America/Sao_Paulo

# Installing necessary initial packages
RUN apt-get install software-properties-common -y

RUN apt-get update && apt-get install -y \
    unzip \
    git \
    curl \
    zip \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libmcrypt-dev \
    libpq-dev \
    postgresql
RUN docker-php-ext-install pdo pdo_pgsql 

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN useradd -G www-data,root -u $uid -d /home/$user $user
RUN mkdir -p /home/$user/.composer && \
    chown -R $user:$user /home/$user

WORKDIR /var/www

USER $user