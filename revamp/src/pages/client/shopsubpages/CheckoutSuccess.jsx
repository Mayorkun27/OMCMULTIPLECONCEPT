import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import { MdCheckCircleOutline } from "react-icons/md";

const CheckoutSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh bg-gray-50 text-center md:p-8 p-4">
      <div className="max-w-lg md:p-8 p-4 bg-white rounded-lg shadow-lg md:text-sm text-xs">
        <MdCheckCircleOutline className="text-green-500 text-8xl mx-auto mb-4" />
        <h1 className="md:text-3xl text-2xl font-bold text-gray-800 mb-2 font-[Montserrat]! font-semibold!">Thank You for Your Order!</h1>
        <p className="text-gray-600 mb-4">
          Your order has been successfully placed and is now being processed.
        </p>
        <p className="text-gray-600 mb-6">
          We have received your payment information and will send you a confirmation email as soon as the payment is verified. You will be contacted by our team shortly.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default CheckoutSuccess;