const inquirer= require("inquirer");
const console = require('console')
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root', 
        password: 'c1Nn@m0nRo1l!',
        database: 'depts_db'
    },
    console.log('Connected to the depts_db database')
);


let deptArray = ['Marketing', 'Engineering', 'Finance', 'Legal','Sales'];
let roleArray = ['Account Executive', 'Account Coordinator', 'Social Media Manager', 'Lead Engineer', 'Software Engineer', 'QA Tester', 'Account Manager', 'Accountant', 'Legal Team Lead', 'Lawyer', 'Sales Lead', 'Salesperson'];


function deptQuery (data) {
    db.promise.query(`INSERT INTO department (dept_name) VALUES (${data.deptAdd})`, (err)  => {
        if (err) {
            console.log(err);
        };
        console.log(`${data.deptAdd} added to departments!`);
        }).then( () => db.end());
};

function roleQuery (data) {
    db.promise.query(`INSERT INTO role (title, salary, department_id) VALUES (${data.roleName}, ${data.roleSalary})`, (err)  => {
        if (err) {
            console.log(err);
        };
        console.log(`${data.deptAdd} added to departments!`);
        }).then( () => db.end());
};



module.exports = {
    deptQuery,
    roleQuery,
}