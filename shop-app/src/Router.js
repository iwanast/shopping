import React from "react";
import { Routes, Route } from "react-router-dom";
import { Products, Admin, Item, Cart, Orders } from "./pages";

export const Router = ({allProduct, setNumberOfArticlesInCart, setNumberOfOrdersInOrders}) => {
  return(
    <Routes>
      <Route path="/" element={<Products allProduct={allProduct} />} />
      <Route path="/item" element={<Item />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/cart" element={<Cart setNumberOfArticlesInCart={setNumberOfArticlesInCart} />} />
      <Route path="/orders" element={<Orders setNumberOfOrdersInOrders={setNumberOfOrdersInOrders} />} />
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
