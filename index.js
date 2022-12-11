const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const session = require('express-session');
const MongoClient = require('mongodb').MongoClient;
const PORT = process.env.PORT || 3000;
const passport = require("passport");
const { loginCheck } = require("./auth/passport");
dotenv.config();
const databaseCreditential = process.env.MANGOLAB_URI;
loginCheck(passport);
mongoose.set('strictQuery', false);
app.use("/css", express.static(__dirname + "/views/style"))


//mangodb connection
//setting up the db connection
mongoose.connect(databaseCreditential, {useNewUrlParser:true, useUnifiedTopology:true})
    .then(() => {
        console.log('MongoDB connected...');
        //collection_books =
    })
    .catch(err => console.log(`Connexion failed error : ${err}`));

MongoClient.connect(databaseCreditential, function(err, db) {

});

//setting up the engine of the view
app.set('view engine', 'ejs');

//allowing us to have a response as a json (body parsing)
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret:'oneboy',
    saveUninitialized: true,
    resave: true
}));


app.use(passport.initialize());
app.use(passport.session());
//settings up all routes
app.use('/', require('./routes/login'));


//dev server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



// Replace the uri string with your MongoDB deployment's connection string.
