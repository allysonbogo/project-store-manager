const { productsModel } = require('../models');
const schema = require('./validations/valuesValidations');

const findAll = async () => {
  const result = await productsModel.findAll();
  return result;
};

const findById = async (id) => {
  const result = await productsModel.findById(id);
  if (!result) return { message: 'Product not found' };
  return result;
};

const createProduct = async (name) => {
  const error = schema.validateName(name);
  if (error.message) return error;
  const newProductId = await productsModel.createProduct(name);
  const newProduct = await productsModel.findById(newProductId);
  return newProduct;
};

const updateProduct = async (name, productId) => {
  const error = schema.validateName(name);
  if (error.message) return error;
  await productsModel.updateProduct(name, productId);
  const updatedProduct = await productsModel.findById(productId);
  return updatedProduct;
};

module.exports = { findAll, findById, createProduct, updateProduct };