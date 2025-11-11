import request from 'supertest';
import { expect } from 'chai'
import app from '../src/server.js'
import fs from 'fs'

describe('Product API Error Handling', () => {
  before(() => {
    // Reset data before tests
    if (!fs.existsSync('./data/products.json')) {
      fs.writeFileSync('./data/products.json', JSON.stringify([]));
    } else {
      fs.writeFileSync('./data/products.json', JSON.stringify([]));
    }
  });

  let createdProductId;

  // ✅ CREATE - success case
  it('should create a new product successfully', async () => {
    const res = await request(app)
      .post('/products')
      .send({ name: 'Laptop', price: 1200 });

    expect(res.status).to.equal(201);
    expect(res.body).to.include({ name: 'Laptop', price: 1200 });
    expect(res.body).to.have.property('id');
    createdProductId = res.body.id;
  });

  // ✅ READ - fetch all
  it('should return all products including the created one', async () => {
    const res = await request(app).get('/products');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.greaterThan(0);
    expect(res.body.some(p => p.name === 'Laptop')).to.be.true;
  });

  // ✅ READ - fetch by ID
  it('should return a product by ID', async () => {
    const res = await request(app).get(`/products/${createdProductId}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('name', 'Laptop');
  });

  it('should return all products', async () => {
    const res = await request(app).get('/products');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });

  it('should return 400 for invalid product data', async () => {
    const res = await request(app).post('/products').send({ price: 'abc' });
    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('error', 'Invalid product data');
  });

  it('should return 404 for non-existing product', async () => {
    const res = await request(app).get('/products/9999');
    expect(res.status).to.equal(404);
    expect(res.body).to.have.property('error', 'Product not found');
  });

  it('should return 404 for invalid route', async () => {
    const res = await request(app).get('/invalidRoute');
    expect(res.status).to.equal(404);
    expect(res.body).to.have.property('error', 'Route not found');
  });

  it('should handle internal server errors gracefully', async () => {
    const backup = fs.readFileSync('./data/products.json');
    fs.writeFileSync('./data/products.json', 'corrupted_json');
    const res = await request(app).get('/products');
    expect(res.status).to.equal(500);
    expect(res.body).to.have.property('error', 'Internal Server Error');
    fs.writeFileSync('./data/products.json', backup);
  });

  
});
