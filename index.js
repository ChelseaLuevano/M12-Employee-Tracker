const inquirer = require('inquirer');
const fs = require('fs');

// CLI questions
const questions = [
    {
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
            "Update an Employee Role"
        ]
    }
]


// Function to initialize app
function init() {
    inquirer.prompt(questions)
        .then(answers => {
            
        })
        .catch(error => {
            console.log(error);
        });
}

// Function call to initialize app
init();