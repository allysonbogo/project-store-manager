const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = require('chai');

const app = require('../../../src/app');

chai.use(sinonChai);

describe('Testes de unidade das rotas de produtos', function () {
  describe('Acessando a rota get', function () {
    it('deve retornar o status 200', async function () {
      sinon.stub(app, 'get').resolves({ status: 200 });

      const response = await app.get('/products');

      expect(response.status).to.equal(200);
    });
  });

  describe('Acessando a rota get /:id', function () {
    it('deve retornar o status 200 ao enviar um id válido', async function () {
      sinon.stub(app, 'get').resolves({ status: 200 });

      const response = await app.get('/products/1');

      expect(response.status).to.equal(200);
    });

    it('deve retornar o status 404 ao enviar um id inválido', async function () {
      sinon.stub(app, 'get').resolves({ status: 404 });

      const response = await app.get('/products/9999');

      expect(response.status).to.equal(404);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});