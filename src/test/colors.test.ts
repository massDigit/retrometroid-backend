import express from 'express';
import request from 'supertest';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import colorsRouter from '../routes/colors';
import Color from '../models/colors';

const app = express();

app.use(express.json());
app.use('/colors', colorsRouter);

beforeAll(async () => {
  const mongoUri = process.env.CONNECTION_STRING_TEST || 'mongodb://localhost:27017/testdb';
  if (!mongoUri) {
    throw new Error('CONNECTION_STRING_TEST is undefined');
  }
  await mongoose.connect(mongoUri);
});

afterEach(async () => {
  await Color.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Colors Routes', () => {
  describe('POST /addColor', () => {
    it('should add a new color successfully', async () => {
      const newColor = {
        name: 'Test Color',
      };

      const response = await request(app)
        .post('/colors/addColor')
        .send(newColor);

      expect(response.status).toBe(201);
      expect(response.body.result).toBe('true');
      expect(response.body.color.name).toBe(newColor.name);
    });

    it('should return an error if required fields are missing', async () => {
      const response = await request(app)
        .post('/colors/addColor')
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.result).toBe(false);
      expect(response.body.error).toBe('Missing or empty fields');
    });

    it('should return an error if color already exists', async () => {
      const color = {
        name: 'Duplicate Color',
      };

      await new Color(color).save();

      const response = await request(app)
        .post('/colors/addColor')
        .send(color);

      expect(response.status).toBe(409);
      expect(response.body.result).toBe('false');
      expect(response.body.error).toBe('Color already exist');
    });
  });

  describe('GET /', () => {
    it('should return all colors', async () => {
      const colors = [
        { name: 'Red' },
        { name: 'Blue' },
      ];

      await Color.insertMany(colors);

      const response = await request(app).get('/colors/');

      expect(response.status).toBe(200);
      expect(response.body.result).toBe(true);
      expect(Array.isArray(response.body.allColor)).toBe(true);
      expect(response.body.allColor.length).toBe(2);
    });

    it('should return an error if no colors are found', async () => {
      const response = await request(app).get('/colors/');

      expect(response.status).toBe(404);
      expect(response.body.result).toBe(false);
      expect(response.body.error).toBe('No colors found');
    });
  });
});
