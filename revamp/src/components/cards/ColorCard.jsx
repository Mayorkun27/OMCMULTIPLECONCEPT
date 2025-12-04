import React from 'react'

const ColorCard = ({ hex, name }) => {
    return (
        <div 
            className="flex items-center justify-center rounded-lg shadow-md p-2 w-[200px] h-10 transform transition-transform duration-300 hover:scale-105"
            style={{ backgroundColor: hex, border: '1px solid rgba(0,0,0,0.1)' }}
        >
            <div className="text-white text-sm font-bold text-shadow-md px-2 rounded-lg bg-black/20 backdrop-blur-sm">
                {name}
            </div>
            {/* Optional: Show hex code on hover, or a small swatch */}
            {/* <div className="text-sm text-white/80 mt-1">{hex}</div> */}
        </div>
    );
}

export default ColorCard