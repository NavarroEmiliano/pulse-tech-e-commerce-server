const { generateAccessToken } = require('./paypalAccessToken')

const axios = require('axios')
const base = process.env.PAYPAL_BASE_URL

const captureOrder = async orderID => {
  try {
    const accessToken = await generateAccessToken()
    const url = `${base}/v2/checkout/orders/${orderID}/capture`

    const response = await axios.post(url, null, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })

    const jsonResponse = response.data
    const httpStatusCode = response.status
    return { jsonResponse, httpStatusCode }
  } catch (error) {
    throw error
  }
}

module.exports = { captureOrder }
