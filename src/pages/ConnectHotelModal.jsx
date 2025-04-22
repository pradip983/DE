import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export const ConnectHotelModal = ({ isOpen, onClose, fetchhotels, fetchOrders }) => {
  const [ourHotelId, setOurHotelId] = useState("");
  const [otherHotelId, setOtherHotelId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleConnect = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/hotels/connect", {
        hotelId: ourHotelId,
        connectWithId: otherHotelId,
      });
       toast.success("Hotels connected successfully!", {duration: 2000});
       fetchhotels();
       fetchOrders();
      onClose();
    } catch (err) {
      console.error("Error connecting hotels", err);
       toast.error("Failed to connect hotels");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-md">
        <h2 className="text-xl font-bold mb-4">Connect Hotels</h2>
        <form onSubmit={handleConnect} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Your Hotel ID</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={ourHotelId}
              onChange={(e) => setOurHotelId(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Hotel ID to Connect</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={otherHotelId}
              onChange={(e) => setOtherHotelId(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {loading ? "Connecting..." : "Connect"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
