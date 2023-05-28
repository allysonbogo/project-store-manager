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

// const createSale = async (product) => {
//   for (let index = 0; index < product.length; index += 1) {
//     const error = schema.validateSale(product[index]);
//     if (error.message) return error;
//   }
//   const saleId = await salesModel.createSaleId();
//   const salePromisse = product.map((p) => salesModel.createSale(saleId, p.productId, p.quantity));
//   const saleResult = await Promise.all(salePromisse);
//   const object = {
//     id: saleId,
//     itemsSold: saleResult,
//   };
//   return object;
// };

const createSale = async (product) => {
  const error = schema.validateSale(product);
  if (error.message) return error;
  const saleId = await salesModel.createSaleId();
  const salePromisse = product.map((p) => salesModel.createSale(saleId, p.productId, p.quantity));
  const saleResult = await Promise.all(salePromisse);
  const object = {
    id: saleId,
    itemsSold: saleResult,
  };
  return object;
};

module.exports = { findAll, findById, createSale };