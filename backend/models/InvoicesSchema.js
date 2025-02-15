import mongoose from 'mongoose'

const InvoiceSchema = new mongoose.Schema({
    invoiceNumber: { type: String, required: true, unique: true }, 
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true } 
        }
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ['Pending', 'Paid'], default: 'Pending' }
})

export default mongoose.model('Invoice', InvoiceSchema)
