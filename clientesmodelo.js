const conectarDB = require('../dbconfig');

class ClientesModelo {
   async registrarCliente(req, res) {
      try {
         const { nombre, email, direccion, telefono } = req.body;
         const connection = await conectarDB();
         await connection.execute(`
            INSERT INTO Clientes (nombre, email, direccion, telefono)
            VALUES (?, ?, ?, ?)
         `, [nombre, email, direccion, telefono]);

         res.status(201).json({ message: 'Cliente registrado con éxito' });
      } catch (err) {
         res.status(500).send(err.message);
      }
   }

   async obtenerClientes(req, res) {
      try {
         const connection = await conectarDB();
         const [rows] = await connection.execute(`SELECT * FROM Clientes`);
         res.status(200).json(rows);
      } catch (err) {
         res.status(500).send(err.message);
      }
   }
}

module.exports = new ClientesModelo();
