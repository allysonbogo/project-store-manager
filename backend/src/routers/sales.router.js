const { Router } = require('express');
const { salesController } = require('../controllers');
const validateSale = require('../middlewares/validate.sale');
const validateUpdateSale = require('../middlewares/validate.update.sale');

const router = Router();

router.get('/', salesController.findAll);

router.get('/:id', salesController.findById);

router.post('/', validateSale, salesController.createSale);

router.delete('/:id', salesController.deleteSale);

router.put('/:saleId/products/:productId/quantity', validateUpdateSale, salesController.updateSale);

module.exports = router;