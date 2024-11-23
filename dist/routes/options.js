import express from 'express';
const router = express.Router();
import Color from '../models/colors.js';
import Option from '../models/options.js';
import checkBody from '../modules/checkBody.js';
router.get('/', async (req, res) => {
    try {
        Option.find()
            .populate('color')
            .then(data => {
            if (data.length > 0) {
                return res.status(200).json({ result: true, allOptions: data });
            }
            return res.status(404).json({ result: false, error: "Options not found" });
        });
    }
    catch (error) {
        res.status(500).json({ result: "false", error: "Server error" });
    }
});
router.post('/addOptions', async (req, res) => {
    try {
        const { name, description, type, consoleType, price, imagePathFront, imagePathSide, imagePathBack, color: colorName, } = req.body;
        const requireBody = [
            'name',
            'description',
            'type',
            'consoleType',
            'price',
            'color',
        ];
        if (!checkBody(req.body, requireBody)) {
            res.status(400).json({ result: false, error: "Missing or empty fields" });
            return;
        }
        if (typeof price !== "number" || isNaN(price) || price < 0) {
            res.status(400).json({ result: false, error: "Le prix doit être un nombre positif ou égal à zéro" });
            return;
        }
        const existingOption = await Option.findOne({ name: req.body.name });
        if (existingOption) {
            res.status(409).json({ result: "false", error: "Accessorie already exist" });
            return;
        }
        const color = await Color.findOne({ name: colorName });
        if (!color) {
            res.status(404).json({ result: "false", error: "Color not found" });
            return;
        }
        const optionImgFront = imagePathFront ? `/images/ASSETS/${imagePathFront}` : "";
        const optionImgSide = imagePathSide ? `/images/ASSETS/${imagePathSide}` : "";
        const optionImgBack = imagePathBack ? `/images/ASSETS/${imagePathBack}` : "";
        const newOption = new Option({
            name,
            description,
            type,
            consoleType,
            price,
            optionImgFront,
            optionImgSide,
            optionImgBack,
            color: color._id,
        });
        await newOption.save();
        res.status(201).json({ result: "true", message: "Option added successfully", option: newOption });
    }
    catch (error) {
        res.status(500).json({ result: "false", error: "Server error" });
    }
});
router.get('/getOptionsByConsoleType', async (req, res) => {
    const { consoleType } = req.query;
    if (!consoleType) {
        res.status(400).json({ error: 'Type manquant' });
        return;
    }
    try {
        const options = await Option.find({ consoleType: consoleType.toString() }).populate({ path: 'color', select: 'name -_id' });
        if (options.length === 0) {
            res.status(404).json({ error: 'Aucune option trouvée pour ce type' });
            return;
        }
        res.status(200).json(options);
        return;
    }
    catch (error) {
        console.error('Erreur lors de la récupération des options:', error);
        res.status(500).json({ error: 'Erreur serveur' });
        return;
    }
});
// router.put('/updateAllOptions',async(req,res)=>{
//   try {
//     const result = await Option.updateMany(
//       { price: { $exists: false } },
//       { $set: { price: 0 } } // Remplacez 0 par le prix par défaut souhaité
//     );
//     console.log(`Mise à jour effectuée : ${result.nModified} documents modifiés.`);
//   } catch (error) {
//     console.error('Erreur lors de la mise à jour des options :', error);
//   } 
// })
export default router;
