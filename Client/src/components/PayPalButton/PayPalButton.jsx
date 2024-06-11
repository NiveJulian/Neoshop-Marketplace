import React, { useEffect } from 'react';
import {PaypalButtons} from "@paypal/react-paypal-js"

const PaypalButton = () => {
  useEffect(() => {
    window.paypal.Buttons({
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: "1.00"
            }
          }]
        });
      },
      onApprove: (data, actions) => {
        return actions.order.capture().then(details => {
          alert("Transaction completed by" + details.payer.name.given_name);
        });
      }, 
      onCancel: (data, ) => {
        alert ("Pay cancel")
      }
    }).render("#paypal-button-container");
  }, []); // El array vacío asegura que esto solo se ejecute una vez al montar el componente

  return (
    <div>
      <div id="paypal-button-container"></div>
    </div>
  );
};

export default PaypalButton;