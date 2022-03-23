import React, {useState} from "react";
import {Router} from "./Router";
import {Nav} from "./components";
import './App.css';
import {BiBookHeart} from "react-icons/bi";
// import {BsFillBookmarkHeartFill} from "react-icons/bs";

export const App = () => {
  const [allProduct, setAllProduct] = useState(0);
  return (
    <div className="App">
      <header>
        <Nav onSelectedAllProduct={setAllProduct} allProduct={allProduct} />
        <div className="header-title">
          <h1>Your secondhand <span className="shop-icon"><BiBookHeart /></span> shop</h1>
        </div>
      </header>
        <Router allProduct={allProduct} />
    </div>
  );
}
