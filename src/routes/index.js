const {Router} = require('express');
const router = Router()
const Product = require('../models/product');

router.get('/', async (req, res)=>{
    const products = await Product.find();
    res.render('index', {
        products
    })
})

router.get('/product/:id', async(req, res)=>{
    const {id} = req.params;
    const product = await Product.findById(id);
    res.render('product', {
        product
    })
})

router.post('/search', async(req, res)=>{
    const {valor} = req.body;
    const reg = await Product.find({$or: [{'name': new RegExp(valor, 'i')}, {'gender': new RegExp(valor, 'i')}, {'category': new RegExp(valor, 'i')}]})
    if(reg.length === 0){
        res.render('error')
    } else {
        res.render('search', {
            reg
        })
    }
})

router.get('/category/hombre', async(req, res)=>{
    const reg = await Product.find({gender: 'HOMBRE'})
    res.render('products', {
        reg
    })
})

router.get('/category/mujer', async(req, res)=>{
    const reg = await Product.find({gender: 'MUJER'})
    res.render('products', {
        reg
    })
})

router.post('/add', async (req, res)=>{
    const product = new Product(req.body);
    await product.save();
    console.log(product)
    res.status(200).json({
        "message": "Producto añadido"
    })
})

module.exports = router;