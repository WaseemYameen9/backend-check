const Stripe = require('stripe')

const stripe = Stripe('sk_test_51QA221Rtm9jX1MDejT1gFPGLrWUnowHT3WDBAWbSUwZLuQ55tfkyDVLgWgVcZTYRmtj6ADHmn6nYATZPI4fMcxKW00YauqWE04');

const ProcessPayment = async (req,res) => {
  const { amount, currency } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency,
      payment_method_types: ["card"],
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
