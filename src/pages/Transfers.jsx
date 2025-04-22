import React, { useState } from 'react';
import { ArrowLeftRight, Search, Filter } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Input } from '../components/UI/Input';
import { Badge } from '../components/UI/Badge';
import { useAppContext } from '../context/AppContext';

export const Transfers = () => {
  const { orders, currentHotelId, updateOrderStatus,transferRequests  } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // const transfers = orders.filter(order =>
  //   (order.hotelId === currentHotelId && order.fulfilledBy && order.fulfilledBy !== currentHotelId) ||
  //   (order.fulfilledBy === currentHotelId)
  // );

  const filteredTransfers = transferRequests
    .filter((order) => {
      if (statusFilter !== 'all' && order.status !== statusFilter) return false;
      const searchLower = searchTerm.toLowerCase();
      return (
        order.itemName.toLowerCase().includes(searchLower) ||
        (order.customerName && order.customerName.toLowerCase().includes(searchLower))
      );
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: { variant: 'warning', label: 'Pending' },
      fulfilled: { variant: 'success', label: 'Fulfilled' },
      rejected: { variant: 'danger', label: 'Rejected' },
    };
    const { variant, label } = statusMap[status] || { variant: 'secondary', label: status };
    return <Badge text={label} variant={variant} />;
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString([], {
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  const statusOptions = [
    { value: 'all', label: 'All Transfers' },
    { value: 'pending', label: 'Pending' },
    { value: 'fulfilled', label: 'Fulfilled' },
    { value: 'rejected', label: 'Rejected' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transfers</h1>
          <p className="text-gray-500 mt-1">Orders fulfilled by or for your hotel</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex-1 flex items-center relative">
          <Search size={20} className="absolute left-3 text-gray-400" />
          <Input
            placeholder="Search by item or customer..."
            className="pl-10"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="w-full md:w-48 flex items-center">
          <Filter size={20} className="mr-2 text-gray-400" />
          <select
            className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-800">
            {statusFilter === 'all' ? 'All Transfers' : `${statusFilter} Transfers`} ({filteredTransfers.length})
          </h2>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hotel Info</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requested</th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransfers.length > 0 ? (
                  filteredTransfers.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-600">
                            <ArrowLeftRight size={20} />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{order.itemName}</div>
                            <div className="text-sm text-gray-500">Quantity: {order.quantity}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div>Requested By: {order.requestingHotelName}</div>
                        <div>Fulfilled By: {order.fulfillingHotelName || 'Pending'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(order.status)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDateTime(order.createdAt)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                      No transfers found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
