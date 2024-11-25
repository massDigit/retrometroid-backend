require("dotenv").config();

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const http = require("http");
const bodyParser = require("body-parser");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const optionsRouter = require("./routes/options");
const productsRouter = require("./routes/products");
const colorRouter = require("./routes/colors");
const accessorieRouter = require("./routes/accessories");
const stripeRouter = require("./routes/stripe"); // Importer la route Stripe

const app = express();
const log = morgan("dev");
const port = process.env.PORT || 4242;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(log);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, 'public')));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/options", optionsRouter);
app.use("/products", productsRouter);
app.use("/colors", colorRouter);
app.use("/accessories", accessorieRouter);
app.use("/stripe", stripeRouter); // Utiliser la route Stripe

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
  res.render("error");
});

module.exports = app;
