const { Router } = require('express')
const {
  addToCartController,
  getUserCartController,
  updateItemUserCartController,
  deleteItemUserCartController,
  countUserCartController,
  deleteUserCartController
} = require('../controllers/cartController')

const router = Router()

router
  .get('/', getUserCartController)
  .get('/count-user-cart', countUserCartController)
  .post('/', addToCartController)
  .post('/update', updateItemUserCartController)
  .delete('/delete-user-cart', deleteUserCartController)
  .delete('/:productId', deleteItemUserCartController)

module.exports = router
