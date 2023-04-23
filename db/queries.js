const cTable = require('console.table');
// const {departmentChoices, addARole} = require('../index.js');

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
  
const queryDepartments = function(homePageCallback){
    // console.log("the queryDepartments function was called");
    connection.query('SELECT * FROM departments;', (err, res) => {
        console.table(res);
        homePageCallback(); 
    });

}

const departmentChoices = function() {
    // const departmentArray = [];
    return connection.promise().query('SELECT departments.department FROM departments;')
}

const queryRoles = function(homePageCallback){
    connection.query('SELECT * FROM roles;', (err, res) => {
        console.table(res);
        homePageCallback();
    })
}

const roleChoices = function() {
     return connection.promise().query('SELECT roles.id, roles.title FROM roles;')
}     

// including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
const queryEmployees = function(homePageCallback){
    const sql = 'SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.department, roles.salary, employees.manager_id FROM roles JOIN employees ON roles.id=employees.role_id JOIN departments ON roles.department_id=departments.id;'
    connection.query(sql, (err, res) => {
        console.table(res);
        homePageCallback();
    })
}

const createDepartment = function(department){
    const sql = 'INSERT INTO departments (department) VALUES (?);';
    return connection.promise().query(sql, department);   
}

const roleDepartmentID = function(department) {
    const sql = 'SELECT departments.id FROM departments WHERE department = (?)'
    const params = [department]
    return connection.promise().query(sql, params, (err, res) => {
        if (err) {
            console.log(err)
            }  
        else return res    
        })    
}

const newRole = function(answers){
    const sql = 'INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)';
    const params = [answers.rolename, answers.salary, `${roleDepartmentID(answers.department)}`];
   return  connection.promise().query(sql, params,(err, res) => {
        if (err) {
        console.log(err)
        } 
    })
}


const newEmployee = function(answers){
    const sql = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)';
    const params = [answers.firstname, answers.lastname, answers.employeerole, answers.manager];
   return connection.promise().query(sql, params,(err, res) => {
        if (err) {
        console.log(err)
        }
      console.log("New Employee Information Added: ", res)  
    })
}

const employeeChoices = function() {
    return connection.promise().query('SELECT employees.id, employees.first_name, employees.last_name, employees.role_id FROM employees;')
}     


const updateEmployeeInfo = function(answers){
    // SQL statement should update employee role id in employee table"
    const sql = 'UPDATE employees SET role_id = (?) WHERE first_name = (?)';
    const params = [answers.newrole, answers.employee];
       return connection.promise().query(sql, params,(err, res) => {
            if (err) {
            console.log(err)
            }
        })    
}

module.exports = {queryDepartments, queryRoles, queryEmployees, newRole, newEmployee, updateEmployeeInfo, createDepartment, roleDepartmentID, roleChoices, departmentChoices, employeeChoices}