// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const handler = async (req, res) => {
  res.status(200).json({ body: req.body });
};

export default handler;
