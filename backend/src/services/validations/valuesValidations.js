const { nameSchema } = require('./schemas');

const validateName = (name) => {
  const { error } = nameSchema.validate({ name });
  if (error) return { message: error.message };
  
  return { message: null };
};

module.exports = {
  validateName,
};