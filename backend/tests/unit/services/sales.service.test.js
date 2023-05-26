const { expect } = require('chai');
const sinon = require('sinon');
const { salesService } = require('../../../src/services');
const { salesModel } = require('../../../src/models');

const { sales } = require('./mocks/sales.service.mock');

describe('Teste de unidade do service de vendas', function () {
  describe('Listando as vendas', function () {
    it('Deve retornar o status 200 e a lista', async function () {
      // arrange
      sinon.stub(salesModel, 'findAll').resolves(sales);
      
      // act
      const result = await salesService.findAll();

      // assert
      expect(result).to.deep.equal(sales);
    });
  });

  describe('Buscando uma venda', function () {
    it('deve responder com 200 e os dados da venda', async function () {
      // arrange
      sinon.stub(salesModel, 'findById').resolves(sales[2]);
      
      // act
      const result = await salesService.findById(2);

      // assert
      expect(result).to.deep.equal(sales[2]);
    });

    it('deve responder com 404 ao passar um id que não existe', async function () {
      // arrange
      sinon.stub(salesModel, 'findById').resolves([]);
     
      // act
      const result = await salesService.findById(1);
      
      // assert
      expect(result.message).to.equal('Sale not found');
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});