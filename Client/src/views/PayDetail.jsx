import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { CartDetailItem } from "../components/ProductCart/CartDetailItem/CartDetailItem";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { cleanCart } from "../Redux/Actions/cartActions";
import { paymentOk } from "../Redux/Actions/payActions";

export const PayDetail = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const user = useSelector((state) => state.auth.user);
    const ship = useSelector ((state) => state.pay.delivery);
    const navigate = useNavigate ();
    const dispatch = useDispatch();
    
    const [subtotal, setSubtotal] = useState(0);
    const [comission, setComission] = useState(0);
    const [finalTotal, setFinalTotal] = useState(0);
    const [paymentId, setPaymentId]=useState("");
    const [paymentDetail, setPaymentDetail] = useState({
      arrayProducts: [],
      id_user: "",
      id_payment: "",
      amount: "",
      date: "",
    });
  
    useEffect(() => {
     
        const calculatedSubtotal = cartItems.reduce((accumulator, item) => {
          return accumulator + parseFloat(item.price) * item.cartQuantity;
        }, 0);
        
        const calculatedComission = calculatedSubtotal * 0.15;
        const calculatedFinalTotal = (calculatedSubtotal + calculatedComission + 4.95).toFixed(2);
  
        setSubtotal(calculatedSubtotal);
        setComission(calculatedComission);
        setFinalTotal(calculatedFinalTotal);
        
        setPaymentDetail({
          arrayProducts: [...cartItems],
          id_user: user.id_user,
          id_payment: "",
          amount: calculatedFinalTotal,
          date: "",
        });
       
    }, [cartItems, user]);
  
    function createOrder() {
      const purchaseUnits = cartItems.map(item => ({
        name: item.name,
        description: item.description,
        quantity: item.cartQuantity.toString(), // Convert to string
        unit_amount: {
          currency_code: "USD",
          value: parseFloat(item.price).toFixed(2),
        },
      }));
  
      return fetch("https://neoshop-back.onrender.com/paypal/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: "USD",
                value: finalTotal,
                breakdown: {
                  item_total: { currency_code: "USD", value: subtotal.toFixed(2) },
                  shipping: { currency_code: "USD", value: "4.95" },
                  tax_total: { currency_code: "USD", value: comission.toFixed(2) },
                },
              },
              items: purchaseUnits,
            },
          ],
        }),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => data.id)
      .catch(error => {
        console.error("Error creating order:", error);
        throw error;
      });
    }
  
    async function onApprove(data) {
        setPaymentId(data.orderID);
        setPaymentDetail(prevDetail => ({
            ...prevDetail,
            id_payment: data.orderID,
            date: new Date().toISOString(),
        }));
      return fetch(`https://neoshop-back.onrender.com/paypal/capture-order/${data.orderID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderID: data.orderID,
          emailAddress: user.email,
        }),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(orderData => {
        const name = orderData.payer.name.given_name;
        toast.success("Success Payment Sent! " + name );
        setTimeout(() => {
            location.href = "/";
          }, 4000);
      })
 
      .catch(error => {
        console.error("Error capturing order:", error);
        throw error;
      });
    }
   
    useEffect(() => {
        const sendPayment = async () => {
            try {
                const response = await paymentOk(paymentDetail)();
                dispatch(cleanCart());

                console.log(response);
                
                // setTimeout(() => {
                //     location.href = "/";
                //   }, 5000);
            } catch (error) {
                console.error("Error sending payment:", error);
            }
        };

        if (paymentDetail.id_payment !== "") {
            sendPayment();
        }
    }, [paymentDetail]);

    console.log ("Este es el delivery" +ship);
return(
<div className="min-h-screen flex justify-center items-center bg-gray-100 ">
    
      <div className="h-[560px] w-[1100px] bg-white flex shadow-xl rounded-2xl mt-4 mb-4 z-10">
        <div className="order-info h-full w-[60%] p-6 flex justify-center relative box-border">
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
        <div className="h-full w-[40%] bg-orange-400 text-black-200 flex flex-col justify-center align-center text-sm p-6 relative rounded-tr-2xl rounded-br-2xl box-border">
          <div className="h-[300px] w-[300px] bg-white flex shadow-xl rounded-2xl justify-center items-center mt-4 mx-auto">
            <div className="text-center justify-center mt-4">
            <div className="font-light text-black">
                                <div className="mb-4 text-lg"><strong>Buyer Information:</strong></div>
                                <div><strong>Name:</strong> {user.name}</div>
                                <div><strong>Last Name:</strong> {user.lastname}</div>
                                <div><strong>Email:</strong> {user.email}</div>
                                <div><strong>Phone Number:</strong> {user.phone_number}</div>
                                <div><strong>Address Number:</strong> {user.adress_nro}</div>
                                <div><strong>Street:</strong> {user.adress_street}</div>
                                <div><strong>City:</strong> {user.city}</div>
                                <div><strong>State:</strong> {user.state}</div>
                                <div><strong>Postal Code:</strong> {user.postalCode}</div>
                                <div><strong>Delivery: </strong>{ship}</div>
                            </div>
            </div>
          </div>
          <div className="mt-4 flex justify-center w-full">
            <PayPalButtons
              createOrder={createOrder}
              onApprove={onApprove}
              style={{
                layout: "horizontal",
                color: "blue",
                shape: "rect",
                label: "pay",
                height:40,
              }}
            />
          </div>
          <button className="pay-btn border-none bg-gray-300 leading-8 rounded-lg text-sm text-gray-600 cursor-pointer mt-4 w-1/5 mx-auto transition duration-200 ease-in-out hover:bg-gray-500 hover:text-gray-200"
            onClick={() => navigate("/payPreview")}>
            GoBack
          </button>
        </div>
      </div>
    </div>
  );
};