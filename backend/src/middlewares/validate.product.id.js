const { productsModel } = require('../models');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const products = await productsModel.findAll();
  const productsIds = products.map((p) => p.id);

  if (!productsIds.includes(+id)) {
    return res.status(404).json({ message: 'Product not found' }); 
  }
  
  return next();
};