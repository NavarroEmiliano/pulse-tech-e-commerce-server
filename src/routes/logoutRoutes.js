const { Router } = require('express')
const { logoutUserController } = require('../controllers/logoutController')

const router = Router()

router.get('/', logoutUserController)

module.exports = router
