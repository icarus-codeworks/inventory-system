const productForm = document.getElementById('product-form');
const productsDiv = document.getElementById('products');

// Cargar productos al inicio
async function loadProducts() {
    const res = await fetch('/api/products');
    const products = await res.json();
    productsDiv.innerHTML = '';
    products.forEach(product => {
        const div = document.createElement('div');
        div.className = 'product-item';
        div.innerHTML = `
            <span>${product.name} - Cantidad: ${product.quantity} - Precio: $${product.price}</span>
            <button onclick="deleteProduct(${product.id})">Eliminar</button>
        `;
        productsDiv.appendChild(div);
    });
}

// Agregar producto
productForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const quantity = document.getElementById('quantity').value;
    const price = document.getElementById('price').value;
    await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, quantity, price }),
    });
    productForm.reset();
    loadProducts();
});

// Eliminar producto
async function deleteProduct(id) {
    await fetch(`/api/products/${id}`, { method: 'DELETE' });
    loadProducts();
}

// Cargar productos al inicio
loadProducts();
