import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import jsonwebtoken from 'jsonwebtoken';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' assert { type: "json" };
import * as dotenv from 'dotenv'
import cryptoJs from 'crypto-js'

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
dotenv.config();

const baseUri = 'https://615f5fb4f7254d0017068109.mockapi.io/api/v1';

app.post("/login", (req, res) => {
  const { identifiant, password } = req.body;
  if (identifiant === process.env.IDENTIFIANT && password === process.env.PASSWORD) {
    const token = generateAccessToken( identifiant + password );
    res.send(encrypt(token));
  } else {
    res.status(403).send("Identifiant ou mot de passe incorrect");
  }
})

app.get('/',  (req, res) => {
  res.send('Bienvenue sur l\'API de PayeTonKawa !');
});

app.get('/customers', authentification, async (req, res) => {
  try {
    const response = await fetch(`${baseUri}/customers`);
    const customer = await response.json();
    res.json(customer);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/customers/:id', authentification, async (req, res) => {
  try {
    const response = await fetch(`${baseUri}/customers/${req.params.id}`);
    const customer = await response.json();
    res.json(customer);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/customers/:id/orders', authentification, async (req, res) => {
  try {
    const response = await fetch(`${baseUri}/customers/${req.params.id}/orders`);
    const orders = await response.json();
    res.json(orders);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/customers/:id/orders/:id', authentification, async (req, res) => {
  try {
    const response = await fetch(`${baseUri}/customers/${req.params.id}/orders/${req.params.id}`);
    const order = await response.json();
    res.json(order);
  } catch (error) {
    res.status(500).send
  }
});

app.get('/products', authentification, async (req, res) => {
  try {
    const response = await fetch(`${baseUri}/products`);
    const products = await response.json();
    res.json(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/products/:id', authentification, async (req, res) => {
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


function generateAccessToken(value) {
  return jsonwebtoken.sign(value, process.env.ACCESS_TOKEN_SECRET, Date().now + 60 * 60 * 1000);
}

function authentification(req, res, next) {
  const token = decrypt(req.headers.authorization)
  if (token == null) return res.sendStatus(401);
  jsonwebtoken.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

function decrypt(value){
  var bytes = cryptoJs.AES.decrypt(value, process.env.SALT);
  return bytes.toString(cryptoJs.enc.Utf8);
}

function encrypt(value){
  return cryptoJs.AES.encrypt(value, process.env.SALT).toString();
}