import { useEffect, useState } from "react";
import axios from "axios";
import { FiX } from "react-icons/fi";

const BASE_URL =
  "https://mindsoul-backend-772700176760.asia-south1.run.app/api";

export default function PaymentModal({
  counsellor,
  counsellorId,
  selectedDay,
  selectedSlot,
  onClose,
  onSuccess,
}) {
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(false);

  const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

  /* ---------------------------------
     Fetch Session Price
  --------------------------------- */
  useEffect(() => {
    async function fetchPrice() {
      try {
        const res = await axios.get(
          `${BASE_URL}/counsellor/${counsellorId}/session-price`
        );
        setPrice(res.data.price);
      } catch (err) {
        console.error("Price fetch failed", err);
      }
    }
    fetchPrice();
  }, [counsellorId]);

  /* ---------------------------------
     Razorpay Payment
  --------------------------------- */
  async function handlePayment() {
    try {
      setLoading(true);

      const token = localStorage.getItem("token"); // USER TOKEN

      // 1️⃣ Create order
      const orderRes = await axios.post(
        `${BASE_URL}/payment/create-order`,
        { amount: price },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { order } = orderRes.data;

      const options = {
        key: razorpayKey,
        amount: order.amount,
        currency: "INR",
        name: "MindSoul Wellness",
        description: "Counselling Session",
        order_id: order.id,

        handler: async function (response) {
          // 2️⃣ Verify payment
          const verifyRes = await axios.post(
            `${BASE_URL}/payment/verify-payment`,
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (verifyRes.data.success) {
            // 3️⃣ Book appointment AFTER payment
            const bookRes = await axios.post(
              `${BASE_URL}/appointment`,
              {
                counsellorId,
                date: selectedDay.fullDate,
                timeSlot: `${selectedSlot.startTime}-${selectedSlot.endTime}`,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            onSuccess(bookRes.data.appointment);
            onClose();
          }
        },

        theme: { color: "#4f46e5" },
      };

      new window.Razorpay(options).open();
    } catch (err) {
      console.error("Payment error", err);
      alert("Payment failed");
    } finally {
      setLoading(false);
    }
  }

  /* ---------------------------------
     UI
  --------------------------------- */
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999]">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4">
          <FiX />
        </button>

        <h2 className="text-xl font-semibold mb-4">Confirm & Pay</h2>

        <div className="space-y-2 text-sm">
          <p>
            <strong>Counsellor:</strong> {counsellor.firstName}{" "}
            {counsellor.lastName}
          </p>
          <p>
            <strong>Date:</strong> {selectedDay.date}
          </p>
          <p>
            <strong>Time:</strong> {selectedSlot.startTime} -{" "}
            {selectedSlot.endTime}
          </p>
        </div>

        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <p className="text-lg font-semibold">
            Session Price: ₹{price ?? "..."}
          </p>
        </div>

        <button
          onClick={handlePayment}
          disabled={!price || loading}
          className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg"
        >
          {loading ? "Processing..." : `Pay ₹${price}`}
        </button>
      </div>
    </div>
  );
}
