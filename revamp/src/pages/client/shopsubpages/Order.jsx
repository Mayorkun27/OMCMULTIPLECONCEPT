import React, { useEffect, useMemo, useState } from 'react'
import MiniHerosection from '../../../components/MiniHerosection'
import { assets } from '../../../assets/assets'
import api from '../../../api';
import { toast } from 'sonner';
import PaginationControls from '../../../utilities/PaginationControls';
import { formatISODateToCustom, formatterUtility } from '../../../utilities/formatterutility';
import { MdRemoveRedEye } from 'react-icons/md';
import Modal from '../../../components/modals/Modal';

const Order = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const [lastPage, setlastPage] = useState(1)
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const response = await api.call('/orders');
        console.log("response", response)

        if (response.status === 200) {
          setOrders(response.data.orders);
          setCurrentPage(response.data.pagination.current_page)
          setlastPage(response.data.pagination.last_page)
        }
      } catch (error) {
        toast.error('Failed to fetch orders.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, []);

  const filteredOrders = useMemo(() => {
      return orders
        .filter(order => 
          order.order_number.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }, [orders, searchQuery]);

  return (
    <div>
      <MiniHerosection
        title={"My Orders"}
        subText={"Track your purchases and manage your history. Easily check the status of pending deliveries and review details of all your past orders."}
        bgStyle={{
            background: `linear-gradient(135deg, #000000ba, #000000ba), url(${assets.newsimg6})`,
            backgroundSize: "cover",
            backgroundPosition: "bottom",
        }}
      />
      <div className="made-container pt-20 lg:pb-20">
        <div className="bg-white mb-8 lg:p-8 p-4 rounded-xl w-full space-y-4">
          <h3 className='md:text-2xl text-xl font-[Montserrat]! font-semibold!'>Search by order Id</h3>
          <input 
            type="text"
            placeholder="Search by Order ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-primary/30 placeholder:text-black/30 indent-3 rounded-md outline-0 py-2 lg:w-1/2 md:w-3/4 w-full text-sm"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg">
            <thead>
              <tr className='border-b border-black/20'>
                <th className="p-4 uppercase font-[Montserrat]! font-semibold! text-dark/80 text-xs text-start">S/N</th>
                <th className="p-4 uppercase font-[Montserrat]! font-semibold! text-dark/80 text-xs text-center">Order ID</th>
                <th className="p-4 uppercase font-[Montserrat]! font-semibold! text-dark/80 text-xs text-center">Total</th>
                <th className="p-4 uppercase font-[Montserrat]! font-semibold! text-dark/80 text-xs text-center">Delivery Status</th>
                <th className="p-4 uppercase font-[Montserrat]! font-semibold! text-dark/80 text-xs text-center">Date</th>
                <th className="p-4 uppercase font-[Montserrat]! font-semibold! text-dark/80 text-xs text-end">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center p-5 text-gray-600">Loading...</td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center p-5 text-gray-600">No order found</td>
                </tr>
              ) : searchQuery && orders.length > 0 && filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center p-5 text-gray-600">No order meets your search query</td>
                </tr>
              ) : (
                filteredOrders.map((order, index) => (
                  <tr key={order.id} className='last:border-b-0 border-b border-black/20'>
                    <td className="p-4 text-xs text-start">{String(index+1).padStart(3, "0")}</td>
                    <td className="p-4 text-xs text-center">{order.order_number}</td>
                    <td className="p-4 text-xs text-center">{formatterUtility(Number(order.total_amount))}</td>
                    <td className="p-4 text-xs text-center capitalize">
                      {order.status}
                    </td>
                    <td className="p-4 text-xs text-center">
                      <p>{formatISODateToCustom(order.created_at).split(" ")[0]}</p>
                      <p>{formatISODateToCustom(order.created_at).split(" ")[1]}</p>
                    </td>
                    <td className="p-4 text-xs text-end">
                      <button
                        type='button'
                        onClick={() => setSelectedOrder(order)}
                        className='bg-primary/40 w-10 h-10 rounded-md flex items-center justify-center ms-auto'
                      >
                        <MdRemoveRedEye size={18} />
                      </button>
                    </td>
                  </tr>
                )
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={7}>
                  <PaginationControls
                    currentPage={currentPage}
                    totalPages={lastPage}
                    setCurrentPage={setCurrentPage}
                  />
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      {
        selectedOrder && (
          <Modal
            onClose={() => setSelectedOrder(null)}
          >
            <div className='space-y-2'>
              <h2 className="text-xl font-bold mb-4">Order Details ({selectedOrder.order_number})</h2>
              <p><strong className='font-bold!'>Date Placed:</strong> {formatISODateToCustom(selectedOrder.created_at)}</p>
              <p><strong className='font-bold!'>Total:</strong> {formatterUtility(Number(selectedOrder.total_amount))}</p>
              <p className='capitalize'><strong className='font-bold!'>Status:</strong> {selectedOrder.status}</p>
              <h3 className="text-lg font-bold! mt-4">Items:</h3>
              <ul>
                {selectedOrder.items.map((item, index) => (
                    <li key={index}>{item.product.name} (x{item.quantity}) - {item.product.color} - {formatterUtility(Number(item.price))}</li>
                ))}
              </ul>
            </div>
          </Modal>
        )
      }
    </div>
  )
}

export default Order