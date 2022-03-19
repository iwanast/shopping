import React from "react";
import {Products} from "./pages";
import {Router} from "./Router";
import {Nav} from "./components";
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Welcome to my literatur shop</h1>
      <div>
        <Nav />
      </div>
      {/* <Router /> */}
      <Products /> 
    </div>
  );
}

export default App;
