export  function addToOrderOneClick(event){
  event.preventDefault();
  const productId = event.target.getAttribute("productid");
  const token = JSON.parse(localStorage.getItem("token"))
  if(!token || token === undefined){
    alert("Something is wrong with your login. Please login before adding/buying items.")
  }
  fetch(`http://localhost:7904/order/article`, {
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