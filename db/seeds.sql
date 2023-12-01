INSERT INTO department (dept_name)
VALUES ('Marketing'),
       ('Engineering'),
       ('Finance'),
       ('Legal'),
       ('Sales');


INSERT INTO role (title, salary, department_id)
VALUES ('Account Executive', 100000.00, 1),
       ('Account Coordinator', 70000.00, 1),
       ('Social Media Manager', 40000.00, 1),
       ('Lead Engineer', 150000.00, 2),
       ('Software Engineer', 110000.00, 2),
       ('QA Tester', 60000.00, 2), 
       ('Account Manager', 170000.00, 3), 
       ('Accountant', 80000, 3),
       ('Legal Team Lead', 200000.00, 4),
       ('Lawyer', 180000.00, 4),
       ('Sales Lead', 125000.00, 5), 
       ('Salesperson', 750000.00, 5);



INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, NULL), 
       ('Erin', 'Schlatskey', 2, 1), 
       ('Herman', 'Hermit', 2, 1),
       ('Jolene', 'Parton', 3, 1),
       ('David', 'Long', 4, NULL), 
       ('Malcolm', 'Rodriguez', 5, 5), 
       ('Judy', 'Jacobs', 5, 5), 
       ('Kal', 'Penn', 6, 5), 
       ('John', 'Cho', 6, 5), 
       ('Suzanne', 'Murphy', 7, NULL), 
       ('Kelly', 'Beckwith', 8, 10), 
       ('Robert', 'Zombie', 8, 10), 
       ('Brian', 'Wilson', 8, 10),
       ('Cheryl', 'Holbrook', 9, NULL), 
       ('Shawn', 'Spencer', 10, 14),
       ('Paul', 'McNutty', 10, 14), 
       ('Ringo', 'Spar', 10, 14), 
       ('Joan', 'Lennon', 11, NULL), 
       ('Harry', 'Meachum', 12, 18), 
       ('Joseph', 'Robinson', 12, 18);
