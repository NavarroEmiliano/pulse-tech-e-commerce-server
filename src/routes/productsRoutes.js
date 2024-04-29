const { Router } = require('express')
const router = Router()
const authToken = require('../middleware/authToken')
const {
  createNewProductController,
  getAllProductsController,
  updateProductController
} = require('../controllers/productController')

router.get('/',getAllProductsController)
      .post('/', authToken, createNewProductController)
      .put('/:id', authToken, updateProductController)

module.exports = router

/*
.get('/:id', authToken, getOneUserController)
.delete('/:id', authToken, deleteUserController) */
