const mongoose=require('mongoose')

const ForgetSchema=new mongoose.Schema({
    email:{type:String,unique:true,required:true},
    token:{type:String,required:true},
},{timestamps:true})

mongoose.models={} 
export default mongoose.model("Forgot",ForgetSchema)