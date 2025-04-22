import React from 'react';
import { Clock, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardFooter } from '../UI/Card';
import { Badge } from '../UI/Badge';
import { Button } from '../UI/Button';

const getStatusBadge = (status) => {
  const statusMap = {
    pending: { variant: 'warning', label: 'Pending' },
    preparing: { variant: 'primary', label: 'Preparing' },
    ready: { variant: 'success', label: 'Ready' },
    delivered: { variant: 'info', label: 'Delivered' },
    cancelled: { variant: 'danger', label: 'Cancelled' },
  };

  const fallback = { variant: 'secondary', label: 'Unknown' };
  const { variant, label } = statusMap[status] || fallback;
  return <Badge text={label} variant={variant} />;
};

const formatTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export const RecentOrders = ({ orders = [] }) => {
  const navigate = useNavigate();

  const sortedOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Recent Orders</h2>
        <span className="text-sm text-gray-500 flex items-center">
          <Clock size={16} className="mr-1" />
          Today
        </span>
      </CardHeader>

      <CardContent className="p-0">
        {sortedOrders.length > 0 ? (
          <ul className="divide-y divide-gray-100">
            {sortedOrders.map((order) => (
              <li key={order._id || order.id} className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-medium text-gray-700">
                      {order.tableNumber || 'T'}
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-gray-900">{order.customerName || 'Customer'}</p>
                      <p className="text-sm text-gray-500">
                       {order.itemName || 'N/A'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {getStatusBadge(order.status)}
                    <p className="ml-3 text-sm text-gray-500">{formatTime(order.createdAt)}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="px-6 py-4 text-center text-gray-500">No recent orders</div>
        )}
      </CardContent>

      <CardFooter className="flex justify-center">
        <Button
          variant="ghost"
          onClick={() => navigate('/orders')}
          icon={<ChevronRight size={16} />}
        >
          View All Orders
        </Button>
      </CardFooter>
    </Card>
  );
};
