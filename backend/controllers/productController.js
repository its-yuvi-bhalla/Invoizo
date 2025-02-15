import Product from '../models/productsSchema.js'
import mongoose from 'mongoose'


export const getProducts = async (req,res) => {
    const products = await Product.find()
    res.status(200).json(products)
}

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid Customer ID format" })
        }

        const product = await Product.findById(id)

        if (!product) {
            const status = 404
            return res.status(status).json({ 
                message: `Product Not Found with id : ${id}`,
                status: status 
            })
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ error: "Server Error" })
    }
}

export const createProduct = async (req, res) => {
    try {
        const { name, price, description, stock, sku, category, supplier, discount } = req.body

        // Validate required fields
        if (!name || !price || !stock) {
            return res.status(400).json({ error: 'Name, price and stock are required' })
        }

        const existingProduct = await Product.findOne({ sku })
        if (existingProduct) {
            return res.status(400).json({ error: 'Product with this SKU already exists' })
        }

        const calculatedPriceAfterDiscount = price - discount

        const newProduct = new Product({
            name,
            price ,
            discount: discount || 0,
            priceAfterDiscount : discount?calculatedPriceAfterDiscount:price , 
            description,
            stock,
            sku,
            category,
            supplier
        })

        await newProduct.save()
        res.status(201).json({ message: 'Product created successfully', product: newProduct })
    } catch (error) {
        console.error('Error creating product:', error)
        res.status(500).json({ error: 'Server Error' })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params
        const updateData = req.body

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid Product ID format" })
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true, runValidators: true })

        if (!updatedProduct) {
            return res.status(404).json({ error: "Product Not Found" })
        }

        res.status(200).json({
            product: updatedProduct
        })
    } catch (error) {
        console.error("Error updating product:", error)
        res.status(500).json({ error: "Server Error" })
    }
}

export const deleteProduct = async (req,res) => {

    try {
        const { id } = req.params
        const product = await Product.findById(id)

        if (!product) {
            const status = 404
            return res.status(status).json({ 
                message: `Product Not Found with id : ${id}`,
                status: status 
            })
        }
        else{
            await Product.findByIdAndDelete(id)
            res.status(200).json(await Product.find())
        }
    } catch (error) {
        res.status(500).json({ error: "Server Error" })
    }
}