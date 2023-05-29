const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');
const { products } = require('./mocks/products.controller.mock');

describe('Teste de unidade do controller de produtos', function () {
  describe('Listando os produtos', function () {
    it('Deve retornar o status 200 e a lista', async function () {
      // arrange
      const res = {};
      const req = {};
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'findAll')
        .resolves(products);

      // act
      await productsController.findAll(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(products);
    });
  });

  describe('Buscando um produto', function () {
    it('deve responder com 200 e os dados do produto', async function () {
      // arrange
      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'findById')
        .resolves(products);

      // act
      await productsController.findById(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(products);
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
        .stub(productsService, 'findById')
        .resolves({ message: 'Product not found' });

      // act
      await productsController.findById(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(404); 
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });

  describe('Cadastrando um novo produto', function () {
    it('ao enviar dados válidos deve salvar com sucesso', async function () {
      // arrange
      const res = {};
      const req = {
        body: { name: 'Produto X' },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'createProduct')
        .resolves({ id: 1, name: 'Produto X' });

      // act
      await productsController.createProduct(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith({ id: 1, name: 'Produto X' });
    });

    it('ao enviar um nome com menos de 5 caracteres deve retornar um erro', async function () {
      // arrange
      const res = {};
      const req = {
        body: { name: 'test' },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'createProduct')
        .resolves({
          message: '"name" length must be at least 5 characters long',
        });

      // act
      await productsController.createProduct(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({
        message: '"name" length must be at least 5 characters long',
      });
    });

    it('ao não enviar um nome deve retornar um erro', async function () {
      // arrange
      const res = {};
      const req = {
        body: {},
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'createProduct')
        .resolves({
          message: '"name" is required',
        });

      // act
      await productsController.createProduct(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({
        message: '"name" is required',
      });
    });
  });

  describe('Atualizando um produto', function () {
    it('ao enviar dados válidos deve salvar com sucesso', async function () {
      // arrange
      const res = {};
      const req = {
        params: 1,
        body: { name: 'Produto X' },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'updateProduct')
        .resolves({ id: 1, name: 'Produto X' });

      // act
      await productsController.updateProduct(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({ id: 1, name: 'Produto X' });
    });

    it('ao enviar um nome com menos de 5 caracteres deve retornar um erro', async function () {
      // arrange
      const res = {};
      const req = {
        params: 1,
        body: { name: 'test' },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'updateProduct')
        .resolves({
          message: '"name" length must be at least 5 characters long',
        });

      // act
      await productsController.updateProduct(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({
        message: '"name" length must be at least 5 characters long',
      });
    });

    it('ao não enviar um nome deve retornar um erro', async function () {
      // arrange
      const res = {};
      const req = {
        params: 1,
        body: {},
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'updateProduct')
        .resolves({
          message: '"name" is required',
        });

      // act
      await productsController.createProduct(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({
        message: '"name" is required',
      });
    });
  });

  describe('Deletando um produto', function () {
    it('ao enviar um id válido deve deletar com sucesso', async function () {
      const res = {};
      const req = {
        params: 1,
      };

      res.sendStatus = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'deleteProduct')
        .resolves();

      await productsController.deleteProduct(req, res);

      expect(res.sendStatus).to.have.been.calledWith(204);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});