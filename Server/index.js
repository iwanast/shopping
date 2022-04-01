import express from "express";
import mongodb from "mongodb";
import cors from "cors";

// mongoDB set-up
const mongoClient = new mongodb.MongoClient("mongodb://localhost:27017");
mongoClient.connect();
const db = mongoClient.db("Project-data-interaction");
const collectionProducts = db.collection("products");
const collectionCart = db.collection("shopping-cart");
const collectionOrders = db.collection("orders");
const collectionUsers = db.collection("users");


//API set-up
const app = express(); 
const PORT = 7904; 
app.use(express.json());
app.use(
  cors({origin: "http://localhost:3000"})
  );
app.use(express.static("public"));

////////////////////////////////////FUNCTIONS/////////////////////////////////////////
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

async function tokenValidating(token){
  try{
    const userInfo = await collectionUsers.find({token: token}).toArray(); 
    if(userInfo.length === 1){
      return userInfo[0]._id;
    }
  } catch (error){
      console.log(error);
    res.sendStatus(500);
  }
}

async function createNewOrderNumber(customersId){
  try{
    const existingOrderWithHighestNumber = await collectionOrders.find({customersId: customersId}).sort({"orderNumber" : -1}).limit(1).toArray();

    if(existingOrderWithHighestNumber.length === 0 || !existingOrderWithHighestNumber){
      return 110;
    } else {
      return existingOrderWithHighestNumber[0].orderNumber + 1;
    }
  }catch{
    res.sendStatus(500)
  }
}

/////////////////////////////////////////////METHODS/////////////////////////////////////////////////////
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
    return res.json(products).end(); 
  }catch (error){
    console.log("Something went wrong when loading the products, bear with us")
    res.sendStatus(500) 
  }
});

app.get("/shopping-cart/:token", async (req, res) =>{
  const tokenUser = req.params.token;
  const userId =  await tokenValidating(tokenUser);
  if (userId === 0){
    return res.sendStatus(401)
  }
  try{
    const cartItems = await collectionCart.find({customersId: userId}).toArray();
    res.json(cartItems);
  }catch {
    res.sendStatus(500)
  }
});

app.get("/orders/order/:orderId", async (req, res) =>{
  const orderId = req.params.orderId;
  console.log(orderId)
  try{
    const order = await collectionOrders.findOne({_id : new mongodb.ObjectId(orderId)});
    res.json(order);
    console.log(order)
  }catch {
    res.sendStatus(500)
  }
});


app.get("/orders/admin/:token", async (req,res) => {
  const tokenUser = req.params.token;
  const userId =  await tokenValidating(tokenUser);
  if (userId === 0){
    return res.sendStatus(401)
  }
  try{
    const userInfo = await collectionUsers.find({token: tokenUser}).toArray();
    console.log("USERINFO: ", userInfo)
    if (userInfo[0].role != "admin"){
      return res.sendStatus(401)
    }
    const allOrders = await collectionOrders.find({status: "ordered"}).sort({customersId: 1}).toArray();
    res.json(allOrders)
  }catch(error){
    res.sendStatus(500)
  }
});

app.get("/orders/:token", async (req, res) =>{
  const tokenUser = req.params.token;
  const userId =  await tokenValidating(tokenUser);
  if (userId === 0){
    return res.sendStatus(401)
  }

  try{
    const orders = await collectionOrders.find({customersId: userId}).toArray();
    res.json(orders);
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
});

app.post("/shopping-cart/article", async (req, res) => {
  const {productId, token} = req.body
  const userId =  await tokenValidating(token);
  if (userId === 0){
    return res.sendStatus(401)
  }

  try{
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
});



app.post("/order/article", async (req, res) => {
  const {productId, token} = req.body
  const userId =  await tokenValidating(token);
  if (userId === 0){
    return res.sendStatus(401)
  }

  try{
    const userInfo = await collectionUsers.find({token: token}).toArray();
    const customerAdress = userInfo[0].shippingAdress;
    const articleInfo = await collectionProducts.findOne({_id : new mongodb.ObjectId(productId)})
    if(!articleInfo || articleInfo === null){
      res.sendStatus(404)
    }
    
    const {_id, title, price, currency, datestamp} = articleInfo;
    const orderNumber = await createNewOrderNumber(userId)
    const articleToOrder = {
      orderNumber: orderNumber,
      customersId: userId,
      status: "ordered",
      customerAdress: customerAdress,
      datestamp: new Date(),
      articles: [{
        title: title,
        articleId: _id,
        price: price,
        currency: currency,
        quantity: 1,
        datestamp: datestamp
      }]        
    }
    await collectionOrders.insertOne(articleToOrder)
    res.status(200).end();
    
  }catch (error){
    console.log(error);
    res.sendStatus(500);
  }
});

app.post("/orders/post", async (req, res) => {
  const tokenUser = req.body.token;
  let customerAdress = {};
  let insertOrder = {};
  const userId =  await tokenValidating(tokenUser);
  if (userId === 0){
    return res.sendStatus(401)
  }
  try{
    const userInfo = await collectionUsers.find({token: tokenUser}).toArray(); 
    customerAdress= userInfo[0].shippingAdress;
    
    const allArticleInCart = await collectionCart.find({customersId: userId}).toArray();
    if (allArticleInCart.length === 0 || !allArticleInCart){
      return res.sendStatus(404);
    }

    allArticleInCart.forEach(item => {
      delete item.article["author"];
      delete item.article["picture"];
      delete item["_id"];
      delete item["customersId"];
      item.article.quantity = item.quantity;
      delete item["quantity"];
      item.article.datestamp = item.datestamp;
      delete item["datestamp"];
    });

    const newOrderNumber = await createNewOrderNumber(userId);
    
    insertOrder = {
      "orderNumber": newOrderNumber,
      "customersId": userId,
      "status": "ordered",
      "customerAdress": customerAdress,
      "datestamp": new Date(),
      "articles": allArticleInCart.map(item => {
        const newObject = item.article
        return newObject;
      })
    }

    await collectionOrders.insertOne(insertOrder);
    await collectionCart.deleteMany({customersId: userId});
    res.status(200).end();
  }catch {
    res.sendStatus(500)
  }
});

app.post("/users/login", async (req, res) => {
  const {username, password} = req.body;
  try{
    const user = await collectionUsers.findOne({ _id: username});
    if (!user || user.password != password){
      return res.status(401).send({message: "User not found or password wrong, try again!"})
    }
    
    user.token = await generateAuthToken();
    await collectionUsers.updateOne({_id: username}, {$set: {"token": user.token}})

    return res.status(200).send({
      message: "login successful",
      data: user
    });

  }catch (error) {
    console.log(error)
    res.sendStatus(500);
  }
});

app.post("/users", async (req, res) => {
  const insertUser = req.body;
  try{
    await collectionUsers.insertOne(insertUser);
    res.status(200).end();
  } catch{
    res.sendStatus(500)
  }
});

app.delete("/shopping-cart", async (req, res) => {

  const productId = req.body.productId
  try{
      await collectionCart.deleteOne({_id : new mongodb.ObjectId(productId)})
      res.status(200).end();
  }catch (error){
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete("/orders", async (req, res) => {

  const orderId = parseInt(req.body.orderId);
  try{
      await collectionOrders.deleteOne({_id : new mongodb.ObjectId(orderId)})
      res.status(200).end();
  }catch (error){
    console.log(error);
    res.sendStatus(500);
  }
});


app.patch("/shopping-cart/quantity", async (req, res) => {
  const {productId, quantity} = req.body

  try{
    const articleExistInCart = await collectionCart.findOne({_id : new mongodb.ObjectId(productId)})
    if(articleExistInCart.quantity === 1 && quantity === -1){
      await collectionCart.deleteOne({_id : new mongodb.ObjectId(productId)})
      res.status(200).end();
    }else {
      await collectionCart.updateOne({_id: new mongodb.ObjectId(productId)}, {$set: {"quantity": articleExistInCart.quantity + quantity, "datestamp": new Date()}})
      res.status(200).end();
    }
  }catch (error){
    console.log(error);
    res.sendStatus(500);
  }
});

app.patch("/orders/update", async (req, res) => {
  const orderId = req.body.orderId

  try{
    await collectionOrders.updateOne({_id: new mongodb.ObjectId(orderId)}, {$set: {"status": "shipped", "datestamp": new Date()}})
    res.status(200).end();
  }catch (error){
    console.log(error);
    res.sendStatus(500);
  }
});


app.listen(PORT, () => {
  console.log("Is listening on port ", PORT)
});