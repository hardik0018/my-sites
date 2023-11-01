import Order from "@/models/Order";
import connectDb from "@/middlewear/mongoose";
import { JsonWebTokenError } from "jsonwebtoken";
import Product from "@/models/Product";

const handler = async (req, res) => {
  let order;
  //validate razorpay signature..[pending]
  order = await Order.findOneAndUpdate(
    { orderId: req.body.razorpay_order_id },
    { status: "Paid", paymentInfo: JSON.stringify(req.body) }
  );
  let product = order.Products;

  for (let slug in product) {
    await Product.findOneAndUpdate(
      { slug: slug },
      { $inc: { "availableQty": - product[slug].qty } }
    );
  }
  //update status into otders table after checking the trasaction status..[pending]

  //initiate shipping..[pending]
  //redirect user to the order confirmation page..[complate]
  res.redirect("/ordersummary?clearcart=1&id=" + order._id, 200);
  // res.status(200).json({ body: req.body });
};

export default handler;
