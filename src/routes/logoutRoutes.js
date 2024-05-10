const { Router } = require('express')
const { logoutUserController } = require('../controllers/logoutController')

const router = Router()

router.post('/', logoutUserController)

module.exports = router
