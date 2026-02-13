const Order = require('../models/Order');
const {orderVal} = require('../utils/validation');
const Product = require('../models/Product');
const Cart = require('../models/Cart');

exports.placeOrder = async (req, res, next) => {
    try{
        const {error} = orderVal.validate(req.body);
        if(error){ 
            return res.status(400).json({message: error.details[0].message})
        }
        
        const cart = await Cart.findOne().populate('items.productId');

        if(!cart || cart.items.length === 0) return res.status(400).json({message: 'Cart is empty'});

        let totalPrice = 0;

        for (let item of cart.items) {
            if(!item.productId) return res.status(404).json({message: `Product with ID ${item.productId} not found`});

            if(item.productId.stock < item.quantity) {
                return res.status(400).json({message: `Insufficient stock for product ${item.productId.name}`});

            }
            totalPrice += item.productId.price * item.quantity;
        }

        for (let item of cart.items){
            await Product.findByIdAndUpdate(item.productId._id, {$inc: {stock: -item.quantity}});
        }
        
        const order = await Order.create({
            items: cart.items.map(item => ({
                productId: item.productId._id,
                name: item.productId.name,
                price: item.productId.price,
                quantity: item.quantity
            })),
            totalPrice,
            customerInfo: req.body.customerInfo,
            orderDate: new Date()
        })

        await Cart.findByIdAndDelete(cart._id);
        res.status(201).json(order);
    }catch(err){
        next(err);
    }
}

exports.getOrders = async (req, res, next) => {
    try{
        const orders = await Order.find().populate('items.productId');
        if(!orders || orders.length === 0){
            return res.status(404).json({message: 'No orders found'});
        }
        res.status(200).json(orders);

    }catch(err){
                next(err);
    }
};

exports.getOrderById = async (req, res, next) => {

    try{
        const order = await Order.findById(req.params.id).populate('items.productId');
        if(!order) return res.status(404).json({message: 'Order not found'});
        res.status(200).json(order);

    }catch(err){
        next(err);
    }
};
exports.deleteOrder = async (req, res, next) => {
    try{
        const order = await Order.findByIdAndDelete(req.params.id);
        if(!order) return res.status(404).json({message: 'Order not found'});
        res.status(200).json({message: 'Order deleted successfully'});
    }catch(err){
        next(err);
    }
}; 