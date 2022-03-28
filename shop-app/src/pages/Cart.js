import React, {useEffect, useState} from  "react";
import {IoTrash} from "react-icons/io5"
import "./Cart.css";

export const Cart = () => {
  const [articlesInCart, setArticlesInCart] = useState([])
  const [count, setCount] = useState(0);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"))
    console.log("TOKEN FROM LOCALS:", token)
    fetch(`http://localhost:7904/shopping-cart/${token}`)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((response) => setArticlesInCart(response))
      .catch((error) => console.log("Something went wrong with fetching the data: ", error))
  }, []);

  function endSum (articles){
    let sum = 0;
    articles.map((article) => {
      sum = sum + article.article.price*article.quantity;
    })
    return sum;
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
                    <div className="input-group-cart">
                      <button type="button" className="input-group-cart-text">-</button>
                      <div>{article.quantity}</div>
                      <button type="button" className="input-group-cart-text">+</button>
                    </div>
                  </td>
                  <td width="15%" className="text-center">{article.article.price*article.quantity}</td>
                  <td width="10%">
                    <button type="button" className="btn btn-danger btn-sm"><IoTrash /></button>
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
              <th><button className="button-order">Order</button></th>
            </tr>
          </tfoot>
        </table>
      </div>

    </div>
  )
};