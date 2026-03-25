const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, './')));

const uri = process.env.MONGODB_URI || "mongodb+srv://lavanyaphilos_db_user:323GERsrz06VasU6@cluster0.w4cgenk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

app.post('/add-to-cart', async (req, res) => {
    try {
        await client.connect();
        const db = client.db("makeup_store");
        await db.collection("cart").insertOne(req.body);
        res.status(200).send({ message: "Success" });
    } catch (err) {
        res.status(500).send(err);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));