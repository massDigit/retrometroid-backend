import express from 'express';
const router = express.Router();

import Color from '../models/colors.js';
import checkBody from '../modules/checkBody.js';  



router.post('/addColor',async(req,res)=>{
 
    try {

        const requireBody = ["name"];

        const {name} = req.body;

        if(!checkBody(req.body,requireBody)){
            return res.json({ result: false, error: "Missing or empty fields" });
        }

        const existingColor = await Color.findOne({name: name})

        if(existingColor){
            return res.status(400).json({result:"false", error: "Color already exist"})
        }


          const newColor = new Color({
            name ,
        })
        
        await newColor.save();
        res.status(201).json({ result: "true", message: "Color added successfully", color: newColor });

    } catch (error) {
            res.status(500).json({ result: "false", error: "Server error" });
    }
 
})


export default router;