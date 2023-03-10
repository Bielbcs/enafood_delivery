const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const app = require('../../api/app');
const jwt = require('jsonwebtoken');
const INITIAL_PRODUCTS = require('../../../seeder');
const Product = require('../../models/products.model');
const Cart = require('../../models/cart.model');
const { MOCKED_CART } = require('../mocks/cartMocks');
const { RETURNED_USER_MOCK } = require('../mocks/userMocks');

const { expect } = chai;

chai.use(chaiHttp);

afterEach(() => {
  sinon.restore();
})

describe('GET /cart', function() {
  it('Deve retornar todos os produtos', async function() {
    sinon.stub(jwt, 'verify').returns({_doc: RETURNED_USER_MOCK});
    sinon.stub(Cart, 'findOne').resolves(MOCKED_CART);
    const result = await chai
      .request(app)
      .get('/cart')

    expect(result.status).to.be.equals(200);
    expect(result.body).to.be.deep.equals(MOCKED_CART);
  });
});