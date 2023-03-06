import express from 'express';
import nodemailer from 'nodemailer';
import qrcode from 'qrcode';
import handlebars from 'handlebars';
import fs from 'fs';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' assert { type: "json" };
import crypto from 'crypto'
import cors from 'cors'
import * as dotenv from 'dotenv'

dotenv.config()

const app = express();
app.use(cors());

app.use(express.json())
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// transporter object
const transporter = nodemailer.createTransport({
  pool: true,
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
  }
})

const baseUri = 'http://localhost/dolibarr/api/index.php';

app.get('/', (req, res) => {
  res.send('Bienvenue sur l\'API de PayeTonKawa !');
});

app.get('/login', async (req, res) => {
  const { login, password } = req.body
  try {
    const token = await fetch(`${process.env.BASE_URL}/login?login=${login}&password=${password}[&reset=1]`);
    res.send(token);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/qrcode', async (req, res) => {
  const { to, token } = req.body
  // generating a qrcode
  let code;
  qrcode.toDataURL(token)
    .then(url => {
      code = url
    })
    .catch(err => {
      console.error(err)
      res.send("An error occured. Try again magl")
    })

  // creating html file to be sent  
  let template = handlebars.compile(fs.readFileSync('mail.html', 'utf8'));
  let html = template({ qrcode: code });

  // create the email options
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: to,
    html: html
  }

  const resp = transporter.sendMail(mailOptions);

  if (resp) {
    res.send({ message: 'Email sent successfully' });
  } else {
    res.status(500).send({ message: 'Email not sent' });
  }

})

app.get('/qrcode/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id)
  res.sendFile('./qrcodes/' + id + '.jpg', { root: "." });
})

app.post("/submit", (req, res) => {
  const { token } = req.body;
  if (token == null) return res.sendStatus(401);
  jsonwebtoken.verify(token, process.process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    res.send(token)
    next();
  });
})

app.get('/products', async (req, res) => {
  const { token } = req.body;
  if (token == null) return res.sendStatus(401);
  try {
    const response = await fetch(`${baseUri}/products?DOLAPIKEY=${token}`);
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
    const response = await fetch(`${baseUri}/products/${req.params.id}?DOLAPIKEY=${token}`);
    const product = await response.json();
    res.json(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/stocks/:productId', async (req, res) => {
  const { token } = req.body;
  if (token == null) return res.sendStatus(401);
  try {
    const response = await fetch(`${baseUri}/products/${req.params.id}/stock?DOLAPIKEY=${token}`);
    const stocks = await response.json();
    console.log(stocks);
    res.json(stocks);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/orders', async (req, res) => {
  const { token } = req.body;
  if (token == null) return res.sendStatus(401);
  try {
    const response = await fetch(`${baseUri}/orders`);
    const orders = await response.json();
    res.json(orders);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(3001, () => {
  console.log('API listening on port 3001');
});