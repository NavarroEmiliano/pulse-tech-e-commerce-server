const uploadProductPermission = require('../helpers/permission')
const productService = require('../services/productService')

const getAllProductsController = async (_req, res) => {
  const allProducts = await productService.getAllProducts()
  return res.send({ status: 'OK', data: allProducts })
}

const createNewProductController = async (req, res) => {
  try {
    const sessionUserId = req.userId

    if (!uploadProductPermission(sessionUserId)) {
      throw {
        status: 401,
        message: 'Unauthorized'
      }
    }

    const { title, description, price, brand, category, images } = req.body

    if (
      !title ||
      !description ||
      !price ||
      !brand ||
      !category ||
      !images.length
    ) {
      return res.status(400).send({
        status: 'FAILED',
        data: 'Missing fields'
      })
    }

    const newProduct = {
      ...req.body
    }
    const product = await productService.createNewProduct(newProduct)

    return res.status(201).send({ status: 'OK', data: product })
  } catch (error) {
    return res.status(error.status || 500).send({
      status: 'FAILED',
      data: error.message
    })
  }
}

module.exports = {
  getAllProductsController,
  createNewProductController
}
