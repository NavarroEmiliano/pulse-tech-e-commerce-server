const { Router } = require('express')
const {
  getAllUsersController,
  getOneUserController,
  createNewUserController,
  deleteUserController,
  updateUserController
} = require('../controllers/usersController')
const router = Router()

router
  .get('/', getAllUsersController)
  .get('/:id', getOneUserController)
  .post('/', createNewUserController)
  .delete('/:id', deleteUserController)
  .put('/:id', updateUserController)

module.exports = router
