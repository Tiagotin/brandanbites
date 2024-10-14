const express = require('express');
const path = require('path');
// En lugar de:
// const pool = require('../config/db');

// Usa:
const { getPool } = require('../config/db');
const pool = getPool();
const mercadopago = require('mercadopago');

const app = express();
const port = process.env.PORT || 3000;


//-------------------------------
// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));


//-----------------------------
// Configuración de MercadoPago
//------------------------------
mercadopago.configurations.setAccessToken(process.env.MP_ACCESS_TOKEN);



//------------
// Rutas
//------------
app.get('/api/products', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM productos');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

app.get('/api/products/:category', async (req, res) => {
    const { category } = req.params;
    try {
        const { rows } = await pool.query('SELECT * FROM productos WHERE categoria = $1', [category]);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});


//----------------------------
// Ruta para iniciar el pago
//-----------------------------
app.post('/pago', async (req, res) => {
    const { productos } = req.body;

    const items = productos.map(prod => ({
        title: prod.nombre,
        unit_price: prod.precio,
        quantity: prod.cantidad
    }));

    const preference = {
        items,
        back_urls: {
            success: 'http://localhost:3000/exito',
            failure: 'http://localhost:3000/fallo',
            pending: 'http://localhost:3000/pendiente'
        },
        auto_return: 'approved',
    };

    try {
        const response = await mercadopago.preferences.create(preference);
        res.json({ id: response.body.id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error procesando el pago' });
    }
});

// Catch-all route para servir el frontend en cualquier ruta no coincidente
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});