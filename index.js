const inquirer = require('inquirer');
const mysql = require('mysql2');
const promptMod = require('./lib/prompts.js')

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root', 
        password: 'c1Nn@m0nRo1l!',
        database: 'depts_db'
    },
    console.log('Connected to the depts_db database')
);
