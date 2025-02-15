import express from 'express'
const router = express.Router()
import {getCustomers, createCustomer , getCustomerById, deleteCustomer , updateCustomer} from '../../controllers/customerController.js' 


router.get('/', getCustomers)
router.get('/:id', getCustomerById)
router.post('/', createCustomer)
router.put('/:id', updateCustomer)
router.delete('/:id', deleteCustomer)

export default router