import "./App.css";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CartContextProvider from "./Components/Context/CartContext.jsx";
import WishlistContextProvider from "./Components/Context/WishlistContext.jsx";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Helmet } from "react-helmet";


// Lazy load components
const Layout = lazy(() => import("./Components/Layout/Layout.jsx"));
const Home = lazy(() => import("./Components/Home/Home.jsx"));
const Cart = lazy(() => import("./Components/Cart/Cart.jsx"));
const Categories = lazy(() => import("./Components/Categories/Categories.jsx"));
const Brands = lazy(() => import("./Components/Brands/Brands.jsx"));
const Products = lazy(() => import("./Components/Products/Products.jsx"));
const Login = lazy(() => import("./Components/Login/Login.jsx"));
const Register = lazy(() => import("./Components/Register/Register.jsx"));
const NotFound = lazy(() => import("./Components/NotFound/NotFound.jsx"));
const ProductDetails = lazy(() => import("./Components/ProductDetails/ProductDetails.jsx"));
const Wishlist = lazy(() => import("./Components/Wishlist/Wishlist.jsx"));
const CheckOut = lazy(() => import("./Components/CheckOut/Checkout.jsx"));
const AllOrders = lazy(() => import("./Components/AllOrders/AllOrders.jsx"));
const UpdatePassword = lazy(() => import("./Components/UpdatePassword/UpdatePassword.jsx"));
const Loading = lazy(()=>import('../src/Components/Loading/Loading.jsx'));

const routers = createHashRouter([
  {
    path: "",
    element: (
      <Suspense fallback={<Loading />}>
        <Layout />
      </Suspense>
    ),
    children: [
      { path: "", element: <Suspense fallback={<Loading />}><Home /></Suspense> },
      { path: "login", element: <Suspense fallback={<Loading />}><Login /></Suspense> },
      { path: "register", element: <Suspense fallback={<Loading />}><Register /></Suspense> },
      { path: "updatePassword", element: <Suspense fallback={<Loading />}><UpdatePassword /></Suspense> },
      { path: "cart", element: <Suspense fallback={<Loading />}><Cart /></Suspense> },
      { path: "brands", element: <Suspense fallback={<Loading />}><Brands /></Suspense> },
      { path: "categories", element: <Suspense fallback={<Loading />}><Categories /></Suspense> },
      { path: "products", element: <Suspense fallback={<Loading />}><Products id={null} /></Suspense> },
      { path: "productdetails/:id", element: <Suspense fallback={<Loading />}><ProductDetails /></Suspense> },
      { path: "wishlist", element: <Suspense fallback={<Loading />}><Wishlist /></Suspense> },
      { path: "checkout", element: <Suspense fallback={<Loading />}><CheckOut /></Suspense> },
      { path: "allorders", element: <Suspense fallback={<Loading />}><AllOrders /></Suspense> },
      { path: "*", element: <Suspense fallback={<Loading />}><NotFound /></Suspense> },
    ],
  },
]);

const query = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={query}>
      <CartContextProvider>
        <WishlistContextProvider>
        <Helmet>
            <meta name="description" content="Millions of products to shop — Choose from a wide range of mobile phones, available at great prices. Get deals and low prices on onlineShopping Egypt on onlineShopping . Discounted prices. Pay in installments. Pay with one click. Wide selection of products. Fast delivery. Track shipment." />
            <title>Online shopping</title>
        </Helmet>
          <RouterProvider router={routers} />
          <Toaster
            toastOptions={{
              success: {
                style: { background: "#15803d", color: "white" },
              },
              error: {
                style: { background: "#b91c1c", color: "white" },
              },
            }}
          />
        </WishlistContextProvider>
      </CartContextProvider>
    </QueryClientProvider>
  );
}

export default App;
