const conectarDB = require('../dbconfig');

class ComprasModelo {
   async registrarCompra(req, res) {
      try {
         const { clienteId, productos, total, metodoPago } = req.body;
         const connection = await conectarDB();
         await connection.execute(`
            INSERT INTO Compras (clienteId, productos, total, metodoPago)
            VALUES (?, ?, ?, ?)
         `, [clienteId, JSON.stringify(productos), total, metodoPago]);

         res.status(201).json({ message: 'Compra registrada con éxito' });
      } catch (err) {
         res.status(500).send(err.message);
      }
   }

   async generarRecibo(req, res) {
      try {
         const { idCompra } = req.params;
         const connection = await conectarDB();
         const [rows] = await connection.execute(`SELECT * FROM Compras WHERE id = ?`, [idCompra]);

         const compra = rows[0];
         if (!compra) {
            return res.status(404).json({ error: 'Compra no encontrada' });
         }

         res.status(200).json({
            recibo: {
               idCompra: compra.id,
               productos: JSON.parse(compra.productos),
               total: compra.total,
               metodoPago: compra.metodoPago,
               fechaCompra: compra.fechaCompra
            }
         });
      } catch (err) {
         res.status(500).send(err.message);
      }
   }
}

module.exports = new ComprasModelo();
