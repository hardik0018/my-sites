import Link from "next/link";
import React from "react";
import Product from "@/models/Product";
import mongoose from "mongoose";

const tshirt = ({ product }) => {
  return (
    <div className="min-h-screen">
       <title>T-shirt</title>
      <section
        id="Projects"
        className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
      >
        {Object.keys(product).map((item) => {
          return (
            <div
              key={product[item]._id}
              className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
            >
              <Link href={`/product/${product[item].slug}`}>
                <h4>
                  <img
                    src={product[item].img}
                    alt="Product"
                    className="h-80 w-72 object-cover rounded-t-xl"
                  />
                  <div className="px-4 py-3 w-72">
                    <span className="text-gray-400 mr-3 uppercase text-xs">
                      Brand
                    </span>
                    <p className="text-lg font-bold text-black truncate block capitalize">
                      {product[item].title}
                    </p>
                    <div className="flex items-center">
                      <p className="text-lg font-semibold text-black cursor-auto my-3">
                        ₹ {product[item].price}
                      </p>
                      <del>
                        <p className="text-sm text-gray-600 cursor-auto ml-2">
                          ₹599
                        </p>
                      </del>
                      {/* <div className="ml-auto">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          className="bi bi-bag-plus"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
                          <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                        </svg>
                      </div> */}
                    </div>
                  </div>
                  <div className=" ml-3 flex items-center">
                    {product[item].size.includes('S') &&<button className="bg-gray-300 text-xs text-gray-700 py-1 border-2 border-gray-500 px-2 rounded-full font-bold mr-1 hover:bg-gray-400">
                      S
                    </button>}
                    {product[item].size.includes('M') &&<button className="bg-gray-300 text-xs text-gray-700 py-1 border-2 border-gray-500 px-2 rounded-full font-bold mr-1 hover:bg-gray-400">
                      M
                    </button>}
                    {product[item].size.includes('L') &&<button className="bg-gray-300 text-xs text-gray-700 py-1 border-2 border-gray-500 px-2 rounded-full font-bold mr-1 hover:bg-gray-400">
                      L
                    </button>}
                    {product[item].size.includes('XL') &&<button className="bg-gray-300 text-xs text-gray-700 py-1 border-2 border-gray-500 px-2 rounded-full font-bold mr-1 hover:bg-gray-400">
                      XL
                    </button>}
                    {product[item].size.includes('XXL') &&<button className="bg-gray-300 text-xs text-gray-700 py-1 border-2 border-gray-500 px-2 rounded-full font-bold mr-1 hover:bg-gray-400">
                      XXL
                    </button>}
                  </div>
                  <div className="flex ml-3 items-center mt-2 mb-3">
                    {product[item].color.includes('gray') &&<button className="w-6 h-6 rounded-full bg-gray-800 mr-2"></button>}
                    {product[item].color.includes('red') &&<button className="w-6 h-6 rounded-full bg-red-500 mr-2"></button>}
                    {product[item].color.includes('blue') &&<button className="w-6 h-6 rounded-full bg-blue-500 mr-2"></button>}
                    {product[item].color.includes('yellow') &&<button className="w-6 h-6 rounded-full bg-yellow-500 mr-2"></button>}
                  </div>
                </h4>
              </Link>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  
  let products = await Product.find({ category: "tshirt" });
  let tshirts = {};

  for (let item of products) {
    if (item.title in tshirts) {
      if (
        !tshirts[item.title].color.includes(item.color) &&
        item.availableQty > 0
      ) {
        tshirts[item.title].color.push(item.color);
      }
      if (
        !tshirts[item.title].size.includes(item.size) &&
        item.availableQty > 0
      ) {
        tshirts[item.title].size.push(item.size);
      }
    } else {
      tshirts[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        tshirts[item.title].color = [item.color];
        tshirts[item.title].size = [item.size];
      }
    }
  }

  return {
    props: { product: JSON.parse(JSON.stringify(tshirts)) },
  };
}

export default tshirt;
