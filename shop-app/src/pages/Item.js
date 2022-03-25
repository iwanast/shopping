import React, { useState} from "react";
import {useLocation} from "react-router-dom";
import { HiArrowSmLeft, HiArrowSmRight } from "react-icons/hi";
import './Item.css';

export const Item = () => {

  const location = useLocation()
  const item = location.state.product;
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
            <button className="button-buy">Buy</button>
          </div>
        </div>
      </main>
    </div>
  )
}