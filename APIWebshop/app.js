import express from 'express';
import fetch from 'node-fetch';
const app = express();


const baseUri = 'https://615f5fb4f7254d0017068109.mockapi.io/api/v1';

app.get('/', (req, res) => {
  res.send('Bienvenue sur l\'API de PayeTonKawa !');
});

app.get('/products', async (req, res) => {
  try {
    const response = await fetch(`${baseUri}/products`);
    const products = await response.json();
    console.log(products);
    res.json(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/stocks', async (req, res) => {
  try {
    const response = await fetch(`${baseUri}/stocks`);
    const stocks = await response.json();
    console.log(stocks);
    res.json(stocks);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/orders', async (req, res) => {
  try {
    const response = await fetch(`${baseUri}/orders`);
    const orders = await response.json();
    console.log(orders);
    res.json(orders);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(3000, () => {
  console.log('API listening on port 3000');
});
