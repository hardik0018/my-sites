const mongoose=require('mongoose')

const OrderSchema= new mongoose.Schema({
    email:{type:String,required:true},
    name:{type:String,required:true},
    orderId:{type:String,required:true},
    paymentInfo:{type:String,default:''},
    Products:{type:Object,required:true},
    address:{type:String,required:true},
    pincode:{type:String,required:true},
    state:{type:String,required:true},
    phone:{type:String,required:true},  
    city:{type:String,required:true},
    amount:{type:Number,required:true},
    date:{type:String,Request:true},
    month:{type:String,Request:true},
    year:{type:String,Request:true},
    discount:{type:String,Request:true,default:0},
    shoopingcharge:{type:String,Request:true,default:0},
    status:{type:String,default:'Pending',required:true},
    delivarystatus:{type:String,default:'Not delivered',required:true},
},{timestamps:true})

export default mongoose.models.Order || mongoose.model("Order",OrderSchema)