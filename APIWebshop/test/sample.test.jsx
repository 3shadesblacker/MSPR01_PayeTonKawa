const { describe, it } = require('@jest/globals');
const frisby = require('frisby');

let DOLAPIKEY = null;
let token = null;
let baseUrl = "http://51.38.237.216:3000"

describe('API test', () => {
  it('tests / endpoints', async () => {
    return frisby
      .get(baseUrl + '/')
      .expect('status', 200)
      .then((res) => {
        return expect(res.body).toBe("Bienvenue sur l'API de PayeTonKawa !");
      });
  })
});

describe('API test Login', () => {
  it('tests /login endpoints', async () => {
    return frisby
      .post(baseUrl + '/login', {
        identifiant: "admin",
        password: "adminkawa",
      })
      .expect('status', 200)
      .then((res) => {
        const json = JSON.parse(res.body)
        token = json.token;
        DOLAPIKEY = json.DOLAPIKEY;
        return expect(true).toBe(true);
      })
  })

  it('tests /login endpoints with bad credentials', async () => {
    return frisby
      .post(baseUrl + '/login', {
        identifiant: "admin",
        password: "badpassword",
      })
      .expect('status', 403)
  })

  it('tests /login endpoints without credentials', async () => {
    return frisby
      .post(baseUrl + '/login', {
        identifiant: "admin",
        password: "badpassword",
      })
      .expect('status', 403)
  })
});

describe('API test Customers', () => {
  it('tests /customers endpoints without token', async () => {
    return frisby
      .fetch(baseUrl + '/customers', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .expect('status', 401)
  })
  it('tests /customers endpoints with bad token', async () => {
    return frisby
      .fetch(baseUrl + '/customers', {
        method: 'GET',
        headers: {
          'Authorization': "badToken",
          'Content-Type': 'application/json',
        }
      })
  })

  it('tests /customers endpoints', async () => {
    return frisby
      .fetch(baseUrl + '/customers', {
        method: 'GET',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        },
        body: {
          'DOLAPIKEY': DOLAPIKEY
        }
      })
      .expect('status', 200)
      .then((res) => {
        return expect(true).toBe(true);
      })
  });
});

