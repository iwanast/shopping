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
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.playload.token));
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
      return state;
  }
}


export const App = () => {
  const [allProduct, setAllProduct] = useState(0);
  const [showsInLogin, setShowsInLogin] = useState("");
  const [isShowLogin, setIsShowLogin] = useState(false);
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const handleLoginClick = () => {
    setIsShowLogin((isShowLogin) => !isShowLogin)
  }
  return (
    <AuthContext.Provider
      value={{state, dispatch}}>
    <div className="App">
      <header>
        <Nav onSelectedAllProduct={setAllProduct} allProduct={allProduct} />
        <div className="header-title">
          <h1>Your secondhand <span className="shop-icon"><BiBookHeart /></span> shop</h1>
          <Login showsInLogin={showsInLogin} handleLoginClick={handleLoginClick} />
        </div>
      </header>
      <LoginForm isShowLogin={isShowLogin} onLogin={setShowsInLogin} />
      <Router allProduct={allProduct} />
    </div>
    </AuthContext.Provider>
  );
}
