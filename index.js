const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const port = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());

// connect to database

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_KEY}@cluster0.g9drewa.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

client.connect((err) => {
  if (err) {
    return res.send({
      status: false,
      message: "Databse could not connected",
    });
  } else {
    const productCollection = client.db("sohozBazar").collection("allProducts");

    app.get("/products", async (req, res) => {
      const products = await productCollection.find({}).toArray();

      if (products) {
        res.json({
          status: true,
          message: "get data successfully",
          data: products,
        });
      } else {
        res.json({
          status: false,
          message: "get data failed",
          data: null,
        });
      }
    });
  }
});

app.get("/", (req, res) => {
  res.json({
    status: true,
    message: "server is ready to use",
  });
});

app.listen(port, () => {
  console.log("sohoz bazar server is running on: ", port);
});
