const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'wtc023',
    database: 'Sales'
  });


db.connect(err => {
  if (err) throw err;
  console.log('Database connected!');
});

router.get('/total-sales/:productId', (req, res) => {
  const productId = req.params.productId;

  const query = `CALL GetTotalSalesByProduct(${productId})`;

  db.query(query, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to retrieve data' });
    }
    res.json(result[0]); 
  });
});

router.get('/products', (req, res) => {
  const query = 'SELECT * FROM Products';

  db.query(query, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to retrieve products' });
    }
    res.json(result);  
  });
});

router.get('/sales-by-date', (req, res) => {
  const { startDate, endDate } = req.query;

  const query = `
    SELECT * FROM Sales 
    WHERE SaleDate BETWEEN ? AND ?;
  `;
  
  db.query(query, [startDate, endDate], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to retrieve sales' });
    }
    res.json(result);  
  });
});

// Endpoint when u add a sale record
router.post('/add-sale', (req, res) => {
  const { productId, quantity, saleDate } = req.body;

  const query = `
    INSERT INTO Sales (ProductID, Quantity, SaleDate) 
    VALUES (?, ?, ?);
  `;

  db.query(query, [productId, quantity, saleDate], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to add sale' });
    }
    res.status(201).json({ message: 'Sale added successfully', saleId: result.insertId });
  });
});

// Endpoint when you add a new product
router.post('/add-product', (req, res) => {
  const { productName, price } = req.body;

  const query = `
    INSERT INTO Products (ProductName, Price) 
    VALUES (?, ?);
  `;

  db.query(query, [productName, price], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to add product' });
    }
    res.status(201).json({ message: 'Product added successfully', productId: result.insertId });
  });
});

module.exports = router;
