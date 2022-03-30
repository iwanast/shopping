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
      localStorage.setItem("role", JSON.stringify(action.payload.data.role));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.data.name,
        token: action.payload.data.token
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




/*TODO:
  - order the Admin orders after user
  - separate the functions into different files
  - separate the Serverside more with different files
  - see on button Cart or Order how many you have;
  - implement on-click to order direct
  - implement admin and shipping
  - user have to confirm shipping-adress
  - user can change shipping-adress when ordering (at the moment I take the adress from the sign-in)
  - sign-up-page for not users
  - login window closing when clicking outside
  - login-form clearing when logout


  - auth
  - payment
*/
