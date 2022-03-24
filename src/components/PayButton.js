import { API } from "aws-amplify";
import React from "react";
import StripeCheckout from "react-stripe-checkout";
// import { Notification, Message } from "element-react";

const PayButton = ({product,user}) => {
   const stripeConfig ={
     currency:"USD",
     publishableAPIKey:"pk_test_51KavEmFVtIRfdJYCXkAANu1WksaDD02vb6KaahJHUW3a2r88yLovAPMifXVqfWyH0vK73HZQJ7OHXwVtaCTJJxPU00vpXwiyPt",
   }
   const handleCharge = async(token) =>{
     try {
      const result = await API.post("orderapi", "/charge", {
       body:{
        token,
        charge: {
          currency: stripeConfig.currency,
          amount: product.price,
          description: product.description
        },
       }
      })
      console.log({result})
     } catch (error) {
       console.log(error)
     }
   }
  return (
    <StripeCheckout
      token={handleCharge}
      email={user.attributes.email}
      name={product.description}
      amount={product.price}
      currency={stripeConfig.currency}
      stripeKey={stripeConfig.publishableAPIKey}
      shippingAddress={product.shipped}
      billingAddress={product.shipped}
      locale="auto"
      allowRememberMe={false}
    />
  );
};

export default PayButton;
