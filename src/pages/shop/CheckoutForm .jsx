/* eslint react/prop-types: 0 */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { FaPaypal } from "react-icons/fa";
import useAuth from "../../hooks/useAuth.jsx";
import useAxiosSecure from "../../hooks/useAxiosSecure.jsx";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ price, cart }) => {
  const stripe = useStripe();
  const elements = useElements();
  const {user} = useAuth()
  const axiosSecure = useAxiosSecure()
  const navigate = useNavigate()

  const [cardError, setCardError] = useState();
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if (typeof price !== 'number' || price < 1) {
        return;
    }
    // Create PaymentIntent as soon as the page loads
    axiosSecure.post("/create-payment-intent", {price})
      .then(res => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret)
      })
  }, [price, axiosSecure]);



  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log('[error]', error);
      setCardError(error.message);
    } else {
        setCardError("success!");
    //   console.log('[PaymentMethod]', paymentMethod);
    }

    const {paymentIntent, error:confirmError} = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: card,
            billing_details: {
              name: user?.displayName || 'anonymous',
              email: user?.email || "unknown"
            },
          },
        },
      );
      if (confirmError) {
        console.log(confirmError);
      }
      console.log(paymentIntent); 
      if (paymentIntent.status === 'succeeded') {
        console.log(paymentIntent.id);
        setCardError(`Your transaction Id is ${paymentIntent.id}`);

        // payment info data 
        const paymentInfo = {
            email: user.email,
            transitionId: paymentIntent.id,
            price,
            quantity: cart.length,
            status: "Order Pending",
            itemName: cart.map(item => item.name),
            cartItems: cart.map(item => item._id),
            menuItems: cart.map(item => item.menuItemId)
        }
        // send information in backend 
        axiosSecure.post('/payments',paymentInfo)
        .then(res => {
            console.log(res.data);
            alert("Payment Successful!");
            navigate('/order')
        })
      }
  };
  return (
    <div className="flex flex-col sm:flex-row justify-start items-start gap-8 ">
      {/* left  */}
      <div className="md:w-1/2 w-full space-y-3">
        <h4 className="text-lg font-semibold text-black">Order Summary</h4>
        <p>Total Price: ${price}</p>
        <p>Number of Items : {cart.length}</p>
      </div>

      {/* right  */}
      <div className="md:w-1/3 w-full space-y-3 text-black card shrink-0 max-w-sm shadow-2xl  px-4 py-8 bg-white">
        <h4 className="text-lg font-semibold text-black">
          Process your Peyment!
        </h4>
        <h5 className="font-medium">Credit/Debit Card</h5>

        {/* strip from  */}
        <form onSubmit={handleSubmit}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <button type="submit" disabled={!stripe} className="btn btn-sm mt-5 bg-primary w-full text-white border-none">
            Pay
          </button>
        </form>
        {
            cardError ? <p className="text-red italic text-xs">{cardError}</p> : ""
        }

        {/* paypal  */}
        <div className="mt-5 text-center">
            <hr />
            <button type="submit" className="btn btn-sm mt-5 bg-orange-500 text-white border-none">
            <FaPaypal/> Pay with Paypal
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
