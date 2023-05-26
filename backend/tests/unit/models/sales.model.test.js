const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { sales } = require('./mocks/sales.model.mock');

describe('Testes de unidade do model de vendas', function () {
  it('Recuperando a lista de vendas', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([sales]);
    // Act
    const result = await salesModel.findAll();
    // Assert
    expect(result).to.be.deep.equal(sales);
  });

  it('Recuperando uma venda a partir do seu id', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([sales[2]]);
    // Act
    const result = await salesModel.findById(2);
    // Assert
    expect(result).to.be.deep.equal(sales[2]);
  });

  afterEach(function () {
    sinon.restore();
  });
});