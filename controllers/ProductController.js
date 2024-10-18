const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const product = require("../models/product");

// Configure the AWS S3 client
const s3Client = new S3Client({
  region: 'eu-north-1', // Replace with your region
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

const CreateProduct = async (req, res) => {
  try {
    const imageUrls = [];

    // Upload each image to S3
    const uploadPromises = req.files.map(async (file) => {
      try {
        const params = {
          Bucket: 'theuniquesunnah', // Replace with your S3 bucket name
          Key: `products/${Date.now()}-${file.originalname}`, // Unique file name for S3
          Body: file.buffer, // The file buffer
          ContentType: file.mimetype, // Set the correct content type
        };

        // Upload the file using PutObjectCommand
        const command = new PutObjectCommand(params);
        await s3Client.send(command);

        // Construct the image URL and push to the array
        const imageUrl = `https://${params.Bucket}.s3.amazonaws.com/${params.Key}`;
        imageUrls.push(imageUrl);
      } catch (error) {
        console.error('S3 upload error:', error);
        throw new Error('Image upload failed');
      }
    });

    // Wait for all uploads to complete
    await Promise.all(uploadPromises);

    // Now save the product to MongoDB
    const productData = {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      discountedPrice: req.body.discountedPrice,
      category: req.body.category,
      subcategoryslug: req.body.subcategoryslug,
      sizes: JSON.parse(req.body.sizes),
      imageLink: imageUrls, // Store S3 URLs in MongoDB
      rating: 0,
      reviews: 0,
    };

    const newProduct = await product.create(productData);

    res.status(200).json(newProduct);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
};


// const cloudinary = require('cloudinary').v2;

// cloudinary.config({
//   cloud_name: 'ddjq1wqv5',
//   api_key: '157883973243316',
//   api_secret: '3YCn2hJJMTlvmb7_GpdiPAe9UjA',
// });



// const CreateProduct = async (req, res) => {
//   try {
//     const imageUrls = [];

//     // Upload each image to Cloudinary
//     const uploadPromises = req.files.map(async (file) => {
//       try {
//         const result = await new Promise((resolve, reject) => {
//           cloudinary.uploader.upload_stream(
//             { folder: 'products' },
//             (error, result) => {
//               if (error) {
//                 reject(error); // Reject if there's an error
//               } else {
//                 resolve(result.secure_url); // Resolve with the URL if successful
//               }
//             }
//           ).end(file.buffer); // Upload the image buffer to Cloudinary
//         });

//         // Push the result (image URL) to imageUrls
//         imageUrls.push(result);
//       } catch (uploadError) {
//         console.error('Cloudinary upload error:', uploadError);
//         throw new Error('Image upload failed'); // Throw an error if upload fails
//       }
//     });

//     // Wait for all uploads to complete
//     await Promise.all(uploadPromises);

//     // Now save the product to MongoDB
//     const productData = {
//       title: req.body.title,
//       description: req.body.description,
//       price: req.body.price,
//       discountedPrice: req.body.discountedPrice,
//       category: req.body.category,
//       subcategoryslug: req.body.subcategoryslug,
//       sizes: JSON.parse(req.body.sizes),
//       imageLink: imageUrls,
//       rating: 0,
//       reviews: 0
//     };

//     // Create the product document
//     const newProduct = await product.create(productData);  // Ensure `product` is the model

//     console.log(newProduct);

//     // Send the saved product back to the client
//     res.status(200).json(newProduct);  
//   } catch (e) {
//     console.error(e);
//     res.status(500).json({ error: e.message });  // Send error response if anything fails
//   }
// };

const UpdateProduct = async (req, res) => {
  try {
    const updatedProduct = await product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(updatedProduct);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const DeleteProduct = async (req, res) => {
  try {
    const deletedProduct = await product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const GetProducts = async (req, res) => {
  try {
    const products = await product.find({});
    res.status(200).json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const GetProduct = async (req, res) => {
  try {
    const singleProduct = await product.findById(req.params.id);
    if (!singleProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(singleProduct);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const getProductsBySubCategory = async (req, res) => {
  const { category, subcategory } = req.params;
  const { limit } = req.query;
  try {
    if (limit && limit !== "all") {
      // Convert limit to a number and limit the query
      const productLimit = parseInt(limit, 10);
      products = await product.find({ category: category, subcategoryslug: subcategory }).limit(productLimit);
    } else {
      // Fetch all products if limit is 'all' or not provided
      products = await product.find({ category: category,subcategoryslug: subcategory, });
    }

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getProductsByCategory = async (req, res) => {
  const { category } = req.params;
  const { limit } = req.query;
  let products;
  try {
    if (limit && limit !== "all") {
      // Convert limit to a number and limit the query
      const productLimit = parseInt(limit, 10);
      products = await product.find({ category: category }).limit(productLimit);
    } else {
      // Fetch all products if limit is 'all' or not provided
      products = await product.find({ category: category });
    }

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  CreateProduct,
  UpdateProduct,
  GetProduct,
  GetProducts,
  DeleteProduct,
  getProductsByCategory,
  getProductsBySubCategory,
};
