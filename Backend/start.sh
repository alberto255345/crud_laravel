#!/bin/sh
composer install
php artisan migrate --seed 
php artisan key:generate
php artisan serve -v --host 0.0.0.0