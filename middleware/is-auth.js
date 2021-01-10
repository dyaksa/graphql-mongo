const jwt = require("jsonwebtoken");

module.exports = async (req,res,next) => {
    const header = req.headers["authorization"];
    if(!header){
        req.isAuth = false;
        return next();
    }

    const token = req.headers["authorization"].split(' ')[1];
    if(!token || token === ''){
        req.isAuth = false;
        return next();
    }

    let decoded;
    try {
        decoded = await jwt.verify(token,process.env.JWT_SECRET_KEY);
    }catch(err){
        req.isAuth = false;
        return next();
    }
    if(!decoded){
        req.isAuth = false;
        return next();
    }
    req.isAuth = true;
    req.userId = decoded.userId;
    return next();
}