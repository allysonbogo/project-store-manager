const { Router } = require('express');
const { productsController } = require('../controllers');
const validateUpdateProduct = require('../middlewares/validateUpdateProduct');

const router = Router();

router.get('/', productsController.findAll);

router.get('/:id', productsController.findById);

router.post('/', productsController.createProduct);

router.put('/:id', validateUpdateProduct, productsController.updateProduct);

module.exports = router;