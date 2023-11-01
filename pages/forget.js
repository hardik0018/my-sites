import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const router = useRouter();

  const hadnleChange = async (e) => {
    if (e.target.name == "email") {
      setemail(e.target.value);
    } else if (e.target.name == "password") {
      setpassword(e.target.value);
    } else if (e.target.name == "cpassword") {
      setcpassword(e.target.value);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("myuser")) {
      router.push("/");
    }
  },[]);

  const resetpassword = async () => {
    if(password==cpassword){
    const data = { password, sendmail: false };
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forget`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const response = await res.json();

    if (response.success) {
      console.log("Password is change");
    } else {
      console.log("Error");
    }
  }else{
    toast.error("Password is not match", {
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

  const sendemail = async () => {
    const data = { email:email, sendmail: true };
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forget`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const response = await res.json();
    console.log(response)
    
  };

  return (
    <div>
      <div>
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
        <section className="bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-col items-center mt-20 px-6 py-8 mx-auto md:h-screen lg:py-0 z-10">
            <a
              href="#"
              className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
            >
              <img
                className="w-8 h-8 mr-2"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                alt="logo"
              />
              Online Bazar
            </a>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Forgot Password
                </h1>
                {router.query.token && (
                  <div>
                    <div className="space-y-4 md:space-y-6">
                      <div>
                        <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          New Password
                        </p>
                        <input
                          onChange={hadnleChange}
                          value={password}
                          type="text"
                          name="password"
                          id="password"
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Password"
                          required=""
                        />
                      </div>
                      <div>
                        <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          ConfirmNew Password
                        </p>
                        <input
                          onChange={hadnleChange}
                          value={cpassword}
                          type="text"
                          name="cpassword"
                          id="cpassword"
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Confirm Password"
                          required=""
                        />
                      </div>

                      <button
                       disabled={password!==cpassword || password.length == 0}
                        onClick={resetpassword}
                        className="disabled:bg-indigo-400 w-full text-white bg-indigo-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      >
                        Set Password
                      </button>
                    </div>
                  </div>
                )}
                {!router.query.token && (
                  <div className="space-y-4 md:space-y-6">
                    <div>
                      <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Your email
                      </p>
                      <input
                        onChange={hadnleChange}
                        value={email}
                        type="text"
                        name="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@company.com"
                        required=""
                      />
                    </div>

                    <button
                      onClick={sendemail}
                      className="w-full text-white bg-indigo-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Continue
                    </button>
                  </div>
           )} 
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Login;
