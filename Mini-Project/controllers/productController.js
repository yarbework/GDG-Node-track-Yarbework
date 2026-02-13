const Product = require('../models/Product');
const { productVal } = require('../utils/validation');

exports.getAllProducts = async (req, res, next) => {
    try{
        const {category, minPrice, maxPrice} = req.query;
        let query ={};
        if(category) query.category = category;
        if(minPrice || maxPrice) {
            query.price = {};
            if(minPrice) query.price.$gte = Number(minPrice);
            if(maxPrice) query.price.$lte = Number(maxPrice);

        }
        const products = await Product.find(query);
        res.status(200).json(products);
    }catch(err){
        next(err);
    }
};

exports.createProduct = async (req, res, next) => {
    try{
        const {error} = productVal.validate(req.body);

        if(error) return res.status(400).json({message: error.details[0].message});

        const newProduct = await Product.create(req.body);

        res.status(201).json(newProduct);

    }catch(err){
        next(err);
    }
};
exports.getProductsById = async (req, res, next) => {
    try{
        const product = await Product.findById(req.params.id);
        if(!product) return res.status(404).json({message: 'Product not found'});
        res.status(200).json(product);
    }catch(err){
        next(err);
    }
}
exports.updateProduct = async (req, res, next) => {
    try{
        const {error} = productVal.validate(req.body);
        if(error) return res.status(400).json({message: error.details[0].message});
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!updatedProduct) return res.status(404).json({message: 'Product not found'});
        res.status(200).json(updatedProduct);
        
    }catch(err){
        next(err);
    }
}
exports.deleteProduct = async (req, res, next) => {
    try{
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if(!deletedProduct) return res.status(404).json({message: 'Product not found'});
        res.status(200).json({message: 'Product deleted successfully'});

    }catch(err){
        next(err);
    }
}

