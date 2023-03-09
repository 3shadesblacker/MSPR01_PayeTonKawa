import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import jsonwebtoken from 'jsonwebtoken';
import swaggerUi from 'swagger-ui-express';
// import swaggerDocument from './swagger.json' assert { type: "json" };
import * as dotenv from 'dotenv'
import cryptoJs from 'crypto-js'
import http from 'http'

const app = express();

app.use(cors());
app.use(express.json());
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
dotenv.config();

const baseUri = process.env.BASE_URI;

app.get('/', (req, res) => {
  res.send('Bienvenue sur l\'API de PayeTonKawa !');
});

app.post("/login", async (req, res) => {

  const login = req.body.login.login;
  const password = req.body.password.password;

  if (login === process.env.IDENTIFIANT && password === process.env.PASSWORD) {
    await fetch(`${baseUri}/login?login=${login}&password=${password}`, generateHeader("GET"))
      .then(response => response.text())
      .then(result => {
        const jsonResponse = JSON.parse(result)
        const sendValue = {
          DOLAPIKEY: encrypt(jsonResponse.success.token),
          token: encrypt(generateAccessToken(jsonResponse.success.token))
        }
        res.status(200).send(JSON.stringify(sendValue));
      })
      .catch(error => {
        console.log(error),
          res.status(403).send(error)
      });
  } else {
    console.log("Identifiant ou mot de passe incorrect");
    res.status(403).send("LOGIN API : Identifiant ou mot de passe incorrect login : " + login + " pw : " + password);
  }
});
// 
app.post('/products', authentification, async (req, res) => {
  const { DOLAPIKEY } = req.body;
  await request(`${baseUri}/products`, "GET", DOLAPIKEY, res);
});
// 
app.post('/products/:id', authentification, async (req, res) => {
  const { DOLAPIKEY } = req.body;
  await request(`${baseUri}/products/${req.params.id}`, "GET", DOLAPIKEY, res);
});
// 
app.post('/customers', authentification, async (req, res) => {
  const { DOLAPIKEY } = req.body;
  await request(`${baseUri}/thirdparties?mode=1`, "GET", DOLAPIKEY, res);
});
// 
app.post('/orders', authentification, async (req, res) => {
  const { DOLAPIKEY } = req.body;
  await request(`${baseUri}/orders`, "GET", DOLAPIKEY, res);
});
// 
app.post('/prospect', authentification, async (req, res) => {
  const { DOLAPIKEY } = req.body;
  await request(`${baseUri}/thirdparties?mode=2`, "GET", DOLAPIKEY, res);
})
// 
app.post('/stocks', authentification, async (req, res) => {
  const { DOLAPIKEY } = req.body;
  await request(`${baseUri}/stockmovements`, "GET", DOLAPIKEY, res);
});

app.listen(3000, () => {
  console.log('API listening on port 3000');
});


function generateAccessToken(value) {
  return jsonwebtoken.sign(value, process.env.ACCESS_TOKEN_SECRET, Date().now + 60 * 60 * 1000);
}

function authentification(req, res, next) {
  if (req.headers.authorization == null) return res.sendStatus(401);
  const token = decrypt(req.headers.authorization);
  console.log(token)
  jsonwebtoken.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

function decrypt(value) {
  return cryptoJs.AES.decrypt(value, process.env.SALT).toString(cryptoJs.enc.Utf8);
}

function encrypt(value) {
  return cryptoJs.AES.encrypt(value, process.env.SALT).toString();
}

function generateHeader(Methode, DOLAPIKEY) {
  console.log(Methode, DOLAPIKEY)
  if (DOLAPIKEY) {
    return {
      method: Methode,
      headers: {
        DOLAPIKEY: DOLAPIKEY,
        Accept: "application/json"
      }
    };
  }
  return {
    method: Methode
  };
}

async function request(uri, method, DOLAPIKEY, res) {
  if (DOLAPIKEY !== undefined) {
    await fetch(uri, generateHeader(method, decrypt(DOLAPIKEY)))
      .then(response => response.text())
      .then(result => {
        res.status(200).send(JSON.parse(result));
      })
      .catch(error => {
        res.status(403).send(error)
      })
  }
  else {
    res.status(403).send("Vous n'êtes pas autorisé à accéder à cette ressource")

  }
}