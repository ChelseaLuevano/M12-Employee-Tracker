const cTable = require('console.table');

// Import and require mysql2
const mysql = require('mysql2');

// Connect to database
const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'HappyDog13$',
      database: 'human_resources_db'
    },
    console.log(`Connected to the human_resources_db database.`)
  );
 connection.connect();
  

const queryDepartments = function(){
console.log("the queryDepartments function was called");
connection.query('SELECT * FROM departments;', (err, res) => {
    console.log("response is", res)
 });

}

const queryRoles = function(){
    db.query('SELECT * FROM roles;')
}

const queryEmployees = function(){
    db.query('SELECT * FROM employees;')
}

const newRole = function(answers){
    db.query('INSERT INTO roles (title, salary, department_id) VALUES (?,?,?);', rolename, salary, department)
}

const newEmployee = function(){
    console.log("new employee added")
}

const updateEmployeeInfo = function(){
    console.log("new employee's info has been added")
}

const createDepartment = function(department){
    db.query('INSERT INTO departments SET ?;', department)
    console.log("added department");
}

module.exports = {queryDepartments, queryRoles, queryEmployees, newRole, newEmployee, updateEmployeeInfo, createDepartment}