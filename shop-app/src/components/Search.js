import React, {useState, useEffect} from "react";
import "./Search.css";
export const Search = ({onSelectedChange}) => {
  
  const [term, setTerm] = useState("");
  console.log("TERM: ", term)
  useEffect(() =>{
    console.log(term)
    const timeoutId = setTimeout(() => {
      if(term){
        fetch(`http://localhost:7904/products?author=${term}&title=${term}`)
        .then(response => response.json())
        .then(data => {
          console.log(data);
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
          Search after a title or author: 
        </label>
        <input className="input-search" type="text"
          onChange={e=> setTerm(e.target.value)}>
        </input>
      </div>
    </div>
  </div>
  );
}