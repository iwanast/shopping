import React, {useState, useEffect} from "react";
import {BiLogIn} from "react-icons/bi";
import {BiLogOut} from "react-icons/bi"

export const Login = ({showsInLogin, handleLoginClick}) => {

  const handleClick = () => {
    handleLoginClick()
  }

  return(
    <div>
      {!showsInLogin ? <button className="button-login" onClick={handleClick}><BiLogIn/></button> : <><p>Hi, {showsInLogin}</p> <button><BiLogOut /></button></>}
    </div>
  );
};