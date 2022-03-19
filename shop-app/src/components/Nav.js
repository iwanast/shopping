import React from  "react";
import { Link } from "react-router-dom";

export const Nav = () => {
  return(
    <>
    <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
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