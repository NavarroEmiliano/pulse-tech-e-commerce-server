const { Router } = require('express')
const {
  getUserDetailsController
} = require('../controllers/userDetailsController')

const router = Router()

router.post('/', getUserDetailsController)

module.exports = router