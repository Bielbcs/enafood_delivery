const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const app = require('../../api/app');
const jwt = require('jsonwebtoken');
const INITIAL_PRODUCTS = require('../../../seeder');
const Product = require('../../models/products.model');
const { RETURNED_USER_MOCK } = require('../mocks/userMocks');

const { expect } = chai;

chai.use(chaiHttp);

describe('GET /product', function() {
  it('Deve retornar todos os produtos', async function() {
    sinon.stub(jwt, 'verify').resolves(RETURNED_USER_MOCK);
    sinon.stub(Product, 'find').returns({
      select: sinon.stub().resolves(INITIAL_PRODUCTS)
    });
    const result = await chai.request(app).get('/product');

    expect(result.status).to.be.equals(200);
    expect(result.body).to.be.deep.equals(INITIAL_PRODUCTS);
  });
});