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

$ ./vendor/bin/sail up -d

### seed data

$ ./vendor/bin/sail artisan migrate:fresh --seed

Now application is running at http://localhost/

### Running the Development Server in Sail on WSL2

$ ./vendor/bin/sail npm run dev
