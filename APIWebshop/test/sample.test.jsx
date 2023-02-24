const { describe, it, expect } = require('@jest/globals');
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
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "DOLAPIKEY": DOLAPIKEY,
        })
      })
      .expect('status', 401)
  })

  it('tests /customers endpoints with bad token', async () => {
    return frisby
      .fetch(baseUrl + '/customers', {
        method: 'POST',
        headers: {
          'Authorization': "badtoken",
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "DOLAPIKEY": DOLAPIKEY,
        })
      })
      .expect('status', 403)
  })

  it('tests /customers endpoints with bad DOLAPIKEY', async () => {
    return frisby
      .fetch(baseUrl + '/customers', {
        method: 'POST',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "DOLAPIKEY": "DOLAPIKEY",
        })
      }).then((res) => {
        const err = JSON.parse(res.body)
        return expect(err.error.code).toBe(401);
      })
  })


  it('tests /customers endpoints', async () => {
    return frisby
      .fetch(baseUrl + '/customers', {
        method: 'POST',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "DOLAPIKEY": DOLAPIKEY,
        })
      })
      .expect('status', 200)
  });
});

describe('API test Products', () => {
  it('tests /products endpoints without token', async () => {
    return frisby
      .fetch(baseUrl + '/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "DOLAPIKEY": DOLAPIKEY,
        })
      })
      .expect('status', 401)
  })

  it('tests /products endpoints with bad token', async () => {
    return frisby
      .fetch(baseUrl + '/products', {
        method: 'POST',
        headers: {
          'Authorization': "badtoken",
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "DOLAPIKEY": DOLAPIKEY,
        })
      }).then((res) => {
        expect(res.status).toBe(403);
      })
  })

  it('test /products endpoints with bad DOLAPIKEY', async () => {
    return frisby
      .fetch(baseUrl + '/products', {
        method: 'POST',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "DOLAPIKEY": "DOLAPIKEY",
        })
      }).then((res) => {
        const err = JSON.parse(res.body)
        return expect(err.error.code).toBe(401);
      })
  })

  it('tests /products endpoints', async () => {
    return frisby
      .fetch(baseUrl + '/products', {
        method: 'POST',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "DOLAPIKEY": DOLAPIKEY,
        })
      })
      .expect('status', 200)
  });

  it('tests /products/id endpoints without token', async () => {
    return frisby
      .fetch(baseUrl + '/products/1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "DOLAPIKEY": DOLAPIKEY,
        })
      })
      .expect('status', 401)
  })

  it('tests /products/id endpoints with bad token', async () => {
    return frisby
      .fetch(baseUrl + '/products/1', {
        method: 'POST',
        headers: {
          'Authorization': "badtoken",
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "DOLAPIKEY": DOLAPIKEY,
        })
      }).then((res) => {
        expect(res.status).toBe(403);
      })
  })

  it('test /products/id endpoints with bad DOLAPIKEY', async () => {
    return frisby
      .fetch(baseUrl + '/products/1', {
        method: 'POST',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "DOLAPIKEY": "DOLAPIKEY",
        })
      }).then((res) => {
        const err = JSON.parse(res.body)
        return expect(err.error.code).toBe(401);
      })
  })

  it('tests /products/id endpoints with bad id', async () => {
    return frisby
      .fetch(baseUrl + '/products/b', {
        method: 'POST',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "DOLAPIKEY": DOLAPIKEY,
        })
      }).then((res) => {
        const err = JSON.parse(res.body)
        return expect(err.error.code).toBe(400);
      })
  })

  it('tests /products/id endpoints with non-existent id', async () => {
    return frisby
      .fetch(baseUrl + '/products/0', {
        method: 'POST',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "DOLAPIKEY": DOLAPIKEY,
        })
      }).then((res) => {
        const err = JSON.parse(res.body)
        return expect(err.error.code).toBe(400);
      })
  })

  it("test /products/id endpoints", async () => {
    return frisby
      .fetch(baseUrl + '/products/1', {
        method: 'POST',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "DOLAPIKEY": DOLAPIKEY,
        })
      })
      .expect('status', 200)
  })
});

describe('API test Orders', () => {
  it('tests /orders endpoints without token', async () => {
    return frisby
      .fetch(baseUrl + '/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "DOLAPIKEY": DOLAPIKEY,
        })
      })
      .expect('status', 401)
  })

  it('tests /orders endpoints with bad token', async () => {
    return frisby
      .fetch(baseUrl + '/orders', {
        method: 'POST',
        headers: {
          'Authorization': "badtoken",
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "DOLAPIKEY": DOLAPIKEY,
        })
      })
      .expect('status', 403)
  })

  it('tests /orders endpoints with bad DOLAPIKEY', async () => {
    return frisby
      .fetch(baseUrl + '/orders', {
        method: 'POST',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "DOLAPIKEY": "DOLAPIKEY",
        })
      }).then((res) => {
        const err = JSON.parse(res.body)
        return expect(err.error.code).toBe(401);
      })
  })


  it('tests /orders endpoints', async () => {
    return frisby
      .fetch(baseUrl + '/orders', {
        method: 'POST',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "DOLAPIKEY": DOLAPIKEY,
        })
      })
      .expect('status', 200)
  });
})

describe('API test Prospect', () => {
  it('tests /prospect endpoints without token', async () => {
    return frisby
      .fetch(baseUrl + '/prospect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "DOLAPIKEY": DOLAPIKEY,
        })
      })
      .expect('status', 401)
  })

  it('tests /prospect endpoints with bad token', async () => {
    return frisby
      .fetch(baseUrl + '/prospect', {
        method: 'POST',
        headers: {
          'Authorization': "badtoken",
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "DOLAPIKEY": DOLAPIKEY,
        })
      })
      .expect('status', 403)
  })

  it('tests /prospect endpoints with bad DOLAPIKEY', async () => {
    return frisby
      .fetch(baseUrl + '/prospect', {
        method: 'POST',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "DOLAPIKEY": "DOLAPIKEY",
        })
      }).then((res) => {
        const err = JSON.parse(res.body)
        return expect(err.error.code).toBe(401);
      })
  })


  it('tests /prospect endpoints', async () => {
    return frisby
      .fetch(baseUrl + '/prospect', {
        method: 'POST',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "DOLAPIKEY": DOLAPIKEY,
        })
      })
      .expect('status', 200)
  });
})

describe('API test Stocks', () => {
  it('tests /stocks endpoints without token', async () => {
    return frisby
      .fetch(baseUrl + '/stocks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "DOLAPIKEY": DOLAPIKEY,
        })
      })
      .expect('status', 401)
  })

  it('tests /stocks endpoints with bad token', async () => {
    return frisby
      .fetch(baseUrl + '/stocks', {
        method: 'POST',
        headers: {
          'Authorization': "badtoken",
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "DOLAPIKEY": DOLAPIKEY,
        })
      })
      .expect('status', 403)
  })

  it('tests /stocks endpoints with bad DOLAPIKEY', async () => {
    return frisby
      .fetch(baseUrl + '/stocks', {
        method: 'POST',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "DOLAPIKEY": "DOLAPIKEY",
        })
      }).then((res) => {
        const err = JSON.parse(res.body)
        return expect(err.error.code).toBe(401);
      })
  })


  it('tests /stocks endpoints', async () => {
    return frisby
      .fetch(baseUrl + '/stocks', {
        method: 'POST',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "DOLAPIKEY": DOLAPIKEY,
        })
      })
      .expect('status', 200)
  });
})