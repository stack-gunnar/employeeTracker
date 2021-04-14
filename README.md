# employeeTracker

## *MySQL command line application by Bill Judd*

## Links
* GitHub:  https://github.com/stack-gunnar/employeeTracker
* :movie_camera:  **Video:  https://drive.google.com/file/d/1bOmIe7-tiT68_8BJPhuTMVaksNPgpo-4/view**

# About this Application
Developers are often tasked with creating interfaces that make it easy for non-developers to view and interact with information stored in databases. Often these interfaces are known as **C**ontent **M**anagement **S**ystems. I was challenged to architect and build a solution for managing a company's employees using node, inquirer, and MySQL.
  * Built a command line application
     * Add departments, roles, employees
     * View departments, roles, employees
     * Update employee roles
  * Designed database schema using 3 tables

![Database Schema](Assets/schema.png)

* **department**:

  * **id** - INT PRIMARY KEY
  * **name** - VARCHAR(30) to hold department name

* **role**:

  * **id** - INT PRIMARY KEY
  * **title** -  VARCHAR(30) to hold role title
  * **salary** -  DECIMAL to hold role salary
  * **department_id** -  INT to hold reference to department role belongs to

* **employee**:

  * **id** - INT PRIMARY KEY
  * **first_name** - VARCHAR(30) to hold employee first name
  * **last_name** - VARCHAR(30) to hold employee last name
  * **role_id** - INT to hold reference to role employee has
  * **manager_id** - INT to hold reference to another employee that manager of the current employee. This field may be null if the employee has no manager
  
  ```
As a business owner
I want to be able to view and manage the departments, roles, and employees in my company
So that I can organize and plan my business


