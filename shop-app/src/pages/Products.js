import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import { useContext } from "react";
import {CounterNumberOfArticles, CounterNumberOfOrders} from "../App"
import { addToCart, addToOrderOneClick } from "../components";
import { API_BASE_URL } from "../config"
import {Search} from "../components";

export const Products = ({allProduct}) => {
  const [products, setProducts] = useState([]);
  const {dispatchNumberOfArticles} = useContext(CounterNumberOfArticles);
  const {dispatchNumberOfOrders} = useContext(CounterNumberOfOrders)

   
    useEffect(() => {
      fetch(`${API_BASE_URL}/products`)
        .then((data) => data.json())
        .then((result) => {
          !result[0] ? alert("Det finns inga produkter att visas för tillfället")
          : setProducts(result);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }, [allProduct]);

  function increaseNumberByOne(dispatch){
    const token = JSON.parse(localStorage.getItem("token"))
    if(!token || token === undefined){
      return
    }
    dispatch({type: "increment"});
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
                <span className="text-smaller">{product.author}</span>
                <p className="product-title">{product.title}</p>
                <p>{product.price} {product.currency}</p>
                <div className="button-buy-wrapper">
                  <button onClick={(event) => {addToCart(event); increaseNumberByOne(dispatchNumberOfArticles)}}   productid={product._id} className="button-buy">Add to Cart</button>
                  <button onClick={(event) => {addToOrderOneClick(event); increaseNumberByOne(dispatchNumberOfOrders)}} className="button-buy" productid={product._id}>Buy with Oneclick</button>
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