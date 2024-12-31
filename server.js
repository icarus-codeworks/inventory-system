const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Rutas de la API
app.get('/api/products', async (req, res) => {
    const products = await db.getAllProducts();
    res.json(products);
});

app.post('/api/products', async (req, res) => {
    const { name, quantity, price, sector } = req.body;
    await db.addProduct(name, quantity, price, sector);
    res.json({ message: 'Producto agregado' });
});

app.put('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    const { name, quantity, price, sector } = req.body;
    await db.updateProduct(id, name, quantity, price, sector);
    res.json({ message: 'Producto actualizado' });
});

app.delete('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    await db.deleteProduct(id);
    res.json({ message: 'Producto eliminado' });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
