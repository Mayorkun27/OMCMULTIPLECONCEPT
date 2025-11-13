import React from 'react';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { toast } from 'sonner';
import api from '../../api';

const AddProduct = () => {
    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            color: "", // Changed to a single string
            size: "",
            price: "",
            stock: "",
            image: null,
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            name: Yup.string().required("Product name is required"),
            description: Yup.string().required("Product description is required"),
            size: Yup.string().required("Product size is required"),
            price: Yup.number().positive("Price must be positive").required("Price is required"),
            stock: Yup.number().integer("Stock must be an integer").positive("Stock must be positive").required("Stock is required"),
            color: Yup.string()
                .required("Color is required")
                .test(
                    'is-valid-color',
                    'Must be a valid hex code (e.g., #FFF) or color name (e.g., white)',
                    (value) => !!value && (/(^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$)|(^[a-zA-Z]+$)/i.test(value))
                ),
            image: Yup.mixed().required("Product image is required"),
        }),
        onSubmit: async (values, { resetForm }) => {
            const formData = new FormData();
            for (const key in values) {
                if (key === 'image') {
                    if (values.image) {
                        formData.append(key, values.image);
                    }
                } else {
                    formData.append(key, values[key]);
                }
            }

            try {
                const response = await api.call(`/products`, "POST", formData);
                if (response) {
                    toast.success("Product created successfully");
                    resetForm();
                }
            } catch (error) {
                console.error('An error occurred creating product', error);
                toast.error(error?.response?.data?.message || 'An error occurred creating product');
            }
        }
    });

    return (
        <div className="bg-white rounded-2xl p-6">
            <form onSubmit={formik.handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Product Name
                    </label>
                    <div className="mt-1">
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="block w-full placeholder:text-black/50 text-sm border border-primary/20 rounded-md indent-3 py-2 outline-0"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                        />
                    </div>
                    {formik.touched.name && formik.errors.name ? (
                        <p className="mt-2 text-sm text-red-600">{formik.errors.name}</p>
                    ) : null}
                </div>

                {/* Description */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <div className="mt-1">
                        <textarea
                            id="description"
                            name="description"
                            rows={3}
                            className="resize-none block w-full placeholder:text-black/50 text-sm border border-primary/20 rounded-md indent-3 py-2 outline-0"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.description}
                        />
                    </div>
                    {formik.touched.description && formik.errors.description ? (
                        <p className="mt-2 text-sm text-red-600">{formik.errors.description}</p>
                    ) : null}
                </div>

                {/* Image */}
                <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                        Product Image
                    </label>
                    <div className="mt-1">
                        <input
                            type="file"
                            id="image"
                            name="image"
                            onChange={(event) => {
                                formik.setFieldValue("image", event.currentTarget.files[0]);
                            }}
                            onBlur={formik.handleBlur}
                            className="resize-none block w-full placeholder:text-black/50 text-sm border border-primary/20 rounded-md indent-3 py-2 outline-0"
                        />
                    </div>
                    {formik.touched.image && formik.errors.image ? (
                        <p className="mt-2 text-sm text-red-600">{formik.errors.image}</p>
                    ) : null}
                </div>

                {/* Size, Price, stock */}
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
                    <div>
                        <label htmlFor="size" className="block text-sm font-medium text-gray-700">
                            Size
                        </label>
                        <div className="mt-1">
                            <input
                                type="number"
                                name="size"
                                id="size"
                                placeholder="Specify in liters"
                                className="block w-full placeholder:text-black/50 text-sm border border-primary/20 rounded-md indent-3 py-2 outline-0"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.size}
                            />
                        </div>
                        {formik.touched.size && formik.errors.size ? (
                            <p className="mt-2 text-sm text-red-600">{formik.errors.size}</p>
                        ) : null}
                    </div>

                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                            Price
                        </label>
                        <div className="mt-1">
                            <input
                                type="number"
                                name="price"
                                id="price"
                                className="block w-full placeholder:text-black/50 text-sm border border-primary/20 rounded-md indent-3 py-2 outline-0"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.price}
                            />
                        </div>
                        {formik.touched.price && formik.errors.price ? (
                            <p className="mt-2 text-sm text-red-600">{formik.errors.price}</p>
                        ) : null}
                    </div>

                    <div>
                        <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                            Stock
                        </label>
                        <div className="mt-1">
                            <input
                                type="number"
                                name="stock"
                                id="stock"
                                className="block w-full placeholder:text-black/50 text-sm border border-primary/20 rounded-md indent-3 py-2 outline-0"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.stock}
                            />
                        </div>
                        {formik.touched.stock && formik.errors.stock ? (
                            <p className="mt-2 text-sm text-red-600">{formik.errors.stock}</p>
                        ) : null}
                    </div>
                </div>

                {/* Color */}
                <div>
                    <label htmlFor="color" className="block text-sm font-medium text-gray-700">
                        Color
                    </label>
                    <div className="mt-1">
                        <input
                            type="text"
                            name="color"
                            id="color"
                            className="block w-full placeholder:text-black/50 text-sm border border-primary/20 rounded-md indent-3 py-2 outline-0"
                            placeholder="e.g., #FFFFFF or white"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.color}
                        />
                    </div>
                    {formik.touched.color && formik.errors.color ? (
                        <p className="mt-2 text-sm text-red-600">{formik.errors.color}</p>
                    ) : null}
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        disabled={!formik.isValid || formik.isSubmitting}
                        className="lg:w-1/2 mx-auto w-full flex justify-center py-2 px-4 bg-primary rounded-md shadow-sm text-sm font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {formik.isSubmitting ? "Adding Product..." : "Add Product"}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddProduct;