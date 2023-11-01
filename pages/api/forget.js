import Forgot from "@/models/Forgot";
import User from "@/models/User";
import jsonwebtoken from "jsonwebtoken";
import cryptojs from "crypto-js";

export default async function handler(req, res) {
  //check the user exist in the database

//   send  on email to the user
  if (req.body.sendmail) {

    let token = "123";
    // let forget = new Forgot({
    //   email: req.body.email,
    //   token: token,
    // });
    // await forget.save()  
    res.redirect("?token=" + token, 200);

    // let email = `We have sent you this email in response to your request to reset your password on Online Bazar. After you reset your password.
    //         To reset your password , please follow the link below:
    
    //         <a href="${process.env.NEXT_PUBLIC_HOST}/forget?token=${token}">Click here reset your passoword</a>
    
    //         <br/><br/>
    
    //         We recommend that you keep your password secure and not share it with anyone.If you feel your password has been compromised, you can change it by going to your  My Account Page change your password.
    
    //        <br/><br/>`;
          
  } else {
    //reset user password
    // let user = jsonwebtoken.verify(token, process.env.JWT_SECRET);

    // let duser = await User.findOneAndUpdate(
    //   { email: user.email },
    //   {
    //     password: cryptojs.AES.encrypt(
    //       req.body.password,
    //       process.env.SECRET_KEY
    //     ).toString(),
    //   }
    // );
    // res.status(200).json({ success: true });
  }
  res.status(200).json({ success: true });
}
