import User from "@/models/User";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineClose } from "react-icons/ai";

function myaccount({ subtotal }) {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [pincode, setpincode] = useState("");
  const [address, setaddress] = useState("");
  const [phone, setphone] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const [newpassword, setnewpassword] = useState("");
  const [user, setuser] = useState({ value: null });
  const router = useRouter();
  let popupaddress = useRef();
  let popupassword = useRef();

  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem("myuser"));

    if (!myuser) {
      router.push("/");
    }
    if (myuser && myuser.token) {
      setuser(myuser);
      setemail(myuser.email);
      fetchdata(myuser.token);
    }
  }, []);

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
  };

  const hadnleChange = async (e) => {
    if (e.target.name == "name") {
      setname(e.target.value);
    } else if (e.target.name == "address") {
      setaddress(e.target.value);
    } else if (e.target.name == "phone") {
      setphone(e.target.value);
    } else if (e.target.name == "pincode") {
      setpincode(e.target.value);
    } else if (e.target.name == "password") {
      setpassword(e.target.value);
    } else if (e.target.name == "cpassword") {
      setcpassword(e.target.value);
    } else if (e.target.name == "newpassword") {
      setnewpassword(e.target.value);
    }
  };

  const handleUsersubmit = async () => {
    const data = { token: user.token, name, address, pincode, phone };
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const response = await res.json();
    if (response.success) {
      toast.success("Succefully Upadate details", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      popupaddress.current.classList.remove("hidden");
    } else {
      toast.error("Error", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const handlePasswordsubmit = async () => {
    if (newpassword == password) {
      toast.error("Password is matching,Set other password", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else if (newpassword == cpassword) {
      const data = { token: user.token, password, cpassword, newpassword };
      let res = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/updatepassword`,
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
        toast.success("Succefully Password Upadate", {
          position: "bottom-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        toast.error("Enter Password is wrong", {
          position: "bottom-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } else {
      toast.error("Password is not matching", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    setpassword("");
    setnewpassword("");
    setcpassword("");
  };

  const handlePopupaddrees = () => {
    if (popupaddress.current.classList.contains("hidden")) {
      popupaddress.current.classList.remove("hidden");
      popupaddress.current.classList.add("flex");
    } else {
      popupaddress.current.classList.add("hidden");
      popupaddress.current.classList.remove("flex");
    }
  };

  const handlePopuppassword=()=>{
    if (popupassword.current.classList.contains("hidden")) {
      popupassword.current.classList.remove("hidden");
      popupassword.current.classList.add("flex");
    } else {
      popupassword.current.classList.add("hidden");
      popupassword.current.classList.remove("flex");
    }
  }
  return (
    <div className="mt-6">
      {/* Popup bar */}
      <div
        ref={popupaddress}
        className="fixed hidden z-50 w-full p-4 items-center justify-center md:inset-0 "
      >
        <div className="relative w-1/3 border-2 border-black  max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow-2xl dark:bg-gray-700 shadow-blue-500">
            <button
              onClick={handlePopupaddrees}
              type="button"
              className="absolute text-xl top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg  w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <AiOutlineClose />
              <span className="sr-only">Close modal</span>
            </button>
            <div className="px-6 py-6 lg:px-8">
              <div className="">
                <p className="mt-4 mb-2 block text-sm font-medium">Name</p>
                <div className="relative">
                  <input
                    onChange={hadnleChange}
                    value={name}
                    type="text"
                    id="name"
                    name="name"
                    className="w-96 rounded-md border border-gray-400 px-4 py-3 pl-4 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Name"
                  />
                </div>
                <p className="mt-4 mb-2 block text-sm font-medium">Email</p>
                <div className="relative">
                  <input
                    readOnly
                    value={user.email}
                    type="text"
                    id="email"
                    name="email"
                    className="w-96 rounded-md border border-gray-400 px-4 py-3 pl-4 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="your.email@gmail.com"
                  />
                </div>
                <p className="mt-4 mb-2 block text-sm font-medium">Address</p>
                <div className="relative">
                  <input
                    onChange={hadnleChange}
                    value={address}
                    type="text"
                    id="address"
                    name="address"
                    className="w-96 rounded-md border border-gray-400 px-4 py-3 pl-4 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Address"
                  />
                </div>
                <p className="mt-4 mb-2 block text-sm font-medium">
                  Phone Number
                </p>
                <div className="relative">
                  <input
                    onChange={hadnleChange}
                    value={phone}
                    type="number"
                    inputMode="numeric"
                    id="phone"
                    name="phone"
                    className="w-96 rounded-md border border-gray-400 px-4 py-3 pl-4 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
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
                    className="w-96 rounded-md border border-gray-400 px-4 py-3 pl-4 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Pincode"
                  />
                </div>
              </div>
              <div className="flex items-center justify-center">
                <button
                  onClick={handleUsersubmit}
                  className="bg-blue-500 hover:bg-blue-700 mt-6 mb-3 text-center text-white font-bold py-2 px-4 border border-blue-700 rounded"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h1 className="md:text-2xl text-xl text-center font-semibold md:font-bold">Your Personal Details</h1>
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
        theme="dark"
      />
      <div className="sm:px-10 lg:px-20 xl:px-32">
        <div className="mt-2 md:mt-10 bg-gray-50 px-4 pt-8 lg:mt-0 mx-auto border border-black">
          <p className="md:text-xl text-md  font-medium">Addres Details</p>
          <p className="text-gray-400">Fill your delivery address.</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2">
                <div className="md:mx-5 mx-3 ">
                  <p className="mt-4 mb-2 block text-sm font-medium">Name</p>
                  <div className="relative">
                    <input
                      readOnly
                      value={name}
                      type="text"
                      id="name"
                      name="name"
                      className="w-[95%] md:w-80 lg:w-96 rounded-md border border-gray-500 px-4 py-3 pl-4 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Name"
                    />
                  </div>
                </div>
                <div className="md:mx-5 mx-3 ">
                  <p className="mt-4 mb-2 block text-sm font-medium">Email</p>
                  <div className="relative">
                    <input
                      readOnly
                      value={email}
                      type="text"
                      id="email"
                      name="email"
                      className="w-[95%] md:w-80 lg:w-96 rounded-md border border-gray-500 px-4 py-3 pl-4 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="your.email@gmail.com"
                    />
                  </div>
                </div>
                <div className="md:mx-5 mx-3 ">
                  <p className="mt-4 mb-2 block text-sm font-medium">Address</p>
                  <div className="relative">
                    <input
                      readOnly
                      value={address}
                      type="text"
                      id="address"
                      name="address"
                      className="w-[95%] md:w-80 lg:w-96 rounded-md border border-gray-500 px-4 py-3 pl-4 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Address"
                    />
                  </div>
                </div>
                <div className="md:mx-5 mx-3 ">
                  <p className="mt-4 mb-2 block text-sm font-medium">Phone Number</p>
                  <div className="relative">
                    <input
                      readOnly
                      value={phone}
                      type="number"
                      inputMode="numeric"
                      id="phone"
                      name="phone"
                      className="w-[95%] md:w-80 lg:w-96 rounded-md border border-gray-500 px-4 py-3 pl-4 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="XXXXXXXXXX"
                    />
                  </div>
                </div>
                <div className="md:mx-5 mx-3 ">
                  <p className="mt-4 mb-2 block text-sm font-medium">PinCode</p>
                  <div className="relative">
                    <input
                      readOnly
                      value={pincode}
                      type="number"
                      inputMode="numeric"
                      name="pincode"
                      className="w-[95%] md:w-80 lg:w-96 rounded-md border border-gray-500 px-4 py-3 pl-4 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Pincode"
                    />
                  </div>
                </div>

              </div>
          <button
            onClick={handlePopupaddrees}
            className="bg-blue-500 hover:bg-blue-700 mt-6 mb-3 text-white font-bold py-2 px-4 border border-blue-700 rounded"
          >
            Edit
          </button>
        </div>
      </div>

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
              Other Services
            </h1>
          </div>
          <div className="flex flex-wrap -m-4">
            <div className="xl:w-1/3 md:w-1/2 p-4  border border-black ">
              <div className="p-6 rounded-lg cursor-pointer">
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                  Change The Password
                </h2>
                <p className="leading-relaxed text-base">
                  Your Update the Password Easily...{" "}
                </p>
                <button
                  onClick={handlePopuppassword}
                  className="bg-blue-500 hover:bg-blue-700 mt-6 mb-3 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                >
                  Update Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div
        ref={popupassword}
        className="fixed hidden z-50 w-full p-4 items-center justify-center md:inset-0 "
      >
        <div className="relative w-1/3 border-2 border-black  max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow-2xl dark:bg-gray-700 shadow-blue-500">
            <button
              onClick={handlePopuppassword}
              type="button"
              className="absolute text-xl top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg  w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <AiOutlineClose />
              <span className="sr-only">Close modal</span>
            </button>
            <div className="px-6 py-6 lg:px-8">
              <div className="">
                <p className="mt-4 mb-2 block text-sm font-medium">Password</p>
                <div className="relative">
                  <input
                    onChange={hadnleChange}
                    value={password}
                    type="text"
                    name="password"
                    className="w-96 rounded-md border border-gray-400 px-4 py-3 pl-4 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Password"
                  />

                  <p className="mt-4 mb-2 block text-sm font-medium">
                    New Password
                  </p>
                  <input
                    onChange={hadnleChange}
                    value={newpassword}
                    type="text"
                    name="newpassword"
                    className="w-96 rounded-md border border-gray-400 px-4 py-3 pl-4 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Confirm Password"
                  />
                  <p className="mt-4 mb-2 block text-sm font-medium">
                    Confirm New Password
                  </p>

                  <input
                    onChange={hadnleChange}
                    value={cpassword}
                    type="text"
                    name="cpassword"
                    className="w-96 rounded-md border border-gray-400 px-4 py-3 pl-4 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Confirm Password"
                  />
                </div>
              </div>
              <div className="flex items-center justify-center">
              <button
                onClick={handlePasswordsubmit}
                className="bg-blue-500 hover:bg-blue-700 mt-6 mb-3 text-white font-bold py-2 px-4 border border-blue-700 rounded"
              >
                Change
              </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default myaccount;
