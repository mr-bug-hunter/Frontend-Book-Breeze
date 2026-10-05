import { useContext } from "react";
import useCartContext from "../context/CartContext";
import useFetch from "../Hooks/useFetch";
import { Link } from "react-router-dom";
import useWishlistContext from "../context/WishlistContext";

const Cart = ()=>{

    const {cartItems, addToCart, removeFromCart, decreaseQuantity} = useCartContext()

    const {addToWishlist} = useWishlistContext()

    const validCartItem = cartItems.filter((item) => item.productId)

    const totalPrice = validCartItem
        .reduce((total, item)=> {
            return total + item.productId.price * item.quantity
        }, 0)

        const discount = validCartItem.length > 0 ? 49 : 0
        const deliveryCharges = validCartItem.length > 0 ? 69 :0
        const totalAmount = totalPrice - discount + deliveryCharges
    
        const {data, loading, error}= useFetch(
            "https://backend-book-breeze-mu.vercel.app/books/cart", {cartItems: []}
        )

        if(loading){
            return(
                <div className="container text-center py-5">
                    <h4>Loading Cart Please wait...</h4>
                </div>
            )
        }

        if(error){
            return(
                <div className="container text-center py-5">
                    <h4>Something Went Wrong..</h4>
                    <p>{error}</p>
                </div>
            )
        }
    return(
        <div style={{background : "#EFE9E3"}}>
     <div className="container py-5" >
        <h2 className="mb-4">My Cart</h2>
        <div className="row">
            {/* Cart Items */}
            <div className="col-md-8">
                {cartItems.filter((item)=> item.productId)
                .map((item)=> (
                    <div className="card mb-3 shadow" key={item._id}>
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img 
                                src={item.productId?.image} 
                                alt={item.productId?.title}
                                style={{
                                    height: "300px",
                                    width: "100%",
                                    objectFit: "contain"
                                }}
                                className="img-fluid"
                                />
                            </div>

                            <div className="col-md-8">
                                <div className="card-body">
                                    <h4>
                                        {item.productId?.title}
                                    </h4>
                                    <p>
                                        Author: {item.productId?.author}
                                    </p>
                                    <p>
                                        Price: ${item.productId?.price}
                                    </p>
                                    <div className="d-flex align-items-center mb-3">
                                        <p>Quantity: </p>

                                        <button
                                        className="btn btn-outline-secondary"
                                        onClick={()=> decreaseQuantity(item._id, false)}
                                        >
                                            -
                                        </button>

                                        <p className="mx-3">
                                            {item.quantity}
                                            </p>

                                    <button
                                    className="btn btn-outline-secondary"
                                    onClick={()=> addToCart(item.productId._id, false)}
                                    >
                                         +
                                    </button>
                                        
                                    </div>

                                    <p>Available Stock: {item.productId.stock}</p>

                                    <div className="d-flex gap-2">
                                        <button
                                            className="btn btn-secondary"
                                            onClick={()=> removeFromCart(item._id)}
                                        >
                                            Remove From Cart
                                        </button>


                                        <Link className="btn btn-secondary"
                                        onClick={() => {
                                            addToWishlist(item.productId._id) //wishlist me add
                                            removeFromCart(item._id) //cart se hatao
                                        }}
                                    >
                                        Move to Wishlist 
                                    </Link>

                                    </div>
                                    
                                </div>

                            </div>

                        </div>

                    </div>
                ))}
            </div>

            {/* Price Detials */}
            <div className="col-md-4">
                <div className="card shadow">
                    <div className="card-body">
                        <h4>Price Details</h4>
                        <hr />
                        <p>
                            Price: ${totalPrice}
                        </p>
                        <p>
                            Discount: -${discount}
                        </p>
                        <p>
                            Delivery Charges: ${deliveryCharges}
                        </p>
                        <hr />
                        <h5>
                            Total Amount: ${totalAmount}
                        </h5>
                        <hr />
                        <Link to="/checkout" className="btn btn-primary w-100">
                            Place Order
                        </Link>
                        <hr />
                        <p className="fst-italic">
                            Hey! you get free offer Gift!
                        </p>
                    </div>
                </div>
            </div>
        </div>
     </div> 
     </div>  
    )
}
export default Cart