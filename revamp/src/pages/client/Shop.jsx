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
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1)
  const [lastPage, setlastPage] = useState(1)
  const itemsPerPage = 8;

  useEffect(() => {
    window.scroll(0, 0)
    document.title = "Shop - OMC Multitech Limited";
  }, [])

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true)
      try {
        const response = await api.call(`/products?page=${currentPage}&per_page=${itemsPerPage}`, "GET");
        if (response.status === 200) {
          const { data, last_page } = response.data.data;
          setProducts(data);
          setlastPage(last_page)
        }
      } catch (error) {
        console.error('An error occurred fetching products', error);
        toast.error('An error occurred fetching products');
      } finally {
        setIsLoading(false) // Remove setTimeout for faster UI update
      }
    }
    fetchProducts()
  }, [currentPage])

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
            isLoading ? (
              Array(itemsPerPage).fill(0).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            ) : products.length > 0 ? (
              products.map((product, index) => (
                <ProductCard 
                  key={`${product.id} ${index}`}
                  {...product}
                />
              ))
            ) : (
              <div className='lg:col-span-4 md:col-span-2 text-center text-lg text-dark bg-white p-8 rounded-lg'>
                <p>No products found</p>
              </div>
            )
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
export default Shop;