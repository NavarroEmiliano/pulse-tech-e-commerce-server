const { Router } = require('express')
const usersController = require('../controllers/usersController')
const router = Router()

router
  .get('/', usersController.getAllUsersController)
  .get('/:id', usersController.getOneUserController)
  .post('/', usersController.createNewUserController)
  .delete('/:id', usersController.deleteUserController)
  .put('/:id', usersController.updateUserController)

module.exports = router
