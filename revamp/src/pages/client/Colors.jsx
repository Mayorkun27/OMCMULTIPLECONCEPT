import React from 'react'
import ColorPaletteSlider from '../../components/sections/ColorPaletteSlider'
import MiniHerosection from '../../components/MiniHerosection'
import { assets } from '../../assets/assets'

const Colors = () => {
  return (
    <div>
        <MiniHerosection 
            title={"Our Colors"}
            subText={"Discover the endless possibilities with our rich and diverse range of paint colors. Each shade is crafted for brilliance and lasting beauty!"}
            bgStyle={{
                background: `linear-gradient(135deg, #000000ba, #000000ba), url(${assets.checkimg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        />
        <ColorPaletteSlider />
    </div>
  )
}

export default Colors