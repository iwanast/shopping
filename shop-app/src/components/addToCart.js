import { API_BASE_URL } from "../config"

export  function addToCart(event){

  event.preventDefault();
  const productId = event.target.getAttribute("productid");
  const token = JSON.parse(localStorage.getItem("token"))
  if(!token || token === undefined){
    alert("Something is wrong with your login. Please login before adding/buying items.")
  }
  fetch(`${API_BASE_URL}/shopping-cart/article`, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      productId: productId,
      token: token
    })
  })
  .then(res => {
    if (res.ok){
    }else if(res.Unauthorized){
      alert("Something went wrong. Could you try to login again?");
    }
    throw res;
  })
  .catch((err) => {
    console.log(err.message);
  });
}