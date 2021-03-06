import React, {useEffect, useState, useContext} from  "react";
import {IoTrash} from "react-icons/io5";
import {CounterNumberOfOrders} from "../App"
import { API_BASE_URL } from "../config"
import "./Cart.css";

export const Orders = () => {
  const [orders, setOrders] = useState([])
  const [changingOrder, setChangingOrder] = useState(false);
  const {dispatchNumberOfOrders} = useContext(CounterNumberOfOrders);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"))
    fetch(`${API_BASE_URL}/orders/${token}`)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((response) => {
        setOrders(response);
      })
      .catch((error) => console.log("Something went wrong with fetching the data: ", error))
  }, [changingOrder]);

function deleteProduct (event) {
  event.preventDefault();
  const orderId = event.currentTarget.getAttribute("orderid");

  fetch(`${API_BASE_URL}/orders`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      orderId: orderId
    })
  })
  .then(res => {
    if (res.ok){
      console.log("RES OK")
      console.log("ORDERID: ", orderId)
    setChangingOrder(!changingOrder)
    }
  throw res;
  })
  .catch((err) => {
    console.log(err.message);
    dispatchNumberOfOrders({type: "decrement"});
  });
}

function calcPrice(orders) {
  let sum = 0;
  orders.forEach(article => {
      sum += article.price * article.quantity;
  })
  return sum;
}
  
  return(
    <div>
    <h1 className="title-cart">My Orders</h1>
      <div className="table-responsive">
        <table className="table-bordered">
          <thead className="table-fix">
            <tr className="tr-head">
              <th>Ordernr</th>
              <th>Articles</th>
              <th className="text-center">Price</th>
              <th className="text-center">Status</th>
              <th className="text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {orders && (
              orders.map((order) => (
                <tr key={order._id} className="tr-order">
                  <td width="10%">{order.orderNumber}</td>
                  <td>
                    <ul>
                      { order.articles && (
                      order.articles.map(article => (
                        <li key={article.articleId} className="text-left">
                          {article.title} {article.quantity > 1 ? <span className="text-smaller">{`(${article.quantity})`}</span> : ""}
                        </li>
                      )))}
                    </ul>
                  </td>
                  <td width="15%" className="text-center">{calcPrice(order.articles)}</td>
                  <td width="15%" className="text-center">{order.status}</td>
                  <td width="10%">
                  {order.status === "ordered" ? <button type="button" onClick={deleteProduct} orderid={order._id} className="btn btn-danger btn-sm">  <IoTrash /></button> : "" } 
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  )
};


  // fetch(`${API_BASE_URL}/orders/order/${orderId}`)
  // .then(res => {
  //   if (res.ok) {
  //     return res.json();
  //   }
  //   throw res;
  // })
  // .then((response) => {
  //   console.log("RESPONS: ",response)
  //   console.log(response.articles)
  //   response.articles.forEach((article)=> {
  //     for(let i= 0; i <= article.quantity; i++)
  //     dispatchNumberOfOrders({type: "decrement"});
  //   })
  // })