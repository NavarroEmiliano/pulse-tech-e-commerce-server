const { Router } = require('express')
const {
  addToCartController,
  getUserCartController
} = require('../controllers/cartController')

const router = Router()

router
      .get('/', getUserCartController)
      .post('/', addToCartController)

module.exports = router
