const express = require('express');
const app = express();
const PORT = 3000;
const db = require('./models');

app.use(express.json());
app.use(express.urlencoded({ 
    extended: false 
}));

db.sequelize.sync()
    .then((result) => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        })
    })
    .catch((err) => {
        console.log(err);
    })

    app.post('/buku', async (req, res) => {
        const data = req.body;
        try {
            const buku = await db.Buku.create(data);
            res.send(buku);
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
        }
    });

    app.get('/buku', async (req, res) => {
        try {
            const buku = await db.Buku.findAll();
            res.send(buku);
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
        }
    });

    app.put('/buku/:id', async (req, res) => {
        const id = req.params.id;
        const data = req.body;

        try {
            const buku = await db.Buku.findByPk(id);
            if (!buku) {
                return res.status(404).send("Buku tidak ditemukan");
            }
            await buku.update(data);
            res.send({ message : "Buku berhasil di update!" }) 
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
        }
    });

    app.delete('/buku/:id', async (req, res) => {
        const id = req.params.id;

        try {
            const buku = await db.Buku.findByPk(id);
            if (!buku) {
                return res.status(404).send("Buku tidak ditemukan");
            }
            
            await buku.destroy();
            res.send({ message : "Buku berhasil di hapus!" });
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
        }
    });