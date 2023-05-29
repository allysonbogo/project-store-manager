const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const validateSale = require('../../../src/middlewares/validate.sale');

describe('Testes de unidade do middleware de cadastro de vendas', function () {
  it('ao enviar dados válidos deve retornar com sucesso', async function () {
    // arrange
    const res = {};
    const req = {
      body: [{ productId: 1, quantity: 1 }],
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    const next = sinon.stub().returns();

    // act
    await validateSale(req, res, next);

    // assert
    expect(validateSale).to.be.a('function');
  });

  it('ao não enviar um id deve retornar um erro', async function () {
    // arrange
    const res = {};
    const req = {
      body: [{ quantity: 1 }],
    };
    const next = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    // act
    await validateSale(req, res, next);

    // assert
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"productId" is required' });
  });

  it('ao não enviar uma quantidade deve retornar um erro', async function () {
    // arrange
    const res = {};
    const req = {
      body: [{ productId: 1 }],
    };
    const next = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    // act
    await validateSale(req, res, next);

    // assert
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"quantity" is required' });
  });

  it('ao enviar um id que não existe deve retornar um erro', async function () {
    // arrange
    const res = {};
    const req = {
      body: [{ productId: 9999, quantity: 1 }],
    };
    const next = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    // act
    await validateSale(req, res, next);

    // assert
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  afterEach(function () {
    sinon.restore();
  });
});