import React from 'react'
import { assets } from '../../assets/assets'
import { IoMdClose } from "react-icons/io";
import { HiOutlineMinusSmall } from 'react-icons/hi2';
import { GoPlus } from 'react-icons/go';
import { formatterUtility } from '../../utilities/formatterutility';

const Cartcard = () => {
  return (
    <div className='flex items-center justify-between md:gap-6 gap-4 border border-body_color/30 rounded-xl overflow-hidden px-3 md:py-1 py-2 shadow-sm'>
        <div className="flex flex-col items-center justify-center gap-2">
            <img src={assets.product1} alt="Supercoat Emulsion Paint" className='w-16 h-16 object-cover' />
            <div className="text-2xl md:hidden inline-flex">
                <button
                    type='button' 
                >
                    <IoMdClose />
                </button>
            </div>
        </div>
        <div className="w-full flex md:flex-row flex-col md:items-center items-start gap-2 justify-between">
            <div className="flex flex-col font-medium items-start">
                <h3 className='md:text-lg text- font-medium! font-[Montserrat]!'>Supercoat Emulsion Paint</h3>
                <div className="flex text-sm">
                    <div className="w-5 h-5 rounded-full mr-2" style={{ background: "#000" }}></div>
                    <span>#000000</span>
                </div>
            </div>
            <div className="flex lg:flex-row flex-col-reverse md:items-center items-start lg:gap-6 gap-2 md:w-auto w-full">
                <div className="flex h-10 items-center border border-primary/50 rounded-md overflow-hidden md:w-auto w-full">
                    <button
                        type='button'
                        className='md:w-10 w-full h-full flex items-center justify-center border-0 cursor-pointer bg-black/70 disabled:cursor-not-allowed disabled:opacity-50 text-white md:text-2xl text-lg'
                    >
                        <HiOutlineMinusSmall />
                    </button>
                    <span
                        className='md:w-10 w-full h-10 flex items-center justify-center'
                    >2</span>
                    <button
                        type='button'
                        className='md:w-10 w-full h-full flex items-center justify-center border-0 cursor-pointer bg-black/70 disabled:cursor-not-allowed disabled:opacity-50 text-white md:text-2xl text-lg'
                    >
                        <GoPlus />
                    </button>
                </div>
                <h3 className='font-[Montserrat]! font-semibold! md:text-xl text-lg'>{formatterUtility(Number(36504.69))}</h3>
            </div>
        </div>
        <div className="text-xl md:inline-flex hidden">
            <button
                type='button' 
            >
                <IoMdClose />
            </button>
        </div>
    </div>
  )
}

export default Cartcard