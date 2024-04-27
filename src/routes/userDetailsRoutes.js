const { Router } = require('express')
const {
  getUserDetailsController
} = require('../controllers/userDetailsController')

const router = Router()

router.get('/', getUserDetailsController)

module.exports = router
