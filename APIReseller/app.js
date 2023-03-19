import express from 'express';
import nodemailer from 'nodemailer';
import qrcode from 'qrcode';
import handlebars from 'handlebars';
import fetch from "node-fetch";
import fs from 'fs';
import cors from 'cors'
import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express';
// import swaggerDocument from './swagger.json' assert { type: "json" };

dotenv.config()
const app = express();

app.use(cors());
app.use(express.json())

const isDev = true;
// transporter object 
const transporter = nodemailer.createTransport({
  pool: true,
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
  }
});
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  res.send('Bienvenue sur l\'API de PayeTonKawa !');
});

app.post("/login", async (req, res) => {
  try {
    if (req.body.login && req.body.password) {
      console.log(process.env.BASE_URI);
      var response = await fetch(`${process.env.BASE_URI}/login?login=${req.body.login}&password=${req.body.password}`);
      const data = await response.json();
      if (data.success) {
        console.log(data.success);
        res.send({token: data.success.token});
      } else {
        res.status(401).send(data.error);
      };
    } else {
      console.log("Identifiant ou mot de passe incorrect")
      res.status(403).send("Identifiant ou mot de passe incorrect");
    }
  }
  catch(error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/qrcode', async (req, res) => {
  const to = req.body.to;
  const token = req.body.token;
  if (to && token)
  {
    // generating a qrcode
    qrcode.toDataURL(token, (err, url) => {
      if (err) {
        console.error(err)
        res.send("An error occured. Try again")
        return
      }
      console.log(url);
      // create the email option
      const mailOptions = {
        from: `Paie Ton Kawa <${process.env.MAIL_USER}>`,
        subject: 'Authentification',
        to: to,
        html:'<body style="text-align: center">'
              + '<h1 style="font-style: bold">Scannez ce code QR pour vous authentifier:</h1>'
              + `<img src="${url}" alt="qrcode" style="display: block; margin: 0 auto"/>`
            +'</body>'
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error(err)
          res.status(500).send({ message: 'Email not sent, an error has occured' });
        } else {
          res.send({ message: 'Email sent successfully' });
        }
      });
    });
  }
});


app.get('/qrcode/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id)
  res.sendFile('./qrcodes/' + id + '.jpg', { root: "." });
})

app.post("/submit", (req, res) => {
  const { token } = req.body;
  if (token == null) return res.sendStatus(401);
  jsonwebtoken.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    res.send(token)
    next();
  });
})

app.get('/products', async (req, res) => {
  const token = req.query.token;
  if (token == null) return res.sendStatus(401);
  try {
    const response = await fetch(`${process.env.BASE_URI}/products`,{
      headers: {
        DOLAPIKEY: token
      }
    }
    );
    const customers = await response.json();
    console.log(customers);
    res.json(customers);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/products/:id', async (req, res) => {
  const { token } = req.body;
  if (token == null) return res.sendStatus(401);
  try {
    const response = await fetch(`${process.env.BASE_URL}/products/${req.params.id}?DOLAPIKEY=${token}`);
    const product = await response.json();
    res.json(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/stocks/:id', async (req, res) => {
  const { token } = req.body;
  if (token == null) return res.sendStatus(401);
  try {
    const response = await fetch(`${process.env.BASE_URL}/products/${req.params.id}/stock?DOLAPIKEY=${token}`);
    const stocks = await response.json();
    console.log(stocks);
    res.json(stocks);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/orders/:id', async (req, res) => {
  const { token } = req.body;
  if (token == null) return res.sendStatus(401);
  try {
    const response = await fetch(`${process.env.BASE_URL}/orders/${req.params.id}?DOLAPIKEY=${token}`);
    const orders = await response.json();
    res.json(orders);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(3001, () => {
  console.log('API listening on port 3001');
});