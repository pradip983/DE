import React from 'react';
import { AlertTriangle, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardFooter } from '../UI/Card';
import { Badge } from '../UI/Badge';
import { Button } from '../UI/Button';

export const InventoryStatus = ({ items }) => {
  const navigate = useNavigate();
  
  // Get items that are below reorder level or not available
  const lowStockItems = items.filter(
    (item) => !item.available || item.quantity <= item.reorderLevel
  ).slice(0, 5);

  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Inventory Alerts</h2>
        {lowStockItems.length > 0 && (
          <Badge 
            text={`${lowStockItems.length} items need attention`} 
            variant="warning" 
          />
        )}
      </CardHeader>
      
      <CardContent className="p-0">
        {lowStockItems.length > 0 ? (
          <ul className="divide-y divide-gray-100">
            {lowStockItems.map((item, index) => (
              <li key={index} className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.available ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                      <AlertTriangle size={18} />
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        {item.category} · {item.quantity} {item.unit}
                      </p>
                    </div>
                  </div>
                  <div>
                    {item.available ? (
                      <Badge text="Low Stock" variant="warning" />
                    ) : (
                      <Badge text="Out of Stock" variant="danger" />
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-6 text-center">
            <p className="text-gray-500">All inventory items are at healthy levels</p>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-center">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/inventory')}
          icon={<ChevronRight size={16} />}
        >
          View Inventory
        </Button>
      </CardFooter>
    </Card>
  );
};


