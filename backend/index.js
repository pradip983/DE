import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Import routes
import ordersRouter from './routes/orders.js';
import inventoryRouter from './routes/inventory.js';
import hotelsRouter from './routes/hotels.js';
import transfersRouter from './routes/transfers.js';
import userRouter from './routes/user.js';

dotenv.config();

const app = express();

// CORS Configuration
app.use(cors({
  origin: 'https://hotel-invsys.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.options('*', cors());

// Middleware
app.use(express.json());

// Routes
app.use('/api', (req, res, next) => {
  console.log(`🔄 API request received`);
  next();
});
app.use('/api/orders', ordersRouter);
app.use('/api/inventory', inventoryRouter);
app.use('/api/hotels', hotelsRouter);
app.use('/api/transfers', transfersRouter);
app.use('/api/user', userRouter);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://vasanpradip06:vasan51645@cluster0.mdlqm.mongodb.net/hotel-food-management', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB Atlas');

  // Start server only after DB connection is successful
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err.message);
});

// ✅ Export for serverless environments (e.g., Vercel)
export default app;
