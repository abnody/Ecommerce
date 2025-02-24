// import axios from "axios";
// import { createContext, useEffect, useState } from "react";
// import toast from "react-hot-toast";

// export let WishlistContext = createContext();

// export default function WishlistContextProvider({ children }) {
//   const [wishlist, setWishlist] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [data, setData] = useState([])

//   const headers = {
//     token: localStorage.getItem("userToken"),
//   };

//   async function addToWishlist(productId) {
//     try {
//         const headers = { token: localStorage.getItem("userToken") };
//         let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, { productId },{ headers });
//         setWishlist(data);
//         toast.success("Added to Wishlist");
//       } 
//       catch (error) {
//       toast.error("You must log in first");
//     }
//   }

//   async function getWishlist() {
//     try {  

//       const headers = {token: localStorage.getItem("userToken"),};
//       let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{ headers });
//       setWishlist(data);
//       setData(data)
//     } catch (error) {
        
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   async function deleteProduct(id) {
//     try {
//       await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, { headers });
//       getWishlist();
//     } catch (error) {
        
//     }
//   }

//   useEffect(()=>{
//     getWishlist();
//   },[wishlist])
  

//   return (
//     <WishlistContext.Provider value={{ data,addToWishlist, wishlist, getWishlist, isLoading, deleteProduct }}>
//       {children}
//     </WishlistContext.Provider>
//   );
// }


import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";



export let WishlistContext = createContext();

export default function WishlistContextProvider({ children }) {
    
    const [wishlist, setWishlist] = useState(null);
    const [isLoading, setIsLoading] = useState(true);




    async function addToWishlist(productId) {
        const headers ={
            token:localStorage.getItem('userToken')
        }
        try {
          let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, { productId },{ headers });
            toast.success("Added Successfuly")
        } catch (error) {toast.error("You must log in first")
        }
    }

    async function getWishlist() {
        if(localStorage.getItem('userToken')){
        const headers ={
            token:localStorage.getItem('userToken')
        }
        try {
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{ headers });
            setWishlist(data);
            setIsLoading(false);

        } catch (error) {
            setIsLoading(false);
        }}
    }


    async function deleteProduct(id) {
        const headers ={
            token:localStorage.getItem('userToken')
        }
        try {
            let {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, { headers });
            setWishlist(data);
            
        } catch (error) {
            toast.error("try again");
        }
    }

      useEffect(()=>{
        getWishlist();
      },[wishlist])
      
    return <WishlistContext.Provider value={{addToWishlist,getWishlist,wishlist,isLoading,deleteProduct,setIsLoading}}>
        {children}
    </WishlistContext.Provider>
}