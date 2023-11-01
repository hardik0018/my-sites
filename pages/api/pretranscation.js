const Razorpay = require("razorpay");
import Order from "@/models/Order";
import connectDb from "@/middlewear/mongoose";
import Product from "@/models/Product";
import pincodes from '../../pincodes.json'

const handler = async (req, res) => {
  if (req.method == "POST") {
      //check pincode is serviceable 

      if(!Object.keys(pincodes).includes(req.body.pincode)){
        res.status(200).json({
          success: false,
          error: "You enter pincodes is not serviceble ",
        });
      }

    let product;
    let sumtotal = 0;
    let a;
    const { name, cart, subtotal,total, email, address, phone, pincode,state,city,date,month,year,shoopingcharge,discount} = req.body;
  

      if(phone.length !==10  )
      {
        res.status(200).json({
          success: false,
          error: "Your mobile Number is invalid ",
        });
      }

      if(pincode.length !==6)
      {
        res.status(200).json({
          success: false,
          error: "Your Pincode is invalid",
        });
      }

    //check if the is tampered with cat...[complete]
    for (let item in cart) {
      console.log(item);
      a = cart;
      sumtotal += cart[item].price * cart[item].qty;
      product = await Product.findOne({ slug: item });
      // check if the cart items are out of stocke...[pending]

      if(product.availableQty <cart[item].qty){
        res.status(200).json({
          success: false,
          error: "The some item is Out of stock.",
        });
      }

      if (product.price != cart[item].price) {
        res.status(200).json({
          success: false,
          error: "the price of some itemas in your cart have changed. ",
        });
        return;
      }
    }

    if (sumtotal !== subtotal) {
      res.status(200).json({
        success: false,
        error:
          "the price of some itemas in your cart have changed. Please try again",
      });
      return;
    }


    // check if the details are valid...[pending]

    let instance = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    let options = {
      amount: total * 100, // amount in the smallest currency unit
      currency: "INR",
    };

    let data = await instance.orders.create(options);
      console.log(pincode,city )
    let order = new Order({
      email: email,
      name:name,
      orderId: data.id,
      address: address,
      Products: cart,
      amount: total,
      phone:phone,
      pincode:pincode,
      city:city,
      state:state,
      date:date,
      discount:discount,
      shoopingcharge:shoopingcharge,
      month:month,
      year:year
    });

    await order.save();
    res
      .status(200)
      .json({
        success: true,
        data: data,
      });
  }
};

export default handler;
