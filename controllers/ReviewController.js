const reviews = require('../models/Reviews')

const AddReview = async (req, res) => {
    try {
        const data = await reviews.create(req.body);
        res.status(200).json(data);
    } catch (e) {
        res.status(500).json({ "error": e.message });
    }
};


const getReviewsofProduct = async (req, res) => {
    const {productid} = req.params
    try {
        const data = await reviews.find({productId: productid});
        res.status(200).json(data);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};




module.exports = {
    AddReview,
    getReviewsofProduct
};
