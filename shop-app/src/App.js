import React, {useState} from "react";
import {BiBookHeart} from "react-icons/bi";
import {Router} from "./Router";
import {Nav, Login, LoginForm} from "./components";
import './App.css';

export const AuthContext = React.createContext();
const initialState = {
  isAuthenticated: false,
  user: null,
  token: null
};
const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.data.name));
      localStorage.setItem("token", JSON.stringify(action.payload.data.token));
      console.log("WHAT IS action.payload:", action.payload);
      console.log("What is action.payload.user with JSON.stringify", JSON.stringify(action.payload.user))
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token
      };
    case "LOGOUT":
      localStorage.clear();
      return{
        ...state,
        isAuthenticated: false,
        user: null
      }
    default:
      console.log("Default in reducer")
      return state;
  }
}


export const App = () => {
  const [allProduct, setAllProduct] = useState(0);
  // const [showsInLogin, setShowsInLogin] = useState("");
  const [isShowLogin, setIsShowLogin] = useState(false);
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <AuthContext.Provider
      value={{state, dispatch}}>
    <div className="App">
      <header>
        <Nav onSelectedAllProduct={setAllProduct} allProduct={allProduct} />
        <div className="header-title">
          <h1>Your secondhand <span className="shop-icon"><BiBookHeart /></span> shop</h1>
          <Login setIsShowLogin={setIsShowLogin} />
        </div>
      </header>
      <LoginForm isShowLogin={isShowLogin} setIsShowLogin={setIsShowLogin} />
      <Router allProduct={allProduct} />
    </div>
    </AuthContext.Provider>
  );
}
