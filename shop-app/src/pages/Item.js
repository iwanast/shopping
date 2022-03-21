import React, {useState, useEffect} from "react";
import {Link, useLocation} from "react-router-dom";

export const Item = () => {
const location = useLocation()
const [item, setItem] = useState(location.state.product);
console.log(location.state.product)

  return(
    <div> 
      <Link to={"/products"}>
      <button>
          Back
        </button>
      </Link>
      <h1>
        Hello item works.
      </h1>
    </div>
     /* <main id="main">
       <ul>
      {products.map((product) => (
          <li key={product._id}>
              <img src={product.picture.frontpicture} alt="Book-cover" />
              <div className="single-post-wrapper__content">
                <span>{product.author}</span>
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <p>{product.price} {product.currency}</p>
              </div>
          </li>
       ))}
      </ul>
    </main>  */
  )
}