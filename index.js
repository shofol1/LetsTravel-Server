const express = require("express");
const app = express();
var cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;

// middleWire
app.use(cors());
app.use(express.json());

const { MongoClient } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5va8k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = client.db("travelDb");
    const serviceCollection = database.collection("services");
    //load or get all data from database
    app.get("/services", async (req, res) => {
      const cursor = serviceCollection.find({});
      const result = await cursor.toArray();
      res.send(result);
    });
  } finally {
    //   await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
