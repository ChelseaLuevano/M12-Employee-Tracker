const db = require('./connection.js');
const cTable = require('console.table');

const queryDepartments = function(){
 let allDepartments = (db.query('SELECT * FROM departments;'));
 console.log(allDepartments);
   console.table("the queryDepartments function was called");
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