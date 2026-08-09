const storeService = require('../services/storeService')

async function listProducts(_request, response) {
  const products = await storeService.getProducts()
  response.status(200).json(products)
}

async function showProduct(request, response) {
  const product = await storeService.getProductById(request.params.id)
  response.status(200).json(product)
}

async function listCategories(_request, response) {
  const categories = await storeService.getCategories()
  response.status(200).json(categories)
}

async function listCustomers(_request, response) {
  const customers = await storeService.getCustomers()
  response.status(200).json(customers)
}

async function listOrders(_request, response) {
  const orders = await storeService.getOrders()
  response.status(200).json(orders)
}

async function showOrder(request, response) {
  const order = await storeService.getOrderById(request.params.id)
  response.status(200).json(order)
}

module.exports = {
  listProducts,
  showProduct,
  listCategories,
  listCustomers,
  listOrders,
  showOrder,
}
