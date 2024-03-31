
var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var cookieParser = require('cookie-parser');
var app = express();
var cors = require('cors');

var app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());
app.use(cors());
app.options("*",cors());

//Require the Router we defined in movies.js
var movies = require('./movies.js');
var users = require('./users.js');
var rooms = require('./rooms.js');

//Use the Router on the sub route /movies
app.use('/movies', movies);
app.use('/users',users);
app.use('/rooms',rooms);

// app.use(cors());

app.listen(3001);