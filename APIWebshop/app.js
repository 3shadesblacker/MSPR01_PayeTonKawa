import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
const app = express();
app.use(cors());

const baseUri = 'https://615f5fb4f7254d0017068109.mockapi.io/api/v1';

app.get('/', (req, res) => {
  res.send('Bienvenue sur l\'API de PayeTonKawa !');
});

app.get('/customers/:id', async (req, res) => {
  try {
    const response = await fetch(`${baseUri}/customers/${req.params.id}`);
    const customer = await response.json();
    res.json(customer);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/customers/:id/orders', async (req, res) => {
  try {
    const response = await fetch(`${baseUri}/customers/${req.params.id}/orders`);
    const orders = await response.json();
    res.json(orders);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/customers/:id/orders/:id', async (req, res) => {
  try {
    const response = await fetch(`${baseUri}/customers/${req.params.id}/orders/${req.params.id}`);
    const order = await response.json();
    res.json(order);
  } catch (error) {
    res.status(500).send
  }
});

app.get('/products', async (req, res) => {
  try {
    const response = await fetch(`${baseUri}/products`);
    const products = await response.json();
    res.json(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/products/:id', async (req, res) => {
  try {
    const response = await fetch(`${baseUri}/products/${req.params.id}`);
    const product = await response.json();
    res.json(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(3000, () => {
  console.log('API listening on port 3000');
});
