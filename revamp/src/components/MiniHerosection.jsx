import React from 'react'

const MiniHerosection = ({ title, subText, bgStyle }) => {
  return (
    <div 
      className='lg:h-[60dvh] md:h-[40vh] h-[55dvh]'
      style={bgStyle}
    >
        <div className="made-container h-full flex lg:gap-0 gap-6 items-center relative z-2">
            <div className="lg:w-2/5 md:w-3/4 flex flex-col gap-6 text-lighter">
                <h3 className='font-bold! md:text-4xl text-[32px] md:leading-none leading-8 font-[Montserrat]!'>{title}</h3>
                <p className='leading-7 text-sm text-white/50'>{subText}</p>
            </div>
        </div>
    </div>
  )
}

export default MiniHerosection