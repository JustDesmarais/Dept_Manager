const express = require('express');
// const inquirer = require('inquirer');
const mysql = require('mysql2');
const {init, addOpts} = require('./lib/prompts.js')

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/**const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root', 
        password: 'c1Nn@m0nRo1l!',
        database: 'depts_db'
    },
    console.log('Connected to the depts_db database')
);*/

app.use((req, res) => {
    res.status(404).end();
  });
  
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  

init();

