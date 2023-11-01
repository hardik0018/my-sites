import React, { useEffect, useState } from "react";
import mongoose from "mongoose";
import { useRouter } from "next/router";
import Link from "next/link";

function orders() {
  const router = useRouter();
    const [order, setorder] = useState([])
    
  useEffect(() => {
    const fetchorders = async () => {
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myorders`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: localStorage.getItem("myuser") }),
      });
      let res = await a.json();
      console.log(res.orders);
      setorder(res.orders)
    };
    if (!localStorage.getItem("myuser")) {
      router.push("/");
    } else {
        fetchorders()
    }
  }, []);
  return (
    <div className="mt-10 min-h-screen">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-10">
        <table className="w-full justify-center items-center text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
               #Order Id 
              </th>
              <th scope="col" className="px-6 py-3">
               Email
              </th>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Amount
              </th>
              <th scope="col" className="px-6 py-3">
               Details
              </th>
            </tr>
          </thead>
          <tbody>
           {order.map((item)=>{ return <tr key={item._id} className="border-b border-gray-200 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
              >
                {item.orderId}
              </th>
              <td className="px-6 py-4">{item.email}</td>
              <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">{item.amount}</td>
              <td className="px-6 py-4 hover:underline text-blue-600"><Link href={'/ordersummary?id=' +item._id}>Details</Link></td>
            </tr>})}
          </tbody>
        </table>
      </div>
    </div>
  );
}


export default orders;
