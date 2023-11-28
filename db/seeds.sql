INSERT INTO department (id, dept_name)
VALUES (001, 'Marketing'),
       (002, 'Engineering'),
       (003,'Finance'),
       (004, 'Legal'),
       (005, 'Sales');


INSERT INTO role (id, title, salary, department_id)
VALUES (001, 'Account Executive', 100000.00, 001),
       (002, 'Account Coordinator', 70000.00, 001),
       (003, 'Social Media Manager', 40000.00, 001),
       (004, 'Lead Engineer', 150000.00, 002),
       (005, 'Software Engineer', 110000.00, 002),
       (006, 'QA Tester', 60000.00, 002), 
       (007, 'Account Manager', 170000.00, 003), 
       (008, 'Accountant', 80000, 003),
       (009, 'Legal Team Lead', 200000.00, 004),
       (010, 'Lawyer', 180000.00, 004),
       (011, 'Sales Lead', 125000.00, 005), 
       (012, 'Salesperson', 750000.00, 005);



INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 001), 
       ('Erin', 'Schlatskey', 002, 1), 
       ('Herman', 'Hermit', 002, 1),
       ('Jolene', 'Parton', 003, 1),
       ('David', 'Long', 004), 
       ('Malcolm, Rodriguez', 005, 5), 
       ('Judy', 'Jacobs', 005, 5), 
       ('Kal', 'Penn', 006, 5), 
       ('John', 'Cho', 006, 5), 
       ('Suzanne', 'Murphy', 007), 
       ('Kelly', 'Beckwith', 008, 11), 
       ('Robert', 'Zombie', 008, 11), 
       ('Brian', 'Wilson', 008, 11),
       ('Cheryl', 'Holbrook', 009), 
       ('Shawn', 'Spencer', 010, 15),
       ('Paul', 'McNutty', 010, 15), 
       ('Ringo', 'Spar', 010, 15), 
       ('Joan', 'Lennon', 011), 
       ('Harry', 'Meachum', 012, 19), 
       ('Joseph', 'Robinson', 012, 19);
