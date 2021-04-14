const mysql = require('mysql');
const inquirer = require('inquirer');
const passcode = require("./creds");

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: passcode,
    database: 'employee_trackerDB',
});

function startPrompt() {
    inquirer
        .prompt(
            {
                type: 'list',
                name: 'question',
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
				    
	            }
            });
}

function viewDepartment () {
    connection.query('SELECT * FROM departments', (err,data) => {
        if (err) throw err;
        console.table(data);
        startPrompt();
    });
}

function viewRoles () {
	connection.query(
		'SELECT roleTitle, roleSalary, departments.departmentName FROM employee_trackerDB.roles LEFT JOIN employee_trackerDB.departments ON roles.departmentID = departments.departmentID ORDER BY roles.roleSalary',
		function (err, data) {
			if (err) throw err;
			console.table(data);
			startPrompt();
    });
}

function viewEmployees () {
	connection.query(
		'SELECT employeeFirstName, employeeLastName, roleTitle, roleSalary, departments.departmentName FROM employee_trackerDB.employees LEFT JOIN employee_trackerDB.roles ON employees.roleID = roles.roleID LEFT JOIN employee_trackerDB.departments ON roles.departmentID = departments.departmentID ORDER BY roles.roleTitle',
		function (err, data) {
			if (err) throw err;
			console.table(data);
			startPrompt();
		}
	);
}

function addDepartment () {
	inquirer
		.prompt({
			message: 'What department do you want to add?',
			type: 'input',
			name: 'departmentName'
		})
		.then(function (res) {
			console.log(res.departmentName);
			connection.query(
				`INSERT INTO employee_trackerDB.departments (departmentName) VALUES ('${res.departmentName}')`,
				function (err) {
					if (err) throw err;
					viewDepartment();
					startPrompt();
				}
			);
		});
}

function departmentsInfo () {
	return new Promise(function (resolve, reject) {
		connection.query('SELECT * FROM departments',  (err, data) => {
			if (err) throw err;
			resolve(data);
		});
	});
}

function addRole () {
	departmentsInfo()
    .then(function (data) {
	
		let deptListNames = data.map(function (dept) {
			return `${dept.departmentID} : ${dept.departmentName}`;
		});
		
            inquirer
			.prompt([
				{
					message: 'What is the new role title to be added?',
					type: 'input',
					name: 'title'
				},
				{
					message: 'What is the employee salary?',
					type: 'number',
					name: 'salary'
				},
				{
					message: 'Which department do you want to add?',
					type: 'list',
					name: 'deptName',
					choices: deptListNames
				}
			])
			.then(function (res) {
				connection.query(
					`INSERT INTO roles (roleTitle, roleSalary, departmentID) VALUES ('${res.title}', ${res.salary}, ${res.deptName.substr( 0, res.deptName.indexOf(' '))})`,
					function (err) {
						if (err) throw err;
						viewRoles();
					}
				);
			});
	});
}

function rolesInfo () {
	return new Promise(function (resolve, reject) {
		connection.query(
			'SELECT roleID, roleTitle, roleSalary, departments.departmentName FROM employee_trackerDB.roles LEFT JOIN employee_trackerDB.departments ON roles.departmentID = departments.departmentID ORDER BY roles.roleSalary',
			function (err, data) {
				if (err) throw err;
				resolve(data);
			}
		);
	});
}

function addEmployee () {
	rolesInfo().then(function (datas) {
		console.log(datas);
		let deptListRoles = datas.map(function (data) {
			return `${data.roleID} : ${data.roleTitle} in ${data.departmentName}`;
		});

		inquirer
			.prompt([
				{
					message: 'What is the employee first name?',
					type: 'input',
					name: 'first'
				},
				{
					message: 'What is the employee last name?',
					type: 'input',
					name: 'last'
				},
				{
					message: 'Which job title do you want to add?',
					type: 'list',
					name: 'deptRole',
					choices: deptListRoles
				}
				
			])
			.then(function (res) {
				connection.query(
					`INSERT INTO employee_trackerDB.employees (employeeFirstName, employeeLastName, roleID) VALUES ('${res.first}', '${res.last}', '${res.deptRole.substr(
						0,
						res.deptRole.indexOf(' ')
					)}')`,
					function (err) {
						if (err) throw err;
						viewEmployees();
					}
				);
			});
	});
}

function employeesInfo () {
	return new Promise(function (resolve, reject) {
		connection.query(
			'SELECT employeeID, employeeFirstName, employeeLastName, roleTitle, roleSalary, departments.departmentName FROM employee_trackerDB.employees LEFT JOIN employee_trackerDB.roles ON employees.roleID = roles.roleID LEFT JOIN employee_trackerDB.departments ON roles.departmentID = departments.departmentID ORDER BY roles.roleTitle',
			function (err, data) {
				if (err) throw err;
				resolve(data);
			}
		);
	});
}

function updateEmployeeRole () {
	employeesInfo().then(function (datas) {
		let employeeInfo = datas.map(function (data) {
			return `${data.employeeID} : ${data.employeeFirstName} ${data.employeeLastName}`;
		});

		rolesInfo().then(function (dats) {
			let roleInfo = dats.map(function (data) {
				return `${data.roleID} : ${data.roleTitle} in ${data.departmentName}`;
			});

			inquirer
				.prompt([
					{
						message: "Which employee's role do you want to change?",
						type: 'list',
						choices: employeeInfo,
						name: 'employee'
					},
					{
						messsage: 'Which role do you want to change?',
						type: 'list',
						choices: roleInfo,
						name: 'role'
					}
				])
				.then(function (res) {
					connection.query(
						`UPDATE employees SET roleID = ${res.role.substr(
							0,
							res.role.indexOf(' ')
						)} WHERE employeeID = ${res.employee.substr(0, res.employee.indexOf(' '))}`,
						function (err) {
							if (err) throw err;
							viewEmployees();
						}
					);
				});
		});
	});
}

connection.connect((err) => {
    if ( err ) throw err; 
    console.log('You are connected to SkyNet.');
    startPrompt();
});



























