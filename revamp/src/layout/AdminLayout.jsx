import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { MdProductionQuantityLimits, MdBookmarkBorder, MdOutlineLogout, MdHome, MdContacts } from "react-icons/md";
import { AiOutlineProduct } from "react-icons/ai";
import { FaBars } from 'react-icons/fa';
import { FaXmark } from "react-icons/fa6";
import useAuthStore from '../store/authStore';
import { toast } from 'sonner';
import { GoChecklist } from "react-icons/go";

const AdminLayout = ({ children, pageName }) => {

    const [isOpen, setIsOpen] = useState(false)
    const { logout, token, user } = useAuthStore()

    const isLoggedIn = token !== null;

    useEffect(() => {
        if (!isLoggedIn || (isLoggedIn && user?.role !== "admin")) {
            toast.info('You must be logged in to access this page.');
            window.location.href = "/login"
        }
    }, [user?.role, isLoggedIn])

    const navLink = [
        {
            path: "/",
            name: "Visit Home",
            icon: <MdHome />,
        },
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
        {
            path: "/admin/subscribers",
            name: "Subscribers",
            icon: <GoChecklist />
        },
        {
            path: "/admin/contact",
            name: "Manage contact",
            icon: <MdContacts />
        },
    ]

    return (
        <div className='w-screen h-screen flex relative bg-lighter'>
            <div className={`lg:w-[22%] w-full lg:static absolute ${isOpen ? "left-0" : "-left-full"} transition-all duration-500 px-4 py-6 flex flex-col gap-8 h-full bg-primary text-light`}>
                <h3 className='text-4xl text-center w-full font-[Montserrat]! font-bold!'>OMC</h3>
                <button
                    type='button'
                    onClick={() => setIsOpen(prev => !prev)}
                    className='absolute right-6 text-2xl lg:hidden block'
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
                <div className="absolute bottom-4">
                    <button
                        type='button'
                        onClick={logout}
                        className='w-full px-3 py-2.5 text-sm rounded-lg flex items-center gap-2 cursor-pointer'
                    >
                        <MdOutlineLogout />
                        <span>Log out</span>
                    </button>
                </div>
            </div>
            <div className="lg:w-[88%] h-full w-full px-4 py-6 space-y-8">
                <div className="w-full flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <button
                            type='button'
                            onClick={() => setIsOpen(true)}
                            className='text-2xl lg:hidden block'
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