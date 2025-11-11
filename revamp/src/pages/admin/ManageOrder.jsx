import React, { useState, useMemo, useEffect } from 'react';
import Modal from '../../components/modals/Modal';
import { formatISODateToCustom, formatterUtility } from '../../utilities/formatterutility';
import { MdRemoveRedEye, MdCheck } from 'react-icons/md';
import { TbCancel } from "react-icons/tb";
import api from '../../api';
import { toast } from 'sonner';
import PaginationControls from '../../utilities/PaginationControls';

const ManageOrder = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const [lastPage, setlastPage] = useState(1)
  const [loading, setLoading] = useState(true);
  const [confirmation, setConfirmation] = useState({
    isOpen: false,
    order: null,
    newStatus: null
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.call('/admin/orders');
        // console.log("response", response)
        if (response.status === 200) {
          const { data, current_page, last_page } = response.data.orders;
          setOrders(data);
          setCurrentPage(current_page)
          setlastPage(last_page)
        }
      } catch (error) {
        toast.error('Failed to fetch orders.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const openModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handleStatusChangeRequest = (order, newStatus) => {
    setConfirmation({
        isOpen: true,
        order,
        newStatus
    });
  };

  const confirmStatusChange = async () => {
    const { order, newStatus } = confirmation;

    if (!order || !newStatus) return; // Safety check

    try {
      if (newStatus === 'Completed') {
        await api.call(`/admin/orders/${order.id}/mark-paid`, 'PATCH');
        toast.success(`Order ${order.order_number} marked as paid (Completed).`);
      } else if (newStatus === 'Declined') {
        // Assuming a different endpoint for declining an order, or just local update for now
        // await api.call(`/admin/orders/${orderId}/decline`, 'PATCH');
        toast.info(`Order ${order.order_number} status set to Declined locally.`);
      }
      
      // Update local state
      setOrders(orders.map(o => o.id === order.id ? { ...o, status: newStatus } : o));
    } catch (error) {
      toast.error(`Failed to update order ${order.order_number} status.`);
      console.error(error);
    } finally {
        // Close and reset the confirmation state regardless of success/failure
        setConfirmation({ isOpen: false, order: null, newStatus: null });
        closeModal(); // Close the detail modal if it was open
    }
  };

  const cancelStatusChange = () => {
    setConfirmation({ isOpen: false, order: null, newStatus: null });
  };
  // const handleStatusChange = async (orderId, newStatus) => {
  //   try {
  //     if (newStatus === 'Completed') {
  //       await api.call(`/admin/orders/${orderId}/mark-paid`, 'PATCH');
  //       toast.success(`Order ${orderId} marked as paid.`);
  //     } else if (newStatus === 'Declined') {
  //       // Assuming a different endpoint for declining an order, or just local update for now
  //       // await api.call(`/admin/orders/${orderId}/decline`, 'PATCH');
  //       toast.info(`Order ${orderId} status set to Declined locally.`);
  //     }
  //     setOrders(orders.map(order => order.id === orderId ? { ...order, status: newStatus } : order));
  //   } catch (error) {
  //     toast.error(`Failed to update order ${orderId} status.`);
  //     console.error(error);
  //   }
  // };

  const filteredOrders = useMemo(() => {
    return orders
      .filter(order => 
        order.order_number.toLowerCase().includes(searchQuery.toLowerCase())
      )
      // .filter(order => 
      //   statusFilter === 'All' || order.status === statusFilter
      // );
  }, [orders, searchQuery, statusFilter]);

  if (loading) {
    return <div className="bg-white rounded-2xl p-6">Loading orders...</div>;
  }

  return (
    <div className="bg-white rounded-2xl p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="lg:w-1/3 md:w-1/22 w-full">
            <input 
                type="text"
                placeholder="Search by Order ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border border-primary/30 placeholder:text-black/30 indent-3 rounded-md outline-0 py-2 w-full text-sm"
            />
        </div>
        {/* <div>
            <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-primary/30 px-3 rounded-md outline-0 py-2"
            >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Declined">Declined</option>
            </select>
        </div> */}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg">
          <thead>
            <tr className='border-b border-black/20'>
              <th className="p-4 uppercase font-[Montserrat]! font-semibold! text-dark/80 text-xs text-start">S/N</th>
              <th className="p-4 uppercase font-[Montserrat]! font-semibold! text-dark/80 text-xs text-center">Order ID</th>
              <th className="p-4 uppercase font-[Montserrat]! font-semibold! text-dark/80 text-xs text-center">Customer Name</th>
              <th className="p-4 uppercase font-[Montserrat]! font-semibold! text-dark/80 text-xs text-center">Total</th>
              <th className="p-4 uppercase font-[Montserrat]! font-semibold! text-dark/80 text-xs text-center">Delivery Status</th>
              <th className="p-4 uppercase font-[Montserrat]! font-semibold! text-dark/80 text-xs text-center">Date</th>
              <th className="p-4 uppercase font-[Montserrat]! font-semibold! text-dark/80 text-xs text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, index) => (
              <tr key={order.id} className='last:border-b-0 border-b border-black/20'>
                <td className="p-4 text-xs text-start">{String(index+1).padStart(3, "0")}</td>
                <td className="p-4 text-xs text-center">{order.order_number}</td>
                <td className="p-4 text-xs text-center">{order.user.name}</td>
                <td className="p-4 text-xs text-center">{formatterUtility(Number(order.total_amount))}</td>
                <td className="p-4 text-xs text-center capitalize">
                  {order.status}
                </td>
                <td className="p-4 text-xs text-center">
                  <p>{formatISODateToCustom(order.created_at).split(" ")[0]}</p>
                  <p>{formatISODateToCustom(order.created_at).split(" ")[1]}</p>
                </td>
                <td className="p-4 text-xs">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => openModal(order)} 
                      className="cursor-pointer bg-blue-500 text-white text-md h-8 w-8 flex items-center justify-center rounded"
                    >
                      <MdRemoveRedEye/>
                    </button>
                    <button 
                      onClick={() => handleStatusChangeRequest(order, 'Completed')} 
                      className="cursor-pointer bg-green-500 text-white text-md h-8 w-8 flex items-center justify-center rounded"
                    >
                      <MdCheck/>
                    </button>
                    {/* <button 
                      onClick={() => handleStatusChangeRequest(order.id, 'Declined')} 
                      className="cursor-pointer bg-red-500 text-white text-md h-8 w-8 flex items-center justify-center rounded"
                    >
                      <TbCancel/>
                    </button> */}
                  </div>
                </td>
              </tr>
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

      {isModalOpen && selectedOrder && (
        <Modal onClose={closeModal}>
            <div className='space-y-2'>
              <h2 className="text-xl font-bold mb-4">Order Details ({selectedOrder.order_number})</h2>
              <p><strong>Customer Name:</strong> {selectedOrder.user.name}</p>
              <p><strong>Email:</strong> {selectedOrder.user.email}</p>
              <p><strong>Phone:</strong> {selectedOrder.user.phone}</p>
              <p><strong>Address:</strong> {selectedOrder.address.address_line}</p>
              <p><strong>Date:</strong> {formatISODateToCustom(selectedOrder.created_at)}</p>
              <p><strong>Total:</strong> {formatterUtility(Number(selectedOrder.total_amount))}</p>
              <p className='capitalize'><strong>Status:</strong> {selectedOrder.status}</p>
              <h3 className="text-lg font-bold mt-4">Items:</h3>
              <ul>
                {selectedOrder.items.map((item, index) => (
                    <li key={index}>{item.product.name} (x{item.quantity}) - {formatterUtility(Number(item.price))}</li>
                ))}
              </ul>
            </div>
        </Modal>
      )}

      {confirmation.isOpen && (
        <Modal onClose={cancelStatusChange}>
            <div className='space-y-4'>
                <h2 className="text-xl font-bold">Confirm Order Status Change</h2>
                <p>
                    Are you sure you want to change **Order ID: {confirmation.order.order_number}** to status: <span className='font-semibold capitalize'>"{confirmation.newStatus}"</span>?
                </p>
                {confirmation.newStatus === 'Completed' && (
                    <p className='text-sm text-gray-600'>
                        This action will mark the order as paid and completed.
                    </p>
                )}
                <div className="flex justify-end gap-3 pt-2">
                    <button
                        onClick={cancelStatusChange}
                        className="px-4 py-2 text-sm font-semibold rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={confirmStatusChange}
                        className={`px-4 py-2 text-sm font-semibold rounded-lg text-white transition ${
                            confirmation.newStatus === 'Completed' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
                        }`}
                    >
                        Confirm {confirmation.newStatus}
                    </button>
                </div>
            </div>
        </Modal>
      )}
    </div>
  );
};

export default ManageOrder;