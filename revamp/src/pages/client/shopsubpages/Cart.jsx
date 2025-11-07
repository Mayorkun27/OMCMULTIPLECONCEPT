import React, { useEffect } from 'react'
import { assets } from '../../../assets/assets'
import MiniHerosection from '../../../components/MiniHerosection'
import { Link } from 'react-router-dom';
import { MdArrowForward } from 'react-icons/md';
import { formatterUtility } from '../../../utilities/formatterutility';
import CartCard from '../../../components/cards/CartCard';
import useCartStore from '../../../store/cartStore';

const Cart = () => {
  const { cart, fetchCart, removeFromCart, clearCart } = useCartStore();
  
  useEffect(() => {
    window.scroll(0, 0)
    fetchCart();
  }, [fetchCart])

  const subtotal = Array.isArray(cart) ? cart.reduce((total, item) => total + item.product.price * item.quantity, 0) : 0;
  const total = subtotal; // For now, total is the same as subtotal

  return (
    <div>
      <MiniHerosection
        title={"Cart"}
        subText={"One step closer, your items are waiting. Ready to check out?."}
        bgStyle={{
            backgroundImage: `linear-gradient(135deg, #000000ba, #000000ba), url(${assets.helpimg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
        }}
      />

      <div className="made-container pt-10 lg:pb-20">
        <div className="bg-white rounded-2xl md:p-6 p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className='font-[Montserrat]! font-semibold! md:text-xl'>Your Selections: </h3>
            {/* {cart.length > 0 && (
              <button onClick={clearCart} className='text-red-500 font-semibold'>Clear Cart</button>
            )} */}
          </div>
          {
            !Array.isArray(cart) || cart.length === 0 ? (
              <p className='text-body_color font-[Montserrat]! font-medium! md:text-xl text-lg text-center py-5'>Your cart is empty. <Link to="/shop" className='text-secondary font-semibold!'>Go back to shop.</Link></p>
            ) : (
              <div className="grid gap-6">
                {cart.map(item => (
                  <CartCard 
                    key={item.id} 
                    id={item.id}
                    name={item.product.name}
                    price={item.product.price}
                    image={item.product.image}
                    quantity={item.quantity}
                    removeFromCart={removeFromCart} 
                  />
                ))}
              </div>
            )
          }
          {
            Array.isArray(cart) && cart.length > 0 && (
              <div className="flex md:flex-row flex-col gap-4 md:items-center items-start md:justify-between justify-center mt-6">
                <div className="flex flex-col gap-1 divide-y divide-body_color md:min-w-[200px] min-w-full">
                  <h3 className='flex justify-between pb-1'>Subtotal: &nbsp; <span className='font-[Montserrat]! font-semibold!'>{formatterUtility(Number(subtotal))}</span></h3>
                  <h3 className='flex justify-between'>Total: &nbsp; <span className='font-[Montserrat]! font-semibold!'>{formatterUtility(Number(total))}</span></h3>
                </div>
                <Link
                  to={"/checkout"}
                  className='md:w-auto w-full ms-auto cursor-pointer bg-primary hover:bg-primary px-4 py-2 text-white text-sm flex items-center justify-center gap-2 rounded-md'
                >
                  Proceed to checkout
                  <MdArrowForward size={20} />
                </Link>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Cart