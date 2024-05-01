const { Router } = require('express')
const router = Router()
const authToken = require('../middleware/authToken')
const {
  createNewProductController,
  getAllProductsController,
  updateProductController,
  getProductsByCategoryController
} = require('../controllers/productController')

router
  .get('/', getAllProductsController)
  .get('/category/:categoryName', getProductsByCategoryController)
  .post('/', authToken, createNewProductController)
  .put('/:id', authToken, updateProductController)

module.exports = router

/*
.get('/:id', authToken, getOneUserController)
.delete('/:id', authToken, deleteUserController) */
