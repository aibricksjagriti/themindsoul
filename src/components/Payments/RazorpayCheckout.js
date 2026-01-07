import { RAZORPAY_KEY_ID } from "../../config/razorpay";
import { verifyRazorpayPayment } from "../../api/paymentApi";

export const openRazorpayCheckout = ({
  order,
  appointmentId,
  onSuccess,
  onError,
}) => {
  if (!window.Razorpay) {
    alert("Razorpay SDK not loaded");
    return;
  }

  const options = {
    key: RAZORPAY_KEY_ID,
    order_id: order.id,
    amount: order.amount,
    currency: order.currency,
    name: "MINDSOUL",
    description: "Counselling Session",

    handler: async (response) => {
      try {
        await verifyRazorpayPayment({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          appointmentId,
        });

        onSuccess();
      } catch (err) {
        console.error(err);
        onError(err);
      }
    },

    theme: { color: "#4F46E5" },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};
