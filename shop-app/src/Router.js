import React from "react";
import { Routes, Route } from "react-router-dom";
import { Products, Admin, Item } from "./pages";

export const Router = () => {
  return(
    <Routes>
      {/* <Route path="/" element={<App /> } /> */}
        {/* <Route path=":ageParam" element={<App /> } />
        <Route path="" element={<App /> } /> 
      </Route>*/}
      <Route path="/" element={<Products /> } />
      <Route path="/item" element={<Item />} />
      <Route path="/admin" element={<Admin /> } />
      {/* <Route path="/audioplay/:id/:url/:imageurl/:title/:ageParam" element={<PlayEpisode /> } /> */}
      <Route 
        path="*" 
        element={
          <main>
            <p>There is nothing to show here!</p>
          </main>
        } 
      />
    </Routes>
  )
}

// /:id/:author/:title/:imageurl1/:imageurl2/:imageurl3/