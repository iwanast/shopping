import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom"

export const Products = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:7904/products")
      .then((data) => data.json())
      .then((result) => {
        console.log(result)
        !result[0] ? alert("Det finns inga produkter att visas för tillfället")
        : setProducts(result);
        console.log(result)})
  }, []);

  return(
    <main id="main">
      <ul>
       {products.map((product) => (
          <li key={product._id}>
            {/* <Link to={`/item/${product._id}/${{product.author)}/${encodeURIComponent(product.picture.frontpicture)}/${broadcast.title}`}>
 */}
<Link to={"/item"} state={{product}} >
              <img src={product.picture.front} alt="Book-cover" />
              <div className="single-post-wrapper__content">
                <span>{product.author}</span>
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <p>{product.price} {product.currency}</p>
              </div>
              </Link>
            {/* </Link> */}
          </li>
       ))}
      </ul>
    </main>
  ) 
};