import React, { useEffect } from 'react'
import MiniHerosection from '../../components/MiniHerosection'
import { assets } from '../../assets/assets'
import { useFormik } from 'formik'
import * as Yup from "yup";
import { FaPaperPlane } from 'react-icons/fa';
import { MdLocationPin, MdMail, MdPhone } from 'react-icons/md';
import { LuLoaderCircle } from "react-icons/lu";

const Contact = () => {

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .required("First Name is required"),
      lastName: Yup.string()
        .required("Last Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email Address is required"),
      message: Yup.string()
        .required("Message is required"),
    }),
    onSubmit: async (values) => {
      console.log(values)
    }
  })

  return (
    <div>
      <MiniHerosection
        title={"Contact"}
        subText={"Get in touch with us. We're here to help with your paint and interior decoration needs!."}
        bgStyle={{
          background: `linear-gradient(135deg, #000000ba, #000000ba), url(${assets.newsimg4})`,
          backgroundSize: "cover",
          backgroundPosition: "bottom",
        }}
      />
      <div className="made-container pt-20 lg:pb-20">
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-y-8 md:gap-x-0 lg:gap-x-8 lg:items-center">
          <div className='lg:max-h-[500px] md:max-h-[350px] max-h-80 w-full rounded-2xl overflow-hidden shadow-md relative'>
            <img src={assets.heroimg} alt="Wall painting" className='w-full h-full object-cover' />
            <div className="absolute inset-0 lg:p-4 md:p-8 p-4 bg-linear-to-b from-black/20 to-black bottom-0 z-9 flex flex-col justify-between">
              <h3 className='font-bold! tracking-wide md:text-4xl text-2xl drop-shadow-xl font-[Montserrat]! text-light'>Want colors that define your place? OMC has your back!.</h3>
              <div className="text-lighter space-y-2">
                <p>Reach out:</p>
                <div className="flex items-center gap-2">
                  <div className='w-8 h-8 bg-secondary flex items-center justify-center rounded-md'>
                    <MdLocationPin />
                  </div>
                  <span className='w-[calc(100%-32px)] lg:text-xs md:text-sm text-xs'>12, Buraimon Street, Obanikoro Estate, Ikorodu Road, Lagos.</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className='w-8 h-8 bg-secondary flex items-center justify-center rounded-md'>
                    <MdMail />
                  </div>
                  <span className='w-[calc(100%-32px)] lg:text-xs md:text-sm text-xs'>oniptechmultipleconcept001@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className='w-8 h-8 bg-secondary flex items-center justify-center rounded-md'>
                    <MdPhone />
                  </div>
                  <span className='w-[calc(100%-32px)] lg:text-xs md:text-sm text-xs'>12, Buraimon Street, Obanikoro Estate, Ikorodu Road, Lagos.</span>
                </div>
              </div>
            </div>
          </div>
          <form onSubmit={formik.handleSubmit} className='md:col-span-2 rounded-2xl bg-white shadow-md md:p-8 p-4 space-y-4 grid md:grid-cols-2 gap-y-2 gap-x-6'>
            <div className="flex flex-col gap-1">
              <label className="font-[Montserrat]! font-medium!" htmlFor="firstName">Enter your First Name</label>
              <input 
                type="text" 
                name="firstName" 
                id="firstName" 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className='border border-primary indent-2 rounded-md outline-0 py-2'
              />
              {formik.touched.firstName && formik.errors.firstName && (<p className='text-red-600 text-sm'>{formik.errors.firstName}</p>)}
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-[Montserrat]! font-medium!" htmlFor="lastName">Enter your Last Name</label>
              <input 
                type="text" 
                name="lastName" 
                id="lastName" 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className='border border-primary indent-2 rounded-md outline-0 py-2'
              />
              {formik.touched.lastName && formik.errors.lastName && (<p className='text-red-600 text-sm'>{formik.errors.lastName}</p>)}
            </div>
            <div className="flex flex-col gap-1 md:col-span-2">
              <label className="font-[Montserrat]! font-medium!" htmlFor="email">Enter your email address</label>
              <input 
                type="text" 
                name="email" 
                id="email" 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className='border border-primary indent-2 rounded-md outline-0 py-2'
              />
              {formik.touched.email && formik.errors.email && (<p className='text-red-600 text-sm'>{formik.errors.email}</p>)}
            </div>
            <div className="flex flex-col gap-1 md:col-span-2">
              <label className="font-[Montserrat]! font-medium!" htmlFor="message">Enter your message address</label>
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
              className="md:col-span-2 rounded-lg bg-primary h-[50px] w-full px-4 text-base text-light cursor-pointer flex items-center justify-center gap-2 disabled:cursor-not-allowed"
            >
              {formik.isSubmitting ? "Sending..." : "Send"}
              {formik.isSubmitting ? (
                <LuLoaderCircle className="text-lg animate-spin" />
              ) : (
                <FaPaperPlane className="text-lg" />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact