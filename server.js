const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');
const app = express();

// Middleware
app.use(express.json());
// Serve static files from the root directory
app.use(express.static(path.join(__dirname, './')));

// Database Connection
const uri = process.env.MONGODB_URI || "mongodb+srv://lavanyaphilos_db_user:323GERsrz06VasU6@cluster0.w4cgenk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

// Route to handle adding to cart
app.post('/add-to-cart', async (req, res) => {
    try {
        await client.connect();
        const db = client.db("makeup_store");
        const cartCollection = db.collection("cart");
        const result = await cartCollection.insertOne(req.body);
        res.status(200).json({ message: "Saved!", id: result.insertedId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to save" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});