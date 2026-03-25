const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();

// This line tells the code to use the "Secret" link on Render, or your link if at home
const uri = process.env.MONGODB_URI || "mongodb+srv://lavanyaphilos_db_user:323GERsrz06VasU6@cluster0.w4cgenk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri);

app.use(express.static('./')); 

async function startServer() {
  try {
    await client.connect();
    console.log("Success! Glow and Grace is connected to the cloud!");
    
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.error("Connection failed:", err);
    process.exit(1); // Tells Render something went wrong if it can't connect
  }
}

startServer();