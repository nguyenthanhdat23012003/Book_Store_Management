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

## open Ubuntu(WSL) in your terminal

$cd Media_store
$cp .env.example .env

### build project

$ docker compose up -d

### install dependencies
$ docker compose exec php composer install
$ docker compose exec php npm install

### seed data

$  docker compose exec php php artisan migrate:fresh --seed

Now application is running at http://localhost/


