const inquirer = require("inquirer");

async function init () {
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
                console.log(results);
              });
            break;
        case 'View all roles':
            db.query('SELECT * FROM role', function (err, results) {
                console.log(results);
              });
            break;
        case 'View all employees':
            db.query('SELECT * FROM employee', function (err, results) {
                console.log(results);
              });
            break; 
        case 'Add a department':
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
    init,
    addOpts
}