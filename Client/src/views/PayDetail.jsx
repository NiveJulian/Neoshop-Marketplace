import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { CartDetailItem } from "../components/ProductCart/CartDetailItem/CartDetailItem";

export const PayDetail = () => {
  const cartItems = useSelector((state) => state.cartItems);
  useEffect(() => {
    console.log(cartItems);
  }, []);

  const subtotal = cartItems.reduce((accumulator, item) => {
    return accumulator + parseFloat(item.price) * item.quantity;
  }, 0);

  const comission = subtotal * 0.15;
  const finalTotal = (subtotal+comission+4.95);

  async function createOrder() {
    try {
      const purchaseUnits = cartItems.map(item => ({
        name: item.name,
        description: item.description,
        amount: {
          currency_code: "USD",
          value: (parseFloat(item.price) * item.quantity).toFixed(2),
        },
        quantity: item.quantity,
      }));

      const response = await axios.post('/my-server/create-paypal-order', {
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: finalTotal.toFixed(2),
              breakdown: {
                item_total: { currency_code: "USD", value: subtotal.toFixed(2) },
                shipping: { currency_code: "USD", value: "4.95" },
                tax_total: { currency_code: "USD", value: comission.toFixed(2) },
              },
            },
            items: purchaseUnits,
          },
        ],
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.data.id;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  }

  async function onApprove(data, actions) {
    try {
      const response = await axios.post('/my-server/capture-paypal-order', {
        orderID: data.orderID,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const orderData = response.data;
      const name = orderData.payer.name.given_name;
      alert(`Transaction completed by ${name}`);
    } catch (error) {
      console.error("Error capturing order:", error);
      throw error;
    }
  }


  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 ">
      <div className="h-[550px] w-[1100px] bg-white flex shadow-xl rounded-2xl mt-4 mb-4 z-10">
        <div className="order-info h-full w-1/2 p-6 flex justify-center relative box-border">
          <div className="order-info-content w-full table-fixed ">
            <h2 className="mb-0 mt-1 text-center font-light text-lg">
              Order Summary
            </h2>
            <CartDetailItem cartItems={cartItems} />
            <div className="line h-px w-full my-2 bg-gray-300"></div>
            <div className="total mt-6 text-lg absolute bottom-5 left-9 right-6">
              <span className="float-left">
                <div className="dense font-light text-base leading-snug">
                  COMMISSION 15%
                </div>
                <div className="dense font-light text-base leading-snug">
                  Delivery
                </div>
                TOTAL
              </span>
              <span className="float-right text-right">
                <div className="dense font-light text-base leading-snug">
                  ${comission}
                </div>
                <div className="dense font-light text-base leading-snug">
                  $4.95
                </div>
                ${finalTotal}
              </span>
            </div>
          </div>
        </div>
        <div className=" h-full w-1/2 bg-orange-400 text-black-200 flex justify-center align-center text-sm p-6 relative rounded-tr-2xl rounded-br-2xl box-border">
          <div className="h-[390px] w-[280px] bg-white flex shadow-xl rounded-2xl justify-center align-center mt-4 ">
            <div className="">User</div>
            <div className="font-light color-black">Adress</div>
          </div>
          <div className="h-[390px] w-[330px] mr-1 ml-6 flex justify-center align-center rounded-2xl mt-4 overflow-hidden ">
            <div className="mt-1 flex p-1 rounded-xl overflow-y-auto  ">
              <PayPalButtons
                createOrder={createOrder}
                onApprove={onApprove}
                style={{
                  layout: "vertical",
                  color: "blue",
                  shape: "rect",
                  label: "paypal",
                }}
              />
            </div>
          </div>
          <button className="pay-btn border-none bg-green-600 leading-8 rounded-lg text-lg text-white cursor-pointer absolute bottom-6 w-[calc(50%-50px)] transition duration-200 ease-in-out hover:bg-green-500">
            Finish
          </button>
        </div>
      </div>
    </div>
  );
};
