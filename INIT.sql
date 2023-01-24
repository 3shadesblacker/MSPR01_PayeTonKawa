CREATE DATABASE PTonKawa;

USE PTonKawa;


CREATE TABLE STOCKS (id INT PRIMARY KEY,
                                    productId INT);


CREATE TABLE USERS (id INT PRIMARY KEY,
                                   email NVARCHAR(256),
                                         passwd NVARCHAR(256));


CREATE TABLE TOKENS (id INT PRIMARY KEY,
                                    userId INT, token NVARCHAR(256),
                     FOREIGN KEY (userId) REFERENCES USERS(id));