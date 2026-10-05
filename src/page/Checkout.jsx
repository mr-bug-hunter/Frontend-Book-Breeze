import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import useCartContext from "../context/CartContext"
import  {toast} from "react-toastify"

const Checkout = () =>{
    const navigate = useNavigate() 
    const {cartItems, removeFromCart} = useCartContext() 
    const [placing, setPlacing] = useState(false) 
    const [orderPlaced, setOrderPlaced] = useState(false)
    
    
    const selectedAddress = JSON.parse(localStorage.getItem("selectedAddress"))

    
    const validItems = cartItems.filter((item)=> item.productId)

    
    const totalPrice = validItems.reduce((total, item)=> {
        return total + item.productId.price * item.quantity
    }, 0)

    const discount = validItems.length > 0 ? 49 :0 
    const deliveryCharges = validItems.length > 0 ? 69 :0
    const totalAmount = totalPrice - discount + deliveryCharges

    //confirm order
    async function handleConfirmOrder(){
        
        if(!selectedAddress){
            toast.error("please select address")
            navigate("/addresses")
            return
        }
        
        if(validItems.length === 0){
            toast.error("Cart is empty!")
            return
        }
        setPlacing(true) //btn disable + placing dikhao

        //backend ko bhejna
        const orderData = {
            items: validItems.map((item)=>({
                productId: item.productId._id,
                title: item.productId.title,
                price: item.productId.price,
                quantity: item.quantity
            })),
            address: selectedAddress,
            totalAmount: totalAmount
        }
        try{
            //backend pe order save 
            const response = await fetch("https://backend-book-breeze-mu.vercel.app/orders", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(orderData)
            })

            const data = await response.json()
            console.log("Order response:", data)
            if(response.ok){
                //cart empty(delete from backend)
                for(const item of validItems){
                    await fetch(`https://backend-book-breeze-mu.vercel.app/books/cart/${item._id}`, {
                        method: "DELETE"
                    })
                }
                //remove from localstroage 
                localStorage.removeItem("selectedAddress")
                toast.success("🎉 Order place successfully")
                setOrderPlaced(true)//success screen dikhao
            }
        }catch(error){
            console.log(error)
            toast.error("issue in placing order")
        }finally{
            setPlacing(false) // btn wapas enable karo
        }
    }

    //Success Screen
    if(orderPlaced){
        return(
            <div style={{backgroundColor: "#EFE9E3"}}
            className="min-vh-100"
            >
                <div className="container py-5 text-center">
                    <div className="card shadow-sm p-5">
                        <h1 className="display-4 mb-3">✅</h1>
                        <h2 className="mb-3">Order placed Successfully!</h2>
                        <p className="text-muted mb-4">Thank you! order will deliver</p>
                        <div className="d-flex gap-3 justify-content-center">
                            <Link to="/" className="btn btn-dark">
                            Home
                            </Link>
                            <Link to="/orders" className="btn" style={{backgroundColor: "#C9B59C"}}>
                                Order History
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    //Main checkout page
    return(
    <div style={{backgroundColor: "#EFE9E3"}} className="min-vh-100">
        <div className="container py-5">
            <h2 className="mb-4">Checkout</h2>
            <div className="row g-4">
                {/* left side order Summary */}
                <div className="col-12 col-md-7">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="mb-3">Order Summary</h5>
                            <hr />
                            {validItems.length === 0 ? (
                            <p className="text-muted">Cart is Empty</p> 
                            ):(validItems.map((item)=> (
                                <div key={item._id} className="d-flex align-items-center mb-3">
                                    <img 
                                    src={item.productId.image} 
                                    alt={item.productId.title}
                                    style={{
                                        width: "60px",
                                        height: "80px",
                                        objectFit: "contain"
                                    }}
                                    className="me-3"
                                    />
                                    <div className="flex-grow-1">
                                        <Link to={`/product/${item.productId._id}`} style={{color: "#60241E"}} className="text-decoration-none">
                                        <h6 className="mb-1">{item.productId.title}</h6>
                                        </Link>
                                        <small className="text-muted">
                                            Qty: {item.quantity} x ${item.productId.price}
                                            </small>
                                    </div>
                                    <strong>
                                        ${item.productId.price * item.quantity}
                                    </strong>
                                </div>
                            ))
                        )}
                        </div>
                    </div>
                </div>

                {/* Right: Address + Price + Confirm */}
                <div className="col-12 col-md-5">
                    
                    {/* selected Address */}
                    <div className="card shadow-sm mb-3">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <h5 className="mb-0">Delivery Address</h5>
                                <Link to="/addresses" className="btn btn-sm btn-outline-dark">Change</Link>
                            </div>
                            <hr />
                            {selectedAddress ? (
                                <>
                                <p className="mb-1"><strong>{selectedAddress.name}</strong></p>
                                <p className="mb-1 small">{selectedAddress.address}</p>
                                <p className="mb-1 small">{selectedAddress.city}, {selectedAddress.state} - {selectedAddress.pincode}</p>
                                <p className="mb-0 small">📞 {selectedAddress.phone}</p>
                                </>
                                ):(
                                    <p className="text-danger mb-0">please select address{" "} 
                                    <Link to="/addresses">Select address</Link>
                                    </p>
                            )}
                        </div>
                    </div>

                            {/* Price Details */}
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <h5 className="mb-3">Price Details</h5>
                                    <hr />
                                    <div className="d-flex justify-content-between mb-2">
                                        <span>Price</span>
                                        <span>${totalPrice}</span>
                                    </div>
                                    <div className="d-flex justify-content-between mb-2">
                                        <span>Discount</span>
                                        <span>-${discount}</span>
                                    </div>
                                    <div className="d-flex justify-content-between mb-2">
                                        <span>Delivery</span>
                                        <span>${deliveryCharges}</span>
                                    </div>
                                    <hr />
                                    <div className="d-flex justify-content-between mb-3">
                                        <strong>Total</strong>
                                        <strong>${totalAmount}</strong>
                                    </div>
                                    <button
                                    className="btn w-100 shadow"
                                    style={{backgroundColor: "#C9B59C"}}
                                    onClick={handleConfirmOrder}
                                    disabled={placing || validItems.length === 0}
                                    >
                                        {placing ? "placing Order...": "Confirm Order"}
                                    </button>
                                </div>
                            </div>
                </div>

            </div>
        </div>
    </div>
)

}


export default Checkout