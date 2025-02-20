import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";



export let WishlistContext = createContext();

export default function WishlistContextProvider({children}){

    
    const [wishlist, setWishlist] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    const headers ={
        token:localStorage.getItem('userToken')
    }

    async function addToWishlist(productId) {
        try {
            let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{productId},{headers})
            setWishlist(data);
            // toast.success("Added Successfuly");
            
        } catch (error) {
            toast.error("You must log in first wishlist context1");
        }
    }

    async function getWishlist() {
        try {
            let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{headers})
            
            setWishlist(data);

            setIsLoading(false);
        } catch (error) {
            setIsLoading(false)
        }
    }


    async function deleteProduct(id) {
        try {
            await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, { headers });
            let { data } = await getWishlist()
            setWishlist(data);
        } catch (error) {
        }
    }
    
    useEffect(()=>{
        getWishlist();
    },[wishlist])

    return <WishlistContext.Provider value={{addToWishlist,wishlist,getWishlist,isLoading , deleteProduct}}>
        {children}
    </WishlistContext.Provider>
}