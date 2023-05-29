const { expect } = require('chai');
const sinon = require('sinon');
const { salesService } = require('../../../src/services');
const { salesModel } = require('../../../src/models');

const { sales, newSale, itemsSold, wrongItems } = require('./mocks/sales.service.mock');

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

  describe('Cadastrando uma venda', function () {
    it('deve responder com 200 e os dados da venda', async function () {
      // arrange
      sinon.stub(salesModel, 'createSaleId').resolves(1);
      sinon.stub(salesModel, 'createSale').resolves(itemsSold[0]);
      
      // act
      const result = await salesService.createSale(itemsSold);

      // assert
      expect(result).to.deep.equal(newSale);
    });

    it('deve responder com 404 ao não passar algum dado', async function () {
      // arrange
      sinon.stub(salesModel, 'createSaleId').resolves(1);
      sinon.stub(salesModel, 'createSale').resolves(wrongItems[0]);
      
      // act
      const result = await salesService.createSale(wrongItems);

      // assert
      expect(result.message).to.deep.equal('"quantity" is required');
    });
  });

  describe('Deletando uma venda', function () {
    it('deve deletar com sucesso', async function () {
      // arrange
      sinon.stub(salesModel, 'findById').resolves(sales[0]);
      sinon.stub(salesModel, 'deleteSale').resolves();
      
      // act
      const result = await salesService.deleteSale(1);

      // assert
      expect(result).to.deep.equal();
    });

    it('deve retornar um erro ao passar um id que não existe', async function () {
      // arrange
      sinon.stub(salesModel, 'deleteSale').resolves({ message: 'Sale not found' });
      
      // act
      const result = await salesService.deleteSale(24);

      // assert
      expect(result.message).to.deep.equal('Sale not found');
    });
  });

  describe('Atualizando uma venda', function () {
    it('deve atualizar com sucesso', async function () {
      // arrange
      sinon.stub(salesModel, 'findProductInSale').resolves([sales[0]]);
      sinon.stub(salesModel, 'updateSale').resolves();
      
      // act
      const result = await salesService.updateSale(1, 1, 1);

      // assert
      expect(result).to.deep.equal(sales[0]);
    });

    it('deve retornar um erro ao passar uma quantidade inválida', async function () {
      // arrange
      sinon.stub(salesModel, 'findProductInSale').resolves(sales[0]);
      sinon.stub(salesModel, 'updateSale').resolves();
      
      // act
      const result = await salesService.updateSale(1, 1, 0);

      // assert
      expect(result.message).to.deep.equal('"quantity" must be greater than or equal to 1');
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});