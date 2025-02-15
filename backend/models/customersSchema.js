import mongoose from 'mongoose'

const CustomerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String},
    company: { type: String }, 
    taxId: { type: String, unique: true },
    notes: { type: String } 
})


export default mongoose.model('Customer', CustomerSchema)
