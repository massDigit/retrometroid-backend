import express from 'express';
const router = express.Router();


import Accessorie from '../models/accessories.js';
import Color from '../models/colors.js';
import checkBody from '../modules/checkBody.js';  





router.post('/addAccessorie',async(req,res)=>{
 
try {
        const { name, description,imagePath, price,color: colorName} = req.body;
        const requireBody = ["name", "description","imagePath", "price","color"];

      if (!checkBody(req.body, requireBody)) {
        return res.json({ result: false, error: "Missing or empty fields" });
      }

        const existingAccessorie = await Accessorie.findOne({name:req.body.name});

        if(existingAccessorie){
            return res.json({result:"false", error: "Accessorie already exist"})  
        }

        const color = await Color.findOne({name:colorName})
      
        if (!color) {
            return res.status(404).json({ result: "false", error: "Color not found" });
          }
        
        const  optionImgUrl = `/images/ASSETS/${imagePath}`;

        const newAccessorie = new Accessorie({
            name ,
            description ,
            optionImgUrl,
            price ,
            color: color._id,
        })

        await newAccessorie.save();

        res.json({ result: "true", message: "Accessorie added successfully", accessorie: newAccessorie });

  } catch (error) {
        res.status(500).json({ result: "false", error: "Server error" });
  }
 
})



router.get('/',async(req,res)=>{

    try{
        Accessorie.find()
        .populate('color')
        .then(data=>{
         if(data.length > 0 ){
           return res.status(200).json({result :true, allAccessories : data})
         }
         return res.status(404).json({result : false , error : "Accessories not found"})
        })
      }catch(error) {
       res.status(500).json({ result: "false", error: "Server error" });
      }

})


export default router;