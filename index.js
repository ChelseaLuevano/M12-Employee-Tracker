const inquirer = require('inquirer');
const {queryDepartments, queryRoles, queryEmployees, newRole, newEmployee, updateEmployeeInfo, createDepartment, roleChoices, departmentChoices, employeeChoices, roleDepartmentID} = require('./db/queries.js');

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
                        if (departmentArray.includes(value)) {return "Department already exists"} 
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
let departmentArray = []
    departmentChoices()
        .then((departmentList) => {
           departmentArray = departmentList[0].map(d => ({"value": d.department, "name": d.name}));

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
                    validate: (value) => {if (isNaN(value)) {return 'Please enter a number' } else { return true }},
                },
                {
                    type: 'list',
                    message: 'What department is the role in?',
                    name: 'department',
                    choices: departmentArray,    
                    validate: (value) => { 
                        if (departmentArray.includes(value)) {return true} 
                        else {return "Please enter an existing department"}
                    }
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
    let roleArray =[];
    let managerArray =[{"value": null, "name": "n/a"}];
    roleChoices()
        .then((roleList) => {
          roleArray = roleList[0].map(role => ({"value": role.id, "name": role.title}));
        
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
                choices: roleArray,
                validate: (value) => {
                    if (roleArray.includes(value)) {return true} 
                        else {return "Please enter an existing role"}},
            },
            {
                type: 'list',
                message: "Who is the employee's manager?",
                name: 'manager',
                choices: managerArray,    
            },
        ]).then((answers) => {
            newEmployee(answers)
                .then(function(data) {
                    console.log(data)
                    homePage();
            });
        })
    })
}


// Function to Update an Employee Role
function updateEmployeeRole(){
    employeeArray = []
    let roleArray =[];
    roleChoices()
        .then((roleList) => {
            roleArray = roleList[0].map(role => ({"value": role.id, "name": role.title}));
    employeeChoices()
        .then((employeeList) => {
            employeeArray = employeeList[0].map(e => ({"value": e.first_name, "name": e.firstname}))
            
    inquirer.prompt([
            {
                type: 'list',
                message: 'What employee would you like to update role information for?',
                name: 'employee',
                choices: employeeArray,
                validate: (value) => { if (value) { return true } else { return "Please pick an employee." }},
            },
            {
                type: 'list',
                message: 'What is the new role of the employee?',
                name: 'newrole',
                choices: roleArray,
                validate: (value) => { if (value) { return true } else { return "Please pick a role from the list." }},
            },
        ]    
            ).then((answers) => {  
            updateEmployeeInfo(answers);
            homePage();
            })

        })
    })
}


// Function to initialize app
function init(){
    homePage();
}

init();
