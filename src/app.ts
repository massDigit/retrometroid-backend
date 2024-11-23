import dotenv from 'dotenv';
dotenv.config();

import createError from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path, { dirname } from 'path';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import http from 'http';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import './models/connection.js';
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import optionsRouter from './routes/options.js';
import productsRouter from './routes/products.js';
import colorRouter from './routes/colors.js';
import accessorieRouter from './routes/accessories.js';
import categoryRouter from './routes/categories.js';
import proxyRouter from './routes/proxyRouter.js';

const app = express();
const log = morgan("dev");
const port = process.env.PORT || 3000;

console.log('Serving images from:', path.join(__dirname, '../../retrometroid-backend/public/images'));
app.use('/images', express.static(path.join(__dirname, '../../retrometroid-backend/public/images')));

const corsOptions = {
  origin: ['http://localhost:3001', 'https://api-retrometroid.devprod.fr'], // Remplace par les domaines autorisés
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true,
};
app.use(cors(corsOptions));

// Configuration du moteur de vue
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// Middlewares
app.use(log);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/options', optionsRouter);
app.use('/products', productsRouter);
app.use('/colors', colorRouter);
app.use('/accessories', accessorieRouter);
app.use('/categories', categoryRouter);
app.use('/api', proxyRouter);

// Catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
