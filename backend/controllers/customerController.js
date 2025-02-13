import Customer from "../models/customersSchema.js"

export const getCustomers = async (req,res) => {
    const customers = await Customer.find()
    res.status(200).json(customers)
}


export const createCustomer = async (req, res) => {
    try {
        const { name, email, phone, address, company, taxId, notes } = req.body

        // Validate required fields
        if (!name || !email || !phone || !address) {
            return res.status(400).json({ error: 'Name, Email, Phone, and Address are required' })
        }

        // Check if email already exists
        const existingCustomer = await Customer.findOne({ email })
        if (existingCustomer) {
            return res.status(400).json({ error: 'Customer with this email already exists' })
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
