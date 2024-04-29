const User = require('../models/user')

const uploadProductPermission = async userId => {
  const user = await User.findById(userId)
  return user.role === 'ADMIN'
}

module.exports = uploadProductPermission
