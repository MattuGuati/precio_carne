const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json()); 

// Conexión a PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'carniceria',
    password: 'Dogchog123',
    port: 5432
});

// Ruta para obtener productos y precios
app.get('/productos', async (req, res) => {
    try {
        const result = await pool.query('SELECT producto, precio FROM productos');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener productos');
    }
});

// Ruta para agregar o cambiar la imagen (ejemplo)
app.post('/imagen', (req, res) => {
    const { producto, imagen_url } = req.body;
    console.log(`Imagen para ${producto} actualizada a: ${imagen_url}`);
    res.json({ message: 'Imagen actualizada' });
});

app.listen(3001, () => {
    console.log('Servidor corriendo en puerto 3001');
});

app.get('/productos', async (req, res) => {
    try {
        const result = await pool.query('SELECT producto, precio FROM productos');
        res.json(result.rows);
    } catch (err) {
        console.error('Error al obtener productos:', err); // Esto mostrará el error en la consola
        res.status(500).send('Error al obtener productos');
    }
});
