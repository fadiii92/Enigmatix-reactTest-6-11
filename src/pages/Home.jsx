import React, { useEffect } from 'react'
import Todo from '../components/todo'
import { useDispatch, useSelector } from 'react-redux'
import { retireveProducts } from '../redux/productActions'
import { useLocation, useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'

function Home() {
  const dispatch = useDispatch()
  const { pathname } = useLocation();
  const { category } = useParams()

  useEffect(() => {
    dispatch(retireveProducts())
  }, [dispatch])

  const products = useSelector(state => state.ProductReducer.products)


  return (
    <div className="container mx-auto p-4">
    {pathname === '/' ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((item) => (
          <ProductCard
            key={item.id}
            id = {item.id}
            title={item.title}
            price={item.price}
            description={item.description}
            category={item.category}
            image={item.image}
            rating={item.rating}
          />
        
        ))}
      </div>
    ) : category ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products
          .filter((item) => item.category === category)
          .map((item) => (
            <ProductCard
              key={item.id}
              id = {item.id}
              title={item.title}
              price={item.price}
              description={item.description}
              category={item.category}
              image={item.image}
              rating={item.rating}
            />
          ))}
      </div>
    ) : (
      <div className="text-center text-gray-600 mt-4">No Product available</div>
    )}
  </div>
  
  )
}

export default Home
