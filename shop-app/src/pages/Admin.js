import React, {useEffect, useState} from  "react";
import "./Cart.css";

export const Admin = () => {
  const [orders, setOrders] = useState([])
  const [changingOrder, setChangingOrder] = useState(false);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"))
    fetch(`http://localhost:7904/orders/admin/${token}`)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((response) => {setOrders(response)
        console.log("RESPONS: ",response)})
      .catch((error) => console.log("Something went wrong with fetching the data: ", error))
  }, [changingOrder]);

function shippingDone (event) {
  event.preventDefault();
  const orderId = event.currentTarget.getAttribute("orderid");
fetch(`http://localhost:7904/orders/update`, {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    orderId: orderId
  })
})
.then(res => {
  if (res.ok){
  setChangingOrder(!changingOrder)
  }
throw res;
})
.catch((err) => {
  console.log(err.message);
});
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
              <th className="text-center">Shipping adress</th>
              <th className="text-center">Status</th>
              <th className="text-center">Shipping</th>
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
                  <td>{order.customerAdress.street}<br/>{order.customerAdress.postalCode} {order.customerAdress.city}<br/>{order.customerAdress.country}</td>
                  <td width="15%" className="text-center">{order.status}</td>
                  <td width="10%">
                  <button type="button" onClick={shippingDone} orderid={order._id} className="btn btn-danger btn-sm">  Shipping done</button>
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