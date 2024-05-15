const base = process.env.PAYPAL_BASE_URL

const captureOrder = async orderID => {
  const accessToken = await generateAccessToken()
  const url = `${base}/v2/checkout/orders/${orderID}/capture`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  })

  return response
}

module.exports = { captureOrder }
