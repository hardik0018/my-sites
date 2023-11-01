import User from "@/models/User";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

export default async function handler(req, res) {
  if (req.method == "POST") {
    let user = await User.findOne({ email: req.body.email });
    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const decryptpass = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    if (user) {
      if (req.body.email == user.email && req.body.password == decryptpass) {
        var token = jwt.sign(
          { email: user.email, name: user.name },
          process.env.JWT_SECRET,
          { expiresIn: "2d" }
        );
        res.status(200).json({ token, success: true, email: user.email });
      } else {
        res.status(400).json({ success: false, error: "Invalid" });
      }
    } else {
      res.status(400).json({ success: false, error: "not user found" });
    }
  } else {
    res
      .status(400)
      .json({ success: false, error: "This method is not allowed" });
  }
}
