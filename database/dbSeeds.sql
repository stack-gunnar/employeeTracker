USE employee_trackerDB

INSERT INTO departments(departmentName) VALUES ('Sales'), ('Engineering'), ('Human Resources'), ('IT');


INSERT INTO roles(roleTitle, roleSalary, departmentID) VALUES ('Salesperson', 80000, 1), ('Dir. of Sales', 150000,1), ('EO', 250000, 2), ('Lead Engineer', 100000, 2),
('Manager', 75000, 3), ('HR Rep', 60000, 3), ('ITO', 275000, 4), ('Software Engineer', 115000, 4);


INSERT INTO employees(employeeFirstName, employeeLastName, roleID) VALUES ('Chandler', 'Bing', 2), ('Monica', 'Gheller', 5), ('Joey', 'Tribiani', 1), ('Ross', 'Gheller', 4), 
('Rachel', 'Greene', 7), ('Phoebe', 'Bueffette', 3);