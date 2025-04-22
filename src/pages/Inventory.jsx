import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, AlertTriangle } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Input } from '../components/UI/Input';
import { Badge } from '../components/UI/Badge';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { addInventoryItem, deleteInventoryItem, getinventoryItems } from '../services/userServices';

export const Inventory = () => {
  const { inventory } = useAppContext();
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: '', category: '', quantity: '', unit: '', reorderLevel: '' });
  const [showPopup, setShowPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  const hotelId = JSON.parse(localStorage.getItem("user")).hotelId;

  const categories = ['all', ...Array.from(new Set(items.map((item) => item.category)))];

  const loadData = async () => {
    const data = await getinventoryItems(hotelId);
    setItems(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAdd = async () => {
    try {
      await addInventoryItem({ ...form, hotelId });
      toast.success("Item added");
      setForm({ name: '', category: '', quantity: '', unit: '', reorderLevel: '' });
      setShowPopup(false);
      loadData();
    } catch (err) {
      toast.error("Failed to add item");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteInventoryItem(id);
      toast.success("Item deleted");
      setItems((prevItems) => prevItems.filter(item => item._id !== id));
    } catch {
      toast.error("Delete failed");
    }
  };

  const filteredItems = items.filter((item) => {
    if (categoryFilter !== 'all' && item.category !== categoryFilter) return false;

    if (availabilityFilter === 'available' && !item.available) return false;
    if (availabilityFilter === 'unavailable' && item.available) return false;
    if (availabilityFilter === 'low' && item.quantity > item.reorderLevel) return false;

    const searchLower = searchTerm.toLowerCase();
    return (
      item.name.toLowerCase().includes(searchLower) ||
      item.category.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory</h1>
          <p className="text-gray-500 mt-1">Manage food items and track availability</p>
        </div>
        <Button onClick={() => setShowPopup(true)} icon={<Plus size={18} />}>Add Item</Button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex-1 flex items-center relative">
          <Search size={20} className="absolute left-3 text-gray-400" />
          <Input
            placeholder="Search inventory items..."
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
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full md:w-48">
          <select
            className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value)}
          >
            <option value="all">All Items</option>
            <option value="available">Available</option>
            <option value="unavailable">Out of Stock</option>
            <option value="low">Low Stock</option>
          </select>
        </div>
      </div>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-800">
            {categoryFilter === 'all' ? 'All Items' : categoryFilter} ({filteredItems.length})
          </h2>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Item Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {(!item.available || item.quantity <= item.reorderLevel) && (
                            <AlertTriangle
                              size={16}
                              className={`mr-2 ${!item.available ? 'text-red-500' : 'text-yellow-500'}`}
                            />
                          )}
                          <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge text={item.category} variant="info" />
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {item.quantity} {item.unit}
                        </div>
                        {item.quantity <= item.reorderLevel && item.available && (
                          <div className="text-xs text-yellow-600">
                            Below reorder level ({item.reorderLevel})
                          </div>
                        )}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.available ? (
                          <Badge text="Available" variant="success" />
                        ) : (
                          <Badge text="Out of Stock" variant="danger" />
                        )}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <Button onClick={() => handleDelete(item._id)} size="sm" variant="outline">
                          DELETE
                        </Button>
                      
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                      No items match your filters
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {showPopup && (
        <div className="fixed  inset-0 bg-black bg-opacity-40 flex items-center z-50 justify-center">
          <div className="bg-white p-6 rounded shadow-md space-y-4 w-[300px]">
            <h3 className="text-lg font-semibold">Add Inventory Item</h3>
            <input className="w-full p-2 border rounded" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            <input className="w-full p-2 border rounded" placeholder="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
            <input className="w-full p-2 border rounded" placeholder="Quantity" type="number" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} />
            <input className="w-full p-2 border rounded" placeholder="Unit" value={form.unit} onChange={e => setForm({ ...form, unit: e.target.value })} />
            <input className="w-full p-2 border rounded" placeholder="Reorder Level" type="number" value={form.reorderLevel} onChange={e => setForm({ ...form, reorderLevel: e.target.value })} />
            <div className="flex justify-between">
              <button className="bg-green-500 text-white px-3 py-1 rounded" onClick={handleAdd}>Add</button>
              <button className="bg-gray-400 text-white px-3 py-1 rounded" onClick={() => setShowPopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
