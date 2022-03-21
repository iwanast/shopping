import React, {useState} from "react";
import {Link, useLocation} from "react-router-dom";

export const Item = () => {
const location = useLocation()
const [item, setItem] = useState(location.state.product);
console.log(location.state.product)

  return(
    <div> 
      <Link to={"/products"}>
      <button>
          Back to Products
        </button>
      </Link>
     <main id="main">
          <div key={item._id}>
              <img src={item.picture.front} alt="Book-cover" />
              <img src={item.picture.first} alt="Book-cover" />
              <img src={item.picture.back} alt="Book-cover" />
              <div className="single-post-wrapper__content">
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