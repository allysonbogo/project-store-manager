const { Router } = require('express');
const { productsController } = require('../controllers');
const validateProductName = require('../middlewares/validate.product.name');
const validateProductId = require('../middlewares/validate.product.id');

const router = Router();

router.get('/', productsController.findAll);

router.get('/search', productsController.findByName);

router.get('/:id', productsController.findById);

router.post('/', productsController.createProduct);

router.put('/:id', validateProductName, validateProductId, productsController.updateProduct);

router.delete('/:id', validateProductId, productsController.deleteProduct);

module.exports = router;