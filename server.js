const { MongoClient } = require('mongodb');

// Your full connection string goes here inside the quotes
const uri = "mongodb+srv://lavanyaphilos_db_user:323GERsrz06VasU6@cluster0.w4cgenk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("Success! Your makeup store is connected to the cloud!");
  } catch (err) {
    console.error("Connection failed:", err);
  } finally {
    await client.close();
  }
}
run();