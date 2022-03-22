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
const collectionUsers = db.collection("users");

//API set-up
const app = express(); 
const PORT = 7904; 
app.use(express.json());
app.use(
  cors({origin: "http://localhost:3000"})
  );
app.use(express.static("public"));


app.get("/products", async (req, res) => {

  const {author, title} = req.query
  const filter = [];
  if(author){
    filter.push({ author: { $regex: new RegExp(author, "i")}});
  }
  if(title){
    filter.push({title: { $regex: new RegExp(title, "i")}});
  }
  const terms = (author === undefined && title === undefined ? {} : {$or: filter })

  try{
    console.log("Terms after:", terms)
    const products = await collectionProducts.find(terms).toArray();
    console.log(filter);
    res.json(products); 
  }catch (error){
    console.log("Terms i catch:", terms)
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

app.post("/users", async (req, res) => {
  const insertUser = req.body;
  try{
    await collectionUsers.insertOne(insertUser);
    res.status(200).end();
  } catch{
    res.sendStatus(500)
  }
})


// Always at the bottom
app.listen(PORT, () => {
  console.log("Is listening on port 7904")
});