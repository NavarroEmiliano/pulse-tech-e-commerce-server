const Product = require('../models/product')

const getAllProducts = async () => {
  const products = await Product.find({}).sort({ createdAt: -1 })
  return products
}

const getOneProduct = async id => {
  const product = await Product.findById(id)

  if (!product)
    throw {
      status: 404,
      message: 'Product not found'
    }
  return product
}

const createNewProduct = async newProduct => {
  const foundProduct = await Product.find({ title: newProduct.title })
  if (foundProduct.length) {
    throw {
      status: 409,
      message: 'The product already exists in the database'
    }
  }

  const product = new Product({
    ...newProduct
  })

  const savedProduct = await product.save()

  return savedProduct
}

const deleteUser = async id => {
  const product = await Product.findByIdAndDelete(id)

  if (!product) {
    throw {
      status: 404,
      message: 'Product not found'
    }
  }

  return product
}

const updateUser = async (id, newData) => {
  const product = await Product.findByIdAndUpdate(id, newData, { new: true })

  if (!product) {
    throw {
      status: 404,
      message: 'Product not found'
    }
  }

  return product
}

module.exports = {
  getAllProducts,
  getOneProduct,
  createNewProduct,
  deleteUser,
  updateUser
}
