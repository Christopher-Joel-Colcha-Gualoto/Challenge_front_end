const express = require('express');
const app = express();
const fs = require('fs').promises;

app.use(express.json());

app.delete('/productos/:id', async (req, res) => {
    const id = req.params.id;

    try {
        let db = await fs.readFile('db.json', 'utf8');
        db = JSON.parse(db);

        const index = db.productos.findIndex(producto => producto.id === parseInt(id));
        if (index !== -1) {
            db.productos.splice(index, 1);

            await fs.writeFile('db.json', JSON.stringify(db, null, 2), 'utf8');

            res.json({ message: `Producto con id ${id} eliminado correctamente` });
        } else {
            res.status(404).json({ error: `No se encontró el producto con id ${id}` });
        }
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        res.status(500).json({ error: "Error interno al eliminar el producto" });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
