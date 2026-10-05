import { createContext, useEffect, useContext, useState } from "react";
import {toast} from 'react-toastify'

const WishlistContext = createContext()
const useWishlistContext = ()=> useContext(WishlistContext)
export default useWishlistContext

export function WishlistProvider({children}){
    const [wishlistItems, setWishlistItems] = useState([])

    //get Wishlist
    async function fetchWishlist(){
        try{
            const response = await fetch("https://backend-book-breeze-mu.vercel.app/books/wishlist")
            const data = await response.json()
            console.log(data)
            setWishlistItems(data.wishlistItems)
        }catch(error){
            console.log(error)
        }
    }

    //add book to wishlist
    async function addToWishlist(productId){
        try{
            const response = await fetch("https://backend-book-breeze-mu.vercel.app/books/wishlist",
                {
                    method: "POST",
                    headers:{
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        productId: productId
                    })
                }
            )
            const data = await response.json()
            console.log(data)

            toast.success("♡ Added to Wishlist")
            fetchWishlist()
        }catch(error){
            console.log(error)
            toast.error("Unable to add in Wishlist")
        }
    }

    useEffect(()=>{
        fetchWishlist()
    },[])

    //delte wishlist
    async function removeFromWishlist(wishlistId){
        try{
            const response = await fetch(`https://backend-book-breeze-mu.vercel.app/books/wishlist/${wishlistId}`,
                {
                    method: "DELETE"
                }
            )
            const data = await response.json()
            console.log(data)

            toast.warning("💔 Remove from Wishlist")
            fetchWishlist()
        }catch(error){
            console.log(error)
            toast.error("Unable to Remove from Wishlist")
        }
    }

    return(
        <WishlistContext.Provider value={{wishlistItems, addToWishlist, removeFromWishlist}}>
            {children}
        </WishlistContext.Provider>
    )
}