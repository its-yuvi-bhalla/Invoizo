import express from 'express'
const router = express.Router()
import { getProducts, createProduct} from '../../controllers/productController.js'

router.get('/', getProducts) 
router.post('/create', createProduct)


export default router