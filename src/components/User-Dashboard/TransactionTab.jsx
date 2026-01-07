import React, { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const BASE_URL = "https://mindsoul-backend-772700176760.asia-south1.run.app";

export default function TransactionsTab() {
  const [transactions, setTransactions] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  /* ---------------- FETCH PAYMENT HISTORY ---------------- */
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch(`${BASE_URL}/api/payment/history/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        console.log("Payment history API:", data);

        // ✅ Handle all API response formats
        if (Array.isArray(data)) {
          setTransactions(data);
        } else if (Array.isArray(data?.payments)) {
          setTransactions(data.payments);
        } else if (data?.success && Array.isArray(data.data)) {
          setTransactions(data.data);
        } else {
          setTransactions([]);
        }
      } catch (error) {
        console.error("Transaction fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  /* ---------------- FILTER LOGIC ---------------- */
  const filteredTransactions =
    activeFilter === "all"
      ? transactions
      : transactions.filter((txn) => txn.status === activeFilter);

  /* ---------------- DATE FORMATTER ---------------- */
  const formatDate = (seconds) => {
    if (!seconds) return "";
    return new Date(seconds * 1000).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="w-full mx-auto px-4 pb-10">
      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6 font-body">
        {["all", "success", "failed"].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-md text-lg font-medium transition
              ${
                activeFilter === filter
                  ? "bg-textDark text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>

      {/* Loader */}
      {loading && (
        <p className="text-center text-gray-500">Loading transactions...</p>
      )}

      {/* Transactions List */}
      <div className="space-y-4 font-body">
        {!loading &&
          filteredTransactions.map((txn) => {
            const isSuccess = txn.status === "success";
            const isFailed = txn.status === "failed";

            return (
              <div
                key={txn.id}
                className="bg-white rounded-2xl shadow-sm border p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
              >
                {/* Left */}
                <div className="flex items-center gap-4 text-body">
                  <div
                    className={`w-12 h-12 flex items-center justify-center rounded-full
                      ${
                        isSuccess
                          ? "bg-emerald-100 text-emerald-600"
                          : isFailed
                          ? "bg-red-100 text-red-600"
                          : "bg-gray-100 text-gray-500"
                      }`}
                  >
                    <ArrowUpRight />
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">
                      Session Payment
                    </h4>

                    <p className="text-sm text-gray-500 ">
                      Counsellor: {txn.counsellorName}
                    </p>

                    <p className="text-xs text-gray-400">
                      {txn.appointmentDate} | {txn.timeSlot}
                    </p>
                  </div>
                </div>

                {/* Right */}
                <div className="flex flex-col sm:items-end gap-1">
                  <span className="text-sm text-gray-500">
                    {formatDate(txn.createdAt?._seconds)}
                  </span>

                  <span
                    className={`font-semibold
                      ${
                        isSuccess
                          ? "text-emerald-600"
                          : isFailed
                          ? "text-red-600"
                          : "text-gray-600"
                      }`}
                  >
                    {isSuccess ? "₹" : "- ₹"}
                    {txn.amountRupees}
                  </span>

                  <span className="text-xs text-gray-400">ID: {txn.id}</span>
                </div>
              </div>
            );
          })}

        {!loading && !filteredTransactions.length && (
          <p className="text-center text-gray-500 py-10">
            No transactions found
          </p>
        )}
      </div>
    </div>
  );
}
