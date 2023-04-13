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
    department_id INT NOT NULL,
    manager VARCHAR(150),
    role_id INT NOT NULL,
    FOREIGN KEY (department_id)
    REFERENCES departments(id)
    FOREIGN KEY (role_id)
    REFERENCES roles (id)
);


CREATE TABLE departments (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    department VARCHAR(250) NOT NULL
);

CREATE TABLE roles (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(250) NOT NULL,
    salary INT NOT NULL
    department_id INT NOT NULL,
    FOREIGN KEY (department_id)
    REFERENCES departments(id)
);