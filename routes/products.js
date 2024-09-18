import express from 'express';
const router = express.Router();

import Product from '../models/product.js';  
import Accessorie from '../models/accessories.js';
import Option from '../models/options.js';


router.post('/addProduct',async(req,res)=>{
 
try {
        const requireBody = ["name"];
        const { name } = req.body;
        
        const existingProduct = await Product.findOne({name:req.body.name});

        if(existingProduct){
            return res.json({result:"false", error: "product already exist"})  
        }

        const accessorie = await Accessorie.findOne({name:req.body.accessories })
        const option = await Option.findOne({name: req.body.option })

        const newProduct = new Product({
            name : req.body.name,
            description : req.body.description,
            price : req.body.price,
            type : req.body.type,
            accessories: accessorie._id,
            options: option._id,
        })

        await newProduct.save();

        res.json({ result: "true", message: "Product added successfully", product: newProduct });

  } catch (error) {
        res.status(500).json({ result: "false", error: "Server error" });
  }
 
})


export default router;