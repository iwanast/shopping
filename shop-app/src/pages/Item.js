import React, {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
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
      <Link to={"/products"}>
        <button>
          Back to Products
        </button>
      </Link>
     <main id="main">
        <div key={item._id} className="wrapper-item">
          <img src={images[currentImageIndex]} alt="Book-cover" />
          <div className="wrapper-button-picture-slide">
            <button onClick={prevPicture} className="button-item"><HiArrowSmLeft /></button>
            <button onClick={nextPicture} className="button-item"><HiArrowSmRight /></button>
          </div>
          <div>
            <span>{item.author}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p>{item.price} {item.currency}</p>
          </div>
        </div>
      </main>
    </div>
  )
}