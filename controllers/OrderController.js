const order = require("../models/Order");
const cart = require("../models/Cart");

const mongoose = require('mongoose')

const createOrder = async (req, res) => {
    try {
        console.log(req.body)
      const {
        cartId,
        firstName,
        lastName,
        email,
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
          firstName: firstName,
          lastName: lastName,
          email: email,
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
          products: req.body.products.map(product => ({
            productId: product._id,  // Rename _id to productId
            qty: product.qty,
            size: product.size,
          })),
        });
    
        // Save the order
        await newOrder.save();
    
        return res.status(200).send({ msg: "Order Placed",data: newOrder });
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
        firstName: firstName,
        lastName: lastName,
        email: email,
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
      return res.status(200).send({ msg: "Order Placed", data:newOrder });
  
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

const getOrderbyId = async (req, res) => {
  const { orderId } = req.params;
  try {
    const orders = await order.find({ _id: orderId }).populate('userId').populate('products.productId');
    res.status(200).json({ Orders: orders });
  } catch (e) {
    res.status(500).json({ Error: e });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await order.find({}).sort({ createdAt: -1 }).populate('userId').populate('products.productId');;
    res.status(200).json({ Orders: orders });
  } catch (e) {
    res.status(500).json({ Error: e });
  }
};

const ChangeStatus = async (req, res) => {
  const { status, _id } = req.body;
  
  try {
    // Find the order by its ID and update the status
    const updatedOrder = await order.findByIdAndUpdate(
      _id, 
      { OrderStatus: status }, 
      { new: true } // Returns the updated document
    );
    
    // If order is not found
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    
    // Send the updated order as the response
    res.status(200).json({ message: "Order status updated", order: updatedOrder });
  } catch (e) {
    // Handle any errors that occur during the update
    res.status(500).json({ Error: e.message });
  }
};


module.exports = {
  createOrder,
  getOrderofCst,
  getAllOrders,
  getOrderbyId,
  ChangeStatus
};
