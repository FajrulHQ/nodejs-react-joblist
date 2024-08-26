CREATE DATABASE IF NOT EXISTS recruitment;

USE recruitment;

-- Create USER table
CREATE TABLE IF NOT EXISTS user (
    id                  INT AUTO_INCREMENT PRIMARY KEY,
    username            VARCHAR(255) NOT NULL UNIQUE,
    password            VARCHAR(255) NOT NULL,
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create customer table
CREATE TABLE IF NOT EXISTS customer (
    cust_id             INT AUTO_INCREMENT PRIMARY KEY,
    user_id             INT NOT NULL,
    cust_firstname      VARCHAR(30) NOT NULL,
    cust_lastname       VARCHAR(30) NOT NULL,
    cust_birthdate      DATE,
    cust_gender         CHAR(1) NOT NULL,
    cust_address        VARCHAR(50),
    cust_city           VARCHAR(20),
    cust_postcode       CHAR(5),
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id)
);

-- Create account table
CREATE TABLE IF NOT EXISTS account (
    acc_number          CHAR(13) PRIMARY KEY,
    acc_owner           INT NOT NULL,
    acc_date_created    DATE NOT NULL,
    acc_balance         DECIMAL(10,0) NOT NULL,
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (acc_owner) REFERENCES customer(cust_id)
);

-- Create transaction table
CREATE TABLE IF NOT EXISTS transaction (
    trs_id              INT AUTO_INCREMENT PRIMARY KEY,
    trs_from_account    CHAR(13) NOT NULL,
    trs_date            DATE NOT NULL,
    trs_amount          DECIMAL(10,0) NOT NULL,
    trs_type            CHAR(2) NOT NULL,
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (trs_from_account) REFERENCES account(acc_number)
);

-- Create transaction_transfer table
CREATE TABLE IF NOT EXISTS transaction_transfer (
    trs_id              INT PRIMARY KEY,
    trs_to_account      CHAR(13) NOT NULL,
    trs_status          CHAR(1) NOT NULL,
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (trs_id) REFERENCES transaction(trs_id),
    FOREIGN KEY (trs_to_account) REFERENCES account(acc_number)
);