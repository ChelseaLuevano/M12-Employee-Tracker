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
    const sql = 'SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.department, roles.salary, employees.manager FROM employees JOIN roles ON employees.role_id=roles.id JOIN departments ON employees.department_id=departments.id;'
    connection.query(sql, (err, res) => {
        console.table(res);
    })
}

const roleDepartmentID = function(department) {
    // let departmentid;
    console.log("the roleDepartmentID function was called");

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
    console.log("the newRole function was called")

    // let departmentid;
    // if (answers.department === "Actuarial") {
    //     return departmentid = 4

    // }
    // else if (answers.department === "Human Resources") {
    //     return departmentid = 3
    // }
    // else if (answers.department === "Finance") {
    //     return departmentid = 2
    // }
    // else {return 1}; 
    roleDepartmentID(answers);
    const sql = 'INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)';
    const params = [answers.rolename, answers.salary, `${roleDepartmentID(answers)}`];
    connection.query(sql, params,(err, res) => {
        if (err) {
        console.log(err)
        }
      console.log("New Role: ", res, "has been added!")  
    })
}

const newEmployee = function(answers){
    // need to confirm criteria for new employee
    const sql = 'INSERT INTO employees (first_name, last_name, department_id, manager) VALUES (?,?,?)';
    const params = [answers.firstname, answers.employeerole,answers.manager];
    connection.query(sql, params,(err, res) => {
        if (err) {
        console.log(err)
        }
      console.log("New Employee Information Added: ", res)  
    })
}

const updateEmployeeInfo = function(answer){
    // SQL statement should update employee role id in employee table"
    const sql = 'UPDATE employees SET role_id = (?) WHERE employees.first_name = ';
    const params = [answer.employee];
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

module.exports = {queryDepartments, queryRoles, queryEmployees, newRole, newEmployee, updateEmployeeInfo, createDepartment, roleDepartmentID}