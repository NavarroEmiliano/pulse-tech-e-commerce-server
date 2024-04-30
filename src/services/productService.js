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

const getProductByCategory = async () => {
  console.log('Holis servicio')

  console.log('Voy a buscar por categoria')
  const productsFound = await Product.distinct('category')

  console.log('Termine de buscar')

  if (!productsFound.length) {
    throw {
      status: 404,
      message: 'Products not found'
    }
  }

  const productsByCategory = []

  for (const category of productsFound) {
    const product = await Product.findOne({ category })
    console.log("Category", product.category)
    if (product) {
      productsByCategory.push(product)
    }
  }

  console.log('Voy a enviar los productos al controller')
  return productsByCategory
}

module.exports = {
  getAllProducts,
  getOneProduct,
  createNewProduct,
  deleteProduct,
  updateProduct,
  getProductByCategory
}
