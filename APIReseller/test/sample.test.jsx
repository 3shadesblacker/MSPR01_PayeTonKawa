const { describe, it, expect } = require('@jest/globals');
const frisby = require('frisby');

let DOLAPIKEY = null;
let token = null;
let baseUrl = "http://51.38.237.216:3001"

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