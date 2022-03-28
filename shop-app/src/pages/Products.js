import React, {useState, useEffect, useContext} from "react";
import {Link} from "react-router-dom";
import { AuthContext } from "../App";

import {Search} from "../components";

export const Products = ({allProduct}) => {
  const [products, setProducts] = useState([]);
   
    useEffect(() => {
      fetch("http://localhost:7904/products")
        .then((data) => data.json())
        .then((result) => {
          !result[0] ? alert("Det finns inga produkter att visas för tillfället")
          : setProducts(result);
          })
    }, [allProduct]);

    function addToCart(event){
      event.preventDefault();
      const productId = event.target.getAttribute("productid");
      const token = JSON.parse(localStorage.getItem("token"))
      if(!token || token === undefined){
        alert("Something is wrong with your login. Please login before adding/buying items.")
      }
      fetch(`http://localhost:7904/shopping-cart/article`, {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          productId: productId,
          token: token
        })
      })
      .then(res => {
        if (res.ok){
        console.log(res.json)
        // return res.json()
        }
      throw res;
    })
    }

  return(
    <>
    <section>
      <Search onSelectedChange={setProducts} />
    </section>
    <main id="main">
      <ul className="outer-wrapper-products">
       {products.map((product) => (
          <li key={product._id} className="wrapper-product">
            <Link to={"/item"} state={{product}} addToCart={{addToCart}}>
              <img src={product.picture[0]} alt="Book-cover" />
              <div className="wrapper-product-text">
                <span>{product.author}</span>
                <p>{product.title}</p>
                <p>{product.price} {product.currency}</p>
                <div className="button-buy-wrapper">
                  <button onClick={addToCart} productid={product._id} className="button-buy">Add to Cart</button>
                  <button className="button-buy" productid={product._id}>Buy with Oneclick</button>
                </div>
              </div>
              </Link>
          </li>
       ))}
      </ul>
    </main>
    </>
  ) 
};