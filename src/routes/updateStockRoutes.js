const { Router } = require('express')

const {
  updateStockController
} = require('../controllers/updateStockController')

const router = Router()

router.post('/', updateStockController)

module.exports = router
