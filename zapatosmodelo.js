const { sql } = require('../dbconfig');

class ZapatosModelo {
   async agregarZapato(req, res) {
      try {
         const { nombre, talla, precio, marca, cantidad } = req.body;
         const request = new sql.Request();
         await request.input('nombre', sql.VarChar, nombre)
                      .input('talla', sql.Int, talla)
                      .input('precio', sql.Decimal, precio)
                      .input('marca', sql.VarChar, marca)
                      .input('cantidad', sql.Int, cantidad)
                      .query(`
                        INSERT INTO Zapatos (nombre, talla, precio, marca, cantidad)
                        VALUES (@nombre, @talla, @precio, @marca, @cantidad)
                      `);
         res.status(201).json({ message: 'Zapato agregado con éxito' });
      } catch (err) {
         res.status(500).send(err.message);
      }
   }

   async eliminarZapato(req, res) {
      try {
         const { id } = req.params;
         const request = new sql.Request();
         await request.input('id', sql.Int, id).query(`
            DELETE FROM Zapatos WHERE id = @id
         `);
         res.status(200).json({ message: 'Zapato eliminado con éxito' });
      } catch (err) {
         res.status(500).send(err.message);
      }
   }

   async obtenerZapatos(req, res) {
      try {
         const request = new sql.Request();
         const result = await request.query('SELECT * FROM Zapatos');
         res.status(200).json(result.recordset);
      } catch (err) {
         res.status(500).send(err.message);
      }
   }
}

module.exports = new ZapatosModelo();
