import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from "yup";

const AddProduct = () => {
    const [currentColor, setCurrentColor] = useState("");

    const formik = useFormik({
        initialValues: {
        name: "",
        description: "",
        size: "",
        price: "",
        quantity: "",
        colors: [],
        },
        validationSchema: Yup.object({
        name: Yup.string().required("Product name is required"),
        description: Yup.string().required("Product description is required"),
        size: Yup.string().required("Product size is required"),
        price: Yup.number().positive("Price must be positive").required("Price is required"),
        quantity: Yup.number().integer("Quantity must be an integer").positive("Quantity must be positive").required("Quantity is required"),
        colors: Yup.array().of(Yup.string()).min(1, "At least one color is required"),
        }),
        onSubmit: async (values) => {
        console.log("Form values:", values);
        }
    });

    const handleAddColor = () => {
        if (currentColor && /^#([0-9A-F]{3}){1,2}$/i.test(currentColor)) {
        formik.setFieldValue('colors', [...formik.values.colors, currentColor]);
        setCurrentColor("");
        } else {
        alert("Please enter a valid hex code (e.g., #RRGGBB or #RGB).");
        }
    };

    const handleRemoveColor = (indexToRemove) => {
        formik.setFieldValue(
        'colors',
        formik.values.colors.filter((_, index) => index !== indexToRemove)
        );
    };

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

                {/* Size, Price, Quantity */}
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
                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                            Quantity
                        </label>
                        <div className="mt-1">
                            <input
                                type="number"
                                name="quantity"
                                id="quantity"
                                className="block w-full placeholder:text-black/50 text-sm border border-primary/20 rounded-md indent-3 py-2 outline-0"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.quantity}
                            />
                        </div>
                        {formik.touched.quantity && formik.errors.quantity ? (
                            <p className="mt-2 text-sm text-red-600">{formik.errors.quantity}</p>
                        ) : null}
                    </div>
                </div>

                {/* Colors */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Colors</label>
                    <div className="mt-1 flex items-center space-x-2">
                        <input
                            type="text"
                            className="block w-full placeholder:text-black/50 text-sm border border-primary/20 rounded-md indent-3 py-2 outline-0"
                            placeholder="#FFFFFF"
                            value={currentColor}
                            onChange={(e) => setCurrentColor(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={handleAddColor}
                            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-secondary focus:outline-none cursor-pointer"
                        >
                            Add
                        </button>
                    </div>
                    {formik.touched.colors && formik.errors.colors ? (
                        <p className="mt-2 text-sm text-red-600">{formik.errors.colors}</p>
                    ) : null}

                    <div className="mt-4 flex flex-wrap gap-3">
                        {formik.values.colors.map((c, index) => (
                            <div key={index} className="flex items-center gap-2 p-1 border border-black/20 rounded-full">
                                <div
                                    className="w-6 h-6 rounded-full border border-black/20"
                                    style={{ backgroundColor: c }}
                                ></div>
                                <span className="text-sm">{c}</span>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveColor(index)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        disabled={!formik.isValid || formik.isSubmitting}
                        className="w-full flex justify-center py-2 px-4 bg-primary rounded-md shadow-sm text-sm font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Add Product
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddProduct