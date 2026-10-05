import useWishlistContext from "../context/WishlistContext"
import useCartContext from "../context/CartContext"
import useFetch from "../Hooks/useFetch"
import { toast } from "react-toastify"

const wishlist = ()=>{
    const { wishlistItems, removeFromWishlist} = useWishlistContext()
    const {addToCart} = useCartContext()

    const {data, loading, error}= useFetch(
        "https://backend-book-breeze-mu.vercel.app/books/wishlist", {wishlistItems: []}
    )
    if(loading){
        return(
            <div className="container text-center py-5">
                <h4>Loading Wishlist....</h4>
            </div>
        )
    }

    if(error){
        return(
            <div className="container text-center py-5">
                <h4>Something went wrong..</h4>
                <p>{error}</p>
            </div>
        )
    }
    
    return(
        <div style={{background: '#EFE9E3'}} className="min-vh-100">
            <div className="container py-5">
                <h2 className="mb-4">
                    My Wishlist
                </h2>

                <div className="row ">
                    {wishlistItems.map((item)=>(
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
                        key={item._id}
                        >
                            <div className="card shadow-sm h-100">
                                {/* Image  */}
                                <div className="position-relative">
                                    <img 
                                    src={item.productId?.image} 
                                    alt={item.productId?.title}
                                    className="card-img-top"
                                    style={{height: "300px", objectFit: "contain"}}
                                    />
                                </div>
                                {/* Book Details */}
                                <div className="card-body " style={{background: "#FFFAF3"}}>
                                    <h6 className="card-title">
                                        <strong>Title:</strong>  {item.productId?.title}
                                    </h6>
                                    <p className="card-text">
                                       <strong>Author:</strong> {item.productId?.author}
                                    </p>
                                    <p className="card-text">
                                        <strong>Price:</strong> ${item.productId?.price}
                                    </p>
                                </div>

                                {/* button */}
                                <button className="btn w-100 rounded-0 shadow"
                                style={{backgroundColor: "#C9B59C"}}
                                onClick={()=> {
                                        addToCart(item.productId._id) //move to cart
                                        removeFromWishlist(item._id) //remove from wishlist
                                    }}
                                >
                                    Move to Cart
                                    </button>
                                    <button className="btn w-100 rounded-0 shadow"
                                    style={{backgroundColor: "#D0311E"}}
                                    onClick={()=> removeFromWishlist (item._id)}
                                    >
                                        Remove
                                </button>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default wishlist