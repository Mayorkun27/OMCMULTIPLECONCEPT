import React from 'react'
import MiniHerosection from '../../components/MiniHerosection'
import ProductCard from '../../components/cards/ProductCard'
import { assets } from '../../assets/assets'

const Shop = () => {

  const products = [
    {
      name: "Supercoat Emulsion Paint",
      price: 300000,
      image: assets.product1
    },
    {
      name: "Supercoat Emulsion Paint",
      price: 300000,
      image: assets.product1
    },
    {
      name: "Supercoat Emulsion Paint",
      price: 300000,
      image: assets.product1
    },
    {
      name: "Supercoat Emulsion Paint",
      price: 300000,
      image: assets.product1
    },
    {
      name: "Supercoat Emulsion Paint",
      price: 300000,
      image: assets.product1
    },
    {
      name: "Supercoat Emulsion Paint",
      price: 300000,
      image: assets.product1
    },
  ]

  return (
    <div>
      <MiniHerosection 
        title={"Shop"}
        subText={"Welcome to OMC Multitech Limited's Online Store! Explore our premium range of paints and decoration solutions. Find the perfect finish for your space. Shop now and transform your interiors with quality and style!"}
      />
      <div className="made-container pt-20">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
          {
            products.map((product, index) => (
              <div className="">
                <ProductCard 
                  name={product.name}
                  price={product.price}
                  image={product.image}
                />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Shop