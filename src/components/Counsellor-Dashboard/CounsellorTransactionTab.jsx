import React, { useEffect, useState } from "react";
import { ArrowDownLeft } from "lucide-react";

const BASE_URL = "https://mindsoul-backend-772700176760.asia-south1.run.app";

export default function CounsellorTransactionsTab() {
  const [transactions, setTransactions] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  /* ---------------- FETCH COUNSELLOR PAYMENT HISTORY ---------------- */
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${BASE_URL}/api/payment/history/counsellor`, {
          method: "GET",
          credentials: "include", // ✅ SEND COOKIE
        });

        const data = await res.json();
        // console.log("Counsellor payment history API:", data);

        if (data?.success && Array.isArray(data.payments)) {
          setTransactions(data.payments);
        } else {
          setTransactions([]);
        }
      } catch (error) {
        console.error("Counsellor transaction fetch error:", error);
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
            className={`px-4 py-2 rounded-sm text-md font-medium transition font-body
              ${
                activeFilter === filter
                  ? "bg-primary text-white"
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

      {/* Transactions */}
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
                <div className="flex items-center gap-4">
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
                    <ArrowDownLeft />
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Session Payment Received
                    </h4>

                    <p className="text-sm text-gray-500">
                      From: {txn.userName || txn.userEmail}
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
                    {isSuccess ? "+ ₹" : "- ₹"}
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
