import React, { useState, useMemo, useEffect } from 'react';
import Modal from '../../components/modals/Modal';
import { formatISODateToCustom, formatterUtility } from '../../utilities/formatterutility';
import { MdRemoveRedEye, MdEdit } from 'react-icons/md';
import api from '../../api';
import { toast } from 'sonner';
import PaginationControls from '../../utilities/PaginationControls';

const ManageOrder = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [updateModal, setUpdateModal] = useState({
    isOpen: false,
    order: null,
    newStatus: ''
  });

  const itemsPerPage = 10;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.call(`/admin/orders?page=${currentPage}&per_page=${itemsPerPage}`);
        if (response.status === 200) {
          const { data, current_page, last_page } = response.data.orders;
          setOrders(data);
          setCurrentPage(current_page);
          setLastPage(last_page);
        }
      } catch (error) {
        toast.error('Failed to fetch orders.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [currentPage]);

  const openModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const openUpdateModal = (order) => {
    setUpdateModal({
      isOpen: true,
      order,
      newStatus: ''
    });
  };

  const closeUpdateModal = () => {
    setUpdateModal({
      isOpen: false,
      order: null,
      newStatus: ''
    });
  };

  const handleConfirmUpdate = async () => {
    const { order, newStatus } = updateModal;

    if (!order || !newStatus) {
      toast.info("Please select a new status.");
      return;
    }

    try {
      await api.call(`/admin/orders/${order.id}/status`, 'PATCH', { status: newStatus });
      toast.success(`Order ${order.order_number} status updated to ${newStatus}.`);
      setOrders(orders.map(o => o.id === order.id ? { ...o, status: newStatus } : o));
    } catch (error) {
      toast.error(`Failed to update order ${order.order_number} status.`);
      console.error(error);
    } finally {
      closeUpdateModal();
    }
  };

  const getAvailableStatuses = (currentStatus) => {
    if (['cancelled', 'delivered'].includes(currentStatus)) {
      return [];
    }
    if (currentStatus === 'shipped') {
      return ['delivered'];
    }
    if (['pending', 'paid'].includes(currentStatus)) {
      return ['shipped', 'cancelled'];
    }
    return [];
  };

  const filteredOrders = useMemo(() => {
    return orders.filter(order =>
      order.order_number.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [orders, searchQuery]);

  if (loading) {
    return <div className="bg-white rounded-2xl p-6">Loading orders...</div>;
  }

  return (
    <div className="bg-white rounded-2xl p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="lg:w-1/3 md:w-1/2 w-full">
          <input
            type="text"
            placeholder="Search by Order ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-primary/30 placeholder:text-black/30 indent-3 rounded-md outline-0 py-2 w-full text-sm"
          />
        </div>
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
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={7} className='text-center p-5 text-gray-600'>No Orders found</td>
              </tr>
            ) : (
              filteredOrders.map((order, index) => (
                <tr key={order.id} className='last:border-b-0 border-b border-black/20'>
                  <td className="p-4 text-xs text-start">{String(index + 1).padStart(3, "0")}</td>
                  <td className="p-4 text-xs text-center">{order.order_number}</td>
                  <td className="p-4 text-xs text-center">{order.user.name}</td>
                  <td className="p-4 text-xs text-center">{formatterUtility(Number(order.total_amount))}</td>
                  <td className="p-4 text-xs text-center capitalize">{order.status}</td>
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
                        <MdRemoveRedEye />
                      </button>
                      <button
                        onClick={() => openUpdateModal(order)}
                        className="cursor-pointer bg-green-500 text-white text-md h-8 w-8 flex items-center justify-center rounded"
                        disabled={getAvailableStatuses(order.status).length === 0}
                      >
                        <MdEdit />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
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
                <li key={index}>
                  {item.product.name} (x{item.quantity}) - {formatterUtility(Number(item.price))}
                  <ul className='list list-disc list-inside'>
                    <li className="inline-flex justify-start items-center gap-2">
                      Color:
                      <div className='flex items-center gap-2'>
                        <span
                          className={`w-4 h-4 cursor-pointer border border-black/20 rounded-full`}
                          style={{
                            backgroundColor: item.product.color,
                          }}
                        ></span>
                        <p className='uppercase'>{item.product.color}</p>
                      </div>
                    </li>
                    <li>Size: {item.product.size} Liter(s)</li>
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </Modal>
      )}

      {updateModal.isOpen && (
        <Modal onClose={closeUpdateModal}>
          <div className='space-y-4'>
            <h2 className="text-xl font-bold">Update Order Status</h2>
            <p>
              Change status for **Order ID: {updateModal.order.order_number}**
            </p>
            <div>
              <label htmlFor="status-select" className="block text-sm font-medium text-gray-700">New Status</label>
              <select
                id="status-select"
                value={updateModal.newStatus}
                onChange={(e) => setUpdateModal({ ...updateModal, newStatus: e.target.value })}
                className="mt-1 block w-full pl-3 pr-10 py-3 text-base border border-gray-500 focus:outline-none capitalize sm:text-sm rounded-md"
              >
                <option value="" disabled>Select a status</option>
                {getAvailableStatuses(updateModal.order.status).map(status => (
                  <option key={status} value={status} className='capitalize'>{status}</option>
                ))}
              </select>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={closeUpdateModal}
                className="px-4 py-3 text-sm font-semibold rounded-md cursor-pointer border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmUpdate}
                className="px-4 py-3 text-sm font-semibold rounded-md cursor-pointer text-white bg-primary transition"
              >
                Confirm Update
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ManageOrder;