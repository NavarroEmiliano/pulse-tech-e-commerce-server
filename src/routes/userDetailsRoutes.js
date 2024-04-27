const { Router } = require('express')
const userDetailsController = require('../controllers/userDetailsController')

const router = Router()

router.get('/', userDetailsController.getUserDetails)

module.exports = router
