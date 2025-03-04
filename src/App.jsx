
import './App.css'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout.jsx'
import Home from './Components/Home/Home.jsx'
import Cart from './Components/Cart/Cart.jsx'
import Categories from './Components/Categories/Categories.jsx'
import Brands from './Components/Brands/Brands.jsx'
import Products from './Components/Products/Products.jsx'
import Login from './Components/Login/Login.jsx'
import Register from './Components/Register/Register.jsx'
import NotFound from './Components/NotFound/NotFound.jsx'
import ProductDetails from './Components/ProductDetails/ProductDetails.jsx'
import CartContextProvider from './Components/Context/CartContext.jsx'
import { Toaster } from 'react-hot-toast'
import WishlistContextProvider from './Components/Context/WishlistContext.jsx'
import Wishlist from './Components/Wishlist/Wishlist.jsx'
import CheckOut from './Components/CheckOut/Checkout.jsx'
import AllOrders from './Components/AllOrders/AllOrders.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


let routers = createHashRouter([{
  path:'' , element : <Layout/>,children:[
    {path: '' , element: <Home/>},
    {path:'login' , element: <Login/>},
    {path:'register' , element: <Register/>},
    {path:'cart' , element: <Cart/>},
    {path:'brands' , element: <Brands/>},
    {path:'categories' , element: <Categories/>},
    {path:'products' , element: <Products id={null}/>},
    {path:'productdetails/:id' , element: <ProductDetails/>},
    {path:'wishlist' , element: <Wishlist/>},
    {path:'checkout' , element: <CheckOut/>},
    {path:'allorders' , element: <AllOrders/>},
    {path:'*' , element: <NotFound/>},
  ]
}])

const query = new QueryClient()
function App() {

  return <>

    <QueryClientProvider client={query}>
      <CartContextProvider>
        <WishlistContextProvider>
          <RouterProvider router={routers}></RouterProvider>
          <Toaster
          toastOptions={{
            success: {
              style: {
                background: '#15803d',
                color:'white'
              },
            },
            error: {
              style: {
                background: '#b91c1c',
                color : 'white',
              },
            },
          }}/>
        </WishlistContextProvider>
      </CartContextProvider>
    </QueryClientProvider>

  </>
}

export default App
