import express from 'express';
const router = express.Router();


import Accessorie from '../models/accessories.js';



router.post('/addAccessorie',async(req,res)=>{
 
try {
        const { name, description, price} = req.body;

        const existingAccessorie = await Accessorie.findOne({name:req.body.name});

        if(existingAccessorie){
            return res.json({result:"false", error: "Accessorie already exist"})  
        }

        const newAccessorie = new Accessorie({
            name ,
            description ,
            price ,
        })

        await newAccessorie.save();

        res.json({ result: "true", message: "Accessorie added successfully", accessorie: newAccessorie });

  } catch (error) {
        res.status(500).json({ result: "false", error: "Server error" });
  }
 
})


export default router;