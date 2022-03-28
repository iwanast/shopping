import React, {useState, useEffect, useContext} from "react";
import {Link} from "react-router-dom";
import { AuthContext } from "../App";

import {Search} from "../components";

export const Products = ({allProduct}) => {
  const [products, setProducts] = useState([]);
  const {state} = useContext(AuthContext)
  console.log("STATE in PRODUCTS:JS: ", state)
   
    useEffect(() => {
      fetch("http://localhost:7904/products")
        .then((data) => data.json())
        .then((result) => {
          !result[0] ? alert("Det finns inga produkter att visas för tillfället")
          : setProducts(result);
          })
    }, [allProduct]);

  return(
    <>
    <section>
      <Search onSelectedChange={setProducts} />
    </section>
    <main id="main">
      <ul className="outer-wrapper-products">
       {products.map((product) => (
          <li key={product._id} className="wrapper-product">
            <Link to={"/item"} state={{product}} >
              <img src={product.picture[0]} alt="Book-cover" />
              <div className="wrapper-product-text">
                <span>{product.author}</span>
                <p>{product.title}</p>
                <p>{product.price} {product.currency}</p>
                <div className="button-buy-wrapper">
                  <button className="button-buy">Buy</button>
                  <button className="button-buy">Buy</button>
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