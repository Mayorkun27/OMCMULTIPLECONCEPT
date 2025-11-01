import React, { useState, useMemo } from 'react';
import Modal from '../../components/modals/Modal';
import { formatterUtility } from '../../utilities/formatterutility';
import { MdRemoveRedEye } from 'react-icons/md';

const ManageOrder = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [orders, setOrders] = useState([
    {
      id: '#12345',
      customerName: 'John Doe',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      address: '123 Main St, Anytown, USA 12345',
      orderNote: 'Leave at the front door.',
      status: 'Pending',
      items: [{ name: 'Supercoat Emulsion 1', quantity: 2, price: 300000 }],
      total: 600000,
      date: '2025-10-30',
    },
    {
      id: '#67890',
      customerName: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '098-765-4321',
      address: '456 Oak Ave, Othertown, USA 54321',
      orderNote: '',
      status: 'Completed',
      items: [{ name: 'Supercoat Emulsion 2', quantity: 1, price: 300000 }],
      total: 300000,
      date: '2025-10-29',
    },
    {
        id: '#12346',
        customerName: 'Sam Wilson',
        email: 'sam.wilson@example.com',
        phone: '123-456-7891',
        address: '789 Pine St, Anytown, USA 12345',
        orderNote: 'Call upon arrival.',
        status: 'Declined',
        items: [{ name: 'Supercoat Emulsion 3', quantity: 3, price: 300000 }],
        total: 900000,
        date: '2025-10-28',
      },
  ]);

  const openModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(orders.map(order => order.id === orderId ? { ...order, status: newStatus } : order));
  };

  const filteredOrders = useMemo(() => {
    return orders
      .filter(order => 
        order.id.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter(order => 
        statusFilter === 'All' || order.status === statusFilter
      );
  }, [orders, searchQuery, statusFilter]);

  return (
    <div className="bg-white rounded-2xl p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="w-1/3">
            <input 
                type="text"
                placeholder="Search by Order ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border border-primary indent-2 rounded-md outline-0 py-2 w-full"
            />
        </div>
        <div>
            <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-primary rounded-md outline-0 py-2"
            >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Declined">Declined</option>
            </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg">
          <thead>
            <tr className='border-b border-black/20'>
              <th className="p-4 uppercase font-[Montserrat]! font-semibold! text-dark/80 text-sm text-start">Order ID</th>
              <th className="p-4 uppercase font-[Montserrat]! font-semibold! text-dark/80 text-sm text-center">Customer</th>
              <th className="p-4 uppercase font-[Montserrat]! font-semibold! text-dark/80 text-sm text-center">Date</th>
              <th className="p-4 uppercase font-[Montserrat]! font-semibold! text-dark/80 text-sm text-center">Total</th>
              <th className="p-4 uppercase font-[Montserrat]! font-semibold! text-dark/80 text-sm text-center">Status</th>
              <th className="p-4 uppercase font-[Montserrat]! font-semibold! text-dark/80 text-sm text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className='last:border-b-0 border-b border-black/20'>
                <td className="p-4 text-start">{order.id}</td>
                <td className="p-4 text-center">{order.customerName}</td>
                <td className="p-4 text-center">{order.date}</td>
                <td className="p-4 text-center">{formatterUtility(order.total)}</td>
                <td className="p-4 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs text-white ${
                        order.status === 'Completed' ? 'bg-green-500' :
                        order.status === 'Pending' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}>
                        {order.status}
                    </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => openModal(order)} className="cursor-pointer bg-blue-500 text-white h-8 w-8 flex items-center justify-center rounded">
                      <MdRemoveRedEye/>
                    </button>
                    <button onClick={() => handleStatusChange(order.id, 'Completed')} className="cursor-pointer bg-green-500 text-white px-2 py-1 text-xs rounded">Complete</button>
                    <button onClick={() => handleStatusChange(order.id, 'Declined')} className="cursor-pointer bg-red-500 text-white px-2 py-1 text-xs rounded">Decline</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedOrder && (
        <Modal onClose={closeModal}>
            <div>
              <h2 className="text-xl font-bold mb-4">Order Details ({selectedOrder.id})</h2>
              <p><strong>Customer:</strong> {selectedOrder.customerName}</p>
              <p><strong>Email:</strong> {selectedOrder.email}</p>
              <p><strong>Phone:</strong> {selectedOrder.phone}</p>
              <p><strong>Address:</strong> {selectedOrder.address}</p>
              <p><strong>Date:</strong> {selectedOrder.date}</p>
              <p><strong>Total:</strong> {formatterUtility(selectedOrder.total)}</p>
              <p><strong>Status:</strong> {selectedOrder.status}</p>
              {selectedOrder.orderNote && <p><strong>Note:</strong> {selectedOrder.orderNote}</p>}
              <h3 className="text-lg font-bold mt-4">Items:</h3>
              <ul>
                {selectedOrder.items.map((item, index) => (
                    <li key={index}>{item.name} (x{item.quantity}) - {formatterUtility(item.price)}</li>
                ))}
              </ul>
            </div>
        </Modal>
      )}
    </div>
  );
};

export default ManageOrder;