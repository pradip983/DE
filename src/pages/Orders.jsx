import React, { useState, useEffect } from 'react';
import { PlusCircle, Filter, Search, X } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Input } from '../components/UI/Input';
import { Badge } from '../components/UI/Badge';
import { useAppContext } from '../context/AppContext';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";

export const Orders = () => {
  const { orders = [], updateOrderStatus, fetchOrders, fetchTransferRequests } = useAppContext(); // safe default
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [hotelId, setHotelId] = useState(null);
 const [user, setUser] = useState();
  const [newOrder, setNewOrder] = useState({
    customerName: '',
    itemName: '',
    quantity: 1,
  });

  // Get hotelId from localStorage and fetch orders
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.hotelId) {
      setUser(user);
      setHotelId(user.hotelId);

       // ✅ fetch orders when hotelId is ready
    }
  }, []);

  const handleCreateOrder = async () => {
    if (!hotelId) return;

    try {
      await axios.post('https://de-6not.vercel.app/api/orders/create', {
        ...newOrder,
        hotelId,
        customerName: user?.hotelName

      });
      setShowModal(false);
      setNewOrder({ customerName: '', itemName: '', quantity: 1 });
      fetchOrders(); // refresh orders
    } catch (error) {
      console.error('Order creation failed:', error);
    }
  };

  const handleDeleteOrder = async (orderId) => {

    console.log(orderId);
    if (!orderId) return;
    try {
      
     const res =  await axios.delete(`https://de-6not.vercel.app/api/orders/delete/${orderId}`);
             console.log(res.data);
      fetchOrders(); // refresh orders
     
      toast.success("Order deleted");
      
    } catch (err) {
      console.error("Failed to delete order:", err);
      toast.error("Error deleting order");
    }
  };

  const handleFulfill = async (orderId) => {
    if (!orderId) return;
    if (!hotelId) return;
    console.log('Hotel ID:', hotelId);
    try {
      const response = await axios.post(`https://de-6not.vercel.app/api/orders/${orderId}/fulfill`,{hotelId});
      console.log(response.data);
      toast.success('Order fulfilled successfully');
      fetchOrders(); 
      fetchTransferRequests();
    } catch (error) {
      console.error('Order fulfillment failed:', error);
    }
  }

  const filteredOrders = (orders || [])
    .filter((order) => {
      if (statusFilter !== 'all' && order.status !== statusFilter) return false;

      const searchLower = searchTerm.toLowerCase();
      return (
        order.customerName?.toLowerCase().includes(searchLower) ||
        order._id?.toLowerCase().includes(searchLower) ||
        order.itemName?.toLowerCase().includes(searchLower) ||
        order.hotelId?.toLowerCase().includes(searchLower) ||
        order.fulfilledBy?.toLowerCase().includes(searchLower)
      );
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: { variant: 'warning', label: 'Pending' },
      preparing: { variant: 'primary', label: 'Preparing' },
      ready: { variant: 'success', label: 'Ready' },
      delivered: { variant: 'info', label: 'Delivered' },
      cancelled: { variant: 'danger', label: 'Cancelled' },
      fulfilled: { variant: 'success', label: 'Fulfilled' },
      rejected: { variant: 'danger', label: 'Rejected' },
    };
    const { variant, label } = statusMap[status] || { variant: 'default', label: status };
    return <Badge text={label} variant={variant} />;
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString([], {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

 

  const handleStatusChange = (orderId, status) => {
    updateOrderStatus(orderId, status);
  };

  const statusOptions = [
    { value: 'all', label: 'All Orders' },
    { value: 'pending', label: 'Pending' },
    { value: 'preparing', label: 'Preparing' },
    { value: 'ready', label: 'Ready' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'fulfilled', label: 'Fulfilled' },
    { value: 'rejected', label: 'Rejected' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-500 mt-1">Manage and track customer orders</p>
        </div>
        <Button icon={<PlusCircle size={18} />} onClick={() => setShowModal(true)}>
          New Order
        </Button>
      </div>

      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex-1 flex items-center relative">
          <Search size={20} className="absolute left-3 text-gray-400" />
          <Input
            placeholder="Search orders by customer, item, hotel..."
            className="pl-10"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="w-full md:w-48 flex items-center">
          <Filter size={20} className="mr-2 text-gray-400" />
          <select
            className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-800">
            {statusFilter === 'all' ? 'All Orders' : `${statusFilter} Orders`} ({filteredOrders.length})
          </h2>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order Details</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-lg font-medium text-gray-900"> {order.customerName}</div>
                        <div className="text-xs text-gray-500">Hotel: {order.hotelId}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{order.itemName}</div>
                        <div className="text-sm text-gray-500">Qty: {order.quantity}</div>
                      </td>
                      <td className="px-6 py-4">{getStatusBadge(order.status)}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{order.createdAt ? formatDateTime(order.createdAt) : 'N/A'}</td>
                      <td className="px-6 py-4 text-sm">
                      {hotelId === order.hotelId && (
                        <Button
                          variant="link"
                          className="text-blue-600 hover:text-blue-800"
                          onClick={() => handleDeleteOrder(order._id)}
                          disabled={order.status === 'fulfilled'}
                        >
                         Delete
                        </Button>
                      )}
                     
                      {hotelId !== order.hotelId && (
                        <Button
                          variant="link"
                          className="text-green-600 hover:text-green-800"
                          onClick={() => handleFulfill(order._id)}
                          disabled={order.status === 'fulfilled'}
                        >
                          Fulfill
                        </Button>
                      )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                      No orders match your filters
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button className="absolute top-3 right-3 text-gray-500" onClick={() => setShowModal(false)}>
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold mb-4">New Order</h2>
            <div className="space-y-4">
             
              <Input
                placeholder="Item Name"
                value={newOrder.itemName}
                onChange={(e) => setNewOrder({ ...newOrder, itemName: e.target.value })}
              />
              <Input
                type="number"
                min="1"
                placeholder="Quantity"
                value={newOrder.quantity}
                onChange={(e) => setNewOrder({ ...newOrder, quantity: parseInt(e.target.value) })}
              />
              <Button fullWidth onClick={handleCreateOrder}>
                Submit Order
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
