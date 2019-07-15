DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(255),
department_name VARCHAR(255),
price DEC (10,2),
stock_quantity INT NOT NULL,
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES
("Banjo", "Music", 182.50, 13), ("Throwing Knifes", "Sporting Goods", 56.36, 21), ("Sandalwood Candle", "Home Goods", 40.27, 37);

SELECT * FROM products;