const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const figlet = require('figlet')


const passcode = require("./creds");

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: passcode,
    database: 'employee_trackerDB',
});


 
figlet('Employee Tracker!', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
});


connection.connect((err) => {
    if ( err ) throw err; 
    console.log('You are connected to SkyNet.');
    startPrompt();
});



const startPrompt = () => {
    inquirer
        .prompt(
            {
                type: 'list',
                name: 'init',
                message: 'What would you like to do?',
                choices:[
                    'View Departments',
                    'View Employee Roles',
                    'View Employees',
                    'Add Department',
                    'Add Employee Role',
                    'Add Employees',
                    'Update Employee Role',
                    'End Connection'
                ]          
            })
            .then(function (res) {
			console.log(res.question);
			    switch (res.question) {
				    case 'View Departments':
					    viewDepartment();
					    break;
				    case 'View Employee Roles':
					    viewRoles();
					    break;
				    case 'View Employees':
					    viewEmployees();
					    break;
				    case 'Add Department':
					    addDepartment();
					    break;
				    case 'Add Employee Role':
					    addRole();
					    break;
				    case 'Add Employees':
					    addEmployee();
					    break;
				    case 'Update Employee Role':
					    updateEmployeeRole();
					    break;
				    case 'End Connection':
					    connection.end();
					    break;
				    default:
					    console.log('This is a employee directory app.');
	            }
            });
}

viewDepartment = () => {
    connection.query('SELECT * FROM departments', (err,data) => {
        if (err) throw err;
        console.table(data);
    });
}
























