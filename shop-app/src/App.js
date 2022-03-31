import React, {useEffect, useState} from "react";
import {BiBookHeart} from "react-icons/bi";
import {Router} from "./Router";
import {Nav, Login, LoginForm} from "./components";
import './App.css';

export const AuthContext = React.createContext();
export const CounterNumberOfArticles = React.createContext();
export const CounterNumberOfOrders = React.createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null
};

const reducerAuth = (state, action) => {
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

const initialStateNumberOfArticles = {count: 0};

function reducerNumberOfArticles (stateNumberOfArticles, action) {
  switch (action.type) {
    case "increment":
      return {count: stateNumberOfArticles.count + 1};
    case "decrement":
      return {count: stateNumberOfArticles.count - 1};
    default:
      throw new Error();
  }
}

const initialStateNumberOfOrders = {count: 0};

function reducerNumberOfOrders (stateNumberOfOrders, action) {
  switch (action.type) {
    case "increment":
      return {count: stateNumberOfOrders.count + 1};
    case "decrement":
      return {count: stateNumberOfOrders.count - 1};
    default:
      throw new Error();
  }
}


export const App = () => {
  const [allProduct, setAllProduct] = useState(0);
  const [isShowLogin, setIsShowLogin] = useState(false);
  const [state, dispatch] = React.useReducer(reducerAuth, initialState);
  const [stateNumberOfArticles, dispatchNumberOfArticles] = React.useReducer(reducerNumberOfArticles, initialStateNumberOfArticles)
  const [stateNumberOfOrders, dispatchNumberOfOrders] = React.useReducer(reducerNumberOfOrders, initialStateNumberOfOrders)
  const token = JSON.parse(localStorage.getItem("token"))

  useEffect(()=>{
    fetch(`http://localhost:7904/shopping-cart/${token}`)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((response) => {
        setInitialStateNumberArticles(response, dispatchNumberOfArticles)
      })
      .catch((error) => console.log("Something went wrong with fetching the data: ", error))
  }, [])

  function setInitialStateNumberArticles(response, dispatch){
    response.forEach(element => {
      for(let i=0; i < element.quantity; i++){
        dispatch({type: "increment"})
      }
    });
  }

  useEffect(() => {
    fetch(`http://localhost:7904/orders/${token}`)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((response) => {
        console.log(response)
        setInitialStateNumber(response, dispatchNumberOfOrders)
      })
      .catch((error) => console.log("Something went wrong with fetching the data: ", error))
  }, []);

  function setInitialStateNumber(response, dispatch){
    for(let i= 0; i < response.length; i++){
      dispatch({type: "increment"})
      console.log("ORDERINCREMENT")
    }
  }

  return (
    <AuthContext.Provider
      value={{state, dispatch}}>
    <CounterNumberOfArticles.Provider value={{stateNumberOfArticles, dispatchNumberOfArticles}}>
    <CounterNumberOfOrders.Provider value={{stateNumberOfOrders, dispatchNumberOfOrders}}>
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
    </CounterNumberOfOrders.Provider>
    </CounterNumberOfArticles.Provider>
    </AuthContext.Provider>
  );
}



/*TODO: 
  - make more components (like Button) to reuse
  - separate the functions into different files
  - separate the Serverside more with different files
  - user have to confirm shipping-adress
  - user can change shipping-adress when ordering (at the moment I take the adress from the sign-in)
  - sign-up-page for not users
  - login window closing when clicking outside
  - login-form clearing when logout


  - auth
  - payment
*/
