const inquirer = require("inquirer");
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
    .then( (response) => {
    switch (response.userSel) {
        case 'View all departments':
            deptQuery();
            break;
        case 'View all roles':
            roleQuery();
            break;
        case 'View all employees':
            employeeQuery();
            break; 
        case 'Add a department':
            newDept();
            break;
        case 'Add a role':
            newRole();
            break;
        case 'Add an employee':
            newEmployee();
            break;
        case 'Update employee role':
            updateEmployee();
            break;
        case 'Additional Options': 
            addOpts();
            break;
    };
    //console.log(response)
    });
};

function deptQuery () {
    db.query('SELECT * FROM department', (err, results) => {
        if (err) {
            console.log(err);
        }; 
        console.table(results);
        menu();
    });      
};

function roleQuery () {
    db.query('SELECT role.id, title, salary, department.dept_name AS department FROM role JOIN department ON role.department_id = department.id', (err, results) => {
        if (err) {
            console.log(err);
        }; 
        console.table(results);
        menu();
    });      
};

function employeeQuery () {
    db.query(`SELECT e.id, e.first_name, e.last_name, role.title, department.dept_name AS department, CONCAT(m.first_name, ' ', m.last_name) AS manager_name FROM employee e JOIN role ON role_id = role.id JOIN department on department_id = department.id LEFT JOIN employee m ON e.manager_id = m.id`, (err, results) => {
        if (err) {
            console.log(err);
        }; 
        console.table(results);
        menu();
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
            const sql = `INSERT INTO department (dept_name) VALUES (?)`;
            const params = [response.newDept];

            db.query(sql, params, (err, results) => {
                if (err) {
                    console.log(err);
                    menu();
                    return
                }  
                console.table(`${params} has been added!`);
                menu();            
        });
    });
};

function newRole () {
    db.query('SELECT * FROM department', (err, results) => {
        if (err) {
            console.log(err);
            menu();
            return
        }
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
                choices: results.map(department => department.dept_name)          
            }
        ]).then((response) => {
            const deptID = results.find(department => department.dept_name === response.roleDept);
            const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
            const params = [response.roleName, response.roleSalary, deptID.id];

            db.query(sql, params, (err) => {
                if (err) {
                    console.log(err);
                    menu();
                    return
                }
                console.log(`${params[0]} has been added!`);
                menu();
            })
        });
    });        
};            
       
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