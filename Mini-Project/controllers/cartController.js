const Cart = require('../models/Cart');

exports.getCart = async (req, res, next) => {
    try{
        const cart = await Cart.findOne();
        if(!cart) return res.status(404).json({message: 'Cart not found'});
        res.status(200).json(cart);
    }catch(err){
        next(err);
    }
}
exports.addToCart = async (req, res, next) => {
    try{
        const {productId, quantity} = req.body;

        const product = await Product.findById(productId);

        if(!product) return res.status(404).json({message: 'Product not found'});

        if(product.stock <quantity) return res.status(400).json({message: 'Insufficient stock'});

        let cart = await Cart.findOne();
        if(!cart) {
            cart = new Cart({
                items: [{productId, quantity, name: product.name, price: product.price}],
                totalPrice: quantity * product.price
            });
        }else{
            const itemIndex = cart.items.findIndex(p => p.productId.toString() === productId);
            if(itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            }else{
                cart.items.push({productId, quantity, name: product.name, price: product.price});
            }
            cart.totalPrice += (quantity * product.price);
        }
        await cart.save();
        res.status(200).json(cart);
    }catch(err){
        next(err);
    }
}
exports.updateCartItem = async (req, res, next) => {
    try{
        const {productId, quantity} = req.body;
        const cart = await Cart.findOne();
        if(!cart) return res.status(404).json({message: 'Cart not found'});
        const item = cart.items.find(i => i.productId === productId);
        if(!item) return res.status(404).json({message: 'Item not found in cart'});
        cart.totalPrice -= item.quantity * item.price;
        item.quantity = quantity;
        cart.totalPrice += quantity * item.price;
        await cart.save();
        res.status(200).json(cart);
    }catch(err){
        next(err);
    }   
}
exports.removeFromCart = async (req, res, next) => {
    try{
        const {productId} = req.body;
        const cart = await Cart.findOne();
        if(!cart) return res.status(404).json({message: 'Cart not found'});
        const itemIndex = cart.items.findIndex(i => i.productId === productId);
        if(itemIndex === -1) return res.status(404).json({message: 'Item not found in cart'});
        const item = cart.items[itemIndex];
        cart.totalPrice -= item.quantity * item.price;
        cart.items.splice(itemIndex, 1);
        await cart.save();
        res.status(200).json(cart);
    }catch(err){
        next(err);
    }  
}