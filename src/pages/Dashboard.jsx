import React from 'react';
import { ClipboardList, PackageOpen, Building2 } from 'lucide-react';
import { StatusCard } from '../components/Dashboard/StatusCard';
import { RecentOrders } from '../components/Dashboard/RecentOrders';
import { InventoryStatus } from '../components/Dashboard/InventoryStatus';
import { TransferRequests } from '../components/Dashboard/TransferRequests';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const Dashboard = () => {
  const navigate = useNavigate();
  const { orders, inventory, hotels, transferRequests, fetchTransferRequests, fetchInventoryItems, fetchhotels, fetchOrders } = useAppContext();
  const [user, setUser] = React.useState(null);

  // Calculate dashboard metrics
  const totalOrders = orders?.length || 0;
  const pendingOrders = orders?.filter(order => order.status === 'pending' || order.status === 'preparing').length || 0;
  const lowStockItems = inventory?.filter(item => !item.available || item.quantity <= item.reorderLevel).length || 0;
  const activeTransfers = transferRequests?.filter(transfer => transfer.status === 'pending' || transfer.status === 'accepted').length || 0;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
    } else {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);

      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, [navigate]);

  


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Overview of your hotel's food management system</p>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatusCard
          title="Total Orders"
          value={totalOrders}
          icon={<ClipboardList size={24} />}
          change="↑ 12% from last week"
          changeType="positive"
        />

        <StatusCard
          title="Pending Orders"
          value={pendingOrders}
          icon={<ClipboardList size={24} />}
          change={pendingOrders > 5 ? "Needs attention" : "All under control"}
          changeType={pendingOrders > 5 ? "negative" : "positive"}
        />

        <StatusCard
          title="Low Stock Items"
          value={lowStockItems}
          icon={<PackageOpen size={24} />}
          change={lowStockItems > 0 ? `${lowStockItems} items need restock` : "Inventory healthy"}
          changeType={lowStockItems > 0 ? "negative" : "positive"}
        />

        <StatusCard
          title="Partner Hotels"
          value={(hotels?.length || 0)}
          icon={<Building2 size={24} />}
        />
      </div>

      {/* Order and Inventory Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentOrders orders={orders} />
        <InventoryStatus items={inventory} />
      </div>

      {/* Transfers */}
      <div>
        <TransferRequests transfers={transferRequests} />
      </div>
    </div>
  );
};
