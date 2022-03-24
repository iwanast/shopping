import React, {useEffect, useState} from  "react";
import {IoTrash} from "react-icons/io5"
import "./Cart.css";

export const Cart = () => {
  const [articlesInCart, setArticlesInCart] = useState([])
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("http://localhost:7904/shopping-cart")
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((response) => setArticlesInCart(response))
      .catch((error) => console.log("Something went wrong with fetching the data: ", error))
  }, []);
  
  return(
    <div>
    <h1 className="title-cart">My Cart</h1>
      <div className="table-responsive">
        <table className="table-bordered">
          <thead>
            <tr className="tr-head">
              <th>Image</th>
              <th>Product</th>
              <th className="text-center">Price</th>
              <th className="text-center">Quantity</th>
              <th className="text-center">Total Price</th>
              <th>Remove</th>
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
        </table>
      </div>
    </div>
  )
};


/* <div>
<h1 className="title-cart">My Cart</h1>
<ul className="wrapper-cart">
{articlesInCart && (
  articlesInCart.map((product) => (
    <li key={product._id} className="wrapper-cart-article">
      <Link to={"/item"} state={{product}} >
        <img src={product.picture[0]} alt="Book-cover" />
          <p>{product.title} from {product.author}</p>
          <label for="quantity">Quantity:</label> <select name="quantity"><option value ></option></select>
          <p>Price: {product.price} {product.currency}</p>
          <button>Delete</button>
          
         </Link>

    </li>   
  ))
)}
</ul>
</div> 
  );*/