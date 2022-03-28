import React, {useState, useEffect} from "react";
import {IoSearchSharp} from "react-icons/io5"

import "./Search.css";
export const Search = ({onSelectedChange}) => {
  
  const [term, setTerm] = useState("");

  useEffect(() =>{
    const timeoutId = setTimeout(() => {
      if(term){
        fetch(`http://localhost:7904/products?author=${term}&title=${term}`)
        .then(response => response.json())
        .then(data => {
          onSelectedChange(data)
        })
      } else {
        fetch("http://localhost:7904/products")
        .then(response => response.json())
        .then(data => {
          onSelectedChange(data)
        })

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