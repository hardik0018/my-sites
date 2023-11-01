import Order from "@/models/Order";
import connectDb from "@/middlewear/mongoose";
import jsonwebtoken from "jsonwebtoken";

const handler = async (req, res) => {
  const token = req.body.token;
  const data = jsonwebtoken.verify(token, process.env.SECRET_KEY);
  let orders = await Order.find({ email: data.email });
  res.status(200).json({ orders:orders });
};

export default handler;
