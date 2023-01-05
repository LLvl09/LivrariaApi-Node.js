const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./Config/config');

const app = express();
const router = express.Router();

mongoose.set('strictQuery', false);
mongoose.connect(config.connectionString)

const Book = require('./Models/book');
const Author= require('./Models/author');
const Category = require('./Models/category');

//Configuring the routes
const bookRoute = require('./Routes/bookRoute');
const authorRoute = require('./Routes/authorRoute');
const categoryRoute = require('./Routes/categoryRoute');


//Configuring the body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/books', bookRoute);
app.use('/authors', authorRoute);
app.use('/categorys', categoryRoute);

module.exports = app;