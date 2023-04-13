
const db = require('/connection.js');

const queryDepartments = function(){
    db.query('SELECT * FROM departments;')
}

const queryRoles = function(){
    db.query('SELECT * FROM roles;')
}

const addDepartment = function(department){
    db.query('INSERT INTO departments SET ?;', department)
    console.log("added department");
}
modules.exports = {queryDepartments, queryRoles,  addDepartment}