import React from  "react";
import { Link } from "react-router-dom";
import "./Nav.css";

export const Nav = ({onSelectedAllProduct, allProduct}) => {
  return(
    <>
    <div>
        <ul>
          <li>
            <Link to="/" onClick={() => onSelectedAllProduct(allProduct === 0 ? 1 : 0)}>Products</Link>
          </li>
          <li>
            <Link to="/admin">Admin</Link>
          </li>
        </ul>

        <hr />
        </div>
        </>
  );
}