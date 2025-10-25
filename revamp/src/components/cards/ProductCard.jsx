import React from 'react'
import { formatterUtility } from '../../utilities/formatterutility'
import { FaPlusCircle } from 'react-icons/fa'

const ProductCard = ({ name, price, image }) => {
    return (
        <div className='bg-white py-4 px-2 rounded-xl group h-[320px] overflow-hidden flex flex-col items-start justify-center relative'>
            <div className="overflow-hidden h-[250px] mx-auto">
                <img src={image} alt={name} className='w-full h-full object-cover' />
            </div>
            <div className="text-start w-full font-medium mt-2">
                <h3>{name}</h3>
                <div className="flex items-center justify-between">
                    <h3 className='font-bold text-xl italic!'>{formatterUtility(Number(price))}</h3>
                    <button
                        type='button'
                        className='lg:translate-x-43 group-hover:translate-x-0 transition-all duration-500 cursor-pointer bg-primary px-4 py-2 text-white text-sm flex items-center gap-1 rounded'
                    >
                        <FaPlusCircle />
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard