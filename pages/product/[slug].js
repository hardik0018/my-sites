import { useRouter } from "next/router";
import Product from "@/models/Product";
import mongoose from "mongoose";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Error from "next/error";

const Page = ({ addtocart, variants, product, user, error, clearcart,buynow }) => {
  const router = useRouter();
  const { slug } = router.query;

  const [color, setcolor] = useState();
  const [size, setsize] = useState();
  const [pin, setpin] = useState();
  const [service, setservice] = useState();

  useEffect(() => {
    if (!error) {
      setcolor(product.color);
      setsize(product.size);
    }
  }, [router.query]);

  const checkservicebiliy = async () => {
    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
    let pinsjson = await pins.json();

    if (Object.keys(pinsjson).includes(pin)) {
      setservice(true);
      toast.success("Your Pincode is serviceable ", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      setservice(false);
      toast.error("Sorry,Pincode is not serviceable ", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const onchangepin = (e) => {
    setpin(e.target.value);
  };

  

  const refreshVaraint = (newcolor, newsize) => {
    let url = `http://localhost:3000/product/${variants[newcolor][newsize]["slug"]}`;
    router.push(url);
  };

  if (error == 404) {
    return <Error statusCode={404} />;
  }
  return (
    <div>
      <div className="bg-gray-100 py-8">
        <ToastContainer
          position="bottom-center"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
              <div className="h-[460px] rounded-lg bg-gray-300 mb-4">
                <img
                  className="w-full h-full object-cover"
                  src={product.img}
                  alt="Product Image"
                />
              </div>
              <div className="flex -mx-2 mb-4">
                <div className="w-1/2 px-2">
                  
                    <button
                      disabled={product.availableQty <= 0}
                      onClick={() => {
                        addtocart(
                          slug,
                          1,
                          product.price,
                          product.title,
                          product.size,
                          product.color,
                          product.img
                        );
                      }}
                      className="w-full disabled:bg-gray-300 border border-black bg-gray-400 text-black py-2 px-4 rounded-full font-bold hover:bg-gray-600"
                    >
                      Add to Cart
                    </button>
                  
                 
                </div>
                <div className="w-1/2 px-2">
                  <button
                   onClick={() => {
                    buynow(
                      slug,
                      1,
                      product.price,
                      product.title,
                      product.size,
                      product.color,
                      product.img
                    );
                  }}
                    disabled={product.availableQty <= 0}
                    className="disabled:bg-gray-600 w-full bg-black text-white py-2 px-4 rounded-full font-bold"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
            <div className="md:flex-1 px-4">
              <h2 className="text-2xl font-bold mb-2">
                {" "}
                {product.title}({product.size}/{product.color})
              </h2>
              <p className="text-gray-600 text-sm mb-4">{product.desc}</p>
              <div className="flex mb-4">
                <div className="mr-4">
                  {product.availableQty > 0 && (
                    <span className="font-bold text-gray-700">Price:</span>
                  )}
                  {product.availableQty > 0 && (
                    <span className="text-gray-600"> ₹{product.price}</span>
                  )}
                </div>
                <div>
                  <span className="font-bold text-gray-700">Availability:</span>
                  {product.availableQty > 0 && (
                    <span className="text-gray-600"> In Stock</span>
                  )}
                  {product.availableQty == 0 && (
                    <span className="text-gray-600"> Out of Stock</span>
                  )}
                </div>
              </div>
              <div className="mb-4">
                <span className="font-bold text-gray-700">Select Color:</span>
                <div className="flex items-center mt-2">
                  {Object.keys(variants).includes("gray") &&
                    Object.keys(variants["gray"]).includes(size) && (
                      <button
                        onClick={() => {
                          refreshVaraint("gray", size);
                        }}
                        className={` ${
                          color === "gray" ? "border-black" : "border-gray-300"
                        } border-2 w-6 h-6 rounded-full bg-gray-800 mr-2`}
                      ></button>
                    )}
                  {Object.keys(variants).includes("red") &&
                    Object.keys(variants["red"]).includes(size) && (
                      <button
                        onClick={() => {
                          refreshVaraint("red", size);
                        }}
                        className={` ${
                          color === "red" ? "border-black" : "border-gray-300"
                        } border-2 w-6 h-6 rounded-full bg-red-500 mr-2`}
                      ></button>
                    )}
                  {Object.keys(variants).includes("blue") &&
                    Object.keys(variants["blue"]).includes(size) && (
                      <button
                        onClick={() => {
                          refreshVaraint("blue", size);
                        }}
                        className={` ${
                          color === "blue" ? "border-black" : "border-gray-300"
                        } border-2 w-6 h-6 rounded-full bg-blue-500 mr-2`}
                      ></button>
                    )}
                  {Object.keys(variants).includes("yellow") &&
                    Object.keys(variants["yellow"]).includes(size) && (
                      <button
                        onClick={() => {
                          refreshVaraint("yellow", size);
                        }}
                        className={` ${
                          color === "yellow"
                            ? "border-black"
                            : "border-gray-300"
                        } border-2 w-6 h-6 rounded-full bg-yellow-500 mr-2`}
                      ></button>
                    )}
                </div>
              </div>
              <div className="mb-4">
                <span className="font-bold text-gray-700">Select Size:</span>
                <div className="flex items-center mt-2">
                  {color && Object.keys(variants[color]).includes("S") && (
                    <button
                      onClick={() => {
                        refreshVaraint(color, "S");
                      }}
                      className={`bg-gray-300 ${
                        size === "S" ? "border-black" : "border-gray-300"
                      } border-2  text-gray-700 py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400`}
                    >
                      S
                    </button>
                  )}
                  {color && Object.keys(variants[color]).includes("M") && (
                    <button
                      onClick={() => {
                        refreshVaraint(color, "M");
                      }}
                      className={`bg-gray-300 ${
                        size === "M" ? "border-black" : "border-gray-300"
                      } border-2  text-gray-700 py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400`}
                    >
                      M
                    </button>
                  )}
                  {color && Object.keys(variants[color]).includes("L") && (
                    <button
                      onClick={() => {
                        refreshVaraint(color, "L");
                      }}
                      className={`bg-gray-300 ${
                        size === "L" ? "border-black" : "border-gray-300"
                      } border-2  text-gray-700 py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400`}
                    >
                      L
                    </button>
                  )}
                  {color && Object.keys(variants[color]).includes("XL") && (
                    <button
                      onClick={() => {
                        refreshVaraint(color, "XL");
                      }}
                      className={`bg-gray-300 ${
                        size === "XL" ? "border-black" : "border-gray-300"
                      } border-2  text-gray-700 py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400`}
                    >
                      XL
                    </button>
                  )}
                  {color && Object.keys(variants[color]).includes("XXL") && (
                    <button
                      onClick={() => {
                        refreshVaraint(color, "XXL");
                      }}
                      className={`bg-gray-300 ${
                        size === "XXL" ? "border-black" : "border-gray-300"
                      } border-2  text-gray-700 py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400`}
                    >
                      XXL
                    </button>
                  )}
                </div>
              </div>
              <div>
                <span className="font-bold text-gray-700">
                  Product Description:
                </span>
                <p className="text-gray-600 text-sm mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                </p>
              </div>
              <div className="mb-6 mt-6 flex md:flex-row flex-col">
                <input
                  type="text"
                  id="pincode"
                  value={pin}
                  onChange={onchangepin}
                  placeholder="Enter Your Pincode"
                  className="bg-gray-50 border border-gray-600 text-gray-900 text-sm rounded-lg  block w-72 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <button
                  onClick={checkservicebiliy}
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 mt-2 md:mt-0 focus:ring-blue-300 font-medium rounded-lg text-sm md:ml-3 md:px-5 py-2.5 dark:bg-blue-600 w-32 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Check
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export async function getServerSideProps(context) {
  let error = null;
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let product = await Product.findOne({ slug: context.query.slug });
  if (product == null) {
    return {
      props: { error: 404 },
    };
  }
  let variants = await Product.find({ title: product.title });
  let colorSizeSlug = {};

  for (let item of variants) {
    if (Object.keys(colorSizeSlug).includes(item.color)) {
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    } else {
      colorSizeSlug[item.color] = {};
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    }
  }

  return {
    props: {
      error: error,
      variants: JSON.parse(JSON.stringify(colorSizeSlug)),
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}
export default Page;
