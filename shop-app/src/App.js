import React, {useState} from "react";
import {Products} from "./pages";
import {Router} from "./Router";
import {Nav} from "./components";
import './App.css';

export const App = () => {
  const [allProduct, setAllProduct] = useState(0);
  return (
    <div className="App">
      <h1>Your secondhand literatur shop</h1>
      <div>
        <Nav onSelectedAllProduct={setAllProduct} allProduct={allProduct} />
        <Router allProduct={allProduct} />
      </div>
      {/* <Products />  */}
    </div>
  );
}
