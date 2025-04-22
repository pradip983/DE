import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  ClipboardList,
  PackageOpen,
  Building2,
  Repeat,
  LogOut
} from 'lucide-react';
import toast from "react-hot-toast";
import { useAppContext } from '../../context/AppContext';

const SidebarItem = ({ to, icon, label, active }) => {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors duration-150
        ${active
          ? 'bg-blue-100 text-blue-700 shadow-inner'
          : 'text-gray-600 hover:bg-gray-100'}
      `}
    >
      <span className="w-5 h-5">{icon}</span>
      <span>{label}</span>
    </Link>
  );
};

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentHotel } = useAppContext();
  const currentPath = location.pathname;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("user");
    toast.success("Logged Out", { duration: 2000 });
    setTimeout(() => navigate("/login"), 2000);
  };

  const menuItems = [
    { to: '/', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { to: '/orders', icon: <ClipboardList size={20} />, label: 'Orders' },
    { to: '/inventory', icon: <PackageOpen size={20} />, label: 'Inventory' },
    { to: '/hotels', icon: <Building2 size={20} />, label: 'Hotels' },
    { to: '/transfers', icon: <Repeat size={20} />, label: 'Transfers' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col shadow-md">
      {/* Top User Info */}
      <div className="p-6 border-b border-gray-100 bg-gray-50">
        <h2 className="text-xl font-semibold text-gray-800"> <span className="capitalize">{user?.role || 'User'}</span></h2>
        <p className="text-sm text-gray-500">{user?.email || 'user@example.com'}</p>
        {user?.role === "admin" && (
          <p className="text-xs text-gray-400 mt-1">Hotel ID: <span className="font-medium">{user.hotelId}</span></p>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.to}
            to={item.to}
            icon={item.icon}
            label={item.label}
            active={
              item.to === '/'
                ? currentPath === '/'
                : currentPath.startsWith(item.to)
            }
          />
        ))}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-100 bg-gray-50">
        <button
          onClick={handleLogOut}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100 transition-all duration-150 font-medium"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};
