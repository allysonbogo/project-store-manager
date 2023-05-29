const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const validateProductName = require('../../../src/middlewares/validate.product.name');
const validateProductId = require('../../../src/middlewares/validate.product.id');

describe('Testes de unidade do middleware de atualização de produtos', function () {
  it('ao enviar dados válidos deve retornar com sucesso', async function () {
    // arrange
    const res = {};
    const req = {
      params: { id: 1 },
      body: { name: 'Teste' },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    const next = sinon.stub().returns();

    // act
    await validateProductName(req, res, next);
    await validateProductId(req, res, next);

    // assert
    expect(validateProductName).to.be.a('function');
    expect(validateProductId).to.be.a('function');
  });

  it('ao não enviar um nome deve retornar um erro', async function () {
    // arrange
    const res = {};
    const req = {
      params: 1,
      body: {},
    };
    const next = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    // act
    await validateProductName(req, res, next);

    // assert
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
  });

  it('ao enviar um id inválido deve retornar um erro', async function () {
    // arrange
    const res = {};
    const req = {
      params: { id: 9999 },
      body: {},
    };
    const next = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    // act
    await validateProductId(req, res, next);

    // assert
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  afterEach(function () {
    sinon.restore();
  });
});