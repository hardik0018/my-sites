// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import User from "@/models/User";
var CryptoJS = require("crypto-js");


export default async function handler(req, res) {
  if (req.method == "POST") {
      const {name,email}=req.body
      let u=new User({name,email,password:CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()})
      await u.save();
    res.status(200).json({success:"success" });

  } else {
    res.status(400).json({ error: "this method is not allowed" });
  }
}

