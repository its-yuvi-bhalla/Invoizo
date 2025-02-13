import Product from '../models/productsSchema.js'


export const getProducts = async (req,res) => {
    const products = await Product.find()
    res.status(200).json(products)
}

export const createProduct = async (req, res) => {
    try {
        const { name, price, description, stock, sku, category, supplier, discount } = req.body

        // Validate required fields
        if (!name || !price || !stock || !sku || !category) {
            return res.status(400).json({ error: 'Name, price, stock, SKU, and category are required' })
        }

        // Check if product SKU already exists
        const existingProduct = await Product.findOne({ sku })
        if (existingProduct) {
            return res.status(400).json({ error: 'Product with this SKU already exists' })
        }

        // Create new product
        const newProduct = new Product({
            name,
            price,
            description,
            stock,
            sku,
            category,
            supplier,
            discount: discount || 0 // Default discount is 0 if not provided
        })

        await newProduct.save()
        res.status(201).json({ message: 'Product created successfully', product: newProduct })
    } catch (error) {
        console.error('Error creating product:', error)
        res.status(500).json({ error: 'Server Error' })
    }
}
