const inquirer = require('inquirer');
const {queryDepartments, queryRoles, queryEmployees, newRole, newEmployee, updateEmployeeInfo, createDepartment, roleDepartmentID, roleChoices, departmentChoices} = require('./db/queries.js');

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
            console.log(answer)
            switch(answer.activity){
                case "View All Departments":
                    console.log("in view all departments case");
                    viewAllDepartments();
                    break;
                case "View All Roles":
                    viewAllRoles();
                    break; 
                case "View All Employees":
                    viewAllEmployees();
                    break;
                case "Add a Department":
                    addADepartment();
                    break;
                case "Add a Role":
                    addARole();
                    break;
                case "Add an Employee":   
                    addEmployee();
                    break;
                case "Update an Employee Role":
                    updateEmployeeRole();
                    break;
                case "Quit":
                    quit();
                    break;    
            }
        })
        .catch(error => {
            console.log(error);
        });
}

// Function to View All Department
function viewAllDepartments() {
    console.log("viewAllDepartments function was called")
    queryDepartments(homePage)
}

// Function to View All Roles
function viewAllRoles() {
    queryRoles(homePage);
}

// Function to View All Employees
function viewAllEmployees() {
    queryEmployees(homePage);
}

// Function to Add a Department
function addADepartment(){
    const departmentArray = []
    departmentChoices()
        .then((departmentList) => {
            departmentList[0].forEach(element => {
            departmentArray.push(element.department); 
            }) 
            inquirer.prompt(
                {
                    type: 'input',
                    message: 'What is the name of the department?',
                    name: 'department',
                    validate: (value) => { 
                        if (departmentArray.includes(value)) { return "Department already exists"} 
                        else {return true}}
                }
            ).then((answer)=> {
                createDepartment(answer.department)
                    .then(function(data) {
                        homePage();
                    });
        });
    })
}


// Function to Add a Role
function addARole() {
const departmentArray = []
    departmentChoices()
        .then((departmentList) => {
            departmentList[0].forEach(element => {
            departmentArray.push(element.department); 
            })
            inquirer.prompt([
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
                    // validate: (value) => { if (typeof value === "number") { return true } else { return "Please enter a salary with number format of two decimal places." }},
                },
                {
                    type: 'list',
                    message: 'What department is the role in?',
                    name: 'department',
                    choices: departmentArray,    
                    // validate: (value) => { if (department === "Actuarial")  { return true } else { return "Please select a department title." }},
                },
            ]).then((answers)=> {
                newRole(answers)
                    .then(function(data) {
                        console.log(data)
                        homePage();
                });
                
            })   
        })
    
}

// Function to Add an Employee
function addEmployee(){
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the first name of the employee?',
            name: 'firstname',
            validate: (value) => { if (value) { return true } else { return "Please enter a first name." }},
        },
        {
            type: 'input',
            message: 'What is the last name of the employee?',
            name: 'lastname',
            validate: (value) => { if (value) { return true } else { return "Please enter a last name." }},
        },
        {
            type: 'list',
            message: 'What is the role of the employee?',
            name: 'employeerole',
            choices: [
                "Accountant",
                "Data Scientist",
                "Payroll Admin",
                "Recruiter",
                "Sales Person",
                "Sales Lead",
            ],
            validate: (value) => { if (value) { return true } else { return "Please pick a role from the list." }},
        },
        {
            type: 'list',
            message: "Who is the employee's manager?",
            name: 'manager',
            choices: [
                "SpongeBob",
                "Eugene",
                "Patrick",
                "Squidward",
                "Snady",
                "Pearl",
                "Gerald Gary Snail Wilson Jr",
                "Sheldon",
            ],    
            validate: (value) => { if (value) { return true } else { return "Please enter manager's name." }},
        },
    ]   
    ).then((answers) => {
        newEmployee(answers);
        // homePage();
    })
}

// Function to Update an Employee Role
function updateEmployeeRole(){
    inquirer.prompt([
            {
                type: 'list',
                message: 'What employee would you like to update role information for?',
                name: 'employee',
                choices: [
                    "SpongeBob",
                    "Patrick",
                    "Eugene",
                    "Squidward",
                    "Sandy",
                    "Pearl",
                    "Gerald Gary Snail Wilson Jr"
                ],
                validate: (value) => { if (value) { return true } else { return "Please pick an employee." }},
            },
            {
                type: 'list',
                message: 'What is the new role of the employee?',
                name: 'newrole',
                choices: [
                    "Accountant",
                    "Data Scientist",
                    "Payroll Admin",
                    "Recruiter",
                    "Sales Person",
                    "Sales Lead",
                ],
                validate: (value) => { if (value) { return true } else { return "Please pick a role from the list." }},
            },
        ]    
    ).then(() => {  
    updateEmployeeInfo(answers);
    // homePage();
    })
}

// Function to initialize app
function init(){
    homePage();
}

init();

// module.exports = {homePage, addARole}