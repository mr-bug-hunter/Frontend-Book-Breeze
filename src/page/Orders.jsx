import useFetch from "../Hooks/useFetch"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { useEffect, useState } from "react"

const Orders = ()=>{

    const {data, loading, error} = useFetch(
        "https://backend-book-breeze-mu.vercel.app/orders", {orders: []}
    )

    const [orders, setOrders] = useState([])

    useEffect(()=>{
        setOrders(data.orders || [])
    }, [data])

    async function handleDeleteOrder(orderId){
        try{
            const response = await fetch(
                `https://backend-book-breeze-mu.vercel.app/orders/${orderId}`, 
                {method: "DELETE"}
            )
            const data = await response.json()
            console.log(data)
            if(response.ok){
                toast.success("Order deleted Successfully!")
                setOrders(orders.filter((order)=> order._id !== orderId))
            }else{
                toast.error("Unable to deleted Order")
            }
        }catch(error){
            console.log(error)
                toast.error("Error to delete in order History..")
        }
    }

    if(loading){
        return(
            <div className="container text-center py-5">
                <h4>Loading Orders....</h4>
            </div>
        )
    }

    if(error){
        return(
            <div className="container text-center py-5">
                <h4>Something went wrong</h4>
                <p>{error}</p>
            </div>
        )
    }


    return(
        <div style={{backgroundColor: "#EFE9E3"}} className="min-vh-100">
            <div className="container py-5">
                <h2 className="mb-4">My Orders</h2>
                {/* koi order nhi h  */}
                {orders.length === 0 ? (
                    <div className="card shadow-sm p-5 text-center">
                        <h4>No order Found</h4>
                        <p className="text-muted">Please Order Buy Now</p>
                        <Link to="/products" className="btn btn-dark w-auto mx-auto">
                            Books 
                        </Link>
                    </div>
                ):(
                    //  show all orders
                    orders.map((order)=>(
                        <div className="card shadow-sm mb-4" key={order._id}>
                            <div className="card-body">

                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <div>
                                        <h5 className="mb-0">Order ID : #{order._id.slice(-6)}</h5>

                                        <small className="text-muted">
                                            {new Date(order.orderDate).toLocaleDateString()}
                                        </small>
                                    </div>
                                    <div className="text-end">
                                        <h5 className="mb-0">${order.totalAmount}</h5>
                                        <small className="text-success">Delivered</small>
                                        <br />
                                        <button
                                        className="btn btn-sm btn-outline-danger mt-2"
                                        onClick={()=> handleDeleteOrder(order._id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                    
                                </div>
                                <hr />
                                {/* order Items */}
                                <div className="row g-3">
                                    {order.items.map((item, index)=>(
                                        <div className="col-12 col-md-6" key={index}>
                                            <div className="d-flex align-items-center">
                                                <div className="flex-grow-1">
                                                    <p className="mb-1"><strong>{item.title}</strong></p>
                                                    <small className="text-muted">
                                                        Qty: {item.quantity} x ${item.price} = ${item.price * item.quantity} 
                                                        </small>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <hr />
                                {/* Delivery Address */}
                                <div>
                                    <small className="text-muted">
                                        <strong>Delivered to: </strong>
                                        {order.address.name}, {order.address.address}
                                        {order.address.city}, {order.address.state} - {order.address.pincode} 
                                    </small>
                                </div>

                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default Orders