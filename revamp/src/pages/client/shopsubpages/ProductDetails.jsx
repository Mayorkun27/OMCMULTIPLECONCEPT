import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MiniHerosection from '../../../components/MiniHerosection';
import { assets } from '../../../assets/assets';
import { formatterUtility } from '../../../utilities/formatterutility';
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { toast } from 'sonner';
import api from '../../../api';
import useCartStore from '../../../store/cartStore'; // Import useCartStore

const ProductDetails = () => {
    const { id } = useParams();
    const [productDetails, setProductDetails] = useState(null);
    const [loadingProductDetails, setLoadingProductDetails] = useState(false);

    // Access cart state and actions
    const { addToCart, addingProductId } = useCartStore();

    const isAddingToCart = addingProductId === productDetails?.id;

    useEffect(() => {
        window.scroll(0, 0);
        document.title = "Product Details - OMC Multitech Limited";
    }, []);

    useEffect(() => {
        const fetchProductDetails = async () => {
            setLoadingProductDetails(true);
            try {
                const response = await api.call(`/products/${id}`, "GET");
                if (response.status === 200) {
                    setProductDetails(response.data.data);
                }
            } catch (error) {
                console.error('An error occurred fetching products details', error);
                toast.error('An error occurred fetching products details');
            } finally {
                setLoadingProductDetails(false);
            }
        };
        fetchProductDetails();
    }, [id]);

    const images = [assets.newsimg1, assets.newsimg2, assets.newsimg3, assets.newsimg4, assets.heroimg, assets.heroimg2, assets.heroimg3];
    const randomIndex = Math.floor(Math.random() * images.length);

    const handleAddToCart = () => {
        if (productDetails) {
            addToCart(productDetails); // Pass productDetails directly
        }
    };

    const getContrastColor = (hexColor) => {
        if (!hexColor) return '#FFFFFF';

        let hex = hexColor.replace('#', '');

        if (hex.length === 3) {
            hex = hex.split('').map(char => char + char).join('');
        }

        if (hex.length !== 6) {
            return '#FFFFFF'; // Default to white on invalid hex
        }

        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);

        const luminance = (0.299 * r + 0.587 * g + 0.114 * b);

        return luminance > 149 ? '#000000' : '#FFFFFF';
    };

    const buttonTextColor = productDetails?.color ? getContrastColor(productDetails.color) : '#FFFFFF';

    return (
        <div>
            <MiniHerosection
                title={productDetails?.name}
                subText={productDetails?.description}
                bgStyle={{
                    backgroundImage: `linear-gradient(135deg, #000000ba, #000000ba), url(${images[randomIndex]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />
            <div className="made-container pt-20 lg:pb-20">
                <div className="bg-white md:p-8 p-4 rounded-2xl grid lg:grid-cols-3 md:grid-cols-4 items-center gap-8">
                    <div className="rounded-xl overflow-hidden h-[400px] lg:col-span-1 md:col-span-2">
                        <img src={productDetails?.image} alt={productDetails?.name} className='w-full h-full object-cover' />
                    </div>
                    <div className="md:col-span-2">
                        <h3 className='font-[Montserrat]! font-semibold! text-3xl'>{productDetails?.name}</h3>
                        <p className='text-body_color my-2 text-base font-medium!'>{productDetails?.description}</p>
                        <h3 className='font-[Montserrat]! font-semibold! text-2xl my-5'>{formatterUtility(Number(productDetails?.price))}</h3>
                        <p className='text-lg font-medium!'><span className="text-body_color">Size:</span> {productDetails?.size} Liters</p>
                        <div className="lg:block hidden">
                            <p className='flex flex-wrap items-center gap-2'>
                                <strong>Color:</strong>
                                <div
                                    title={productDetails?.color}
                                    aria-label={productDetails?.color}
                                    className={`w-6 h-6 cursor-pointer rounded-full border border-black/20`}
                                    style={{
                                        backgroundColor: productDetails?.color,
                                    }}
                                ></div>
                                <p className='uppercase'>{productDetails?.color}</p>
                            </p>
                            <div className="flex items-end gap-6 mt-8">
                                <button
                                    type='button'
                                    onClick={handleAddToCart}
                                    disabled={isAddingToCart || loadingProductDetails}
                                    className='w-full border border-black/30 cursor-pointer font-bold! hover:bg-primary px-4 h-10 text-sm flex items-center justify-center gap-2 rounded-md transition-all duration-300'
                                    style={{
                                        backgroundColor: productDetails?.color ? productDetails.color : "#3b5d50",
                                        color: buttonTextColor
                                    }}
                                >
                                    {isAddingToCart ? (
                                        <div className='w-4 h-4 border-2 rounded-full border-white border-t-transparent animate-spin'></div>
                                    ) : (
                                        <MdOutlineAddShoppingCart size={20} />
                                    )}
                                    {isAddingToCart ? 'Adding...' : 'Add to Cart'}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="md:col-span-3 lg:hidden block">
                        <p className='flex flex-wrap items-center gap-2'>
                            <strong>Color:</strong>
                            <div
                                title={productDetails?.color}
                                aria-label={productDetails?.color}
                                className={`w-6 h-6 cursor-pointer rounded-full border border-black/20`}
                                style={{
                                    backgroundColor: productDetails?.color,
                                }}
                            ></div>
                            <p className='uppercase'>{productDetails?.color}</p>
                        </p>
                        <div className="flex md:flex-row flex-col md:items-end items-start gap-6 mt-8">
                            <button
                                type='button'
                                onClick={handleAddToCart}
                                disabled={isAddingToCart || loadingProductDetails}
                                className='w-full cursor-pointer font-bold! hover:bg-primary px-4 h-10 text-sm flex items-center justify-center gap-2 rounded-md transition-all duration-300'
                                style={{
                                    backgroundColor: productDetails?.color ? productDetails.color : "#3b5d50",
                                    color: buttonTextColor
                                }}
                            >
                                {isAddingToCart ? (
                                    <div className='w-4 h-4 border-2 rounded-full border-white border-t-transparent animate-spin'></div>
                                ) : (
                                    <MdOutlineAddShoppingCart size={20} />
                                )}
                                {isAddingToCart ? 'Adding...' : 'Add to Cart'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;