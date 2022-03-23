import React, {useState} from  "react";
import "./Cart.css";

export const Cart = () => {
  const [articlesInCart, setArticlesInCart] = useState([{"_id":{"$oid":"6239c1869d5f80c978922518"},"title":"Wenn ich gross bin, werde ich Astromaus","author":"Steve Smallmann","price":120,"picture":["http://localhost:7904/pictures/Astromaus.jpg","http://localhost:7904/pictures/Astromaus1.jpg","http://localhost:7904/pictures/Astromaus2.jpg"],"currency":"SEK","genre":"fiction","startage":0,"quantity":10,"description":"A mouse who wants to become an astromouse and uses its ressources to become one","language":"deutsch"}])
  const [count, setCount] = useState(0);

  
  return(
    <div>
      <h1 className="title-cart">My Cart</h1>
      <ul className="wrapper-cart">
      {articlesInCart && (
        articlesInCart.map((product) => (
          <li key={product._id} className="wrapper-cart-article">
            {/* <Link to={"/item"} state={{product}} > */}
              <img src={product.picture[0]} alt="Book-cover" />
                <p>{product.title} from {product.author}</p>
                <label for="quantity">Quantity:</label> <select name="quantity"><option value ></option></select>
                <p>Price: {product.price} {product.currency}</p>
                <button>Delete</button>
                
              {/* </Link> */}

          </li>   
        ))
      )}
      </ul>
    </div>
  );
};