import React from 'react';
import { ArrowLeftRight, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardFooter } from '../UI/Card';
import { Badge } from '../UI/Badge';
import { Button } from '../UI/Button';

// Helper to get status badge
const getStatusBadge = (status) => {
  const statusMap = {
    pending: { variant: 'warning', label: 'Pending' },
    accepted: { variant: 'primary', label: 'Accepted' },
    rejected: { variant: 'danger', label: 'Rejected' },
    fulfilled: { variant: 'success', label: 'Fulfilled' }, // Add fulfilled status
    completed: { variant: 'success', label: 'Completed' },
  };

  const { variant, label } = statusMap[status] || {
    variant: 'secondary',
    label: status || 'Unknown',
  };
  return <Badge text={label} variant={variant} />;
};

export const TransferRequests = ({ transfers = [] }) => {
  const navigate = useNavigate();

  // Ensure transfers is always an array
  const transferList = Array.isArray(transfers) ? transfers : [];

  const pendingTransfers = transferList
    .filter(
      (transfer) => transfer.status === 'pending' || transfer.status === 'fulfilled'
    )
    .slice(0, 3);

  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Transfer Requests</h2>
        {pendingTransfers.length > 0 && (
          <Badge
            text={`${pendingTransfers.length} active transfers`}
            variant="info"
          />
        )}
      </CardHeader>

      <CardContent className="p-0">
        {pendingTransfers.length > 0 ? (
          <ul className="divide-y divide-gray-100">
            {pendingTransfers.map((transfer) => (
              <li
                key={transfer._id || transfer.id}
                className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700">
                      <ArrowLeftRight size={18} />
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-gray-900">{transfer.itemName}</p>
                      <p className="text-sm text-gray-500">
                        {transfer.requestingHotelName || 'Unknown Hotel'} ·{' '}
                        {transfer.quantity} {transfer.unit || 'units'}
                      </p>
                    </div>
                  </div>
                  <div>{getStatusBadge(transfer.status)}</div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-6 text-center">
            <p className="text-gray-500">No active transfer requests</p>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-center">
        <Button
          variant="ghost"
          onClick={() => navigate('/transfers')}
          icon={<ChevronRight size={16} />}
        >
          View All Transfers
        </Button>
      </CardFooter>
    </Card>
  );
};
