import dotenv from 'dotenv'
dotenv.config() 
import express from 'express'
import cors from 'cors'
import connectDB from './config/db.js'
import invoiceRoutes from './routes/invoices/invoiceRoutes.js'
import customerRoutes from './routes/customers/customerRoutes.js'
import productRoutes from './routes/products/productRoutes.js'
import logger from './middleware/logger.js'
const app = express()
app.use(express.json()) 
app.use(logger)
app.use(cors())
connectDB()

const PORT = process.env.PORT


app.use('/api/invoices', invoiceRoutes)
app.use('/api/customers', customerRoutes)
app.use('/api/products', productRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port : ${PORT}`)
})


