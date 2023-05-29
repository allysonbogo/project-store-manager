const { productsService } = require('../services');

const findAll = async (req, res) => {
  const result = await productsService.findAll();
  res.status(200).json(result);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const result = await productsService.findById(id);
  if (result.message) return res.status(404).json(result);
  res.status(200).json(result);
};

const createProduct = async (req, res) => {
  const { name } = req.body;
  const result = await productsService.createProduct(name);
  if (!name) return res.status(400).json(result);
  if (result.message) return res.status(422).json(result);
  res.status(201).json(result);
};

const updateProduct = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  const result = await productsService.updateProduct(name, id);
  if (result.message) return res.status(422).json(result);
  res.status(200).json(result);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  await productsService.deleteProduct(id);
  res.sendStatus(204);
};

module.exports = { findAll, findById, createProduct, updateProduct, deleteProduct };