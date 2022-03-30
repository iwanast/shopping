import React from  "react";
import { Link } from "react-router-dom";
import "./Nav.css";

export const Nav = ({onSelectedAllProduct, allProduct}) => {
  const role = JSON.parse(localStorage.getItem("role"))
  console.log(role)
  return(
    <>
    <div className="wrapper-nav">
        <ul>
          <li>
            <Link to="/" onClick={() => onSelectedAllProduct(allProduct === 0 ? 1 : 0)}>Products</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
          <li>
            <Link to="/orders">Orders</Link>
          </li>

          {role === "admin" ?   <li>
            <Link to="/admin">Admin </Link>
          </li> : ""}
        </ul>
        </div>
        </>
  );
}