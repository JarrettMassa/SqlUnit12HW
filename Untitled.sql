DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(65) NOT NULL,
  department_name VARCHAR(65) NOT NULL,
  price FLOAT(2) NOT NULL,
  stock_quantity INT,
  PRIMARY KEY (item_id)
);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Salad Shooter", "Useless Junk", "99.99","7");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Butt Paste", "Health", "9.99","99");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Super Happy Fun Ball", "Toys", "14.99","11");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("One Big Giant Bean", "Food", "49.99","1");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Gary Busey", "Actors?", "799.99","1");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Gwenyths Jade Kegel Eggs", "Ewwwww", "29.99","47");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Thomas The Tank Toy", "Toys", "9.99","3");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Time Mug - The Mug With A Clock On It For Some Reason", "Housewares", "13.99","9999");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("City Kitty", "Toilet Stuff", "59.99","72");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Database Simulator - The Video Game", "Video Games", "59.99","87");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Squatty Potty", "Toilet Stuff", "29.99","40");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Justin Timberlakes Left Thumb", "Where did you get this?", "999.99","1");

UPDATE products set stock_quantity=0 WHERE item_id=5;

select * from products;