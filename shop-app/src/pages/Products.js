import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import { useContext } from "react";
import {CounterNumberOfArticles} from "../App"
import { addToCart, addToOrderOneClick } from "../components";

import {Search} from "../components";

export const Products = ({allProduct}) => {
  const [products, setProducts] = useState([]);
  const {dispatchNumberOfArticles} = useContext(CounterNumberOfArticles)
   
    useEffect(() => {
      fetch("http://localhost:7904/products")
        .then((data) => data.json())
        .then((result) => {
          !result[0] ? alert("Det finns inga produkter att visas för tillfället")
          : setProducts(result);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }, [allProduct]);

  function numberOfArticles(){
    dispatchNumberOfArticles({type: "increment"});
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
            <Link to={"/item"} state={{product}}>
              <img src={product.picture[0]} alt="Book-cover" />
              <div className="wrapper-product-text">
                <span>{product.author}</span>
                <p>{product.title}</p>
                <p>{product.price} {product.currency}</p>
                <div className="button-buy-wrapper">
                  <button onClick={(event) => {addToCart(event); numberOfArticles()}}   productid={product._id} className="button-buy">Add to Cart</button>
                  <button onClick={addToOrderOneClick} className="button-buy" productid={product._id}>Buy with Oneclick</button>
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