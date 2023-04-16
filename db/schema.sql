DROP DATABASE IF EXISTS human_resources_db;

-- Creates the "human_resources_db" database --
CREATE DATABASE human_resources_db;

-- Makes it so all of the following code will affect human_resources_db --
USE human_resources_db;


CREATE TABLE departments (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    department VARCHAR(30) NOT NULL
);    


CREATE TABLE roles (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id)
    REFERENCES departments(id)
);

CREATE TABLE employees (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    manager_id INT,
    role_id INT NOT NULL,
    FOREIGN KEY (role_id)
    REFERENCES roles (id)
);


