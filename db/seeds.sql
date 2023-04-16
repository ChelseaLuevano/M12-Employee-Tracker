INSERT INTO departments (department)
VALUES  ("Sales"),
        ("Finance"),
        ("Human Resources"),
        ("Actuarial");
    
INSERT INTO roles(id, title, salary, department_id)
VALUES  (1, "Sales Person", 50000.00, 1),
        (2, "Sales Lead", 70000.00, 1),
        (3, "Accountant", 65000.00, 2),
        (4, "Recruiter", 50000.00, 3),
        (5,"Payroll Admin", 55000.00, 3),
        (6, "Data Scientist", 100000.00, 4);



INSERT INTO employees(id, first_name, last_name, role_id, manager_id)
VALUES  (1, "SpongeBob", "Squarepants",1, 2),
        (2, "Eugene", "Krabs", 2),
        (3, "Patrick", "Star", 1, 2),
        (4, "Squidward", "Tentacles", 3, 8),
        (5, "Sandy", "Cheeks", 4, 6),
        (6, "Pearl", "Krabs", 4),
        (7, "Gerald Gary Snail Wilson Jr.", "Squarepants", 6),
        (8, "Sheldon", "Plankton", 3 );


    