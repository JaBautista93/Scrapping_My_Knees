<<<<<<< HEAD
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var logger = require('morgan');
var request = require('request');
var cheerio = require('cheerio');


// Initialize Express
var app = express();
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(express.static(process.cwd() + '/public'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var databaseUri = "mongodb://localhost/scraper"
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI, {
    useMongoClient: true
  });
}
else {
  mongoose.connect(databaseUri, {
    useMongoClient: true
  });
}

var db = mongoose.connection;
db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});

db.once('open', function() {
  console.log('Mongoose connection successful.');
});

// Routes
var Comment = require('./models/Comment.js');
var Article = require('./models/Article.js');
var router = require('./controller/controller.js');
app.use('/', router);

// Launch App
var port = process.env.PORT || 8080;
app.listen(port, function(){
  console.log('Running on port: ' + port);
});
=======
// Dependencies
const express = require("express");
const bodyParser = require("body-parser"); //JSON responses
const mongoose = require("mongoose"); //Mongo object modelling 
const request = require("request"); //Makes http calls
const cheerio = require("cheerio"); //Scraper

// Require all models
const db = require("./models");

// Port configuration for local/Heroku
const PORT = process.env.PORT || process.argv[2] || 8080;

// Initialize Express
const app = express();

// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));

// Handlebars
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));
// Controllers
const router = require("./controllers/api.js");
app.use(router);
// Connect to the Mongo DB
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

// Start the server
app.listen(PORT, function () {
    console.log(`This application is running on port: ${PORT}`);
});
>>>>>>> f352248bac02dd195f0b4425b43aab2b7e1e1640
