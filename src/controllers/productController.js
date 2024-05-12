const uploadProductPermission = require('../helpers/permission')
const productService = require('../services/productService')

const getAllProductsController = async (_req, res) => {
  const allProducts = await productService.getAllProducts()
  return res.send({ status: 'OK', data: allProducts })
}

const getOneProductController = async (req, res) => {
  try {
    const { productId } = req.params
    const product = await productService.getOneProduct(productId)
    return res.send({ status: 'OK', data: product })
  } catch (error) {
    return res
      .status(error.status || 500)
      .send({ status: 'FAILED', data: error.message })
  }
}


const deleteProductController = async (req, res) => {
  try {
    const sessionUserId = req.userId
    const {productId} = req.params

    if (!uploadProductPermission(sessionUserId)) {
      throw {
        status: 401,
        message: 'Unauthorized'
      }
    }
    
    const deletedMessage = await productService.deleteProduct(productId)
    return res.send({ status: 'OK', data: deletedMessage })
  } catch (error) {
    return res
      .status(error.status || 500)
      .send({ status: 'FAILED', data: error.message })
  }
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

const updateProductController = async (req, res) => {
  try {
    const { id } = req.params
    const product = { ...req.body }

    if (!uploadProductPermission(req.userId)) {
      throw {
        status: 401,
        message: 'Unauthorized'
      }
    }

    const updatedProduct = await productService.updateProduct(id, product)

    return res.status(200).send({ status: 'OK', data: updatedProduct })
  } catch (error) {
    return res.status(error.status || 500).send({
      status: 'FAILED',
      data: error.message
    })
  }
}

const getProductsByCategoryController = async (req, res) => {
  try {
    const { categoryName } = req.params
    const productsByCategory = await productService.getProductsByCategory(
      categoryName
    )
    return res.send({ status: 'OK', data: productsByCategory })
  } catch (error) {
    return res.status(error.status || 500).send({
      status: 'FAILED',
      data: error.message
    })
  }
}




const getOneProductPerCategoryController = async (req, res) => {
  try {
    const products = await productService.getOneProductsPerCategory()
    return res.send({ status: 'OK', data: products })
  } catch (error) {
    return res
      .status(error.status || 500)
      .send({ status: 'FAILED', data: error.message })
  }
}

const getAllBrandsController = async (req, res) => {
  try {
    const brands = await productService.getAllBrands()
    return res.send({ status: 'OK', data: brands })
  } catch (error) {
    return res
      .status(error.status || 500)
      .send({ status: 'FAILED', data: error.message })
  }
}

const getAllCategoriesController = async (req, res) => {
  try {
    const categories = await productService.getAllCategories()
    return res.send({ status: 'OK', data: categories })
  } catch (error) {
    return res
      .status(error.status || 500)
      .send({ status: 'FAILED', data: error.message })
  }
}



module.exports = {
  getAllProductsController,
  createNewProductController,
  updateProductController,
  getProductsByCategoryController,
  getOneProductController,
  getOneProductPerCategoryController,
  getAllBrandsController,
  getAllCategoriesController,
  deleteProductController
}
