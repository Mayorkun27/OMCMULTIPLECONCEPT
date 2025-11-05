import React, { useEffect } from 'react'
import MiniHerosection from '../../components/MiniHerosection'
import { assets } from '../../assets/assets'
import { RiTruckLine } from "react-icons/ri";
import { LuShoppingBag } from "react-icons/lu";
import { CgSupport } from "react-icons/cg";
import { PiArrowsClockwiseLight } from "react-icons/pi";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import TestimonialSlider from '../../components/sections/TestimonialSlider';

const About = () => {

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

  const team = [
    {
      name: "Hammed Lawal Ayinde",
      positon: "C.E.O/Managing Director.",
      image: assets.person1,
      bio: "Separated they live in. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.",
    },
    {
      name: "Julius Omosebi",
      positon: "Marketer",
      image: assets.person2,
      bio: "Separated they live in. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.",
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

  return (
    <div>
      <MiniHerosection 
        title={"About Us"}
        subText={"ONIPTTECH MULTIPLE CONCEPT, We bring colors to life! As a leading paint production company, we specialize in crafting high-quality paints and interior decoration solutions that transform spaces into stunning works of art."}
        bgStyle={{
          background: `linear-gradient(135deg, #000000ba, #000000ba), url(${assets.newsimg3})`,
          backgroundSize: "cover",
          backgroundPosition: "bottom",
        }}
      />
      <div className="made-container grid items-center justify-between md:grid-cols-12 gap-8 py-20">
        <div className="text-dark lg:col-span-6 md:col-span-7">
          <h3 className='text-3xl font-medium! font-[Montserrat]! mb-2'>Why Choose Us</h3>
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
          <img src={assets.yellowdots} alt="yellow dots" className='absolute -top-20 lg:left-0 -left-24 lg:scale-70 scale-50 -z-1 object-cover' />
          <div className="lg:w-4/5 ms-auto rounded-2xl overflow-hidden">
            <img src={assets.whyimg} alt="Why_choose_us_image" className='w-full h-full object-cover' />
          </div>
        </div>
      </div>
      <div className="made-container lg:pb-10">
        <h3 className='lg:text-3xl md:text-2xl text-3xl font-medium! font-[Montserrat]! mb-8 text-center'>Meet the Team</h3>
        <div className="grid md:grid-cols-2 gap-8">
          {team.map((item) => (
            <div key={item.date} className='flex flex-row gap-4 p-4 bg-white h-[200px] rounded-xl items-center text-dark/80'>
              <img src={item.image} alt={item.name} className='lg:w-[150px] w-[130px] h-full! object-cover rounded-[inherit]' />
              <div className="tracking-wide">
                <h3 className='font-semibold! text-dark lg:text-xl text-lg font-[Montserrat]!'>{item.name}</h3>
                <p className='text-dark/70 text-sm'>{item.positon}</p>
                {/* <p className='text-dark/70 mt-4 text-sm'>{item.bio}</p> */}
              </div>
            </div>
          ))}

        </div>
      </div>
      <div className='made-container pt-20 lg:pb-20 relative'>
        <h3 className='lg:text-3xl md:text-2xl text-3xl font-medium lg:mb-6 text-center'>What our Customers say about us</h3>
        <TestimonialSlider />
      </div>
    </div>
  )
}

export default About