import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaShoppingCart, FaUserAlt } from "react-icons/fa";
import useCartStore from "../../store/cartStore";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const cart = useCartStore((state) => state.cart);
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const isLoggedIn = false;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Shop",
      path: "/shop",
    },
    {
      name: "About Us",
      path: "/aboutus",
    },
    {
      name: "Blog",
      path: "/blog",
    },
    {
      name: "Contact Us",
      path: "/contactus",
    },
  ];

  return (
    <header
      className={`left-1/2 -translate-x-1/2 top-0 w-[90%] py-4 z-99 rounded-full transition-all duration-300 ${
        isScrolled
          ? "bg-white text-black shadow-md fixed top-4 md:px-6 px-4"
          : "bg-transparent text-white absolute"
      }`}
    >
      <div className="made-containe flex gap-4 items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            className="lg:hidden inline"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <FaBars />
          </button>
          {/* <h4 className='md:text-xl text-sm leading-4 font-[Montserrat]! font-bold!'>ONIPTTECHMULTIPLECONCEPT</h4> */}
          <h4 className="md:text-xl text-sm leading-4 font-[Montserrat]! font-bold!">
            OMC
          </h4>
        </div>
        <div className="flex items-center gap-8">
          <ul
            className={`${
              isOpen
                ? `grid grid-cols-2 left-0 -z-1 w-full p-[5%] backdrop-blur-md rounded-xl overflow-hidden ${isScrolled ? "bg-black/40" : "bg-black/10"}`
                : "hidden lg:flex"
            } lg:static absolute lg:left-auto -left-[100dvh] top-14 transition-all duration-1000 items-center gap-8`}
          >
            {navLinks.map((link, index) => (
              <li key={index} onClick={() => setIsOpen(false)}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `font-medium text-xs pb-2 border-b-3 border-transparent hover:border-secondary transition-all duration-500 ${
                      isActive ? "border-secondary!" : ""
                    } ${!isScrolled || isOpen ? "text-white" : "text-black"}`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="flex items-center md:gap-8 gap-6 text-lg">
            <Link to="/cart" className="flex items-center gap-2 rounded-md relative">
              <FaShoppingCart />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-[10px] w-4 h-4 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
            {!isLoggedIn ? (
              <Link to="/login" className="flex items-center gap-2 rounded-md">
                <FaUserAlt />
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => setShowOptions(prev => !prev)}
                className="flex items-center gap-2 rounded-md"
              >
                <FaUserAlt />
                <div
                    className={`min-w-[100px] p-1 shadow-md absolute rounded ${
                        isScrolled
                            ? "bg-black text-light"
                            : "bg-white text-dark"
                        } top-[80%] right-0 ${
                        showOptions
                            ? "block"
                            : "hidden"
                    } flex flex-col`}
                >
                  <Link
                    to="/myorders"
                    className="text-xs font-medium hover:bg-body_color/10 border-b border-body_color/70 last:border py-1"
                  >
                    My Orders
                  </Link>
                  <Link
                    to="/admin/manageproducts"
                    className="text-xs font-medium hover:bg-body_color/10 border-b border-body_color/70 last:border py-1"
                  >
                    Manage products
                  </Link>
                  <Link
                    to="/admin/manageorders"
                    className="text-xs font-medium hover:bg-body_color/10 border-b border-body_color/70 last:border py-1"
                  >
                    Manage orders
                  </Link>
                  <Link
                    to="/myorders"
                    className="text-xs font-medium hover:bg-body_color/10 border-b border-body_color/70 last:border-b-0 py-1"
                  >
                    Logout
                  </Link>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
