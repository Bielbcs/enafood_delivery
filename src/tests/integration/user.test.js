const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const app = require('../../api/app');
const User = require('../../models/user.model');
const Cart = require('../../models/cart.model');
const jwt = require('jsonwebtoken');
const { INSERTED_USER_MOCK, RETURNED_USER_MOCK, 
  RETURN_PASSWORD, MOCKED_TOKEN } = require('../mocks/userMocks');

chai.use(chaiHttp);

const { expect } = chai;

beforeEach(() => {
  sinon.restore();
})

describe('USER', function() {
  describe('POST /user', function() {  
    it('deve retornar erro caso o email já esteja cadastrado', async function() {
      sinon.stub(User, 'findOne').resolves(RETURNED_USER_MOCK);
  
      const result = await chai.request(app).post('/user').send(INSERTED_USER_MOCK);
  
      expect(result.body).deep.equals({ message: 'Usuário já existe' });
      expect(result.status).equals(404);
    });
  
    it('deve cadastrar um novo usuário', async function() {
      sinon.stub(User, 'findOne').resolves(null);
      sinon.stub(User, 'create').resolves(RETURNED_USER_MOCK);
      sinon.stub(Cart, 'create').resolves();
  
      const result = await chai.request(app).post('/user').send(INSERTED_USER_MOCK);
  
      expect(result.status).equals(201);
      expect(result.body).deep.equals(RETURNED_USER_MOCK);
    });
  })
  
  describe('POST /user/login', function() {
    it('deve retornar um erro caso email ou senha não esteja correto', async function() {
      sinon.stub(User, 'findOne').returns({
        select: sinon.stub().resolves({})
      });
  
      const result = await chai.request(app).post('/user/login')
        .send(INSERTED_USER_MOCK);
  
      expect(result.body.message).to.be.equals('Credenciais inválidas');
      expect(result.status).to.be.equals(404);
    });
  
    it('deve efetuar o login do usuário e retornar um token', async function() {
      sinon.stub(User, 'findOne').returns({
        select: sinon.stub().resolves(RETURN_PASSWORD)
      });
      sinon.stub(jwt, 'sign').returns(MOCKED_TOKEN);
  
      const result = await chai.request(app).post('/user/login')
        .send(INSERTED_USER_MOCK);
  
      expect(result.body).to.be.equals(MOCKED_TOKEN);
      expect(result.status).to.be.equals(200);
    })
  });
});

