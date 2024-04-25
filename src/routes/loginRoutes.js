const { Router } = require('express')
const { loginUserController } = require('../controllers/loginController')

const router = Router()

router.post('/', loginUserController)

module.exports = router
