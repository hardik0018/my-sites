const mongoose=require('mongoose')

const CouponsSchema=new mongoose.Schema({
    
},{timestamps:true})

mongoose.models={} 
export default  mongoose.model("Coupeons",CouponsSchema)