const jwt = require("jsonwebtoken");

module.exports = async (req,res,next) => {
    const header = req.headers.authorization;
    if(!header || header === ''){
        req.isAuth = false;
        return next();
    }

    let decoded;
    try {
        const token = req.headers.authorization.split(' ')[1];
        decoded = await jwt.verify(token,process.env.JWT_SECRET_KEY);
    }catch(err){
        throw err;
    }
    if(!decoded){
        req.isAuth = false;
        return next();
    }
    req.userId = decoded.userId;
    return next();
}