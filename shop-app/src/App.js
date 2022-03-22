import React from "react";
import {Products} from "./pages";
import {Router} from "./Router";
import {Nav} from "./components";
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Your secondhand literatur shop</h1>
      <div>
        <Nav />
        <Router />
      </div>
      {/* <Products />  */}
    </div>
  );
}

export default App;
