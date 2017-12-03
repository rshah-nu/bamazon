USE bamazon;
CREATE TABLE products (
	item_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(250) NOT NULL,
    department_name VARCHAR(250) NOT NULL,
    price DECIMAL(6,2) NOT NULL,
    stock_quantity INT NOT NULL
);
    
INSERT INTO products(product_name, department_name, price, stock_quantity)
	VALUES 
		("4 pack mechanical pencil", "Stationary", 19.99, 50),
        ("5 pack eraser", "Stationary", 5.99, 50),
        ("1 pair gym shoe", "Clothing", 49.99, 20),
        ("1 coat", "Clothing", 59.99, 15),
        ("20 sq.ft tile", "Flooring", 1.99, 400),
        ("1 box Chalk", "Stationary", 2.99, 100),
        ("12 pack Water Bottles", "Food", 4.99, 100),
        ("1 lb Bag of Ice", "Food", 7.99, 100),
        ("1 lb plums", "Food", 4.99, 50),
        ("1 lb oranges", "Food", 5.99, 50);