const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { sales, newSale } = require('./mocks/sales.model.mock');

describe('Testes de unidade do model de vendas', function () {
  it('Recuperando a lista de vendas', async function () {
    // arrange
    sinon.stub(connection, 'execute').resolves([sales]);
    // act
    const result = await salesModel.findAll();
    // assert
    expect(result).to.be.deep.equal(sales);
  });

  it('Recuperando uma venda a partir do seu id', async function () {
    // arrange
    sinon.stub(connection, 'execute').resolves([sales[2]]);
    // act
    const result = await salesModel.findById(2);
    // assert
    expect(result).to.be.deep.equal(sales[2]);
  });

  it('Cadastrando um id de venda', async function () {
    // arrange
    sinon.stub(connection, 'execute').resolves([{ insertId: 24 }]);
    // act
    const result = await salesModel.createSaleId();
    // assert
    expect(result).to.be.deep.equal(24);
  });

  it('Cadastrando uma venda', async function () {
    // arrange
    sinon.stub(connection, 'execute').resolves(newSale);
    // act
    const result = await salesModel.createSale(1, 1, 1);
    // assert
    expect([result]).to.be.deep.equal(newSale);
  });

  afterEach(function () {
    sinon.restore();
  });
});