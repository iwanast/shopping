import React, {useState, useEffect} from "react";

import { Products } from "../pages";

export const Search = () => {
  
  const [term, setTerm] = useState("");
  const [result, setResult] = useState([]);

  useEffect(() =>{
    const timeoutId = setTimeout(() => {
      if(term){
        fetch(`http://localhost:7904/products?author=${term}&title=${term}`)
        .then(response => response.json())
        .then(data => setResult(data.query.search))
      }
    }, 500);
  
    return (()=>{
      clearTimeout(timeoutId);
    })
  }, [term]);

  const renderedResults = result.map(res => {
    return (
      <div key={res.pageid} className="item">
        <div className="content">
          <div className="header">
            {res.title}
          </div>
          <div>
            <span dangerouslySetInnerHTML={{ __html: res.snippet }}></span>
          </div>
        </div>
      </div>
    ) 
  })

  return (
    <div>
    <div className="ui form">
      <div className="field">
        <label>
          Enter a title or author
        </label>
        <input
          value={term}
          onChange={e=> setTerm(e.target.value)}>
        </input>
      </div>
    </div>
    <div className="ui celled list">
      {renderedResults}
    </div>
  </div>
  );
}