import express,{Request,Response} from 'express';


const router = express.Router();

router.post('/proxy/woocommerce', async (req:Request,res:Response):Promise<void> => {
  const orderData = req.body;

  // Valider les product_id avant d'envoyer la requête
  if (!orderData.line_items.every((item: { product_id: number })=> typeof item.product_id === 'number' && item.product_id > 0)) {
    res.status(400).json({ error: 'Invalid product_id in line_items' });
    return 
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
      res.status(response.status).json(responseData);
      return 
    }

    console.log('Commande créée avec succès:', responseData);
    res.status(200).json(responseData);
    return 
  } catch (error) {
    console.error('Erreur lors de la requête vers WooCommerce:', error);
    res.status(500).json({ error: 'Erreur serveur' });
    return 
  }
});

export default router;
