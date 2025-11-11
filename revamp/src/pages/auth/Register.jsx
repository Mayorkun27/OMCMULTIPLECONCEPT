import React, { useEffect } from 'react'
import MiniHerosection from '../../components/MiniHerosection'
import { assets } from '../../assets/assets'
import { useFormik } from 'formik'
import * as Yup from "yup";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import api from '../../api';

const Register = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scroll(0, 0)
    }, [])
        
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            phone: "",
            password: "",
            password_confirmation: "",
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required("Name is required"),
            email: Yup.string()
                .email("Invalid email address")
                .required("Email Address is required"),
            phone: Yup.string()
                .required("Phone is required"),
            password: Yup.string()
                .min(8, "Password must be atleast 8 characters")
                .required("Password is required"),
            password_confirmation: Yup.string()
                .required("Password confirmation is required")
                .oneOf([Yup.ref('password'), null], "Passwords are not the same"),
        }),
        onSubmit: async (values) => {
            // console.log(values);
            try {
                const response = await api.call('/register', "POST", values);
                // console.log(response);
                if (response.status === 201 || response.status === 200) {
                    toast.success('Registration successful! Please log in.');
                    setTimeout(() => {
                        navigate("/login")
                    }, 1000);
                } else {
                    toast.error(response.data.message || 'Registration failed');
                }
            } catch (error) {
                console.error('An error occurred during registration', error);
                toast.error('An error occurred during registration');
            }
        }
    })
    
    return (
        <div>
            <div>
                <MiniHerosection
                    title={"Register"}
                    subText={"Register here with OMC to get an enhanced personalized experience."}
                    bgStyle={{
                    background: `linear-gradient(135deg, #000000ba, #000000ba), url(${assets.newsimg4})`,
                    backgroundSize: "cover",
                    backgroundPosition: "bottom",
                    }}
                />
                <div className="made-container pt-20 lg:pb-20">
                    <div className="grid grid-cols-12 gap-y-8 md:gap-x-0 lg:gap-x-8">
                        <div className='lg:col-span-5 col-span-12 lg:max-h-[450px] md:max-h-[200px] max-h-40 w-full rounded-2xl overflow-hidden shadow-md relative'>
                            <img src={assets.checkimg3} alt="Wall painting" className='w-full h-full object-cover' />
                            <div className="absolute inset-0 lg:p-8 md:p-8 p-4 bg-linear-to-b from-black/0 to-black/80 bottom-0 z-9 flex flex-col justify-center">
                                <h3 className='font-bold! tracking-wide md:text-6xl text-3xl drop-shadow-xl font-[Montserrat]! text-light'>Create an Account.</h3>
                            </div>
                        </div>
                        <form onSubmit={formik.handleSubmit} className='lg:col-span-7 col-span-12 grid md:grid-cols-2 grid-cols-1 rounded-2xl bg-white shadow-md md:p-8 p-6 items-center justify-center gap-x-4 gap-y-6 text-sm'>
                            <div className="flex flex-col gap-1 w-full md:col-span-2">
                                <label className="font-[Montserrat]! font-medium!" htmlFor="name">Enter your name</label>
                                <input 
                                    type="name" 
                                    name="name" 
                                    id="name"
                                    autoComplete='name'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className='border border-primary indent-2 rounded-md outline-0 py-2'
                                />
                                {formik.touched.name && formik.errors.name && (<p className='text-red-600 text-sm'>{formik.errors.name}</p>)}
                            </div>
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
                                <label className="font-[Montserrat]! font-medium!" htmlFor="phone">Enter your Phone number</label>
                                <input 
                                    type="phone" 
                                    name="phone" 
                                    id="phone"
                                    autoComplete='phone'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className='border border-primary indent-2 rounded-md outline-0 py-2'
                                />
                                {formik.touched.phone && formik.errors.phone && (<p className='text-red-600 text-sm'>{formik.errors.phone}</p>)}
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                <label className="font-[Montserrat]! font-medium!" htmlFor="password">Enter your password</label>
                                <input 
                                    type="password" 
                                    name="password" 
                                    id="password"
                                    autoComplete='current-password'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className='border border-primary indent-2 rounded-md outline-0 py-2'
                                />
                                {formik.touched.password && formik.errors.password && (<p className='text-red-600 text-sm'>{formik.errors.password}</p>)}
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                <label className="font-[Montserrat]! font-medium!" htmlFor="password_confirmation">Enter your Passsword again</label>
                                <input 
                                    type="password" 
                                    name="password_confirmation" 
                                    id="password_confirmation"
                                    autoComplete='current-password'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className='border border-primary indent-2 rounded-md outline-0 py-2'
                                />
                                {formik.touched.password_confirmation && formik.errors.password_confirmation && (<p className='text-red-600 text-sm'>{formik.errors.password_confirmation}</p>)}
                            </div>
                            <button
                                type="submit"
                                disabled={!formik.isValid || formik.isSubmitting}
                                className="md:col-span-2 rounded-lg bg-primary h-[50px] w-full px-4 text-base text-light cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {formik.isSubmitting ? "Registering..." : "Register"}
                            </button>
                            <div className="">
                                <p>Already have an account? <Link to={"/login"} className="text-primary">Login here.</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register