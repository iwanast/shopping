import React, { useState} from "react";
import {useLocation} from "react-router-dom";
import { HiArrowSmLeft, HiArrowSmRight } from "react-icons/hi";
import { addToCart } from "../components/addToCart";
import './Item.css';

export const Item = () => {

  const location = useLocation()
  const item = location.state.product;
  // console.log(location.data.addToCart())
  const images = item.picture;
  


  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextPicture = () => {
  setCurrentImageIndex(currentImageIndex === images.length - 1 ? 0 : currentImageIndex+1)
  };
  const prevPicture = () => {
  setCurrentImageIndex(currentImageIndex === 0 ? images.length - 1 : currentImageIndex -1);
  };

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
            <p>{item.author}</p>
            <span>{item.title}</span>
            <p>{item.description}</p>
            <p>{item.form}, quality: {item.quality}</p>
            <p >{item.price} {item.currency}</p>
            <div className="button-buy-wrapper">
              <button onClick={addToCart} productid={item._id} className="button-buy">Add to Cart</button>
              <button className="button-buy" productid={item._id}>Buy with Oneclick</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}