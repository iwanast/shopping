import React, {useState, useContext} from "react";
import { AuthContext} from "../App";
import { API_BASE_URL } from "../config"

export const LoginForm = ({isShowLogin, setIsShowLogin}) => {

  const {dispatch} = useContext(AuthContext)
  const initialState = {
    name: "Visitor",
    email: "user@user.com",
    password: "visitor",
    isSubmitting: false,
    errorMessage: null
  };
  const [data, setData] = useState(initialState);
  
  const handleInputChange = event => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    });
  };
  const handleFormSubmit = event => {
    event.preventDefault();
    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null
    });
    fetch(`${API_BASE_URL}/users/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: data.email,
        password: data.password
      })
    })
    .then(res => {
      if (res.ok){
        return res.json()
      }
      throw res;
    })
    .then(resJson => {
      setIsShowLogin((isShowLogin) => !isShowLogin)
      dispatch({
        type: "LOGIN",
        payload: resJson
      })
    })
    .catch(error => {
      setData({
        ...data,
        isSubmitting: false,
        errorMessage: error.message || error.statusText
      })
    })
  }
  
  return(
    <div className={`${!isShowLogin ? "active" : ""} show`}>
      <div className="login-form">
        <div className="form-box solid">
          <form onSubmit={handleFormSubmit}>
            <h1 className="login-text margin">Login</h1>
            <label className="margin">Name</label><br></br>
            <input
              type="text"
              value={data.name}
              onChange={handleInputChange}
              name="name"
              id="name"
              className="login-box margin"
              required
            /><br></br>
            <label className="margin">Email Adress</label><br></br>
            <input
              type="text"
              value={data.email}
              onChange={handleInputChange}
              name="email"
              id="email"
              className="login-box margin"
              required
            /><br></br>
            <label className="margin">Password</label><br></br>
            <input
              type="password"
              value={data.password}
              onChange={handleInputChange}
              name="password"
              id="password"
              className="login-box margin"
              required
            /><br></br>
            {data.errorMessage && (
              <span className="form-error">{data.errorMessage}"</span>
            )}
             <button className="margin" disabled={data.isSubmitting}>
               {data.isSubmitting ? 
                "Loading..." : 
                "Login"} 
             </button>
          </form>
        </div>
      </div>
    </div>
  );
};