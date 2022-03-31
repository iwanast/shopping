import React, {useState, useEffect} from "react";
import {IoSearchSharp} from "react-icons/io5"
import { API_BASE_URL } from "../config"
import "./Search.css";
export const Search = ({onSelectedChange}) => {
  
  const [term, setTerm] = useState("");

  useEffect(() =>{
    const timeoutId = setTimeout(() => {
      if(term){
        fetch(`${API_BASE_URL}/products?author=${term}&title=${term}`)
        .then(response => response.json())
        .then(data => {
          onSelectedChange(data)
        })
        .catch((err) => {
          console.log(err.message);
        });
      } else {
        fetch(`${API_BASE_URL}/products`)
        .then(response => response.json())
        .then(data => {
          onSelectedChange(data)
        })
        .catch((err) => {
          console.log(err.message);
        });

      }
    }, 500);
  
    return (()=>{
      clearTimeout(timeoutId);
    })
  }, [term]);

  

  return (
    <div>
    <div className="ui form">
      <div className="field">
        <label>
          <IoSearchSharp/>
        </label>
        <input className="input-search" type="text" placeholder="Search"
          onChange={e=> setTerm(e.target.value)}>
        </input>
      </div>
    </div>
  </div>
  );
}