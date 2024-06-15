# ISD_ICT_20232_147822_nhom_22

## group members:

- Nguyen Huu Dat 20215192
- Le Tuan Anh 20205141
- Mai Hoang Anh 20205142
- Ngo Xuan Bach 20205144
- Nguyen Thanh Dat 20205178

## Feature:

- (coming soon)

# How to run?

## Requirement

Make sure you already install docker, docker compose and wsl2

### Navigate to Media_store

~$ cd Media_store

### Create .env file and config the following content:

~$ cp .env.example .env

APP_NAME=Laravel
APP_ENV=dev
APP_KEY=
APP_DEBUG=true
APP_TIMEZONE=UTC
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=media_store
DB_USERNAME=media_user
DB_PASSWORD=password
...

### Build project

~$ docker compose build app --no-cache
~$ docker compose up -d

### Install composer

~$ docker compose exec app rm -rf vendor composer.lock
~$ docker compose exec app composer update
~$ docker compose exec app composer install

### Install npm and build the manifest.json

~$ docker compose run --rm npm install
~$ docker compose run --rm npm run build

### Generate app key and seeding data

~$ docker compose exec app php artisan key:generate
~$ docker compose exec app php artisan storage:link
~$ docker compose exec app php artisan migrate:fresh --seed

## Now application is running at http://localhost:8000

## Phpmyadmin already at http://localhost:8888
