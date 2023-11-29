const express = require('express');
const inquirer = require('inquirer');

const {addOpts} = require('./lib/prompts.js')

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


function init() {
    menu();
}


//db.query('SELECT * FROM department', function (err, results) {
  //  console.table(results);
  //});

async function menu () {
    await inquirer
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
        }
    ])
    .then((response) => {
    switch (response.userSel) {
        case 'View all departments':
            db.query('SELECT * FROM department', function (err, results) {
                console.table(results);
                });
                menu();
            break;
        case 'View all roles':
            db.query('SELECT role.id, title, salary, department.dept_name AS department FROM role JOIN department ON role.department_id = department.id', function (err, results) {
                console.table(results);
                menu();
                });
            break;
        case 'View all employees':
            db.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.dept_name AS department FROM employee JOIN role ON role_id = role.id JOIN department on department_id = department.id', function (err, results) {
                console.table(results);
                menu();
                });
            break; 
        case 'Add a department':
            inquirer
            .prompt([
                {
                    type: 'input', 
                    name: 'deptAdd',
                    message: 'What is the name of the department you would like to add?'
                }
            ])
        case 'Add a role':
        case 'Add an employee':
        case 'Update employee role':
        case 'Additional Options': 
            addOpts();
            break;
    };
    //console.log(response)
    });
};


app.use((req, res) => {
    res.status(404).end();
  });
  
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  
init();
