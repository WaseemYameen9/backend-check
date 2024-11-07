const Category = require('../models/Category');
const Product = require('../models/product')


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


const DeleteSubCategory = async (req, res) => {
    const { categorySlug, subCategorySlug } = req.body;

    try {
        const result = await Category.findOneAndUpdate(
            { categorySlug },
            { $pull: { subCategories: { slug: subCategorySlug } } },
            { new: true }
        );
        await Product.deleteMany({ subcategoryslug: subCategorySlug });

        if (!result) {
            return res.status(404).json({ message: "Category or subcategory not found" });
        }

        res.status(200).json({ message: "Subcategory deleted successfully", updatedCategory: result });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};



module.exports = {
    CreateSubCategory,
    getCategoriesAndSubCategories,
    CreateSubCategoryInCategory,
    DeleteSubCategory
};
