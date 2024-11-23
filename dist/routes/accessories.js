import express from 'express';
const router = express.Router();
import Accessorie from '../models/accessories.js';
import checkBody from '../modules/checkBody.js';
router.post('/addAccessorie', async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const requireBody = ["name", "price"];
        if (!checkBody(req.body, requireBody)) {
            res.status(400).json({ result: false, error: 'Missing or empty fields' });
            return;
        }
        const existingAccessorie = await Accessorie.findOne({ name: req.body.name });
        if (existingAccessorie) {
            res.status(409).json({ result: false, error: 'Accessorie already exists' });
            return;
        }
        const newAccessorie = new Accessorie({
            name,
            description,
            price,
        });
        await newAccessorie.save();
        res.json({ result: "true", message: "Accessorie added successfully", accessorie: newAccessorie });
    }
    catch (error) {
        console.error("Erreur serveur:", error); // Log plus détaillé de l'erreur
        res.status(500).json({ result: "false", error: "Server error" });
    }
});
router.get('/', async (req, res) => {
    try {
        Accessorie.find()
            .then(data => {
            if (data.length > 0) {
                return res.status(200).json({ result: true, allAccessories: data });
            }
            return res.status(404).json({ result: false, error: "Accessories not found" });
        });
    }
    catch (error) {
        res.status(500).json({ result: "false", error: "Server error" });
    }
});
export default router;
