import React, { useState } from 'react';
import { Building2, MapPin, Phone, Mail, Search, Plus } from 'lucide-react';
import { Card, CardContent } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Input } from '../components/UI/Input';
import { useAppContext } from '../context/AppContext';
import { ConnectHotelModal } from './ConnectHotelModal';
import { useEffect} from "react";
export const Hotels = () => {
  const { hotels, fetchhotels, fetchOrders } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
   const [user, setUser] = React.useState(null);

  // Filter hotels based on search term
  const filteredHotels = hotels.filter((hotel) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      hotel.name.toLowerCase().includes(searchLower) ||
      hotel.address.toLowerCase().includes(searchLower) ||
      hotel.email.toLowerCase().includes(searchLower)
    );
  });

   useEffect(() => {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        
      } else {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
         
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
      }
    }, []);

  return (

    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Partner Hotels</h1>
          <p className="text-gray-500 mt-1">Manage collaborating hotels for food transfers</p>
        </div>
        <Button className={`${user?.role == 'admin' ? "visible" : "hidden"}`} onClick={() => setShowModal(true)} icon={<Plus size={18} />}>Add Hotel</Button>
      </div>

      {/* Search */}
      <div className="flex items-center relative max-w-md">
        <Search size={20} className="absolute left-3 text-gray-400" />
        <Input
          placeholder="Search hotels..."
          className="pl-10"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Hotels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHotels.map((hotel) => (
          <Card key={hotel._id} className="transition-transform duration-150 hover:shadow-lg hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <Building2 size={24} />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">{hotel.name}</h3>
                  {hotel.distance && (
                    <p className="text-sm text-gray-500">{hotel.distance} miles away</p>
                  )}
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-start text-gray-600">
                  <MapPin size={18} className="mr-2 mt-0.5 text-gray-400 flex-shrink-0" />
                  <p className="text-sm">{hotel.address}</p>
                </div>

                <div className="flex items-center text-gray-600">
                  <Phone size={18} className="mr-2 text-gray-400 flex-shrink-0" />
                  <p className="text-sm">{hotel.phoneNumber}</p>
                </div>

                <div className="flex items-center text-gray-600">
                  <Mail size={18} className="mr-2 text-gray-400 flex-shrink-0" />
                  <p className="text-sm">{hotel.email}</p>
                </div>
              </div>

              <div className="flex space-x-2 mt-4">
                <Button variant="outline" fullWidth>Contact</Button>

              </div>
            </CardContent>
          </Card>
        ))}


        {!filteredHotels.length && (
          <div className="flex items-center justify-center w-[70vw] h-full">
            <p className="text-gray-500">No hotels found</p>
          </div>
        )}
  


      </div>

      {/* Connect Hotel Modal */}
      {/* Add the modal for connecting a hotel */}
      <ConnectHotelModal isOpen={showModal} fetchhotels={fetchhotels} fetchOrders={fetchOrders} onClose={() => setShowModal(false)} />
    </div>
  );
};
