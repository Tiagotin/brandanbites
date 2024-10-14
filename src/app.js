const express = require('express');
const path = require('path');
const pool = require('../config/db');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Ruta para mostrar productos
app.get('/productos', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM productos');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error en el servidor');
    }
});

// Servir página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


/*-------------------
MERCADO PAGO
--------------------*/

const mercadopago = require('mercadopago');
mercadopago.configurations.setAccessToken(process.env.MP_ACCESS_TOKEN);

// Ruta para iniciar el pago
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
        res.status(500).send('Error procesando el pago');
    }
});
