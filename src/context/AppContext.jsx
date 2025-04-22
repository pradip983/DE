import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  gethotels,
  getorders,
  getinventoryItems,
  gettransferRequests,
} from '../services/userServices';

import {
  orders as initialOrders,
  inventoryItems as initialInventory,
  hotels as initialHotels,
  transferRequests as initialTransfers,
} from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [hotelId, setHotelId] = useState(user?.hotelId || null);

  const [currentHotel] = useState(initialHotels[0]); // Optional - could remove if unused
  const [orders, setOrders] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [transferRequests, setTransferRequests] = useState([]);

  // Update hotelId whenever user changes
  useEffect(() => {
    if (user?.hotelId) {
      setHotelId(user.hotelId);
    } else {
      setHotelId(null);
    }
  }, [user]);

  // Fetch data when hotelId is available
  useEffect(() => {
    if (!hotelId) return;
    fetchOrders();
    fetchhotels();
    fetchInventoryItems();
    fetchTransferRequests();
  }, [hotelId]);

  const fetchOrders = async () => {
    try {
      const response = await getorders(hotelId);
      setOrders(response || []);
    } catch (error) {
      console.error("❌ Error fetching orders:", error);
    }
  };

  const fetchhotels = async () => {
    try {
      const response = await gethotels(hotelId);
      setHotels(response || []);
    } catch (error) {
      console.error("❌ Error fetching hotels:", error);
    }
  };

  const fetchInventoryItems = async () => {
    try {
      const response = await getinventoryItems(hotelId);
      setInventory(response || []);
    } catch (error) {
      console.error("❌ Error fetching inventory:", error);
    }
  };

  const fetchTransferRequests = async () => {
    try {
      const response = await gettransferRequests(hotelId);
      setTransferRequests(response || []);
    } catch (error) {
      console.error("❌ Error fetching transfer requests:", error);
    }
  };

  const addOrder = (order) => {
    setOrders((prevOrders) => [...prevOrders, order]);
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId
          ? { ...order, status, updatedAt: new Date().toISOString() }
          : order
      )
    );
  };

  const updateInventoryItem = (updatedItem) => {
    setInventory((prevInventory) =>
      prevInventory.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      )
    );
  };

  const createTransferRequest = (request) => {
    const newRequest = {
      ...request,
      id: `TR${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setTransferRequests((prev) => [...prev, newRequest]);
  };

  const updateTransferRequest = (requestId, status) => {
    setTransferRequests((prev) =>
      prev.map((request) =>
        request.id === requestId ? { ...request, status } : request
      )
    );

    if (status === 'completed') {
      const completedRequest = transferRequests.find(r => r.id === requestId);
      if (completedRequest) {
        setInventory((prevInventory) =>
          prevInventory.map((item) => {
            if (item.id === completedRequest.itemId) {
              return {
                ...item,
                quantity: item.quantity + completedRequest.quantity,
                available: true,
              };
            }
            return item;
          })
        );
      }
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        hotelId,
        setHotelId,
        currentHotel,
        orders,
        inventory,
        hotels,
        transferRequests,
        addOrder,
        updateOrderStatus,
        updateInventoryItem,
        createTransferRequest,
        updateTransferRequest,
        fetchOrders,
        fetchhotels,
        fetchInventoryItems,
        fetchTransferRequests,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
