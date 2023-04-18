const cTable = require('console.table');
const {homePage, addARole} = require('../index.js');


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
    homePage();
}

const queryRoles = function(){
    connection.query('SELECT * FROM roles;', (err, res) => {
        console.table(res);
        return res;
    })
}

const roleChoices = function() {
     connection.query('SELECT roles.title FROM roles;', (err, res) => {
        console.log(res)
        addARole(res);
    })
}     

// including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
const queryEmployees = function(){
    const sql = 'SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.department, roles.salary, employees.manager_id FROM roles JOIN employees ON roles.id=employees.role_id JOIN departments ON roles.department_id=departments.id;'
    connection.query(sql, (err, res) => {
        console.table(res);
    })
}

const roleDepartmentID = function(department) {
    if (`${department}` === "Actuarial") {
        return 4;
    }
    else if (`${department}` === "Human Resources") {
        return 3
    }
    else if (`${department}` === "Finance") {
        return 2; 
    }
    else {return 1;}
}

const newRole = function(answers){
    const sql = 'INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)';
    const params = [answers.rolename, answers.salary, `${roleDepartmentID(answers)}`];
    connection.query(sql, params,(err, res) => {
        if (err) {
        console.log(err)
        }
      console.log( res)  
    })
}

const determineRoleID = function(employeerole) {
    if (`${employeerole}` === "Sales Lead") {
        return 2;
    }    
    else if (`${employeerole}` === "Sales Person") {
        return 1;
    }
    else if (`${employeerole}` === "Accountant") {
        return 3;
    }
    else if (`${employeerole}` === "Recruiter") {
        return 4;
    }
    else if (`${employeerole}` === "Payroll Admin") {
        return 5;
    }
    else if (`${employeerole}` === "Data Scientist") {
        return 6;
    }
    else {return console.log("No Role ID exists in roles table")}

}

const newEmployee = function(answers){
    // need to confirm criteria for new employee
    const sql = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)';
    const params = [answers.firstname, answers.lastname, `${determineRoleID(answers)}`, answers.manager];
    connection.query(sql, params,(err, res) => {
        if (err) {
        console.log(err)
        }
      console.log("New Employee Information Added: ", res)  
    })
}

const updateEmployeeInfo = function(answers){
    // SQL statement should update employee role id in employee table"
    const sql = 'UPDATE employees SET role_id = (?) WHERE employees.first_name = ';
    const params = [answers.employee, `${roleDepartmentID(answers)}`];
        connection.query(sql, params,(err, res) => {
            if (err) {
            console.log(err)
            }
        })    
}

const createDepartment = function(department){
    connection.query('INSERT INTO departments SET ?;', department)
    console.log("added department");
}

module.exports = {queryDepartments, queryRoles, queryEmployees, newRole, newEmployee, updateEmployeeInfo, createDepartment, roleDepartmentID, roleChoices}