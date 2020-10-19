import express from 'express';
import dotenv from 'dotenv';
import products from './data/products.js';

dotenv.config();

const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 5000;

const app = express();

app.get('/', (request, response) => {
  response.send('API is running...');
});

app.get('/api/products', (request, response) => {
  response.json(products);
});

app.get('/api/products/:id', (request, response) => {
  const product = products.find(product => product._id === request.params.id);

  response.json(product);
});

app.listen(PORT, console.log(`Server running the ${NODE_ENV} environment on port ${PORT}`));
