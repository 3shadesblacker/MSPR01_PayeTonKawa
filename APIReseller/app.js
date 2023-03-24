import express from 'express';
import nodemailer from 'nodemailer';
import qrcode from 'qrcode';
import handlebars from 'handlebars';
import fetch from "node-fetch";
import fs from 'fs';
import cors from 'cors'
import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv'
import path from 'path'
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
      console.log(response);
      const data = await response.json();
      console.log(data);
      if (data.success) {
        console.log(data.success);
        res.send(data.success.token);
      } else {
        res.status(401).send(data.error);
      }
    } else {
      console.log("Identifiant ou mot de passe incorrect")
      res.status(403).send("Identifiant ou mot de passe incorrect");
    }
  }
  catch {
    console.log('An error occured')
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.post('/qrcode', async (req, res) => {
  const {to, token} = req.body;
  if (to && token)
  {
    // generating a qrcode
    qrcode.toDataURL(token, (err, url) => {
      if (err) {
        console.error(err)
        res.send("An error occured. Try again")
        return
      }
      const __dirname = path.resolve();
      let template = handlebars.compile(fs.readFileSync(path.join(__dirname, './APIReseller/mail.html'), 'utf8'))({ qrcode: url });
      // create the email options
      const mailOptions = {
        from: `Paie Ton Kawa <${process.env.MAIL_USER}>`,
        subject: 'Authentification à Paie Ton Kawa !',
        to: to,
        html: template
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error(err)
          console.error(info)
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
  const { token } = req.body;
  if (token == null) return res.sendStatus(401);
  try {
    const response = await fetch(`${process.env.BASE_URL}/products?DOLAPIKEY=${token}`);
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