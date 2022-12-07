//setting up the environment variables
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const passport = require('passport');
const { loginCheck } = require('./auth/passport');

mongoose.set('strictQuery', false);


/*app.use(passport.initialize());
app.use(passport.session());*/

//allowing us to have a response as a json
app.use(express.urlencoded({ extended: false }));


//setting up the engine of the view
app.set('view engine', 'ejs');


//setting up the db connection
dotenv.config();
const db = process.env.MANGOLAB_URI;
//mangodb connection
mongoose.connect(db, {useNewUrlParser:true, useUnifiedTopology:true})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(`Connexion failed error : ${err}`));



//settings up all routes
app.use('/', require('./routes/login'));


//dev server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
