const jwt = require("jsonwebtoken");

const authMiddleware = (req,res,next)=>{
    try{
        const authHeader= req.headers.authorization;
        if(!authHeader){
            return res.status(401).json({
                success:false,
                message:'Token missing',
            });

        }
        const token = authHeader.replace("Bearer ","");
        const decode = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
        req.driver = decode;
        next();
    }catch(error){
        return res.json({
            success:false,
            message:'Invalid Token'
        });
    }
};
module.exports =authMiddleware;