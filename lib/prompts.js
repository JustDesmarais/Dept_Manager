const inquirer = require("inquirer");

const { deptQuery, roleQuery, employeeQuery, deptAdd, roleAdd, employeeAdd } = require('./dbUtils');

let deptsArray = ['Marketing', 'Engineering', 'Finance', 'Legal','Sales'];
let roleArray = ['Account Executive', 'Account Coordinator', 'Social Media Manager', 'Lead Engineer', 'Software Engineer', 'QA Tester', 'Account Manager', 'Accountant', 'Legal Team Lead', 'Lawyer', 'Sales Lead', 'Salesperson'];

function menu () {
    inquirer
    .prompt ([
        {
            type: 'list',
            name: 'userSel',
            message: 'What would you like to do?',
            default: 'View all departments',
            choices: [
                'View all departments', 
                'View all roles',
                'View all employees', 
                'Add a department',
                'Add a role', 
                'Add an employee', 
                'Update employee role', 
                'Additional Options'
                ]
        },
    ])
    .then( async (response) => {
    switch (response.userSel) {
        case 'View all departments':
            await deptQuery();
            //menu();
            break;
        case 'View all roles':
            roleQuery();
            //menu();
            break;
        case 'View all employees':
            employeeQuery();
            //menu();
            break; 
        case 'Add a department':
            newDept();
            //menu();
            break;
        case 'Add a role':
            newRole();
            //menu();
            break;
        case 'Add an employee':
            newEmployee();
            //menu();
            break;
        case 'Update employee role':
            updateEmployee();
            //menu();
            break;
        case 'Additional Options': 
            addOpts();
            break;
    };
    //console.log(response)
    });
};

function newDept () {
    inquirer
    .prompt([
        {
            type: 'input', 
            name: 'newDept',
            message: 'What is the name of the department you would like to add?'
        }
    ])
    .then((response) => {
        deptsArray.push(response.deptAdd);
        deptAdd (response);
        menu();
    });
};

function newRole () {
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
        roleAdd(response);
    })
}

function newEmployee() {
    inquirer
    .prompt ([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the employee\'s first name?'
        }, 
        {
            type: 'input', 
            name: 'last_name', 
            message: 'What is the employee\'s last name?'
        }, 
        {
            type: 'list', 
            name: 'role',
            message: 'What is the employee\'s role?',
            choices: roleArray
        }
    ]).then((response) => {
        employeeAdd(response)
    });
};


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
    menu
}