import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";



export let CartContext = createContext();

export default function CartContextProvider({children}){

    
    const [cart, setCart] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    const headers ={
        token:localStorage.getItem('userToken')
    }

    async function addToCart(productId) {
        try {
            let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{productId},{headers})
            toast.success("Added Successfuly")
            
        } catch (error) {
            toast.error("You must log in");
        }
    }

    async function getCart() {
        try {
            let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{headers})
            setCart(data);
            setIsLoading(false);

        } catch (error) {
            setIsLoading(false);
        }
    }


    async function updateQuantity(id,num) {
        try {
            let {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
            {"count" :`${num}`}
            ,{headers})
            setCart(data)
            
        } catch (error) {
            toast.error("try again");
        }
    }


    async function deleteProduct(id) {
        try {
            let {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{headers})
            setCart(data);
            
        } catch (error) {
            toast.error("try again");
        }
    }

      useEffect(()=>{
        getCart();
      },[])
    return <CartContext.Provider value={{addToCart,getCart,cart,isLoading,updateQuantity,deleteProduct,setIsLoading}}>
        {children}
    </CartContext.Provider>
}