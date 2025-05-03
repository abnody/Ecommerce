import React from 'react'
import Products from '../Products/Products'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="abnd-container text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">Welcome to ShopScoop</h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">Discover the latest trends and exclusive collections</p>
          <Link to="/products" className="inline-block bg-[#00f8ff] text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all">
            Start Shopping
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="pb-20 md:py-20 ">
        <div className="abnd-container">
          <h2 className="text-3xl font-bold text-center mb-16 text-white">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Electronics',
                image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
              },
              {
                name: 'Fashion',
                image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80'
              },
              {
                name: 'Home & Living',
                image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80'
              }
            ].map((category) => (
              <Link
                key={category.name}
                to="/categories"
                className="group relative h-96 rounded-xl overflow-hidden   transition-colors"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${category.image})` }}
                >
                  <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-3xl font-bold">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-20">
        <div className="abnd-container">
          <h2 className="text-3xl font-bold text-center mb-16 text-white">Shop by Brand</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                name: 'Nike',
                image: 'https://images.unsplash.com/photo-1543508282-6319a3e2621f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2115&q=80'
              },
              {
                name: 'Apple',
                image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
              },
              {
                name: 'Samsung',
                image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
              },
              {
                name: 'Adidas',
                image: 'https://images.unsplash.com/photo-1620794341491-76be6eeb6946?q=80&w=1988&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              }
            ].map((brand) => (
              <Link
                key={brand.name}
                to="/brands"
                className="group relative h-64 rounded-xl overflow-hidden transition-colors"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${brand.image})` }}
                >
                  <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold">{brand.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="abnd-container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16 text-white">Featured Products</h2>
          <Products />
        </div>
      </section>
    </div>
  )
}
