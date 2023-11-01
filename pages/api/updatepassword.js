import connectDb from "@/middlewear/mongoose";
import User from "@/models/User";
import jsonwebtoken from "jsonwebtoken";
import cryptojs from "crypto-js";

const handler = async (req, res) => {
  if (req.method == "POST") {
    let token = req.body.token;
    let user = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    let duser = await User.findOne({ email: user.email });
    const bytes = cryptojs.AES.decrypt(duser.password, process.env.SECRET_KEY);
    const decryptpass = bytes.toString(cryptojs.enc.Utf8);
    if (
      decryptpass == req.body.password &&
      req.body.newpassword == req.body.cpassword 
    ) {
      let duser = await User.findOneAndUpdate(
        { email: user.email },
        {
          password: cryptojs.AES.encrypt(
            req.body.newpassword,
            process.env.SECRET_KEY
          ).toString(),
        }
      );
      res.status(200).json({ success: true });
    } else {
      res.status(200).json({ success: false });
    }
  } else {
    res.status(400).json({ error: "error" });
  }
};

export default connectDb(handler);
