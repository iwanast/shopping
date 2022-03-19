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
app.use("/pictures", express.static("pictures"));

app.get("/products", async (req, res) => {
  try{
    const products = await collectionProducts.find({}).toArray();
    console.log(products);
    res.json(products); 
  }catch (error){
    console.log("Something went wrong when loading the products, bear with us")
    res.sendStatus(500);
  }
  
});

app.post("/products", async (req, res) => {
  const insertItem = req.body;
  try{
    await collectionProducts.insertOne(insertItem);
    res.status(200).end();
  } catch{
    res.sendStatus(500)
  }
})


// Always at the bottom
app.listen(PORT, () => {
  console.log("Is listening on port 7904")
});