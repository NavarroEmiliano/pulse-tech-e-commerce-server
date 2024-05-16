const axios = require('axios')
const base = process.env.PAYPAL_BASE_URL
const { generateAccessToken } = require('./paypalAccessToken')
const {
  calculateDiscountedPrice
} = require('../helpers/calculateDiscountedPrice')

const createOrder = async cart => {
  const accessToken = await generateAccessToken()
  const url = `${base}/v2/checkout/orders`

  const total = cart.reduce(
    (acc, curr) =>
      acc +
      calculateDiscountedPrice(
        curr.productId.price,
        curr.productId.discountPercentage
      ) *
        curr.quantity,
    0
  )
  const payload = {
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: 'USD',
          value: total.toFixed(2)
        }
      }
    ]
  }


  const { data } = await axios.post(url, payload, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
  return data
}

module.exports = { createOrder }
