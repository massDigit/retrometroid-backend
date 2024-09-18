import express from 'express';
const router = express.Router();

import checkBody from '../modules/checkBody.js';  
import jwt from 'jsonwebtoken'; 
import uid2 from 'uid2'; 
import bcrypt from 'bcrypt';  

import User from '../models/users.js';  

const secretKey = uid2(32);  
const refreshSecretKey = uid2(32);


const generateAccessToken = (payload) => {
  return jwt.sign(payload, secretKey, { expiresIn: '15m' }); // 15 minutes
};

const generateRefreshToken = () => {
  return jwt.sign({}, refreshSecretKey, { expiresIn: '7d' }); // 7 jours
};




/* GET users listing. */
router.get('/', async(req, res) => {
  
  try {
    const users = await User.find();

    if (users.length > 0) {
      return res.json({ data: users })
    }

    return res.json({ result: false, error: "No users found" });
  }
  catch (error) {
    res.status(500).json({ result: false, error: "Error fetching users" });
  }

});


router.post('/register', async(req,res) => {
 
  const requireBody = ["username", "password", "email"];

  const { email, username, password } = req.body;

  if (!checkBody(req.body, requireBody)) {
    return res.json({ result: false, error: "Missing or empty fields" });
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(email)) {
    return res.json({ result: false, error: "Invalid email format" });
  }

  try{
   
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ result: false, error: "User already exists" });
    }

    const newUser = new User({
      username,
      email,
      password: bcrypt.hashSync(password, 10),
    });

    const savedUser = await newUser.save();
    res.json({result:true, user:savedUser});


  }catch(error){
    res.status(500).json({result:false,error:"Server error"});
  }

})


router.post('/login', async (req, res) => {

  const requireBody = ["username", "password", "email"];
  const { email, password } = req.body;

  if (!checkBody(req.body, requireBody)) {
    return res.json({ result: false, error: "Missing or empty field" });

  }

  try {

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ result: false, error: "Invalid credentials" });
    }

    // Vérification du mot de passe
    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ result: false, error: "Invalid credentials" });
    }

    // Génération des tokens après une connexion réussie
    const payload = { username: user.username, email: user.email };
    const accessToken = generateAccessToken(payload);  // Durée de vie 15 min
    const refreshToken = generateRefreshToken();  // Durée de vie 7 jours

    // Stockage du refresh token dans la base de données
    user.refreshToken = refreshToken;
    await user.save();

    // Renvoi des tokens au client
    res.json({
      result: true,
      accessToken,
      refreshToken,
      user: { username: user.username, email: user.email }
    });

  } catch (error) {
    res.status(500).json({ result: false, error: "Server error" });
  }
});



export default router;
