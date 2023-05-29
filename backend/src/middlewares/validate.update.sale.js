const { salesModel } = require('../models');

module.exports = async (req, res, next) => {
  const { saleId, productId } = req.params;
  const { quantity } = req.body;
  const sales = await salesModel.findById(saleId);
  const productsIds = sales.map((p) => p.productId);

  if (sales.length === 0) return res.status(404).json({ message: 'Sale not found' });

  if (!quantity && quantity !== 0) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  if (!productsIds.includes(+productId)) {
    return res.status(404).json({ message: 'Product not found in sale' }); 
  }
  
  return next();
};