const { Router } = require('express')
const {
  getAllUsersController,
  getOneUserController,
  createNewUserController,
  deleteUserController,
  updateUserController
} = require('../controllers/usersController')
const authToken = require('../middleware/authToken')
const router = Router()

router
  .get('/', authToken, getAllUsersController)
  .get('/:id', authToken, getOneUserController)
  .post('/', createNewUserController)
  .delete('/:id', authToken, deleteUserController)
  .put('/:id', authToken, updateUserController)

module.exports = router
