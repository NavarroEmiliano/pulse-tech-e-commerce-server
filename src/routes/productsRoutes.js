const { Router } = require('express')
const router = Router()
const authToken = require('../middleware/authToken')
const {
  createNewProductController,
  getAllProductsController
} = require('../controllers/productController')

router.get('/',getAllProductsController)
      .post('/', authToken, createNewProductController)

module.exports = router

/*
.get('/:id', authToken, getOneUserController)
.put('/:id', authToken, updateUserController)
.delete('/:id', authToken, deleteUserController) */
