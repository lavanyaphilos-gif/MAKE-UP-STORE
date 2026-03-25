const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');
const app = express();

// Middleware to read JSON data sent from the browser
app.use(express.json());
// Serve all your files (HTML, CSS, JS, Images)
app.use(express.static(path.join(__dirname, './')));

const uri = process.env.MONGODB_URI || "mongodb+srv://lavanyaphilos_db_user:323GERsrz06VasU6@cluster0.w4cgenk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

// THE ROUTE: This "catches" the add-to-cart click
app.post('/add-to-cart', async (req, res) => {
    try {
        await client.connect();
        const db = client.db("makeup_store");
        const cartCollection = db.collection("cart");
        const product = req.body;

        const result = await cartCollection.insertOne(product);
        res.status(200).json({ message: "Saved to MongoDB!", id: result.insertedId });
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ error: "Failed to save to database" });
    }
});

async function startServer() {
    try {
        const port = process.env.PORT || 3000;
        app.listen(port, '0.0.0.0', () => {
            console.log(`Server is running on port ${port}`);
            console.log("Success! Glow and Grace is connected to the cloud!");
        });
    } catch (err) {
        console.error("Connection failed:", err);
        process.exit(1);
    }
}

startServer();