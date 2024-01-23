/* eslint-disable camelcase */
import Stripe from 'stripe'

const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

const createPaymentIntent = async (req, res) => {
  console.log('--- Creating Payment Intent')

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 10000,
      currency: 'hkd'
    })

    return res.status(200).json({
      clientSecret: paymentIntent.client_secret
    })
  } catch (err) {
    console.error('--- Error in Creating Payment Intent', err)
    // eslint-disable-next-line no-undef
    return handleErrors(res, err)
  }
}

export default createPaymentIntent
