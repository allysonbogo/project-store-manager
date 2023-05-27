const { salesModel } = require('../models');
const schema = require('./validations/valuesValidations');

const findAll = async () => {
  const result = await salesModel.findAll();
  return result;
};

const findById = async (id) => {
  const result = await salesModel.findById(id);
  if (result.length === 0) return { message: 'Sale not found' };
  return result;
};

const createSale = async (sale) => {
  const error = schema.validateSale(sale);
  if (error.message) return error;
  const saleId = await salesModel.createSaleId();
  const salePromisse = sale.map((s) => salesModel.createSale(saleId, s.productId, s.quantity));
  const saleResult = await Promise.all(salePromisse);
  const object = {
    id: saleId,
    itemsSold: saleResult,
  };
  return object;
};

module.exports = { findAll, findById, createSale };