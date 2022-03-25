import React, {useState, useEffect} from "react";
import {BiLogIn} from "react-icons/bi";
import {BiLogOut} from "react-icons/bi"
import { AuthContext } from "../App";

export const Login = ({setIsShowLogin}) => {

  const {dispatch} = React.useContext(AuthContext)

  function logout(){
    dispatch({
      type: "LOGOUT",
    })
  }

  return(
    <div>
      {localStorage.hasOwnProperty('token') && localStorage.hasOwnProperty('user') ? <><span>Hi, {JSON.parse(localStorage.getItem("user"))}</span> <button><BiLogOut onClick={logout} /></button></> : <button className="button-login" onClick={()=> {setIsShowLogin((isShowLogin) => !isShowLogin)}}><BiLogIn/></button>}
    </div>
  );
};