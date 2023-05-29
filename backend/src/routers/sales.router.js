const { Router } = require('express');
const { salesController } = require('../controllers');
const validateSale = require('../middlewares/validate.sale');

const router = Router();

router.get('/', salesController.findAll);

router.get('/:id', salesController.findById);

router.post('/', validateSale, salesController.createSale);

module.exports = router;