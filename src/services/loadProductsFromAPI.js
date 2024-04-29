const axios = require('axios')
const Product = require('../models/product')
const apiUrl = process.env.API_URL
const productService = require('./productService')

const loadProductsFromAPI = async () => {
  try {
    const productsInDb = await productService.getAllProducts()

    if (!productsInDb.length) {
      const response = await axios.get(apiUrl)

      const productsData = response.data.products

      await Promise.all(
        productsData.map(async productData => {
          const product = new Product({
            title: productData.title,
            description: productData.description,
            price: productData.price,
            discountPercentage: productData.discountPercentage,
            rating: productData.rating,
            stock: productData.stock,
            brand: productData.brand,
            category: productData.category,
            images: productData.images
          })

          await product.save()
        })
      )

      return 'All products were loaded into the database successfully'
    }
    return 'The database is already loaded'
  } catch (error) {
    return error.data
  }
}

module.exports = {
  loadProductsFromAPI
}
