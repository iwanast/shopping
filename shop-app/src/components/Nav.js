import React from  "react";
import { Link } from "react-router-dom";
import "./Nav.css";

export const Nav = () => {
  return(
    <>
    <div>
        <ul>
          <li>
            <Link to="/">Products</Link>
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