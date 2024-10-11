// dbconfig.js
const mysql = require('mysql2/promise');

const conectarDB = async () => {
   try {
      const connection = await mysql.createConnection({
         host: 'localhost',     // Cambia a tu host si es diferente
         user: 'tu_usuario',    // Reemplaza con tu usuario de MySQL
         password: 'tu_password', // Reemplaza con tu contraseña
         database: 'TiendaZapatos' // Base de datos creada
      });
      console.log('Conexión exitosa a MySQL');
      return connection;
   } catch (err) {
      console.error('Error al conectar a MySQL:', err);
   }
};

module.exports = conectarDB;
