const order = require("../models/Order");
const cart = require("../models/Cart");
const mongoose = require('mongoose')

const createOrder = async (req, res) => {
    try {
        console.log(req.body)
      const {
        cartId,
        country,
        address,
        apartmentSuite,
        city,
        postalCode,
        phone,
        paymentMethod,
        orderStatus,
      } = req.body;
  
      if (!cartId) {
        const newOrder = new order({
          country: country,
          address: address,
          apartmentSuite: apartmentSuite,
          city: city,
          postalCode: postalCode,
          phone: phone,
          paymentMethod: paymentMethod,
          OrderStatus: orderStatus,
          totalItems: req.body.totalItems,
          totalBill: req.body.totalBill,
          discountedBill: req.body.discountedBill,
          products: req.body.products,
        });
    
        // Save the order
        await newOrder.save();
    
        return res.status(200).send({ msg: "Order Placed" });
      }
      // Find the cart by its ID
      const cartdata = await cart.findOne({ _id: String(cartId) });
      
      // If cart is not found, return the response and stop execution
      if (!cartdata) {
        return res.status(404).send({ msg: "No Cart Found" });
      }
  
      // Create a new order with the cart data
      const newOrder = new order({
        userId: cartdata.userId,
        country: country,
        address: address,
        apartmentSuite: apartmentSuite,
        city: city,
        postalCode: postalCode,
        phone: phone,
        paymentMethod: paymentMethod,
        OrderStatus: orderStatus,
        totalItems: cartdata.totalItems,
        totalBill: cartdata.totalBill,
        discountedBill: cartdata.discountedBill,
        products: cartdata.products,
      });
  
      // Save the order
      await newOrder.save();
  
      // Delete the cart after placing the order
      await cart.findByIdAndDelete(cartId);
  
      // Return success response
      return res.status(200).send({ msg: "Order Placed" });
  
    } catch (e) {
      // Return error response in case of failure
      return res.status(500).json({ Error: e.message });
    }
  };
  
const getOrderofCst = async (req, res) => {
  const { userId } = req.params;
  try {
    const orders = await order.find({ userId: userId }).populate('userId').populate('products.productId');
    res.status(200).json({ Orders: orders });
  } catch (e) {
    res.status(500).json({ Error: e });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await order.find({});
    res.status(200).json({ Orders: orders });
  } catch (e) {
    res.status(500).json({ Error: e });
  }
};

module.exports = {
  createOrder,
  getOrderofCst,
  getAllOrders,
};
