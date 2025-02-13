import express from 'express'
const router = express.Router()
import {getCustomers, createCustomer} from '../../controllers/customerController.js' 


router.get('/', getCustomers)
router.post('/create', createCustomer)

export default router