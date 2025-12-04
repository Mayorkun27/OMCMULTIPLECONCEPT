import React, { useEffect, useState } from 'react';
import Modal from '../../components/modals/Modal';
import { formatISODateToCustom, formatterUtility } from '../../utilities/formatterutility';
import { MdDelete, MdEdit, MdRemoveRedEye } from 'react-icons/md';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { toast } from 'sonner';
import api from '../../api';
import PaginationControls from '../../utilities/PaginationControls';

// Update Form Component
const UpdateProductForm = ({ product, onUpdate, onClose }) => {
    const formik = useFormik({
        initialValues: {
            id: product.id,
            name: product.name || "",
            description: product.description || "",
            color: product.color || "",
            size: product.size || "",
            price: product.price || "",
            stock: product.stock || "",
            image: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Product name is required"),
            description: Yup.string().required("Product description is required"),
            size: Yup.string().required("Product size is required"),
            price: Yup.number().positive("Price must be positive").required("Price is required"),
            stock: Yup.number().integer("stock must be an integer").positive("stock must be positive").required("stock is required"),
            color: Yup.string()
                .required("Color is required")
                .test(
                    'is-valid-color',
                    'Must be a valid hex code (e.g., #FFF) or color name (e.g., white)',
                    (value) => !!value && (/(^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$)|(^[a-zA-Z]+$)/i.test(value))
                ),
            image: Yup.mixed().optional(), // Image is not required for updates
        }),
        onSubmit: async (values) => {
            const formData = new FormData();

            for (const key in values) {
                // Ensure only non-file fields (or empty image string) are appended first
                // If the key is 'image' and it's a File object, we handle it below.
                if (key !== 'image' || typeof values[key] === 'string') {
                    // Convert numbers to strings for FormData
                    formData.append(key, values[key]);
                }
            }

            if (values.image instanceof File) {
                // The third argument is the filename, which is optional but good practice
                formData.append('image', values.image, values.image.name);
            }

            try {
                const response = await api.call(`/products/${values.id}`, "POST", formData);
                if (response) { // Assuming response is truthy on success
                    toast.success("Product updated successfully");
                    onUpdate(values); // Pass stringified colors back to parent
                    onClose(); // Close the modal
                }
            } catch (error) {
                console.error('An error occurred updating the product', error);
                toast.error('An error occurred updating the product');
            }
        }
    });

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
                    <input type="text" name="color" id="color" className="block w-full placeholder:text-black/50 text-xs border border-primary/20 rounded-md indent-3 py-2 outline-0" placeholder="e.g., #FFFFFF or white" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.color} />
                    {formik.touched.color && formik.errors.color ? (<p className="mt-2 text-xs text-red-600">{formik.errors.color}</p>) : null}
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

    const itemsPerPage = 8

    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await api.call(`/products?page=${currentPage}&per_page=${itemsPerPage}`, 'GET');
          // console.log(response)
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
    }, [currentPage])

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
                            <th className="p-4 uppercase font-[Montserrat]! font-semibold! text-dark/80 text-xs text-start">Product</th>
                            <th className="p-4 uppercase font-[Montserrat]! font-semibold! text-dark/80 text-xs text-center">Price</th>
                            <th className="p-4 uppercase font-[Montserrat]! font-semibold! text-dark/80 text-xs text-center">Color</th>
                            <th className="p-4 uppercase font-[Montserrat]! font-semibold! text-dark/80 text-xs text-center">In Stock</th>
                            <th className="p-4 uppercase font-[Montserrat]! font-semibold! text-dark/80 text-xs text-center">Date Added</th>
                            <th className="p-4 uppercase font-[Montserrat]! font-semibold! text-dark/80 text-xs text-end">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan={7} className='text-center p-5 text-gray-600'>No Products found</td>
                            </tr>
                        ) : (
                            products.map((product, index) => {
                                const serialNumber = (currentPage - 1) * itemsPerPage + index + 1
                                return (
                                    <tr key={product.id} className='last:border-b-0 border-b text-xs border-black/20'>
                                        <td className="px-4 py-2 text-start">{String(serialNumber).padStart(3, "0")}</td>
                                        <td className="px-4 py-2">
                                        <div className='flex items-center gap-4'>
                                            <div className="w-10 h-10 rounded-full border border-black/50 overflow-hidden">
                                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                            </div>
                                            <span className='w-[calc(100%-56px)]'>{product.name}</span>
                                        </div>
                                        </td>
                                        <td className="px-4 py-2 text-center">{formatterUtility(Number(product.price))}</td>
                                        <td className="px-4 py-2 text-center">
                                            <div className="flex justify-center items-center gap-2 uppercase">
                                                <span
                                                    className={`w-4 h-4 cursor-pointer border border-black/20 rounded-full`}
                                                    style={{
                                                        backgroundColor: product.color,
                                                    }}
                                                ></span>
                                                <p>{product.color}</p>
                                            </div>
                                        </td>
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
                                )
                            }
                        ))}
                    </tbody>
                    <tfoot>
                      <tr className='border-t border-primary/20'>
                        <td colSpan={7} className='py-4'>
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
                            <div className="flex md:flex-row flex-col gap-4 text-xs md:items-center items-start">
                              <div className="md:w-[200px] w-full h-[200px] rounded-xl overflow-hidden">
                                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
                              </div>
                              <div className='md:w-[calc(100%-200px)] space-y-2'>
                                <p><strong>Price:</strong> {formatterUtility(Number(selectedProduct.price))}</p>
                                <p><strong>Description:</strong> {selectedProduct.description}</p>
                                <p><strong>Size:</strong> {selectedProduct.size} Liters</p>
                                <p><strong>In stock:</strong> {selectedProduct.stock}</p>
                                <p className='flex flex-wrap items-center gap-2'>
                                    <strong>Color:</strong> 
                                    <div 
                                        title={selectedProduct.color}
                                        aria-label={selectedProduct.color}
                                        className={`w-4 h-4 cursor-pointer rounded-full border border-black/20`}
                                        style={{
                                            backgroundColor: selectedProduct.color,
                                        }}
                                    ></div>
                                    <p className='uppercase'>{selectedProduct.color}</p>
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