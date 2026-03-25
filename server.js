const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');
const app = express();

// Use the Render environment variable or your local link as a backup
const uri = process.env.MONGODB_URI || "mongodb+srv://lavanyaphilos_db_user:323GERsrz06VasU6@cluster0.w4cgenk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri);

// Serve your HTML/CSS/JS files from the current folder
app.use(express.static('./'));

async function startServer() {
  try {
    await client.connect();
    console.log("Success! Glow and Grace is connected to the cloud!");

    // Render automatically sets a PORT. We must use it.
    const port = process.env.PORT || 3000;
    
    // Binding to '0.0.0.0' is the key to fixing the Port timeout
    app.listen(port, '0.0.0.0', () => {
      console.log(`Server is running and listening on port ${port}`);
    });
  } catch (err) {
    console.error("Connection failed:", err);
    process.exit(1);
  }
}

startServer();