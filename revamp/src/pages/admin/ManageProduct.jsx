import React, { useState } from 'react';
import Modal from '../../components/modals/Modal';
import { assets } from '../../assets/assets';
import { formatterUtility } from '../../utilities/formatterutility';
import { MdDelete, MdEdit, MdRemoveRedEye } from 'react-icons/md';

const ManageProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // 'view', 'update', or 'delete'
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = [
    {
      id: 1,
      name: "Supercoat Emulsion 1",
      price: 300000,
      image: assets.product1,
      description: "Suitable as a finishing coat for interior/exterior concrete plaster or cement rendered surfaces to give a highly granular, attractive finish",
    },
    {
      id: 2,
      name: "Supercoat Emulsion 2",
      price: 300000,
      image: assets.product1,
      description: "Suitable as a finishing coat for interior/exterior concrete plaster or cement rendered surfaces to give a highly granular, attractive finish",
    },
  ];

  const openModal = (type, product) => {
    setModalType(type);
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
    setSelectedProduct(null);
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg">
          <thead>
            <tr className='border-b border-black/20'>
              <th className="p-4 uppercase font-[Montserrat]! font-semibold! text-dark/80 text-sm text-start">Image</th>
              <th className="p-4 uppercase font-[Montserrat]! font-semibold! text-dark/80 text-sm text-center">Name</th>
              <th className="p-4 uppercase font-[Montserrat]! font-semibold! text-dark/80 text-sm text-center">Price</th>
              <th className="p-4 uppercase font-[Montserrat]! font-semibold! text-dark/80 text-sm text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className='last:border-b-0 border-b border-black/20'>
                <td className="p-4">
                  <img src={product.image} alt={product.name} className="w-10 h-10 object-cover" />
                </td>
                <td className="p-4 text-center">{product.name}</td>
                <td className="p-4 text-center">{formatterUtility(product.price)}</td>
                <td className="p-4 text-center">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => openModal('view', product)} className="cursor-pointer bg-blue-500 text-white h-8 w-8 flex items-center justify-center rounded">
                      <MdRemoveRedEye/>
                    </button>
                    <button onClick={() => openModal('update', product)} className="cursor-pointer bg-yellow-500 text-white h-8 w-8 flex items-center justify-center rounded">
                      <MdEdit />
                    </button>
                    <button onClick={() => openModal('delete', product)} className="cursor-pointer bg-red-500 text-white h-8 w-8 flex items-center justify-center rounded">
                      <MdDelete />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedProduct && (
        <Modal onClose={closeModal}>
          {modalType === 'view' && (
            <div>
              <h2 className="text-xl font-bold mb-4">{selectedProduct.name}</h2>
              <img src={selectedProduct.image} alt={selectedProduct.name} className="w-32 h-32 object-cover mb-4" />
              <p><strong>Price:</strong> {selectedProduct.price}</p>
              <p><strong>Description:</strong> {selectedProduct.description}</p>
            </div>
          )}
          {modalType === 'update' && (
            <div>
              <h2 className="text-xl font-bold mb-4">Update {selectedProduct.name}</h2>
              {/* Add your update form here */}
              <p>Update form will be here.</p>
            </div>
          )}
          {modalType === 'delete' && (
            <div>
              <h2 className="text-xl font-bold mb-4">Delete {selectedProduct.name}?</h2>
              <p>Are you sure you want to delete this product?</p>
              <div className="flex justify-end mt-4">
                <button onClick={closeModal} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">Cancel</button>
                <button className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
              </div>
            </div>
          )}
        </Modal>
      )}
    </>
  );
};

export default ManageProduct;