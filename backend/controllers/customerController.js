import Customer from "../models/customersSchema.js"
import mongoose from 'mongoose'

export const getCustomers = async (req,res) => {
    const customers = await Customer.find()
    res.status(200).json(customers)
}

export const updateCustomer = async (req, res) => {
    try {
        const { id } = req.params
        const updateData = req.body

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid Customer ID format" })
        }

        const updatedCustomer = await Customer.findByIdAndUpdate(id, updateData, { new: true, runValidators: true })

        if (!updatedCustomer) {
            return res.status(404).json({ error: "Customer Not Found" })
        }

        res.status(200).json({
            customer: updatedCustomer
        })
    } catch (error) {
        console.error("Error updating customer:", error)
        res.status(500).json({ error: "Server Error" })
    }
}

export const getCustomerById = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid Customer ID format" })
        }

        const customer = await Customer.findById(id)

        if (!customer) {
            const status = 404
            return res.status(status).json({ 
                message: `Customer Not Found with id : ${id}`,
                status: status 
            })
        }
        res.status(200).json(customer)
    } catch (error) {
        res.status(500).json({ error: "Server Error" })
    }
}


export const createCustomer = async (req, res) => {
    try {
        const { name, email, phone, address, company, taxId, notes } = req.body

        // Validate required fields
        if (!name || !email || !phone) {
            return res.status(400).json({ error: 'Name, Email, and Phone are required' })
        }

        // Check if email already exists
        const existingCustomer = await Customer.findOne({ email, phone })
        if (existingCustomer) {
            return res.status(400).json({ error: 'Customer with these credentials already exists' })
        }

        // Create new customer
        const newCustomer = new Customer({
            name,
            email,
            phone,
            address,
            company,
            taxId,
            notes
        })

        await newCustomer.save()
        res.status(201).json({ message: 'Customer created successfully', customer: newCustomer, customerId: newCustomer._id })
    } catch (error) {
        console.error('Error creating customer:', error)
        res.status(500).json({ error: 'Server Error', error })
    }
}


export const deleteCustomer = async (req,res) => {

    try {
        const { id } = req.params
        const customer = await Customer.findById(id)

        if (!customer) {
            const status = 404
            return res.status(status).json({ 
                message: `Customer Not Found with id : ${id}`,
                status: status 
            })
        }
        else{
            await Customer.findByIdAndDelete(id)
            res.status(200).json(await Customer.find())
        }
    } catch (error) {
        res.status(500).json({ error: "Server Error" })
    }
}