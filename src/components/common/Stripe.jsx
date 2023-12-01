import React, { useState } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import {
  userMakePayment,
  userPaymentConfirm,
} from "../../redux/thunk/user/usrPayment";
import { toast } from "react-toastify";
import BtnGroup from "./BtnGroup";
import Button from "./Button";

const CheckoutForm = ({ amount, programId, onCancel }) => {
  const [errorMessage, setErrorMessage] = useState(null);

  //Redux state
  const { userAuthtoken } = useSelector((state) => state.userAuth);

  //Redux action dispatcher
  const dispatch = useDispatch();

  //Stripe functions
  const stripe = useStripe();
  const elements = useElements();

  //Methods
  const makePaymentHandler = async () => {
    if (!stripe || !elements) {
      return;
    }
    const cardElement = elements.getElement(CardNumberElement);
    try {
      const stripeToken = await stripe.createToken(cardElement);
      const values = {
        amount: amount,
        token: stripeToken.token.id,
        program_id: programId,
      };

      dispatch(userMakePayment({ values, userAuthtoken })).then(
        async ({ payload }) => {
          if (
            payload.responseData.status === "requires_action" &&
            payload.responseData.next_action.type === "use_stripe_sdk"
          ) {
            const { paymentIntent, error } = await stripe.confirmCardPayment(
              payload.responseData.client_secret
            );
            const data = {
              userAuthtoken,
              values: {
                payment_intent_id: paymentIntent?.id,
                program_id: programId,
              },
              cb: onCancel,
            };
            if (!error) {
              switch (paymentIntent.status) {
                case "succeeded":
                  dispatch(userPaymentConfirm(data));
                  break;
                case "processing":
                  toast.info("Payment is under process.");
                  break;
                case "requires_payment_method":
                  toast.error("Your payment is rejected.");
                  break;
                default:
                  toast.error("Something went wrong.");
                  break;
              }
            } else {
              toast.error("Your payment is faild please try again.");
              setErrorMessage("An error occured please try again.");
            }
          } else {
            const data = {
              userAuthtoken,
              values: {
                payment_intent_id: payload.responseData.paymentIntent.id,
                program_id: programId,
              },
            };
            dispatch(userPaymentConfirm(data));
          }
        }
      );
    } catch (error) {
      setErrorMessage("An error occured please try again.");
    }
  };

  const options = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
    hidePostalCode: true, // You can customize this option to show or hide the postal code field
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    makePaymentHandler();
  };

  const onCancelHandler = () => {
    onCancel();
  };
  return (
    <form onSubmit={onSubmitHandler}>
      <CardNumberElement id="card-number-element" options={options} />
      <CardCvcElement id="card-cvc-element" options={options} />
      <CardExpiryElement id="card-expiry-element" options={options} />
      <BtnGroup className="common_btns">
        <Button
          disable={!stripe || !elements}
          loading={true}
          loadMsg={"pay..."}
          title={"Pay"}
          type="submit"
          className="primary_btn"
        />
        <Button
          title="cancel"
          type="button"
          className="secondry_btn"
          onClick={onCancelHandler}
        />
      </BtnGroup>

      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};
export default CheckoutForm;
