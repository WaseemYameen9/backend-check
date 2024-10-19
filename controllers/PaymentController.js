const Stripe = require('stripe')

const stripe = Stripe(process.env.MY_STRIPE_KEY);

const ProcessPayment = async (req,res) => {
  const { amount, currency, receipt_email } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency,
      payment_method_types: ["card"],
      receipt_email: receipt_email,
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = {
  ProcessPayment,
};
