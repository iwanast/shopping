import React, {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import { HiArrowSmLeft, HiArrowSmRight } from "react-icons/hi";

export const Item = () => {
const location = useLocation()
const item = location.state.product;
const images = item.picture;
console.log(images)
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
     <main id="main" className="outer-wrapper-product">
          <div key={item._id} className="wrapper-product" id="item">
              <img src={images[currentImageIndex]} alt="Book-cover" />
              {/* <img src={item.picture.first} alt="Book-cover" />
              <img src={item.picture.back} alt="Book-cover" /> */}
              <div className="wrapper-button-picture-slide"><button onClick={prevPicture}><HiArrowSmLeft /></button>
              <button onClick={nextPicture}><HiArrowSmRight /></button>
              </div>
              <div className="">
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