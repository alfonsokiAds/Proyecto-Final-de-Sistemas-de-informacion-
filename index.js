const express = require('express');
const conectarDB = require('./dbconfig'); // Conexión a la base de datos
const app = express();

// Middleware para interpretar JSON
app.use(express.json());

// Conectar a la base de datos
conectarDB();

// Importar y usar rutas
const zapatosRoutes = require('./routes/zapatosroutes');
app.use('/api/zapatos', zapatosRoutes);

const clientesRoutes = require('./routes/clientesroutes');
app.use('/api/clientes', clientesRoutes);

const comprasRoutes = require('./routes/comprasroutes');
app.use('/api/compras', comprasRoutes);

// Servidor corriendo
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
   console.log(`Servidor corriendo en el puerto ${PORT}`);
});
