import dotenv from 'dotenv';
dotenv.config();

import createError from 'http-errors';
import express from 'express';
import cors from 'cors';
import path , {dirname } from 'path';
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
const port = process.env.PORT


console.log('Serving images from:', path.join(__dirname, '../../retrometroid-backend/public/images'));
app.use('/images', express.static(path.join(__dirname, '../../retrometroid-backend/public/images')));


const corsOptions = {
  origin: ['http://localhost:3001', 'https://api-retrometroid.devprod.fr'], // Remplace par les domaines autorisés
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true,
};
app.use(cors(corsOptions));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(log);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/options', optionsRouter);
app.use('/products', productsRouter);
app.use('/colors',colorRouter);
app.use('/accessories',accessorieRouter);
app.use('/categories',categoryRouter);
app.use('/api', proxyRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
