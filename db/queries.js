const cTable = require('console.table');
const {homePage} = require('../index.js');

// Import and require mysql2
const mysql = require('mysql2');

// Connect to database
const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'HappyDog13$',
      database: 'human_resources_db'
    }
  );
 connection.connect();
  
const queryDepartments = function(){
    // console.log("the queryDepartments function was called");
    connection.query('SELECT * FROM departments;', (err, res) => {
        console.table(res); 
    });
    // homePage();
}

const queryRoles = function(){
    connection.query('SELECT * FROM roles;', (err, res) => {
        console.table(res);
    })
}

// including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
const queryEmployees = function(){
    connection.query('SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.department, roles.salary, employees.manager FROM employees JOIN roles ON employees.role_id=roles.id JOIN departments ON employees.department_id=departments.id;', (err, res) => {
        console.table(res);
    })
}

const newRole = function(answers){
    connection.query('INSERT INTO roles (title, salary, department_id) VALUES (?,?,?);', rolename, salary, department)
}

const newEmployee = function(){
    console.log("new employee added")
}

const updateEmployeeInfo = function(){
    console.log("new employee's info has been added")
}

const createDepartment = function(department){
    connection.query('INSERT INTO departments SET ?;', department)
    console.log("added department");
}

module.exports = {queryDepartments, queryRoles, queryEmployees, newRole, newEmployee, updateEmployeeInfo, createDepartment}