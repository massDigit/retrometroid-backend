import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

router.post('/proxy/woocommerce', async (req, res) => {
  const orderData = req.body;

  // Valider les product_id avant d'envoyer la requête
  if (!orderData.line_items.every(item => typeof item.product_id === 'number' && item.product_id > 0)) {
    return res.status(400).json({ error: 'Invalid product_id in line_items' });
  }

  const consumerKey = "ck_bb8f230364904539050fff1a5b157f7378a00949";
  const consumerSecret = "cs_1891b02d5b3cd3952c4c2e779c987a42284205c7";
  
  const authHeader = `Basic ${Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')}`;

  try {
    const response = await fetch('https://api-retrometroid.devprod.fr/wp-json/wc/v3/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader,
      },
      body: JSON.stringify(orderData),
    });

    const responseData = await response.json();
   
    if (!response.ok) {
      console.error('Erreur lors de la création de la commande WooCommerce:', responseData);
      return res.status(response.status).json(responseData);
    }

    console.log('Commande créée avec succès:', responseData);
    return res.status(200).json(responseData);
  } catch (error) {
    console.error('Erreur lors de la requête vers WooCommerce:', error);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
});

export default router;
