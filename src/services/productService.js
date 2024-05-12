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
      message: 'There is already a product with that title'
    }
  }

  const product = new Product({
    ...newProduct
  })

  const savedProduct = await product.save()

  return savedProduct
}

const deleteProduct = async id => {
  const product = await Product.findByIdAndDelete(id)

  if (!product) {
    throw {
      status: 404,
      message: 'Product not found'
    }
  }
  return product
}

const updateProduct = async (id, newData) => {
  const foundProduct = await Product.find({ title: newData.title })

  if (foundProduct.length && foundProduct[0].id !== id) {
    throw {
      status: 409,
      message: 'There is already a product with that title'
    }
  }

  const product = await Product.findByIdAndUpdate(id, newData, { new: true })

  if (!product) {
    throw {
      status: 404,
      message: 'Product not found'
    }
  }

  return product
}

const getProductsByCategory = async category => {
  const productsFound = await Product.find({ category })

  if (!productsFound.length) {
    throw {
      status: 404,
      message: 'Products not found'
    }
  }

  return productsFound
}

const getOneProductsPerCategory = async () => {
  const productsFound = await Product.aggregate([
    { $group: { _id: '$category', product: { $first: '$$ROOT' } } },
    { $replaceRoot: { newRoot: '$product' } },
    {
      $addFields: {
        id: { $toString: '$_id' }
      }
    },
    { $project: { _id: 0, __v: 0 } }
  ])

  if (!productsFound.length) {
    throw {
      status: 404,
      message: 'Products not found'
    }
  }

  return productsFound
}

const getAllBrands = async () => {
  const brands = await Product.distinct('brand')
  return brands
}

const getAllCategories = async () => {
  const categories = await Product.distinct('category')
  return categories
}

module.exports = {
  getAllProducts,
  getOneProduct,
  createNewProduct,
  deleteProduct,
  updateProduct,
  getProductsByCategory,
  getOneProductsPerCategory,
  getAllBrands,
  getAllCategories
}
