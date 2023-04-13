DROP DATABASE IF EXISTS human_resources_db;
-- Creates the "human_resources_db" database --
CREATE DATABASE human_resources_db;

-- Makes it so all of the following code will affect human_resources_db --
USE human_resources_db;

CREATE TABLE employees (
    id INT Not NULL PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(150) NOT NULL,
    last_name VARCHAR(150) NOT NULL,
    title VARCHAR(250) NOT NULL,
    department VARCHAR(250) NOT NULL,
    salary INT NOT NULL,
    manager
);


CREATE TABLE departments (
    id INT Not NULL PRIMARY KEY AUTO_INCREMENT,
    department VARCHAR(250) NOT NULL,
    FOREIGN KEY (employees_id)
    REFERENCES employees(id)
);