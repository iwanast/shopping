import React, {useContext, useState} from "react";
import {useLocation} from "react-router-dom";
import { HiArrowSmLeft, HiArrowSmRight } from "react-icons/hi";
import { addToCart, addToOrderOneClick } from "../components";
import {CounterNumberOfArticles, CounterNumberOfOrders} from "../App"
import './Item.css';

export const Item = () => {

  const location = useLocation()
  const item = location.state.product;
  const images = item.picture;
  const {dispatchNumberOfArticles} = useContext(CounterNumberOfArticles)
  const {dispatchNumberOfOrders} = useContext(CounterNumberOfOrders)


  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextPicture = () => {
  setCurrentImageIndex(currentImageIndex === images.length - 1 ? 0 : currentImageIndex+1)
  };
  const prevPicture = () => {
  setCurrentImageIndex(currentImageIndex === 0 ? images.length - 1 : currentImageIndex -1);
  };

  function increaseNumberByOne(dispatch){
    const token = JSON.parse(localStorage.getItem("token"))
    if(!token || token === undefined){
      return
    }
    dispatch({type: "increment"});
  }

  return(
    <div> 
     <main id="main">
        <div key={item._id} className="wrapper-item">
          <img src={images[currentImageIndex]} alt="Book-cover" />
          <div className="wrapper-button-picture-slide">
            <button onClick={prevPicture} className="button-item"><HiArrowSmLeft /></button>
            <button onClick={nextPicture} className="button-item"><HiArrowSmRight /></button>
          </div>
          <div>
            <p className="text-smaller">{item.author}</p>
            <span className="product-title">{item.title}</span>
            <p className="product-description">{item.description}</p>
            <p className="text-middle">{item.form}, quality: {item.quality}</p>
            <p >{item.price} {item.currency}</p>
            <div className="button-buy-wrapper">
            <button onClick={(event) => {addToCart(event); increaseNumberByOne(dispatchNumberOfArticles)}}    productid={item._id} className="button-buy">Add to Cart</button>
            <button onClick={(event) => {addToOrderOneClick(event); increaseNumberByOne(dispatchNumberOfOrders)}} className="button-buy" productid={item._id}>Buy with Oneclick</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}