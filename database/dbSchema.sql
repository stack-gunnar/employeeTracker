DROP DATABASE IF EXISTS employee_tracker;

CREATE DATABASE employee_tracker;

USE employee_tracker;



CREATE TABLE departments(
    departmentID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    departmentName VARCHAR(30) NOT NULL
);


CREATE TABLE roles(
    roleID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    roleTitle VARCHAR(30) NOT NULL,
    roleSalary DECIMAL (10,2) NOT NULL,
    departmentID INT,
    FOREIGN KEY (departmentID) REFRENCES departments(departmentID)
);

CREATE TABLE employees(
    employeeID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    employeeFirstName VARCHAR(30) NOT NULL,
    employeeLastName VARCHAR(30) NOT NULL,
    roleID INT,
    FOREIGN KEY (roleID) REFRENCES roles(roleID)
);