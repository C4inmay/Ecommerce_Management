const express = require('express')
const { asyncHandler } = require('../middleware/asyncHandler')
const storeController = require('../controllers/storeController')

const router = express.Router()

router.get('/products', asyncHandler(storeController.listProducts))
router.get('/products/:id', asyncHandler(storeController.showProduct))
router.get('/categories', asyncHandler(storeController.listCategories))
router.get('/customers', asyncHandler(storeController.listCustomers))
router.get('/orders', asyncHandler(storeController.listOrders))
router.get('/orders/:id', asyncHandler(storeController.showOrder))

module.exports = router