-- 1. Create the database
CREATE DATABASE school_db;

-- Connect to 'school_db' before running the statements below

-- 2. Create the students table with TIMESTAMP for date_of_birth
CREATE TABLE students (
    id  SERIAL PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    date_of_birth TIMESTAMP,
    address TEXT
);

-- 3. Insert 5 students with TIMESTAMP values (YYYY-MM-DD HH:MI:SS)
INSERT INTO students (first_name, last_name, date_of_birth, address, email) 
VALUES
    ('John', 'Doe', '2008-05-14 00:00:00', '123 Main St, Springfield, IL', 'john.doe@example.com'),
    ('Jane', 'Smith', '2008-08-22 00:00:00', '456 Elm St, Riverdale, NY', 'jane.smith@example.com'),
    ('Alex', 'Johnson', '2007-11-03 00:00:00', '789 Oak Ave, Oakville, CA', 'alex.johnson@example.com'),
    ('Maria', 'Garcia', '2008-01-19 00:00:00', '321 Pine Rd, Maplewood, NJ', 'maria.garcia@example.com'),
    ('Liam', 'Brown', '2007-04-30 00:00:00', '654 Cedar Ln, Pineville, TX', 'liam.brown@example.com');