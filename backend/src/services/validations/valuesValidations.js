const { nameSchema, saleSchema } = require('./schemas');

const validateName = (name) => {
  const { error } = nameSchema.validate({ name });
  if (error) return { message: error.message };
  
  return { message: null };
};

const validateSale = (sale) => {
  const { error } = saleSchema.validate(sale);
  if (error) return { message: error.message };
  
  return { message: null };
};

module.exports = {
  validateName,
  validateSale,
};