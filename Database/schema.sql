CREATE DATABASE SalesTracker;

USE SalesTracker;

CREATE TABLE Products (
    ProductsID INT AUTO_INCREMENT PRIMARY KEY,
    ProductName VARCHAR(100) NOT NULL,
    Price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE Sales (
    SalesID INT AUTO_INCREMENT PRIMARY KEY,
    ProductID INT,
    Quantity INT NOT NULL,
    SaleDate DATE NOT NULL,
    FOREIGN KEY (ProductID) REFERENCES Products(ProductsID)
);
