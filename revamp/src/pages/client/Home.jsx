import React, { useEffect } from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import ProductCard from '../../components/cards/ProductCard';
import { RiTruckLine } from "react-icons/ri";
import { LuShoppingBag } from "react-icons/lu";
import { CgSupport } from "react-icons/cg";
import { PiArrowsClockwiseLight } from "react-icons/pi";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import TestimonialSlider from '../../components/sections/TestimonialSlider';

const Home = () => {

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  const whys = [
    {
      icon: <RiTruckLine />,
      heading: "Fast,Reliable & Timely Delivery",
      body: "We understand the importance of meeting deadlines, and we guarantee timely delivery of our products and services.",
    },
    {
      icon: <LuShoppingBag />,
      heading: "Quality Products",
      body: "We manufacture high-quality paints that are durable, eco-friendly, and safe for your family and pets.",
    },
    {
      icon: <CgSupport />,
      heading: "24/7 Support",
      body: "Our dedicated team is available round-the-clock to address your queries and concerns, ensuring you receive support whenever you need it.",
    },
    {
      icon: <PiArrowsClockwiseLight />,
      heading: "Hassle Free Transactions",
      body: "We make transactions easy and convenient, with secure payment options and transparent processes.",
    },
  ]

  const testimonials = [
    {
      body: "“Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer convallis volutpat dui quis scelerisque.”",
      name: "Maria Jones",
      position: "CEO, Co-Founder, XYZ Inc.",
      image: assets.person1
    },
    {
      body: "“Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer convallis volutpat dui quis scelerisque.”",
      name: "Maria Jones",
      position: "CEO, Co-Founder, XYZ Inc.",
      image: assets.person1
    },
    {
      body: "“Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer convallis volutpat dui quis scelerisque.”",
      name: "Maria Jones",
      position: "CEO, Co-Founder, XYZ Inc.",
      image: assets.person1
    },
  ]

  const blogs = [
    {
      title: "First Time Home Owner Ideas",
      author: "Robert Fox",
      date: "Aug 15 2020",
      image: assets.post1
    },
    {
      title: "How To Keep Your Furniture Clean",
      author: "Kristin Watson",
      date: "Aug 15 2020",
      image: assets.post2
    },
    {
      title: "Small Space Furniture Apartment Ideas",
      author: "Maria Jones",
      date: "Aug 15 2020",
      image: assets.post3
    },
  ]

  return (
    <>
      {/* Herosection */}
      <div 
        className='lg:h-dvh md:h-[80vh] h-dvh'
        style={{
          background: `linear-gradient(135deg, #000000ba, #000000ba), url(${assets.heroimg2})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="made-container h-full flex lg:gap-0 gap-6 items-center relative z-2">
          <div className="lg:w-1/2 md:w-3/4 flex flex-col gap-6 text-lighter col-span-1">
            <h3 className='font-bold md:text-4xl text-[32px] md:leading-none leading-8'>ONIPTTECH MULTIPLE CONCEPT</h3>
            <p className='leading-7 text-sm text-white/50'>At ONIPTTECH MULTIPLE CONCEPT, We bring colors to life! As a leading paint production company, we specialize in crafting high-quality paints and interior decoration solutions that transform spaces into stunning works of art.</p>
            <div className="flex items-center gap-4">
              <Link
                to={"/shop"}
                className='px-6 py-2 bg-secondary rounded-full text-dark font-semibold'
              >Shop Now</Link>
              <Link
                to={"/shop"}
                className='px-6 py-2 border-2 rounded-full border-light/50 text-lighter font-semibold'
              >Explore</Link>
            </div>
          </div>
          <div hidden className="absolute -right-[10%] scale-75 rotate-45 top-24 -z-2">
            <img src={assets.lightdots} alt="light dots" className='w-4/5 animate-pulse object-cover' />
          </div>
        </div>
      </div>
      {/* Shop */}
      <div className="made-container space-y-8 py-20">
        <div className="text-dark/90 space-y-4 md:w-4/5">
          <h3 className='text-3xl font-medium! font-[Montserrat]!'>Produced and Crafted with excellent material.</h3>
          <p className='text-body_color leading-7 text-sm'>With a passion for innovation and customer satisfaction, here's our extensive collection of premium paint for you to explore, each carefully crafted to inspire and transform your world with vibrant colors and style!</p>
          <Link
            to={"/shop"}
            className='md:block hidden'
          >
            <button
              type='button'
              className='px-8 h-[50px] cursor-pointer bg-dark rounded-full border-light/50 text-lighter font-semibold'
            >Explore</button>
          </Link>
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
          <ProductCard 
            name="OMC Emulsion Paint"
            description="Suitable as a finishing coat for interior/exterior concrete plaster or cement rendered surfaces to give a highly granular, attractive finish"
            price="100000"
            image={assets.product1}
          />
          <ProductCard 
            name="OMC Emulsion Paint"
            description="Suitable as a finishing coat for interior/exterior concrete plaster or cement rendered surfaces to give a highly granular, attractive finish"
            price="100000"
            image={assets.product1}
          />
          <ProductCard 
            name="OMC Emulsion Paint"
            description="Suitable as a finishing coat for interior/exterior concrete plaster or cement rendered surfaces to give a highly granular, attractive finish"
            price="100000"
            image={assets.product1}
          />
          <ProductCard 
            name="OMC Emulsion Paint"
            description="Suitable as a finishing coat for interior/exterior concrete plaster or cement rendered surfaces to give a highly granular, attractive finish"
            price="100000"
            image={assets.product1}
          />
        </div>
        <div className="md:hidden block">
          <Link
            to={""}
          >
            <button
              type='button'
              className='px-8 h-[50px] bg-dark rounded-full border-light/50 text-lighter font-semibold'
            >Explore</button>
          </Link>
        </div>
      </div>
      {/* why */}
      <div className="made-container grid items-center justify-between md:grid-cols-12 gap-8 py-20">
        <div className="text-dark lg:col-span-6 md:col-span-7">
          <h3 className='text-3xl font-medium! mb-2 font-[Montserrat]!'>Why Choose Us</h3>
          <p className='text-body_color leading-7 text-sm'>At Onipttech Multiple Concept, we're dedicated to delivering exceptional paint solutions and interior decoration services that exceed your expectations. Here's why you should choose us:</p>
          <div className="grid grid-cols-2 gap-8 mt-8">
            {
              whys.map((why, index) => (
                <div key={index} className="text-sm space-y-4">
                  <div className="w-10 h-10 rounded-full bg-body_color/40 text-xl flex items-center justify-center">
                    {why.icon}
                  </div>
                  <strong>{why.heading}</strong>
                  <p className='text-dark/80 mt-2 text-xs'>{why.body}</p>
                </div>
              ))
            }
          </div>
        </div>
        <div className="lg:col-span-6 md:col-span-5 md:inline-grid hidden relative z-2">
          <img src={assets.yellowdots} alt="yellow dots" className='absolute -top-20 lg:left-0 -left-24 lg:scale-90 scale-50 -z-1 object-cover' />
          <div className="lg:w-4/5 ms-auto rounded-2xl overflow-hidden">
            <img src={assets.whyimg} alt="Why_choose_us_image" className='w-full h-full object-cover' />
          </div>
        </div>
      </div>
      {/* help */}
      <div className="made-container grid items-center justify-between md:grid-cols-12 gap-8 py-20">
        <div className="lg:col-span-7 md:col-span-6 relative z-2">
          <img src={assets.greendots} alt="yellow dots" className='absolute -top-20 -left-24 lg:scale-90 scale-50 -z-1 object-cover' />
          <div className="grid lg:grid-cols-3 grid-cols-2 lg:grid-rows-2 gap-6 relative">
            <div className="col-span-2 lg:row-span-2 rounded-2xl overflow-hidden lg:h-auto h-[300px]">
              <img src={assets.helpimg} alt="Why_choose_us_image" className='w-full h-full object-cover' />
            </div>
            <div className="col-span-1 rounded-2xl overflow-hidden lg:h-auto h-[150px]">
              <img src={assets.helpimg2} alt="Why_choose_us_image" className='w-full h-full object-cover' />
            </div>
            <div className="lg:w-[45%] lg:absolute right-0 -bottom-24 col-span-1 rounded-2xl overflow-hidden lg:h-auto h-[150px]">
              <img src={assets.helpimg3} alt="Why_choose_us_image" className='w-full h-full object-cover' />
            </div>
          </div>
        </div>
        <div className="text-dark lg:col-span-5 md:col-span-6">
          <h3 className='lg:text-3xl md:text-2xl text-3xl font-medium! font-[Montserrat]! mb-4'>We Help You Make Modern Interior Design</h3>
          <p className='text-body_color leading-7 text-sm'>At Onipttech, we help you create modern, stunning interiors that reflect your style and personality. From sleek and minimalist to bold and eclectic, we'll work with you to bring your vision to life.</p>
          <div className="grid grid-cols-2 gap-6 mt-8">
            {
              ["Expert design consultation", "Customized design solutions", "High-quality materials and finishes", "Timely and efficient project execution"].map((help, index) => (
                <div key={index} className="text-sm text-body_color flex items-start gap-2">
                  <div className="border-2 border-primary p-0.5 mt-1 rounded-full"></div>
                  <span>{help}</span>
                </div>
              ))
            }
          </div>
          <Link
            to={"/shop"}
            className='md:block hidden mt-8'
          >
            <button
              type='button'
              className='px-8 cursor-pointer h-[50px] bg-dark rounded-full border-light/50 text-lighter font-semibold'
            >Explore</button>
          </Link>
        </div>
      </div>
      {/* testimonials */}
      {/* <div className='made-container py-20 relative'>
        <h3 className='lg:text-3xl md:text-2xl text-3xl font-medium lg:mb-6 text-center'>Testimonials</h3>
        <Swiper
          modules={[Navigation, Pagination, A11y, Autoplay]}
          spaceBetween={100}
          slidesPerView={1}
          loop
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          className="lg:w-[90%] lg:px-20! pb-12!"
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item}>
              <div className='md:p-10 pt-10 pb-0 flex flex-col items-center justify-center text-center text-dark/80'>
                <p className='md:text-xl text-sm'>{item.body}</p>
                <div className="mt-10 text-sm">
                  <img src={item.image} alt={item.name} className='w-20 h-20 mx-auto object-cover rounded-full mb-3' />
                  <h3 className='font-bold text-dark'>{item.name}</h3>
                  <p>{item.position}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div> */}
      <div className='made-container lg:pt-20 md:pt-12 pb-20 relative'>
        <h3 className='lg:text-3xl md:text-2xl text-3xl font-medium! mb-8 text-center font-[Montserrat]!'>Testimonials</h3>
        <TestimonialSlider />
      </div>
      {/* blog */}
      <div className="made-container lg:pb-20">
        <div className='flex items-center justify-between mb-8'>
          <h3 className='lg:text-3xl md:text-2xl text-3xl font-medium! text-center font-[Montserrat]!'>Recent Blog</h3>
          <Link className='underline'>View All Posts</Link>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {blogs.map((item) => (
              <div key={item.date} className='flex flex-col items-start text-dark/80'>
                <img src={item.image} alt={item.author} className='w-full h-[250px] object-cover rounded-xl mb-3' />
                <div className="space-y-2 tracking-wide">
                  <h3 className='font-semibold text-dark'>{item.title}</h3>
                  <p className='text-dark/70 text-sm'>by <span className='font-semibold text-dark'>{item.author}</span> on <span className='font-semibold text-dark'>{item.date}</span></p>
                </div>
              </div>
          ))}

        </div>
      </div>
    </>
  )
}

export default Home