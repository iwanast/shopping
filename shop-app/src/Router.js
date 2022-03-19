import React from "react";
import { Routes, Route } from "react-router-dom"
import App from './App';
import { Products, Admin } from "./pages";

export const Router = () => {
  return(
    <Routes>
      <Route path="/" element={<App /> } />
        {/* <Route path=":ageParam" element={<App /> } />
        <Route path="" element={<App /> } /> 
      </Route>*/}
      <Route path="/products" element={<Products /> } />
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