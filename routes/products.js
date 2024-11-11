import express from 'express';

import Product from '../models/product.js';
import Option from '../models/options.js';
import Accessorie from '../models/accessories.js';
import Color from '../models/colors.js';
import checkBody from '../modules/checkBody.js';
import Category from '../models/categories.js';

const router = express.Router();


const validateOptionByTypeAndName = async (optionName, colorName) => {
  const color = await Color.findOne({ name: colorName });
  if (!color) {
    throw new Error(`Color ${colorName} not found`);
  }

  const option = await Option.findOne({name: optionName, color: color._id });
  if (!option) {
    throw new Error(`No option found name ${optionName} and color ${colorName}`);
  }

  return option._id;
};


const validateAccessoriesByName = async (accessoriesNames) => {
  const accessories = await Accessorie.find({ name: { $in: accessoriesNames } });
  if (accessories.length !== accessoriesNames.length) {
    throw new Error('One or more accessories not found');
  }

  return accessories.map(accessory => accessory._id);
};

router.post('/addProduct', async (req, res) => {
  try {
    const {
      name,
      type,
      price,
      stockQuantity,
      description,
      categorie,
      // Noms des options 
      coqueName,
      buttonName,
      padsName,
      laniereName,
      stickersName,
      batterieName,
      screenName,
      // Accessoires par nom
      sacoche,
      screen_shield,
      silicone_shield,
      // Couleurs pour chaque option
      coqueColor,
      buttonColor,
      padsColor,
      laniereColor,
      stickersColor,
      batterieColor,
      screenColor,

  
    } = req.body;

    // Validation des champs obligatoires
    const requireBody = ['name', 'price', 'type'];
    if (!checkBody(req.body, requireBody)) {
      return res.status(400).json({ result: false, error: 'Missing or empty fields' });
    }

    // Vérification de l'existence du produit
    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      return res.status(400).json({ result: false, error: 'Product already exists' });
    }

    const Categorie = await Category.findOne({categorie});
   

    // Validation des options par type et nom
    const coqueOption = await validateOptionByTypeAndName( coqueName, coqueColor);
    const buttonOption = await validateOptionByTypeAndName( buttonName, buttonColor);
    const padsOption = await validateOptionByTypeAndName( padsName, padsColor);
    const laniereOption = await validateOptionByTypeAndName( laniereName, laniereColor);
    const stickersOption = await validateOptionByTypeAndName( stickersName, stickersColor);
    const batterieOption = await validateOptionByTypeAndName( batterieName, batterieColor);
    const screenOption = await validateOptionByTypeAndName( screenName, screenColor);

    // Validation des accessoires par leur nom
    const sacocheArray = await validateAccessoriesByName(sacoche);
    const screenShieldArray = await validateAccessoriesByName(screen_shield);
    const siliconeShieldArray = await validateAccessoriesByName(silicone_shield);

    // Création du produit avec les options et accessoires validés
    const newProduct = new Product({
      name,
      description,
      price,
      type,
      stockQuantity,
      category : Categorie,
      coque: [coqueOption],
      button: [buttonOption],
      pads: [padsOption],
      laniere: [laniereOption],
      stickers: [stickersOption],
      batterie: [batterieOption],
      screen: [screenOption],
      sacoche: sacocheArray,
      screen_shield: screenShieldArray,
      silicone_shield: siliconeShieldArray,
    });

    // Sauvegarde du produit
    await newProduct.save();

    res.status(201).json({ result: true, message: 'Product added successfully', product: newProduct });
  } catch (error) {
    console.error('Erreur lors de l\'ajout du produit:', error.message);
    res.status(500).json({ result: false, error: error.message });
  }
});

router.get('/',async(req,res)=>{
    try{
        const products = await Product.find()
        .populate({
          path: 'coque',
          populate: {
            path: 'color', // Peupler la référence à la collection 'colors'
          }
        })
        .populate({
          path: 'button',
          populate: {
            path: 'color',
          }
        })
        .populate({
          path: 'pads',
          populate: {
            path: 'color',
          }
        })
        .populate({
          path: 'laniere',
          populate: {
            path: 'color',
          }
        })
        .populate({
          path: 'stickers',
          populate: {
            path: 'color',
          }
        })
        .populate({
          path: 'batterie',
          populate: {
            path: 'color',
          }
        })
        .populate({
          path: 'screen',
          populate: {
            path: 'color',
          }
        })
        .populate('sacoche') 
        .populate('screen_shield')
        .populate('silicone_shield')
        .populate('category');
       
         if(products.length > 0 ){
           return res.status(200).json({result :true, allProduct : products})
         }
         return res.status(404).json({result : false , error : "product not found"})
       
      }catch(error) {
        console.error("Error in fetching products:", error);
       res.status(500).json({ result: "false", error: "Server error" });
      }
})


export default router;