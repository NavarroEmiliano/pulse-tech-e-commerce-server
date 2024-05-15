const axios = require('axios')
const base = process.env.PAYPAL_BASE_URL
const { generateAccessToken } = require('./paypalAccessToken')

const createOrder = async (cart) => {
  console.log(
    'shopping cart information passed from the frontend createOrder() callback:',
    cart
  )
  const accessToken = await generateAccessToken()
  const url = `${base}/v2/checkout/orders`

  const payload = {
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: 'USD',
          value: cart.total
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
