import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { MdProductionQuantityLimits, MdBookmarkBorder } from "react-icons/md";
import { AiOutlineProduct } from "react-icons/ai";
import { FaBars } from 'react-icons/fa';
import { FaXmark } from "react-icons/fa6";

const AdminLayout = ({ children, pageName }) => {

    const [isOpen, setIsOpen] = useState(false)

    const navLink = [
        {
            path: "/admin/addproducts",
            name: "Add Product",
            icon: <MdProductionQuantityLimits />,
        },
        {
            path: "/admin/manageproducts",
            name: "Manage Products",
            icon: <AiOutlineProduct />,
        },
        {
            path: "/admin/manageorders",
            name: "Manage Orders",
            icon: <MdBookmarkBorder />
        },
    ]

    return (
        <div className='w-screen h-screen flex relative bg-lighter'>
            <div className={`md:w-[22%] w-full md:static absolute ${isOpen ? "left-0" : "-left-full"} transition-all duration-500 px-4 py-6 flex flex-col gap-8 h-full bg-primary text-light`}>
                <h3 className='text-4xl text-center w-full font-[Montserrat]! font-bold!'>OMC</h3>
                <button
                    type='button'
                    onClick={() => setIsOpen(prev => !prev)}
                    className='absolute right-6 text-2xl md:hidden block'
                >
                    <FaXmark />
                </button>
                <ul className='flex flex-col gap-2'>
                    {
                        navLink.map((navlink, index) => (
                            <NavLink
                                key={index}
                                to={navlink.path}
                                onClick={() => setIsOpen(false)}
                                className={({ isActive }) => `${isActive ? "bg-light text-dark" : ""} px-3 py-2.5 text-sm rounded-lg flex items-center gap-2 w-full`}
                            >
                                {navlink.icon}
                                {navlink.name}
                            </NavLink>
                        ))
                    }
                </ul>
            </div>
            <div className="md:w-[88%] h-full w-full px-4 py-6 space-y-6">
                <div className="w-full flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <button
                            type='button'
                            onClick={() => setIsOpen(true)}
                            className='text-2xl md:hidden block'
                        >
                            <FaBars />
                        </button>
                        <h3 className='text-2xl font-[Montserrat]! font-semibold!'>{pageName}</h3>
                    </div>
                </div>
                <div className="no-scrollbar w-full h-[calc(100vh-100px)] overflow-y-scroll">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AdminLayout