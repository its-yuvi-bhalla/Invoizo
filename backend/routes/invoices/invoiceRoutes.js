import express from 'express'
const router = express.Router()
import {getInvoices , createInvoice, getInvoiceById, deleteInvoice} from '../../controllers/invoicesController.js'

router.get('/', getInvoices)
router.get('/:id', getInvoiceById) 
router.post('/create', createInvoice)
router.delete('/:id', deleteInvoice)


export default router