const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('inventory.db');

// Inicializar base de datos
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            quantity INTEGER NOT NULL,
            price REAL NOT NULL,
            sector TEXT NOT NULL
        )
    `);
});

module.exports = {
    getAllProducts: () => {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM products', (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    },
    addProduct: (name, quantity, price, sector) => {
        return new Promise((resolve, reject) => {
            db.run('INSERT INTO products (name, quantity, price, sector) VALUES (?, ?, ?, ?)', [name, quantity, price, sector], (err) => {
                if (err) reject(err);
                resolve();
            });
        });
    },
    updateProduct: (id, name, quantity, price, sector) => {
        return new Promise((resolve, reject) => {
            db.run('UPDATE products SET name = ?, quantity = ?, price = ? WHERE id = ?, sector = ?', [name, quantity, price, id, sector], (err) => {
                if (err) reject(err);
                resolve();
            });
        });
    },
    deleteProduct: (id) => {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM products WHERE id = ?', [id], (err) => {
                if (err) reject(err);
                resolve();
            });
        });
    },
};
