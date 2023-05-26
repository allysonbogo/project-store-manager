const { expect } = require('chai');
const sinon = require('sinon');
const { productsService } = require('../../../src/services');
const { productsModel } = require('../../../src/models');

const { products } = require('./mocks/products.service.mock');

describe('Teste de unidade do service de produtos', function () {
  describe('Listando os produtos', function () {
    it('Deve retornar o status 200 e a lista', async function () {
      // arrange
      sinon.stub(productsModel, 'findAll').resolves(products);
      
      // act
      const result = await productsService.findAll();

      // assert
      expect(result).to.deep.equal(products);
    });
  });

  describe('Buscando um produto', function () {
    it('deve responder com 200 e os dados do produto', async function () {
      // arrange
      sinon.stub(productsModel, 'findById').resolves(products[0]);
      
      // act
      const result = await productsService.findById(1);

      // assert
      expect(result).to.deep.equal(products[0]);
    });

    it('deve responder com 404 ao passar um id que não existe', async function () {
      // arrange
      sinon.stub(productsModel, 'findById').resolves(undefined);
     
      // act
      const result = await productsService.findById(1);
      
      // assert
      expect(result.message).to.equal('Product not found');
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});