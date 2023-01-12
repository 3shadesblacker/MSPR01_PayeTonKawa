import express from 'express';
import nodemailer from 'nodemailer';
import qrcode from 'qrcode';
import handlebars from 'handlebars';
import cors from 'cors';
const app = express();


const baseUri = 'https://615f5fb4f7254d0017068109.mockapi.io/api/v1';

app.get('/', (req, res) => {
  res.send('Bienvenue sur l\'API de PayeTonKawa !');
});

app.get('/products', async (req, res) => {
  try {
    const response = await fetch(`${baseUri}/customers`);
    const customers = await response.json();
    console.log(customers);
    res.json(customers);
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

app.post('/qrcode', (req, res) => {
  const { to, token } = req.body

  // transporter object
  const transporter = nodemailer.createTransport({
    service: 'email',
    auth: {
      user: 'address@email.com',
      pass: 'password'
    }
  })

  // generating a qrcode
  let code = { qrcode: "" };
  qrcode.toDataURL(token)
    .then(url => {
      code = { qrcode: url }
    })
    .catch(err => {
      console.error(err)
    })

  // creating html file to be sent  
  let template = handlebars.compile(readFile('mail.html', 'utf8'));
  html = template(code);

  // create the email options
  const mailOptions = {
    from: 'address@email.com',
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

app.listen(3000, () => {
  console.log('API listening on port 3000');
});
