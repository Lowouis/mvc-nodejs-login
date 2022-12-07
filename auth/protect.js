
//module for redirect users not connect or not allowed to go on dashboard
const protectRoute = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    console.log('Please log in to continue');
    res.redirect('/login');
}

const allowIf = (res,req, next)=>{
    if(!req.isAuthenticated()){
        return next();
    }
    res.redirect('/dashboard');
}

module.exports = {
    protectRoute,
    allowIf,
};