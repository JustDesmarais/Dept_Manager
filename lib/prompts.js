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
    db.query('SELECT * FROM role', async (err, roles) => {
        if (err) {
            console.log(err);
            menu();
            return
        }
        const managers = await chooseManager();
        await managers.push({ name: 'None', value: null })
        inquirer
        .prompt ([
            {
                type: 'input',
                name: 'first',
                message: 'What is the employee\'s first name?'
            }, 
            {
                type: 'input', 
                name: 'last', 
                message: 'What is the employee\'s last name?'
            }, 
            {
                type: 'list', 
                name: 'role',
                message: 'What is the employee\'s role?',
                choices: roles.map(role => role.title)
            },
            {
                type: 'list', 
                name: 'manager', 
                message: 'Who is this employee\'s manager?',
                choices: managers,
            }
        ]).then((response) => {
            const deptID = roles.find(role => role.title === response.role);
            const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
            const params = [response.first, response.last, deptID.id, response.manager];

            db.query(sql, params, (err) => {
                if (err) {
                    console.log(err);
                    menu();
                    return
                }
                console.log(`${params[0]} has been added!`);
                menu();
            });
        });
    });
};

function updateEmployee () {
    db.query(`SELECT CONCAT(first_name, ' ', last_name) AS name, id FROM employee`, async (err, results) => {
        if (err) {
            console.log(err);
            menu();
            return
        }
        const roles = await chooseNewRole();
        const chooseEmployee = await results.map(employee => ({ name: employee.name, value: employee.id}));
        inquirer
        .prompt ([
            {
                type: 'list',
                name: 'employee',
                message: 'Which employee would you like to update?',
                choices: chooseEmployee,
            },
            {
                type: 'list',
                name: 'newRole',
                message: 'What is this employee\'s new role?',
                choices: roles
            }
        ]).then((response) => {
            const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
            const params = [response.newRole, response.employee];
            db.query(sql, params, (err) => {
                if (err) {
                    console.log(err);
                    menu();
                    return
                }
                console.log('Employee Updated!')
                menu();
            })
        }) 
    });
};



function chooseManager () {
    return new Promise((resolve, reject) => {
        db.query(`SELECT CONCAT(first_name, ' ', last_name) AS name, id FROM employee`, (err, results) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(results.map(employee => ({ name: employee.name, value: employee.id})));
            }
        });
    });
};

function chooseNewRole () {
    return new Promise((resolve, reject) => {
        db.query(`SELECT title, id FROM role`, (err, results) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(results.map(role => ({ name: role.title, value: role.id})));
            }
        });
    });
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
    ]).then(menu());
}


module.exports = {
    menu
}