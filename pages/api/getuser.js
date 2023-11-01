import connectDb from "@/middlewear/mongoose"
import User from "@/models/User"
import jsonwebtoken from "jsonwebtoken";

const handler=async(req,res)=>{

    if(req.method=='POST'){
        let token=req.body.token;
        let user=jsonwebtoken.verify(token,process.env.JWT_SECRET)
        let duser=await User.findOne({email:user.email})
        const{name,email,address,pincode,phone}=duser


        res.status(200).json({name,email,address,pincode,phone})
    }else{
        res.status(400).json({error:"error"})
    }
    
}


export default connectDb(handler);
  