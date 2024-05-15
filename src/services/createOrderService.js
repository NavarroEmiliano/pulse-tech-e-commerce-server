const axios = require('axios')
const base = 'https://api-m.sandbox.paypal.com'
const { generateAccessToken } = require('./paypalAccessToken')

const createOrder = async cart => {
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
            value: '100'
          }
        }
      ]
    }
    const {data} = await axios.post(url, payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`
        // Uncomment one of these to force an error for negative testing (in sandbox mode only).
        // Documentation: https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
        // "PayPal-Mock-Response": '{"mock_application_codes": "MISSING_REQUIRED_PARAMETER"}'
        // "PayPal-Mock-Response": '{"mock_application_codes": "PERMISSION_DENIED"}'
        // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
      }
    })
  // use the cart information passed from the front-end to calculate the purchase unit details
  return data
}

module.exports = { createOrder }
