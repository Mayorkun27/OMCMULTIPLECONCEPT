import React from 'react'
import { assets } from '../assets/assets'
import { FaFacebook, FaInstagram, FaLinkedin, FaPaperPlane, FaRegEnvelope, FaTwitter } from 'react-icons/fa'
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from 'react-router-dom';

const Footer = () => {

  const year = new Date().getFullYear();

  const formik = useFormik({

  })

  return (
    <footer className="mt-[150px] lg:pt-20 pt-16 md:pb-12 pb-8 bg-white">
			<div className="made-container relative">

				<div className="absolute lg:-top-[200px] -top-[250px] z-1 right-0">
					<img src={assets.sofa} alt="Image" className="object-cover lg:max-w-[380px] max-w-[280px]"/>
				</div>

        <div className="lg:w-1/2 space-y-2 mb-10 z-2 lg:mt-0 lg:mb-16 mt-24">
          <h3 className="flex gap-2 items-center text-lg font-medium text-primary">
            <FaRegEnvelope className='text-body_color text-xl' />
            <span>Subscribe to Newsletter</span>
          </h3>

          <form onSubmit={formik.handleSubmit} className="flex md:flex-row flex-col gap-3 items-center">
            <div className="space-y-2 w-full">
              <input 
                type="text" 
                className="border border-light w-full indent-3 h-[50px] rounded-lg focus:outline-0 focus:border-primary focus:shadow-sm placeholder:text-sm placeholder:text-body_color" 
                placeholder="Enter your name"
                name='fullName'
                id='fullName'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="space-y-2 w-full">
              <input 
                type="email"
                className="border border-light w-full indent-3 h-[50px] rounded-lg focus:outline-0 focus:border-primary focus:shadow-sm placeholder:text-sm placeholder:text-body_color"
                placeholder="Enter your email"
              />
            </div>
            <button 
              type='submit'
              disabled={!formik.isValid || formik.isSubmitting}
              className="rounded-lg bg-primary h-[50px] md:w-max w-full px-4 text-xl text-light cursor-pointer disabled:cursor-not-allowed"
            >
              <FaPaperPlane className='mx-auto' />
            </button>
          </form>

        </div>

				<div className="grid lg:grid-cols-3 grid-cols-1 gap-8 text-sm items-center mb-10">
					<div className="lg:col-span-1 lg:w-full md:w-3/5 flex flex-col md:gap-6 gap-4">
            <Link
              to={"#"}
              className="lg:text-[32px] md:text-[40px] text-4xl lg:leading-8 leading-10 font-medium text-primary hover:text-dark/70 transition-all duration-300"
            >ONIPTTECH MULTIPLE CONCEPT<span>.</span></Link>
						<p className="leading-7 text-body_color">At ONIPTTECH MULTIPLE CONCEPT, We bring colors to life! As a leading paint production company, we specialize in crafting high-quality paints and interior decoration solutions that transform spaces into stunning works of art.</p>

						<ul className="flex items-center gap-4">
							<Link
                to={"#"}
                className="w-10 h-10 flex items-center justify-center bg-light hover:bg-primary rounded-full text-dark text-lg hover:text-white transition-all duration-300"
              >
                <FaFacebook />
              </Link>
							<Link
                to={""}
                className="w-10 h-10 flex items-center justify-center bg-light hover:bg-primary rounded-full text-dark text-lg hover:text-white transition-all duration-300"
              >
                <FaTwitter />
              </Link>
							<Link
                to={"https://www.instagram.com/oniptechmultipleconcept"}
                className="w-10 h-10 flex items-center justify-center bg-light hover:bg-primary rounded-full text-dark text-lg hover:text-white transition-all duration-300"
              >
                <FaInstagram />
              </Link>
							<Link
                to={""}
                className="w-10 h-10 flex items-center justify-center bg-light hover:bg-primary rounded-full text-dark text-lg hover:text-white transition-all duration-300"
              >
                <FaLinkedin />
              </Link>
						</ul>
					</div>

					<div className="lg:col-span-2 grid md:grid-cols-4 md:gap-0 gap-8">
            <ul className="md:col-span-1 flex flex-col gap-4">
              <Link
                to={""}
                className="text-dark hover:text-dark/70 transition-all duration-300"
              ><a  href="about.html">About us</a></Link>
              <Link
                to={""}
                className="text-dark hover:text-dark/70 transition-all duration-300"
              ><a  href="blog.html">Blog</a></Link>
              <Link
                to={""}
                className="text-dark hover:text-dark/70 transition-all duration-300"
              ><a  href="contact.html">Contact us</a></Link>
            </ul>

            <ul className="md:col-span-1 flex flex-col gap-4">
              <Link
                to={""}
                className="text-dark hover:text-dark/70 transition-all duration-300"
              ><a  href="#">Support</a></Link>
              <Link
                to={""}
                className="text-dark hover:text-dark/70 transition-all duration-300"
              ><a  href="#">Knowledge base</a></Link>
              <Link
                to={""}
                className="text-dark hover:text-dark/70 transition-all duration-300"
              ><a  href="#">Live chat</a></Link>
            </ul>

            <ul className="md:col-span-1 flex flex-col gap-4">
              <Link
                to={""}
                className="text-dark hover:text-dark/70 transition-all duration-300"
              ><a  href="#">Jobs</a></Link>
              <Link
                to={""}
                className="text-dark hover:text-dark/70 transition-all duration-300"
              ><a  href="#">Our team</a></Link>
              <Link
                to={""}
                className="text-dark hover:text-dark/70 transition-all duration-300"
              ><a  href="#">Leadership</a></Link>
              <Link
                to={""}
                className="text-dark hover:text-dark/70 transition-all duration-300"
              ><a  href="#">Privacy Policy</a></Link>
            </ul>

            <ul className="md:col-span-1 flex flex-col gap-4">
              <Link
                to={""}
                className="text-dark hover:text-dark/70 transition-all duration-300"
              ><a  href="#">Supercoat Emulsion Paint</a></Link>
              <Link
                to={""}
                className="text-dark hover:text-dark/70 transition-all duration-300"
              ><a  href="#">Premium Emulsion Paint</a></Link>
              <Link
                to={""}
                className="text-dark hover:text-dark/70 transition-all duration-300"
              ><a  href="#">ExtraCoat Emulsion Paint</a></Link>
            </ul>
					</div>

				</div>

				<div className="grid lg:grid-cols-2 gap-6 md:text-sm text-xs pt-8 items-center border-t border-light copyright">
          <p className="text-center lg:text-start">
            Copyright &copy;{year}. All Rights Reserved. &mdash; Developed with love by 
            <Link
              to={"https://oluwamayokun.vercel.app"}
              className="ms-1 text-dark hover:text-dark/70 transition-all duration-300"
            >Oluwamayokun</Link>
          </p>

          <ul className="flex items-center lg:justify-end justify-center gap-4">
            <Link
              to={""}
              className="text-dark hover:text-dark/70 transition-all duration-300"
            ><a  href="#">Terms &amp; Conditions</a></Link>
            <Link
              to={""}
              className="text-dark hover:text-dark/70 transition-all duration-300"
            ><a  href="#">Privacy Policy</a></Link>
          </ul>
				</div>

			</div>
		</footer>
  )
}

export default Footer