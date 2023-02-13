describe('Sample Test', () => {
    it('should test that true === true', () => {
      expect(true).toBe(true)
    })
  })
  const fetch = require('node-fetch');
const baseUri = 'http://localhost:3000';

test('Get customer by ID', async () => {
  const id = 1;
  const response = await fetch(`${baseUri}/customers/${id}`);
  const customer = await response.json();
  expect(customer.id).toBe(id);
});



