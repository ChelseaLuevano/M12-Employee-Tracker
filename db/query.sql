
-- View all departments
SELECT departments.id departments.department FROM departments;

-- View all roles
SELECT employees.title, employees.id, departments.department, employees.salary 
FROM employees
JOIN departments ON employees.id = departments.id;
