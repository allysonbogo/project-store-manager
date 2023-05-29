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

  describe('Cadastrando um novo produto', function () {
    it('retorna o ID do produto cadastrado', async function () {
      // arrange
      sinon.stub(productsModel, 'createProduct').resolves(1);
      sinon.stub(productsModel, 'findById').resolves(products[0]);
      
      // act
      const result = await productsService.createProduct(products[0].name);

      // assert
      expect(result.name).to.deep.equal(products[0].name);
    });

    it('retorna um erro ao passar um nome inválido', async function () {
      // act
      const result = await productsService.createProduct('test');

      // assert
      expect(result.message).to.equal('"name" length must be at least 5 characters long');
    });
  });

  describe('Atualizando um produto', function () {
    it('retorna o produto cadastrado', async function () {
      // arrange
      sinon.stub(productsModel, 'updateProduct').resolves();
      sinon.stub(productsModel, 'findById').resolves(products[0]);
      
      // act
      const result = await productsService.updateProduct(products[0].name, products[0].id);

      // assert
      expect(result.id).to.deep.equal(products[0].id);
      expect(result.name).to.deep.equal(products[0].name);
    });

    it('retorna um erro ao passar um nome inválido', async function () {
      // act
      const result = await productsService.updateProduct('test');

      // assert
      expect(result.message).to.equal('"name" length must be at least 5 characters long');
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});