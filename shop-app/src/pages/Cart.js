import React, {useEffect, useState, useContext} from  "react";
import {IoTrash} from "react-icons/io5"
import { CounterNumberOfArticles } from "../App";
import { API_BASE_URL } from "../config"
import "./Cart.css";

function endSum (articles){
  let sum = 0;
  articles.forEach(article => {
    sum = sum + article.article.price*article.quantity;
  });
  return sum;
}

export const Cart = () => {
  const [articlesInCart, setArticlesInCart] = useState([])
  const [changingCart, setChangingCart] = useState(false);
  const {dispatchNumberOfArticles} = useContext(CounterNumberOfArticles);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"))
    fetch(`${API_BASE_URL}/shopping-cart/${token}`)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((response) => {
        setArticlesInCart(response);
      })
      .catch((error) => console.log("Something went wrong with fetching the data: ", error))
  }, [changingCart]);

  function changeQuantity (event) {
    event.preventDefault();
    const productInCartId = event.target.getAttribute("productid");
    const quantity = event.target.getAttribute("quantity");
    let number = 0;
    if(quantity === "minus"){
      number = -1;
      dispatchNumberOfArticles({type: "decrement"});
    }
    if(quantity === "plus") {
      number = 1;
      dispatchNumberOfArticles({type: "increment"});
    }

    fetch(`${API_BASE_URL}/shopping-cart/quantity`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        productId: productInCartId,
        quantity: number
      })
    })
    .then(res => {
      if (res.ok){
      setChangingCart(!changingCart)
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
}

function deleteProduct (event) {
  event.preventDefault();
  const productid = event.currentTarget.getAttribute("productid");

  fetch(`${API_BASE_URL}/shopping-cart`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      productId: productid
    })
  })
  .then(res => {
    if (res.ok){
    setChangingCart(!changingCart)
    dispatchNumberOfArticles({type: "decrement"});
    }
  throw res;
  })
  .catch((err) => {
    console.log(err.message);
  });
}
  
function orderAllInCart(event){
  event.preventDefault();

  const token = JSON.parse(localStorage.getItem("token"))
  if(!token || token === undefined){
    alert("Something is wrong with your login. Please login before adding/buying items.")
  }

  fetch(`${API_BASE_URL}/orders/post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({token: token}) 

  })
  .then(res => {
    if (res.ok){
    setChangingCart(!changingCart)
    } else if(res.status === 404){
      alert("Feel free to selecte products first.")
    }
  throw res;
  })
  .catch((err) => {
    console.log(err.message);
  });
}

  return(
    <div>
    <h1 className="title-cart">My Cart</h1>
      <div className="table-responsive">
        <table className="table-bordered">
          <thead className="table-fix">
            <tr className="tr-head">
              <th>Image</th>
              <th>Product</th>
              <th className="text-center">Price</th>
              <th className="text-center">Quantity</th>
              <th className="text-center">Total Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {articlesInCart && (
              articlesInCart.map((article) => (
                <tr key={article._id} className="tr-article">
                  <td width="10%">
                    <img src={article.article.picture} alt="Book cover" width="50px" height="50px"/>
                  </td>
                  <td>{article.article.title}</td>
                  <td width="15%" className="text-center">{article.article.price}</td>
                  <td width="15%">
                    <div className="wrapper-button-quantity">
                      <button type="button" onClick={changeQuantity} productid={article._id} quantity="minus" className="button-quantity">-</button>
                      <div>{article.quantity}</div>
                      <button type="button" onClick={changeQuantity} productid={article._id} quantity="plus" className="button-quantity">+</button>
                    </div>
                  </td>
                  <td width="15%" className="text-center">{article.article.price*article.quantity}</td>
                  <td width="10%">
                    <button type="button" onClick={deleteProduct} productid={article._id} className="btn btn-danger btn-sm"> <IoTrash /> </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
          <tfoot className="table-fix">
            <tr className="tr-head">
              <th></th>
              <th></th>
              <th></th>
              <th className="text-center">Total:</th>
              <th className="text-center">{endSum(articlesInCart)}</th>
              <th><button onClick={orderAllInCart} className="button-order">Order</button></th>
            </tr>
          </tfoot>
        </table>
      </div>

    </div>
  )
};