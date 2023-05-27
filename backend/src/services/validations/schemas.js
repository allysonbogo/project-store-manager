const Joi = require('joi');

const nameSchema = Joi.object({
  name: Joi.string().min(5).required(),
});

const saleProductsSchema = Joi.object({
  productId: Joi.number().min(1).required(),
  quantity: Joi.number().min(1).required(),
});

const saleSchema = Joi.array().items(saleProductsSchema);

module.exports = {
  nameSchema,
  saleSchema,
};