import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { assets } from '../../assets/assets';
import MiniHerosection from '../../components/MiniHerosection';

const Blog = () => {

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
    <div>
      <MiniHerosection
        title={"Blog"}
        subText={"Welcome to the OMC Multitech Limited Blog! Discover insights, trends, and expert tips on paint, interior design, and decoration. Stay inspired and informed to transform your spaces with style and creativity!."}
      />
      <div className="made-container py-20">
        <h3 className='lg:text-3xl md:text-2xl text-3xl font-medium mb-8 text-center'>Recent Blog</h3>
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
      <div className='made-container py-20 relative'>
        <h3 className='lg:text-3xl md:text-2xl text-3xl font-medium lg:mb-6 text-center'>What our Customers say about us</h3>
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
      </div>
    </div>
  )
}

export default Blog