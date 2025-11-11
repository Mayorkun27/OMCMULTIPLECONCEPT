import React, { useEffect, useState } from 'react'
import MiniHerosection from '../../components/MiniHerosection'
import ProductCard from '../../components/cards/ProductCard'
import { assets } from '../../assets/assets'
import { toast } from 'sonner'
import api from '../../api'
import ProductCardSkeleton from '../../components/cards/ProductCardSkeleton'
import PaginationControls from '../../utilities/PaginationControls'

const Shop = () => {

  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1)
  const [lastPage, setlastPage] = useState(1)

  useEffect(() => {
    window.scroll(0, 0)
    document.title = "Shop - OMC Multitech Limited";
  }, [])

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true)
      try {
        const response = await api.call('/products', "GET");
        // // console.log(response);
        if (response.status === 200) {
          const { data, current_page, last_page } = response.data.data;
          setProducts(data);
          setCurrentPage(current_page)
          setlastPage(last_page)
        }
      } catch (error) {
        console.error('An error occurred fetching products', error);
        toast.error('An error occurred fetching products');
      } finally {
        setTimeout(() => {
          setIsLoading(false)
        }, 2000)
      }
    }
    fetchProducts()
  }, [])

  // const products = [
  //   {
  //     id: 1,
  //     name: "Supercoat Emulsion 1",
  //     description: "Suitable as a finishing coat for interior/exterior concrete plaster or cement rendered surfaces to give a highly granular, attractive finish",
  //     price: 300000,
  //     image: assets.product1
  //   },
  //   {
  //     id: 2,
  //     name: "Supercoat Emulsion 2",
  //     description: "Suitable as a finishing coat for interior/exterior concrete plaster or cement rendered surfaces to give a highly granular, attractive finish",
  //     price: 300000,
  //     image: assets.product1
  //   },
  //   {
  //     id: 3,
  //     name: "Supercoat Emulsion 3",
  //     description: "Suitable as a finishing coat for interior/exterior concrete plaster or cement rendered surfaces to give a highly granular, attractive finish",
  //     price: 300000,
  //     image: assets.product1
  //   },
  //   {
  //     id: 4,
  //     name: "Supercoat Emulsion 4",
  //     description: "Suitable as a finishing coat for interior/exterior concrete plaster or cement rendered surfaces to give a highly granular, attractive finish",
  //     price: 300000,
  //     image: assets.product1
  //   },
  //   {
  //     id: 5,
  //     name: "Supercoat Emulsion 5",
  //     description: "Suitable as a finishing coat for interior/exterior concrete plaster or cement rendered surfaces to give a highly granular, attractive finish",
  //     price: 300000,
  //     image: assets.product1
  //   },
  //   {
  //     id: 6,
  //     name: "Supercoat Emulsion 6",
  //     description: "Suitable as a finishing coat for interior/exterior concrete plaster or cement rendered surfaces to give a highly granular, attractive finish",
  //     price: 300000,
  //     image: assets.product1
  //   },
  // ]

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
            products.length === 0 ? (
              <div className='lg:col-span-4 md:col-span-2 text-center text-lg text-dark bg-white p-8 rounded-lg'>
                <p>No products found</p>
              </div>
            ) : isLoading ? (
              Array(8).fill(0).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            ) : products.length > 1 && (
              products.map((product, index) => (
              <ProductCard 
                key={product.id+index}
                {...product}
              />
            )))
          }
        </div>
        <div className='pt-8'>
          <PaginationControls 
            currentPage={currentPage}
            totalPages={lastPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  )
}

export default Shop