import React, { useEffect } from 'react'
import MiniHerosection from '../../components/MiniHerosection'
import ProductCard from '../../components/cards/ProductCard'
import { assets } from '../../assets/assets'

const Shop = () => {

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  const products = [
    {
      name: "Supercoat Emulsion Paint",
      description: "Suitable as a finishing coat for interior/exterior concrete plaster or cement rendered surfaces to give a highly granular, attractive finish",
      price: 300000,
      image: assets.product1
    },
    {
      name: "Supercoat Emulsion Paint",
      description: "Suitable as a finishing coat for interior/exterior concrete plaster or cement rendered surfaces to give a highly granular, attractive finish",
      price: 300000,
      image: assets.product1
    },
    {
      name: "Supercoat Emulsion Paint",
      description: "Suitable as a finishing coat for interior/exterior concrete plaster or cement rendered surfaces to give a highly granular, attractive finish",
      price: 300000,
      image: assets.product1
    },
    {
      name: "Supercoat Emulsion Paint",
      description: "Suitable as a finishing coat for interior/exterior concrete plaster or cement rendered surfaces to give a highly granular, attractive finish",
      price: 300000,
      image: assets.product1
    },
    {
      name: "Supercoat Emulsion Paint",
      description: "Suitable as a finishing coat for interior/exterior concrete plaster or cement rendered surfaces to give a highly granular, attractive finish",
      price: 300000,
      image: assets.product1
    },
    {
      name: "Supercoat Emulsion Paint",
      description: "Suitable as a finishing coat for interior/exterior concrete plaster or cement rendered surfaces to give a highly granular, attractive finish",
      price: 300000,
      image: assets.product1
    },
  ]

  return (
    <div>
      <MiniHerosection 
        title={"Shop"}
        subText={"Welcome to OMC Multitech Limited's Online Store! Explore our premium range of paints and decoration solutions. Find the perfect finish for your space. Shop now and transform your interiors with quality and style!"}
        bgStyle={{
          background: `linear-gradient(135deg, #000000ba, #000000ba), url(${assets.newsimg1})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
      />
      <div className="made-container pt-20 lg:pb-20 md:pb-">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
          {
            products.map((product, index) => (
              <ProductCard 
                key={index+1}
                name={product.name}
                description={product.description}
                price={product.price}
                image={product.image}
              />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Shop