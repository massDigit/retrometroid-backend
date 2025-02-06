import request from 'supertest';
import express, { Express } from 'express';
import accessoriesRouter from '../routes/accessories'; // Chemin vers votre routeur
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import Accessorie from '../models/accessories'; // Modèle


const app: Express = express();

app.use(express.json()); // Middleware pour parser les JSON
app.use('/accessories', accessoriesRouter); // Montons le routeur

// Mock de la base de données avant les tests
beforeAll(async () => {
  const mongoUri = `${process.env.CONNECTION_STRING_TEST}`; // Adresse MongoDB pour les tests
  await mongoose.connect(mongoUri);
});

// Cleanup après chaque test
afterEach(async () => {
  await Accessorie.deleteMany({});
});

// Fermeture de la connexion à MongoDB après les tests
afterAll(async () => {
  await mongoose.connection.close();
});

describe('Accessories Routes', () => {
  describe('POST /addAccessorie', () => {
    it('should add a new accessory successfully', async () => {
      const newAccessory = {
        name: 'Test Accessory',
        description: 'A test accessory',
        price: 50,
      };

      const response = await request(app)
        .post('/accessories/addAccessorie')
        .send(newAccessory);

      expect(response.status).toBe(200);
      expect(response.body.result).toBe("true");
      expect(response.body.accessorie.name).toBe(newAccessory.name);
    });

    it('should return an error if required fields are missing', async () => {
      const incompleteAccessory = { name: 'Incomplete Accessory' };

      const response = await request(app)
        .post('/accessories/addAccessorie')
        .send(incompleteAccessory);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Missing or empty fields');
    });

    it('should return an error if accessory already exists', async () => {
      const accessory = {
        name: 'Duplicate Accessory',
        description: 'A duplicate accessory',
        price: 100,
      };

      // Ajouter un accessoire avant de tester la duplication
      await new Accessorie(accessory).save();

      const response = await request(app)
        .post('/accessories/addAccessorie')
        .send(accessory);

      expect(response.status).toBe(409);
      expect(response.body.error).toBe('Accessorie already exists');
    });
  });

  describe('GET /', () => {
    it('should return all accessories', async () => {
      const accessories = [
        { name: 'Accessory 1', description: 'Description 1', price: 10 },
        { name: 'Accessory 2', description: 'Description 2', price: 20 },
      ];

      await Accessorie.insertMany(accessories);

      const response = await request(app).get('/accessories/');

      expect(response.status).toBe(200);
      expect(response.body.result).toBe(true);
      expect(response.body.allAccessories.length).toBe(2);
    });

    it('should return an error if no accessories are found', async () => {
      const response = await request(app).get('/accessories/');

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Accessories not found');
    });
  });
});
