const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    
    items:[{
        productId: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true,
        },
        name:{
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        }

    }],
    totalPrice: {
        type: Number,
        required: true
    },
    customerInfo: {
        name: {
            type: String,  
            required: true
        },
        email: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        }
    },
    orderDate: {
        type: Date,
        default: Date.now
    }
    })

module.exports = mongoose.model('Order', orderSchema);