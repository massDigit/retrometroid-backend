import express from 'express';
import request from 'supertest';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(express.json());

import categoriesRouter from '../routes/categories'; // Ajustez le chemin si nécessaire
import Category from '../models/categories';

app.use('/categories', categoriesRouter);

// Mock de la base de données avant les tests
beforeAll(async () => {
    const mongoUri = process.env.CONNECTION_STRING_TEST ;
    if (!mongoUri) {
      throw new Error('MongoDB URI is undefined');
    }
    await mongoose.connect(mongoUri);
  });
  
  // Nettoyage après chaque test
  afterEach(async () => {
    await Category.deleteMany({});
  });
  
  // Fermeture de la connexion à MongoDB après les tests
  afterAll(async () => {
    await mongoose.connection.close();
  });


  describe('Categories Routes', () => {
    describe('POST /addCategory', () => {
      it('should add a new category successfully', async () => {
        const newCategory = {
          name: 'Test Category',
        };
  
        const response = await request(app)
          .post('/categories/addCategory')
          .send(newCategory);
  
        expect(response.status).toBe(200);
        expect(response.body.result).toBe('true');
        expect(response.body.Category.name).toBe(newCategory.name);
      });
  
      it('should return an error if required fields are missing', async () => {
        const response = await request(app)
          .post('/categories/addCategory')
          .send({}); // Pas de nom fourni
  
        expect(response.status).toBe(400);
        expect(response.body.result).toBe(false);
        expect(response.body.error).toBe('Missing or empty fields');
      });
  
      it('should return an error if category already exists', async () => {
        const category = {
          name: 'Duplicate Category',
        };
  
        // Ajouter une catégorie avant de tester la duplication
        await new Category(category).save();
  
        const response = await request(app)
          .post('/categories/addCategory')
          .send(category);
  
        expect(response.status).toBe(409);
        expect(response.body.result).toBe('false');
        expect(response.body.error).toBe('Category already exist');
      });
    });
  
    describe('GET /', () => {
      it('should return all categories', async () => {
        const categories = [
          { name: 'Category 1' },
          { name: 'Category 2' },
        ];
  
        await Category.insertMany(categories);
  
        const response = await request(app).get('/categories/');
  
        expect(response.status).toBe(200);
        expect(response.body.result).toBe(true);
        expect(response.body.allCategories.length).toBe(2);
      });
  
      it('should return an error if no categories are found', async () => {
        const response = await request(app).get('/categories/');
  
        expect(response.status).toBe(404);
        expect(response.body.result).toBe(false);
        expect(response.body.error).toBe('Categories not found');
      });
    });
  });
  