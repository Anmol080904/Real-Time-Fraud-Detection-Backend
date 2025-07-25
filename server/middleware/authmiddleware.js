const jwt=require("jsonwebtoken");
const {jwtsecret}=require("../config/jwt.js");
module.exports={
    function(req,res,next){
        const token=req.headers["authorization"];
        if(!token) return res.status(401).json({error:"ACCESS DENIED"});
        try {
            const verified = jwt.verify(token.split(" ")[1], jwtSecret);
            req.user = verified;
            next();
        }   
        catch (err) {
            res.status(400).json({ error: "Invalid Token" });
        }
    }  
};