import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";

import {Search} from "../components";

export const Products = ({allProduct}) => {
  const [products, setProducts] = useState([]);
   
    useEffect(() => {
      fetch("http://localhost:7904/products")
        .then((data) => data.json())
        .then((result) => {
          console.log(result)
          !result[0] ? alert("Det finns inga produkter att visas för tillfället")
          : setProducts(result);
          console.log(result)})
    }, [allProduct]);


    console.log("SELECTED ALL PRODUCT?: ", allProduct)

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
              <div>
                <span>{product.author}</span>
                <h3>{product.title}</h3>
                <p>{product.price} {product.currency}</p>
              </div>
              </Link>
          </li>
       ))}
      </ul>
    </main>
    </>
  ) 
};