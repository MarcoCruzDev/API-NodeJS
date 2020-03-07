const express = require("express");
const cors = require('cors'); // Serve para partilhar os meus recursos de dominios diferentes.
const mongoose = require("mongoose");
const requireDir = require('require-dir');

//Iniciar a app
const app = express();
app.use(express.json());
app.use(cors());

//Iniciar DB
mongoose.connect('mongodb://127.0.0.1:27017/nodeapi',
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true
  });

requireDir('./src/app/models');

//require('./src/app/controllers/index')(app);


//Inicio Rotas
const userRouter = require("./src/users");
const authRouter = require("./src/auth");
const categoryRouter = require("./src/category");
const productRouter = require("./src/product");

app.use(userRouter);
app.use(authRouter);
app.use(categoryRouter);
app.use(productRouter);

app.listen(3000);

