DROP DATABASE IF EXISTS human_resources_db;

-- Creates the "human_resources_db" database --
CREATE DATABASE human_resources_db;

-- Makes it so all of the following code will affect human_resources_db --
USE human_resources_db;

CREATE TABLE employees (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(150) NOT NULL,
    last_name VARCHAR(150) NOT NULL,
    title VARCHAR (150) NOT NULL,
    department VARCHAR(250) NOT NULL,
    salary INT NOT NULL,
    manager VARCHAR(150),
    FOREIGN KEY (departments_department)
    REFERENCES departments(department)
    FOREIGN KEY (roles_title)
    REFERENCES roles (title)
);


CREATE TABLE departments (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    department VARCHAR(250) NOT NULL,
    FOREIGN KEY (employees_id)
    REFERENCES employees(id)
);

CREATE TABLE roles (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(250) NOT NULL
);