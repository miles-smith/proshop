import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

import productRoutes from './routes/productRoutes.js';

dotenv.config();
connectDB();

const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 5000;

const app = express();

app.get('/', (request, response) => {
  response.send('API is running...');
});

app.use('/api/products', productRoutes);

app.listen(PORT, console.log(`Server running the ${NODE_ENV} environment on port ${PORT}`));
