const inquirer = require('inquirer');
const fs = require('fs');

const db = require('db/connection.js');
const {queryDepartments, queryRoles, addDepartment} = require('db/queries.js');

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

// Function to View All Employees

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


// Function to initialize app
function init(){
    homePage();
}

init();