import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Order from "@/models/Order";
import mongoose from "mongoose";

function ordersummary({ order,clearcart,shoopingcharge,total}) {
  let product = order.Products;
  let router=useRouter();

  useEffect(()=>{

    if(router.query.clearcart==1){
      clearcart();
    }
  },[])

  return (
    <div className="min-h-screen">
      <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
        <div className="flex justify-start item-start space-y-2 flex-col">
          <h1 className="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
            {order.orderId}
          </h1>
          <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">
            Your order is successful Placed. Your payment status is:{" "}
            {order.status}
          </p>
        </div>
        <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
          <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
            <div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
              <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">
                Customer’s Cart
              </p>
              {Object.keys(product).map((key) => {
                return (
                  <div
                    key={key}
                    className="mt-4 mx-auto md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full"
                  >
                    <div className="pb-4 md:pb-8  w-full md:w-40">
                      <img
                        className="w-14 h-24 md:block ml-9"
                        src={`${product[key].img}`}
                        alt="dress"
                      />
                    </div>
                    <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                      <div className="w-full flex flex-col justify-start items-start space-y-8">
                        <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
                          {product[key].name}
                        </h3>
                        <div className="flex justify-start items-start flex-col space-y-2">
                          <p className="text-sm dark:text-white leading-none text-gray-800">
                            <span className="dark:text-gray-400 text-black">
                              Size:{product[key].size}
                            </span>{" "}
                          </p>
                          <p className="text-sm dark:text-white leading-none text-gray-800">
                            <span className="dark:text-gray-400 text-black">
                              Color:{product[key].variant}
                            </span>{" "}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between space-x-8 items-start w-full">
                        <p className="text-base dark:text-white xl:text-lg leading-6">
                          Price : ₹{product[key].price}
                          <span className="text-red-300 line-through">
                            {" "}
                            ₹45.00
                          </span>
                        </p>
                        <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">
                          Quntity : {product[key].qty}
                        </p>
                        <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">
                          Total Price: {product[key].price * product[key].qty}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-center flex-col md:flex-row items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
              <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                  Summary
                </h3>
                <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                  <div className="flex justify-between w-full">
                    <p className="text-base dark:text-white leading-4 text-gray-800">
                      Subtotal
                    </p>
                    <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                      ₹{order.amount-order.shoopingcharge}
                    </p>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base dark:text-white leading-4 text-gray-800">
                      Discount{" "}
                      <span className="bg-gray-200 p-1 text-xs font-medium dark:bg-white dark:text-gray-800 leading-3 text-gray-800">
                        STUDENT
                      </span>
                    </p>
                    <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                      ₹0
                    </p>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base dark:text-white leading-4 text-gray-800">
                      Shipping
                    </p>
                    <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                      ₹{order.shoopingcharge}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">
                    Total
                  </p>
                  <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">
                    ₹{order.amount}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  let order = await Order.findById(context.query.id);

  return {
    props: { order: JSON.parse(JSON.stringify(order)) },
  };
}

export default ordersummary;
