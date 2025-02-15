import Invoices from "../models/InvoicesSchema.js"
import Product from '../models/productsSchema.js'
import Customer from '../models/customersSchema.js'
import mongoose from "mongoose"

export const getInvoices = async (req,res) => {
    const invoices  = await Invoices.find()
    res.status(200).json(invoices)
}

export const getInvoiceById = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid Invoice ID format" })
        }

        const invoice = await Invoices.findById(id)

        if (!invoice) {
            const status = 404
            return res.status(status).json({ 
                message: `Invoice Not Found with id : ${id}`,
                status: status 
            })
        }
        res.status(200).json(invoice)
    } catch (error) {
        res.status(500).json({ error: "Server Error" })
    }
}



export const createInvoice = async (req, res) => {
    try {
        const { invoiceNumber, customerId, products = [] } = req.body
        if (!invoiceNumber || !customerId) {
            return res.status(400).json({ error: 'Invoice number and customer ID are required' })
        }

        const existingInvoiceNumber = await Invoices.findOne({invoiceNumber})
        if(existingInvoiceNumber){
            return res.status(400).json({ error: `Invoice number ${existingInvoiceNumber.invoiceNumber} exists already`})
        }
        const customer = await Customer.findById(customerId)
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' })
        }
        let totalAmount = 0
        const invoiceProducts = []
        if (products.length > 0) {
            for (const item of products) {
                const product = await Product.findById(item.productId)
                if (!product) {
                    return res.status(404).json({ error: `Product with ID ${item.productId} not found` })
                }

                const totalProductPrice = product.price * item.quantity
                totalAmount += totalProductPrice

                invoiceProducts.push({
                    product: product._id,
                    quantity: item.quantity,
                    price: product.price
                })
            }
        }

    
        const newInvoice = new Invoices({
            invoiceNumber,
            customer: customerId,
            products: invoiceProducts,
            totalAmount,
            status: 'Pending'
        })

        await newInvoice.save()
        res.status(201).json({ message: 'Invoice created successfully', invoice: newInvoice })

    } catch (error) {
        console.error('Error creating invoice:', error)
        res.status(500).json({ error: 'Server Error' })
    }
}


export const updateInvoice = async (req, res) => {
    try {
        const { id } = req.params
        const updateData = req.body

        const validStatus = ['Pending','Paid']

        if(req.body.status !== validStatus[0] && req.body.status !== validStatus[1]){
            return res.status(400).json({ StatusError: "Status should be Pending or Paid" })   
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid Invoice ID format" })
        }

        const invoice = await Invoices.findById(id)
        if (!invoice) {
            return res.status(404).json({ error: "Invoice Not Found" })
        }

        if (updateData.products && Array.isArray(updateData.products)) {
            let totalAmount = 0
            const updatedProducts = []

            for (const item of updateData.products) {
                const product = await Product.findById(item.product)

                if (!product) {
                    return res.status(404).json({ error: `Product with ID ${item.product} not found` })
                }

                const totalProductPrice = product.price * item.quantity
                totalAmount += totalProductPrice

                updatedProducts.push({
                    product: product._id,
                    quantity: item.quantity,
                    price: product.price 
                })
            }

            updateData.products = updatedProducts
            updateData.totalAmount = totalAmount 
        }

        const updatedInvoice = await Invoices.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        )

        res.status(200).json({
            message: "Invoice updated successfully",
            invoice: updatedInvoice
        })

    } catch (error) {
        console.error("Error updating invoice:", error)
        res.status(500).json({ error: "Server Error" })
    }
}

export const deleteInvoice = async (req,res) => {

    try {
        const { id } = req.params
        const invoice = await Invoices.findById(id)

        if (!invoice) {
            const status = 404
            return res.status(status).json({ 
                message: `Invoice Not Found with id : ${id}`,
                status: status 
            })
        }
        else{
            await Invoices.findByIdAndDelete(id)
            res.status(200).json(await Invoices.find())
        }
    } catch (error) {
        res.status(500).json({ error: "Server Error" })
    }
}