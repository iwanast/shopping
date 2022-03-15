import express from "express";
import mongodb from "mongodb";
import cors from "cors";

// mongoDB set-up
const mongoClient = new mongodb.MongoClient("mongodb://localhost:27017");
mongoClient.connect();
const db = mongoClient.db("Project-data-interaction");
const collectionProducts = db.collection("products");
const collectionCard = db.collection("card");
const collectionOrder = db.collection("order");

//API set-up
const app = express(); 
const PORT = 7904; 
app.use(express.json());

app.use(
  cors({origin: "http://localhost:3000"})
  );

app.get("/products", async (req, res) => {
  const products = []
  try{
    products = await collectionProducts.find({}).toArray();
  }catch (error){
    console.log("Something went wrong when loading the products, bear with us")
  }
  return products; 
});


// Always at the bottom
app.listen(PORT, () => {
  console.log("Is listening on port 7904")
});