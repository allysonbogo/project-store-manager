const { nameSchema, saleSchema } = require('./schemas');

const validateName = (name) => {
  const { error } = nameSchema.validate({ name });
  if (error) return { message: error.message };
  
  return { message: null };
};

const validateSale = (product) => {
  const { error } = saleSchema.validate(product);
  if (error) return { message: error.message.replace(/\[\d\]./, '') };

  return { message: null };
};

module.exports = {
  validateName,
  validateSale,
};