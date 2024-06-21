-- Create the test database
CREATE DATABASE IF NOT EXISTS testing;
-- Create the media_store database
CREATE DATABASE IF NOT EXISTS media_store;

-- Grant privileges to the media_user
GRANT ALL PRIVILEGES ON media_store.* TO 'media_user'@'%';
GRANT ALL PRIVILEGES ON testing.* TO 'media_user'@'%';
FLUSH PRIVILEGES;