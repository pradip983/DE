import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';


import ordersRouter from './routes/orders.js';
import inventoryRouter from './routes/inventory.js';
import hotelsRouter from './routes/hotels.js';
import transfersRouter from './routes/transfers.js';
import userRouter from './routes/user.js';

dotenv.config();



const app = express();

// CORS config
app.use(cors({
  origin: 'https://hotel-invsys.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.options('*', cors());

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://vasanpradip06:vasan51645@cluster0.mdlqm.mongodb.net/hotel-food-management')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB error:', err));

// Routes
app.use('/api', (req, res, next) => {
  console.log(`index file execute`);
  next();
});
app.use('/api/orders', ordersRouter);
app.use('/api/inventory', inventoryRouter);
app.use('/api/hotels', hotelsRouter);
app.use('/api/transfers', transfersRouter);
app.use('/api/user', userRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// ✅ Export handler for Vercel
export default app;
