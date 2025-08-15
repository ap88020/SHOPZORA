import jwt from 'jsonwebtoken';

const adminAuth = async (req,res,next) => {
    try {
        const { token } = req.headers;

        if(!token){
            return res.status(400).json({success:false , message:"token not found"});
        }

        const token_decoded = jwt.verify(token , process.env.JWT_SECRET);

        if(token_decoded != process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.status(400).json({success:false , message:"Not Authorized Login Again"});
        }

        next();

    } catch (error) {
        console.log(error);
        res.status(400).json({success:false , message:error.message});
    }   
}

export default adminAuth;