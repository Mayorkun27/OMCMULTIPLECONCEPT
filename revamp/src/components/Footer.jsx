import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaPaperPlane, FaRegEnvelope, FaTwitter } from 'react-icons/fa'
import { Link } from 'react-router-dom';

const Footer = () => {

  const year = new Date().getFullYear();

  return (
    <footer className="pt-12 md:pb-12 pb-8 bg-white">
			<div className="made-container relative">
        

				<div className="grid lg:grid-cols-3 grid-cols-1 gap-8 text-sm items-center mb-10">
					<div className="lg:col-span-1 lg:w-full md:w-3/5 flex flex-col md:gap-6 gap-4">
            <Link
              to={"#"}
              className="font-[Montserrat]! lg:text-3xl md:text-4xl text-3xl lg:leading-8 leading-10 font-medium! text-primary hover:text-dark/70 transition-all duration-300"
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
              >About us</Link>
              <Link
                to={""}
                className="text-dark hover:text-dark/70 transition-all duration-300"
              >Blog</Link>
              <Link
                to={""}
                className="text-dark hover:text-dark/70 transition-all duration-300"
              >Contact us</Link>
            </ul>

            <ul className="md:col-span-1 flex flex-col gap-4">
              <Link
                to={""}
                className="text-dark hover:text-dark/70 transition-all duration-300"
              >Support</Link>
              <Link
                to={""}
                className="text-dark hover:text-dark/70 transition-all duration-300"
              >Knowledge base</Link>
              <Link
                to={""}
                className="text-dark hover:text-dark/70 transition-all duration-300"
              >Live chat</Link>
            </ul>

            <ul className="md:col-span-1 flex flex-col gap-4">
              <Link
                to={""}
                className="text-dark hover:text-dark/70 transition-all duration-300"
              >Jobs</Link>
              <Link
                to={""}
                className="text-dark hover:text-dark/70 transition-all duration-300"
              >Our team</Link>
              <Link
                to={""}
                className="text-dark hover:text-dark/70 transition-all duration-300"
              >Leadership</Link>
              <Link
                to={""}
                className="text-dark hover:text-dark/70 transition-all duration-300"
              >Privacy Policy</Link>
            </ul>

            <ul className="md:col-span-1 flex flex-col gap-4">
              <Link
                to={""}
                className="text-dark hover:text-dark/70 transition-all duration-300"
              >Supercoat Emulsion Paint</Link>
              <Link
                to={""}
                className="text-dark hover:text-dark/70 transition-all duration-300"
              >Premium Emulsion Paint</Link>
              <Link
                to={""}
                className="text-dark hover:text-dark/70 transition-all duration-300"
              >ExtraCoat Emulsion Paint</Link>
            </ul>
					</div>

				</div>

				<div className="grid lg:grid-cols-3 gap-6 md:text-sm text-xs pt-8 items-center border-t border-light copyright">
          <p className="lg:col-span-2 text-center lg:text-start font-[Montserrat]!">
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
            >Terms &amp; Conditions</Link>
            <Link
              to={""}
              className="text-dark hover:text-dark/70 transition-all duration-300"
            >Privacy Policy</Link>
          </ul>
				</div>

			</div>
		</footer>
  )
}

export default Footer