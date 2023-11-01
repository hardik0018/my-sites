import "@/styles/globals.css";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";


function App({ Component, pageProps }) {
  const [cart, setcart] = useState({});
  const [subtotal, setsubtotal] = useState(0);
  const [total, settotal] = useState(0);
  const [user, setuser] = useState({ value: null });
  const [key, setkey] = useState(0);
  const [progress, setProgress] = useState(0);
  const [discount, setdiscount] = useState(0);
  const [shoopingcharge, setshoopingcharge] = useState(0)
  const router = useRouter();
  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setProgress(40);
    });
    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });
    try {
      if (localStorage.getItem("cart")) {
        setcart(JSON.parse(localStorage.getItem("cart")));
        saveCart(JSON.parse(localStorage.getItem("cart")));
      }
    } catch (error) {
      console.log(error);
      localStorage.clear();
    }
    const myuser = JSON.parse(localStorage.getItem("myuser"))
    if (myuser) {
      setuser({ value: myuser.token,email:myuser.email });
      setkey(Math.random);
    }
  }, [router.query]);

  const saveCart = (mycart) => {
    localStorage.setItem("cart", JSON.stringify(mycart));
    let subt = 0;
    let keys = Object.keys(mycart);
    for (let i = 0; i < keys.length; i++) {
      subt += mycart[keys[i]].price * mycart[keys[i]].qty;
    }
    let sc;
    setsubtotal(subt);
    if(subt<250){
     sc=40
    }
    if(subt>250){
      sc=0
    }
    setshoopingcharge(sc)
    let t=sc+subt
    settotal(t)
  };
  const buynow = (itemcode, qty, price, name, size, variant,img) => {
    saveCart({})
    let newcart={itemcode:{qty: 1, price,name, size, variant,img}}
    
    setcart(newcart);
    saveCart(newcart);
    router.push("/checkout");
  };

  const addtocart = (itemcode, qty, price, name, size, variant,img) => {
    let newcart = cart;
    if (itemcode in cart) {
      newcart[itemcode].qty = cart[itemcode].qty + qty;
    } else {
      newcart[itemcode] = { qty: 1, price, name, size, variant,img };
    }
    setcart(newcart);
    saveCart(newcart);
  };

  const removeFormcart = (itemcode, qty, price, name, size, variant,img) => {
    let newcart = JSON.parse(JSON.stringify(cart));
    if (itemcode in cart) {
      newcart[itemcode].qty = cart[itemcode].qty - qty;
    }

    if (newcart[itemcode].qty <= 0) {
      delete newcart[itemcode];
    }
    setcart(newcart);
    saveCart(newcart);
  };
  
  const clearcart = () => {
    setcart({});
    saveCart({});
  };
  const logout = () => {
    localStorage.clear();
    setuser({ value: null });
    setkey(Math.random);
  };
  return (
    <>
      
      <Navbar
        key={key}
        user={user}
        addtocart={addtocart}
        cart={cart}
        shoopingcharge={shoopingcharge}
        discount={discount}
        removeFormcart={removeFormcart}
        clearcart={clearcart}
        subtotal={subtotal}
        logout={logout}
        total={total}
      />
      <Component
        {...pageProps}
        user={user}
        buynow={buynow}
        addtocart={addtocart}
        shoopingcharge={shoopingcharge}
        discount={discount}
        cart={cart}
        total={total}
        removeFormcart={removeFormcart}
        clearcart={clearcart}
        subtotal={subtotal}
      />
      <Footer />
    </>
  );
}
export default App;
