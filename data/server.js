const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const app = express();
const PORT = 8000;

// add dbConfig here
const dbConfig = {

};

// Middleware to handle JSON data
app.use(express.json());
// Enable CORS
app.use(cors());
// Route to get all items
app.get('/products', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.query('SELECT * FROM products');
    connection.end();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/products/:id', async (req, res) => {
  const productId = req.params.id;

  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.query('SELECT * FROM products WHERE id = ?', [productId]);
    connection.end();

    if (rows.length === 1) {
      res.json(rows[0]); // Return the first (and only) row
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to create a new product
app.post('/products', async (req, res) => {
  const title = req.body.title;
  const body = req.body.body;
  const price = req.body.price;

  try {
    const connection = await mysql.createConnection(dbConfig);
    await connection.query('INSERT INTO products (id, title, body, price) VALUES (?,?, ?, ?)', [title, body, price]);
    connection.end();
    res.status(201).json({ message: 'Product created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});




// Route to delete a product by ID
app.delete('/products/:id', async (req, res) => {
  const productId = req.params.id;

  try {
    const connection = await mysql.createConnection(dbConfig);
    await connection.query('DELETE FROM products WHERE id = ?', [productId]);
    connection.end();
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Add other routes as needed

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
