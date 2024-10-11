const conectarDB = require('../dbconfig');

class ZapatosModelo {
   async agregarZapato(req, res) {
      try {
         const { nombre, talla, precio, marca, cantidad } = req.body;
         const connection = await conectarDB();
         await connection.execute(`
            INSERT INTO Zapatos (nombre, talla, precio, marca, cantidad)
            VALUES (?, ?, ?, ?, ?)
         `, [nombre, talla, precio, marca, cantidad]);

         res.status(201).json({ message: 'Zapato agregado con éxito' });
      } catch (err) {
         res.status(500).send(err.message);
      }
   }

   async eliminarZapato(req, res) {
      try {
         const { id } = req.params;
         const connection = await conectarDB();
         await connection.execute(`DELETE FROM Zapatos WHERE id = ?`, [id]);
         res.status(200).json({ message: 'Zapato eliminado con éxito' });
      } catch (err) {
         res.status(500).send(err.message);
      }
   }

   async obtenerZapatos(req, res) {
      try {
         const connection = await conectarDB();
         const [rows] = await connection.execute(`SELECT * FROM Zapatos`);
         res.status(200).json(rows);
      } catch (err) {
         res.status(500).send(err.message);
      }
   }
}

module.exports = new ZapatosModelo();
