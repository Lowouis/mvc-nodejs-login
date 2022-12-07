//requiring models of user from models folder and bycrypt for password hashing
const User = require('../models/User');
const bycrypt = require('bcryptjs');



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
                //hashing password with bycrypt
                bycrypt.genSalt(10, (err, salt) => {
                    bycrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err){throw err}
                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
                                console.log(`User : ${user} -> registered`);
                            })
                            .catch(err => console.log(`User : ${user} -> not registered because of error : ${err}`));
                    });
                });
            }
        });
    }


}

// for the register view page
const registerView = (req, res) => {
    res.render('register', {});
}

// for the login view page
const loginView = (req, res) => {
    res.render('login', { });
}


module.exports = {
    registerView,
    loginView,
    registerUser
}