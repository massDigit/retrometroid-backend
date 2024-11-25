import express from "express";
const router = express.Router();

import Product from "../models/product.js";
import Accessorie from "../models/accessories.js";
import Option from "../models/options.js";
import checkBody from "../modules/checkBody.js";

router.post("/addProduct", async (req, res) => {
  try {
    const requireBody = ["name", "type"];
    const { name, type, accessories, options } = req.body;

    if (!checkBody(req.body, requireBody)) {
      return res.json({ result: false, error: "Missing or empty fields" });
    }

    const existingProduct = await Product.findOne({ name: req.body.name });

    if (existingProduct) {
      return res.json({ result: "false", error: "product already exist" });
    }

    const accessoriesArray = await Accessorie.find({
      name: { $in: accessories },
    });
    if (accessories && accessoriesArray.length !== accessories.length) {
      return res
        .status(404)
        .json({ result: false, error: "One or more accessories not found" });
    }

    const optionsArray = await Option.find({ name: { $in: options } });
    if (options && optionsArray.length !== options.length) {
      return res
        .status(404)
        .json({ result: false, error: "One or more options not found" });
    }

    const newProduct = new Product({
      name,
      description: req.body.description,
      price: req.body.price,
      type,
      accessories: accessoriesArray.map((accessory) => accessory._id),
      options: optionsArray.map((option) => option._id),
    });

    await newProduct.save();

    res.json({
      result: "true",
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    res.status(500).json({ result: "false", error: "Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const products = await Product.find()
      .populate("options") // Peupler les options avec toutes les informations
      .populate("accessories");

    if (products.length > 0) {
      return res.status(200).json({ result: true, allProduct: products });
    }
    return res.status(404).json({ result: false, error: "product not found" });
  } catch (error) {
    console.error("Error in fetching products:", error);
    res.status(500).json({ result: "false", error: "Server error" });
  }
});

export default router;
