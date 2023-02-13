const axios = require('axios');
const app = require('express')();
const baseUri = 'https://api.example.com';

jest.mock('axios');

describe('GET /customers/:id', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('returns customer data', async () => {
    const customer = { id: 123, name: 'John Doe' };
    axios.mockResolvedValue({ data: customer });

    const req = { params: { id: 123 } };
    const res = { json: jest.fn() };

    await app.get('/customers/:id', authentification, async (req, res) => {
      try {
        const response = await axios.get(`${baseUri}/customers/${req.params.id}`);
        res.json(response.data);
      } catch (error) {
        res.status(500).send(error);
      }
    })(req, res);

    expect(axios).toHaveBeenCalledWith(`${baseUri}/customers/123`);
    expect(res.json).toHaveBeenCalledWith(customer);
  });

  it('returns 500 error on fetch error', async () => {
    axios.mockRejectedValue(new Error('Fetch error'));

    const req = { params: { id: 123 } };
    const res = { status: jest.fn().mockReturnValue({ send: jest.fn() }) };

    await app.get('/customers/:id', authentification, async (req, res) => {
      try {
        const response = await axios.get(`${baseUri}/customers/${req.params.id}`);
        res.json(response.data);
      } catch (error) {
        res.status(500).send(error);
      }
    })(req, res);

    expect(axios).toHaveBeenCalledWith(`${baseUri}/customers/123`);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.status().send).toHaveBeenCalledWith(new Error('Fetch error'));
  });
});
