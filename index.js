// backend/index.js
const express = require('express');
const conectarDB = require('./dbconfig'); // Importa la conexión a MySQL
const app = express();

// Middleware para manejar JSON
app.use(express.json());

// Conectar a la base de datos
conectarDB();

// Importar rutas
const zapatosRoutes = require('./routes/zapatosroutes');
app.use('/api/zapatos', zapatosRoutes);

const clientesRoutes = require('./routes/clientesroutes');
app.use('/api/clientes', clientesRoutes);

const comprasRoutes = require('./routes/comprasroutes');
app.use('/api/compras', comprasRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
