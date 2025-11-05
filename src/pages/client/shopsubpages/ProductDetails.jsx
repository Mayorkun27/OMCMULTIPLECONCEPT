import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import MiniHerosection from '../../../components/MiniHerosection';
import { assets } from '../../../assets/assets';
import { formatterUtility } from '../../../utilities/formatterutility';
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { GoPlus } from "react-icons/go";
import { HiOutlineMinusSmall } from "react-icons/hi2";

const ProductDetails = () => {
    const { id } = useParams();
    const [availableColors, setAvailableColors] = useState([
        "#9575CD",
        "#FFC107",
        "#3F51B5",
        "#009688",
        "#E91E63",
        "#2196F3",
        "#F44336",
        "#8BC34A",
    ])
    const [selectedColor, setSelectedColor] = useState("")

    useEffect(() => {
        window.scroll(0, 0)
    }, [])

    const images = [assets.newsimg1, assets.newsimg2, assets.newsimg3, assets.newsimg4, assets.heroimg, assets.heroimg2, assets.heroimg3]
    const randomIndex = Math.floor(Math.random() * images.length)

    return (
        <div>
            <MiniHerosection
                title={"Supercoat Emulsion Paint"}
                subText={"Suitable as a finishing coat for interior/exterior concrete plaster or cement rendered surfaces to give a highly granular, attractive finish."}
                bgStyle={{
                    background: `linear-gradient(135deg, #000000ba, #000000ba), url(${images[randomIndex]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />
            <div className="made-container pt-20 lg:pb-20">
                <div className="bg-white md:p-8 p-4 rounded-2xl grid md:grid-cols-3 items-center gap-8">
                    <div className="">
                        <img src={assets.product1} alt="Supercoat Emulsion Paint" className='w-full h-full object-cover' />
                    </div>
                    <div className="md:col-span-2">
                        <h3 className='font-[Montserrat]! font-semibold! text-3xl'>Supercoat Emulsion Paint</h3>
                        <p className='text-body_color my-2 text-base font-medium!'>Suitable as a finishing coat for interior/exterior concrete plaster or cement rendered surfaces to give a highly granular, attractive finish.</p>
                        <h3 className='font-[Montserrat]! font-semibold! text-2xl my-5'>{formatterUtility(Number(36504.69))}</h3>
                        <p className='text-lg font-medium!'><span className="text-body_color">Size:</span> 4 Liters</p>
                        <div className="lg:block hidden">
                            <div className="space-y-4 mt-3 text-body_color">
                                <p>Select a color: <span className='font-bold! font-[Montserrat]!' style={{ color: selectedColor }}>{selectedColor}</span></p>
                                <div className="flex flex-wrap items-center gap-4">
                                    {
                                        availableColors.map((color, index) => (
                                            <div 
                                                key={index} 
                                                className={`w-8 h-8 cursor-pointer ${selectedColor === color && "border-6 border-light rounded-full"}`}
                                                onClick={() => setSelectedColor(color)}
                                                style={{
                                                    backgroundColor: color,
                                                }}
                                            ></div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="flex items-end gap-6 mt-8">
                                <div className="flex flex-col gap-1">
                                    <p className='text-body_color'>Quantity:</p>
                                    <div className="flex items-center border border-primary/50 rounded-md overflow-hidden">
                                        <button
                                            type='button'
                                            className='w-14 h-10 flex items-center justify-center border-0 cursor-pointer bg-black/70 disabled:cursor-not-allowed disabled:opacity-50 text-white text-2xl'
                                        >
                                            <HiOutlineMinusSmall />
                                        </button>
                                        <span
                                            className='w-14 h-10 flex items-center justify-center'
                                        >2</span>
                                        <button
                                            type='button'
                                            className='w-14 h-10 flex items-center justify-center border-0 cursor-pointer bg-black/70 disabled:cursor-not-allowed disabled:opacity-50 text-white text-2xl'
                                        >
                                            <GoPlus />
                                        </button>
                                    </div>
                                </div>
                                <button
                                    type='button'
                                    className='w-full cursor-pointer text-white font-bold! hover:bg-primary px-4 h-10 hover:text-white text-sm flex items-center justify-center gap-2 rounded-md transition-all duration-300'
                                    style={{
                                        backgroundColor: selectedColor ? selectedColor : "#3b5d50"
                                    }}
                                >
                                    <MdOutlineAddShoppingCart size={20} />
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="md:col-span-3 lg:hidden block">
                        <div className="space-y-4 mt-3 text-body_color">
                            <p>Select a color: <span className='font-bold! font-[Montserrat]!' style={{ color: selectedColor }}>{selectedColor}</span></p>
                            <div className="flex flex-wrap items-center gap-4">
                                {
                                    availableColors.map((color, index) => (
                                        <div 
                                            key={index} 
                                            className={`w-8 h-8 cursor-pointer ${selectedColor === color && "border-6 border-light rounded-full"}`}
                                            onClick={() => setSelectedColor(color)}
                                            style={{
                                                backgroundColor: color,
                                            }}
                                        ></div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="flex md:flex-row flex-col md:items-end items-start gap-6 mt-8">
                            <div className="flex flex-col gap-1">
                                <p className='text-body_color'>Quantity:</p>
                                <div className="flex items-center border border-primary/50 rounded-md overflow-hidden">
                                    <button
                                        type='button'
                                        className='w-14 h-10 flex items-center justify-center border-0 cursor-pointer bg-black/70 disabled:cursor-not-allowed disabled:opacity-50 text-white text-2xl'
                                    >
                                        <HiOutlineMinusSmall />
                                    </button>
                                    <span
                                        className='w-14 h-10 flex items-center justify-center'
                                    >2</span>
                                    <button
                                        type='button'
                                        className='w-14 h-10 flex items-center justify-center border-0 cursor-pointer bg-black/70 disabled:cursor-not-allowed disabled:opacity-50 text-white text-2xl'
                                    >
                                        <GoPlus />
                                    </button>
                                </div>
                            </div>
                            <button
                                type='button'
                                className='w-full cursor-pointer text-white font-bold! hover:bg-primary px-4 h-10 hover:text-white text-sm flex items-center justify-center gap-2 rounded-md transition-all duration-300'
                                style={{
                                    backgroundColor: selectedColor ? selectedColor : "#3b5d50"
                                }}
                            >
                                <MdOutlineAddShoppingCart size={20} />
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails