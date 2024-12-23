const express = require('express');
const { resolve } = require('path');
let cors = require ('cors');

const app = express();
const port = 3000;

app.use(express.static('static'));
app.use(cors());
let discountPercentage = 10; //10%
let taxRate = 5; //5%
let loyaltyRate = 2; //2 points per $1

//Endpoint1
function calculateTotalPrice(newItemPrice,cartTotal) {
let totalPrice = newItemPrice + cartTotal ;
return totalPrice.toString();

}
app.get("/cart-total", (req, res) => {
let newItemPrice = parseFloat(req.query.newItemPrice);
let cartTotal = parseFloat(req.query.cartTotal);
res.send(calculateTotalPrice(newItemPrice,cartTotal));


});

//Endpoint2
function getMembershipDiscount(cartTotal,isMember,discountPercentage) {
if (isMember === "true") {
  let finalPrice = cartTotal - (cartTotal * discountPercentage) / 100 ;
  return finalPrice.toString();
 } else {
  return cartTotal.toString();
}

}
app.get("/membership-discount", (req, res) => {
let cartTotal = parseFloat(req.query.cartTotal);
let isMember = req.query.isMember;
res.send(getMembershipDiscount(cartTotal,isMember,discountPercentage));

});

//Endpoint3
function calculateAppliedTax(cartTotal,taxRate) {
let finalTaxedPrice = cartTotal + (cartTotal * (taxRate/100));
let taxApplied = finalTaxedPrice - cartTotal ;
return taxApplied.toString();
}
app.get("/calculate-tax", (req, res) => {
let cartTotal = parseFloat(req.query.cartTotal);
res.send(calculateAppliedTax(cartTotal,taxRate));

});

//Endpoint4
function calculateDeliveryTime(distance, shippingMethod) {
  if (shippingMethod === "standard") {
    let deliveryDays = distance / 50 ;
    return deliveryDays.toString();
  } else {
    let deliveryDays = distance / 100 ;
    return deliveryDays.toString();
  }
}
app.get("/estimate-delivery", (req, res) => {
let shippingMethod = req.query.shippingMethod;
let distance = parseFloat(req.query.distance);
res.send(calculateDeliveryTime(distance, shippingMethod));

});
//Endpoint 5
function calculateShippingCost(weight, distance) {
let shippingCost = weight * distance * 0.1 ;
return shippingCost.toString();
}

app.get("/shipping-cost", (req, res) => {
let weight = parseFloat(req.query.weight);
let distance = parseFloat(req.query.distance);
res.send(calculateShippingCost(weight, distance));

});
//Endpoint 6
function calculateLoyaltyPoints(purchaseAmount, loyaltyRate) {
let loyaltyPoints = purchaseAmount * loyaltyRate;
return loyaltyPoints.toString();

}
app.get("/loyalty-points", (req, res) => {
let purchaseAmount = parseFloat(req.query.purchaseAmount);
res.send(calculateLoyaltyPoints(purchaseAmount, loyaltyRate));

});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
