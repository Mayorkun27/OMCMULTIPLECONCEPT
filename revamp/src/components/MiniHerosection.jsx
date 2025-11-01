import React from 'react'

const MiniHerosection = ({ title, subText, bgStyle }) => {
  return (
    <div 
      className='lg:h-[60dvh] md:h-[40vh] h-[55dvh]'
      style={bgStyle}
    >
        <div className="made-container h-full flex lg:gap-0 gap-6 items-center relative z-2">
            <div className="w-full mx-auto text-center flex flex-col gap-2 text-lighter">
                <h3 className='font-bold! md:text-4xl text-[32px] md:leading-none leading-8 font-[Montserrat]!'>{title}</h3>
                <p className='leading-7 md:text-sm text-xs text-white/50 md:w-3/4 mx-auto'>{subText}</p>
            </div>
        </div>
    </div>
  )
}

export default MiniHerosection