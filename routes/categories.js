import express from 'express';
const router = express.Router();

import checkBody from '../modules/checkBody.js';  
import Category from '../models/categories.js';


router.post('/addCategory',async(req,res)=>{
    
  try{
    const {name} = req.body;
    const requireBody = ["name"];

    if (!checkBody(req.body, requireBody)) {
        return res.json({ result: false, error: "Missing or empty fields" });
      }
      
      
      const existingCategory = await Category.findOne({name:name});

      if(existingCategory){
        return res.json({result:"false", error: "Category already exist"})  
    }
    console.log(name);
    const newCategory = new Category({
        name ,
    })

    await newCategory.save();

    res.json({ result: "true", message: "Category added successfully", Category: newCategory });


  }catch(error){
    res.status(500).json({ result: "false", error: "Server error"});
  }
 
 })

 router.get('/',async(req,res)=>{
    try{
        Category.find()
        .then(data=>{
         if(data.length > 0 ){
           return res.status(200).json({result :true, allCategories : data})
         }
         return res.status(404).json({result : false , error : "Categories not found"})
        })
      }catch(error) {
       res.status(500).json({ result: "false", error: "Server error" });
      }
 })


 export default router;