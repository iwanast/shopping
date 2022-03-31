import React, {useEffect, useState, useContext} from  "react";
import {IoTrash} from "react-icons/io5";
import {CounterNumberOfOrders} from "../App"
import "./Cart.css";

export const Orders = () => {
  const [orders, setOrders] = useState([])
  const [changingOrder, setChangingOrder] = useState(false);
  const {dispatchNumberOfOrders} = useContext(CounterNumberOfOrders);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"))
    fetch(`http://localhost:7904/orders/${token}`)
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
  const orderNumber = event.currentTarget.getAttribute("ordernumber");
  console.log(orderNumber)
fetch(`http://localhost:7904/orders`, {
  method: "delete",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    orderNumber: orderNumber
  })
})
.then(res => {
  if (res.ok){
  setChangingOrder(!changingOrder)
  dispatchNumberOfOrders({type: "decrement"});
  }
throw res;
})
.catch((err) => {
  console.log(err.message);
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
                        <li key={article.articleId}>
                          {article.title}
                        </li>
                      )))}
                    </ul>
                  </td>
                  <td width="15%" className="text-center">{calcPrice(order.articles)}</td>
                  <td width="15%" className="text-center">{order.status}</td>
                  <td width="10%">
                  {order.status === "ordered" ? <button type="button" onClick={deleteProduct} ordernumber={order.orderNumber} className="btn btn-danger btn-sm">  <IoTrash /></button> : "" } 
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