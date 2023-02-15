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
import users from './SQLRequest/users'
import tokens from './SQLRequest/tokens'
import stocks from './SQLRequest/stocks'

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

const baseUri = 'https://615f5fb4f7254d0017068109.mockapi.io/api/v1';

app.get('/', (req, res) => {
  res.send('Bienvenue sur l\'API de PayeTonKawa !');
});

app.get('/login', (req, res) => {
  const { email, password } = req.body
  try {
    const hash = crypto.createHash('sha256', password);
    const token = users.authenticate(email, hash)
    res.send(token);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/signup', (req, res) => {
  const { email, password } = req.body
  try {
    const hash = crypto.createHash('sha256', password);
    const id = users.save(email, hash);
    const token = crypto.createHmac('sha256', crypto.randomBytes(32).toString('hex'))
      .update(`${id} The Only Way Out Is Through. ${email}`)
      .digest('hex');
    tokens.save(id, token);
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
    })

  // creating html file to be sent  
  let template = handlebars.compile(fs.readFileSync('mail.html', 'utf8'));
  let html = template({ qrcode: qrCode });

  // create the email options
  const mailOptions = {
    from: 'contact@ikon-design.fr',
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
    const response = await fetch(`${baseUri}/products`);
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
    const response = await fetch(`${baseUri}/products/${req.params.id}`);
    const product = await response.json();
    res.json(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/stocks', async (req, res) => {
  const { token } = req.body;
  if (token == null) return res.sendStatus(401);
  try {
    const response = await fetch(`${baseUri}/stocks`);
    const stocks = await response.json();
    console.log(stocks);
    res.json(stocks);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/stocks/:productId', async (req, res) => {
  const { token } = req.body;
  if (token == null) return res.sendStatus(401);
  try {
    res.send(stocks.get(req.params.productId))
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