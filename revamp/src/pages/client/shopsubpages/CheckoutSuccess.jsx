import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { MdCheckCircleOutline, MdErrorOutline } from "react-icons/md";
import api from '../../../api';
import { formatterUtility } from '../../../utilities/formatterutility';

const CheckoutSuccess = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const verifyPayment = async () => {
      const trxref = searchParams.get('trxref');
      const reference = searchParams.get('reference');

      if (!trxref || !reference) {
        setError('Transaction reference not found.');
        setLoading(false);
        return;
      }

      try {
        const response = await api.call(`/order/verify?trxref=${trxref}&reference=${reference}`);
        console.log("response", response)
        if (response.data.success) {
          setOrder(response.data.order);
        } else {
          setError(response.data.message || 'Payment verification failed.');
        }
      } catch (err) {
        setError(err.message || 'An error occurred during payment verification.');
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-dvh bg-gray-50 text-center md:p-8 p-4">
        <div className="max-w-lg md:p-8 p-4 bg-white rounded-lg shadow-lg">
          <div className="animate-spin rounded-full h-16 w-16 border-t-transparent border-4 border-primary mb-4 mx-auto"></div>
          <h1 className="md:text-3xl text-2xl font-bold text-gray-800">Verifying Payment...</h1>
          <p className="text-gray-600 mt-2">Please wait while we confirm your transaction.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-dvh bg-gray-50 text-center md:p-8 p-4">
        <div className="max-w-lg md:p-8 p-4 bg-white rounded-lg shadow-lg md:text-sm text-xs">
          <MdErrorOutline className="text-red-500 text-8xl mx-auto mb-4" />
          <h1 className="md:text-3xl text-2xl font-bold text-gray-800 mb-2">Payment Verification Failed</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    );
  }

  if (order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-dvh bg-gray-50 text-center md:p-8 p-4">
        <div className="max-w-lg md:p-8 p-4 bg-white rounded-lg shadow-lg md:text-sm text-xs">
          <MdCheckCircleOutline className="text-green-500 text-8xl mx-auto mb-4" />
          <h1 className="md:text-3xl text-2xl font-bold text-gray-800 mb-2">Thank You for Your Order!</h1>
          <p className="text-gray-600 mb-4">
            Your payment has been successfully verified.
          </p>
          <div className="text-left bg-gray-100 p-4 rounded-lg mb-6 text-sm">
            <p className="mb-2"><strong>Order Number:</strong> {order.order_number}</p>
            <p><strong>Total Amount:</strong> {formatterUtility(Number(order.total_amount))}</p>
          </div>
          <p className="text-gray-600 mb-6">
            You will receive a confirmation email shortly. Our team will get in touch with you soon.
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-primary text-white font-semibold rounded-lg transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return null;
};

export default CheckoutSuccess;