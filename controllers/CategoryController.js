const Category = require('../models/Category');


const CreateSubCategory = async (req, res) => {
    try {
        const data = await Category.create(req.body);
        res.status(200).json(data);
    } catch (e) {
        res.status(500).json({ "error": e.message });
    }
};


const CreateSubCategoryInCategory = async (req, res) => {
    const {category, subCategory, subCategorySlug} = req.body;
    
    try {
        
        const data = await Category.findOneAndUpdate(
            { category: category }, 
            { 
                $push: { 
                    subCategories: { name: subCategory, slug: subCategorySlug }
                } 
            }, 
            { new: true, upsert: true }
        );
        
        res.status(200).json(data);
    } catch (e) {
        res.status(500).json({ "error": e.message });
    }
};


const getCategoriesAndSubCategories = async (req, res) => {
    try {
        const categories = await Category.find({});
        res.status(200).json(categories);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};




module.exports = {
    CreateSubCategory,
    getCategoriesAndSubCategories,
    CreateSubCategoryInCategory
};
