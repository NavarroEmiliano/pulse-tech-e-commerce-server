const { Router } = require('express')
const {
  addToCartController,
  getUserCartController,
  updateItemUserCartController
} = require('../controllers/cartController')

const router = Router()

router
      .get('/', getUserCartController)
      .post('/', addToCartController)
      .post('/update', updateItemUserCartController)

module.exports = router
