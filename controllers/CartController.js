const Cart = require('../models/Cart');
const Product = require('../models/product')

const addProductToCart = async (req, res) => {
    const { userId, productId, size, qty } = req.body;

    try {
        const cart = await Cart.findOne({ userId: userId });
        const product = await Product.findOne({_id: productId});

        const {price, discountedPrice} = product;

        if (!cart) {
            const newCart = new Cart({
                userId: userId,
                products: [{ productId, size: size, qty: qty }],
                totalBill: qty * price,
                discountedBill: qty * discountedPrice,
                totalItems: qty,
            });
            await newCart.save();
            return res.status(201).json({ message: "Product added to cart", cart: newCart });
        }

        // Fix: Convert productId to string to ensure proper comparison
        const productIndex = cart.products.findIndex(
            item => String(item.productId) === String(productId) && item.size === size
        );

        if (productIndex > -1) {
            // If product with same size exists, update quantity
            cart.products[productIndex].qty += qty;
        } else {
            // If product doesn't exist, push new product
            cart.products.push({ productId, size: size, qty: qty });
        }

        // Update total items, total bill, and discounted bill
        cart.totalItems += qty;
        cart.totalBill = cart.totalBill + (qty * price);
        cart.discountedBill = cart.discountedBill + (qty * discountedPrice);

        await cart.save();
        return res.status(200).json({ message: "Product added to cart", cart });
    } catch (error) {
        console.error("Error adding product to cart:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getCartItems = async (req, res) => {
    const {userId} = req.params
    try{
        const data = await Cart.findOne({userId: userId}).populate({
            path: 'products.productId',
            model: 'Products'
        });
        res.status(200).json({data: data})
    }
    catch(error){
        res.status(500).json({Error:error})
    }
    
};

const RemoveItemFromCart = async (req, res) => {
    console.log(req.body);
    const { userId, productId, size } = req.body;

    try {
        // Find the cart associated with the user and populate product details
        const cart = await Cart.findOne({ userId }).populate({
            path: 'products.productId',
            model: 'Products', // Ensure this matches the model name
        });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Find the index of the product with matching productId and size
        const productIndex = cart.products.findIndex(
            (product) => product.productId._id.toString() === productId && product.size === size
        );

        // If the product is found, remove it
        if (productIndex > -1) {
            const removedProduct = cart.products[productIndex];

            // Use the populated `productId` to access price and discountedPrice
            const productDetails = removedProduct.productId;

            // Update totals after removing the product
            cart.totalItems -= removedProduct.qty;
            cart.totalBill -= removedProduct.qty * productDetails.price;
            cart.discountedBill -= removedProduct.qty * productDetails.discountedPrice;

            // Remove the product from the products array
            cart.products.splice(productIndex, 1);

            // Save the updated cart
            await cart.save();

            return res.status(200).json({ message: 'Product removed from cart', cart });
        } else {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

    } catch (error) {
        console.error('Error removing product from cart:', error);
        res.status(500).json({ Error: error.message });
    }
};


module.exports = {
    addProductToCart,
    getCartItems,
    RemoveItemFromCart
};
