const { Router } = require('express')
const router = Router()
const authToken = require('../middleware/authToken')
const {
  createNewProductController,
  getAllProductsController,
  updateProductController,
  getProductsByCategoryController,
  getOneProductController,
  getOneProductPerCategoryController,
  getAllBrandsController,
  getAllCategoriesController
} = require('../controllers/productController')

router
  .get('/', getAllProductsController)
  .get('/category/:categoryName', getProductsByCategoryController)
  .get('/one-per-category', getOneProductPerCategoryController)
  .get('/all-brands',getAllBrandsController)
  .get('/all-categories',getAllCategoriesController)
  .get('/:productId', getOneProductController)
  .post('/', authToken, createNewProductController)
  .put('/:id', authToken, updateProductController)

module.exports = router

/*
.delete('/:id', authToken, deleteUserController) */
