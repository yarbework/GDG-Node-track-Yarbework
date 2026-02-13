const express = require('express');
const router = express.Router();
const {getOrderById, getOrders, placeOrder, deleteOrder} = require('../controllers/orderController');


router.get('/', getOrders);
router.post('/', placeOrder);
router.get('/:id', getOrderById);
router.delete('/:id', deleteOrder);

module.exports = router;