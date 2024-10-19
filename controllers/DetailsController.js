const Product = require('../models/product')
const Order = require('../models/Order')

const getDetails = async (req, res) => {
  try {
    
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    const orders = await Order.find();
    const totalRevenue = orders.reduce((acc, order) => acc + order.discountedBill, 0);

    res.status(200).json({
      totalProducts,
      totalOrders,
      totalRevenue,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


module.exports = {
    getDetails,
}