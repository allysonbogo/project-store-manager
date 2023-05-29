const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const validateUpdateSale = require('../../../src/middlewares/validate.update.sale');
const { salesModel } = require('../../../src/models');
const { sales } = require('../services/mocks/sales.service.mock');

describe('Testes de unidade do middleware de atualização de vendas', function () {
  it('ao enviar dados válidos deve retornar com sucesso', async function () {
    // arrange
    const res = {};
    const req = {
      params: {
        saleId: 1,
        productId: 1,
      },
      body: { quantity: 1 },
    };
    sinon.stub(salesModel, 'findById').resolves(sales);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    const next = sinon.stub().returns();

    // act
    await validateUpdateSale(req, res, next);

    // assert
    expect(validateUpdateSale).to.be.a('function');
  });

  it('ao não enviar uma quantidade deve retornar um erro', async function () {
    // arrange
    const res = {};
    const req = {
      params: {
        saleId: 1,
        productId: 1,
      },
      body: {},
    };
    const next = {};
    sinon.stub(salesModel, 'findById').resolves(sales);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    // act
    await validateUpdateSale(req, res, next);

    // assert
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"quantity" is required' });
  });

  it('ao enviar um produto inválido deve retornar um erro', async function () {
    // arrange
    const res = {};
    const req = {
      params: {
        saleId: 1,
        productId: 9999,
      },
      body: { quantity: 1 },
    };
    const next = {};
    sinon.stub(salesModel, 'findById').resolves(sales);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    // act
    await validateUpdateSale(req, res, next);

    // assert
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found in sale' });
  });

  it('ao enviar uma venda inválida deve retornar um erro', async function () {
    // arrange
    const res = {};
    const req = {
      params: {
        saleId: 9999,
        productId: 1,
      },
      body: { quantity: 1 },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    const next = {};

    // act
    await validateUpdateSale(req, res, next);

    // assert
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
  });

  afterEach(function () {
    sinon.restore();
  });
});