import React from 'react'
import { formatterUtility } from '../../utilities/formatterutility'
import { GoPlus } from "react-icons/go";
import { Link } from 'react-router-dom'
import useCartStore from '../../store/cartStore';

const ProductCard = (props) => {
    const { id, name, description, price, image } = props;
    const { addToCart, loadingProductId } = useCartStore();

    const isLoading = loadingProductId === id;

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(props);
    }

    return (
        <Link
            to={`/shop/${id}`}
            className='lg:hover:bg-body_color/10 lg:bg-transparent bg-body_color/10 transition-all duration-300 rounded-xl group min-h-80 overflow-hidden flex flex-col items-start relative'
        >
            <div className="bg-white rounded-t-[inherit] overflow-hidden h-[250px] mx-auto w-full">
                <img src={image} alt={name} className='w-full h-full object-cover' />
            </div>
            <div className="text-start w-full mt-2 p-3 h-[calc(100%-250px)] flex flex-col justify-between">
                <div className="space-y-2">
                    <h3 className='text-lg font-medium!'>{name}</h3>
                    <p className='text-xs line-clamp-3'>{description}</p>
                    <h3 className='font-bold! pt-2 text-xl font-[Montserrat]!'>{formatterUtility(Number(price))}</h3>
                </div>
                <button
                    type='button'
                    // onClick={handleAddToCart}
                    disabled={isLoading}
                    className='mt-6 w-full cursor-pointer text-primary border border-primary hover:bg-primary px-4 py-2 hover:text-white text-sm flex items-center justify-center gap-2 rounded-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
                >
                    {isLoading ? <div className='w-4 h-4 border-2 rounded-full group-hover:border-white border-primary group-hover:border-t-transparent animate-spin border-t-transparent'></div> : (<GoPlus size={20} />)}
                    {isLoading ? 'Adding...' : 'Add to Cart'}
                </button>
            </div>
        </Link>
    )
}

export default ProductCard