import express from "express";
import mongodb from "mongodb";
import cors from "cors";

// mongoDB set-up
const mongoClient = new mongodb.MongoClient("mongodb://localhost:27017");
mongoClient.connect();
const db = mongoClient.db("Project-data-interaction");
const collectionProducts = db.collection("products");
const collectionCart = db.collection("shopping-cart");
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
    const products = await collectionProducts.find(terms).sort({author: 1}).toArray();
    res.json(products); 
  }catch (error){
    console.log("Something went wrong when loading the products, bear with us")
    res.sendStatus(error);
  }
});

app.get("/shopping-cart", async (req, res) =>{
  try{
    const cartItems = await collectionCart.find({}).toArray();
    res.json(cartItems);
  }catch (error){
    console.log("Something went wrong when loading the products, bear with us")
    res.sendStatus(error);
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



app.post("/users/login", async (req, res) => {
  function generateAuthToken(){
    console.log("ITs coming in the authTOken")
    // not implemented. only for testing:
    return "12x7fgh44";
  }
  const {username, password} = req.body;
  console.log(`Username: ${username} und Password: ${password}`)
  try{
    const user = await collectionUsers.findOne({ _id: username});
    if (!user){
      return res.status(401).send({message: "User not found"})
    } 
    if (user.password != password){
      return res.status(401).send({message: "Incorrect Password, try again!"});
    }
    
    user.token = generateAuthToken();
      
    await collectionUsers.updateOne({_id: username}, {$set: {"token": user.token}})

    return res.status(200).send({
      message: "login successful",
      data: user
    }).end();

  } catch (error) {
      res.status(500).send({error});
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

app.post("/shopping-cart", async (req, res) => {
  const insertArticle = req.body;
  try{
    await collectionCart.insertOne(insertArticle);
    res.status(200).end();
  } catch{
    res.sendStatus(500)
  }
})




// Always at the bottom
app.listen(PORT, () => {
  console.log("Is listening on port ", PORT)
});