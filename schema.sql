DROP DATABASE IF EXISTS exam;

CREATE DATABASE exam;  /* create database instance */

USE exam;

-- CREATE USER 'dbuser'@'localhost' IDENTIFIED BY 'dbuser';  /* create database user */
-- GRANT ALL PRIVILEGES ON exam.* TO 'dbuser'@'localhost';   /* grant full privileges to user */
-- FLUSH PRIVILEGES; 

CREATE TABLE permissions (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) DEFAULT NULL,
    login VARCHAR(50) UNIQUE,
    email VARCHAR(50) DEFAULT NULL,
    user_type VARCHAR(50) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_permissions (
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    permission_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    foreign key (user_id) references users(id),
    foreign key (permission_id) references permissions(id)
);
-- ====================== INSERT ================================
INSERT INTO permissions (name) values("view users"), ("update users"), ("delete users");

INSERT INTO users (firstname, lastname, login, email) 
	values
		("User1Name", "User1Surname", "user_1", "user1@user1.com"),
		("User2Name", "User2Surname", "user_2", "user2@user2.com"),
		("User3Name", "User3Surname", "user_3", "user3@user3.com"),
        ("User4Name", "User4Surname", "user_4", "user4@user4.com"),
        ("User5Name", "User5Surname", "user_5", "user5@user5.com");
        
INSERT INTO user_permissions (user_id, permission_id)
	VALUES
		(1,1),
        (1,2),
        (2,1),
        (2,2),
        (2,3);

