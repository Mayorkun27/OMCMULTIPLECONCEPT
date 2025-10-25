import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FaBars, FaShoppingCart, FaUser, FaUserAlt } from "react-icons/fa"

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

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
    ]

    return (
        <header className='bg-primary text-white relative left-0 top-0 z-99 w-full py-4'>
            <div className="made-container flex gap-4 items-center justify-between">
                <div className="flex items-center gap-2">
                    <button 
                        className='lg:hidden inline'
                        onClick={() => setIsOpen(prev => !prev)}
                    >
                        <FaBars />
                    </button>
                    <h4 className='md:text-2xl text-sm font-bold leading-4'>ONIPTTECHMULTIPLECONCEPT</h4>
                </div>
                <div className="flex items-center gap-8">
                    <ul className={`${isOpen ? "grid grid-cols-2 left-0 -z-1 w-full p-[5%] backdrop-blur-md bg-white/10" : "lg:flex"} lg:static absolute -left-[100dvh] top-12 transition-all duration-1000 items-center gap-8`}>
                        {
                            navLinks.map((link, index) => (
                                <li key={index}>
                                    <NavLink 
                                        to={link.path} 
                                        className={({ isActive }) => `font-medium text-sm text-light pb-2 border-b-3 border-transparent hover:border-secondary transition-all duration-500 ${isActive && "border-secondary! text-white"}`}
                                    >
                                    {link.name}
                                    </NavLink>
                                </li>
                            ))
                        }
                    </ul>
                    <div className="flex items-center md:gap-8 gap-4">
                        <Link
                            className='text-white flex items-center gap-2 rounded-md'
                        >
                            <FaUserAlt />
                        </Link>
                        <Link
                            className='text-white flex items-center gap-2 rounded-md'
                        >
                            <FaShoppingCart />
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default NavBar