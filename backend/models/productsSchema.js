import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 } ,
    priceAfterDiscount: { type: Number, required: true },
    description: { type: String },
    stock: { type: Number, required: true },
    sku: { type: String, unique: true}, 
    category: { type: String}, 
    supplier: { type: String }
})

export default mongoose.model('Product', ProductSchema)
