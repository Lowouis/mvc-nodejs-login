const bcrypt = require('bcryptjs');
LocalStrategy = require('passport-local').Strategy;
console.log(typeof LocalStrategy);

//Load model :
const User = require('../models/User');
const loginCheck = passport => {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            //check customer
            User.findOne({ email : email })
                .then(user => {
                    if(!user){
                        return done(null, false, { message: 'That email is not registered or is wrong' });
                    }
                    //checking password if matching
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if(err){throw err}
                        if(isMatch){
                            return done(null, user);
                        }
                        else{
                            return done(null, false, { message: 'Password incorrect' });
                        }
                    });

                }).catch(err => console.log(`User not registered because of error : ${err}`));
            }
        )
    )


    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });

};

module.exports = {
    loginCheck
};