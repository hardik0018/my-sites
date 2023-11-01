import { data } from "autoprefixer";
import { now } from "mongoose";
import { useRouter } from "next/router";
import Script from "next/script";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function checkout({ subtotal, cart, order,total, cleartcart,discount,shoopingcharge }) {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [pincode, setpincode] = useState("");
  const [address, setaddress] = useState("");
  const [phone, setphone] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [disabled, setdisabled] = useState(true);
  const [user, setuser] = useState({ value: null })
  const router = useRouter();

  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem("myuser"))
    let a = localStorage.getItem("cart")
    if (a.length == 2) {
      router.push('/')
    }

    if (myuser.token) {
      setuser(myuser)
      setemail(myuser.email);
      fetchdata(myuser.token)
    }
  }, []);


  useEffect(() => {
    if (
      name.length > 3 &&
      address.length > 3 &&
      email.length > 3 &&
      phone.length > 3 &&
      pincode.length > 3
    ) {
      setdisabled(false);
    }
  }, [name, email, phone, pincode, address])

  const fetchdata = async (token) => {
    const data = { token: token };
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const response = await res.json();
    setname(response.name);
    setphone(response.phone);
    setaddress(response.address);
    setpincode(response.pincode);
    getpincode(response.pincode)
  };

  let getpincode = async (pin) => {
    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
    let pinsjson = await pins.json();
    if (Object.keys(pinsjson).includes(pin)) {
      setstate(pinsjson[pin][1]);
      setcity(pinsjson[pin][0]);
    } else {
      setcity("");
      setstate("");
    }
  }
  const hadnleChange = async (e) => {
    if (e.target.name == "name") {
      setname(e.target.value);
    } else if (e.target.name == "email") {
      setemail(e.target.value);
    } else if (e.target.name == "address") {
      setaddress(e.target.value);
    } else if (e.target.name == "phone") {
      setphone(e.target.value);
    } else if (e.target.name == "pincode") {
      setpincode(e.target.value);
      if (e.target.value.length == 6) {
        getpincode(e.target.value)
      }
    } else {
      setcity("");
      setstate("");
    }
  };
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const handlePayment = async () => {
    if (!localStorage.getItem("cart")) {
      router.push('/')
    }
    let d = new Date
    let date = d.getDate()
    let month = months[d.getMonth()];
    let year = d.getFullYear()

    const data = { subtotal, email, name,total,address, phone, pincode, cart, city, state, date, month, year, shoopingcharge, discount };
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/pretranscation`,
      {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const response = await res.json();
    if (response.success) {
      handleoptios(response.data);
    } else {
      // cleartcart(); ..[pending]
      toast.error(response.error, {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const handleoptios = async (data) => {
    const { amount, id, name, city, pincode, state } = data;
    var options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
      amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      order_id: id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: `${process.env.NEXT_PUBLIC_HOST}/api/posttranscation`,
      pincode: pincode,
      city: city,
      state: state,

    };
    let rzp1 = new Razorpay(options);
    rzp1.open();
  };
  return (
    <div>
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
      <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32"></div>
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Order Summary</p>
          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            {Object.keys(cart).map((item) => {
              return <div key={item} className="flex flex-col rounded-lg bg-white sm:flex-row">
                <img
                  className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                  src={cart[item].img}
                  alt=""
                />
                <div className="flex w-full flex-col px-4 py-4">
                  <span className="font-semibold">
                    {cart[item].name}({cart[item].size}/{cart[item].variant})
                  </span>
                  <span className="float-right text-gray-400">Qty:{cart[item].qty}</span>
                  <p className="text-lg font-bold">₹{cart[item].price}</p>
                </div>
              </div>
            })}
          </div>
        </div>
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <p className="text-xl font-medium">Addres Details</p>
          <p className="text-gray-400">Fill your delivery address.</p>
          <div className="">
            <p className="mt-4 mb-2 block text-sm font-medium">Name</p>
            <div className="relative">
              <input
                onChange={hadnleChange}
                value={name}
                type="text"
                id="name"
                name="name"
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-4 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Name"
              />
            </div>
            <p className="mt-4 mb-2 block text-sm font-medium">Email</p>
            <div className="relative">
              {user && user.value ? (
                <input
                  readOnly
                  value={user.email}
                  type="text"
                  id="email"
                  name="email"
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-4 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="your.email@gmail.com"
                />
              ) : (
                <input
                  onChange={hadnleChange}
                  value={email}
                  type="text"
                  id="email"
                  name="email"
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-4 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="your.email@gmail.com"
                />
              )}
            </div>
            <p className="mt-4 mb-2 block text-sm font-medium">Address</p>
            <div className="relative">
              <input
                onChange={hadnleChange}
                value={address}
                type="text"
                id="address"
                name="address"
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-4 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Address"
              />
            </div>
            <p className="mt-4 mb-2 block text-sm font-medium">Phone Number</p>
            <div className="relative">
              <input
                onChange={hadnleChange}
                value={phone}
                type="number"
                inputMode="numeric"
                id="phone"
                name="phone"
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-4 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="XXXXXXXXXX"
              />
            </div>
            <p className="mt-4 mb-2 block text-sm font-medium">PinCode</p>
            <div className="relative">
              <input
                onChange={hadnleChange}
                value={pincode}
                type="number"
                inputMode="numeric"
                name="pincode"
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-4 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Pincode"
              />
            </div>
            <p className="mt-4 mb-2 block text-sm font-medium">City</p>
            <div className="relative">
              <input
                type="text"
                id="city"
                onChange={hadnleChange}
                value={city}
                name="city"
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-4 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="City"
              />
            </div>
            <p className="mt-4 mb-2 block text-sm font-medium">State</p>
            <div className="relative">
              <input
                onChange={hadnleChange}
                type="text"
                value={state}
                id="state"
                name="state"
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-4 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="State"
              />
            </div>

            <div className="flex flex-col sm:flex-row"></div>
            <div className="mt-6 border-t border-b py-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Subtotal</p>
                <p className="font-semibold text-gray-900">₹{subtotal}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Shipping</p>
                <p className="font-semibold text-gray-900">₹{shoopingcharge}</p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Total</p>
              <p className="text-2xl font-semibold text-gray-900">
                ₹{total}
              </p>
            </div>
          </div>
          <button
            disabled={disabled}
            onClick={() => {
              handlePayment();
            }}
            className="mt-4 disabled:bg-slate-500 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default checkout;
