const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment');
const { verifyAdmin } = require('../middleware/auth');

router.get('/', verifyAdmin, paymentController.getAllPayments);
router.get('/:id', verifyAdmin, paymentController.getPaymentById);
router.post('/', paymentController.createPayment); // stays public — this is what a future Paystack flow will call

module.exports = router;