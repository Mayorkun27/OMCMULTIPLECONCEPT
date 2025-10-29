import React, { useEffect } from 'react'
import MiniHerosection from '../../components/MiniHerosection'
import { assets } from '../../assets/assets'
import { useFormik } from 'formik'
import * as Yup from "yup";
import { Link } from 'react-router-dom';

const Login = () => {

    useEffect(() => {
        window.scroll(0, 0)
      }, [])
    
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email address")
                .required("Email Address is required"),
            password: Yup.string()
                .required("Password is required"),
        }),
        onSubmit: async (values) => {
            console.log(values)
        }
    })

    return (
        <div>
            <MiniHerosection
                title={"Log In"}
                subText={"Log back into your account to see your orders and get a more enhanced experience."}
                bgStyle={{
                background: `linear-gradient(135deg, #000000ba, #000000ba), url(${assets.newsimg4})`,
                backgroundSize: "cover",
                backgroundPosition: "bottom",
                }}
            />
            <div className="made-container pt-20 lg:pb-20">
                <div className="grid grid-cols-12 gap-y-8 md:gap-x-0 lg:gap-x-8">
                    <div className='md:col-span-5 col-span-12 lg:max-h-[450px] md:max-h-[350px] max-h-80 w-full rounded-2xl overflow-hidden shadow-md relative'>
                        <img src={assets.checkimg} alt="Wall painting" className='w-full h-full object-cover' />
                        <div className="absolute inset-0 lg:p-8 md:p-8 p-4 bg-linear-to-b from-black/0 to-black/80 bottom-0 z-9 flex flex-col justify-center">
                            <h3 className='font-bold! tracking-wide md:text-6xl text-2xl drop-shadow-xl font-[Montserrat]! text-light'>Welcome Back.</h3>
                            {/* <div className="text-lighter space-y-2">
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
                            </div> */}
                        </div>
                    </div>
                    <form onSubmit={formik.handleSubmit} className='md:col-span-7 col-span-12 rounded-2xl bg-white shadow-md md:p-8 p-4 flex flex-col items-start justify-center gap-6'>
                        <div className="flex flex-col gap-1 w-full">
                            <label className="font-[Montserrat]! font-medium!" htmlFor="email">Enter your Email Address</label>
                            <input 
                                type="email" 
                                name="email" 
                                id="email"
                                autoComplete='email'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className='border border-primary indent-2 rounded-md outline-0 py-2'
                            />
                            {formik.touched.email && formik.errors.email && (<p className='text-red-600 text-sm'>{formik.errors.email}</p>)}
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <label className="font-[Montserrat]! font-medium!" htmlFor="password">Enter your password</label>
                            <input 
                                type="text" 
                                name="password" 
                                id="password"
                                autoComplete='current-password'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className='border border-primary indent-2 rounded-md outline-0 py-2'
                            />
                            {formik.touched.password && formik.errors.password && (<p className='text-red-600 text-sm'>{formik.errors.password}</p>)}
                        </div>
                        <button
                            type="submit"
                            disabled={!formik.isValid || formik.isSubmitting}
                            className="md:col-span-2 rounded-lg bg-primary h-[50px] w-full px-4 text-base text-light cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {formik.isSubmitting ? "Logging in..." : "Log In"}
                        </button>
                        <div className="">
                            <p>Don't have an account? <Link to={"/register"} className="text-primary">Register here.</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login