const { Router } = require('express')
const { createOrderController } = require('../controllers/paypalController')
const { generateAccessToken } = require('../services/paypalAccessToken')
const base = 'https://api-m.sandbox.paypal.com'

const router = Router()



async function handleResponse(response) {
  try {
    const jsonResponse = await response.json();
    return {
      jsonResponse,
      httpStatusCode: response.status,
    };
  } catch (err) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
}

const captureOrder = async orderID => {
  const accessToken = await generateAccessToken()
  const url = `${base}/v2/checkout/orders/${orderID}/capture`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
      // Uncomment one of these to force an error for negative testing (in sandbox mode only).
      // Documentation:
      // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
      // "PayPal-Mock-Response": '{"mock_application_codes": "INSTRUMENT_DECLINED"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "TRANSACTION_REFUSED"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
    }
  })

  return handleResponse(response)
}

router
  .post('/', createOrderController)
  .post('/:orderID/capture', async (req, res) => {
    console.log(req.params)
    try {
      const { orderID } = req.params
      console.log('ID',orderID)
      const { jsonResponse, httpStatusCode } = await captureOrder(orderID)
      res.status(httpStatusCode).json(jsonResponse)
    } catch (error) {
      console.error('Failed to create order:', error)
      res.status(500).json({ error: 'Failed to capture order.' })
    }
  })
module.exports = router
