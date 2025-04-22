import React, { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

export const Header = ({ toggleSidebar }) => {
  const { currentHotel } = useAppContext();
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

  const getInitials = (name) => {
    if (!name) return "U";
    return name.charAt(0).toUpperCase();
  };

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center">
        <button
          className="lg:hidden mr-3 p-2 rounded-md hover:bg-gray-100"
          onClick={toggleSidebar}
        >
          <Menu size={20} />
        </button>
        <h1 className="text-xl font-bold text-blue-700 tracking-tight">
          {user?.hotelName || 'Hotel'}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-semibold">
            {getInitials(user?.FirstName)}
          </div>
          <span className="text-sm font-medium text-gray-800">
            {user?.FirstName || 'User'}
          </span>
        </div>
      </div>
    </header>
  );
};
