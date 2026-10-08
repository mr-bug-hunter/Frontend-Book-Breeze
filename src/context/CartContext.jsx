import { createContext, useContext, useEffect, useState } from "react";
import {toast} from 'react-toastify'

const CartContext = createContext()

const useCartContext = ()=> useContext(CartContext)

export default useCartContext

export function CartProvider({children}){
    const [cartItems, setCartItems] = useState([])

    async function fetchCart(){
        try{
            const response = await fetch("https://backend-book-breeze-mu.vercel.app/books/cart")
            const data = await response.json()
            setCartItems(data.cartItems)
        }catch(error){
            console.log(error)
        }
    }

    async function addToCart(productId, showToast = true, quantity =1){
        try{
            const response = await fetch("https://backend-book-breeze-mu.vercel.app/books/cart", {
                method: "POST",
                headers:{
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    productId: productId,
                    quantity: quantity
                })
            })
            const data = await response.json()
            console.log(data)

            if(showToast){
                toast.success("📈 Add to Cart")
            }
            fetchCart()
        }catch(error){
            console.log(error)
            toast.error("Unable to Add in Cart")
        }
    }
    useEffect(()=>{
        fetchCart()
    }, [])

    async function decreaseQuantity(cartId, showToast = true){
        try{
            const response = await fetch(`https://backend-book-breeze-mu.vercel.app/books/cart/decrease/${cartId}`,
                {
                    method: "POST"
                }
            )
            const data = await response.json()
            console.log(data)

            if(showToast){
                toast.info("📉 - Quantity")
            }
            fetchCart()
        }catch(error){
            console.log(error)
            toast.error("Unable to Update")
        }
    }

    async function removeFromCart(cartId) {
        try{
            const response = await fetch(`https://backend-book-breeze-mu.vercel.app/books/cart/${cartId}`,
                {
                    method: "DELETE"
                }
            )
            const data = await response.json()
            console.log(data)

            toast.warning("🗑️ Remove from Cart")
            fetchCart()
    }catch(error){
        console.log(error)
        toast.error("Unable to Remove Cart")
    }
}

    return(
        <CartContext.Provider value={{cartItems, addToCart, removeFromCart, decreaseQuantity, fetchCart}}>
            {children}
        </CartContext.Provider>
    )
}