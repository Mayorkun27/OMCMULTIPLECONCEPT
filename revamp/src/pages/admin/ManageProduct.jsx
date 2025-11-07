import React, { useEffect, useState } from 'react';
import Modal from '../../components/modals/Modal';
import { assets } from '../../assets/assets';
import { formatISODateToCustom, formatterUtility } from '../../utilities/formatterutility';
import { MdDelete, MdEdit, MdRemoveRedEye } from 'react-icons/md';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { toast } from 'sonner';
import api from '../../api';
import PaginationControls from '../../utilities/PaginationControls';

// Update Form Component
const UpdateProductForm = ({ product, onUpdate, onClose }) => {
    const [currentColor, setCurrentColor] = useState("");

    // Safely parse the color string into an array for initialization
    let initialColors = [];
    try {
        if (typeof product.color === 'string') {
            initialColors = JSON.parse(product.color);
        } else if (Array.isArray(product.color)) {
            initialColors = product.color;
        }
    } catch (e) {
        console.error("Failed to parse product colors", e);
    }

    const formik = useFormik({
        initialValues: {
            id: product.id,
            name: product.name || "",
            description: product.description || "",
            color: initialColors,
            size: product.size || "",
            price: product.price || "",
            stock: product.stock || "",
            image: "", // Image is optional on update, so initial is empty
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Product name is required"),
            description: Yup.string().required("Product description is required"),
            size: Yup.string().required("Product size is required"),
            price: Yup.number().positive("Price must be positive").required("Price is required"),
            stock: Yup.number().integer("stock must be an integer").positive("stock must be positive").required("stock is required"),
            color: Yup.array().of(Yup.string()).min(1, "At least one color is required"),
            image: Yup.mixed().optional(), // Image is not required for updates
        }),
        onSubmit: async (values) => {
            const submissionData = {
                ...values,
                color: JSON.stringify(values.color) // Stringify colors for the backend
            };

            try {
                const response = await api.call(`/products/${values.id}`, "POST", submissionData);
                if (response) { // Assuming response is truthy on success
                    toast.success("Product updated successfully");
                    onUpdate({ ...values, color: JSON.stringify(values.color) }); // Pass stringified colors back to parent
                    onClose(); // Close the modal
                }
            } catch (error) {
                console.error('An error occurred updating the product', error);
                toast.error('An error occurred updating the product');
            }
        }
    });

    const handleAddColor = () => {
        if (currentColor && /^#([0-9A-F]{3}){1,2}$/i.test(currentColor)) {
            formik.setFieldValue('color', [...formik.values.color, currentColor]);
            setCurrentColor("");
        } else {
            toast.info("Please enter a valid hex code (e.g., #RRGGBB or #RGB).");
        }
    };

    const handleRemoveColor = (indexToRemove) => {
        formik.setFieldValue(
            'color',
            formik.values.color.filter((_, index) => index !== indexToRemove)
        );
    };

    return (
        <>
            <h2 className="text-xl font-bold mb-4">Update {product.name}</h2>
            <form onSubmit={formik.handleSubmit} className="space-y-6">
                {/* Form fields copied from AddProduct.jsx */}
                {/* Name */}
                <div>
                    <label htmlFor="name" className="block text-xs font-medium text-gray-700">Product Name</label>
                    <input type="text" name="name" id="name" className="block w-full placeholder:text-black/50 text-xs border border-primary/20 rounded-md indent-3 py-2 outline-0" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} />
                    {formik.touched.name && formik.errors.name ? (<p className="mt-2 text-xs text-red-600">{formik.errors.name}</p>) : null}
                </div>

                {/* Description */}
                <div>
                    <label htmlFor="description" className="block text-xs font-medium text-gray-700">Description</label>
                    <textarea id="description" name="description" rows={3} className="resize-none block w-full placeholder:text-black/50 text-xs border border-primary/20 rounded-md indent-3 py-2 outline-0" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.description} />
                    {formik.touched.description && formik.errors.description ? (<p className="mt-2 text-xs text-red-600">{formik.errors.description}</p>) : null}
                </div>

                {/* Image */}
                <div>
                    <label htmlFor="image" className="block text-xs font-medium text-gray-700">New Product Image (Optional)</label>
                    <input type="file" id="image" name="image" className="resize-none block w-full placeholder:text-black/50 text-xs border border-primary/20 rounded-md indent-3 py-2 outline-0" onChange={(event) => { formik.setFieldValue("image", event.currentTarget.files[0]); }} onBlur={formik.handleBlur} />
                    {formik.touched.image && formik.errors.image ? (<p className="mt-2 text-xs text-red-600">{formik.errors.image}</p>) : null}
                </div>

                {/* Size, Price, stock */}
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
                    <div>
                        <label htmlFor="size" className="block text-xs font-medium text-gray-700">Size</label>
                        <input type="number" name="size" id="size" placeholder="Specify in liters" className="block w-full placeholder:text-black/50 text-xs border border-primary/20 rounded-md indent-3 py-2 outline-0" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.size} />
                        {formik.touched.size && formik.errors.size ? (<p className="mt-2 text-xs text-red-600">{formik.errors.size}</p>) : null}
                    </div>
                    <div>
                        <label htmlFor="price" className="block text-xs font-medium text-gray-700">Price</label>
                        <input type="number" name="price" id="price" className="block w-full placeholder:text-black/50 text-xs border border-primary/20 rounded-md indent-3 py-2 outline-0" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.price} />
                        {formik.touched.price && formik.errors.price ? (<p className="mt-2 text-xs text-red-600">{formik.errors.price}</p>) : null}
                    </div>
                    <div>
                        <label htmlFor="stock" className="block text-xs font-medium text-gray-700">Stock</label>
                        <input type="number" name="stock" id="stock" className="block w-full placeholder:text-black/50 text-xs border border-primary/20 rounded-md indent-3 py-2 outline-0" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.stock} />
                        {formik.touched.stock && formik.errors.stock ? (<p className="mt-2 text-xs text-red-600">{formik.errors.stock}</p>) : null}
                    </div>
                </div>

                {/* Color */}
                <div>
                    <label className="block text-xs font-medium text-gray-700">Color</label>
                    <div className="mt-1 flex items-center space-x-2">
                        <input type="text" className="block w-full placeholder:text-black/50 text-xs border border-primary/20 rounded-md indent-3 py-2 outline-0" placeholder="#FFFFFF" value={currentColor} onChange={(e) => setCurrentColor(e.target.value)} />
                        <button type="button" onClick={handleAddColor} className="px-4 py-2 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-secondary focus:outline-none cursor-pointer">Add</button>
                    </div>
                    {formik.touched.color && formik.errors.color ? (<p className="mt-2 text-xs text-red-600">{formik.errors.color}</p>) : null}
                    <div className="mt-4 flex flex-wrap gap-3">
                        {formik.values.color.map((c, index) => (
                            <div key={index} className="flex items-center gap-2 p-1 border border-black/20 rounded-full">
                                <div className="w-6 h-6 rounded-full border border-black/20" style={{ backgroundColor: c }}></div>
                                <span className="text-xs">{c}</span>
                                <button type="button" onClick={() => handleRemoveColor(index)} className="text-gray-400 hover:text-gray-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Submit Button */}
                <div>
                    <button type="submit" disabled={!formik.isValid || formik.isSubmitting} className="lg:w-1/2 mx-auto w-full flex justify-center py-2 px-4 bg-primary rounded-md shadow-sm text-xs font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed">
                        Update Product
                    </button>
                </div>
            </form>
        </>
    );
};

const ManageProduct = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null); // 'view', 'update', or 'delete'
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [isDeleting, setIsDeleting] = useState(false);
    const [currentPage, setCurrentPage] = useState(1)
    const [lastPage, setlastPage] = useState(1)

    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await api.call(`/products`, 'GET');
          console.log(response)
          if (response.status === 200) {
            const { data, current_page, last_page } = response.data.data;
            setProducts(data);
            setCurrentPage(current_page)
            setlastPage(last_page)
            toast.success('Product fetched successfully');
          }
        } catch (error) {
            toast.error('Failed to fetch product');
            console.error('An error occurred fetching the product', error);
        }
      };

      fetchProducts()
    }, [])

    const handleUpdateProduct = (updatedProduct) => {
      setProducts(products.map(p => p.id === updatedProduct.id ? { ...p, ...updatedProduct } : p));
    };

    const handleDeleteProduct = async (productId) => {
      setIsDeleting(true);
      try {
        await api.call(`/products/${productId}`, 'DELETE');
        toast.success('Product deleted successfully');
        setProducts(products.filter(p => p.id !== productId));
        closeModal();
      } catch (error) {
        toast.error('Failed to delete product');
        console.error('An error occurred deleting the product', error);
      } finally {
        setIsDeleting(false); // <-- Reset loading state
      }
    };

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
                            <th className="p-4 uppercase font-[Montserrat]! font-semibold! text-dark/80 text-xs text-start">S/N</th>
                            <th className="p-4 uppercase font-[Montserrat]! font-semibold! text-dark/80 text-xs text-center">Product</th>
                            <th className="p-4 uppercase font-[Montserrat]! font-semibold! text-dark/80 text-xs text-center">Price</th>
                            <th className="p-4 uppercase font-[Montserrat]! font-semibold! text-dark/80 text-xs text-center">In Stock</th>
                            <th className="p-4 uppercase font-[Montserrat]! font-semibold! text-dark/80 text-xs text-center">Date Added</th>
                            <th className="p-4 uppercase font-[Montserrat]! font-semibold! text-dark/80 text-xs text-end">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={product.id} className='last:border-b-0 border-b text-xs border-black/20'>
                                <td className="px-4 py-2 text-start">{String(index+1).padStart(3, "0")}</td>
                                <td className="px-4 py-2">
                                  <div className='flex items-center gap-4'>
                                    <img src={product.image} alt={product.name} className="w-10 h-10 rounded-full border border-black/50 object-cover" />
                                    <p>{product.name}</p>
                                  </div>
                                </td>
                                <td className="px-4 py-2 text-center">{formatterUtility(Number(product.price))}</td>
                                <td className="px-4 py-2 text-center">{formatterUtility(Number(product.stock), true)}</td>
                                <td className="px-4 py-2 text-center">{formatISODateToCustom(product.created_at)}</td>
                                <td className="px-4 py-2 text-center">
                                    <div className="flex items-center justify-end gap-2">
                                        <button onClick={() => openModal('view', product)} className="cursor-pointer bg-blue-500 text-white h-8 w-8 flex items-center justify-center rounded"><MdRemoveRedEye /></button>
                                        <button onClick={() => openModal('update', product)} className="cursor-pointer bg-yellow-500 text-white h-8 w-8 flex items-center justify-center rounded"><MdEdit /></button>
                                        <button onClick={() => openModal('delete', product)} className="cursor-pointer bg-red-500 text-white h-8 w-8 flex items-center justify-center rounded"><MdDelete /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan={6}>
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

            {isModalOpen && selectedProduct && (
                <Modal onClose={closeModal}>
                    {modalType === 'view' && (
                        <div>
                            <h2 className="text-xl font-bold mb-4">{selectedProduct.name}</h2>
                            <div className="flex md:flex-row flex-col gap-4 text-xs items-center">
                              <div className="w-[200px] h-[200px] rounded-xl overflow-hidden">
                                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
                              </div>
                              <div className='w-[calc(100%-200px)] space-y-1'>
                                <p><strong>Price:</strong> {formatterUtility(Number(selectedProduct.price))}</p>
                                <p><strong>Description:</strong> {selectedProduct.description}</p>
                                <p><strong>Size:</strong> {selectedProduct.size} Liters</p>
                                <p><strong>In stock:</strong> {selectedProduct.stock}</p>
                                <p className='flex flex-wrap items-center gap-2'><strong>Color:</strong> 
                                  <div className='flex flex-wrap gap-2'>
                                    {
                                      JSON.parse(selectedProduct.color).map((c, index) => (
                                        <div 
                                          key={index} 
                                          title={c}
                                          aria-label={c}
                                          className={`w-6 h-6 cursor-pointer rounded-full border border-black/20`}
                                          style={{
                                            backgroundColor: c,
                                          }}
                                        ></div>

                                      ))
                                    }
                                  </div>
                                </p>
                              </div>
                            </div>
                        </div>
                    )}
                    {modalType === 'update' && (
                        <UpdateProductForm product={selectedProduct} onUpdate={handleUpdateProduct} onClose={closeModal} />
                    )}
                    {modalType === 'delete' && (
                        <div>
                            <h2 className="text-xl font-bold mb-4">Delete {selectedProduct.name}?</h2>
                            <p>Are you sure you want to delete this product?</p>
                            <div className="flex justify-end mt-4">
                                <button onClick={closeModal} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">Cancel</button>
                                <button 
                                  onClick={() => handleDeleteProduct(selectedProduct.id)} 
                                  className="cursor-pointer bg-red-500 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                                  disabled={isDeleting}
                                >{isDeleting ? 'Deleting...' : 'Delete'}</button>
                            </div>
                        </div>
                    )}
                </Modal>
            )}
        </>
    );
};

export default ManageProduct;