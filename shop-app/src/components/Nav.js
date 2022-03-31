
import { Link } from "react-router-dom";
import React, { useContext } from "react";
import {CounterNumberOfArticles} from "../App"
import "./Nav.css";

export const Nav = ({onSelectedAllProduct, allProduct}) => {
  const role = JSON.parse(localStorage.getItem("role"))
  const {stateNumberOfArticles} = useContext(CounterNumberOfArticles)
  
  return(
    <>
    <div className="wrapper-nav">
        <ul>
          <li>
            <Link to="/" onClick={() => onSelectedAllProduct(allProduct === 0 ? 1 : 0)}>Products</Link>
          </li>
          <li>
            <Link to="/cart">Cart {stateNumberOfArticles.count > 0 ? <span className="span">{stateNumberOfArticles.count}</span> : ""}</Link>
          </li>
          <li>
            <Link to="/orders">Orders {1 > 0 ? <span className="span">1</span> : ""}</Link>
          </li>

          {role === "admin" ?   <li>
            <Link to="/admin">Admin </Link>
          </li> : ""}
        </ul>
        </div>
        </>
  );
}