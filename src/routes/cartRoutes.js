const { Router } = require('express')
const {
  addToCartController,
  getUserCartController,
  updateItemUserCartController,
  deleteItemUserCartController,
  countUserCartController
} = require('../controllers/cartController')

const router = Router()

router
      .get('/', getUserCartController)
      .get('/count-user-cart', countUserCartController)
      .post('/', addToCartController)
      .post('/update', updateItemUserCartController)
      .delete('/:productId',deleteItemUserCartController )

module.exports = router
