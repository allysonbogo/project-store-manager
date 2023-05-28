const { Router } = require('express');
const { salesController } = require('../controllers');
const validateNewSale = require('../middlewares/validateNewSale');
const validateNewSaleIds = require('../middlewares/validateNewSaleIds');

const router = Router();

router.get('/', salesController.findAll);

router.get('/:id', salesController.findById);

router.post('/', validateNewSale, validateNewSaleIds, salesController.createSale);

module.exports = router;