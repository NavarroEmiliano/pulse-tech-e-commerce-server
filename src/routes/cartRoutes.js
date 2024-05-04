const { Router } = require('express')
const {
  addToCartController,
  getUserCartController,
  updateItemUserCartController,
  deleteItemUserCartController
} = require('../controllers/cartController')

const router = Router()

router
      .get('/', getUserCartController)
      .post('/', addToCartController)
      .post('/update', updateItemUserCartController)
      .delete('/:productId',deleteItemUserCartController )

module.exports = router
