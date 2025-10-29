import React from 'react'
import MiniHerosection from '../../../components/MiniHerosection'
import { assets } from '../../../assets/assets'
import { useFormik } from 'formik'
import * as Yup from "yup";
import { MdArrowRightAlt } from 'react-icons/md';

const Checkout = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      country: "",
      state: "",
      postal: "",
      orderNote: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .required("First Name is required!."),
      lastName: Yup.string()
        .required("Last Name is required!."),
      email: Yup.string()
        .email("Invalid Email Address")
        .required("Email Address is required!."),
      phone: Yup.string()
        .required("Phone Number is required!."),
      address: Yup.string()
        .required("Address is required!."),
      country: Yup.string()
        .required("Country is required!."),
      state: Yup.string()
        .required("State is required!."),
      postal: Yup.string()
        .required("Postal Code is required!."),
      orderNote: Yup.string().optional(),
    }),
    onSubmit: async () => {

    }
  })
  return (
    <div>
      <MiniHerosection
        title={"Checkout"}
        subText={"Secure Checkout with OMC Multitech Limited. Review your order, enter delivery details, and make payment. We'll deliver your premium paints and solutions promptly. Thank you for shopping with us!."}
        bgStyle={{
            background: `linear-gradient(135deg, #000000ba, #000000ba), url(${assets.checkimg})`,
            backgroundSize: "cover",
            backgroundPosition: "bottom",
        }}
      />
      <div className="made-container pt-20 lg:pb-20">
        <form onSubmit={formik.handleSubmit} className='rounded-2xl bg-white shadow-md md:p-8 p-4 space-y-4 grid grid-cols-12 gap-y-2 gap-x-6'>
          <h3 className='col-span-12 font-[Montserrat]! font-bold! md:text-3xl text-xl'>Delievery Details</h3>
          <div className="flex flex-col gap-1 col-span-12 md:col-span-6">
            <label className="font-[Montserrat]! font-medium! text-dark/90" htmlFor="firstName">Enter your First Name</label>
            <input 
              type="text" 
              name="firstName" 
              id="firstName" 
              autoComplete='given-name'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className='border border-primary indent-2 rounded-md outline-0 py-2.5'
            />
            {formik.touched.firstName && formik.errors.firstName && (<p className='text-red-600 text-sm'>{formik.errors.firstName}</p>)}
          </div>
          <div className="flex flex-col gap-1 col-span-12 md:col-span-6">
            <label className="font-[Montserrat]! font-medium! text-dark/90" htmlFor="lastName">Enter your Last Name</label>
            <input 
              type="text" 
              name="lastName" 
              id="lastName" 
              autoComplete='family-name'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className='border border-primary indent-2 rounded-md outline-0 py-2.5'
            />
            {formik.touched.lastName && formik.errors.lastName && (<p className='text-red-600 text-sm'>{formik.errors.lastName}</p>)}
          </div>
          <div className="flex flex-col gap-1 col-span-12 md:col-span-6">
            <label className="font-[Montserrat]! font-medium! text-dark/90" htmlFor="email">Enter your email address</label>
            <input 
              type="text" 
              name="email" 
              id="email" 
              autoComplete='email'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className='border border-primary indent-2 rounded-md outline-0 py-2.5'
            />
            {formik.touched.email && formik.errors.email && (<p className='text-red-600 text-sm'>{formik.errors.email}</p>)}
          </div>
          <div className="flex flex-col gap-1 col-span-12 md:col-span-6">
            <label className="font-[Montserrat]! font-medium! text-dark/90" htmlFor="phone">Enter your phone number</label>
            <input 
              type="tel" 
              name="phone" 
              id="phone" 
              autoComplete='tel'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className='border border-primary indent-2 rounded-md outline-0 py-2.5'
            />
            {formik.touched.phone && formik.errors.phone && (<p className='text-red-600 text-sm'>{formik.errors.phone}</p>)}
          </div>
          <div className="flex flex-col gap-1 col-span-12 md:col-span-12">
            <label className="font-[Montserrat]! font-medium! text-dark/90" htmlFor="address">Enter preferred address</label>
            <input 
              type="text" 
              name="address" 
              id="address"
              autoComplete='address-line1'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className='border border-primary indent-2 rounded-md outline-0 py-2.5'
            />
            {formik.touched.address && formik.errors.address && (<p className='text-red-600 text-sm'>{formik.errors.address}</p>)}
          </div>
          <div className="flex flex-col gap-1 col-span-12 md:col-span-4">
            <label className="font-[Montserrat]! font-medium! text-dark/90" htmlFor="country">Enter preferred country</label>
            <select
              name="country" 
              id="country"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className='border border-primary indent-2 rounded-md outline-0 py-2.5'
            >

            </select>
            {formik.touched.country && formik.errors.country && (<p className='text-red-600 text-sm'>{formik.errors.country}</p>)}
          </div>
          <div className="flex flex-col gap-1 col-span-12 md:col-span-4">
            <label className="font-[Montserrat]! font-medium! text-dark/90" htmlFor="state">Enter preferred state</label>
            <select
              name="state" 
              id="state"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className='border border-primary indent-2 rounded-md outline-0 py-2.5'
            >

            </select>
            {formik.touched.state && formik.errors.state && (<p className='text-red-600 text-sm'>{formik.errors.state}</p>)}
          </div>
          <div className="flex flex-col gap-1 col-span-12 md:col-span-4">
            <label className="font-[Montserrat]! font-medium! text-dark/90" htmlFor="country">Enter your postal code</label>
            <input
              type='text'
              name="country" 
              id="country"
              autoComplete='postal-code'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className='border border-primary indent-2 rounded-md outline-0 py-2.5'
            />
            {formik.touched.country && formik.errors.country && (<p className='text-red-600 text-sm'>{formik.errors.country}</p>)}
          </div>
          <div className="flex flex-col gap-1 col-span-12 md:col-span-12">
            <label className="font-[Montserrat]! font-medium! text-dark/90" htmlFor="message">Enter your order notes</label>
            <textarea
              rows={5}
              name="message" 
              id="message" 
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className='border border-primary indent-2 rounded-md outline-0 py-2 resize-none'
            />
            {formik.touched.message && formik.errors.message && (<p className='text-red-600 text-sm'>{formik.errors.message}</p>)}
          </div>
          <button
            type="submit"
            disabled={!formik.isValid || formik.isSubmitting}
            className="col-span-12 rounded-lg bg-primary h-[50px] w-full px-4 text-base text-light cursor-pointer flex items-center justify-center gap-2 disabled:cursor-not-allowed"
          >
            <span>Proceed to Payment</span>
            <MdArrowRightAlt className="text-lg" />
          </button>
        </form>
      </div>
    </div>
  )
}

export default Checkout