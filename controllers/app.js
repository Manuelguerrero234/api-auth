const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Cargar variables de entorno
dotenv.config();

// Conectar a la base de datos
const connectDB = require('./config/db');
connectDB();

const authRoutes = require('./routes/auth');

// Inicializar Express
const app = express();

// Middleware
app.use(bodyParser.json());

// Rutas
app.use('/api', authRoutes);

// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
