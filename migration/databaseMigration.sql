-- 1. Create the database
CREATE DATABASE school_db;

CREATE TABLE students (
    id  SERIAL PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    date_of_birth TIMESTAMP,
    address TEXT
);
