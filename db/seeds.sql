INSERT INTO employees(id, first_name, last_name, title, salary, manager)
VALUES  (1, "SpongeBob", "Squarepants", "Sales Person", 500000, "Eugene Krabs"),
        (2, "Eugene", "Krabs", "Sales Lead", 100000),
        (3, "Patrick", "Star", "Sales Person", 300000, "Eugene Krabs"),
        (4, "Squidward", "Tentacles", "Accountant", 450000, "Eugene Krabs");

INSERT INTO departments (id, department, employees_id)
VALUES  (1,"Sales", 1),
        (2, "Sales", 2),
        (3, "Sales", 3),
        (4, "Finance", 4);

    