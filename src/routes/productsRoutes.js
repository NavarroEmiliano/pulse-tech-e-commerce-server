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
  getAllCategoriesController,
  deleteProductController,
  searchProductsController
} = require('../controllers/productController')

router
  .get('/', getAllProductsController)
  .get('/search', searchProductsController)
  .get('/all-brands', getAllBrandsController)
  .get('/one-per-category', getOneProductPerCategoryController)
  .get('/all-categories', getAllCategoriesController)
  .get('/category/:categoryName', getProductsByCategoryController)
  .get('/:productId', getOneProductController)
  .post('/', authToken, createNewProductController)
  .put('/:id', authToken, updateProductController)
  .delete('/:productId', authToken, deleteProductController)

module.exports = router
