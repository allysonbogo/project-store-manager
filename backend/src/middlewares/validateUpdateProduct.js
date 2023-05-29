const { productsModel } = require('../models');

module.exports = async (req, res, next) => {
  const { name } = req.body;
  const { id } = req.params;

  const products = await productsModel.findAll();
  const productsIds = Object.values(products).map((p) => p.id);

  if (!name) return res.status(400).json({ message: '"name" is required' });
  if (!productsIds.includes(+id)) {
    return res.status(404).json({ message: 'Product not found' }); 
  }
  
  return next();
};