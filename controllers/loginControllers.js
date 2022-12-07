//requiring models of user from models folder and bycrypt for password hashing
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');

// for the register view page
const registerView = (req, res) => {
    res.render('register', {});
}

// for the login view page
const loginView = (req, res) => {
    res.render('login', { });
}
const logoutUser = (req,res) =>{
    res.redirect('/login');
}
const registerUser = (req,res) =>{
    const {name, email, location, password, confirm} = req.body;
    //checking fields are not empty
    if( !name || !email || !location || !password || !confirm){
        console.log('Please fill all the fields');
    }
    //checking password is not good
    if(password !== confirm){
        console.log('Password do not match');
    }
    else{
        //if password is good ?
        User.findOne({ email : email }).then(user => {
            if(user){
                console.log('User already exist');
            }
            else{
                const newUser = new User({
                    name,
                    email,
                    location,
                    password
                });
                //hashing password with bcrypt
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err){throw err}
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(res.redirect('/login'))
                            .catch(err => console.log(`User not registered because of error : ${err}`))
                    });
                });
            }
        });
    }
}

//check if user is logged in correctly with the post request, if not -> redirect to login page
const loginUser = (req, res) => {

    const {email, password} = req.body;
    //checking fields are not empty
    if( !email || !password){
        console.log('Please fill all the fields');
        res.render('login', { email, password });
    }
    //if password is good ? go to dashboard : login page
    else {
        passport.authenticate("local", {
            successRedirect: "/dashboard",
            failureRedirect: "/login",
            failureFlash: true,
        })(req, res);
    }
};



module.exports = {
    registerView,
    loginView,
    registerUser,
    loginUser,
    logoutUser
};