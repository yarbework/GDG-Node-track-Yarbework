const express = require('express');
const router = express.Router();
const {getCart, addToCart, removeFromCart, updateCartItem} = require('../controllers/cartController');

router.get('/', getCart);
router.post('/', addToCart);
router.put('/:id', updateCartItem);
router.delete('/:productId', removeFromCart);

module.exports = router;