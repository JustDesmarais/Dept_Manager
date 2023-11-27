const inquirer = require('inquirer');
const mysql = require('mysql2');
// const {init, addOpts} = require('./lib/prompts.js')

/**const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root', 
        password: 'c1Nn@m0nRo1l!',
        database: 'depts_db'
    },
    console.log('Connected to the depts_db database')
);*/

function init () {
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
        {
            type: 'input',
            name: 'verify',
            message: 'are you sure?'
        }
    ])
    .then((response) =>
    console.log(response)
    );
};


init();

