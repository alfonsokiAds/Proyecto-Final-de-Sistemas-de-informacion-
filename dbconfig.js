// backend/dbconfig.js
const mysql = require('mysql2/promise');

const conectarDB = async () => {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',      // Cambia esto si tu host es diferente
            user: 'root',           // Tu usuario de MySQL
            password: 'tu_password', // La contraseña de tu usuario
            database: 'TiendaZapatos' // La base de datos que has creado
        });
        console.log('Conexión exitosa a MySQL');
        return connection;
    } catch (err) {
        console.error('Error al conectar a MySQL:', err);
    }
};

module.exports = conectarDB;

