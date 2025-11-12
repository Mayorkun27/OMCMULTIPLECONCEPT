import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaPaperPlane, FaRegEnvelope, FaTwitter } from 'react-icons/fa'
import { FaWhatsapp } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const Footer = () => {

  const year = new Date().getFullYear();

  return (
    <footer className="pt-12 md:pb-12 pb-8 bg-white">
			<div className="made-container relative">
        

				<div className="grid lg:grid-cols-5 grid-cols-1 md:gap-8 gap-12 text-sm items-start mb-10">
					<div className="lg:col-span-2 lg:w-full md:w-3/5 flex flex-col md:gap-6 gap-4">
            <Link
              to={"#"}
              className="font-[Montserrat]! lg:text-3xl md:text-4xl text-3xl lg:leading-8 leading-10 font-medium! text-primary hover:text-dark/70 transition-all duration-300"
            >ONIPTTECH MULTIPLE CONCEPT<span>.</span></Link>
						<p className="leading-7 text-body_color">At ONIPTTECH MULTIPLE CONCEPT, We bring colors to life! As a leading paint production company, we specialize in crafting high-quality paints and interior decoration solutions that transform spaces into stunning works of art.</p>
					</div>

					<div className="lg:col-span-3 grid md:grid-cols-2 md:gap-0 gap-8">
            <ul className="md:col-span-1 flex flex-col gap-4">
              <h3 className='text-primary font-[Montserrat]! font-bold!'>Quick Links</h3>
              <Link
                to={"/shop"}
                className="text-dark hover:text-dark/70 transition-all duration-300"
              >Shop</Link>
              <Link
                to={"/aboutus"}
                className="text-dark hover:text-dark/70 transition-all duration-300"
              >About us</Link>
              {/* <Link
                to={""}
                className="text-dark hover:text-dark/70 transition-all duration-300"
              >Blog</Link> */}
              <Link
                to={"/contactus"}
                className="text-dark hover:text-dark/70 transition-all duration-300"
              >Contact us</Link>
            </ul>

            <ul className="flex flex-col items-start gap-4">
              <h3 className='text-primary font-[Montserrat]! font-bold!'>Socials</h3>
              <ul className="md:col-span-1 flex flex-row gap-4">
                <Link
                  to={"https://www.facebook.com/share/1AAB6Ahm2E/"}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center bg-light hover:bg-primary rounded-full text-dark text-lg hover:text-white transition-all duration-300"
                >
                  <FaFacebook />
                </Link>
                <Link
                  to={"#"}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 hidden items-center justify-center bg-light hover:bg-primary rounded-full text-dark text-lg hover:text-white transition-all duration-300"
                >
                  <FaTwitter />
                </Link>
                <Link
                  to={"https://www.instagram.com/oniptechmultipleconcept"}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center bg-light hover:bg-primary rounded-full text-dark text-lg hover:text-white transition-all duration-300"
                >
                  <FaInstagram />
                </Link>
                <Link
                  to={"https://wa.me/<number>"}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center bg-light hover:bg-primary rounded-full text-dark text-lg hover:text-white transition-all duration-300"
                >
                  <FaWhatsapp />
                </Link>
              </ul>
						</ul>
					</div>

				</div>

				<div className="grid lg:grid-cols-3 gap-6 md:text-sm text-xs pt-8 items-center border-t border-light copyright">
          <p className="lg:col-span-2 text-center lg:text-start font-[Montserrat]!">
            Copyright &copy;{year}. All Rights Reserved. &mdash; 
            <span className='ms-1 text-xs'> 
              Developed with love by 
              <Link
                to={"https://oluwamayokun.vercel.app"}
                target="_blank" 
                rel="noopener noreferrer"
                className="mx-1 text-dark hover:text-dark/70 transition-all duration-300 underline"
              >Oluwamayokun</Link> 
              and
              <Link
                to={"https://github.com/Osunjimi"}
                target="_blank" 
                rel="noopener noreferrer"
                className="mx-1 text-dark hover:text-dark/70 transition-all duration-300 underline"
              >High Bee</Link>
            </span>
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