import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";



export let CartContext = createContext();

export default function CartContextProvider({children}){

    
    const [cart, setCart] = useState(null);
    const [isLoading, setIsLoading] = useState(true);




    async function addToCart(productId) {
        const headers ={
            token:localStorage.getItem('userToken')
        }
        try {
            let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{productId},{headers})
            toast.success("Added Successfuly")
        } catch (error) {toast.error("You must log in first")
        }
    }

    async function getCart() {
        if(localStorage.getItem('userToken')){
        const headers ={
            token:localStorage.getItem('userToken')
        }
        try {
            let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{headers})
            setCart(data);
            setIsLoading(false);

        } catch (error) {
            setIsLoading(false);
        }}
    }


    async function updateQuantity(id,num) {
        const headers ={
            token:localStorage.getItem('userToken')
        }
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
        const headers ={
            token:localStorage.getItem('userToken')
        }
        try {
            let {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{headers})
            setCart(data);
            
        } catch (error) {
            toast.error("try again");
        }
    }

      useEffect(()=>{
        getCart();
      },[cart])
      
    return <CartContext.Provider value={{addToCart,getCart,cart,isLoading,updateQuantity,deleteProduct,setIsLoading}}>
        {children}
    </CartContext.Provider>
}