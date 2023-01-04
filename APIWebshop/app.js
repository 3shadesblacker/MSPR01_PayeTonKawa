import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import jsonwebtoken from 'jsonwebtoken';
import * as dotenv from 'dotenv'

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

const baseUri = 'https://615f5fb4f7254d0017068109.mockapi.io/api/v1';

app.post("/login", (req, res) => {
  const { identifiant, password } = req.body;
  if (identifiant === process.env.IDENTIFIANT && password === process.env.PASSWORD) {
    const token = generateAccessToken({ identifiant, password });
    res.send(token);
  } else {
    res.status(500).send("Erreur d'authentification");
  }
})

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


function generateAccessToken(mail) {
  return jsonwebtoken.sign(mail, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1800s' });
}

function authentification(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);
  jsonwebtoken.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}