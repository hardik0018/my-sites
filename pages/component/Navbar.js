import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import {
  AiOutlineShopping,
  AiFillPlusCircle,
  AiFillMinusCircle,
} from "react-icons/ai";

// Show number item in cart ..[pending]

const Navbar = ({
  addtocart,
  cart,
  removeFormcart,
  clearcart,
  subtotal,
  user,
  logout,
}) => {
  let menu = useRef();
  let nav = useRef();
  let menuitem = useRef();
  let menuitemarrow = useRef();
  let router = useRouter();
  const [loginuser, setloginuser] = useState("");
  const [name, setname] = useState("");

  let itemcount = 0;
  for (let item in cart) {
    itemcount++;
  }

  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem("myuser"));

    if (!myuser) {
      router.push("/");
    }
    if (myuser && myuser.token) {
      setloginuser(myuser);
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
  };

  const handleNavbarMenu = () => {
    if (!nav.current.classList.contains("translate-x-full")) {
      nav.current.classList.add("translate-x-full");
    }
    if (menu.current.classList.contains("-translate-x-full")) {
      menu.current.classList.remove("-translate-x-full");
    } else {
      menu.current.classList.add("-translate-x-full");
    }
  };
  const handleNavbarMenuitem = () => {
    if (menuitem.current.classList.contains("hidden")) {
      menuitem.current.classList.remove("hidden");
      menuitemarrow.current.classList.remove("rotate-180");
    } else {
      menuitem.current.classList.add("hidden");
      menuitemarrow.current.classList.add("rotate-180");
    }
  };
  const handleNavbarCart = () => {
    if (!menu.current.classList.contains("-translate-x-full")) {
      menu.current.classList.add("-translate-x-full");
    }
    if (nav.current.classList.contains("translate-x-full")) {
      nav.current.classList.remove("translate-x-full");
    } else {
      nav.current.classList.add("translate-x-full");
    }
  };
  const allItemhandle = () => {
    if (!menu.current.classList.contains("-translate-x-full")) {
      menu.current.classList.add("-translate-x-full");
    }
  };

  return (
    <div className="sticky top-0 z-10">
      <div className="flex flex-row bg-white shadow-md shadow-blue-700 pb-2">
        <div
          className="text-center"
          onClick={() => {
            handleNavbarMenu();
          }}
        >
          <ul className="absolute top-2 my-2 left-3">
            <li className="w-5 md:w-6 h-0.5 md:h-1 m-1 bg-black"></li>
            <li className="w-5 md:w-6 h-0.5 md:h-1 m-1 bg-black"></li>
            <li className="w-5 md:w-6 h-0.5 md:h-1 m-1 bg-black"></li>
          </ul>
        </div>

        <div className="mx-auto  mt-3 font-bold text-xl md:text-3xl">
          Online Bazar
        </div>
        {!user.value && (
          <Link href={"/login"}>
            {" "}
            <button className="absolute top-3 md:text-xl text-lg right-14 md:right-28 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-2 md:py-1 md:px-6 border border-blue-500 hover:border-transparent rounded">
              Login
            </button>
          </Link>
        )}

        <button
          type="button"
          className="absolute top-4 right-4 md:right-10 text-2xl md:text-3xl"
        >
          <AiOutlineShopping
            onClick={() => {
              handleNavbarCart();
            }}
          />
        </button>
      </div>
      {/* Shooping cart */}
      <div
        ref={nav}
        className="w-full h-full translate-x-full overflow-y-auto "
      >
        <div
          onClick={() => {
            handleNavbarCart();
          }}
          className="md:w-4/6 w-1/5 fixed top-12 md:top-14 bottom-0 transition ease-in-out lg:left-0 p-2 overflow-y-auto text-center bg-gray-500 opacity-40"
        ></div>
        <div
          id="drawer-navigation"
          className={`fixed md:top-14 w-4/5 md:w-2/6 border border-black rounded-md transition ease-in-out top-12 right-0 z-40 h-screen p-4 bg-white`}
          aria-labelledby="drawer-navigation-label"
        >
          <button
            onClick={() => {
              handleNavbarCart();
            }}
            type="button"
            data-drawer-hide="drawer-navigation"
            aria-controls="drawer-navigation"
            className="text-gray-400 bg-transparent hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
            </svg>
            <span className="sr-only">Close menu</span>
          </button>
          <h5
            id="drawer-navigation-label"
            className="text-2xl font-bold text-center text-indigo-800 uppercase"
          >
            Cart
          </h5>
          <ol className="my-4">
            {Object.keys(cart).length == 0 && (
              <div className="font-semibold text-2xl text-center">
                Your cart is empty{" "}
              </div>
            )}
            {Object.keys(cart).map((item) => {
              return (
                <li key={item} className="my-3 mx-3 py-4">
                  <div className="item flex font-semibold">
                    <div className="w-2/6">
                      <img
                        className="w-20 h-20 object-cover rounded-md"
                        src={cart[item].img}
                      />
                    </div>
                    <div className="w-4/6 ml-5 flex flex-col">
                      <div className="w-2/3 md:font-bold font-semibold text-md md:text-xl">
                        {cart[item].name}
                      </div>

                      <div className="w-1/3 flex justify-start mt-6">
                        <button
                          disabled={cart[item].qty <= 1}
                          className="border border-black px-2 cursor-pointer disabled:text-gray-500 disabled:border-gray-500"
                          onClick={() => {
                            removeFormcart(
                              item,
                              1,
                              cart[item].price,
                              cart[item].name,
                              cart[item],
                              cart[item].size,
                              cart[item].variant
                            );
                          }}
                        >
                          -
                        </button>
                        <p className="border border-black px-3">
                          {cart[item].qty}
                        </p>
                        <button
                          className="border border-black px-2 cursor-pointer"
                          onClick={() => {
                            addtocart(
                              item,
                              1,
                              cart[item].price,
                              cart[item].name,
                              cart[item],
                              cart[item].size,
                              cart[item].variant
                            );
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>

          {!Object.keys(cart).length == 0 && (
            <div className="font-bold text-xl ">Subtotal: ₹{subtotal}</div>
          )}
          {!Object.keys(cart).length == 0 && (
            <div className="flex flex-row justify-center">
              <Link href={"/checkout"}>
                <button className="inline-flex text-white bg-indigo-500 border-0 py-2  px-2 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                  Checkout
                </button>
              </Link>
              <button
                onClick={clearcart}
                className=" mx-2 inline-flex text-white bg-indigo-500 border-0  py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              >
                ClearCart
              </button>
            </div>
          )}
          <div className="py-4 overflow-y-auto"></div>
        </div>
      </div>

      {/* Menu */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link href="/dist/tailwind.css" rel="stylesheet" />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.0/font/bootstrap-icons.css"
      />
      <div className="bg-blue-600">
        <div
          ref={menu}
          className="sidebar fixed top-0 -translate-x-full  bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-gray-900 transition ease-in-out duration-300"
        >
          <div className="text-gray-100 text-xl">
            <div className="mt-1 p-2.5 flex">
              {user.value && (
                <div className="flex w-full">
                  <div className="w-1/3 flex items-start">
                    <i className="bi bi-app-indicator px-2 py-1 rounded-md bg-blue-600"></i>
                  </div>
                  <div className="w-2/3 flex items-center">
                    <h1 className="font-bold text-gray-200 text-[15px] ">
                      {name}
                    </h1>
                  </div>
                </div>
              )}
              {!user.value && (
                <div className="rounded-md px-6 py-2 duration-300 cursor-pointer hover:bg-blue-600">
                  <i className="bi bi-door-open"></i>
                  <Link href={"/signup"}>
                    <span className="text-[15px] ml-2 text-gray-200 font-bold">
                      Signup
                    </span>
                  </Link>
                </div>
              )}
              <i
                className="bi bi-x cursor-pointer items-end"
                onClick={() => {
                  handleNavbarMenu();
                }}
              ></i>
            </div>
            <div className="my-2 bg-gray-600 h-[1px]"></div>
          </div>
          <div className="p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-gray-700 text-white">
            <i className="bi bi-search text-sm"></i>
            <input
              type="text"
              placeholder="Search"
              className="text-[15px] ml-4 w-full bg-transparent focus:outline-none"
            />
          </div>
          {user.value && (
            <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
              <i className="bi bi-house-door-fill"></i>
              <Link href={"/myaccount"}>
                <span
                  onClick={() => {
                    allItemhandle();
                  }}
                  className="text-[15px] ml-4 text-gray-200 font-bold"
                >
                  My Account
                </span>
              </Link>
            </div>
          )}
          <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
            <i className="bi bi-house-door-fill"></i>
            <Link href={"/"}>
              <span
                onClick={() => {
                  allItemhandle();
                }}
                className="text-[15px] ml-4 text-gray-200 font-bold"
              >
                Home
              </span>
            </Link>
          </div>
          <div
            onClick={() => {
              allItemhandle();
            }}
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
          >
            <i className="bi bi-bookmark-fill"></i>
            <span className="text-[15px] ml-4 text-gray-200 font-bold">
              Bookmark
            </span>
          </div>
          <div className="my-4 bg-gray-600 h-[1px]"></div>
          <div
            onClick={() => {
              handleNavbarMenuitem();
            }}
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
          >
            <i className="bi bi-chat-left-text-fill"></i>
            <div className="flex justify-between w-full items-center">
              <span className="text-[15px] ml-4 text-gray-200 font-bold">
                Products
              </span>
              <span ref={menuitemarrow} className="text-sm" id="arrow">
                <i className=" bi bi-chevron-down"></i>
              </span>
            </div>
          </div>
          <div
            ref={menuitem}
            className="text-left text-sm hidden mt-2 w-4/5 mx-auto text-gray-200 font-bold"
            id="submenu"
          >
            <Link href={"/tshirt"}>
              <h1
                onClick={() => {
                  allItemhandle();
                }}
                className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1"
              >
                Tshirt
              </h1>
            </Link>
            <Link href={"/shirt"}>
              <h1
                onClick={() => {
                  allItemhandle();
                }}
                className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1"
              >
                Shirt
              </h1>
            </Link>
            <Link href={"/"}>
              <h1
                onClick={() => {
                  allItemhandle();
                }}
                className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1"
              >
                Shoese
              </h1>
            </Link>
          </div>
          <div className="my-4 bg-gray-600 h-[1px]"></div>
          <div className="p-2.5 mt-3 flex items-center rounded-md  duration-300 cursor-pointer hover:bg-blue-600 text-white">
            {user.value && (
              <div>
                <div
                  onClick={logout}
                  className="text-[17px]  text-gray-200 font-bold"
                >
                  <i className="bi bi-box-arrow-in-right"></i>
                  <span
                    onClick={() => {
                      allItemhandle();
                    }}
                    className="mx-2"
                  >
                    Logout
                  </span>
                </div>
              </div>
            )}
            {!user.value && (
              <div>
                <i className="bi bi-door-open"></i>
                <Link href={"/login"}>
                  <span
                    onClick={() => {
                      allItemhandle();
                    }}
                    className="text-[17px]  text-gray-200 font-bold"
                  >
                    Login
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
