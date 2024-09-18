import express from 'express';
const router = express.Router();

import Color from '../models/colors.js';
import Option from '../models/options.js';
import checkBody from '../modules/checkBody.js';  



router.post('/addOptions',async(req,res)=>{
 
try {
        
        const { name, description, price, imagePath, color: colorName } = req.body;
        const requireBody = ["name", "description", "imagePath","color"];

        if (!checkBody(req.body, requireBody)) {
          return res.json({ result: false, error: "Missing or empty fields" });
        }

        const existingOption = await Option.findOne({name:req.body.name});

        if(existingOption){
            return res.status(400).json({result:"false", error: "Accessorie already exist"})  
        }

        const color = await Color.findOne({name:colorName})
        console.log(color);
        
        if (!color) {
            return res.status(404).json({ result: "false", error: "Color not found" });
          }
        const  optionImgUrl = `/images/ASSETS/${imagePath}`;

        const newOption = new Option({
            name ,
            description ,
            price ,
            optionImgUrl,
            color: color._id
        })

        await newOption.save();

        console.log(newOption.color);
        

        res.status(201).json({ result: "true", message: "Option added successfully", option: newOption });

  } catch (error) {
        res.status(500).json({ result: "false", error: "Server error" });
  }
 
})


export default router;