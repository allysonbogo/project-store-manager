const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');
const { products, newProduct } = require('./mocks/products.model.mock');

describe('Testes de unidade do model de produtos', function () {
  it('Recuperando a lista de produtos', async function () {
    // arrange
    sinon.stub(connection, 'execute').resolves([products]);
    // act
    const result = await productsModel.findAll();
    // assert
    expect(result).to.be.deep.equal(products);
  });

  it('Recuperando um produto a partir do seu id', async function () {
    // arrange
    sinon.stub(connection, 'execute').resolves([[products[0]]]);
    // act
    const result = await productsModel.findById(1);
    // assert
    expect(result).to.be.deep.equal(products[0]);
  });

  it('Cadastrando um produto', async function () {
    // arrange
    sinon.stub(connection, 'execute').resolves([{ insertId: 24 }]);
    // act
    const result = await productsModel.createProduct(newProduct);
    // assert
    expect(result).to.equal(24);
  });

  it('Atualizando um produto', async function () {
    // arrange
    sinon.stub(connection, 'execute').resolves();
    // act
    const result = await productsModel.updateProduct(products[0].name, products[0].id);
    // assert
    expect(result).to.equal();
  });

  it('Deletando um produto', async function () {
    // arrange
    sinon.stub(connection, 'execute').resolves();
    // act
    const result = await productsModel.deleteProduct(products[0].id);
    // assert
    expect(result).to.equal();
  });

  it('Recuperando um produto a partir do seu nome', async function () {
    // arrange
    sinon.stub(connection, 'execute').resolves([products[0]]);
    // act
    const result = await productsModel.findByName('mart');
    // assert
    expect(result).to.be.deep.equal(products[0]);
  });

  afterEach(function () {
    sinon.restore();
  });
});