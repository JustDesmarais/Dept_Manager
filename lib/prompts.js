const inquirer = require("inquirer");

const { deptQuery, roleQuery } = require('./dbUtils');

let deptArray = ['Marketing', 'Engineering', 'Finance', 'Legal','Sales'];
let roleArray = ['Account Executive', 'Account Coordinator', 'Social Media Manager', 'Lead Engineer', 'Software Engineer', 'QA Tester', 'Account Manager', 'Accountant', 'Legal Team Lead', 'Lawyer', 'Sales Lead', 'Salesperson'];

function addDept () {
    inquirer
    .prompt([
        {
            type: 'input', 
            name: 'deptAdd',
            message: 'What is the name of the department you would like to add?'
        }
    ])
    .then((response) => {
        deptsArray.push(response.deptAdd);
        deptQuery (respons);
    });
};

function addRole () {
    inquirer
    .prompt ([
        {
            type: 'input',
            name: 'roleName',
            message: 'What is the title of the new role you would like to add?'
        },
        {
            type: 'input',
            name: 'roleSalary',
            message: 'What is the salary of this new role?'
        }, 
        {
            type: 'list', 
            name: 'roleDept',
            message: 'What department will this new role fall under',
            choices: deptsArray            
        }
    ]).then((response) => {
        roleArray.push(response.roleName);
        roleQuery(response);
    })
}




function addOpts () {
    inquirer
    .prompt ([
        {
            type: 'list',
            name: 'additionalOptions',
            message: 'what would you like to do?',
            choices: [
                'Update employee managers',
                'View employees by manager',
                'View employees by department',
                'Delete departments, roles, and employees', 
                'View total utlizied budget of a department'
            ]
        },
    ])
}


module.exports = {
    menu,
    addOpts
}