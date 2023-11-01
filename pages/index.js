import Link from "next/link";
import React from "react";
import Product from "@/models/Product";
import mongoose from "mongoose";


const Home = ({ product }) => {
 
  return (
    <div className="min-h-screen">
      <div className="min-h-screen">
       <title>Online Bazar</title>
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
                  {/* <div className=" ml-3 flex items-center">
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
                  </div> */}
                </h4>
              </Link>
            </div>
          );
        })}
      </section>
    </div>
      <section className="text-gray-600 body-font ">
        <div className="container px-5 py-24 mx-auto w-full">
          <div className="flex flex-col md:flex-row -m-4  items-center justify-center">
            <div className="md:w-1/3 p-4 flex items-center justify-center">
              <div className="border border-gray-200 p-6 rounded-lg w-full text-center">
                <div className="flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                  <svg
                    stroke="currentColor"
                    fill="none"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="text-3xl"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M14 6a2 2 0 1 0 -4 0c0 1.667 .67 3 2 4h-.008l7.971 4.428a2 2 0 0 1 1.029 1.749v.823a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-.823a2 2 0 0 1 1.029 -1.749l7.971 -4.428"></path>
                  </svg>
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                  Premium Products
                </h2>
                <p className="leading-relaxed text-base">
                  Our Product is Best Quality.
                </p>
              </div>
            </div>
            <div className="md:w-1/3 p-4 flex items-center justify-center">
              <div className="border border-gray-200 p-6 rounded-lg w-full text-center">
                <div className="flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 640 512"
                    className="text-3xl"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M624 352h-16V243.9c0-12.7-5.1-24.9-14.1-33.9L494 110.1c-9-9-21.2-14.1-33.9-14.1H416V48c0-26.5-21.5-48-48-48H112C85.5 0 64 21.5 64 48v48H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h272c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H40c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h208c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h208c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H64v128c0 53 43 96 96 96s96-43 96-96h128c0 53 43 96 96 96s96-43 96-96h48c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zM160 464c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm320 0c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm80-208H416V144h44.1l99.9 99.9V256z"></path>
                  </svg>
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                  Free Shipping
                </h2>
                <p className="leading-relaxed text-base">
                  We ship all over India for FREE.
                </p>
              </div>
            </div>
            <div className="md:w-1/3 p-4 flex items-center justify-center">
              <div className="border border-gray-200 p-6 rounded-lg w-full text-center">
                <div className="flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 320 512"
                    className="text-3xl"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M308 96c6.627 0 12-5.373 12-12V44c0-6.627-5.373-12-12-12H12C5.373 32 0 37.373 0 44v44.748c0 6.627 5.373 12 12 12h85.28c27.308 0 48.261 9.958 60.97 27.252H12c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h158.757c-6.217 36.086-32.961 58.632-74.757 58.632H12c-6.627 0-12 5.373-12 12v53.012c0 3.349 1.4 6.546 3.861 8.818l165.052 152.356a12.001 12.001 0 0 0 8.139 3.182h82.562c10.924 0 16.166-13.408 8.139-20.818L116.871 319.906c76.499-2.34 131.144-53.395 138.318-127.906H308c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12h-58.69c-3.486-11.541-8.28-22.246-14.252-32H308z"></path>
                  </svg>
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                  Exciting Offers
                </h2>
                <p className="leading-relaxed text-base">
                  We provide amazing offers &
                 discounts on our products.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let products = await Product.find();
  
  return {
    props: { product: JSON.parse(JSON.stringify(products)) },
  };
}
export default Home;
