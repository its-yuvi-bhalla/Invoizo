import express from 'express'
const router = express.Router()
import {getInvoices , createInvoice, getInvoiceById, deleteInvoice, updateInvoice} from '../../controllers/invoicesController.js'

router.get('/', getInvoices)
router.get('/:id', getInvoiceById) 
router.post('/', createInvoice)
router.put('/:id', updateInvoice)
router.delete('/:id', deleteInvoice)


export default router