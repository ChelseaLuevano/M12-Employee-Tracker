INSERT INTO departments (department)
VALUES  ("Sales"),
        ("Finance"),
        ("Human Resources"),
        ("Actuarial");
    
INSERT INTO roles(id, title, salary, department_id)
VALUES  (1, "Sales Person", 50000, 1),
        (2, "Sales Lead", 70000, 1),
        (3, "Accountant", 65000, 2),
        (4, "Recruiter", 50000, 3),
        (5,"Payroll Admin", 55000, 3),
        (6, "Data Scientist", 100000, 4);



INSERT INTO employees(id, first_name, last_name, department_id, manager, role_id)
VALUES  (1, "SpongeBob", "Squarepants", 1, "Eugene Krabs", 1),
        (2, "Eugene", "Krabs", 1, NULL, 2),
        (3, "Patrick", "Star", 1, "Eugene Krabs", 1),
        (4, "Squidward", "Tentacles", 2, "Sheldon Plankton", 3),
        (5, "Sandy", "Cheeks", 3, "Pearl Krabs", 4),
        (6, "Pearl", "Krabs", 3, NULL, 4),
        (7, "Gerald Gary Snail Wilson Jr.", "Squarepants", 4, NULL, 6);


    