// Mock Hotels Data
export const hotels = [
  {
    id: '1',
    name: 'Grand Plaza Hotel',
    address: '123 Main Street, Cityville',
    phoneNumber: '(555) 123-4567',
    email: 'info@grandplaza.com',
  },
  {
    id: '2',
    name: 'Royal Suites',
    address: '456 Park Avenue, Townsville',
    phoneNumber: '(555) 987-6543',
    email: 'contact@royalsuites.com',
    distance: 1.2,
  },
  {
    id: '3',
    name: 'Ocean View Resort',
    address: '789 Beach Road, Coastville',
    phoneNumber: '(555) 456-7890',
    email: 'reservations@oceanview.com',
    distance: 2.5,
  },
];

// Mock Inventory Data
export const inventoryItems = [
  {
    id: '1',
    name: 'Chicken Breast',
    category: 'Meat',
    quantity: 25,
    unit: 'kg',
    available: true,
    reorderLevel: 10,
    hotelId: '1',
  },
  {
    id: '2',
    name: 'Salmon Fillet',
    category: 'Seafood',
    quantity: 8,
    unit: 'kg',
    available: true,
    reorderLevel: 5,
    hotelId: '1',
  },
  {
    id: '3',
    name: 'Basmati Rice',
    category: 'Grains',
    quantity: 45,
    unit: 'kg',
    available: true,
    reorderLevel: 20,
    hotelId: '1',
  },
  {
    id: '4',
    name: 'Tomatoes',
    category: 'Vegetables',
    quantity: 3,
    unit: 'kg',
    available: false,
    reorderLevel: 5,
    hotelId: '1',
  },
  {
    id: '5',
    name: 'Olive Oil',
    category: 'Oil & Condiments',
    quantity: 12,
    unit: 'liters',
    available: true,
    reorderLevel: 5,
    hotelId: '1',
  },
  {
    id: '6',
    name: 'Chocolate',
    category: 'Dessert',
    quantity: 2,
    unit: 'kg',
    available: false,
    reorderLevel: 3,
    hotelId: '1',
  },
];

// Mock Order Items
const orderItems1 = [
  {
    id: '101',
    name: 'Grilled Chicken Salad',
    quantity: 2,
    price: 12.99,
    status: 'available',
  },
  {
    id: '102',
    name: 'Seafood Pasta',
    quantity: 1,
    price: 18.99,
    status: 'available',
  },
];

const orderItems2 = [
  {
    id: '201',
    name: 'Chocolate Lava Cake',
    quantity: 3,
    price: 8.99,
    status: 'unavailable',
  },
  {
    id: '202',
    name: 'Vegetable Stir Fry',
    quantity: 1,
    price: 14.99,
    status: 'available',
  },
];

const orderItems3 = [
  {
    id: '301',
    name: 'Grilled Salmon',
    quantity: 2,
    price: 22.99,
    status: 'available',
  },
  {
    id: '302',
    name: 'Tomato Soup',
    quantity: 1,
    price: 7.99,
    status: 'requested',
    notes: 'Requested from Royal Suites',
  },
];

// Mock Orders Data
export const orders = [
  {
    id: '1001',
    tableNumber: 5,
    customerName: 'John Smith',
    items: orderItems1,
    status: 'preparing',
    createdAt: '2023-06-15T10:30:00Z',
    updatedAt: '2023-06-15T10:35:00Z',
    waiterName: 'Michael Brown',
    totalAmount: orderItems1.reduce((sum, item) => sum + (item.price * item.quantity), 0),
  },
  {
    id: '1002',
    tableNumber: 12,
    customerName: 'Sarah Johnson',
    items: orderItems2,
    status: 'pending',
    createdAt: '2023-06-15T11:15:00Z',
    updatedAt: '2023-06-15T11:15:00Z',
    waiterName: 'Emily Clark',
    notes: 'Customer has nut allergy',
    totalAmount: orderItems2.reduce((sum, item) => sum + (item.price * item.quantity), 0),
  },
  {
    id: '1003',
    tableNumber: 8,
    customerName: 'David Williams',
    items: orderItems3,
    status: 'ready',
    createdAt: '2023-06-15T09:45:00Z',
    updatedAt: '2023-06-15T10:20:00Z',
    waiterName: 'Michael Brown',
    totalAmount: orderItems3.reduce((sum, item) => sum + (item.price * item.quantity), 0),
  },
];

// Mock Transfer Requests
export const transferRequests = [
  {
    id: '5001',
    requestingHotelId: '1',
    requestingHotelName: 'Grand Plaza Hotel',
    receivingHotelId: '2',
    receivingHotelName: 'Royal Suites',
    itemId: '4',
    itemName: 'Tomatoes',
    quantity: 2,
    status: 'pending',
    createdAt: '2023-06-15T10:40:00Z',
    orderItemId: '302',
  },
  {
    id: '5002',
    requestingHotelId: '1',
    requestingHotelName: 'Grand Plaza Hotel',
    receivingHotelId: '3',
    receivingHotelName: 'Ocean View Resort',
    itemId: '6',
    itemName: 'Chocolate',
    quantity: 1,
    status: 'accepted',
    createdAt: '2023-06-15T09:30:00Z',
    orderItemId: '201',
  },
];