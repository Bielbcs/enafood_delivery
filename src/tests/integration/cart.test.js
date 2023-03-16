const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const app = require('../../api/app');
const jwt = require('jsonwebtoken');
const INITIAL_PRODUCTS = require('../../../seeder');
const Product = require('../../models/products.model');
const Cart = require('../../models/cart.model');
const { MOCKED_CART, MOCKED_RETURNED_PRODUCTS, 
  MOCKED_CART_WITH_A_PRODUCT } = require('../mocks/cartMocks');
const { RETURNED_USER_MOCK } = require('../mocks/userMocks');

const { expect } = chai;

chai.use(chaiHttp);

afterEach(() => {
  sinon.restore();
})

describe('CART', function() {
  beforeEach(() => {
    sinon.stub(jwt, 'verify').returns({_doc: RETURNED_USER_MOCK});
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('GET /cart', function() {
    it('Deve retornar todos os produtos', async function() {
      sinon.stub(Cart, 'findOne').resolves(MOCKED_CART);
      const result = await chai
        .request(app)
        .get('/cart')
  
      expect(result.status).to.be.equals(200);
      expect(result.body).to.be.deep.equals(MOCKED_CART);
    });
  });
  
  describe('POST /cart/:id', function() {
    it('Deve ser possível incluir um produto no carrinho', async function() {  
  
      sinon.stub(Product, 'findOne').returns({
        select: sinon.stub().resolves(MOCKED_RETURNED_PRODUCTS[0])
      });
  
      sinon.stub(Cart, 'findOne')
        .resolves({ ...MOCKED_CART, save: sinon.stub().resolves(MOCKED_CART_WITH_A_PRODUCT) })
  
      const result = await chai
        .request(app)
        .post(`/cart/${MOCKED_RETURNED_PRODUCTS[0]._id}`)
  
      expect(result.body).to.be.deep.equals(MOCKED_CART_WITH_A_PRODUCT);
      expect(result.status).to.be.equals(201);
    })
  });
  
  describe('PUT /cart/:id/:quantity', function() {
    it('Deve atualizar a quantidade de um produto espeficido', async function() {
      sinon.stub(Cart, 'findOneAndUpdate').resolves(MOCKED_CART_WITH_A_PRODUCT);

      const result = await chai
        .request(app)
        .put(`/cart/${MOCKED_RETURNED_PRODUCTS}/10`)

      expect(result.status).to.be.equals(201);
      expect(result.body).to.be.deep.equals(MOCKED_CART_WITH_A_PRODUCT);
    });
  });

  describe('DELETE /cart/:id', function() {
    it('Deve remover um produto especifico do carrinho', async function() {
      sinon.stub(Cart, 'findOneAndUpdate').resolves(MOCKED_CART_WITH_A_PRODUCT);

      const result = await chai
        .request(app)
        .delete(`/cart/${MOCKED_RETURNED_PRODUCTS}`)
  
      expect(result.status).to.be.equals(200);
      expect(result.body).to.be.deep.equals(MOCKED_CART_WITH_A_PRODUCT);
    });
  });
})

