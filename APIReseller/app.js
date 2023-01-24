import express from 'express';
import nodemailer from 'nodemailer';
import qrcode from 'qrcode';
import handlebars from 'handlebars';
import fs from 'fs';
import mysql2 from 'mysql2'
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' assert { type: "json" };
import crypto from 'crypto'
import cors from 'cors'

const app = express(); B
app.use(cors());
app.use(express.json())
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const connection = mysql2.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'adminkawa',
  database: 'PTonKawa'
});

// connect to database
connection.connect();
const baseUri = 'https://615f5fb4f7254d0017068109.mockapi.io/api/v1';

app.get('/', (req, res) => {
  res.send('Bienvenue sur l\'API de PayeTonKawa !');
});

app.get('/login', (req, res) => {
  const { email, password } = req.body
  try {
    const hash = crypto.createHash('sha256', password);
    connection.query(
      `SELECT id FROM USERS
       WHERE email = ${email}
       AND passwd = ${hash}`, (error, results) => {
      if (error || results[0] == null) {
        console.log(error);
        res.send('Utilisateur inconnu.');
      }
      connection.query(
        `SELECT token FROM TOKENS
         WHERE userId = ${results[0]}`, (err, res) => {
        if (err) console.log(err);
        res.send(res[0]);
      })
      res.json(JSON.stringify(results[0]));
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/signup', (req, res) => {
  const { email, password } = req.body
  try {
    const hash = crypto.createHash('sha256', password);
    connection.query(
      `SELECT id FROM USERS
       WHERE email = ${email}`, (error, results) => {
      if (error || results[0] == null) {
        connection.query(
          `INSERT INTO USERS(email, passwd)
           VALUES(${email}, ${hash});
           SELECT LAST_INSERT_ID();`, (err, res) => {
          if (err || res[0] == null) {
            console.log(err);
            res.send("An error occured 01.");
          }
          const token = crypto.createHmac('sha256', crypto.randomBytes(32).toString('hex'))
            .update(`${id} The Only Way Out Is Through. ${email}`)
            .digest('hex');
          connection.query(
            `INSERT INTO TOKENS(userID, token)
             VALUES(${res[0]}, ${token});`, (errr, ress) => {
            if (errr) {
              console.log(errr);
              res.send("An error occured 02.");
            }
            res.send(token);
          })
          res.send(res[0]);
        })
      }
      console.log(error);
      res.send('Utilisateur inconnu.');
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/qrcode', (req, res) => {
  const { to, token } = req.body

  // transporter object
  const transporter = nodemailer.createTransport({
    pool: true,
    host: 'ssl0.ovh.net',
    port: 465,
    secure: true,
    auth: {
      user: 'contact@ikon-design.fr',
      pass: 'adminkawa'
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    }
  })

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
  let html = template({ qrcode: code });

  // create the email options
  const mailOptions = {
    from: 'Paye Ton Kawa',
    to: to,
    html: html
  }

  // send the email using the transporter
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error)
      res.status(500).send({ message: 'Error sending email' })
    } else {
      console.log('Email sent: ' + info.response)
      res.send({ message: 'Email sent successfully' })
    }
  })
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
    connection.query(
      `SELECT * FROM STOCKS'
       WHERE productId = ${req.params.productId}`, (error, results) => {
      if (error) throw error;
      res.json(JSON.stringify(results[0]))
    });
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

// close the connection
connection.end();

app.listen(3001, () => {
  console.log('API listening on port 3001');
});
