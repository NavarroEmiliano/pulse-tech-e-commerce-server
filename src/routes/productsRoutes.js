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
  .post('/', authToken, createNewProductController)
  .put('/:id', authToken, updateProductController)
  .get('/by-category', getProductsByCategoryController)

module.exports = router

/*
.get('/:id', authToken, getOneUserController)
.delete('/:id', authToken, deleteUserController) */
