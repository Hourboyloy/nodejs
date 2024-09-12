const productmodel = require("../modeling/products");
const remove_and_update_Image = require("../middleware/remove_and_update");

const create = async (req, res) => {
  try {
    const { title, description, likes, noLikes, commant, trending } = req.body;

    // Check if the title is provided
    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "Title is required!" });
    }

    // Initialize a new product model with the non-file fields
    const newProduct = new productmodel({
      title,
      description,
      likes,
      noLikes,
      commant,
      trending,
    });

    // Check if both photo and logo files are uploaded
    if (req.files && req.files["photo"] && req.files["logo"]) {
      newProduct.photo = req.files["photo"][0].path; // Storing the photo path
      newProduct.logo = req.files["logo"][0].path; // Storing the logo path
    } else {
      return res
        .status(400)
        .json({ message: "Both photo and logo are required!" });
    }

    // Save the product to the database
    const savedProduct = await newProduct.save();

    // Return the saved product as the response
    res.status(201).json(savedProduct);
  } catch (error) {
    // Handle errors and return a 400 status with the error message
    res.status(400).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productmodel.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    // Remove the associated images (photo and logo)
    if (product.photo) {
      remove_and_update_Image(product.photo); // Delete the photo
    }
    if (product.logo) {
      remove_and_update_Image(product.logo); // Delete the logo
    }

    // Remove the product from the database
    await productmodel.findByIdAndDelete(productId);
    res.status(200).json({ message: "Product deleted successfully!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { title, description, likes, noLikes, commant, trending } = req.body;

    // Find the existing product by ID
    const product = await productmodel.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    // Update the product fields
    product.title = title || product.title;
    product.description = description || product.description;
    product.likes = likes || product.likes;
    product.noLikes = noLikes || product.noLikes;
    product.commant = commant || product.commant;
    product.trending = trending || product.trending;

    // If new images are uploaded, remove old images and set new ones
    if (req.files && req.files["photo"]) {
      if (product.photo) {
        remove_and_update_Image(product.photo); // Delete the old photo
      }
      product.photo = req.files["photo"][0].path; // Update the photo path
    }

    if (req.files && req.files["logo"]) {
      if (product.logo) {
        remove_and_update_Image(product.logo); // Delete the old logo
      }
      product.logo = req.files["logo"][0].path; // Update the logo path
    }

    // Save the updated product
    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { create, deleteProduct, updateProduct };
