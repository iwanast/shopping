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


// FOR PRODUCTS
app.get("/products", async (req, res) => {

  const {author, title} = req.query
  const filter = [];
  if(author){
    filter.push({ author: { $regex: new RegExp(author, "i")}});
  }
  if(title){
    filter.push({title: { $regex: new RegExp(title, "i")}});
  }
  const terms = (author === undefined && title === undefined ? filter[0] : {$and: [{quantity: {$gte: 1}}, {$or: filter  }]})

  try{
    const products = await collectionProducts.find(terms).sort({author: 1}).toArray();
    res.json(products); 
  }catch (error){
    console.log("Something went wrong when loading the products, bear with us")
    res.sendStatus(500)
  }
});

app.get("/shopping-cart/:token", async (req, res) =>{
  const tokenUser = req.params.token;
  let userId = "";
  const cartItems = [];

  try{
    const userInfo = await collectionUsers.find({token: tokenUser}).toArray(); 
    if(!userInfo){
      res.sendStatus(401)
    }
    if(userInfo.length === 1){
      userId = userInfo[0]._id; 
    } 

    const cartItems = await collectionCart.find({customersId: userId}).toArray();
    res.json(cartItems);
  }catch {
    res.sendStatus(500)
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
 async function generateAuthToken(){
    // not implemented. only for testing:
    const alphabet = [..."abcdefghijklmnopqrstuvwxyz"];
    const numbers = [..."0123456789"];
    let tokenNew = "";
    for(let i = 0; i <= 5; i++) {
      tokenNew += alphabet[Math.floor(Math.random() * alphabet.length)]
      tokenNew = tokenNew + numbers[Math.floor(Math.random() * numbers.length)]
    }
    
    const searchingExistingTokens = await collectionUsers.find({token: tokenNew}).toArray();

    if (searchingExistingTokens.length == 0 || searchingExistingTokens === undefined){
      return tokenNew;
    } else {
      generateAuthToken();
    }
    return tokenNew;
  }

  const {username, password} = req.body;
  try{
    const user = await collectionUsers.findOne({ _id: username});
    if (!user || user.password != password){
      return res.status(401).send({message: "User not found or password wrong, try again!"})
    }
    
    user.token = await generateAuthToken();
    console.log(user.token)
    console.log({"token": JSON.stringify(user.token)})
    await collectionUsers.updateOne({_id: username}, {$set: {"token": user.token}})

    return res.status(200).send({
      message: "login successful",
      data: user
    });

  } catch (error) {
    console.log(error)
    res.sendStatus(500);
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

app.post("/shopping-cart/quantity", async (req, res) => {

  const {productId, quantity} = req.body

  try{
  
    const articleExistInCart = await collectionCart.findOne({_id : new mongodb.ObjectId(productId)})
    if(articleExistInCart.quantity === 1 && quantity === -1){
      await collectionCart.deleteOne({_id : new mongodb.ObjectId(productId)})
      res.status(200).end();
    }else{
      await collectionCart.updateOne({_id: new mongodb.ObjectId(productId)}, {$set: {"quantity": articleExistInCart.quantity + quantity, "datestamp": new Date()}})
      res.status(200).end();
    }
  }catch (error){
    console.log(error);
    res.sendStatus(500);
  }
})

app.post("/shopping-cart/article", async (req, res) => {

  const {productId, token} = req.body
  let userId = "";

  try{
    const userInfo = await collectionUsers.find({token: token}).toArray(); 
    if(!userInfo){
      res.sendStatus(401)
    }
    if(userInfo.length === 1){
      userId = userInfo[0]._id; 
    } 

    const articleInfo = await collectionProducts.findOne({_id : new mongodb.ObjectId(productId)})
    if(!articleInfo || articleInfo === null){
      res.sendStatus(404)
    }
    const articleExistInCart = await collectionCart.findOne({$and: [{customersId : userId}, { "article.articleId": new mongodb.ObjectId(productId)}]})
    if(articleExistInCart){
      await collectionCart.updateOne({_id: articleExistInCart._id}, {$set: {"quantity": articleExistInCart.quantity + 1, "datestamp": new Date()}})
      res.status(200).end();
    }else{
      const {_id, title, author, price, picture, currency} = articleInfo;
      const articleToCart = {
        customersId: userId,
        article: {
          title: title,
          articleId: _id,
          author: author,
          price: price,
          picture: picture[0],
          currency: currency
        },
        quantity: 1,
        datestamp: new Date()
      }
    await collectionCart.insertOne(articleToCart)
    res.status(200).end();
    }
  }catch (error){
    console.log(error);
    res.sendStatus(500);
  }
  }
)


// app.post("/shopping-cart:token", async (req, res) => {
//   const insertArticle = req.body;
//   try{
//     await collectionCart.insertOne(insertArticle);
//     res.status(200).end();
//   } catch{
//     res.sendStatus(500)
//   }
// })




// Always at the bottom
app.listen(PORT, () => {
  console.log("Is listening on port ", PORT)
});