const { productsModel } = require('../models');

module.exports = async (req, res, next) => {
  const product = req.body;
  const products = await productsModel.findAll();
  const productsIds = Object.values(products).map((p) => p.id);

  console.log(productsIds);

  if (product.every((p) => p.productId > 0 && p.quantity > 0)
    // && product.every((p) => p.quantity > 0)
    && !product.every((p) => productsIds.includes(p.productId))) {
    return res.status(404).json({ message: 'Product not found' }); 
  }
  
  return next();
};