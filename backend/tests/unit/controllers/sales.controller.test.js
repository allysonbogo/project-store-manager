const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const { sales, itemsSold, newSale } = require('./mocks/sales.controller.mock');

describe('Teste de unidade do controller de vendas', function () {
  describe('Listando as vendas', function () {
    it('Deve retornar o status 200 e a lista', async function () {
      // arrange
      const res = {};
      const req = {};
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'findAll')
        .resolves(sales);

      // act
      await salesController.findAll(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(sales);
    });
  });

  describe('Buscando uma venda', function () {
    it('deve responder com 200 e os dados da venda', async function () {
      // arrange
      const res = {};
      const req = {
        params: { id: 2 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'findById')
        .resolves(sales);

      // act
      await salesController.findById(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(sales);
    });

    it('deve responder com 404 ao passar um id que não existe', async function () {
      // arrange
      const res = {};
      const req = {
        params: { id: 9999 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(salesService, 'findById')
        .resolves({ message: 'Product not found' });

      // act
      await salesController.findById(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(404); 
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });

  describe('Cadastrando uma venda', function () {
    it('deve responder com 200 e os dados da venda', async function () {
      // arrange
      const res = {};
      const req = {
        body: itemsSold,
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'createSale')
        .resolves(newSale);

      // act
      await salesController.createSale(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(newSale);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});