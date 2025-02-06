import express,{Request,Response} from 'express';
const router = express.Router();

import Color from '../models/colors.js';
import checkBody from '../modules/checkBody.js';  




router.get('/',async(req,res)=>{
    
    try{
      Color.find()
   .then(data=>{
     if(data.length > 0 ){
         return res.status(200).json({result : true , allColor:data })
     }
     return res.status(404).json({result:false, error:"No colors found"})
   })
    }catch(error) {
     res.status(500).json({ result: "false", error: "Server error" });
 }
  
 
 })


router.post('/addColor',async(req:Request,res:Response):Promise<void>=>{
 
    try {

        const requireBody = ["name"];

        const {name} = req.body;

        if(!checkBody(req.body,requireBody)){
            res.status(400).json({ result: false, error: "Missing or empty fields" })
            return ;
        }

        const existingColor = await Color.findOne({name: name})

        if(existingColor){
            res.status(409).json({result:"false", error: "Color already exist"})
            return ;
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