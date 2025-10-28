import React from 'react';
import { MdStar } from "react-icons/md";

const TestimonialCard = ({ rating, testimony, name, occupation }) => {
  return (
    <div className='border lg:-rotate-3 hover:rotate-0 hover:border-pri transition-all duration-300 border-primary/20 shadow-md p-4 rounded-xl max-w-[300px] space-y-2 flex flex-col justify-between'>
        <div className="space-y-2">
            <div className="flex items-center gap-1">
                {
                    [...Array(rating)].map((_, index) => (
                        <MdStar key={index} className="text-yellow-500 text-xl" />
                    ))
                }
            </div>
            <p className='text-sm font-[Lato]!'>{testimony}</p>
        </div>
        <div className="flex items-center gap-4 mt-6">
            <div className="bg-primary text-light w-10 h-10 rounded-full flex items-center justify-center text-lg font-[Montserrat]! font-bold!">
                {name.split(" ")[0]?.split("")[0]}
                {name.split(" ")[1]?.split("")[0]}
            </div>
            <div className="">
                <h3 className='leading-4 font-medium line-clamp-1'>{name}</h3>
                <p className='text-sm text-body_color'>{occupation}</p>
            </div>
        </div>
    </div>
  )
}

export default TestimonialCard