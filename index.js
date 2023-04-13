const inquirer = require('inquirer');
const fs = require('fs');

const db = require('./db/connection');
const {queryDepartments, queryRoles, queryEmployees,  newRole, newEmployee, updateEmployeeInfo, createDepartment} = require('./db/queries.js');

// CLI questions
const hubQuestion = {
        type: 'list',
        message: 'What would you like to do?',
        name: 'activity',
        choices: [
            "View All Departments",
            "View All Roles",
            "View All Employees",
            "Add a Department", 
            "Add a Role",
            "Add an Employee", 
            "Update an Employee Role",
            "Quit"
        ]
}

// Function to initialize app
function homePage() {
    inquirer.prompt(hubQuestion)
        .then(answer => {
            switch(answer){
                case "View All Departments":
                    viewAllDepartments()
                    break;
                case "View All Roles":
                    viewAllRoles()
                    break; 
                case "View All Employees":
                    viewAllEmployees()
                    break;
                case "Add a Department":
                    addADepartment()
                    break;
                case "Add a Role":
                    addARole()
                    break;
                case "Add an Employee":   
                    addEmployee()
                    break;
                case "Update an Employee Role":
                    updateEmployeeRole()
                    break;
                case "Quit":
                    quit()
                    break;    
            }
        })
        .catch(error => {
            console.log(error);
        });
}

// Function to View All Department
function viewAllDepartments() {
    queryDepartments();
    homePage();
}

// Function to View All Roles
function viewAllRoles() {
    queryRoles();
    homePage();
}

// Function to View All Employees
function viewAllEmployees() {
    queryEmployees();
    homePage();
}

// Function to Add a Department
function addADepartment(){
    inquirer.prompt(
        {
            type: 'input',
            message: 'What is the name of the department?',
            name: 'department',
            validate: (value) => { if (value) { return true } else { return "Please enter a department title." }},
        }
    ).then((answer)=> {
        createDepartment(answer);
        homePage();
    })
}

// Function to Add a Role
function addARole() {
    inquirer.prompt(
        {
            type: 'input',
            message: 'What is the name of the role?',
            name: 'rolename',
            validate: (value) => { if (value) { return true } else { return "Please enter a role name." }},
        },
        {
            type: 'input',
            message: 'What is the salary for the role?',
            name: 'salary',
            validate: (value) => { if (value) { return true } else { return "Please enter a salary." }},
        },
        {
            type: 'input',
            message: 'What department is the role in?',
            name: 'department',
            validate: (value) => { if (value) { return true } else { return "Please enter a salary." }},
        },
    ).then((answers)=> {
        newRole(answers);
        homePage();
    })   
}

// Function to Add an Employee
function addEmployee(){
    inquirer.prompt(
        {
            type: 'input',
            message: 'What is the first name of the employee?',
            name: 'firstname',
            validate: (value) => { if (value) { return true } else { return "Please enter a first name." }},
        },
        {
            type: 'list',
            message: 'What is the role of the employee?',
            name: 'employeerole',
            choices: [
                "Sales Person",
                "Sales Lead",
                "Accountant"
            ],
            validate: (value) => { if (value) { return true } else { return "Please pick a role from the list." }},
        },
        {
            type: 'input',
            message: "What is the first and last name of the employee's manager?",
            name: 'manager',
            validate: (value) => { if (value) { return true } else { return "Please enter manager's name." }},
        },
    ).then((answers) => {
        newEmployee();
        homePage();
    })
}

// Function to Update an Employee Role
function updateEmployeeRole(){
    updateEmployeeRole();
    homePage();
}

// Function to initialize app
function init(){
    homePage();
}

init();