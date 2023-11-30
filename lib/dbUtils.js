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


function deptQuery () {
    db.promise().query('SELECT * FROM department')
        .then( ([rows, fields]) => console.table(rows))
            .catch(console.log);
};

function roleQuery () {
    db.promise().query('SELECT role.id, title, salary, department.dept_name AS department FROM role JOIN department ON role.department_id = department.id')
        .then( ([rows, fields]) => console.table(rows))
            .catch(console.log);
};

function employeeQuery () {
    db.promise().query(`SELECT e.id, e.first_name, e.last_name, role.title, department.dept_name AS department, CONCAT(m.first_name, ' ', m.last_name) AS manager_name FROM employee e JOIN role ON role_id = role.id JOIN department on department_id = department.id LEFT JOIN employee m ON e.manager_id = m.id`)
        .then( ([rows, fields]) => console.table(rows))
            .catch(console.log);
}

function deptAdd (data) {
    const sql = `INSERT INTO department (dept_name) VALUES (?)`;
    const params = [data.newDept];
    db.promise().query(sql, params)
        .then( (data) => {
            console.log(`${data.newDept} added to departments!`);
        }).catch(console.log);
};

function roleAdd (data) {
    db.query(`SELECT id  FROM department WHERE dept_name = '${data.roleDept}'`, (err, results)  => {
        if (err) {
            console.log(err);
        };
        return results;
    });

    
    /**const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
    const params = [data.roleName, data.roleSalary, dept]
    db.query(sql, params, (err, results)  => {
        if (err) {
            console.log(err);
        };
        console.log(`${data.roleName} added to departments!`);
        });*/
};

function employeeAdd (data){
    console.log(`employee added!`)
}



module.exports = {
    deptQuery,
    roleQuery,
    employeeQuery,
    deptAdd,
    roleAdd,
    employeeAdd
}
