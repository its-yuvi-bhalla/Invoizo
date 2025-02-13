import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    stock: { type: Number, required: true },
    sku: { type: String, unique: true, required: true }, 
    category: { type: String, required: true }, 
    supplier: { type: String }, 
    discount: { type: Number, default: 0 } 
})

export default mongoose.model('Product', ProductSchema)
