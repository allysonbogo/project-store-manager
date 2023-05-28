const { productsModel } = require('../models');

module.exports = async (req, res, next) => {
  const product = req.body;
  const products = await productsModel.findAll();
  const productsIds = Object.values(products).map((p) => p.id);

  if (product.some((p) => !Object.keys(p)
  .includes('productId'))) return res.status(400).json({ message: '"productId" is required' });
  if (product.some((p) => !Object.keys(p)
  .includes('quantity'))) return res.status(400).json({ message: '"quantity" is required' });
  if (product.every((p) => p.productId > 0 && p.quantity > 0)
  // && product.every((p) => p.quantity > 0)
  && !product.every((p) => productsIds.includes(p.productId))) {
  return res.status(404).json({ message: 'Product not found' }); 
  }
  
  return next();
};