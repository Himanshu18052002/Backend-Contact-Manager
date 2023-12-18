const asynchandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asynchandler(async(req,res,next) => {
    let token;
    const header = req.headers.Authorization || req.headers.authorization;
    if(header && header.startsWith("Bearer")){
        token = header.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,decode) => {
            if(err){
                res.status(401);
                throw new Error("Password not matched");
            }
            req.user = decode.user;
            next();
        })
        if(!token){
            res.status(401);
            throw new Error("Authoriation Failed");
        }
    }
});

module.exports = validateToken;