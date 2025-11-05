import React from 'react'
import MiniHerosection from '../../../components/MiniHerosection'
import { assets } from '../../../assets/assets'

const Order = () => {
  return (
    <div>
        <MiniHerosection
            title={"My Orders"}
            subText={"One step closer, your items are waiting. Ready to check out?."}
            bgStyle={{
                background: `linear-gradient(135deg, #000000ba, #000000ba), url(${assets.newsimg6})`,
                backgroundSize: "cover",
                backgroundPosition: "bottom",
            }}
        />
        <div className="made-container pt-20 lg:pb-20">

        </div>
    </div>
  )
}

export default Order